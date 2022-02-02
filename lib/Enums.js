"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenType = exports.ScoreType = exports.ScoreRank = exports.RequestType = exports.InfringementType = exports.RecentActivityType = exports.RankingType = exports.ProfileSection = exports.Playstyle = exports.Mod = exports.KudosuSource = exports.KudosuAction = exports.GrantType = exports.Gamemode = exports.BeatmapsetType = exports.BeatmapsetOnlineStatus = exports.BeatmapLookupType = exports.BeatmapLeaderboardScope = exports.BeatmapApproval = void 0;
exports.BeatmapApproval = {
    Approved: "approved",
    Loved: "loved",
    Qualified: "qualified",
    Ranked: "ranked"
};
exports.BeatmapLeaderboardScope = {
    Country: "country",
    Global: "global",
    Friend: "friend"
};
/** Beatmap lookup type */
exports.BeatmapLookupType = {
    /** Lookup a beatmap given its checksum */
    Checksum: "checksum",
    /** Lookup a beatmap given its ID */
    ID: "id",
    /** Lookup a beatmap given its filename */
    Filename: "filename"
};
exports.BeatmapsetOnlineStatus = {
    Approved: "approved",
    Graveyard: "graveyard",
    Loved: "loved",
    Pending: "pending",
    Qualified: "qualified",
    Ranked: "ranked",
    WIP: "wip"
};
exports.BeatmapsetType = {
    Favourite: "favourite",
    Graveyard: "graveyard",
    Loved: "loved",
    Pending: "unranked",
    RankedAndApproved: "ranked_and_approved",
    Unranked: "unranked"
};
/** Gamemode types */
exports.Gamemode = {
    Osu: "osu",
    Taiko: "taiko",
    Catch: "fruits",
    Mania: "mania"
};
/** Grant types */
exports.GrantType = {
    AuthCode: "authorization_code",
    ClientCredentials: "client_credentials",
    RefreshToken: "refresh_token"
};
exports.KudosuAction = {
    Give: "give",
    Reset: "reset",
    Revoke: "revoke"
};
exports.KudosuSource = {
    AllowKudosu: "allowkudosu",
    Delete: "delete",
    DenyKudosu: "denykudosu",
    Forum: "forum",
    Recalculate: "recalculate",
    Restore: "restore",
    Unknown: "unknown",
    Vote: "vote"
};
/** Available gameplay mods */
exports.Mod = {
    Daycore: "DC",
    DifficultyAdjust: "DA",
    DoubleTime: "DT",
    Easy: "EZ",
    Flashlight: "FL",
    HardRock: "HR",
    HalfTime: "HT",
    Hidden: "HD",
    Nightcore: "NC",
    NoFail: "NF",
    Perfect: "PF",
    Relax: "RX",
    SuddenDeath: "SD",
    WindUp: "WU",
    WindDown: "WD",
    AutoPilot: "AP",
    Blind: "BL",
    Deflate: "DF",
    Grow: "GR",
    SpinIn: "SI",
    SpunOut: "SO",
    Target: "TP",
    Traceable: "TC",
    Transform: "TR",
    Wiggle: "WG",
    Key1: "1K",
    Key2: "2K",
    Key3: "3K",
    Key4: "4K",
    Key5: "5K",
    Key6: "6K",
    Key7: "7K",
    Key8: "8K",
    Key9: "9K",
    DualStage: "DS",
    FadeIn: "FI",
    Mirror: "MR",
    Random: "RD",
    Autoplay: "AT",
    Cinema: "CN",
    NoMod: "NM"
};
/** User playstyles */
exports.Playstyle = {
    Keyboard: "keyboard",
    Tablet: "tablet",
    Mouse: "mouse",
    Touchscreen: "touch"
};
/** Profile sections/pages/cards */
exports.ProfileSection = {
    Me: "me",
    RecentActivity: "recent_activity",
    Beatmaps: "beatmaps",
    Historical: "historical",
    Kudosu: "kudosu",
    TopRanks: "top_ranks",
    Medals: "medals"
};
/** Available ranking types */
exports.RankingType = {
    Charts: "charts",
    Country: "country",
    Performance: "performance",
    Score: "score"
};
exports.RecentActivityType = {
    Achievement: "achievement",
    BeatmapPlaycount: "beatmapPlaycount",
    BeatmapsetApprove: "beatmapsetApprove",
    BeatmapsetDelete: "beatmapsetDelete",
    BeatmapsetRevive: "beatmapsetRevive",
    BeatmapsetUpdate: "beatmapsetUpdate",
    BeatmapsetUpload: "beatmapsetUpload",
    Medal: "medal",
    Rank: "rank",
    RankLost: "rankLost",
    UserSupportAgain: "userSupportAgain",
    UserSupportFirst: "userSupportFirst",
    UserSupportGift: "userSupportGift",
    UsernameChange: "usernameChange"
};
/** Infringement types */
exports.InfringementType = {
    Note: "note",
    Restriction: "restriction",
    Silence: "silence"
};
/** REST request types */
exports.RequestType = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    PATCH: "PATCH",
    DEL: "DELETE"
};
exports.ScoreRank = {
    D: "D",
    C: "C",
    B: "B",
    A: "A",
    S: "S",
    /** S with hidden, also known as S+ */
    SH: "SH",
    /** 100% accuracy, also known as SS */
    X: "X",
    /** X with hidden, also known as SS+ */
    XH: "XH"
};
/** User score request types */
exports.ScoreType = {
    /** The user's best scores */
    Best: "best",
    /** The user's top #1 scores */
    Firsts: "firsts",
    /** The user's recent (24h) scores */
    Recent: "recent"
};
/** Token types */
exports.TokenType = {
    Bearer: "Bearer"
};
//# sourceMappingURL=Enums.js.map