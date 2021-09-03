import { Client } from "../Clients/Client";

type Mutable<T> = {
    -readonly [k in keyof T]: T[k];
};
/** A base class that all structures should extend from */
export abstract class Base<T> {
    /** The object ID */
    public readonly id: number;

    /** The client that created this structure */
    public readonly parent: Client;

    /** The Date that this structure was created or last updated at */
    public updatedAt: Date;

    /** The raw object used to created this structure */
    public raw: T;

    public constructor(parent: Client, id: number, raw: any) {
        this.id = id;
        this.parent = parent;
        this.updatedAt = new Date();
        this.raw = raw;
    }

    /**
     * Updates the structure with new data
     */
    public abstract update(): Promise<this>;

    /** Populates the structure with new data */
    protected abstract populate(data: T): void;

    public toString() {
        return `[${this.constructor.name}] ${this.id}`;
    }

    protected mutate(): Mutable<this> {
        return this;
    }
}

export abstract class BaseCompactable<T, E> extends Base<T> {
    /** Whether or not the current data is compact */
    protected isCompact: boolean;

    constructor(parent: Client, id: number, data: T, isCompact: boolean) {
        super(parent, id, data);
        this.isCompact = isCompact;
    }

    /**
     * Whether this structure is populated (to populate, call {@link update})
     *
     * @returns A boolean type guard which can mark optional properties as present
     */
    public isPopulated(): this is E { return !this.isCompact; }

    protected abstract populate(data: T, isCompact?: boolean): void;
}
// can E be implicitly deduced?
export type Compact<T extends BaseCompactable<unknown, E>, E> = Partial<T> & Omit<T, keyof E>;
