export declare const BeatmapApproval: {
    readonly Approved: "approved";
    readonly Loved: "loved";
    readonly Qualified: "qualified";
    readonly Ranked: "ranked";
};
export declare const BeatmapLeaderboardScope: {
    readonly Country: "country";
    readonly Global: "global";
    readonly Friend: "friend";
};
/** Beatmap lookup type */
export declare const BeatmapLookupType: {
    /** Lookup a beatmap given its checksum */
    readonly Checksum: "checksum";
    /** Lookup a beatmap given its ID */
    readonly ID: "id";
    /** Lookup a beatmap given its filename */
    readonly Filename: "filename";
};
export declare const BeatmapsetOnlineStatus: {
    readonly Approved: "approved";
    readonly Graveyard: "graveyard";
    readonly Loved: "loved";
    readonly Pending: "pending";
    readonly Qualified: "qualified";
    readonly Ranked: "ranked";
    readonly WIP: "wip";
};
export declare const BeatmapsetType: {
    readonly Favourite: "favourite";
    readonly Graveyard: "graveyard";
    readonly Loved: "loved";
    readonly Pending: "unranked";
    readonly RankedAndApproved: "ranked_and_approved";
    readonly Unranked: "unranked";
};
/** Gamemode types */
export declare const Gamemode: {
    readonly Osu: "osu";
    readonly Taiko: "taiko";
    readonly Catch: "fruits";
    readonly Mania: "mania";
};
/** Grant types */
export declare const GrantType: {
    readonly AuthCode: "authorization_code";
    readonly ClientCredentials: "client_credentials";
    readonly RefreshToken: "refresh_token";
};
export declare const KudosuAction: {
    readonly Give: "give";
    readonly Reset: "reset";
    readonly Revoke: "revoke";
};
export declare const KudosuSource: {
    readonly AllowKudosu: "allowkudosu";
    readonly Delete: "delete";
    readonly DenyKudosu: "denykudosu";
    readonly Forum: "forum";
    readonly Recalculate: "recalculate";
    readonly Restore: "restore";
    readonly Unknown: "unknown";
    readonly Vote: "vote";
};
/** Available gameplay mods */
export declare const Mod: {
    readonly Daycore: "DC";
    readonly DifficultyAdjust: "DA";
    readonly DoubleTime: "DT";
    readonly Easy: "EZ";
    readonly Flashlight: "FL";
    readonly HardRock: "HR";
    readonly HalfTime: "HT";
    readonly Hidden: "HD";
    readonly Nightcore: "NC";
    readonly NoFail: "NF";
    readonly Perfect: "PF";
    readonly Relax: "RX";
    readonly SuddenDeath: "SD";
    readonly WindUp: "WU";
    readonly WindDown: "WD";
    readonly AutoPilot: "AP";
    readonly Blind: "BL";
    readonly Deflate: "DF";
    readonly Grow: "GR";
    readonly SpinIn: "SI";
    readonly SpunOut: "SO";
    readonly Target: "TP";
    readonly Traceable: "TC";
    readonly Transform: "TR";
    readonly Wiggle: "WG";
    readonly Key1: "1K";
    readonly Key2: "2K";
    readonly Key3: "3K";
    readonly Key4: "4K";
    readonly Key5: "5K";
    readonly Key6: "6K";
    readonly Key7: "7K";
    readonly Key8: "8K";
    readonly Key9: "9K";
    readonly DualStage: "DS";
    readonly FadeIn: "FI";
    readonly Mirror: "MR";
    readonly Random: "RD";
    readonly Autoplay: "AT";
    readonly Cinema: "CN";
    readonly NoMod: "NM";
};
/** User playstyles */
export declare const Playstyle: {
    readonly Keyboard: "keyboard";
    readonly Tablet: "tablet";
    readonly Mouse: "mouse";
    readonly Touchscreen: "touch";
};
/** Profile sections/pages/cards */
export declare const ProfileSection: {
    readonly Me: "me";
    readonly RecentActivity: "recent_activity";
    readonly Beatmaps: "beatmaps";
    readonly Historical: "historical";
    readonly Kudosu: "kudosu";
    readonly TopRanks: "top_ranks";
    readonly Medals: "medals";
};
/** Available ranking types */
export declare const RankingType: {
    readonly Charts: "charts";
    readonly Country: "country";
    readonly Performance: "performance";
    readonly Score: "score";
};
export declare const RecentActivityType: {
    readonly Achievement: "achievement";
    readonly BeatmapPlaycount: "beatmapPlaycount";
    readonly BeatmapsetApprove: "beatmapsetApprove";
    readonly BeatmapsetDelete: "beatmapsetDelete";
    readonly BeatmapsetRevive: "beatmapsetRevive";
    readonly BeatmapsetUpdate: "beatmapsetUpdate";
    readonly BeatmapsetUpload: "beatmapsetUpload";
    readonly Medal: "medal";
    readonly Rank: "rank";
    readonly RankLost: "rankLost";
    readonly UserSupportAgain: "userSupportAgain";
    readonly UserSupportFirst: "userSupportFirst";
    readonly UserSupportGift: "userSupportGift";
    readonly UsernameChange: "usernameChange";
};
/** Infringement types */
export declare const InfringementType: {
    readonly Note: "note";
    readonly Restriction: "restriction";
    readonly Silence: "silence";
};
/** REST request types */
export declare const RequestType: {
    readonly GET: "GET";
    readonly POST: "POST";
    readonly PUT: "PUT";
    readonly PATCH: "PATCH";
    readonly DEL: "DELETE";
};
export declare const ScoreRank: {
    readonly D: "D";
    readonly C: "C";
    readonly B: "B";
    readonly A: "A";
    readonly S: "S";
    /** S with hidden, also known as S+ */
    readonly SH: "SH";
    /** 100% accuracy, also known as SS */
    readonly X: "X";
    /** X with hidden, also known as SS+ */
    readonly XH: "XH";
};
/** User score request types */
export declare const ScoreType: {
    /** The user's best scores */
    readonly Best: "best";
    /** The user's top #1 scores */
    readonly Firsts: "firsts";
    /** The user's recent (24h) scores */
    readonly Recent: "recent";
};
/** Token types */
export declare const TokenType: {
    readonly Bearer: "Bearer";
};
export declare type BeatmapApproval = (typeof BeatmapApproval)[keyof typeof BeatmapApproval];
export declare type BeatmapLeaderboardScope = (typeof BeatmapLeaderboardScope)[keyof typeof BeatmapLeaderboardScope];
export declare type BeatmapLookupType = (typeof BeatmapLookupType)[keyof typeof BeatmapLookupType];
export declare type BeatmapsetOnlineStatus = (typeof BeatmapsetOnlineStatus)[keyof typeof BeatmapsetOnlineStatus];
export declare type BeatmapsetType = (typeof BeatmapsetType)[keyof typeof BeatmapsetType];
export declare type Gamemode = (typeof Gamemode)[keyof typeof Gamemode];
export declare type GrantType = (typeof GrantType)[keyof typeof GrantType];
export declare type KudosuAction = (typeof KudosuAction)[keyof typeof KudosuAction];
export declare type KudosuSource = (typeof KudosuSource)[keyof typeof KudosuSource];
export declare type InfringementType = (typeof InfringementType)[keyof typeof InfringementType];
export declare type Mod = (typeof Mod)[keyof typeof Mod];
export declare type Playstyle = (typeof Playstyle)[keyof typeof Playstyle];
export declare type ProfileSection = (typeof ProfileSection)[keyof typeof ProfileSection];
export declare type RankingType = (typeof RankingType)[keyof typeof RankingType];
export declare type RecentActivityType = (typeof RecentActivityType)[keyof typeof RecentActivityType];
export declare type RequestType = (typeof RequestType)[keyof typeof RequestType];
export declare type ScoreRank = (typeof ScoreRank)[keyof typeof ScoreRank];
export declare type ScoreType = (typeof ScoreType)[keyof typeof ScoreType];
export declare type TokenType = (typeof TokenType)[keyof typeof TokenType];
//# sourceMappingURL=Enums.d.ts.map