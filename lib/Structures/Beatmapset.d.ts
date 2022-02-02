import { Client } from "../Clients";
import { Beatmapset as BeatmapsetResponse } from "../Responses";
import { Lazy } from "../Utils";
import { BaseCompactable, Beatmap, NamedID, User } from "./";
export interface Beatmapset extends BeatmapsetProperties.Compact, BeatmapsetProperties.Extended {
}
export declare class Beatmapset extends BaseCompactable<BeatmapsetResponse, BeatmapsetProperties.Extended> {
    readonly mapper: Lazy<User>;
    constructor(parent: Client, data: BeatmapsetResponse, isCompact?: boolean);
    static eval(client: Client, id: number): Promise<Beatmapset>;
    update(): Promise<this>;
    protected populate(data: BeatmapsetResponse): true | undefined;
}
export declare namespace BeatmapsetProperties {
    interface Compact {
        readonly id: number;
        artist: string;
        artistUnicode: string;
        covers: Cover;
        creator: string;
        favouriteCount: number;
        hasVideo: boolean;
        isNSFW: boolean;
        playCount: number;
        previewURL: string;
        source: string;
        status: string;
        title: string;
        titleUnicode: string;
    }
    interface Extended {
        availability: {
            isDownloadDisabled: boolean;
            moreInformation: string | null;
        };
        bpm: number;
        canHype: boolean;
        isDiscussionEnabled: boolean;
        isDiscussionLocked: boolean;
        hasStoryboard: boolean;
        hype: {
            current: number;
            required: number;
        };
        isScorable: boolean;
        lastUpdated: Date;
        legacyThreadURL: string | null;
        nominations: {
            current: number;
            required: number;
        };
        rankedDate: Date | null;
        submittedDate: Date | null;
        tags: string;
        beatmaps?: Beatmap[];
        converts?: Beatmap[];
        description?: string;
        genre?: NamedID;
        language?: NamedID;
        ratings?: number[];
        recent_favourites?: User[];
    }
    interface Cover {
        cover: [standard: string, high: string];
        card: [standard: string, high: string];
        list: [standard: string, high: string];
        slimcover: [standard: string, high: string];
    }
}
//# sourceMappingURL=Beatmapset.d.ts.map