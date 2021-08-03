/**
 * Handles rate-limiting
 */
export class Bucket {
    private readonly limit: number;
    private readonly interval: number;

    private releaseTimer?: NodeJS.Timeout;
    private count: number;
    private locked: boolean;
    private readonly waitQueue: Lock[];

    constructor(limit: number, interval: number) {
        this.limit = limit;
        this.interval = interval;
        this.count = 0;
        this.locked = false;
        this.waitQueue = [];
    }

    public async queue() {
        this.count++;
        if (!this.releaseTimer)
            this.releaseTimer = setTimeout(() => this.release(), this.interval);

        const lock = new Lock();

        if (this.locked || this.count > this.limit) {
            this.locked = true;
            this.waitQueue.push(lock);
        } else
            lock.resolve();

        return lock.promise;
    }

    private release() {
        this.count = 0;
        while (this.count < this.limit && this.waitQueue.length > 0) {
            this.count++;
            this.waitQueue.shift()!.resolve();
        }

        if (this.releaseTimer)
            clearTimeout(this.releaseTimer);

        if (this.waitQueue.length > 0 || this.count > 0)
            this.releaseTimer = setTimeout(() => this.release(), this.interval);

        if (this.waitQueue.length === 0) {
            this.releaseTimer = undefined;
            this.locked = false;
        }
    }
}

export class Lock {
    public readonly promise: Promise<void>;
    private res!: () => void;
    private rej!: () => void;

    constructor() {
        this.promise = new Promise((res, rej) => {
            this.res = res;
            this.rej = rej;
        });
    }

    resolve() { this.res(); }
    reject() { this.rej(); }
}
