import { AbstractIterator } from "./AbstractIterator";
export declare class ObjectIterator<V> extends AbstractIterator<[string, V]> {
    private source;
    private iterator;
    constructor(source: {
        [key: string]: V;
    });
    next(): IteratorResult<[string, V]>;
}
