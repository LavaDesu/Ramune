"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingTokenError = void 0;
class MissingTokenError extends Error {
    constructor(message) {
        super(message);
        this.name = "Missing Token";
    }
}
exports.MissingTokenError = MissingTokenError;
//# sourceMappingURL=Errors.js.map