"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lock = exports.Bucket = void 0;
/**
 * Handles rate-limiting
 */
class Bucket {
    constructor(limit, interval) {
        this.limit = limit;
        this.interval = interval;
        this.count = 0;
        this.locked = false;
        this.waitQueue = [];
    }
    async queue() {
        this.count++;
        if (!this.releaseTimer)
            this.releaseTimer = setTimeout(() => this.release(), this.interval).unref();
        const lock = new Lock();
        if (this.locked || this.count > this.limit) {
            this.locked = true;
            this.waitQueue.push(lock);
        }
        else
            lock.resolve();
        return lock.promise;
    }
    release() {
        this.count = 0;
        while (this.count < this.limit && this.waitQueue.length > 0) {
            this.count++;
            this.waitQueue.shift().resolve();
        }
        if (this.releaseTimer)
            clearTimeout(this.releaseTimer);
        if (this.waitQueue.length > 0 || this.count > 0)
            this.releaseTimer = setTimeout(() => this.release(), this.interval).unref();
        if (this.waitQueue.length === 0) {
            this.releaseTimer = undefined;
            this.locked = false;
        }
    }
}
exports.Bucket = Bucket;
class Lock {
    constructor() {
        this.promise = new Promise((res, rej) => {
            this.res = res;
            this.rej = rej;
        });
    }
    resolve() { this.res(); }
    reject() { this.rej(); }
}
exports.Lock = Lock;
//# sourceMappingURL=Bucket.js.map