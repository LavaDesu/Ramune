import { Client } from "../Clients/Client";
import { BeatmapLookupType, BeatmapsetOnlineStatus, Gamemode } from "../Enums";
import { Beatmap as BeatmapResponse, Beatmapset as BeatmapsetResponse } from "../Responses";
import { CanBeLazy, Lazy } from "../Util/Lazy";
import { Base } from "./Base";
import { User } from "./User";

export interface BeatmapCompact {
    readonly id: number;
    beatmapsetID: number;
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
export interface BeatmapExtended {
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
export interface Beatmap extends BeatmapCompact, Partial<BeatmapExtended> {}
@CanBeLazy()
export class Beatmap extends Base {
    public beatmapset?: Lazy<Beatmapset>;

    constructor(parent: Client, data: BeatmapResponse, parentSet?: Beatmapset) {
        super(parent, data.id, data);
        this.beatmapset = new Lazy(parent, Beatmapset, data.beatmapset_id);

        this.beatmapsetID = data.beatmapset_id;
        this.length = data.total_length;
        this.mode = data.mode;
        this.status = data.status;
        this.starRating = data.difficulty_rating;
        this.version = data.version;

        this.checksum = data.checksum;
        this.failtimes = data.failtimes;
        this.maxCombo = data.max_combo;

        if (parentSet)
            this.beatmapset.set(parentSet);
    }

    public static async eval(client: Client, id: number) {
        return await client.getBeatmap(id);
    }

    /**
     * Whether this beatmap is fully populated (to populate, call {@link populate})
     *
     * @returns A boolean type guard which can mark all optional properties as present
     */
    public isPopulated(): this is BeatmapExtended {
        return this.accuracy !== undefined;
    }

    /**
     * If this beatmap was created given BeatmapCompact, this method will populate
     * itself with results similar to {@link Client.getBeatmap}
     *
     * If this beatmap was already populated, this method would simply do nothing.
     *
     * @returns
     * Itself with all optional fields
     *
     * If using TypeScript, also run {@link isPopulated} afterwards to type guard and have
     * all optional properties be known as present
     */
    public async populate(): Promise<this> {
        if (this.isPopulated())
            return this;

        const newData = await this.parent.getBeatmapRaw(this.id, BeatmapLookupType.ID);
        this.raw = newData;
        this.populateExtended(newData);

        return this;
    }

    private populateExtended(data: BeatmapResponse): this is BeatmapExtended {
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

        return this.isPopulated();
    }
}

export interface NamedID {
    id: number;
    name: string;
}

export interface BeatmapsetCompact {
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

export interface Cover {
    cover: [standard: string, high: string];
    card: [standard: string, high: string];
    list: [standard: string, high: string];
    slimcover: [standard: string, high: string];
};

export interface BeatmapsetExtended {
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
    // could this actually be null?
    submittedDate: Date | null;
    tags: string;

    beatmaps: Beatmap[];
    converts: Beatmap[];
    description: string;
    genre: NamedID;
    language: NamedID;
    ratings: number[];
    recent_favourites: User[];
}
export interface Beatmapset extends BeatmapsetCompact, Partial<BeatmapsetExtended> {}
@CanBeLazy()
export class Beatmapset extends Base {
    public readonly mapper: Lazy<User>;

    constructor(parent: Client, data: BeatmapsetResponse) {
        super(parent, data.id, data);
        this.mapper = new Lazy(parent, User, data.user_id);

        this.artist = data.artist;
        this.artistUnicode = data.artist_unicode;
        this.covers = {
            card: [data.covers.card, data.covers["card@2x"]],
            cover: [data.covers.cover, data.covers["cover@2x"]],
            list: [data.covers.list, data.covers["list@2x"]],
            slimcover: [data.covers.slimcover, data.covers["slimcover@2x"]]
        };
        this.creator = data.creator;
        this.favouriteCount = data.favourite_count;
        this.hasVideo = data.video;
        this.isNSFW = data.nsfw;
        this.playCount = data.play_count;
        this.previewURL = data.preview_url;
        this.source = data.source;
        this.status = data.status;
        this.title = data.title;
        this.titleUnicode = data.title_unicode;
    }

    public static async eval(client: Client, id: number) {
        return await client.getBeatmapset(id);
    }

    public isPopulated(): this is BeatmapsetExtended {
        return this.availability !== undefined;
    }

    /**
     * If this beatmapset was created given BeatmapsetCompact, this method will populate
     * itself with results similar to {@link Client.getBeatmapset}
     *
     * If this beatmapset was already populated, this method would simply do nothing.
     *
     * @returns
     * Itself with all optional fields
     *
     * If using TypeScript, also run {@link isPopulated} afterwards to type guard and have
     * all optional properties be known as present
     */
    public async populate(): Promise<this> {
        if (this.isPopulated())
            return this;

        const newInstance = await this.parent.getBeatmapset(this.id);
        this.populateExtended(newInstance.raw as BeatmapsetResponse);
        return this;
    }

    private populateExtended(data: BeatmapsetResponse): this is BeatmapsetExtended {
        this.availability = {
            isDownloadDisabled: data.availability.download_disabled,
            moreInformation: data.availability.more_information
        };
        this.bpm = data.bpm;
        this.canHype = data.can_be_hyped;
        this.isDiscussionEnabled = data.discussion_enabled;
        this.isDiscussionLocked = data.discussion_locked;
        this.hasStoryboard = data.storyboard;
        this.hype = data.hype;
        this.isScorable = data.is_scoreable;
        this.lastUpdated = new Date(data.last_updated);
        this.legacyThreadURL = data.legacy_thread_url;
        this.nominations = data.nominations;
        this.rankedDate = data.ranked_date ? new Date(data.ranked_date) : null;
        this.submittedDate = data.submitted_date ? new Date(data.submitted_date) : null;
        this.tags = data.tags;

        this.beatmaps = data.beatmaps?.map(beatmap =>
            new Beatmap(this.parent, beatmap, this)
        );
        this.converts = data.converts?.map(convert =>
            new Beatmap(this.parent, convert, this)
        );
        // hmmm
        this.description = data.description?.description;
        this.genre = data.genre;
        this.language = data.language;
        this.ratings = data.ratings;
        this.recent_favourites = data.recent_favourites?.map(user =>
            new User(this.parent, user)
        );

        return true;
    }
}
