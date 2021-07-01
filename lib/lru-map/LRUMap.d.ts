import { Cache, CacheRemovalCause } from "../abstract/CacheCollection";
import { SortedMap } from "../abstract/SortedMap";
export interface LRUMapOptions<K, V> {
    maxSize?: number;
    onRemove?: (entry: [K, V], cause: CacheRemovalCause) => void;
}
export declare class LRUMap<K, V> extends SortedMap<K, V> implements Cache<K, V> {
    private map;
    private options;
    constructor({maxSize, onRemove}?: LRUMapOptions<K, V>);
    readonly size: number;
    readonly maxSize: number;
    clear(): void;
    delete(key: K): boolean;
    entries(): IterableIterator<[K, V]>;
    /**
     * Returns the value associated to the `key`, or `undefined` if there is none
     * with updating element position in `Collection`
     */
    get(key: K): V | undefined;
    /**
     * Returns the value associated to the `key`, or `undefined` if there is none
     * without updating element position in `Collection`
     */
    peek(key: K): V | undefined;
    firstEntry(): [K, V] | undefined;
    lastEntry(): [K, V] | undefined;
    has(key: K): boolean;
    keys(): IterableIterator<K>;
    set(key: K, value: V): this;
    setFirst(key: K, value: V): this;
    values(): IterableIterator<V>;
    private setValue(key, value, last);
    private onRemove(entry, cause);
}
