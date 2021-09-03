import { Client } from "../Clients";
import { Gamemode, Playstyle, ProfileSection, InfringementType } from "../Enums";
import { User as UserResponse } from "../Responses";
import { CanBeLazy } from "../Utils";
import { BaseCompactable, Compact } from "./";

export interface User extends UserProperties.Compact, UserProperties.Extended {};
export type UserCompact = Compact<User, UserProperties.Extended>;
/** Represents an osu player */
@CanBeLazy()
export class User extends BaseCompactable<UserResponse, UserProperties.Extended> {
    /**
     * Construct a User
     *
     * @param parent The parent client that is making this object
     * @param data The raw user data
     */
    constructor(parent: Client, data: UserResponse, isCompact: boolean = true) {
        super(parent, data.id, data, isCompact);
        this.populate(data);
    }

    public static async eval(client: Client, id: number) {
        return await client.getUser(id);
    }

    /**
     * Updates the user with new data
     *
     * @param mode - A specific gamemode to request the user's {@link statistics} for
     */
    public async update(mode?: Gamemode): Promise<this> {
        const newData = await this.parent.getUserRaw(this.id.toString(), "id", mode);
        this.raw = newData;
        this.populate(newData);

        return this;
    }

    protected populate(data: UserResponse): void {
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
}

export namespace UserProperties {
    export interface Compact {
        /** The user's ID */
        readonly id: number;
        /** The user's username */
        username: string;

        /** The user's avatar URL */
        avatarURL: string;
        /** The user's 2-letter country code (ISO 3166-1 alpha-2) */
        countryCode: string;
        /** The user's default group identifier */
        defaultGroup: string;
        /**
         * Whether the user is still active (inactive users are removed from
         * the leaderboards)
         */
        isActive: boolean;
        /** Whether the user is a bot */
        isBot: boolean;
        // TODO: what is this? in what situation can this be true?
        isDeleted: boolean;
        /** Whether the user is online */
        isOnline: boolean;
        /** Whether the user is currently a supporter */
        isSupporter: boolean;
        /** The user's last login Date */
        lastVisit: Date;
        /** True if the user only accepts PMs from friends */
        pmFriendsOnly: boolean;
        /**
         * The user's profile colour, usually seen as their chat message's
         * username colour
         */
        profileColour: string | null;
    }

    export interface Extended {
        /** The user's country name */
        countryName: string;
        /** The user's cover image */
        cover: {
            /** Whether the cover is a custom image */
            custom: boolean;
            /** ID of the image, present only if not a custom image */
            id: number | null;
            /** URL of the cover image */
            url: string;
        };
        /** The user's discord, as set in their profile */
        discord: string | null;
        /** Whether the user once had supporter */
        hasSupported: boolean;
        /** The user's interests, as set in their profile */
        interests: string | null;
        /** The user's signup Date */
        joinedAt: Date;
        /** The user's kudosu information */
        kudosu: {
            /** The user's available kudosu */
            available: number;
            /** The user's total kudosu */
            total: number;
        };
        /** The user's location, as set in their profile */
        location: string | null;
        /** Number of users this user is allowed to block */
        maxBlocks: number;
        /** Number of users this user is allowed to friend */
        maxFriends: number;
        /** The user's occupation, as set in their profile */
        occupation: string | null;
        /** The user's default gamemode */
        playmode: Gamemode;
        /** The user's playstyle(s) */
        playstyle: Playstyle[];
        /** Number of forum posts the user has made */
        postCount: number;
        /** Order of user profile sections */
        profileOrder: ProfileSection[];
        /** The user's title (eg, "osu!team") */
        title: string | null;
        /** The user's title's URL */
        titleURL: string | null;
        /** The user's twitter, as set in their profile */
        twitter: string | null;
        /** The user's website, as set in their profile */
        website: string | null;

