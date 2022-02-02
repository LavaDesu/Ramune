"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCompactable = exports.Base = void 0;
/** A base class that all structures should extend from */
class Base {
    constructor(parent, id, raw) {
        this.id = id;
        this.parent = parent;
        this.updatedAt = new Date();
        this.raw = raw;
    }
    toString() {
        return `[${this.constructor.name}] ${this.id}`;
    }
    mutate() {
        return this;
    }
}
exports.Base = Base;
class BaseCompactable extends Base {
    constructor(parent, id, data, isCompact) {
        super(parent, id, data);
        this.isCompact = isCompact;
    }
    /**
     * Whether this structure is populated (to populate, call {@link update})
     *
     * @returns A boolean type guard which can mark optional properties as present
     */
    isPopulated() { return !this.isCompact; }
}
exports.BaseCompactable = BaseCompactable;
//# sourceMappingURL=Base.js.map