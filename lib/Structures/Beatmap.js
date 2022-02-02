"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Beatmap = void 0;
const Enums_1 = require("../Enums");
const Utils_1 = require("../Utils");
const _1 = require("./");
let Beatmap = class Beatmap extends _1.BaseCompactable {
    constructor(parent, data, isCompact = true, parentSet) {
        super(parent, data.id, data, isCompact);
        if ("beatmapset_id" in data)
            this.beatmapset = new Utils_1.Lazy(parent, _1.Beatmapset, data.beatmapset_id);
        if (parentSet) {
            if (!this.beatmapset)
                this.beatmapset = new Utils_1.Lazy(parent, _1.Beatmapset, parentSet.id);
            this.beatmapset.set(parentSet);
        }
    }
    static async eval(client, id) {
        return await client.getBeatmap(id);
    }
    async update() {
        const newData = await this.parent.getBeatmapRaw(this.id, Enums_1.BeatmapLookupType.ID);
        this.raw = newData;
        this.populate(newData);
        return this;
    }
    populate(data) {
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
};
Beatmap = __decorate([
    Utils_1.CanBeLazy()
], Beatmap);
exports.Beatmap = Beatmap;
//# sourceMappingURL=Beatmap.js.map