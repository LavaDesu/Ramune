import { Client, ClientOptions } from "./Client";
import { Endpoints } from "./Endpoints";
import { Token } from "./Responses/Token";
import { GrantType, RequestType } from "./Enums";
import { UserClient } from "./UserClient";

export class Ramune extends Client {
    public readonly appID: string;
    public readonly appSecret: string;

    protected readonly missingTokenMessage = "Have you run connect()?";

    /**
     * Represents an OAuth app
     *
     * After creating an instance, you may do any of the following to start using the API:
     * - Make unauthenticated requests
     * - Make authenticated requests after calling and waiting for {@link refreshToken}
     * - Create {@link UserClient}s with {@link createUserClient} which allows you to
     *   make requests on behalf of a user
     *
     * @param id - The OAuth app ID
     * @param secret - The OAuth app secret
     * @param options - Extra client options
     */
    constructor(id: string, secret: string, options?: ClientOptions) {
        super(options);
        this.appID = id;
        this.appSecret = secret;
    }

    /**
     * Refreshes the client credentials OAuth token
     */
    public async refreshToken() {
        const token = await this.requestHandler.request<Token>({
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

    public async createUserClient(token: string, type: "refresh" | "auth", options?: ClientOptions): Promise<UserClient> {
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
        const instance = new UserClient(this, tokenObject, options);
        return instance;
    }
}

export * from "./Bucket";
export * from "./Client";
export * from "./Endpoints";
export * from "./Enums";
export * from "./RequestHandler";
export * from "./Responses";
export * from "./UserClient";
