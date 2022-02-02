import { BeatmapsetOnlineStatus, Gamemode } from "../Enums";
import { Score, UserCompact } from "./";
export declare type Beatmap = BeatmapCompact | BeatmapExtended;
export interface BeatmapCompact {
    difficulty_rating: number;
    id: number;
    mode: Gamemode;
    status: BeatmapsetOnlineStatus;
    total_length: number;
    version: string;
    beatmapset?: Beatmapset | BeatmapsetCompact;
    checksum?: string;
    failtimes?: {
        exit?: number[];
        fail?: number[];
    };
    max_combo?: number;
}
export interface BeatmapExtended extends BeatmapCompact {
    accuracy: number;
    ar: number;
    beatmapset_id: number;
    bpm: number;
    convert: boolean;
    count_circles: number;
    count_sliders: number;
    count_spinners: number;
    cs: number;
    deleted_at: string | null;
    drain: number;
    hit_length: number;
    is_scoreable: boolean;
    last_updated: string;
    mode_int: number;
    passcount: number;
    playcount: number;
    ranked: number;
    url: string;
}
export interface BeatmapScores {
    scores: Score[];
    userScore: unknown;
}
export interface BeatmapUserScore {
    position: number;
    score: Score;
}
export declare type Beatmapset = BeatmapsetCompact | BeatmapsetExtended;
export interface BeatmapsetCompact {
    artist: string;
    artist_unicode: string;
    covers: {
        cover: string;
        "cover@2x": string;
        card: string;
        "card@2x": string;
        list: string;
        "list@2x": string;
        slimcover: string;
        "slimcover@2x": string;
    };
    creator: string;
    favourite_count: number;
    id: number;
    nsfw: boolean;
    play_count: number;
    preview_url: string;
    source: string;
    status: string;
    title: string;
    title_unicode: string;
    user_id: number;
    video: boolean;
}
export interface BeatmapsetExtended extends BeatmapsetCompact {
    availability: {
        download_disabled: boolean;
        more_information: string | null;
    };
    bpm: number;
    can_be_hyped: boolean;
    creator: string;
    discussion_enabled: boolean;
    discussion_locked: boolean;
    hype: {
        current: number;
        required: number;
    };
    is_scoreable: boolean;
    last_updated: string;
    legacy_thread_url: string | null;
    nominations: {
        current: number;
        required: number;
    };
    ranked: number;
    ranked_date: string;
    source: string;
    storyboard: boolean;
    submitted_date: string;
    tags: string;
    beatmaps?: Beatmap[];
    converts?: Beatmap[];
    description?: {
        description: string;
    };
    genre?: NamedID;
    language?: NamedID;
    ratings?: number[];
    recent_favourites?: UserCompact[];
    user?: UserCompact;
}
export interface NamedID {
    id: number;
    name: string;
}
//# sourceMappingURL=Beatmap.d.ts.map