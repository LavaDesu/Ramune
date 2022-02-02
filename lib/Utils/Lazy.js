"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LazyCollection = exports.Lazy = exports.CanBeLazy = void 0;
const _1 = require("./");
/**
 * Decorates a class and forces it to have the static method
 * {@link LazyConstructor.eval | eval}
 *
 * @decorator
 */
function CanBeLazy() {
    return (constructor) => { constructor; };
}
exports.CanBeLazy = CanBeLazy;
/**
 * A lazily evaluated instance of `T`, storing only the ID
 *
 * @typeParam T A structure decorated with {@link CanBeLazy}
 */
class Lazy {
    /**
     * Create a lazily evaluated instance of `T`
     *
     * @param client Parent client creating this structure
     * @param struct The constructor for `T`
     * @param id The ID to pass to {@link LazyConstructor.eval | T.eval}
     */
    constructor(client, struct, id) {
        this.client = client;
        this.struct = struct;
        this.id = id;
    }
    /**
     * If not already, evaluates and returns `T`
     *
     * @returns An eager instance of `T`
     */
    async eval() {
        if (!this.instance)
            this.instance = await this.struct.eval(this.client, this.id);
        return this.instance;
    }
    /**
     * Checks if `T` is already evaluated
     */
    isEvaluated() {
        return "instance" in this;
    }
    /**
     * Sets an already-existing eager instance of `T`
     */
    set(instance) {
        return this.instance = instance;
    }
}
exports.Lazy = Lazy;
/**
 * A collection of {@link Lazy | lazily evaluated} `T`
 */
class LazyCollection extends _1.Collection {
    /**
     * Create a collection of lazily evaluated `T`
     */
    constructor(client, struct, ids) {
        super();
        this.client = client;
        this.struct = struct;
        for (const id of ids)
            this.set(id, new Lazy(client, struct, id));
    }
    /**
     * Evaluates and returns an instance of the specified ID
     *
     * @param id ID to get an instance of
     *
     * @returns
     * An eager instance of the ID
     *
     * `undefined` is returned if the ID doesn't exist in the collection, or the lazy instance
     * evaluates to `undefined`
     */
    async eval(id) {
        return await this.get(id)?.eval();
    }
    /**
     * Evaluates and returns all instances
     *
     * @returns A collection containing eager instances of all set IDs
     */
    async evalAll() {
        const entries = await this.asyncMap(async (lazyInstance, id) => [id, await lazyInstance.eval()]);
        return new _1.Collection(entries);
    }
}
exports.LazyCollection = LazyCollection;
//# sourceMappingURL=Lazy.js.map