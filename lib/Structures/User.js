"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProperties = exports.User = void 0;
const Utils_1 = require("../Utils");
const _1 = require("./");
;
/** Represents an osu player */
let User = class User extends _1.BaseCompactable {
    /**
     * Construct a User
     *
     * @param parent The parent client that is making this object
     * @param data The raw user data
     */
    constructor(parent, data, isCompact = true) {
        super(parent, data.id, data, isCompact);
        this.populate(data);
    }
    static async eval(client, id) {
        return await client.getUser(id);
    }
    /**
     * Updates the user with new data
     *
     * @param mode - A specific gamemode to request the user's {@link statistics} for
     */
    async update(mode) {
        const newData = await this.parent.getUserRaw(this.id.toString(), "id", mode);
        this.raw = newData;
        this.populate(newData);
        return this;
    }
    populate(data) {
        this.isCompact = true;
        this.raw = data;
        this.avatarURL = data.avatar_url;
        this.countryCode = data.country_code;
        this.defaultGroup = data.default_group;
        this.isActive = data.is_active;
        this.isBot = data.is_bot;
        this.isDeleted = data.is_deleted;
        this.isOnline = data.is_online;
        this.isSupporter = data.is_supporter;
        this.lastVisit = new Date(data.last_visit);
        this.pmFriendsOnly = data.pm_friends_only;
        this.profileColour = data.profile_colour;
        this.username = data.username;
        if (!("user_achievements" in data))
            return;
        this.isCompact = false;
        this.countryName = data.country.name;
        this.cover = {
            custom: data.cover.custom_url !== null,
            id: data.cover.id,
            url: data.cover.custom_url ?? data.cover.url
        };
        this.discord = data.discord;
        this.hasSupported = data.has_supported;
        this.interests = data.interests;
        this.joinedAt = new Date(data.join_date);
        this.kudosu = data.kudosu;
        this.location = data.location;
        this.maxBlocks = data.max_blocks;
        this.maxFriends = data.max_friends;
        this.occupation = data.occupation;
        this.playmode = data.playmode;
        this.playstyle = data.playstyle;
        this.postCount = data.post_count;
        this.profileOrder = data.profile_order;
        this.title = data.title;
        this.titleURL = data.title_url;
        this.twitter = data.twitter;
        this.website = data.website;
        this.achievements = data.user_achievements.map(achievement => ({
            achievedAt: new Date(achievement.achieved_at),
            id: achievement.achievement_id
        }));
        this.activeTournamentBanner = data.active_tournament_banner && {
            id: data.active_tournament_banner.id,
            imageURL: data.active_tournament_banner.image,
            tournamentID: data.active_tournament_banner.tournament_id
        };
        this.badges = data.badges.map(badge => ({
            awardedAt: new Date(badge.awarded_at),
            description: badge.description,
            imageURL: badge.image_url,
            url: badge.url
        }));
        this.beatmapsetCounts = {
            favourites: data.favourite_beatmapset_count,
            graveyarded: data.graveyard_beatmapset_count,
            loved: data.loved_beatmapset_count,
            pending: data.pending_beatmapset_count,
            ranked: data.ranked_beatmapset_count
        };
        this.beatmapsScored = data.beatmap_playcounts_count;
        this.commentsCount = data.comments_count;
        this.followerCount = data.follower_count;
        this.groups = data.groups.map(group => ({
            id: group.id,
            colour: group.colour,
            hasListing: group.has_listing,
            hasPlaymodes: group.has_playmodes,
            identifier: group.identifier,
            isProbationary: group.is_probationary,
            name: group.name,
            shortName: group.short_name,
            description: group.description,
            playmodes: group.playmodes
        }));
        this.infringements = data.account_history.map(infringement => ({
            description: infringement.description,
            type: infringement.type,
            timestamp: new Date(infringement.timestamp),
            length: infringement.length
        }));
        this.mappingFollowerCount = data.mapping_follower_count;
        this.monthlyPlaycounts = data.monthly_playcounts.map(count => ({
            count: count.count,
            startDate: new Date(count.start_date)
        }));
        this.page = data.page;
        this.previousUsernames = data.previous_usernames;
        this.rankHistory = data.rank_history.data;
        this.replaysWatchedCounts = data.replays_watched_counts.map(count => ({
            count: count.count,
            startDate: new Date(count.start_date)
        }));
        this.scoreCounts = {
            best: data.scores_best_count,
            first: data.scores_first_count,
            recent: data.scores_recent_count
        };
        this.statistics = {
            countryRank: data.statistics.country_rank,
            globalRank: data.statistics.global_rank,
            gradeCounts: data.statistics.grade_counts,
            hitAccuracy: data.statistics.hit_accuracy,
            isRanked: data.statistics.is_ranked,
            level: data.statistics.level,
            maximumCombo: data.statistics.maximum_combo,
            playCount: data.statistics.play_count,
            playTime: data.statistics.play_time,
            pp: data.statistics.pp,
            rankedScore: data.statistics.ranked_score,
            replaysWatched: data.statistics.replays_watched_by_others,
            totalHits: data.statistics.total_hits,
            totalScore: data.statistics.total_score
        };
        this.supportLevel = data.support_level;
    }
};
User = __decorate([
    Utils_1.CanBeLazy()
], User);
exports.User = User;
var UserProperties;
(function (UserProperties) {
    ;
})(UserProperties = exports.UserProperties || (exports.UserProperties = {}));
//# sourceMappingURL=User.js.map