nst node = this.map.get(key);
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
      