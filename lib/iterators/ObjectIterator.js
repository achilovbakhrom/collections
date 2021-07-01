"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AbstractIterator_1 = require("./AbstractIterator");
var IteratorBuilder_1 = require("./IteratorBuilder");
var ObjectIterator = /** @class */ (function (_super) {
    tslib_1.__extends(ObjectIterator, _super);
    function ObjectIterator(source) {
        var _this = _super.call(this) || this;
        _this.source = source;
        return _this;
    }
    ObjectIterator.prototype.next = function () {
        var _this = this;
        if (!this.iterator) {
            var keys = Object.keys(this.source);
            this.iterator = new IteratorBuilder_1.IteratorBuilder(keys.entries())
                .map(function (_a) {
                var _b = tslib_1.__read(_a, 2), x = _b[1];
                return [x, _this.source[x]];
            })
                .build();
        }
        return this.iterator.next();
    };
    return ObjectIterator;
}(AbstractIterator_1.AbstractIterator));
exports.ObjectIterator = ObjectIterator;
//# sourceMappingURL=ObjectIterator.js.map