e.prev;
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
        ret