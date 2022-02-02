"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
class Collection extends Map {
    constructor(iterable) {
        if (iterable)
            super(iterable);
        else
            super();
    }
    clone() {
        return new Collection(this.entries());
    }
    async getOrAsyncSet(key, setter) {
        if (this.has(key))
            return this.get(key);
        const value = await setter();
        this.set(key, value);
        return value;
    }
    getOrSet(key, setter) {
        if (this.has(key))
            return this.get(key);
        const value = setter();
        this.set(key, value);
        return value;
    }
    /**
     * Parallelises iterating over the collection
     */
    async asyncForEach(callback) {
        await Promise.all(this.map(callback));
        return;
    }
    /**
     * Parallelises mapping into an array of `T`
     */
    async asyncMap(callback) {
        return await Promise.all(this.map(callback));
    }
    /**
     * Maps the collection into an array of `T`
     */
    map(callback) {
        const ret = [];
        let index = 0;
        for (const entry of this.entries())
            ret.push(callback(entry[1], entry[0], index++));
        return ret;
    }
}
exports.Collection = Collection;
//# sourceMappingURL=Collection.js.map