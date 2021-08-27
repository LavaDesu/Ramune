import { EventEmitter } from "events";
import { Token } from "../Responses/Token";
import { Endpoints } from "../Endpoints";
import {
    BeatmapLeaderboardScope,
    BeatmapLookupType,
    Gamemode,
    Mod,
    RequestType,
    ScoreType
} from "../Enums";
import { RequestHandler, RequestHandlerOptions } from "../RequestHandler";

import {
    Beatmap as BeatmapResponse,
    BeatmapScores as BeatmapScoresResponse,
    BeatmapUserScore as BeatmapUserScoreResponse,
    Beatmapset as BeatmapsetResponse,
    Score as ScoreResponse,
    User$getUser as UserResponse
} from "../Responses";
import { MissingTokenError } from "../Errors";
import { Beatmap, Beatmapset } from "../Structures/Beatmap";
import { User } from "../Structures/User";

declare function tokenUpdate(token: Token): void;

type ClientEvents<T> = {
    (event: "tokenUpdate", listener: typeof tokenUpdate): T;
};
export interface Client {
    /** @hidden */
    addListener: ClientEvents<this>;
    /** @hidden */
    on: ClientEvents<this>;
    /** @hidden */
    once: ClientEvents<this>;
}

/**
 * An OAuth Client, storing a token and request handler that can be used to
 * query the osu! API
 */
export abstract class Client extends EventEmitter {
    // For other people wondering why events are put here, it is for typedoc
    // as there are currently no better way (afaik) to actually document events
    /**
     * Emitted when a token is refreshed or updated in some way
     *
     * This is also emitted the first time a token is set
     *
     * @internal
     * @event
     */
    static readonly tokenUpdate: typeof tokenUpdate;

    /** The current token used for authenticated requests */
    public token?: Token;
    protected missingTokenMessage?: string;
    protected refreshTimer!: NodeJS.Timeout;
    protected readonly requestHandler: RequestHandler;

    /**
     * Constructs a client
     *
     * @remark Please do not construct this class directly!
     * Use either {@link Ramune.constructor | Ramune} or {@link Ramune.createUserClient} instead
     */
    constructor(options?: ClientOptions) {
        super();
        this.requestHandler = new RequestHandler(options?.requestHandler);
    }

