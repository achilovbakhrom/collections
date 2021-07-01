"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var IteratorBuilder_1 = require("../iterators/IteratorBuilder");
var BaseCollection_1 = require("./BaseCollection");
var KeyedCollection = /** @class */ (function (_super) {
    tslib_1.__extends(KeyedCollection, _super);
    function KeyedCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Sets each [`key`, `value`] entry from `entries` in the `Collection` object. Returns the `Collection` object.
     */
    KeyedCollection.prototype.setAll = function (entries) {
        try {
            for (var entries_1 = tslib_1.__values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                var _a = tslib_1.__read(entries_1_1.value, 2), k = _a[0], v = _a[1];
                this.set(k, v);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (entries_1_1 && !entries_1_1.done && (_b = entries_1.return)) _b.call(entries_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this;
        var e_1, _b;
    };
    /**
     * Removes any values associated to the `keys`.
     */
    KeyedCollection.prototype.deleteAll = function (keys) {
        try {
            for (var keys_1 = tslib_1.__values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                var key = keys_1_1.value;
                this.delete(key);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var e_2, _a;
    };
    /**
     * Returns a new `Iterator` object that contains the keys for each element in the `Collection` object
     * in insertion order.
     */
    KeyedCollection.prototype.keys = function () {
        return new IteratorBuilder_1.IteratorBuilder(this.entries()).map(function (_a) {
            var _b = tslib_1.__read(_a, 1), x = _b[0];
            return x;
        }).build();
    };
    /**
     * Returns a new `Iterator` object that contains the `values` for each element in the `Collection` object.
     */
    KeyedCollection.prototype.values = function () {
        return new IteratorBuilder_1.IteratorBuilder(this.entries()).map(function (_a) {
            var _b = tslib_1.__read(_a, 2), x = _b[1];
            return x;
        }).build();
    };
    return KeyedCollection;
}(BaseCollection_1.BaseCollection));
exports.KeyedCollection = KeyedCollection;
//# sourceMappingURL=KeyedCollection.js.map