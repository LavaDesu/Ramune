"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeatmapsetProperties = exports.Beatmapset = void 0;
const Utils_1 = require("../Utils");
const _1 = require("./");
let Beatmapset = class Beatmapset extends _1.BaseCompactable {
    constructor(parent, data, isCompact = true) {
        super(parent, data.id, data, isCompact);
        this.mapper = new Utils_1.Lazy(parent, _1.User, data.user_id);
    }
    static async eval(client, id) {
        return await client.getBeatmapset(id);
    }
    async update() {
        const newInstance = await this.parent.getBeatmapset(this.id);
        this.populate(newInstance.raw);
        return this;
    }
    populate(data) {
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
        this.beatmaps = data.beatmaps?.map(beatmap => new _1.Beatmap(this.parent, beatmap, false, this));
        this.converts = data.converts?.map(convert => new _1.Beatmap(this.parent, convert, false, this));
        // hmmm
        this.description = data.description?.description;
        this.genre = data.genre;
        this.language = data.language;
        this.ratings = data.ratings;
        this.recent_favourites = data.recent_favourites?.map(user => new _1.User(this.parent, user));
        return true;
    }
};
Beatmapset = __decorate([
    Utils_1.CanBeLazy()
], Beatmapset);
exports.Beatmapset = Beatmapset;
var BeatmapsetProperties;
(function (BeatmapsetProperties) {
    ;
})(BeatmapsetProperties = exports.BeatmapsetProperties || (exports.BeatmapsetProperties = {}));
//# sourceMappingURL=Beatmapset.js.map