import { Client, ClientOptions } from "./Client";
import { Endpoints } from "./Endpoints";
import { GrantType, RequestType } from "./Enums";
import { MissingTokenError } from "./Errors";
import { Ramune } from "./Ramune";
import { Token } from "./Responses/Token";

export class UserClient extends Client {
    public readonly parent: Ramune;

    constructor(parent: Ramune, token: Token, options?: ClientOptions) {
        super(options);
        this.parent = parent;
        if (!token)
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
