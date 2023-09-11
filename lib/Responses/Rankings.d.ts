import { Beatmapset } from "./Beatmap";
import { UserStatistics } from "./User";
export interface Rankings {
    cursor: {
        page: number;
    };
    /** Ordered by user ranks in descending order */
    ranking: UserStatistics[];
    /** Approximate of rankings */
    total: number;
    /** Only available if type is charts */
    beatmapsets?: Beatmapset[];
    /** TODO: unimplemented */
    spotlight?: unknown;
}
//# sourceMappingURL=Rankings.d.ts.map