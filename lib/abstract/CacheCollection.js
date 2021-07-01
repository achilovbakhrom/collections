"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var KeyedCollection_1 = require("./KeyedCollection");
exports.REMOVAL_CAUSE_SIZE = "SIZE";
exports.REMOVAL_CAUSE_EXPIRED = "EXPIRED";
exports.REMOVAL_CAUSE_EXPLICIT = "EXPLICIT";
exports.REMOVAL_CAUSE_REPLACED = "REPLACED";
var CacheCollection = /** @class */ (function (_super) {
    tslib_1.__extends(CacheCollection, _super);
    function CacheCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Remove expired entries from cache, and returns number of removed elements.
     */
    CacheCollection.prototype.cleanup = function () {
        var size = this.size;
        return size - Array.from(this.keys()).length;
    };
    return CacheCollection;
}(KeyedCollection_1.KeyedCollection));
exports.CacheCollection = CacheCollection;
//# sourceMappingURL=CacheCollection.js.map