import { Client } from "../Clients";
import { Collection } from "./";
/**
 * Decorates a class and forces it to have the static method
 * {@link LazyConstructor.eval | eval}
 *
 * @decorator
 */
export declare function CanBeLazy<T>(): <U extends LazyConstructor<T>>(constructor: U) => void;
export interface LazyConstructor<T> {
    /**
     * Evaluates `T`
     *
     * @param client Parent client creating this structure
     * @param id ID to construct `T`
     */
    eval(client: Client, id: number): Promise<T | undefined>;
}
/**
 * A lazily evaluated instance of `T`, storing only the ID
 *
 * @typeParam T A structure decorated with {@link CanBeLazy}
 */
export declare class Lazy<T> {
    /** Parent client creating this structure */
    readonly client: Client;
    /** The constructor for `T` */
    readonly struct: LazyConstructor<T>;
    /** The ID to pass to {@link LazyConstructor.eval | T.eval}*/
    readonly id: number;
    private instance?;
    /**
     * Create a lazily evaluated instance of `T`
     *
     * @param client Parent client creating this structure
     * @param struct The constructor for `T`
     * @param id The ID to pass to {@link LazyConstructor.eval | T.eval}
     */
    constructor(client: Client, struct: LazyConstructor<T>, id: number);
    /**
     * If not already, evaluates and returns `T`
     *
     * @returns An eager instance of `T`
     */
    eval(): Promise<T | undefined>;
    /**
     * Checks if `T` is already evaluated
     */
    isEvaluated(): boolean;
    /**
     * Sets an already-existing eager instance of `T`
     */
    set(instance: T | undefined): T | undefined;
}
/**
 * A collection of {@link Lazy | lazily evaluated} `T`
 */
export declare class LazyCollection<T> extends Collection<number, Lazy<T>> {
    /** Parent client creating this structure */
    readonly client: Client;
    /** The constructor for `T` */
    readonly struct: LazyConstructor<T>;
    /**
     * Create a collection of lazily evaluated `T`
     */
    constructor(client: Client, struct: LazyConstructor<T>, ids: Iterable<number>);
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
    eval(id: number): Promise<T | undefined>;
    /**
     * Evaluates and returns all instances
     *
     * @returns A collection containing eager instances of all set IDs
     */
    evalAll(): Promise<Collection<number, T | undefined>>;
}
//# sourceMappingURL=Lazy.d.ts.map