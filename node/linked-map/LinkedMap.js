"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SortedMap_1 = require("../abstract/SortedMap");
const AbstractIterator_1 = require("../iterators/AbstractIterator");
class LinkedMapNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
        this.key = key;
        this.value = value;
    }
}
class LinkedMapIterator extends AbstractIterator_1.AbstractIterator {
    constructor(node) {
        super();
        this.node = node;
    }
    next() {
        if (!this.node) {
            return { done: true };
        }
        const { key, value } = this.node;
        this.node = this.node.prev;
        return { done: false, value: [key, value] };
    }
}
class LinkedMap extends SortedMap_1.SortedMap {
    constructor(entries) {
        super();
        this.head = null;
        this.tail = null;
        this.map = new Map();
        if (entries) {
            this.setAll(entries);
        }
    }
    get size() {
        return this.map.size;
    }
    entries() {
        return new LinkedMapIterator(this.tail);
    }
    clear() {
        this.map.clear();
        this.head = null;
        this.tail = null;
    }
    delete(key) {
        const node = this.map.get(key);
        if (node) {
            this.unlinkNode(node);
            this.map.delete(key);
            return true;
        }
        return false;
    }
    get(key) {
        const node = this.map.get(key);
        return node ? node.value : undefined;
    }
    has(key) {
        return this.map.has(key);
    }
    set(key, value) {
        const node = this.insert(key, value);
        this.setHead(node);
        return this;
    }
    setFirst(key, value) {
        const node = this.insert(key, value);
        this.setTail(node);
        return this;
    }
    firstEntry() {
        const node = this.tail;
        return node ? [node.key, node.value] : undefined;
    }
    lastEntry() {
        const node = this.head;
        return node ? [node.key, node.value] : undefined;
    }
    setHead(node) {
        node.next = this.head;
        node.prev = null;
        if (this.head) {
            this.head.prev = node;
        }
        this.head = node;
        if (!this.tail) {
            this.tail = node;
        }
    }
    setTail(node) {
        node.next = null;
        node.prev = this.tail;
        if (this.tail) {
            this.tail.next = node;
        }
        this.tail = node;
        if (!this.head) {
            this.head = node;
        }
    }
    insert(key, value) {
        let node = this.map.get(key);
        if (node) {
            node.value = value;
            this.unlinkNode(node);
        }
        else {
            node = new LinkedMapNode(key, value);
            this.map.set(key, node);
        }
        return node;
    }
    unlinkNode({ prev, next }) {
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
    }
}
exports.LinkedMap = LinkedMap;
//# sourceMappingURL=LinkedMap.js.map