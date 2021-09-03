export class Collection<K, V> extends Map<K, V> {
    constructor(iterable?: Iterable<readonly [K, V]>) {
        if (iterable)
            super(iterable);
        else
            super();
    }

    public clone(): Collection<K, V> {
        return new Collection(this.entries());
    }

    public async getOrAsyncSet(key: K, setter: () => Promise<V>): Promise<V> {
        if (this.has(key))
            return this.get(key)!;

        const value = await setter();
        this.set(key, value);
        return value;
    }

    public getOrSet(key: K, setter: () => V): V {
        if (this.has(key))
            return this.get(key)!;

        const value = setter();
        this.set(key, value);
        return value;
    }

    /**
     * Parallelises iterating over the collection
     */
    public async asyncForEach(callback: (value: V, key: K, index: number) => Promise<any>): Promise<void> {
        await Promise.all(this.map(callback));
        return;
    }

    /**
     * Parallelises mapping into an array of `T`
     */
    public async asyncMap<T>(callback: (value: V, key: K, index: number) => Promise<T>): Promise<T[]> {
        return await Promise.all(this.map(callback));
    }

    /**
     * Maps the collection into an array of `T`
     */
    public map<T>(callback: (value: V, key: K, index: number) => T): T[] {
        const ret = [];
        let index = 0;
        for (const entry of this.entries())
            ret.push(callback(entry[1], entry[0], index++));

        return ret;
    }
}
