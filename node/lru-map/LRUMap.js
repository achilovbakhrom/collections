"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CacheCollection_1 = require("../abstract/CacheCollection");
const SortedMap_1 = require("../abstract/SortedMap");
const LinkedMap_1 = require("../linked-map/LinkedMap");
const DEFAULT_MAX_SIZE = 100;
class LRUMap extends SortedMap_1.SortedMap {
    constructor({ maxSize, onRemove } = {}) {
        super();
        this.map = new LinkedMap_1.LinkedMap();
        this.options = { maxSize, onRemove };
    }
    get size() {
        return this.map.size;
    }
    get maxSize() {
        return this.options.maxSize || DEFAULT_MAX_SIZE;
    }
    clear() {
        const entries = this.entries();
        this.map.clear();
        for (const entry of entries) {
            this.onRemove(entry, CacheCollection_1.REMOVAL_CAUSE_EXPLICIT);
        }
    }
    delete(key) {
        if (this.map.has(key)) {
            const value = this.map.get(key);
            this.map.delete(key);
            this.onRemove([key, value], CacheCollection_1.REMOVAL_CAUSE_EXPLICIT);
            return true;
        }
        return false;
    }
    entries() {
        return this.map.entries();
    }
    /**
     * Returns the value associated to the `key`, or `undefined` if there is none
     * with updating element position in `Collection`
     */
    get(key) {
        if (!this.map.has(key)) {
            return undefined;
        }
        const value = this.map.get(key);
        this.set(key, value);
        return value;
    }
    /**
     * Returns the value associated to the `key`, or `undefined` if there is none
     * without updating element position in `Collection`
     */
    peek(key) {
        return this.map.get(key);
    }
    firstEntry() {
        const node = this.map.firstEntry();
        if (node) {
            this.set(node[0], node[1]);
        }
        return node;
    }
    lastEntry() {
        return this.map.lastEntry();
    }
    has(key) {
        return this.map.has(key);
    }
    keys() {
        return this.map.keys();
    }
    set(key, value) {
        return this.setValue(key, value, true);
    }
    setFirst(key, value) {
        return this.setValue(key, value, false);
    }
    values() {
        return this.map.values();
    }
    setValue(key, value, last) {
        const map = this.map;
        let replacedEntry;
        if (this.has(key)) {
            const [k] = (last ? map.lastEntry() : map.firstEntry());
            if (k !== key) {
                replacedEntry = [key, map.get(key)];
            }
        }
        else {
            const firstEntry = map.firstEntry();
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
    }
    onRemove(entry, cause) {
        if (this.options.onRemove) {
            this.options.onRemove(entry, cause);
        }
    }
}
exports.LRUMap = LRUMap;
//# sourceMappingURL=LRUMap.js.map