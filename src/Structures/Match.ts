import { Client } from "../Clients/Client";
import { UserCompact } from "../Responses/User";
import { CanBeLazy } from "../Util/Lazy";
import { Base } from "./Base";
import { User } from "./User";

export interface MatchCompact {
    readonly id: number;
    name: string;
    startDate: Date;
    endDate: Date | null;
}
export interface MatchExtended {
    currentGameID: number;
    events: MatchEvent[];
    users: User[];
}
export interface Match extends MatchCompact, MatchExtended {}
@CanBeLazy()
/**
 * A legacy osu multiplayer lobby
 */
export class Match extends Base {
    constructor(parent: Client, match: MatchResponse) {
        super(parent, match.match.id, match);

        this.populateCompact(match);

        if ("current_game_id" in match)
            this.populateExtended(match);
    }

    public static async eval(client: Client, id: number) {
        return await client.getMatch(id);
    }

    /**
     * Whether this match class is fully populated (to populate, call {@link populate})
     *
     * @returns A boolean type guard which can mark all optional properties as present
     */
    public isPopulated(): this is MatchExtended {
        return this.currentGameID !== undefined;
    }

    /**
     * If this user was created given MatchCompact, this method will populate
     * itself with results similar to {@link Client.getMatch}
     *
     * If this match was already populated, this method would simply do nothing.
     *
     * @returns
     * Itself with all optional fields
     *
     * If using TypeScript, also run {@link isPopulated} afterwards to type guard and have
     * all optional properties be known as present
     */
    public async populate(): Promise<this> {
        const newData = await this.parent.getMatch(this.id.toString());
        this.raw = newData.raw;
        this.populateExtended(newData.raw as MatchExtendedResponse);

        return this;
    }

    private populateCompact(match: MatchCompactResponse) {
        this.name = match.match.name;
        this.startDate = new Date(match.match.start_time);
        this.endDate = match.match.end_time ? new Date(match.match.end_time) : null;
    }

    private populateExtended(match: MatchExtendedResponse) {
        this.currentGameID = match.current_game_id;
        this.events = match.events;
        this.users = match.users.map(user => new User(this.parent, user));
    }

    /**
     * Refreshes the match with new data in-place from {@link Client.getMatch}
     */
    public async update(): Promise<this> {
        const newData = await this.parent.getMatch(this.id.toString());
        const raw = this.raw = newData.raw as MatchExtendedResponse;
        this.populateCompact(raw);
        this.populateExtended(raw);

        return this;
    }
}

export type MatchResponse = MatchCompactResponse | MatchExtendedResponse;
export interface MatchCompactResponse {
    match: {
        id: number;
        start_time: string;
        end_time: string | null;
        name: string;
    };
}
export interface MatchExtendedResponse extends MatchCompactResponse {
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
