/** A base class that all structures should extend from */

import { Client } from "../Clients/Client";

type Mutable<T> = {
    -readonly [k in keyof T]: T[k];
};
export abstract class Base {
    /** The object ID */
    public readonly id: number;

    /** The client that created this structure */
    public readonly parent: Client;

    /** The Date that this structure was created or last updated at */
    public updatedAt: Date;

    /** The raw object used to created this structure */
    public raw: unknown;


    public constructor(parent: Client, id: number, raw: any) {
        this.id = id;
        this.parent = parent;
        this.updatedAt = new Date();
        this.raw = raw;
    }

    public toString() {
        return `[${this.constructor.name}] ${this.id}`;
    }

    protected mutate(): Mutable<this> {
        return this;
    }
}
