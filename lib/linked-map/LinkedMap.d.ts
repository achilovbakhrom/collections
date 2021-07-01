import { SortedMap } from "../abstract/SortedMap";
export declare class LinkedMap<K, V> extends SortedMap<K, V> {
    private head;
    private tail;
    private map;
    constructor(entries?: Array<[K, V]> | Iterable<[K, V]>);
    readonly size: number;
    entries(): IterableIterator<[K, V]>;
    clear(): void;
    delete(key: K): boolean;
    get(key: K): V | undefined;
    has(key: K): boolean;
    set(key: K, value: V): this;
    setFirst(key: K, value: V): this;
    firstEntry(): [K, V] | undefined;
    lastEntry(): [K, V] | undefined;
    private setHead(node);
    private setTail(node);
    private insert(key, value);
    private unlinkNode({prev, next});
}
