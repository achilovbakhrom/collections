"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var KeyedCollection_1 = require("./KeyedCollection");
var SortedMap = /** @class */ (function (_super) {
    tslib_1.__extends(SortedMap, _super);
    function SortedMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns first value in the `Collection` object, or `undefined` if there is none.
     */
    SortedMap.prototype.firstEntry = function () {
        try {
            for (var _a = tslib_1.__values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                var entry = _b.value;
                return entry;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return undefined;
        var e_1, _c;
    };
    /**
     * Returns last value in the `Collection` object, or `undefined` if there is none.
     */
    SortedMap.prototype.lastEntry = function () {
        var result;
        try {
            for (var _a = tslib_1.__values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                var entry = _b.value;
                result = entry;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return result;
        var e_2, _c;
    };
    return SortedMap;
}(KeyedCollection_1.KeyedCollection));
exports.SortedMap = SortedMap;
//# sourceMappingURL=SortedMap.js.map