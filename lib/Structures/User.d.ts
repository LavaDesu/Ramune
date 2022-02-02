import { Client } from "../Clients";
import { Gamemode, Playstyle, ProfileSection, InfringementType } from "../Enums";
import { User as UserResponse } from "../Responses";
import { BaseCompactable, Compact } from "./";
export interface User extends UserProperties.Compact, UserProperties.Extended {
}
export declare type UserCompact = Compact<User, UserProperties.Extended>;
/** Represents an osu player */
export declare class User extends BaseCompactable<UserResponse, UserProperties.Extended> {
    /**
     * Construct a User
     *
     * @param parent The parent client that is making this object
     * @param data The raw user data
     */
    constructor(parent: Client, data: UserResponse, isCompact?: boolean);
    static eval(client: Client, id: number): Promise<User>;
    /**
     * Updates the user with new data
     *
     * @param mode - A specific gamemode to request the user's {@link statistics} for
     */
    update(mode?: Gamemode): Promise<this>;
    protected populate(data: UserResponse): void;
}
export declare namespace UserProperties {
    interface Compact {
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
    interface Extended {
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
    interface Achievement {
        /** The achievement ID */
        id: number;
        /** The date that the user got the achievement */
        achievedAt: Date;
    }
    /** A user badge */
    interface Badge {
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
    interface Banner {
        /** The banner's ID */
        id: number;
        /** The tournament's ID */
        tournamentID: number;
        /** The tournament's image URL */
        imageURL: string;
    }
    interface Count {
        count: number;
        startDate: Date;
    }
    /** A user group (eg: NAT, DEV, GMT, etc..) */
    interface Group {
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
    interface Infringement {
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
    interface UserGroup extends Group {
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
    interface UserStatistics {
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
    }
}
//# sourceMappingURL=User.d.ts.map