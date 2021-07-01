"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CacheCollection_1 = require("../abstract/CacheCollection");
const IteratorBuilder_1 = require("../iterators/IteratorBuilder");
const LinkedMap_1 = require("../linked-map/LinkedMap");
const LRUMap_1 = require("../lru-map/LRUMap");
const Ticker_1 = require("../ticker/Ticker");
class KeyedCacheNode {
    constructor(value, expiresAt) {
        this.value = value;
        this.expiresAt = expiresAt;
    }
}
class KeyedCache extends CacheCollection_1.CacheCollection {
    constructor(options = {}) {
        super();
        const { maxSize, onRemove, expireAfterWrite, expireAfterAccess, ticker = new Ticker_1.SystemTicker() } = options;
        this.options = {
            ticker,
            maxSize,
            onRemove,
            expireAfterWrite,
            expireAfterAccess
        };
        if (maxSize) {
            this.map = new LRUMap_1.LRUMap({
                maxSize,
                onRemove: ([key, node], cause) => {
                    if (cause !== CacheCollection_1.REMOVAL_CAUSE_EXPLICIT) {
                        this.onRemove([key, node.value], cause);
                    }
                }
            });
        }
        else {
            this.map = new LinkedMap_1.LinkedMap();
        }
    }
    get now() {
        return this.options.ticker.now();
    }
    get size() {
        return this.map.size;
    }
    get maxSize() {
        return this.options.maxSize;
    }
    get expireAfterAccess() {
        return this.options.expireAfterAccess || 0;
    }
    get expireAfterWrite() {
        return this.options.expireAfterWrite || 0;
    }
    clear() {
        const entries = this.map.entries();
        this.map.clear();
        for (const [key, node] of entries) {
            this.onRemove([key, node.value], CacheCollection_1.REMOVAL_CAUSE_EXPLICIT);
        }
    }
    delete(key) {
        const node = this.map.get(key);
        if (node) {
            this.map.delete(key);
            this.onRemove([key, node.value], CacheCollection_1.REMOVAL_CAUSE_EXPLICIT);
            return true;
        }
        return false;
    }
    entries() {
        return new IteratorBuilder_1.IteratorBuilder(this.map.entries())
            .filter(([k]) => this.has(k))
            .map(([key, node]) => [key, node.value])
            .build();
    }
    has(key) {
        return Boolean(this.peekNode(key));
    }
    get(key) {
        if (!this.has(key)) {
            return undefined;
        }
        const node = this.map.get(key);
        if (this.expireAfterAccess) {
            node.expiresAt = Math.max(node.expiresAt, this.now + this.expireAfterAccess);
        }
        return node.value;
    }
    peek(key) {
        const node = this.peekNode(key);
        return node ? node.value : undefined;
    }
    set(key, value) {
        const expiresAfter = Math.max(this.expireAfterWrite, this.expireAfterAccess);
        const node = new KeyedCacheNode(value, expiresAfter === 0 ? Infinity : expiresAfter + this.now);
        this.map.set(key, node);
        return this;
    }
    peekNode(key) {
        const node = this.map instanceof LRUMap_1.LRUMap ? this.map.peek(key) : this.map.get(key);
        if (node) {
            if (node.expiresAt > this.now) {
                return node;
            }
            this.map.delete(key);
            this.onRemove([key, node.value], CacheCollection_1.REMOVAL_CAUSE_EXPIRED);
        }
        return undefined;
    }
    onRemove(entry, cause) {
        if (this.options.onRemove) {
            this.options.onRemove(entry, cause);
        }
    }
}
exports.KeyedCache = KeyedCache;
//# sourceMappingURL=KeyedCache.js.map