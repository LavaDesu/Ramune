import { Client } from "./Client";
import { Endpoints } from "./Endpoints";
import {
    BeatmapLeaderboardScope,
    Gamemode,
    GrantType,
    Mod,
    RequestType,
    TokenType
} from "./Enums";
import { RequestHandler } from "./RequestHandler";

import {
    Beatmap as BeatmapResponse
} from "./Responses/Beatmap";
import {
    Score as ScoreResponse
} from "./Responses/Score";

export class Ramune extends Client {
    private readonly appID: string;
    private readonly appSecret: string;

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
        const instance = new UserClient(tokenObject);
        return instance;
    }
}

export class UserClient extends Client {
    constructor(token: Token) {
        super(token);
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
