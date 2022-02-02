"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserClient = void 0;
const _1 = require("./");
const Endpoints = require("../Endpoints");
const Enums_1 = require("../Enums");
const Errors_1 = require("../Errors");
/**
 * An OAuth Client that is authenticated as a user.
 */
class UserClient extends _1.Client {
    /**
     * Constructs a UserClient
     *
     * @remark This is not meant to be constructed manually! Please use
     *         {@link Ramune.createUserClient} instead.
     *
     */
    constructor(parent, token, options) {
        super(options);
        this.parent = parent;
        if (!parent || !token)
            throw new Errors_1.MissingTokenError("Is this UserClient not constructed from Ramune.createUserClient()?");
        else
            this.updateToken(token);
    }
    async refreshToken() {
        if (!this.token)
            throw new Errors_1.MissingTokenError(this.missingTokenMessage);
        const token = await this.requestHandler.request({
            body: {
                "grant_type": Enums_1.GrantType.RefreshToken,
                "client_id": this.parent.appID,
                "client_secret": this.parent.appSecret,
                "refresh_token": this.token.refresh_token
            },
            endpoint: Endpoints.TOKEN,
            type: Enums_1.RequestType.POST
        });
        this.updateToken(token);
        return token;
    }
}
exports.UserClient = UserClient;
//# sourceMappingURL=UserClient.js.map