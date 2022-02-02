import { Client } from "../Clients";
import { BeatmapsetOnlineStatus, Gamemode } from "../Enums";
import { Beatmap as BeatmapResponse } from "../Responses";
import { Lazy } from "../Utils";
import { BaseCompactable, Beatmapset } from "./";
export interface Beatmap extends BeatmapProperties.Compact, BeatmapProperties.Extended {
}
export declare class Beatmap extends BaseCompactable<BeatmapResponse, BeatmapProperties.Extended> {
    beatmapset?: Lazy<Beatmapset>;
    constructor(parent: Client, data: BeatmapResponse, isCompact?: boolean, parentSet?: Beatmapset);
    static eval(client: Client, id: number): Promise<Beatmap>;
    update(): Promise<this>;
    protected populate(data: BeatmapResponse): void;
}
export declare namespace BeatmapProperties {
    interface Compact {
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
    interface Extended {
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
//# sourceMappingURL=Beatmap.d.ts.map