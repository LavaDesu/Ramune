export declare class Collection<K, V> extends Map<K, V> {
    constructor(iterable?: Iterable<readonly [K, V]>);
    clone(): Collection<K, V>;
    getOrAsyncSet(key: K, setter: () => Promise<V>): Promise<V>;
    getOrSet(key: K, setter: () => V): V;
    /**
     * Parallelises iterating over the collection
     */
    asyncForEach(callback: (value: V, key: K, index: number) => Promise<any>): Promise<void>;
    /**
     * Parallelises mapping into an array of `T`
     */
    asyncMap<T>(callback: (value: V, key: K, index: number) => Promise<T>): Promise<T[]>;
    /**
     * Maps the collection into an array of `T`
     */
    map<T>(callback: (value: V, key: K, index: number) => T): T[];
}
//# sourceMappingURL=Collection.d.ts.map