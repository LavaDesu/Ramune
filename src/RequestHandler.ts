import { IncomingMessage, RequestOptions } from "http";
import { request } from "https";
import { URLSearchParams } from "url";

import { Bucket } from "./Bucket";
import { RequestType } from "./Enums";

import { version as VERSION } from "../package.json";

export type RequestHandlerOptions = {
    defaultHost?: string;
    rateLimit?: {
        limit: number;
        interval: number;
    };
};

/**
 * Sends and handles requests
 */
export class RequestHandler { // TODO: Other request types
    private readonly defaultHost: string;
    private readonly bucket: Bucket;

    constructor(options?: RequestHandlerOptions) {
        this.defaultHost = options?.defaultHost ?? "osu.ppy.sh";

        const limit = options?.rateLimit?.limit ?? 50;
        const interval = options?.rateLimit?.interval ?? 10e3;

        this.bucket = new Bucket(limit, interval);
    }

    /**
     * Send an HTTP(s) request
     * @param data - Data to send for request
     * @returns Response for requested data
     *
     * @throws {@link RequestNetworkError}
     * Thrown if the server responds with a 400 or 500 code
     *
     * @throws {@link RequestLocalError}
     * Thrown if there was a local failure somewhere during the request
     */
    public async request<T>(data: RequestObject): Promise<T> {
        let pResolve: (value: T | PromiseLike<T>) => void;
        let pReject: (reason?: RequestError) => void;

        const promise = new Promise<T>((r, d) => {
            pResolve = r;
            pReject = d;
        });

        const serializedData: RequestOptions = this.serializeRequest(data);
        await this.bucket.queue();
        const req = request(serializedData)
            .once("response", (res: IncomingMessage) => {
                res.setEncoding("utf8");

                let raw: string = "";
                res.on("data", d => raw += d);
                res.on("end", () => {
                    if (res.statusCode && res.statusCode >= 400) {
                        pReject(new RequestNetworkError(res.statusCode!, res.statusMessage ?? "No message", raw));
                        return;
                    }

                    try {
                        if (data.discardOutput)
                            // HACK
                            pResolve(undefined as unknown as T);
                        else
                            pResolve(JSON.parse(raw) as T);
                    } catch(err) {
                        pReject(err);
                    }
                });
            })
            .on("error", (err: Error) => {
                pReject(err);
            });

        if (data.type === RequestType.POST)
            req.write(JSON.stringify(data.body));

        req.end();

        return promise;
    }

    /**
     * Serialize a Request object
     * @param data - Request object to serialize
     * @returns Object for use in request
     */
    public serializeRequest(data: RequestObject): RequestOptions {
        const headers: { [name: string]: string } = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "User-Agent": data.userAgent ?? `Ramune/${VERSION as string} (https://github.com/LavaDesu/Ramune)`
        };

        if (data.auth)
            headers.Authorization = data.auth;

        if (data.type === RequestType.POST)
            headers["Content-Length"] = JSON.stringify(data.body).length.toString();

        let endpoint = data.endpoint;
        if (data.endpointArguments)
            for (const name in data.endpointArguments)
                endpoint = endpoint.replace(`{${name}}`, data.endpointArguments[name]);

        let query = new URLSearchParams(data.query).toString();
        if (query.length)
            query = "?" + query;

        return {
            headers: { ...headers, ...data.headers },
            hostname: data.host ?? this.defaultHost,
            port: 443,
            method: data.type,
            path: endpoint + query
        };
    }
}

export class RequestNetworkError extends Error {
    public type = "network";
    public code: number;
    public message: string;
    public response?: string;

    constructor(code: number, message: string, response?: string) {
        super(message);
        this.code = code;
        this.message = message;
        this.response = response;
    }
};
export type RequestError = Error | RequestNetworkError;

/**
 * A base request
 */
export type RequestObject = {
    /** Token to authenticate for request, if required */
    auth?: string;
    /** Main request body */
    body?: Record<string, unknown>;
    /** Whether or not to discard output */
    discardOutput?: boolean;
    /** Endpoint to request to */
    endpoint: string;
    /** Endpoint arguments */
    endpointArguments?: Record<string, string>;
    /** Extra request headers */
    headers?: Record<string, string>;
    /** Optional host override */
    host?: string;
    /** Query parameters */
    query?: Record<string, string>;
    /** HTTP request type */
    type: RequestType;
    /** Optional user agent override */
    userAgent?: string;
};
