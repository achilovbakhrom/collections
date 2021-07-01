import { CacheCollection } from "../abstract/CacheCollection";
import { KeyedCacheOptions } from "../keyed-cache/KeyedCache";
export declare type HashType = string | number;
export interface HashCacheOptions<K, V> extends KeyedCacheOptions<K, V> {
    keyHasher: (key: K) => HashType;
}
export declare class HashCacheNode<K, V> {
    key: K;
    value: V;
    constructor(key: K, value: V);
}
export declare class HashCache<K, V> extends CacheCollection<K, V> {
    private cache;
    private keyHasher;
    constructor(options: HashCacheOptions<K, V>);
    readonly size: number;
    readonly maxSize: number | undefined;
    readonly expireAfterAccess: number;
    readonly expireAfterWrite: number;
    clear(): void;
    delete(key: K): boolean;
    entries(): IterableIterator<[K, V]>;
    get(key: K): V | undefined;
    peek(key: K): V | undefined;
    has(key: K): boolean;
    set(key: K, value: V): this;
}
