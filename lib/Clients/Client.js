"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const events_1 = require("events");
const Endpoints = require("../Endpoints");
const Errors_1 = require("../Errors");
const Enums_1 = require("../Enums");
const Structures_1 = require("../Structures");
const Utils_1 = require("../Utils");
/**
 * An OAuth Client, storing a token and request handler that can be used to
 * query the osu! API
 */
class Client extends events_1.EventEmitter {
    /**
     * Constructs a client
     *
     * @remark Please do not construct this class directly!
     * Use either {@link Ramune.constructor | Ramune} or {@link Ramune.createUserClient} instead
     */
    constructor(options) {
        super();
        this.requestHandler = new Utils_1.RequestHandler(options?.requestHandler);
    }
    /**
     * Updates the current token.
     *
     * This method emits the {@link tokenUpdate} event
     *
     * @internal
     */
    updateToken(token) {
        // NOTE: Should this be prepended every request instead?
        token.access_token = "Bearer " + token.access_token;
        this.token = token;
        if (this.refreshTimer)
            clearTimeout(this.refreshTimer);
        this.refreshTimer = setTimeout(this.refreshToken.bind(this), (token.expires_in - 100) * 1e3).unref();
        this.emit("tokenUpdate", token);
    }
    /**
     * Get a beatmap using its ID
     * @param id Beatmap ID
     */
    async getBeatmap(id) {
        const raw = await this.getBeatmapRaw(id, Enums_1.BeatmapLookupType.ID);
        return new Structures_1.Beatmap(this, raw);
    }
    /**
     * Get a beatmap using its checksum
     * @param checksum Beatmap checksum
     */
    async getBeatmapByChecksum(checksum) {
        const raw = await this.getBeatmapRaw(checksum, Enums_1.BeatmapLookupType.Checksum);
        return new Structures_1.Beatmap(this, raw);
    }
    /**
     * Get a beatmap using its filename
     * @param filename Beatmap filename
     */
    async getBeatmapByFilename(filename) {
        const raw = await this.getBeatmapRaw(filename, Enums_1.BeatmapLookupType.Filename);
        return new Structures_1.Beatmap(this, raw);
    }
    /**
     * Gets the score leaderboard for a beatmap
     *
     * @param id The beatmap ID
     * @param options Possible options for requesting the leaderboard
     *
     * @returns The beatmap leaderboards
     */
    async getBeatmapScores(id, options) {
        const query = {
            type: options.type ?? Enums_1.BeatmapLeaderboardScope.Global
        };
        if (options.mode)
            query.mode = options.mode;
        if (options.mods)
            query.mode = options.mods.join("+");
        const response = await this.internalRequest({
            endpoint: Endpoints.BEATMAP_SCORES,
            endpointArguments: { beatmap: id.toString() },
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
    async getBeatmapUserScore(beatmapID, userID, options) {
        const query = {
            type: options.type ?? Enums_1.BeatmapLeaderboardScope.Global
        };
        if (options.mode)
            query.mode = options.mode;
        if (options.mods)
            query.mode = options.mods.join("+");
        const response = await this.internalRequest({
            endpoint: Endpoints.BEATMAP_USER_SCORE,
            endpointArguments: { beatmap: beatmapID.toString(), user: userID.toString() },
            query
        });
        return response;
    }
    /**
     * Gets a beatmapset using its ID
     *
     * @param id The beatmapset ID
     */
    async getBeatmapset(id) {
        const response = await this.internalRequest({
            endpoint: Endpoints.BEATMAPSET_SINGLE,
            endpointArguments: { beatmapset: id.toString() }
        });
        return new Structures_1.Beatmapset(this, response);
    }
    /**
     * Gets a match
     */
    async getMatch(id) {
        const response = await this.internalRequest({
            endpoint: Endpoints.MATCH_SINGLE,
            endpointArguments: { match: id.toString() }
        });
        return new Structures_1.Match(this, response);
    }
    /**
     * Gets all matches
     */
    getMatches() {
        return new Utils_1.MatchCursor(this);
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
    async getUser(id, mode) {
        const response = await this.getUserRaw(id.toString(), "id", mode);
        return new Structures_1.User(this, response);
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
    async getUserByName(username, mode) {
        const response = await this.getUserRaw(username, "username", mode);
        return new Structures_1.User(this, response);
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
    getUserScores(id, type, mode) {
        return new Utils_1.IndexedCursor(this, {
            endpoint: Endpoints.USER_SCORES,
            endpointArguments: { user: id.toString(), type },
            query: mode ? { mode } : {}
        }, async (res) => res);
    }
    /**
     * This is split off from {@link getUser} because 3 methods need it:
     * - {@link getUser}
     * - {@link getUserByName}
     * - {@link User.populate}
     *
     * @internal
     */
    async getUserRaw(query, key, mode) {
        const response = await this.internalRequest({
            endpoint: Endpoints.USER_SINGLE,
            endpointArguments: { user: query, mode: mode ?? "" },
            query: { key }
        });
        return response;
    }
    /** @internal */
    async getBeatmapRaw(query, type) {
        const response = await this.internalRequest({
            endpoint: Endpoints.BEATMAP_LOOKUP,
            type: Enums_1.RequestType.GET,
            query: { [type]: query.toString() }
        });
        return response;
    }
    /** @internal */
    async internalRequest(args) {
        if (!this.token)
            throw new Errors_1.MissingTokenError(this.missingTokenMessage);
        return await this.requestHandler.request({
            auth: this.token.access_token,
            type: Enums_1.RequestType.GET,
            ...args
        });
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map