import { Client } from "./Client";
import { Endpoints } from "./Endpoints";
import {
    GrantType,
    RequestType,
    TokenType
} from "./Enums";
import { RequestHandler } from "./RequestHandler";

export class Ramune extends Client {
    public readonly appID: string;
    public readonly appSecret: string;

    /**
     * Main constructor  
     * NOTE! You're probably looking for {@link Ramune.create}
     */
    constructor(id: string, secret: string, token: Token) {
        super(token);
        this.appID = id.toString();
        this.appSecret = secret;
    }

    /**
     * Create {Ramune} from an OAuth app's id and secret
     */
    public static async create(id: string, secret: string) {
        const token = await new RequestHandler().request<Token>({
            body: {
                "grant_type": GrantType.ClientCredentials,
                "client_id": id,
                "client_secret": secret,
                "scope": "public"
            },
            endpoint: Endpoints.OAUTH_PREFIX + Endpoints.TOKEN,
            type: RequestType.POST
        });
        return new Ramune(id, secret, token);
    }

    public async refreshToken() {
        const token = await new RequestHandler().request<Token>({
            body: {
                "grant_type": GrantType.ClientCredentials,
                "client_id": this.appID,
                "client_secret": this.appSecret,
                "scope": "public"
            },
            endpoint: Endpoints.OAUTH_PREFIX + Endpoints.TOKEN,
            type: RequestType.POST
        });
        this.updateToken(token);
        return token;
    }

    public async createUserClient(token: string, type: "refresh" | "auth"): Promise<UserClient> {
        const body = {
            client_id: this.appID,
            client_secret: this.appSecret
        } as Record<string, string>;

        switch (type) {
            case "refresh": {
                body.grant_type = GrantType.RefreshToken;
                body.refresh_token = token;
                break;
            }
            case "auth": {
                body.grant_type = GrantType.AuthCode;
                body.code = token;
                break;
            }
            default: throw new TypeError("Invalid token type");
        }

        const tokenObject: Token = await this.requestHandler.request<Token>({
            body,
            endpoint: Endpoints.OAUTH_PREFIX + Endpoints.TOKEN,
            type: RequestType.POST
        });
        const instance = new UserClient(this, tokenObject);
        return instance;
    }
}

export class UserClient extends Client {
    private readonly parent: Ramune;

    constructor(parent: Ramune, token: Token) {
        super(token);
        this.parent = parent;
    }

    public async refreshToken() {
        const token = await new RequestHandler().request<Token>({
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

/** OAuth Token */
export type Token = {
    /** Type of token */
    token_type: TokenType;
    /** Time in seconds after which the access token will be expired */
    expires_in: number;
    /** The access token */
    access_token: string;
    /** The (new) refresh token */
    refresh_token?: string;
};

export { Client };
