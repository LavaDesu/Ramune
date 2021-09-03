import { Client } from "../Clients";
import { Collection } from "./";

/**
 * Decorates a class and forces it to have the static method
 * {@link LazyConstructor.eval | eval}
 *
 * @decorator
 */
export function CanBeLazy<T>() {
    return <U extends LazyConstructor<T>>(constructor: U) => { constructor; };
}

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
export class Lazy<T> {
    /** Parent client creating this structure */
    public readonly client: Client;
    /** The constructor for `T` */
    public readonly struct: LazyConstructor<T>;
    /** The ID to pass to {@link LazyConstructor.eval | T.eval}*/
    public readonly id: number;

    private instance?: T;

    /**
     * Create a lazily evaluated instance of `T`
     *
     * @param client Parent client creating this structure
     * @param struct The constructor for `T`
     * @param id The ID to pass to {@link LazyConstructor.eval | T.eval}
     */
    constructor(client: Client, struct: LazyConstructor<T>, id: number) {
        this.client = client;
        this.struct = struct;
        this.id = id;
    }

    /**
     * If not already, evaluates and returns `T`
     *
     * @returns An eager instance of `T`
     */
    public async eval() {
        if (!this.instance)
            this.instance = await this.struct.eval(this.client, this.id);

        return this.instance;
    }

    /**
     * Checks if `T` is already evaluated
     */
    public isEvaluated() {
        return "instance" in this;
    }

    /**
     * Sets an already-existing eager instance of `T`
     */
    public set(instance: T | undefined) {
        return this.instance = instance;
    }
}

/**
 * A collection of {@link Lazy | lazily evaluated} `T`
 */
export class LazyCollection<T> extends Collection<number, Lazy<T>> {
    /** Parent client creating this structure */
    public readonly client: Client;
    /** The constructor for `T` */
    public readonly struct: LazyConstructor<T>;

    /**
     * Create a collection of lazily evaluated `T`
     */
    constructor(client: Client, struct: LazyConstructor<T>, ids: Iterable<number>) {
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
    public async eval(id: number): Promise<T | undefined> {
        return await this.get(id)?.eval();
    }

    /**
     * Evaluates and returns all instances
     *
     * @returns A collection containing eager instances of all set IDs
     */
    public async evalAll(): Promise<Collection<number, T | undefined>> {
        const entries = await this.asyncMap(async (lazyInstance, id) => [id, await lazyInstance.eval()] as const);

        return new Collection(entries);
    }
}
