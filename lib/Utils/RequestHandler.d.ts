/// <reference types="node" />
import { RequestOptions } from "http";
import { RequestType } from "../Enums";
export declare type RequestHandlerOptions = {
    defaultHost?: string;
    rateLimit?: {
        limit: number;
        interval: number;
    };
};
/**
 * Sends and handles requests
 */
export declare class RequestHandler {
    private readonly defaultHost;
    private readonly bucket;
    constructor(options?: RequestHandlerOptions);
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
    request<T>(data: RequestObject): Promise<T>;
    /**
     * Serialize a Request object
     * @param data - Request object to serialize
     * @returns Object for use in request
     */
    serializeRequest(data: RequestObject): RequestOptions;
}
export declare class RequestNetworkError extends Error {
    type: string;
    code: number;
    message: string;
    response?: string;
    constructor(code: number, message: string, response?: string);
}
export declare type RequestError = Error | RequestNetworkError;
/**
 * A base request
 */
export declare type RequestObject = {
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
//# sourceMappingURL=RequestHandler.d.ts.map