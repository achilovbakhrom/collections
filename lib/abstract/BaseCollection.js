"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BaseCollection = /** @class */ (function () {
    function BaseCollection() {
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
    BaseCollection.prototype.forEach = function (callbackfn, thisArg) {
        try {
            for (var _a = tslib_1.__values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                var _c = tslib_1.__read(_b.value, 2), k = _c[0], v = _c[1];
                callbackfn.call(thisArg, v, k, this);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _d;
    };
    return BaseCollection;
}());
exports.BaseCollection = BaseCollection;
//# sourceMappingURL=BaseCollection.js.map