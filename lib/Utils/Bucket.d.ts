/**
 * Handles rate-limiting
 */
export declare class Bucket {
    private readonly limit;
    private readonly interval;
    private releaseTimer?;
    private count;
    private locked;
    private readonly waitQueue;
    constructor(limit: number, interval: number);
    queue(): Promise<void>;
    private release;
}
export declare class Lock {
    readonly promise: Promise<void>;
    private res;
    private rej;
    constructor();
    resolve(): void;
    reject(): void;
}
//# sourceMappingURL=Bucket.d.ts.map