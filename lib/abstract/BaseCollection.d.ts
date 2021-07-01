export declare abstract class BaseCollection<K, V> {
    /**
     * Returns a new `Iterator` object that contains an array of [`key`, `value`] for each element in
     * the `Collection` object.
     */
    [Symbol.iterator]: () => IterableIterator<[K, V]>;
    /**
     * Returns the number of key/value pairs in the `Collection` object.
     */
    readonly abstract size: number;
    /**
     * Removes all key/value pairs from the `Collection` object.
     */
    abstract clear(): void;
    /**
     * Removes any value associated to the `key` and returns the value that `Collection#has(key)`
     * would have previously returned. `Collection#has(key)` will return false afterwards.
     */
    abstract delete(key: K): boolean;
    /**
     * Returns a new `Iterator` object that contains an array of [`key`, `value`] for each element
     * in the `Collection` object.
     */
    abstract entries(): IterableIterator<[K, V]>;
    /**
     * Calls `callbackFn` once for each key-value pair present in the `Collection` object.
     * If a thisArg parameter is provided to forEach, it will be used as the this value for each callback.
     */
    forEach(callbackfn: (value: V, key: K, collection: this) => void, thisArg?: any): void;
    /**
     * Returns the value associated to the `key`, or `undefined` if there is none.
     */
    abstract get(key: K): V | undefined;
    /**
     * Returns a boolean asserting whether a value has been associated to the `key` in the `Collection` object or not.
     */
    abstract has(key: K): boolean;
    /**
     * Sets the `value` for `the` key in the `Collection` object. Returns the `Collection` object.
     */
    abstract set(key: K, value: V): this;
}
