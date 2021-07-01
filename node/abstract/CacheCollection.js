"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KeyedCollection_1 = require("./KeyedCollection");
exports.REMOVAL_CAUSE_SIZE = "SIZE";
exports.REMOVAL_CAUSE_EXPIRED = "EXPIRED";
exports.REMOVAL_CAUSE_EXPLICIT = "EXPLICIT";
exports.REMOVAL_CAUSE_REPLACED = "REPLACED";
class CacheCollection extends KeyedCollection_1.KeyedCollection {
    /**
     * Remove expired entries from cache, and returns number of removed elements.
     */
    cleanup() {
        const size = this.size;
        return size - Array.from(this.keys()).length;
    }
}
exports.CacheCollection = CacheCollection;
//# sourceMappingURL=CacheCollection.js.map