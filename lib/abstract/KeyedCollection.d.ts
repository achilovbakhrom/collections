import { BaseCollection } from "./BaseCollection";
export declare abstract class KeyedCollection<K, V> extends BaseCollection<K, V> {
    /**
     * Sets each [`key`, `value`] entry from `entries` in the `Collection` object. Returns the `Collection` object.
     */
    setAll(entries: Iterable<[K, V]>): this;
    /**
     * Removes any values associated to the `keys`.
     */
    deleteAll(keys: Iterable<K>): void;
    /**
     * Returns a new `Iterator` object that contains the keys for each element in the `Collection` object
     * in insertion order.
     */
    keys(): IterableIterator<K>;
    /**
     * Returns a new `Iterator` object that contains the `values` for each element in the `Collection` object.
     */
    values(): IterableIterator<V>;
}
