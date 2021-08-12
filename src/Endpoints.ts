/**
 * This enum declares all accessible endpoints of osu!api v2
 */
export enum Endpoints {
    API_PREFIX = "/api/v2",
    OAUTH_PREFIX = "/oauth",

    TOKEN = "/token",
    TOKEN_REVOKE = "/oauth/tokens/current",

    BEATMAP_LOOKUP = "/beatmaps/lookup",
    BEATMAP_SINGLE = "/beatmaps/{beatmap}",
    BEATMAP_SCORES = "/beatmaps/{beatmap}/scores",
    BEATMAP_USER_SCORE = "/beatmaps/{beatmap}/scores/users/{user}",

    BEATMAPSET_SINGLE = "/beatmapsets/{beatmapset}",
    BEATMAPSET_DISCUSSIONS = "/beatmapsets/{beatmapset}/discussions",
    BEATMAPSET_DISCUSSION_POSTS = "/beatmapsets/{beatmapset}/discussions/posts",
    BEATMAPSET_DISCUSSION_VOTES = "/beatmapsets/{beatmapset}/discussions/votes",
    BEATMAPSET_EVENTS = "/beatmapsets/events",
    BEATMAPSET_LOOKUP = "/beatmapsets/lookup",
    BEATMAPSET_SEARCH = "/beatmapsets/search/{filters}",

    CHANGELOG = "/changelog",
    CHANGELOG_SINGLE = "/changelog/{changelog}",
    CHANGELOG_BUILD = "/changelog/{stream}/{build}",

    CHAT_NEW = "/chat/new",

    COMMENTS = "/comments/{comment}",
    COMMENT_SINGLE = "/comments/{comment}",
    COMMENT_VOTE = "/comments/{comment}/vote",

    FORUMS_POST_SINGLE = "/forums/posts/{post}",
    FORUMS_TOPICS = "/forums/topics",
    FORUMS_TOPIC_SINGLE = "/forums/topics/{topic}",
    FORUMS_TOPIC_REPLY = "/forums/topics/{topic}/reply",

    FRIENDS = "/friends",

    MATCHES = "/matches",
    MATCH_SINGLE = "/matches/{match}",

    ME = "/me/{mode}",

    NEWS = "/news",
    NEWS_SINGLE = "/news/{news}",

    RANKINGS = "/rankings/{mode}/{type}",

    ROOMS = "/rooms/{mode}",
    ROOM_SINGLE = "/rooms/{room}",
    ROOM_LEADERBOARD = "/rooms/{room}/leaderboard",
    ROOM_SCORES = "/rooms/{room}/playlist/{playlist}/scores",

    SCORE_SINGLE = "/scores/{mode}/{score}",
    SCORE_DOWNLOAD = "/scores/{mode}/{score}/download",

    SEARCH = "/search",

    SEASONAL_BACKGROUNDS = "/seasonal-backgrounds",

    SPOTLIGHTS = "/spotlights",

    USER_SINGLE = "/users/{user}/{mode}",
    USER_BEATMAPSETS = "/users/{user}/beatmapsets/{type}",
    USER_KUDOSU = "/users/{user}/kudosu",
    USER_RECENT_ACTIVITY = "/users/{user}/recent_activity",
    USER_SCORES = "/users/{user}/scores/{type}",

    WIKI = "/wiki/{locale}/{path}"
}
