ctor(node) {
        super();
        this.node = node;
    }
    next() {
        if (!this.node) {
            return { done: true };
        }
        const { key, value } = this.node;
        this.node = this.nod