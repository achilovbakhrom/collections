"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var CacheCollection_1 = require("../abstract/CacheCollection");
var IteratorBuilder_1 = require("../iterators/IteratorBuilder");
var LinkedMap_1 = require("../linked-map/LinkedMap");
var LRUMap_1 = require("../lru-map/LRUMap");
var Ticker_1 = require("../ticker/Ticker");
var KeyedCacheNode = /** @class */ (function () {
    function KeyedCacheNode(value, expiresAt) {
        this.value = value;
        this.expiresAt = expiresAt;
    }
    return KeyedCacheNode;
}());
var KeyedCache = /** @class */ (function (_super) {
    tslib_1.__extends(KeyedCache, _super);
    function KeyedCache(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        var maxSize = options.maxSize, onRemove = options.onRemove, expireAfterWrite = options.expireAfterWrite, expireAfterAccess = options.expireAfterAccess, _a = options.ticker, ticker = _a === void 0 ? new Ticker_1.SystemTicker() : _a;
        _this.options = {
            ticker: ticker,
            maxSize: maxSize,
            onRemove: onRemove,
            expireAfterWrite: expireAfterWrite,
            expireAfterAccess: expireAfterAccess
        };
        if (maxSize) {
            _this.map = new LRUMap_1.LRUMap({
                maxSize: maxSize,
                onRemove: function (_a, cause) {
                    var _b = tslib_1.__read(_a, 2), key = _b[0], node = _b[1];
                    if (cause !== CacheCollection_1.REMOVAL_CAUSE_EXPLICIT) {
                        _this.onRemove([key, node.value], cause);
                    }
                }
            });
        }
        else {
            _this.map = new LinkedMap_1.LinkedMap();
        }
        return _this;
    }
    Object.defineProperty(KeyedCache.prototype, "now", {
        get: function () {
            return this.options.ticker.now();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyedCache.prototype, "size", {
        get: function () {
            return this.map.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyedCache.prototype, "maxSize", {
        get: function () {
            return this.options.maxSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyedCache.prototype, "expireAfterAccess", {
        get: function () {
            return this.options.expireAfterAccess || 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyedCache.prototype, "expireAfterWrite", {
        get: function () {
            return this.options.expireAfterWrite || 0;
        },
        enumerable: true,
        configurable: true
    });
    KeyedCache.prototype.clear = function () {
        var entries = this.map.entries();
        this.map.clear();
        try {
            for (var entries_1 = tslib_1.__values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                var _a = tslib_1.__read(entries_1_1.value, 2), key = _a[0], node = _a[1];
                this.onRemove([key, node.value], CacheCollection_1.REMOVAL_CAUSE_EXPLICIT);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (entries_1_1 && !entries_1_1.done && (_b = entries_1.return)) _b.call(entries_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _b;
    };
    KeyedCache.prototype.delete = function (key) {
        var node = this.map.get(key);
        if (node) {
            this.map.delete(key);
            this.onRemove([key, node.value], CacheCollection_1.REMOVAL_CAUSE_EXPLICIT);
            return true;
        }
        return false;
    };
    KeyedCache.prototype.entries = function () {
        var _this = this;
        return new IteratorBuilder_1.IteratorBuilder(this.map.entries())
            .filter(function (_a) {
            var _b = tslib_1.__read(_a, 1), k = _b[0];
            return _this.has(k);
        })
            .map(function (_a) {
            var _b = tslib_1.__read(_a, 2), key = _b[0], node = _b[1];
            return [key, node.value];
        })
            .build();
    };
    KeyedCache.prototype.has = function (key) {
        return Boolean(this.peekNode(key));
    };
    KeyedCache.prototype.get = function (key) {
        if (!this.has(key)) {
            return undefined;
        }
        var node = this.map.get(key);
        if (this.expireAfterAccess) {
            node.expiresAt = Math.max(node.expiresAt, this.now + this.expireAfterAccess);
        }
        return node.value;
    };
    KeyedCache.prototype.peek = function (key) {
        var node = this.peekNode(key);
        return node ? node.value : undefined;
    };
    KeyedCache.prototype.set = function (key, value) {
        var expiresAfter = Math.max(this.expireAfterWrite, this.expireAfterAccess);
        var node = new KeyedCacheNode(value, expiresAfter === 0 ? Infinity : expiresAfter + this.now);
        this.map.set(key, node);
        return this;
    };
    KeyedCache.prototype.peekNode = function (key) {
        var node = this.map instanceof LRUMap_1.LRUMap ? this.map.peek(key) : this.map.get(key);
        if (node) {
            if (node.expiresAt > this.now) {
                return node;
            }
            this.map.delete(key);
            this.onRemove([key, node.value], CacheCollection_1.REMOVAL_CAUSE_EXPIRED);
        }
        return undefined;
    };
    KeyedCache.prototype.onRemove = function (entry, cause) {
        if (this.options.onRemove) {
            this.options.onRemove(entry, cause);
        }
    };
    return KeyedCache;
}(CacheCollection_1.CacheCollection));
exports.KeyedCache = KeyedCache;
//# sourceMappingURL=KeyedCache.js.map