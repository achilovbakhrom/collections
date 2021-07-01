"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractIterator_1 = require("./AbstractIterator");
const IteratorBuilder_1 = require("./IteratorBuilder");
class ObjectIterator extends AbstractIterator_1.AbstractIterator {
    constructor(source) {
        super();
        this.source = source;
    }
    next() {
        if (!this.iterator) {
            const keys = Object.keys(this.source);
            this.iterator = new IteratorBuilder_1.IteratorBuilder(keys.entries())
                .map(([, x]) => [x, this.source[x]])
                .build();
        }
        return this.iterator.next();
    }
}
exports.ObjectIterator = ObjectIterator;
//# sourceMappingURL=ObjectIterator.js.map