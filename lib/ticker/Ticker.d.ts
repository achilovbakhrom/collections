;
    }
    entries() {
        return new LinkedMapIterator(this.tail);
    }
    clear() {
        this.map.clear();
   