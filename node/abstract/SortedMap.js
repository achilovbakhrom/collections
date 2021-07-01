 = null;
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
        return node