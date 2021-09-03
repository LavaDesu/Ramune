import { UserCompact } from "./";

export type Match = MatchCompact | MatchExtended;
export interface MatchCompact {
    match: {
        id: number;
        start_time: string;
        end_time: string | null;
        name: string;
    };
}
export interface MatchExtended extends MatchCompact {
    events: MatchEvent[];
    users: UserCompact[];
    first_event_id: number;
    latest_event_id: number;
    current_game_id: number;
}

export interface MatchEvent {
    id: number;
    detail: any;
    timestamp: Date;
    user_id: number;
}
