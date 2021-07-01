"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseCollection {
    constructor() {
        /**
         * Returns a new `Iterator` object that contains an array of [`key`, `value`] for each element in
         * the `Collection` object.
         */
        this[Symbol.iterator] = this.entries;
    }
    /**
     * Calls `callbackFn` once for each key-value pair present in the `Collection` object.
     * If a thisArg parameter is provided to forEach, it will be used as the this value for each callback.
     */
    forEach(callbackfn, thisArg) {
        for (const [k, v] of this) {
            callbackfn.call(thisArg, v, k, this);
        }
    }
}
exports.BaseCollection = BaseCollection;
//# sourceMappingURL=BaseCollection.js.map