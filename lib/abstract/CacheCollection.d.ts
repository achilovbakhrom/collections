import { KeyedCollection } from "./KeyedCollection";
export declare const REMOVAL_CAUSE_SIZE = "SIZE";
export declare const REMOVAL_CAUSE_EXPIRED = "EXPIRED";
export declare const REMOVAL_CAUSE_EXPLICIT = "EXPLICIT";
export declare const REMOVAL_CAUSE_REPLACED = "REPLACED";
export declare type CacheRemovalCause = "EXPLICIT" | "REPLACED" | "SIZE" | "EXPIRED";
export interface Cache<K, V> {
    /**
     * Returns the value associated to the `key`, or `undefined` if there is none
     * without updating the "recently used"-ness of the key.
     */
    peek(key: K): V | undefined;
}
export declare abstract class CacheCollection<K, V> extends KeyedCollection<K, V> implements Cache<K, V> {
    abstract peek(key: K): V | undefined;
    /**
     * Remove expired entries from cache, and returns number of removed elements.
     */
    cleanup(): number;
    readonly abstract maxSize: number | undefined;
    readonly abstract expireAfterAccess: number;
    readonly abstract expireAfterWrite: number;
}
