import { KeyedCollection } from "./KeyedCollection";
export declare abstract class SortedMap<K, V> extends KeyedCollection<K, V> {
    /**
     * Sets the `value` for `the` key in the as first element of `Collection` object. Returns the `Collection` object.
     */
    abstract setFirst(key: K, value: V): this;
    /**
     * Returns first value in the `Collection` object, or `undefined` if there is none.
     */
    firstEntry(): [K, V] | undefined;
    /**
     * Returns last value in the `Collection` object, or `undefined` if there is none.
     */
    lastEntry(): [K, V] | undefined;
}