        /** A list of the user's achievements */
        achievements: Achievement[];
        /** The user's currently active tournament banner */
        activeTournamentBanner: Banner | null;
        /** A list of the user's badges */
        badges: Badge[];
        /** Various counts related to beatmapsets */
        beatmapsetCounts: {
            /** Number of beatmapsets the user has favourited */
            favourites: number;
            /** Number of graveyarded beatmapsets the user has submitted */
            graveyarded: number;
            /** Number of loved beatmapsets the user has submitted */
            loved: number;
            /** Number of pending beatmapsets the user has submitted */
            pending: number;
            /** Number of ranked beatmapsets the user has submitted */
            ranked: number;
        };
        /**
         * Number of beatmaps the user has a score on
         *
         * This can be seen on their profile as the number beside "Most Played Beatmaps"
         */
        beatmapsScored: number;
        /** Number of comments the user has made */
        commentsCount: number;
        /** The user's follower count */
        followerCount: number;
        /** List of groups the user is a part of */
        groups: UserGroup[];
        /**
         * The user's past infringements
         * Also known as "Account Standing" sometimes seen on a user's profile page
         *
         * @remarks In the API this would be `account_history`
         */
        infringements: Infringement[];
        /** Number of users that has followed the user's mapping notifications */
        mappingFollowerCount: number;
        /** Per-month counts of the user's plays */
        monthlyPlaycounts: Count[];
        /**
         * The user's about me page
         *
         * If the user doesn't have one, {@link page.html | html} and
         * {@link page.raw | raw) will be empty strings
         */
        page: {
            /** The about me page converted to HTML */
            html: string;
            /** The about me page as raw BBCode */
            raw: string;
        };
        /** The user's previous usernames */
        previousUsernames: string[];
        /** The user's past rank history */
        rankHistory: number[];
        /** Per-month counts of how many times replays made by the user were watched */
        replaysWatchedCounts: Count[];
        /** Various score counts */
        scoreCounts: {
            /** "Best" score counts, this is usually 100 or lower */
            best: number;
            /** Amount of first place ranks */
            first: number;
            /** Amount of plays set in the last 24h */
            recent: number;
        };
        /**
         * The user's gameplay statistics, specific to the requested gamemode
         * (not {@link playmode}!)
         */
        statistics: UserStatistics;
        /** The user's supporter level (the amount of hearts on the user's page) */
        supportLevel: number;
    }

    /** A user achievement */
    export interface Achievement {
        /** The achievement ID */
        id: number;
        /** The date that the user got the achievement */
        achievedAt: Date;
    }

    /** A user badge */
    export interface Badge {
        /** The date the badge was awarded */
        awardedAt: Date;
        /** The badge's description */
        description: string;
        /** The badge's image URL */
        imageURL: string;
        /** The badge's URL */
        url: string;
    }

    /** A tournament banner */
    export interface Banner {
        /** The banner's ID */
        id: number;
        /** The tournament's ID */
        tournamentID: number;
        /** The tournament's image URL */
        imageURL: string;
    }

    export interface Count {
        count: number;
        startDate: Date;
    }

    /** A user group (eg: NAT, DEV, GMT, etc..) */
    export interface Group {
        /** The group's ID */
        id: number;
        /** The group's colour */
        colour: string;
        hasListing: boolean;
        /**
         * Whether the group has playmodes
         *
         * For example, users can be a BN in specific playmodes, so this would be true,
         * while groups like GMT don't need it, so this would be false
         */
        hasPlaymodes: boolean;
        /**
         * The group's identifier
         * @example loved
         */
        identifier: string;
        /** Whether the group's members are considered probationary */
        isProbationary: boolean;
        /**
         * The group's name
         * @example Project Loved
         */
        name: string;
        /**
         * The group's short (usually 3 characters) name
         * @example LVD
         */
        shortName: string;
        /**
         * The group's description
         *
         * @remarks Currently, no endpoint can actually return this yet
         */
        description?: {
            html: string;
            markdown: string;
        };
    }

    /**
     * A user infringement, seen in their "Account Standing" section
     *
     * @remarks In the API, this is known as `UserAccountHistory`; it's renamed to be
     *          less ambiguous here
     */
    export interface Infringement {
        /** The description/reason of the infringement */
        description: string | null;
        /** The type of infringement */
        type: InfringementType;
        /** The date the infringement was issued */
        timestamp: Date;
        /** How long the infringement will last */
        length: number;
    }

    /** A group returned inside a user, which has an additional property {@link playmodes} */
    export interface UserGroup extends Group {
        /**
         * The playmodes the user is associated with
         *
         * @remarks This is always null if {@link hasPlaymodes} is false
         */
        playmodes: Gamemode[] | null;
    }

    /**
     * Various statistics of a user
     *
     * @remarks This is gamemode-specific
     */
    export interface UserStatistics {
        /** The user's current country rank */
        countryRank: number;
        /** The user's current global rank */
        globalRank: number;
        /** The user's current score grade counts */
        gradeCounts: {
            ss: number;
            /** Also known as Silver SS, or SS with Hidden */
            ssh: number;
            s: number;
            /** Also known as Silver S, or S with Hidden */
            sh: number;
            a: number;
        };
        /** The user's current hit accuracy */
        hitAccuracy: number;
        /**
         * Whether the current user is still actively ranked
         *
         * Inactive users' profiles will not show a rank chart nor any of their ranks
         */
        isRanked: boolean;
        /**
         * The user's current level information
         */
        level: {
            /** The current level */
            current: number;
            /** The progress towards the next level, represented by a percentage integer (0-100) */
            progress: number;
        };
        /** The user's highest achieved combo */
        maximumCombo: number;
        /** The user's total play count */
        playCount: number;
        /** The user's total play time */
        playTime: number;
        /** The user's performance points */
        pp: number;
        /** The user's total ranked score */
        rankedScore: number;
        /** Number of times where the user's replays were watched */
        replaysWatched: number;
        /** The user's total number of hitobjects hit */
        totalHits: number;
        /** The user's total score */
        totalScore: number;
    };
}
