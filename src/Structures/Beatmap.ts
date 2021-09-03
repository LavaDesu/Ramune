import { Client } from "../Clients/Client";
import { BeatmapLookupType, BeatmapsetOnlineStatus, Gamemode } from "../Enums";
import { Beatmap as BeatmapResponse } from "../Responses";
import { CanBeLazy, Lazy } from "../Util/Lazy";
import { BaseCompactable } from "./Base";
import { Beatmapset } from "./Beatmapset";

export interface Beatmap extends BeatmapProperties.Compact, BeatmapProperties.Extended {}
@CanBeLazy()
export class Beatmap extends BaseCompactable<BeatmapResponse, BeatmapProperties.Extended> {
    public beatmapset?: Lazy<Beatmapset>;

    constructor(parent: Client, data: BeatmapResponse, isCompact: boolean = true, parentSet?: Beatmapset) {
        super(parent, data.id, data, isCompact);
        if ("beatmapset_id" in data)
            this.beatmapset = new Lazy(parent, Beatmapset, data.beatmapset_id);

        if (parentSet) {
            if (!this.beatmapset)
                this.beatmapset = new Lazy(parent, Beatmapset, parentSet.id);

            this.beatmapset.set(parentSet);
        }
    }

    public static async eval(client: Client, id: number) {
        return await client.getBeatmap(id);
    }

    public async update(): Promise<this> {
        const newData = await this.parent.getBeatmapRaw(this.id, BeatmapLookupType.ID);
        this.raw = newData;
        this.populate(newData);

        return this;
    }

    protected populate(data: BeatmapResponse) {
        this.isCompact = true;
        this.raw = data;

        this.length = data.total_length;
        this.mode = data.mode;
        this.status = data.status;
        this.starRating = data.difficulty_rating;
        this.version = data.version;

        this.checksum = data.checksum;
        this.failtimes = data.failtimes;
        this.maxCombo = data.max_combo;

        if (!("accuracy" in data))
            return;

        this.isCompact = true;
        this.accuracy = data.accuracy;
        this.ar = data.ar;
        this.bpm = data.bpm;
        this.isConvert = data.convert;
        this.objectCounts = {
            circles: data.count_circles,
            sliders: data.count_sliders,
            spinners: data.count_spinners
        };
        this.cs = data.cs;
        // is there some syntax sugar for this?
        this.deletedAt = data.deleted_at ? new Date(data.deleted_at) : null;
        this.drain = data.drain;
        this.hitLength = data.hit_length;
        this.isScorable = data.is_scoreable;
        this.lastUpdated = new Date(data.last_updated);
        this.passcount = data.passcount;
        this.playcount = data.playcount;
        this.url = data.url;
    }
}

export namespace BeatmapProperties {
    export interface Compact {
        readonly id: number;
        length: number;
        mode: Gamemode;
        status: BeatmapsetOnlineStatus;
        starRating: number;
        version: string;

        checksum?: string;
        failtimes?: {
            exit?: number[];
            fail?: number[];
        };
        maxCombo?: number;
    }

    export interface Extended {
        accuracy: number;
        ar: number;
        bpm: number;
        isConvert: boolean;
        objectCounts: {
            circles: number;
            sliders: number;
            spinners: number;
        };
        cs: number;
        deletedAt: Date | null;
        drain: number;
        hitLength: number;
        isScorable: boolean;
        lastUpdated: Date;
        passcount: number;
        playcount: number;
        url: string;
    }
}

export interface NamedID {
    id: number;
    name: string;
}
