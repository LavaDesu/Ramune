import { Client } from "../Clients";
import { MatchEvent, Match as MatchResponse } from "../Responses";
import { CanBeLazy } from "../Utils";
import { BaseCompactable, User, UserCompact } from "./";

export interface Match extends MatchProperties.Compact, MatchProperties.Extended {}
/**
 * A legacy osu multiplayer lobby
 */
@CanBeLazy()
export class Match extends BaseCompactable<MatchResponse, MatchProperties.Extended> {
    constructor(parent: Client, data: MatchResponse, isCompact: boolean = true) {
        super(parent, data.match.id, data, isCompact);

        this.populate(data);
    }

    public static async eval(client: Client, id: number) {
        return await client.getMatch(id);
    }

    public async update(): Promise<this> {
        const newData = await this.parent.getMatch(this.id.toString());
        this.raw = newData.raw;
        this.populate(newData.raw);

        return this;
    }

    protected populate(data: MatchResponse) {
        this.isCompact = true;
        this.raw = data;

        this.name = data.match.name;
        this.startDate = new Date(data.match.start_time);
        this.endDate = data.match.end_time ? new Date(data.match.end_time) : null;

        if (!("current_game_id" in data))
            return;

        this.isCompact = false;
        this.currentGameID = data.current_game_id;
        this.events = data.events;
        this.users = data.users.map(user => new User(this.parent, user, true));
    }
}

export namespace MatchProperties {
    export interface Compact {
        readonly id: number;
        name: string;
        startDate: Date;
        endDate: Date | null;
    }
    export interface Extended {
        currentGameID: number;
        events: MatchEvent[];
        users: UserCompact[];
    }
}
