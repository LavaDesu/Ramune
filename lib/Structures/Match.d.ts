import { Client } from "../Clients";
import { MatchEvent, Match as MatchResponse } from "../Responses";
import { BaseCompactable, UserCompact } from "./";
export interface Match extends MatchProperties.Compact, MatchProperties.Extended {
}
/**
 * A legacy osu multiplayer lobby
 */
export declare class Match extends BaseCompactable<MatchResponse, MatchProperties.Extended> {
    constructor(parent: Client, data: MatchResponse, isCompact?: boolean);
    static eval(client: Client, id: number): Promise<Match>;
    update(): Promise<this>;
    protected populate(data: MatchResponse): void;
}
export declare namespace MatchProperties {
    interface Compact {
        readonly id: number;
        name: string;
        startDate: Date;
        endDate: Date | null;
    }
    interface Extended {
        currentGameID: number;
        events: MatchEvent[];
        users: UserCompact[];
    }
}
//# sourceMappingURL=Match.d.ts.map