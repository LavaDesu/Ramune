import { Gamemode, Mod, ScoreRank } from "../Enums";
import { Beatmap, Beatmapset } from "./Beatmap";
import { UserCompact } from "./User";

/**
 * Score object
 */
export interface Score {
    id: number;
    best_id: number;
    user_id: number;
    accuracy: number;
    created_at: string;
    max_combo: number;
    mode: Gamemode;
    mode_int: number;
    mods: Mod[];
    passed: boolean;
    perfect: boolean;
    pp: number | null;
    rank: ScoreRank;
    replay: boolean;
    score: number;
    statistics: ScoreStatistics;

    beatmap?: Beatmap;
    beatmapset?: Beatmapset;
    match?: unknown; // TODO
    rank_country?: number;
    rank_global?: number;
    user?: UserCompact;
    /** Only returned from /api/v2/users/{user}/scores/best */
    weight?: Weight;
};

export type ScoreStatistics = {
    count_50: number;
    count_100: number;
    count_300: number;
    count_geki: number;
    count_katu: number;
    count_miss: number;
};

export type Weight = {
    percentage: number;
    pp: number;
};
