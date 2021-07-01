import { __extends, __read, __values } from 'tslib';

var SystemTicker = /** @class */ (function () {
    function SystemTicker() {
    }
    SystemTicker.prototype.now = function () {
        return Date.now();
    };
    return SystemTicker;
}());

var AbstractIterator = /** @class */ (function () {
    function AbstractIterator() {
    }
    AbstractIterator.prototype[Symbol.iterator] = function () {
        return this;
    };
    return AbstractIterator;
}());

var MapIterator = /** @class */ (function (_super) {
    __extends(MapIterator, _super);
    function MapIterator(source, mapper) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.mapper = mapper;
        return _this;
    }
    MapIterator.prototype.next = function () {
        var result = this.source.next();
        return result.done
            ? { done: result.done }
            : { done: false, value: this.mapper(result.value) };
    };
    return MapIterator;
}(AbstractIterator));
var FilterIterator = /** @class */ (function (_super) {
    __extends(FilterIterator, _super);
    function FilterIterator(source, predicate) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.predicate = predicate;
        return _this;
    }
    FilterIterator.prototype.next = function () {
        try {
            for (var _a = __values(this.source), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                if (this.predicate(value)) {
                    return { done: false, value: value };
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return { done: true };
        var e_1, _c;
    };
    return FilterIterator;
}(AbstractIterator));
var IteratorBuilder = /** @class */ (function () {
    function IteratorBuilder(source) {
        this.source = source;
    }
    IteratorBuilder.prototype.map = function (mapper) {
        return new IteratorBuilder(new MapIterator(this.source, mapper));
    };
    IteratorBuilder.prototype.filter = function (predicate) {
        return new IteratorBuilder(new FilterIterator(this.source, predicate));
    };
    IteratorBuilder.prototype.build = function () {
        return this.source;
    };
    return IteratorBuilder;
}());

var ObjectIterator = /** @class */ (function (_super) {
    __extends(ObjectIterator, _super);
    function ObjectIterator(source) {
        var _this = _super.call(this) || this;
        _this.source = source;
        return _this;
    }
    ObjectIterator.prototype.next = function () {
        var _this = this;
        if (!this.iterator) {
            var keys = Object.keys(this.source);
            this.iterator = new IteratorBuilder(keys.entries())
                .map(function (_a) {
                var _b = __read(_a, 2), x = _b[1];
                return [x, _this.source[x]];
            })
                .build();
        }
        return this.iterator.next();
    };
    return ObjectIterator;
}(AbstractIterator));

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
            for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
                var _c = __read(_b.value, 2), k = _c[0], v = _c[1];
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

var KeyedCollection = /** @class */ (function (_super) {
    __extends(KeyedCollection, _super);
    function KeyedCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Sets each [`key`, `value`] entry from `entries` in the `Collection` object. Returns the `Collection` object.
     */
    KeyedCollection.prototype.setAll = function (entries) {
        try {
            for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                var _a = __read(entries_1_1.value, 2), k = _a[0], v = _a[1];
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
            for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
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
        return new IteratorBuilder(this.entries()).map(function (_a) {
            var _b = __read(_a, 1), x = _b[0];
            return x;
        }).build();
    };
    /**
     * Returns a new `Iterator` object that contains the `values` for each element in the `Collection` object.
     */
    KeyedCollection.prototype.values = function () {
        return new IteratorBuilder(this.entries()).map(function (_a) {
            var _b = __read(_a, 2), x = _b[1];
            return x;
        }).build();
    };
    return KeyedCollection;
}(BaseCollection));

var REMOVAL_CAUSE_SIZE = "SIZE";
var REMOVAL_CAUSE_EXPIRED = "EXPIRED";
var REMOVAL_CAUSE_EXPLICIT = "EXPLICIT";
var REMOVAL_CAUSE_REPLACED = "REPLACED";
var CacheCollection = /** @class */ (function (_super) {
    __extends(CacheCollection, _super);
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
}(KeyedCollection));

var SortedMap = /** @class */ (function (_super) {
    __extends(SortedMap, _super);
    function SortedMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns first value in the `Collection` object, or `undefined` if there is none.
     */
    SortedMap.prototype.firstEntry = function () {
        try {
            for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
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
            for (var _a = __values(this), _b = _a.next(); !_b.done; _b = _a.next()) {
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
}(KeyedCollection));

var LinkedMapNode = /** @class */ (function () {
    function LinkedMapNode(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
        this.key = key;
        this.value = value;
    }
    return LinkedMapNode;
}());
var LinkedMapIterator = /** @class */ (function (_super) {
    __extends(LinkedMapIterator, _super);
    function LinkedMapIterator(node) {
        var _this = _super.call(this) || this;
        _this.node = node;
        return _this;
    }
    LinkedMapIterator.prototype.next = function () {
        if (!this.node) {
            return { done: true };
        }
        var _a = this.node, key = _a.key, value = _a.value;
        this.node = this.node.prev;
        return { done: false, value: [key, value] };
    };
    return LinkedMapIterator;
}(AbstractIterator));
var LinkedMap = /** @class */ (function (_super) {
    __extends(LinkedMap, _super);
    function LinkedMap(entries) {
        var _this = _super.call(this) || this;
        _this.head = null;
        _this.tail = null;
        _this.map = new Map();
        if (entries) {
            _this.setAll(entries);
        }
        return _this;
    }
    Object.defineProperty(LinkedMap.prototype, "size", {
        get: function () {
            return this.map.size;
        },
        enumerable: true,
        configurable: true
    });
    LinkedMap.prototype.entries = function () {
        return new LinkedMapIterator(this.tail);
    };
    LinkedMap.prototype.clear = function () {
        this.map.clear();
        this.head = null;
        this.tail = null;
    };
    LinkedMap.prototype.delete = function (key) {
        var node = this.map.get(key);
        if (node) {
            this.unlinkNode(node);
            this.map.delete(key);
            return true;
        }
        return false;
    };
    LinkedMap.prototype.get = function (key) {
        var node = this.map.get(key);
        return node ? node.value : undefined;
    };
    LinkedMap.prototype.has = function (key) {
        return this.map.has(key);
    };
    LinkedMap.prototype.set = function (key, value) {
        var node = this.insert(key, value);
        this.setHead(node);
        return this;
    };
    LinkedMap.prototype.setFirst = function (key, value) {
        var node = this.insert(key, value);
        this.setTail(node);
        return this;
    };
    LinkedMap.prototype.firstEntry = function () {
        var node = this.tail;
        return node ? [node.key, node.value] : undefined;
    };
    LinkedMap.prototype.lastEntry = function () {
        var node = this.head;
        return node ? [node.key, node.value] : undefined;
    };
    LinkedMap.prototype.setHead = function (node) {
        node.next = this.head;
        node.prev = null;
        if (this.head) {
            this.head.prev = node;
        }
        this.head = node;
        if (!this.tail) {
            this.tail = node;
        }
    };
    LinkedMap.prototype.setTail = function (node) {
        node.next = null;
        node.prev = this.tail;
        if (this.tail) {
            this.tail.next = node;
        }
        this.tail = node;
        if (!this.head) {
            this.head = node;
        }
    };
    LinkedMap.prototype.insert = function (key, value) {
        var node = this.map.get(key);
        if (node) {
            node.value = value;
            this.unlinkNode(node);
        }
        else {
            node = new LinkedMapNode(key, value);
            this.map.set(key, node);
        }
        return node;
    };
    LinkedMap.prototype.unlinkNode = function (_a) {
        var prev = _a.prev, next = _a.next;
        if (prev) {
            prev.next = next;
        }
        else {
            this.head = next;
        }
        if (next) {
            next.prev = prev;
        }
        else {
            this.tail = prev;
        }
    };
    return LinkedMap;
}(SortedMap));

var DEFAULT_MAX_SIZE = 100;
var LRUMap = /** @class */ (function (_super) {
    __extends(LRUMap, _super);
    function LRUMap(_a) {
        var _b = _a === void 0 ? {} : _a, maxSize = _b.maxSize, onRemove = _b.onRemove;
        var _this = _super.call(this) || this;
        _this.map = new LinkedMap();
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
            for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                var entry = entries_1_1.value;
                this.onRemove(entry, REMOVAL_CAUSE_EXPLICIT);
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
            this.onRemove([key, value], REMOVAL_CAUSE_EXPLICIT);
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
            var _a = __read((last ? map.lastEntry() : map.firstEntry()), 1), k = _a[0];
            if (k !== key) {
                replacedEntry = [key, map.get(key)];
            }
        }
        else {
            var firstEntry = map.firstEntry();
            if (firstEntry && this.size >= this.maxSize) {
                map.delete(firstEntry[0]);
                this.onRemove(firstEntry, REMOVAL_CAUSE_SIZE);
            }
        }
        if (last) {
            map.set(key, value);
        }
        else {
            map.setFirst(key, value);
        }
        if (replacedEntry) {
            this.onRemove(replacedEntry, REMOVAL_CAUSE_REPLACED);
        }
        return this;
    };
    LRUMap.prototype.onRemove = function (entry, cause) {
        if (this.options.onRemove) {
            this.options.onRemove(entry, cause);
        }
    };
    return LRUMap;
}(SortedMap));

var KeyedCacheNode = /** @class */ (function () {
    function KeyedCacheNode(value, expiresAt) {
        this.value = value;
        this.expiresAt = expiresAt;
    }
    return KeyedCacheNode;
}());
var KeyedCache = /** @class */ (function (_super) {
    __extends(KeyedCache, _super);
    function KeyedCache(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        var maxSize = options.maxSize, onRemove = options.onRemove, expireAfterWrite = options.expireAfterWrite, expireAfterAccess = options.expireAfterAccess, _a = options.ticker, ticker = _a === void 0 ? new SystemTicker() : _a;
        _this.options = {
            ticker: ticker,
            maxSize: maxSize,
            onRemove: onRemove,
            expireAfterWrite: expireAfterWrite,
            expireAfterAccess: expireAfterAccess
        };
        if (maxSize) {
            _this.map = new LRUMap({
                maxSize: maxSize,
                onRemove: function (_a, cause) {
                    var _b = __read(_a, 2), key = _b[0], node = _b[1];
                    if (cause !== REMOVAL_CAUSE_EXPLICIT) {
                        _this.onRemove([key, node.value], cause);
                    }
                }
            });
        }
        else {
            _this.map = new LinkedMap();
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
            for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                var _a = __read(entries_1_1.value, 2), key = _a[0], node = _a[1];
                this.onRemove([key, node.value], REMOVAL_CAUSE_EXPLICIT);
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
            this.onRemove([key, node.value], REMOVAL_CAUSE_EXPLICIT);
            return true;
        }
        return false;
    };
    KeyedCache.prototype.entries = function () {
        var _this = this;
        return new IteratorBuilder(this.map.entries())
            .filter(function (_a) {
            var _b = __read(_a, 1), k = _b[0];
            return _this.has(k);
        })
            .map(function (_a) {
            var _b = __read(_a, 2), key = _b[0], node = _b[1];
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
        var node = this.map instanceof LRUMap ? this.map.peek(key) : this.map.get(key);
        if (node) {
            if (node.expiresAt > this.now) {
                return node;
            }
            this.map.delete(key);
            this.onRemove([key, node.value], REMOVAL_CAUSE_EXPIRED);
        }
        return undefined;
    };
    KeyedCache.prototype.onRemove = function (entry, cause) {
        if (this.options.onRemove) {
            this.options.onRemove(entry, cause);
        }
    };
    return KeyedCache;
}(CacheCollection));

var HashCacheNode = /** @class */ (function () {
    function HashCacheNode(key, value) {
        this.key = key;
        this.value = value;
    }
    return HashCacheNode;
}());
var HashCache = /** @class */ (function (_super) {
    __extends(HashCache, _super);
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
                var _b = __read(_a, 2), node = _b[1];
                return onRemove([node.key, node.value], cause);
            };
        }
        _this.keyHasher = keyHasher;
        _this.cache = new KeyedCache(cacheOptions);
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
        return new IteratorBuilder(this.cache.entries())
            .map(function (_a) {
            var _b = __read(_a, 2), x = _b[1];
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
}(CacheCollection));

export { SystemTicker, ObjectIterator, IteratorBuilder, CacheCollection, REMOVAL_CAUSE_SIZE, REMOVAL_CAUSE_EXPIRED, REMOVAL_CAUSE_EXPLICIT, REMOVAL_CAUSE_REPLACED, LinkedMap, LRUMap, KeyedCache, HashCache };
//# sourceMappingURL=index.js.map
