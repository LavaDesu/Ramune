"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestNetworkError = exports.RequestHandler = void 0;
const https_1 = require("https");
const url_1 = require("url");
const Enums_1 = require("../Enums");
const _1 = require("./");
const package_json_1 = require("../../package.json");
/**
 * Sends and handles requests
 */
class RequestHandler {
    constructor(options) {
        this.defaultHost = options?.defaultHost ?? "osu.ppy.sh";
        const limit = options?.rateLimit?.limit ?? 50;
        const interval = options?.rateLimit?.interval ?? 10e3;
        this.bucket = new _1.Bucket(limit, interval);
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
    async request(data) {
        let pResolve;
        let pReject;
        const promise = new Promise((r, d) => {
            pResolve = r;
            pReject = d;
        });
        const serializedData = this.serializeRequest(data);
        await this.bucket.queue();
        const req = https_1.request(serializedData)
            .once("response", (res) => {
            res.setEncoding("utf8");
            let raw = "";
            res.on("data", d => raw += d);
            res.on("end", () => {
                if (res.statusCode && res.statusCode >= 400) {
                    pReject(new RequestNetworkError(res.statusCode, res.statusMessage ?? "No message", raw));
                    return;
                }
                try {
                    if (data.discardOutput)
                        // HACK
                        pResolve(undefined);
                    else
                        pResolve(JSON.parse(raw));
                }
                catch (err) {
                    pReject(err);
                }
            });
        })
            .on("error", (err) => {
            pReject(err);
        });
        if (data.type === Enums_1.RequestType.POST)
            req.write(JSON.stringify(data.body));
        req.end();
        return promise;
    }
    /**
     * Serialize a Request object
     * @param data - Request object to serialize
     * @returns Object for use in request
     */
    serializeRequest(data) {
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "User-Agent": data.userAgent ?? `Ramune/${package_json_1.version} (https://github.com/LavaDesu/Ramune)`
        };
        if (data.auth)
            headers.Authorization = data.auth;
        if (data.type === Enums_1.RequestType.POST)
            headers["Content-Length"] = JSON.stringify(data.body).length.toString();
        let endpoint = data.endpoint;
        if (data.endpointArguments)
            for (const name in data.endpointArguments)
                endpoint = endpoint.replace(`{${name}}`, data.endpointArguments[name]);
        let query = new url_1.URLSearchParams(data.query).toString();
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
exports.RequestHandler = RequestHandler;
class RequestNetworkError extends Error {
    constructor(code, message, response) {
        super(message);
        this.type = "network";
        this.code = code;
        this.message = message;
        this.response = response;
    }
}
exports.RequestNetworkError = RequestNetworkError;
;
//# sourceMappingURL=RequestHandler.js.map