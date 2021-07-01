"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KeyedCollection_1 = require("./KeyedCollection");
class SortedMap extends KeyedCollection_1.KeyedCollection {
    /**
     * Returns first value in the `Collection` object, or `undefined` if there is none.
     */
    firstEntry() {
        for (const entry of this) {
            return entry;
        }
        return undefined;
    }
    /**
     * Returns last value in the `Collection` object, or `undefined` if there is none.
     */
    lastEntry() {
        let result;
        for (const entry of this) {
            result = entry;
        }
        return result;
    }
}
exports.SortedMap = SortedMap;
//# sourceMappingURL=SortedMap.js.map