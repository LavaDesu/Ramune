/** @module This module declares all accessible endpoints of osu!api v2 */
export const API_PREFIX = "/api/v2";
export const OAUTH_PREFIX = "/oauth";

export const TOKEN = OAUTH_PREFIX + "/token";
export const TOKEN_REVOKE = API_PREFIX + "/oauth/tokens/current";

export const BEATMAP_LOOKUP = API_PREFIX + "/beatmaps/lookup";
export const BEATMAP_SINGLE = API_PREFIX + "/beatmaps/{beatmap}";
export const BEATMAP_SCORES = API_PREFIX + "/beatmaps/{beatmap}/scores";
export const BEATMAP_USER_SCORE = API_PREFIX + "/beatmaps/{beatmap}/scores/users/{user}";

export const BEATMAPSET_SINGLE = API_PREFIX + "/beatmapsets/{beatmapset}";
export const BEATMAPSET_DISCUSSIONS = API_PREFIX + "/beatmapsets/{beatmapset}/discussions";
export const BEATMAPSET_DISCUSSION_POSTS = API_PREFIX + "/beatmapsets/{beatmapset}/discussions/posts";
export const BEATMAPSET_DISCUSSION_VOTES = API_PREFIX + "/beatmapsets/{beatmapset}/discussions/votes";
export const BEATMAPSET_EVENTS = API_PREFIX + "/beatmapsets/events";
export const BEATMAPSET_LOOKUP = API_PREFIX + "/beatmapsets/lookup";
export const BEATMAPSET_SEARCH = API_PREFIX + "/beatmapsets/search/{filters}";

export const CHANGELOG = API_PREFIX + "/changelog";
export const CHANGELOG_SINGLE = API_PREFIX + "/changelog/{changelog}";
export const CHANGELOG_BUILD = API_PREFIX + "/changelog/{stream}/{build}";

export const CHAT_NEW = API_PREFIX + "/chat/new";

export const COMMENTS = API_PREFIX + "/comments/{comment}";
export const COMMENT_SINGLE = API_PREFIX + "/comments/{comment}";
export const COMMENT_VOTE = API_PREFIX + "/comments/{comment}/vote";

export const FORUMS_POST_SINGLE = API_PREFIX + "/forums/posts/{post}";
export const FORUMS_TOPICS = API_PREFIX + "/forums/topics";
export const FORUMS_TOPIC_SINGLE = API_PREFIX + "/forums/topics/{topic}";
export const FORUMS_TOPIC_REPLY = API_PREFIX + "/forums/topics/{topic}/reply";

export const FRIENDS = API_PREFIX + "/friends";

export const MATCHES = API_PREFIX + "/matches";
export const MATCH_SINGLE = API_PREFIX + "/matches/{match}";

export const ME = API_PREFIX + "/me/{mode}";

export const NEWS = API_PREFIX + "/news";
export const NEWS_SINGLE = API_PREFIX + "/news/{news}";

export const RANKINGS = API_PREFIX + "/rankings/{mode}/{type}";

export const ROOMS = API_PREFIX + "/rooms/{mode}";
export const ROOM_SINGLE = API_PREFIX + "/rooms/{room}";
export const ROOM_LEADERBOARD = API_PREFIX + "/rooms/{room}/leaderboard";
export const ROOM_SCORES = API_PREFIX + "/rooms/{room}/playlist/{playlist}/scores";

export const SCORE_SINGLE = API_PREFIX + "/scores/{mode}/{score}";
export const SCORE_DOWNLOAD = API_PREFIX + "/scores/{mode}/{score}/download";

export const SEARCH = API_PREFIX + "/search";

export const SEASONAL_BACKGROUNDS = API_PREFIX + "/seasonal-backgrounds";

export const SPOTLIGHTS = API_PREFIX + "/spotlights";

export const USER_SINGLE = API_PREFIX + "/users/{user}/{mode}";
export const USER_BEATMAPSETS = API_PREFIX + "/users/{user}/beatmapsets/{type}";
export const USER_KUDOSU = API_PREFIX + "/users/{user}/kudosu";
export const USER_RECENT_ACTIVITY = API_PREFIX + "/users/{user}/recent_activity";
export const USER_SCORES = API_PREFIX + "/users/{user}/scores/{type}";

export const WIKI = API_PREFIX + "/wiki/{locale}/{path}";
