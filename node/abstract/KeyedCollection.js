"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IteratorBuilder_1 = require("../iterators/IteratorBuilder");
const BaseCollection_1 = require("./BaseCollection");
class KeyedCollection extends BaseCollection_1.BaseCollection {
    /**
     * Sets each [`key`, `value`] entry from `entries` in the `Collection` object. Returns the `Collection` object.
     */
    setAll(entries) {
        for (const [k, v] of entries) {
            this.set(k, v);
        }
        return this;
    }
    /**
     * Removes any values associated to the `keys`.
     */
    deleteAll(keys) {
        for (const key of keys) {
            this.delete(key);
        }
    }
    /**
     * Returns a new `Iterator` object that contains the keys for each element in the `Collection` object
     * in insertion order.
     */
    keys() {
        return new IteratorBuilder_1.IteratorBuilder(this.entries()).map(([x]) => x).build();
    }
    /**
     * Returns a new `Iterator` object that contains the `values` for each element in the `Collection` object.
     */
    values() {
        return new IteratorBuilder_1.IteratorBuilder(this.entries()).map(([, x]) => x).build();
    }
}
exports.KeyedCollection = KeyedCollection;
//# sourceMappingURL=KeyedCollection.js.map