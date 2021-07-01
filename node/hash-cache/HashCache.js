"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CacheCollection_1 = require("../abstract/CacheCollection");
const IteratorBuilder_1 = require("../iterators/IteratorBuilder");
const KeyedCache_1 = require("../keyed-cache/KeyedCache");
class HashCacheNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
exports.HashCacheNode = HashCacheNode;
class HashCache extends CacheCollection_1.CacheCollection {
    constructor(options) {
        super();
        const { ticker, maxSize, onRemove, keyHasher, expireAfterWrite, expireAfterAccess } = options;
        const cacheOptions = {
            ticker,
            maxSize,
            expireAfterWrite,
            expireAfterAccess
        };
        if (onRemove) {
            cacheOptions.onRemove = ([, node], cause) => onRemove([node.key, node.value], cause);
        }
        this.keyHasher = keyHasher;
        this.cache = new KeyedCache_1.KeyedCache(cacheOptions);
    }
    get size() {
        return this.cache.size;
    }
    get maxSize() {
        return this.cache.maxSize;
    }
    get expireAfterAccess() {
        return this.cache.expireAfterAccess;
    }
    get expireAfterWrite() {
        return this.cache.expireAfterWrite;
    }
    clear() {
        this.cache.clear();
    }
    delete(key) {
        return this.cache.delete(this.keyHasher(key));
    }
    entries() {
        return new IteratorBuilder_1.IteratorBuilder(this.cache.entries())
            .map(([, x]) => [x.key, x.value])
            .build();
    }
    get(key) {
        const node = this.cache.get(this.keyHasher(key));
        return node ? node.value : undefined;
    }
    peek(key) {
        const node = this.cache.peek(this.keyHasher(key));
        return node ? node.value : undefined;
    }
    has(key) {
        return this.cache.has(this.keyHasher(key));
    }
    set(key, value) {
        this.cache.set(this.keyHasher(key), new HashCacheNode(key, value));
        return this;
    }
}
exports.HashCache = HashCache;
//# sourceMappingURL=HashCache.js.map