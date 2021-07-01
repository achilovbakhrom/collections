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
        co