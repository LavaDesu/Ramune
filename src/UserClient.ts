import { Client, ClientOptions } from "./Client";
import { Endpoints } from "./Endpoints";
import { GrantType, RequestType } from "./Enums";
import { MissingTokenError } from "./Errors";
import { Ramune } from "./Ramune";
import { Token } from "./Responses/Token";

/**
 * An OAuth Client that is authenticated as a user.
 */
export class UserClient extends Client {
    public readonly parent: Ramune;

    /**
     * Constructs a UserClient
     *
     * @remark This is not meant to be constructed manually! Please use
     *         {@link Ramune.createUserClient} instead.
     *
     */
    constructor(parent: Ramune, token: Token, options?: ClientOptions) {
        super(options);
        this.parent = parent;
        if (!parent || !token)
            throw new MissingTokenError("Is this UserClient not constructed from Ramune.createUserClient()?");
        else
            this.updateToken(token);
    }

    public async refreshToken() {
        if (!this.token)
            throw new MissingTokenError(this.missingTokenMessage);

        const token = await this.requestHandler.request<Token>({
            body: {
                "grant_type": GrantType.RefreshToken,
                "client_id": this.parent.appID,
                "client_secret": this.parent.appSecret,
                "refresh_token": this.token.refresh_token!
            },
            endpoint: Endpoints.OAUTH_PREFIX + Endpoints.TOKEN,
            type: RequestType.POST
        });
        this.updateToken(token);
        return token;
    }
}
