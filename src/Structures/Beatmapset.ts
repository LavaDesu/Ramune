import { Client } from "../Clients/Client";
import { Beatmapset as BeatmapsetResponse } from "../Responses";
import { CanBeLazy, Lazy } from "../Util/Lazy";
import { BaseCompactable } from "./Base";
import { Beatmap, NamedID } from "./Beatmap";
import { User } from "./User";

export interface Beatmapset extends BeatmapsetProperties.Compact, BeatmapsetProperties.Extended {}
@CanBeLazy()
export class Beatmapset extends BaseCompactable<BeatmapsetResponse, BeatmapsetProperties.Extended> {
    public readonly mapper: Lazy<User>;

    constructor(parent: Client, data: BeatmapsetResponse, isCompact: boolean = true) {
        super(parent, data.id, data, isCompact);
        this.mapper = new Lazy(parent, User, data.user_id);
    }

    public static async eval(client: Client, id: number) {
        return await client.getBeatmapset(id);
    }

    public async update(): Promise<this> {
        const newInstance = await this.parent.getBeatmapset(this.id);
        this.populate(newInstance.raw as BeatmapsetResponse);
        return this;
    }

    protected populate(data: BeatmapsetResponse) {
        this.isCompact = true;
        this.raw = data;

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

        if (!("availability" in data))
            return;

        this.isCompact = false;
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
            new Beatmap(this.parent, beatmap, false, this)
        );
        this.converts = data.converts?.map(convert =>
            new Beatmap(this.parent, convert, false, this)
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

export namespace BeatmapsetProperties {
    export interface Compact {
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

    export interface Extended {
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

        beatmaps?: Beatmap[];
        converts?: Beatmap[];
        description?: string;
        genre?: NamedID;
        language?: NamedID;
        ratings?: number[];
        recent_favourites?: User[];
    }

    export interface Cover {
        cover: [standard: string, high: string];
        card: [standard: string, high: string];
        list: [standard: string, high: string];
        slimcover: [standard: string, high: string];
    };
}
