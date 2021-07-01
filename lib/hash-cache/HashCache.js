"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var CacheCollection_1 = require("../abstract/CacheCollection");
var IteratorBuilder_1 = require("../iterators/IteratorBuilder");
var KeyedCache_1 = require("../keyed-cache/KeyedCache");
var HashCacheNode = /** @class */ (function () {
    function HashCacheNode(key, value) {
        this.key = key;
        this.value = value;
    }
    return HashCacheNode;
}());
exports.HashCacheNode = HashCacheNode;
var HashCache = /** @class */ (function (_super) {
    tslib_1.__extends(HashCache, _super);
    function HashCache(options) {
        var _this = _super.call(this) || this;
        var ticker = options.ticker, maxSize = options.maxSize, onRemove = options.onRemove, keyHasher = options.keyHasher, expireAfterWrite = options.expireAfterWrite, expireAfterAccess = options.expireAfterAccess;
        var cacheOptions = {
            ticker: ticker,
            maxSize: maxSize,
            expireAfterWrite: expireAfterWrite,
            expireAfterAccess: expireAfterAccess
        };
        if (onRemove) {
            cacheOptions.onRemove = function (_a, cause) {
                var _b = tslib_1.__read(_a, 2), node = _b[1];
                return onRemove([node.key, node.value], cause);
            };
        }
        _this.keyHasher = keyHasher;
        _this.cache = new KeyedCache_1.KeyedCache(cacheOptions);
        return _this;
    }
    Object.defineProperty(HashCache.prototype, "size", {
        get: function () {
            return this.cache.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HashCache.prototype, "maxSize", {
        get: function () {
            return this.cache.maxSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HashCache.prototype, "expireAfterAccess", {
        get: function () {
            return this.cache.expireAfterAccess;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HashCache.prototype, "expireAfterWrite", {
        get: function () {
            return this.cache.expireAfterWrite;
        },
        enumerable: true,
        configurable: true
    });
    HashCache.prototype.clear = function () {
        this.cache.clear();
    };
    HashCache.prototype.delete = function (key) {
        return this.cache.delete(this.keyHasher(key));
    };
    HashCache.prototype.entries = function () {
        return new IteratorBuilder_1.IteratorBuilder(this.cache.entries())
            .map(function (_a) {
            var _b = tslib_1.__read(_a, 2), x = _b[1];
            return [x.key, x.value];
        })
            .build();
    };
    HashCache.prototype.get = function (key) {
        var node = this.cache.get(this.keyHasher(key));
        return node ? node.value : undefined;
    };
    HashCache.prototype.peek = function (key) {
        var node = this.cache.peek(this.keyHasher(key));
        return node ? node.value : undefined;
    };
    HashCache.prototype.has = function (key) {
        return this.cache.has(this.keyHasher(key));
    };
    HashCache.prototype.set = function (key, value) {
        this.cache.set(this.keyHasher(key), new HashCacheNode(key, value));
        return this;
    };
    return HashCache;
}(CacheCollection_1.CacheCollection));
exports.HashCache = HashCache;
//# sourceMappingURL=HashCache.js.map