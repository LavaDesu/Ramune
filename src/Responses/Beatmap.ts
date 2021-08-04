import { Gamemode } from "../Enums";
import { Score } from "./Score";

export interface BeatmapCompact {
    beatmapset?: Beatmapset | BeatmapsetCompact;
    difficulty_rating: number;
    id: number;
    mode: Gamemode;
    status: string;
    total_length: number;
    version: string;
}

export interface Beatmap extends BeatmapCompact {
    accuracy: number;
    ar: number;
    beatmapset_id: number;
    bpm: number;
    convert: boolean;
    count_circles: number;
    count_sliders: number;
    count_spinners: number;
    cs: number;
    deleted_at: string;
    drain: number;
    hit_length: number;
    is_scoreable: boolean;
    last_updated: string;
    max_combo?: number;
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

export interface Beatmapset extends BeatmapsetCompact {
}

export interface BeatmapsetCompact {
    id: number;
    artist: string;
    artist_unicode: string;
    title: string;
    title_unicode: string;
}