    /**
     * Updates the current token.
     *
     * This method emits the {@link tokenUpdate} event
     *
     * @internal
     */
    protected updateToken(token: Token) {
        // XXX: Should this be prepended every request instead?
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
     * before {@link Token.expires_in}, so applications do not need to call this
     * themselves.
     *
     * @returns The newly refreshed token
     */
    public abstract refreshToken(): Promise<Token>;

    /**
     * Get a beatmap using its ID
     * @param id Beatmap ID
     */
    public async getBeatmap(id: number | string): Promise<Beatmap> {
        const raw = await this.getBeatmapRaw(id, BeatmapLookupType.ID);
        return new Beatmap(this, raw);
    }

    /**
     * Get a beatmap using its checksum
     * @param checksum Beatmap checksum
     */
    public async getBeatmapByChecksum(checksum: string): Promise<Beatmap> {
        const raw = await this.getBeatmapRaw(checksum, BeatmapLookupType.Checksum);
        return new Beatmap(this, raw);
    }

    /**
     * Get a beatmap using its filename
     * @param filename Beatmap filename
     */
    public async getBeatmapByFilename(filename: string): Promise<Beatmap> {
        const raw = await this.getBeatmapRaw(filename, BeatmapLookupType.Filename);
        return new Beatmap(this, raw);
    }

    /**
     * Gets the score leaderboard for a beatmap
     *
     * @param id The beatmap ID
     * @param options Possible options for requesting the leaderboard
     *
     * @returns The beatmap leaderboards
     */
    public async getBeatmapScores(
        id: number | string,
        options: BeatmapScoreOptions
    ): Promise<BeatmapScoresResponse> {
        if (!this.token)
            throw new MissingTokenError(this.missingTokenMessage);

        const query: Record<string, string> = {
            type: options.type ?? BeatmapLeaderboardScope.Global
        };
        if (options.mode) query.mode = options.mode;
        if (options.mods) query.mode = options.mods.join("+");
        const response = await this.requestHandler.request<BeatmapScoresResponse>({
            auth: this.token.access_token,
            endpoint: Endpoints.API_PREFIX + Endpoints.BEATMAP_SCORES,
            endpointArguments: { beatmap: id.toString() },
            type: RequestType.GET,
            query
        });
        return response;
    }

    /**
     * Gets the user's high score on a beatmap
     *
     * @param beatmapID The beatmap ID
     * @param userID The user ID
     * @param options Possible options for requesting the leaderboard
     *
     * @returns The user's high score
     */
    public async getBeatmapUserScore(
        beatmapID: number | string,
        userID: number | string,
        options: BeatmapScoreOptions
    ): Promise<BeatmapUserScoreResponse> {
        if (!this.token)
            throw new MissingTokenError(this.missingTokenMessage);

        const query: Record<string, string> = {
            type: options.type ?? BeatmapLeaderboardScope.Global
        };
        if (options.mode) query.mode = options.mode;
        if (options.mods) query.mode = options.mods.join("+");
        const response = await this.requestHandler.request<BeatmapUserScoreResponse>({
            auth: this.token.access_token,
            endpoint: Endpoints.API_PREFIX + Endpoints.BEATMAP_USER_SCORE,
            endpointArguments: { beatmap: beatmapID.toString(), user: userID.toString() },
            type: RequestType.GET,
            query
        });
        return response;
    }


    /**
     * Gets a beatmapset using its ID
     *
     * @param id The beatmapset ID
     */
    public async getBeatmapset(id: number | string): Promise<Beatmapset> {
        if (!this.token)
            throw new MissingTokenError(this.missingTokenMessage);

        const response = await this.requestHandler.request<BeatmapsetResponse>({
            auth: this.token.access_token,
            endpoint: Endpoints.API_PREFIX + Endpoints.BEATMAPSET_SINGLE,
            endpointArguments: { beatmapset: id.toString() },
            type: RequestType.GET
        });
        return new Beatmapset(this, response);
    }

    /**
     * Gets information about a particular user
     *
     * @param id The user ID
     * @param mode Returns specific details about the user in this gamemode, defaults
     *             to the user's default gamemode
     *
     * @return A populated user
     */
    public async getUser(id: number | string, mode?: Gamemode): Promise<User> {
        const response = await this.getUserRaw(id.toString(), "id", mode);
        return new User(this, response);
    }

    /**
     * Gets information about a particular user
     *
     * Same as {@link getUser} but searches using their username instead
     *
     * @param username The user's username
     * @param mode Returns specific details about the user in this gamemode, defaults
     *             to the user's default gamemode
     *
     * @return A populated user
     */
    public async getUserByName(username: string, mode?: Gamemode): Promise<User> {
        const response = await this.getUserRaw(username, "username", mode);
        return new User(this, response);
    }

    /**
     * Gets scores from a user
     *
     * @param id The user ID
     * @param type The score request type
     * @param mode Specific gamemode to request for
     *
     * @returns An array of scores
     */
    public async getUserScores(id: number | string, type: ScoreType, mode?: Gamemode): Promise<ScoreResponse[]> {
        if (!this.token)
            throw new MissingTokenError(this.missingTokenMessage);

        const response = await this.requestHandler.request<ScoreResponse[]>({
            auth: this.token.access_token,
            endpoint: Endpoints.API_PREFIX + Endpoints.USER_SCORES,
            endpointArguments: { user: id.toString(), type },
            query: mode ? { mode } : {},
            type: RequestType.GET
        });
        return response;
    }

    /**
     * This is split off from {@link getUser} because 3 methods need it:
     * - {@link getUser}
     * - {@link getUserByName}
     * - {@link User.populate}
     *
     * @internal
     */
    public async getUserRaw(query: string, key: "id" | "username", mode?: Gamemode) {
        if (!this.token)
            throw new MissingTokenError(this.missingTokenMessage);

        const response = await this.requestHandler.request<UserResponse>({
            auth: this.token.access_token,
            endpoint: Endpoints.API_PREFIX + Endpoints.USER_SINGLE,
            endpointArguments: { user: query, mode: mode ?? "" },
            query: { key },
            type: RequestType.GET
        });

        return response;
    }

    /** @internal */
    public async getBeatmapRaw(query: number | string, type: BeatmapLookupType): Promise<BeatmapResponse> {
        if (!this.token)
            throw new MissingTokenError(this.missingTokenMessage);

        const response = await this.requestHandler.request<BeatmapResponse>({
            auth: this.token.access_token,
            endpoint: Endpoints.API_PREFIX + Endpoints.BEATMAP_LOOKUP,
            type: RequestType.GET,
            query: { [type]: query.toString() }
        });
        return response;
    }
}

/**
 * Possible options to configure the client
 */
export type ClientOptions = {
    /**
     * Options for {@link RequestHandler}
     */
    requestHandler?: RequestHandlerOptions;
};

/**
 * Possible options for getting beatmap score leaderboards
 */
export type BeatmapScoreOptions = {
    /** Leaderboard type */
    type?: BeatmapLeaderboardScope;
    /** Specific gamemode to get */
    mode?: Gamemode;
    /** Mods to filter (exact combination) */
    mods?: Mod[];
};
