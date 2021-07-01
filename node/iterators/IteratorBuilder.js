"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractIterator_1 = require("./AbstractIterator");
class MapIterator extends AbstractIterator_1.AbstractIterator {
    constructor(source, mapper) {
        super();
        this.source = source;
        this.mapper = mapper;
    }
    next() {
        const result = this.source.next();
        return result.done
            ? { done: result.done }
            : { done: false, value: this.mapper(result.value) };
    }
}
class FilterIterator extends AbstractIterator_1.AbstractIterator {
    constructor(source, predicate) {
        super();
        this.source = source;
        this.predicate = predicate;
    }
    next() {
        for (const value of this.source) {
            if (this.predicate(value)) {
                return { done: false, value };
            }
        }
        return { done: true };
    }
}
class IteratorBuilder {
    constructor(source) {
        this.source = source;
    }
    map(mapper) {
        return new IteratorBuilder(new MapIterator(this.source, mapper));
    }
    filter(predicate) {
        return new IteratorBuilder(new FilterIterator(this.source, predicate));
    }
    build() {
        return this.source;
    }
}
exports.IteratorBuilder = IteratorBuilder;
//# sourceMappingURL=IteratorBuilder.js.map