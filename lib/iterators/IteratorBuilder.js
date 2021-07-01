"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AbstractIterator_1 = require("./AbstractIterator");
var MapIterator = /** @class */ (function (_super) {
    tslib_1.__extends(MapIterator, _super);
    function MapIterator(source, mapper) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.mapper = mapper;
        return _this;
    }
    MapIterator.prototype.next = function () {
        var result = this.source.next();
        return result.done
            ? { done: result.done }
            : { done: false, value: this.mapper(result.value) };
    };
    return MapIterator;
}(AbstractIterator_1.AbstractIterator));
var FilterIterator = /** @class */ (function (_super) {
    tslib_1.__extends(FilterIterator, _super);
    function FilterIterator(source, predicate) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.predicate = predicate;
        return _this;
    }
    FilterIterator.prototype.next = function () {
        try {
            for (var _a = tslib_1.__values(this.source), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                if (this.predicate(value)) {
                    return { done: false, value: value };
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return { done: true };
        var e_1, _c;
    };
    return FilterIterator;
}(AbstractIterator_1.AbstractIterator));
var IteratorBuilder = /** @class */ (function () {
    function IteratorBuilder(source) {
        this.source = source;
    }
    IteratorBuilder.prototype.map = function (mapper) {
        return new IteratorBuilder(new MapIterator(this.source, mapper));
    };
    IteratorBuilder.prototype.filter = function (predicate) {
        return new IteratorBuilder(new FilterIterator(this.source, predicate));
    };
    IteratorBuilder.prototype.build = function () {
        return this.source;
    };
    return IteratorBuilder;
}());
exports.IteratorBuilder = IteratorBuilder;
//# sourceMappingURL=IteratorBuilder.js.map