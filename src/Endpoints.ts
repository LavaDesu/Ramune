/**
 * This enum declares all accessable endpoints of osu!api v2
 */
export enum Endpoints {
    API_PREFIX = "/api/v2",
    OAUTH_PREFIX = "/oauth",

    TOKEN = "/token",

    BEATMAP_SINGLE = "/beatmaps/{beatmap}",
    BEATMAP_LOOKUP = "/beatmaps/lookup",
    BEATMAP_SCORES = "/beatmaps/{beatmap}/scores",
    BEATMAP_USER_SCORE = "/beatmaps/{beatmap}/scores/users/{user}",

    BEATMAPSET_SINGLE = "/beatmapsets/{beatmapset}",
    BEATMAPSET_EVENTS = "/beatmapsets/events",
    BEATMAPSET_LOOKUP = "/beatmapsets/lookup",
    BEATMAPSET_SEARCH = "/beatmapsets/search/{filters}",

    CHANGELOG = "/changelog",
    CHANGELOG_BUILD = "/changelog/{stream}/{build}",
    CHANGELOG_SINGLE = "/changelog/{changelog}",

    FRIEND = "/friends",
    ME = "/me/{mode}",

    NEWS = "/news",
    NEWS_SINGLE = "/news/{news}",

    RANKINGS = "/rankings/{mode}/{type}",

    ROOMS = "/rooms/{mode?}",
    ROOM_SINGLE = "/rooms/{room}",
    ROOM_LEADERBOARD = "/rooms/{room}/leaderboard",
    ROOM_SCORES = "/rooms/{room}/playlist/{playlist}/scores",

    SCORE_SINGLE = "/scores/{mode}/{score}",
    SCORE_DOWNLOAD = "/scores/{mode}/{score}/download",

    SEASONAL_BACKGROUNDS = "/seasonal-backgrounds",

    SPOTLIGHTS = "/spotlights",

    USER_SINGLE = "/users/{user}/{mode}",
    USER_BEATMAPSETS = "/users/{user}/beatmapsets/{type}",
    USER_KUDOSU = "/users/{user}/kudosu",
    USER_RECENT_ACTIVITY = "/users/{user}/recent_activity",
    USER_SCORES = "/users/{user}/scores/{type}"
}
