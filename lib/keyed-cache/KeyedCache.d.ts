import { CacheCollection } from "../abstract/CacheCollection";
import { LRUMapOptions } from "../lru-map/LRUMap";
import { Ticker } from "../ticker/Ticker";
export interface KeyedCacheOptions<K, V> extends LRUMapOptions<K, V> {
    ticker?: Ticker;
    expireAfterWrite?: number;
    expireAfterAccess?: number;
}
export declare class KeyedCache<K, V> extends CacheCollection<K, V> {
    private map;
    private options;
    constructor(options?: KeyedCacheOptions<K, V>);
    private readonly now;
    readonly size: number;
    readonly maxSize: number | undefined;
    readonly expireAfterAccess: number;
    readonly expireAfterWrite: number;
    clear(): void;
    delete(key: K): boolean;
    entries(): IterableIterator<[K, V]>;
    has(key: K): boolean;
    get(key: K): V | undefined;
    peek(key: K): V | undefined;
    set(key: K, value: V): this;
    private peekNode(key);
    private onRemove(entry, cause);
}
