/// <reference types="node" />
import { EventEmitter } from "events";
import { BeatmapLeaderboardScope, Gamemode, Mod, ScoreType } from "../Enums";
import { Token, BeatmapScores as BeatmapScoresResponse, BeatmapUserScore as BeatmapUserScoreResponse, Score as ScoreResponse } from "../Responses";
import { Beatmap, Beatmapset, Match, User } from "../Structures";
import { IndexedCursor, MatchCursor, RequestHandler, RequestHandlerOptions, RequestObject } from "../Utils";
declare function tokenUpdate(token: Token): void;
declare type ClientEvents<T> = {
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
declare type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export declare type BaseRequestObject = Optional<RequestObject, "auth" | "type">;
/**
 * An OAuth Client, storing a token and request handler that can be used to
 * query the osu! API
 */
export declare abstract class Client extends EventEmitter {
    /** The current token used for authenticated requests */
    token?: Token;
    protected missingTokenMessage?: string;
    protected refreshTimer: NodeJS.Timeout;
    protected readonly requestHandler: RequestHandler;
    /**
     * Constructs a client
     *
     * @remark Please do not construct this class directly!
     * Use either {@link Ramune.constructor | Ramune} or {@link Ramune.createUserClient} instead
     */
    constructor(options?: ClientOptions);
    /**
     * Refreshes the token
     *
     * There is already an internal timer that refreshes 100 seconds
     * before {@link Token.expires_in}, so applications do not need to call this
     * themselves.
     *
     * @returns The newly refreshed token
     */
    abstract refreshToken(): Promise<Token>;
    /**
     * Get a beatmap using its ID
     * @param id Beatmap ID
     */
    getBeatmap(id: number | string): Promise<Beatmap>;
    /**
     * Get a beatmap using its checksum
     * @param checksum Beatmap checksum
     */
    getBeatmapByChecksum(checksum: string): Promise<Beatmap>;
    /**
     * Get a beatmap using its filename
     * @param filename Beatmap filename
     */
    getBeatmapByFilename(filename: string): Promise<Beatmap>;
    /**
     * Gets the score leaderboard for a beatmap
     *
     * @param id The beatmap ID
     * @param options Possible options for requesting the leaderboard
     *
     * @returns The beatmap leaderboards
     */
    getBeatmapScores(id: number | string, options: BeatmapScoreOptions): Promise<BeatmapScoresResponse>;
    /**
     * Gets the user's high score on a beatmap
     *
     * @param beatmapID The beatmap ID
     * @param userID The user ID
     * @param options Possible options for requesting the leaderboard
     *
     * @returns The user's high score
     */
    getBeatmapUserScore(beatmapID: number | string, userID: number | string, options: BeatmapScoreOptions): Promise<BeatmapUserScoreResponse>;
    /**
     * Gets a beatmapset using its ID
     *
     * @param id The beatmapset ID
     */
    getBeatmapset(id: number | string): Promise<Beatmapset>;
    /**
     * Gets a match
     */
    getMatch(id: number | string): Promise<Match>;
    /**
     * Gets all matches
     */
    getMatches(): MatchCursor;
    /**
     * Gets information about a particular user
     *
     * @param id The user ID
     * @param mode Returns specific details about the user in this gamemode, defaults
     *             to the user's default gamemode
     *
     * @return A populated user
     */
    getUser(id: number | string, mode?: Gamemode): Promise<User>;
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
    getUserByName(username: string, mode?: Gamemode): Promise<User>;
    /**
     * Gets scores from a user
     *
     * @param id The user ID
     * @param type The score request type
     * @param mode Specific gamemode to request for
     *
     * @returns An array of scores
     */
    getUserScores(id: number | string, type: ScoreType, mode?: Gamemode): IndexedCursor<ScoreResponse, ScoreResponse>;
}
/**
 * Possible options to configure the client
 */
export declare type ClientOptions = {
    /**
     * Options for {@link RequestHandler}
     */
    requestHandler?: RequestHandlerOptions;
};
/**
 * Possible options for getting beatmap score leaderboards
 */
export declare type BeatmapScoreOptions = {
    /** Leaderboard type */
    type?: BeatmapLeaderboardScope;
    /** Specific gamemode to get */
    mode?: Gamemode;
    /** Mods to filter (exact combination) */
    mods?: Mod[];
};
export {};
//# sourceMappingURL=Client.d.ts.map