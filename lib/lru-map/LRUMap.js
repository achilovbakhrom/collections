"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var CacheCollection_1 = require("../abstract/CacheCollection");
var SortedMap_1 = require("../abstract/SortedMap");
var LinkedMap_1 = require("../linked-map/LinkedMap");
var DEFAULT_MAX_SIZE = 100;
var LRUMap = /** @class */ (function (_super) {
    tslib_1.__extends(LRUMap, _super);
    function LRUMap(_a) {
        var _b = _a === void 0 ? {} : _a, maxSize = _b.maxSize, onRemove = _b.onRemove;
        var _this = _super.call(this) || this;
        _this.map = new LinkedMap_1.LinkedMap();
        _this.options = { maxSize: maxSize, onRemove: onRemove };
        return _this;
    }
    Object.defineProperty(LRUMap.prototype, "size", {
        get: function () {
            return this.map.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LRUMap.prototype, "maxSize", {
        get: function () {
            return this.options.maxSize || DEFAULT_MAX_SIZE;
        },
        enumerable: true,
        configurable: true
    });
    LRUMap.prototype.clear = function () {
        var entries = this.entries();
        this.map.clear();
        try {
            for (var entries_1 = tslib_1.__values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                var entry = entries_1_1.value;
                this.onRemove(entry, CacheCollection_1.REMOVAL_CAUSE_EXPLICIT);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _a;
    };
    LRUMap.prototype.delete = function (key) {
        if (this.map.has(key)) {
            var value = this.map.get(key);
            this.map.delete(key);
            this.onRemove([key, value], CacheCollection_1.REMOVAL_CAUSE_EXPLICIT);
            return true;
        }
        return false;
    };
    LRUMap.prototype.entries = function () {
        return this.map.entries();
    };
    /**
     * Returns the value associated to the `key`, or `undefined` if there is none
     * with updating element position in `Collection`
     */
    LRUMap.prototype.get = function (key) {
        if (!this.map.has(key)) {
            return undefined;
        }
        var value = this.map.get(key);
        this.set(key, value);
        return value;
    };
    /**
     * Returns the value associated to the `key`, or `undefined` if there is none
     * without updating element position in `Collection`
     */
    LRUMap.prototype.peek = function (key) {
        return this.map.get(key);
    };
    LRUMap.prototype.firstEntry = function () {
        var node = this.map.firstEntry();
        if (node) {
            this.set(node[0], node[1]);
        }
        return node;
    };
    LRUMap.prototype.lastEntry = function () {
        return this.map.lastEntry();
    };
    LRUMap.prototype.has = function (key) {
        return this.map.has(key);
    };
    LRUMap.prototype.keys = function () {
        return this.map.keys();
    };
    LRUMap.prototype.set = function (key, value) {
        return this.setValue(key, value, true);
    };
    LRUMap.prototype.setFirst = function (key, value) {
        return this.setValue(key, value, false);
    };
    LRUMap.prototype.values = function () {
        return this.map.values();
    };
    LRUMap.prototype.setValue = function (key, value, last) {
        var map = this.map;
        var replacedEntry;
        if (this.has(key)) {
            var _a = tslib_1.__read((last ? map.lastEntry() : map.firstEntry()), 1), k = _a[0];
            if (k !== key) {
                replacedEntry = [key, map.get(key)];
            }
        }
        else {
            var firstEntry = map.firstEntry();
            if (firstEntry && this.size >= this.maxSize) {
                map.delete(firstEntry[0]);
                this.onRemove(firstEntry, CacheCollection_1.REMOVAL_CAUSE_SIZE);
            }
        }
        if (last) {
            map.set(key, value);
        }
        else {
            map.setFirst(key, value);
        }
        if (replacedEntry) {
            this.onRemove(replacedEntry, CacheCollection_1.REMOVAL_CAUSE_REPLACED);
        }
        return this;
    };
    LRUMap.prototype.onRemove = function (entry, cause) {
        if (this.options.onRemove) {
            this.options.onRemove(entry, cause);
        }
    };
    return LRUMap;
}(SortedMap_1.SortedMap));
exports.LRUMap = LRUMap;
//# sourceMappingURL=LRUMap.js.map