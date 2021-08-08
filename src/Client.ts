import { EventEmitter } from "events";
import { Token } from "./Responses/Token";
import { Endpoints } from "./Endpoints";
import {
    BeatmapLeaderboardScope,
    Gamemode,
    Mod,
    RequestType,
    ScoreType
} from "./Enums";
import { RequestHandler, RequestHandlerOptions } from "./RequestHandler";

import {
    Beatmap as BeatmapResponse,
    BeatmapScores as BeatmapScoresResponse,
    BeatmapUserScore as BeatmapUserScoreResponse
} from "./Responses/Beatmap";
import {
    Score as ScoreResponse
} from "./Responses/Score";
import { User as UserResponse } from "./Responses/User";

// XXX: These add types for events; is there a better way to do it?
export interface ClientEvents<T> {
    (event: "tokenUpdate", listener: (token: Token) => void): T;
}
export interface Client {
    on: ClientEvents<this>;
    once: ClientEvents<this>;
}
export type ClientOptions = {
    requestHandler?: RequestHandlerOptions;
};
export abstract class Client extends EventEmitter {
    public token!: Token;
    protected refreshTimer!: NodeJS.Timeout;
    protected readonly requestHandler: RequestHandler;

    constructor(token: Token, options?: ClientOptions) {
        super();
        this.requestHandler = new RequestHandler(options?.requestHandler);
        this.updateToken(token);
    }

    /**
     * Updates the token
     */
    protected updateToken(token: Token) {
        // XXX: Hmm
        token.access_token = "Bearer " + token.access_token;
        this.token = token;

        if (this.refreshTimer)
            clearTimeout(this.refreshTimer);
        this.refreshTimer = setTimeout(this.refreshToken.bind(this), (token.expires_in - 100) * 1e3).unref();
        this.emit("tokenUpdate", token);
    }

    /**
     * Refreshes the token
     *
     * There is already an internal timer that refreshes 100 seconds
     * before {token.expires_in}, so applications do not need to call this
     * themselves.
     */
    public abstract refreshToken(): Promise<Token>;

    /**
     * Lookup a beatmap
     *
     * @param query Lookup query
     */
    public async lookupBeatmap(
        options: {
            checksum?: string;
            id?: string;
            filename?: string;
        }
    ): Promise<BeatmapResponse> {
        const response = await this.requestHandler.request<BeatmapResponse>({
            auth: this.token.access_token,
            endpoint: Endpoints.API_PREFIX + Endpoints.BEATMAP_LOOKUP,
            type: RequestType.GET,
            query: options
        });
        return response;
    }

    public async getBeatmapScores(
        id: string,
        options: {
            type?: BeatmapLeaderboardScope;
            mode?: Gamemode;
            mods?: Mod[];
        }
    ): Promise<BeatmapScoresResponse> {
        const query: Record<string, string> = {
            type: options.type ?? BeatmapLeaderboardScope.Global
        };
        if (options.mode) query.mode = options.mode;
        if (options.mods) query.mode = options.mods.join("+");
        const response = await this.requestHandler.request<BeatmapScoresResponse>({
            auth: this.token.access_token,
            endpoint: Endpoints.API_PREFIX + Endpoints.BEATMAP_SCORES,
            endpointArguments: { beatmap: id },
            type: RequestType.GET,
            query
        });
        return response;
    }

    public async getBeatmapUserScore(
        beatmapID: string,
        userID: string,
        options: {
            type?: BeatmapLeaderboardScope;
            mode?: Gamemode;
            mods?: Mod[];
        }
    ): Promise<BeatmapUserScoreResponse> {
        const query: Record<string, string> = {
            type: options.type ?? BeatmapLeaderboardScope.Global
        };
        if (options.mode) query.mode = options.mode;
        if (options.mods) query.mode = options.mods.join("+");
        const response = await this.requestHandler.request<BeatmapUserScoreResponse>({
            auth: this.token.access_token,
            endpoint: Endpoints.API_PREFIX + Endpoints.BEATMAP_USER_SCORE,
            endpointArguments: { beatmap: beatmapID, user: userID },
            type: RequestType.GET,
            query
        });
        return response;
    }


    public async getUser(id: string, mode?: Gamemode): Promise<UserResponse> {
        const response = await this.requestHandler.request<UserResponse>({
            auth: this.token.access_token,
            endpoint: Endpoints.API_PREFIX + Endpoints.USER_SINGLE,
            endpointArguments: { user: id, mode: mode ?? "" },
            type: RequestType.GET
        });
        return response;
    }

    public async getUserScores(id: string, type: ScoreType, mode?: Gamemode): Promise<ScoreResponse[]> {
        const response = await this.requestHandler.request<ScoreResponse[]>({
            auth: this.token.access_token,
            endpoint: Endpoints.API_PREFIX + Endpoints.USER_SCORES,
            endpointArguments: { user: id, type },
            query: mode ? { mode } : {},
            type: RequestType.GET
        });
        return response;
    }
}
