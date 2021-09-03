import { BaseRequestObject, Client } from "../Clients/Client";
import { Endpoints } from "../Endpoints";
import { MatchCompact as MatchCompactResponse } from "../Responses";
import { Match } from "../Structures/Match";

// TODO: this needs a dedicated documentation page
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
export abstract class Cursor<T> implements AsyncIterable<T>, AsyncIterator<T[], T[]> {
    private readonly values: T[] = [];

    constructor(initialValues: T[] = []) {
        this.values = initialValues;
    }

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
    async next(count: number = 10): Promise<IteratorResult<T[], T[]>> {
        const res = await this.getNext(count);
        this.values.push(...res.value);

        return res;
    }

    /**
     * Returns an AsyncGenerator with a custom buffer length
     *
     * @param bufferLength
     * Specifies how much elements will be requested.
     * By default, it is 10. This means that when there are less than 10 elements
     * left to iterate, it will asynchronously request 10 more to be used.
     */
    public async* iterate(bufferLength: number = 10) {
        let i = 0;
        let buffer: Promise<IteratorResult<T[]>> | undefined;
        let currentRes: IteratorResult<T[]> | undefined;

        // TODO: document this since it's fairly hard to follow
        // TODO: needs bug-checking
        while (true) {
            if ((this.values.length - i) <= bufferLength && !buffer)
                buffer = this.next(bufferLength);

            if (this.values.length === i) {
                // HACK: bail on !buffer
                if (!buffer)
                    break;
                currentRes = await buffer;
                buffer = undefined;
            }

            if (this.values.length === i && currentRes?.done)
                break;

            yield this.values[i];
            i++;
        }
    }

    /** @internal See class docs instead */
    public async* [Symbol.asyncIterator]() {
        yield* this.iterate();
    }
}

/**
 * A basic processor that takes one input type and outputs another
 *
 * @typeParam U Input type
 * @typeParam T Output type
 */
export type Processor<T, U> = (raw: U[]) => Promise<T[]>;

/**
 * A cursor paginating with an `offset`
 *
 * @typeParam T Structure this cursor will output on {@link next}
 * @typeParam U Raw input type that's passed to the processor
 */
export class IndexedCursor<T, U> extends Cursor<T> {
    private readonly client: Client;
    private readonly baseRequest: BaseRequestObject;
    private readonly processor: Processor<T, U>;

    private index: number = 0;

    /**
     * Constructs an indexed pagination cursor
     *
     * @param client Parent client
     * @param baseRequest Base request for data
     * @param processor A function that converts the raw response from the request into the output type
     */
    constructor(client: Client, baseRequest: BaseRequestObject, processor: Processor<T, U>) {
        super();
        this.client = client;
        this.baseRequest = baseRequest;
        this.processor = processor;
    }

    protected async getNext(count: number): Promise<IteratorResult<T[]>> {
        const response = await this.client.internalRequest<U[]>({
            ...this.baseRequest,
            query: {
                ...this.baseRequest.query,
                limit: count.toString(),
                offset: this.index.toString()
            }
        });
        this.index += response.length;

        let isDone = false;
        // FIXME: silent hardcoded 100 cap
        if (response.length < Math.min(count, 100))
            isDone = true;

        const processed = await this.processor(response);

        return {
            value: processed,
            done: isDone
        };
    }

    // TODO: the new cursor doesn't currently share the cache
    /**
     * Returns a new cursor starting from specified index
     *
     * @param index Index to start the new cursor from
     */
    public withIndex(index: number): IndexedCursor<T, U> {
        if (index < 0)
            throw new TypeError("Starting index is a negative integer");
        const newCursor = new IndexedCursor(this.client, this.baseRequest, this.processor);
        newCursor.index = index;
        return newCursor;
    }
}

/**
 * A cursor for paginating the `/matches` endpoint
 */
export class MatchCursor extends Cursor<Match> {
    private readonly client: Client;
    private readonly state: {
        query: Record<string, string>;
        lastMatch: number | undefined;
        done: boolean;
    };

    constructor(client: Client) {
        super();
        this.client = client;
        this.state = {
            query: {},
            lastMatch: undefined,
            done: false
        };
    }

    protected async getNext(count: number) {
        if (this.state.done)
            return {
                value: [],
                done: true
            };

        interface MatchResponse {
            cursor: { match_id: number };
            matches: MatchCompactResponse["match"][];
            params: Record<string, string>;
        }
        const response = await this.client.internalRequest<MatchResponse>({
            endpoint: Endpoints.API_PREFIX + Endpoints.MATCHES,
            query: {
                ...this.state.query,
                "cursor[match_id]": this.state.lastMatch?.toString() ?? ""
            }
        });
        this.state.lastMatch = response.cursor.match_id;
        this.state.query = response.params;

        // FIXME: silent hardcoded 100 cap
        if (response.matches && response.matches.length < Math.min(count, 100))
            this.state.done = true;

        const matches = response.matches.map(match => new Match(this.client, { match }));

        return {
            value: matches,
            done: this.state.done
        };
    }
}
