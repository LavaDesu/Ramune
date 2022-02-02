"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = void 0;
const Utils_1 = require("../Utils");
const _1 = require("./");
/**
 * A legacy osu multiplayer lobby
 */
let Match = class Match extends _1.BaseCompactable {
    constructor(parent, data, isCompact = true) {
        super(parent, data.match.id, data, isCompact);
        this.populate(data);
    }
    static async eval(client, id) {
        return await client.getMatch(id);
    }
    async update() {
        const newData = await this.parent.getMatch(this.id.toString());
        this.raw = newData.raw;
        this.populate(newData.raw);
        return this;
    }
    populate(data) {
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
        this.users = data.users.map(user => new _1.User(this.parent, user, true));
    }
};
Match = __decorate([
    Utils_1.CanBeLazy()
], Match);
exports.Match = Match;
//# sourceMappingURL=Match.js.map