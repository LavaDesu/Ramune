"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ramune = void 0;
const _1 = require("./");
const Endpoints = require("../Endpoints");
const Enums_1 = require("../Enums");
/**
 * Represents an OAuth app, and should be the first thing to create in order
 * to use the library.
 *
 * To use the app with client credentials, call and wait for {@link refreshToken}
 */
class Ramune extends _1.Client {
    /**
     * Constructs an OAuth app
     *
     * After creating an instance, you may do any of the following to start using the API:
     * - Make unauthenticated requests
     * - Make authenticated requests after calling and waiting for {@link refreshToken}
     * - Create {@link UserClient | UserClients} with {@link createUserClient} which allows you to
     *   make requests on behalf of a user
     *
     * @param id - The OAuth app ID
     * @param secret - The OAuth app secret
     * @param options - Extra client options
     */
    constructor(id, secret, options) {
        super(options);
        this.missingTokenMessage = "Have you run connect()?";
        this.appID = id;
        this.appSecret = secret;
    }
    async refreshToken() {
        const token = await this.requestHandler.request({
            body: {
                "grant_type": Enums_1.GrantType.ClientCredentials,
                "client_id": this.appID,
                "client_secret": this.appSecret,
                "scope": "public"
            },
            endpoint: Endpoints.TOKEN,
            type: Enums_1.RequestType.POST
        });
        this.updateToken(token);
        return token;
    }
    /**
     * Creates a {@link UserClient} authenticated with this OAuth app
     *
     * @param token The initial token, which can either be a refresh token
     *              or an authentication code
     * @param type The type of the token
     * @param options Extra options to pass to the created UserClient
     *
     * @returns A {@link UserClient} to make authenticated requests on
     *          behalf of another user
     */
    async createUserClient(token, type, options) {
        const body = {
            client_id: this.appID,
            client_secret: this.appSecret
        };
        switch (type) {
            case "refresh": {
                body.grant_type = Enums_1.GrantType.RefreshToken;
                body.refresh_token = token;
                break;
            }
            case "auth": {
                body.grant_type = Enums_1.GrantType.AuthCode;
                body.code = token;
                break;
            }
            default: throw new TypeError("Invalid token type");
        }
        const tokenObject = await this.requestHandler.request({
            body,
            endpoint: Endpoints.TOKEN,
            type: Enums_1.RequestType.POST
        });
        const instance = new _1.UserClient(this, tokenObject, options);
        return instance;
    }
}
exports.Ramune = Ramune;
//# sourceMappingURL=Ramune.js.map