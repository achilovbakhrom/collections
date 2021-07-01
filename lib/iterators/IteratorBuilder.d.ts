import { AbstractIterator } from "./AbstractIterator";
export declare type MapIteratorMapper<S, D> = (value: S) => D;
export declare type FilterIteratorPredicate<S> = (value: S) => boolean;
export declare class IteratorBuilder<S> {
    private source;
    constructor(source: AbstractIterator<S>);
    map<D>(mapper: MapIteratorMapper<S, D>): IteratorBuilder<D>;
    filter(predicate: FilterIteratorPredicate<S>): IteratorBuilder<S>;
    build(): IterableIterator<S>;
}
