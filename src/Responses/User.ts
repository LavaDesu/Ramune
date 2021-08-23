import { Gamemode, Playstyle, ProfileSection, InfringementType } from "../Enums";

export interface UserCompact {
    id: number;
    username: string;

    avatar_url: string;
    country_code: string;
    default_group: string;
    is_active: boolean;
    is_bot: boolean;
    is_deleted: boolean;
    is_online: boolean;
    is_supporter: boolean;
    last_visit: string;
    pm_friends_only: boolean;
    profile_colour: string | null;
}

export interface UserExtended extends UserCompact {
    country: Country;
    cover: Cover;
    /** @deprecated */
    cover_url: string;
    discord: string | null;
    has_supported: boolean;
    interests: string | null;
    join_date: string;
    kudosu: {
        available: number;
        total: number;
    };
    location: string | null;
    max_blocks: number;
    max_friends: number;
    occupation: string | null;
    playmode: Gamemode;
    playstyle: Playstyle[];
    post_count: number;
    profile_order: ProfileSection[];
    title: string | null;
    title_url: string | null;
    twitter: string | null;
    website: string | null;
}

export interface User$getUser extends UserExtended {
    account_history: AccountHistory[];
    active_tournament_banner: Banner | null;
    badges: Badge[];
    beatmap_playcounts_count: number;
    comments_count: number;
    favourite_beatmapset_count: number;
    follower_count: number;
    graveyard_beatmapset_count: number;
    groups: UserGroup[];
    loved_beatmapset_count: number;
    mapping_follower_count: number;
    monthly_playcounts: Count[];
    page: Page;
    pending_beatmapset_count: number;
    previous_usernames: string[];
    ranked_beatmapset_count: number;
    replays_watched_counts: Count[];
    scores_best_count: number;
    scores_first_count: number;
    scores_recent_count: number;
    rank_history: RankHistory;
    /** @deprecated use ranked_beatmapset_count */
    ranked_and_approved_beatmapset_count: number;
    // TODO
    statistics: UserStatistics;
    support_level: number;
    user_achievements: Achievement[];
    /** @deprecated use pending_beatmapset_count */
    unranked_beatmapset_count: number;

    /** @deprecated use rank_history */
    rankHistory: RankHistory;
};

export interface AccountHistory {
    description: string | null;
    type: InfringementType;
    timestamp: string;
    length: number;
}

export interface Achievement {
    achieved_at: string;
    achievement_id: number;
}

export interface Badge {
    awarded_at: string;
    description: string;
    image_url: string;
    url: string;
}

export interface Banner {
    id: number;
    tournament_id: number;
    image: string;
}

export interface Count {
    count: number;
    start_date: string;
}

export interface Country {
    code: string;
    name: string;
}

export interface Cover {
    id: number | null;
    custom_url: string | null;
    url: string;
}

export interface Group {
    id: number;
    colour: string;
    has_listing: boolean;
    has_playmodes: boolean;
    identifier: string;
    is_probationary: boolean;
    name: string;
    short_name: string;
    description?: {
        html: string;
        markdown: string;
    };
}

export interface Kudosu {
    available: number;
    total: number;
}

export interface Page {
    html: string;
    raw: string;
}

export interface RankHistory {
    mode: string;
    data: number[];
}

export interface UserGroup extends Group {
    playmodes: Gamemode[] | null;
}

export interface UserStatistics {
    country_rank: number;
    global_rank: number;
    grade_counts: GradeCounts;
    hit_accuracy: number;
    is_ranked: boolean;
    level: Level;
    maximum_combo: number;
    play_count: number;
    play_time: number;
    pp: number;
    /**
     * @deprecated
     * undocumented
     * also assuming deprecated because it only has country, and
     * country_rank is also returned along with global_rank
     */
    rank: Rank;
    ranked_score: number;
    replays_watched_by_others: number;
    total_hits: number;
    total_score: number;
    /** not circular; doesn't exist if the statistics is part of a User response */
    user?: UserCompact;
};

export type GradeCounts = {
    ss: number;
    ssh: number;
    s: number;
    sh: number;
    a: number;
};

export type Level = {
    current: number;
    progress: number;
};

export type Rank = {
    country: number | null;
    global: number | null;
};

export type User = UserCompact | UserExtended | User$getUser;
