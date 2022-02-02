import { Client } from "../Clients";
declare type Mutable<T> = {
    -readonly [k in keyof T]: T[k];
};
/** A base class that all structures should extend from */
export declare abstract class Base<T> {
    /** The object ID */
    readonly id: number;
    /** The client that created this structure */
    readonly parent: Client;
    /** The Date that this structure was created or last updated at */
    updatedAt: Date;
    /** The raw object used to created this structure */
    raw: T;
    constructor(parent: Client, id: number, raw: any);
    /**
     * Updates the structure with new data
     */
    abstract update(): Promise<this>;
    /** Populates the structure with new data */
    protected abstract populate(data: T): void;
    toString(): string;
    protected mutate(): Mutable<this>;
}
export declare abstract class BaseCompactable<T, E> extends Base<T> {
    /** Whether or not the current data is compact */
    protected isCompact: boolean;
    constructor(parent: Client, id: number, data: T, isCompact: boolean);
    /**
     * Whether this structure is populated (to populate, call {@link update})
     *
     * @returns A boolean type guard which can mark optional properties as present
     */
    isPopulated(): this is E;
    protected abstract populate(data: T, isCompact?: boolean): void;
}
export declare type Compact<T extends BaseCompactable<unknown, E>, E> = Partial<T> & Omit<T, keyof E>;
export {};
//# sourceMappingURL=Base.d.ts.map