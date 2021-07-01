export declare abstract class AbstractIterator<T> implements IterableIterator<T> {
    abstract next(): IteratorResult<T>;
    [Symbol.iterator](): IterableIterator<T>;
}
