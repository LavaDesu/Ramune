import { BaseRequestObject, Client } from "../Clients";
import { Gamemode, RankingType } from "../Enums";
import { Beatmapset as BeatmapsetResponse, UserStatistics } from "../Responses";
import { Match } from "../Structures";
/**
 * A pagination cursor for requests that allow it
 *
 * This class implements [Symbol.asyncIterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator),
 * allowing you to use [for await...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) syntax
 *
 * Use {@link iterate} to specify a custom iteration buffer
 *
 * @typeParam T Output type on {@link next}
 */
export declare abstract class Cursor<T> implements AsyncIterable<T>, AsyncIterator<T[], T[]> {
    private readonly values;
    constructor(initialValues?: T[]);
    /** Called by {@link next} */
    protected abstract getNext(count: number): Promise<IteratorResult<T[], T[]>>;
    /**
     * Gets the next `count` elements
     *
     * @param count Amount of new elements to get, default 10
     *
     * @returns
     * An IteratorResult
     *
     * `done` is set to true if the cursor has reached the end
     *
     * `value` will always be an array, and can also have elements
     * even when `done` is set to true, where the end is reached
     */
    next(count?: number): Promise<IteratorResult<T[], T[]>>;
    /**
     * Returns an AsyncGenerator with a custom buffer length
     *
     * @param bufferLength
     * Specifies how much elements will be requested.
     * By default, it is 10. This means that when there are less than 10 elements
     * left to iterate, it will asynchronously request 10 more to be used.
     */
    iterate(bufferLength?: number): AsyncGenerator<T, void, unknown>;
}
/**
 * A basic processor that takes one input type and outputs another
 *
 * @typeParam U Input type
 * @typeParam T Output type
 */
export declare type Processor<T, U> = (raw: U[]) => Promise<T[]>;
/**
 * A cursor paginating with an `offset`
 *
 * @typeParam T Structure this cursor will output on {@link next}
 * @typeParam U Raw input type that's passed to the processor
 */
export declare class IndexedCursor<T, U> extends Cursor<T> {
    private readonly client;
    private readonly baseRequest;
    private readonly processor;
    private index;
    /**
     * Constructs an indexed pagination cursor
     *
     * @param client Parent client
     * @param baseRequest Base request for data
     * @param processor A function that converts the raw response from the request into the output type
     */
    constructor(client: Client, baseRequest: BaseRequestObject, processor: Processor<T, U>);
    protected getNext(count: number): Promise<IteratorResult<T[]>>;
    /**
     * Returns a new cursor starting from specified index
     *
     * @param index Index to start the new cursor from
     */
    withIndex(index: number): IndexedCursor<T, U>;
}
/**
 * A cursor for paginating the `/matches` endpoint
 */
export declare class MatchCursor extends Cursor<Match> {
    private readonly client;
    private readonly state;
    constructor(client: Client);
    protected getNext(count: number): Promise<{
        value: Match[];
        done: boolean;
    }>;
}
export interface InitialRankingsParams {
    mode: Gamemode;
    type: RankingType;
}
/**
 * A cursor for paginating the `/rankings` endpoint
 */
export declare class RankingCursor extends Cursor<UserStatistics> {
    private readonly client;
    private readonly state;
    private readonly intitialParams;
    private beatmapsets?;
    private spotlight?;
    constructor(client: Client, query: Record<string, string>, initialParams: InitialRankingsParams);
    /**
     * Gets spotlight information
     * @returns void if type is not charts or data has not been queried */
    getSpotlightInfo(): {
        beatmapsets: BeatmapsetResponse[];
        spotlight: unknown;
    } | void;
    protected getNext(): Promise<{
        value: UserStatistics[];
        done: boolean;
    }>;
}
//# sourceMappingURL=Cursor.d.ts.map