import { Client } from "./Client";
import { Endpoints } from "./Endpoints";
import { GrantType, RequestType } from "./Enums";
import { Ramune } from "./Ramune";
import { Token } from "./Responses/Token";

export class UserClient extends Client {
    private readonly parent: Ramune;

    constructor(parent: Ramune, token: Token) {
        super(token);
        this.parent = parent;
    }

    public async refreshToken() {
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
