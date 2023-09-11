"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingCursor = exports.MatchCursor = exports.IndexedCursor = exports.Cursor = void 0;
const Endpoints = require("../Endpoints");
const Structures_1 = require("../Structures");
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
class Cursor {
    constructor(initialValues = []) {
        this.values = [];
        this.values = initialValues;
    }
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
    async next(count = 10) {
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
    async *iterate(bufferLength = 10) {
        let i = 0;
        let buffer;
        let currentRes;
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
    async *[Symbol.asyncIterator]() {
        yield* this.iterate();
    }
}
exports.Cursor = Cursor;
/**
 * A cursor paginating with an `offset`
 *
 * @typeParam T Structure this cursor will output on {@link next}
 * @typeParam U Raw input type that's passed to the processor
 */
class IndexedCursor extends Cursor {
    /**
     * Constructs an indexed pagination cursor
     *
     * @param client Parent client
     * @param baseRequest Base request for data
     * @param processor A function that converts the raw response from the request into the output type
     */
    constructor(client, baseRequest, processor) {
        super();
        this.index = 0;
        this.client = client;
        this.baseRequest = baseRequest;
        this.processor = processor;
    }
    async getNext(count) {
        const response = await this.client.internalRequest({
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
    withIndex(index) {
        if (index < 0)
            throw new TypeError("Starting index is a negative integer");
        const newCursor = new IndexedCursor(this.client, this.baseRequest, this.processor);
        newCursor.index = index;
        return newCursor;
    }
}
exports.IndexedCursor = IndexedCursor;
/**
 * A cursor for paginating the `/matches` endpoint
 */
class MatchCursor extends Cursor {
    constructor(client) {
        super();
        this.client = client;
        this.state = {
            query: {},
            lastMatch: undefined,
            done: false
        };
    }
    async getNext(count) {
        if (this.state.done)
            return {
                value: [],
                done: true
            };
        const response = await this.client.internalRequest({
            endpoint: Endpoints.MATCHES,
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
        const matches = response.matches.map(match => new Structures_1.Match(this.client, { match }));
        return {
            value: matches,
            done: this.state.done
        };
    }
}
exports.MatchCursor = MatchCursor;
/**
 * A cursor for paginating the `/rankings` endpoint
 */
class RankingCursor extends Cursor {
    constructor(client, query, initialParams) {
        super();
        this.client = client;
        this.intitialParams = initialParams;
        this.state = {
            query,
            nextPage: 1,
            done: false
        };
    }
    /**
     * Gets spotlight information
     * @returns void if type is not charts or data has not been queried */
    getSpotlightInfo() {
        if (this.beatmapsets && this.spotlight)
            return {
                beatmapsets: this.beatmapsets,
                spotlight: this.spotlight
            };
        return;
    }
    async getNext() {
        if (this.state.done)
            return {
                value: [],
                done: true
            };
        const response = await this.client.internalRequest({
            endpoint: Endpoints.RANKINGS.replace("{mode}", this.intitialParams.mode).replace("{type}", this.intitialParams.type),
            query: {
                ...this.state.query,
                "cursor[page]": this.state.nextPage.toString()
            }
        });
        this.beatmapsets = response.beatmapsets;
        this.spotlight = response.spotlight;
        this.state.nextPage = response.cursor.page;
        if (response.ranking.length < 50)
            this.state.done = true;
        const rankings = response.ranking;
        return {
            value: rankings,
            done: this.state.done
        };
    }
}
exports.RankingCursor = RankingCursor;
//# sourceMappingURL=Cursor.js.map