erator {
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
        return this.map.size