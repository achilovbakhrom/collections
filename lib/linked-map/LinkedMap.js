"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var SortedMap_1 = require("../abstract/SortedMap");
var AbstractIterator_1 = require("../iterators/AbstractIterator");
var LinkedMapNode = /** @class */ (function () {
    function LinkedMapNode(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
        this.key = key;
        this.value = value;
    }
    return LinkedMapNode;
}());
var LinkedMapIterator = /** @class */ (function (_super) {
    tslib_1.__extends(LinkedMapIterator, _super);
    function LinkedMapIterator(node) {
        var _this = _super.call(this) || this;
        _this.node = node;
        return _this;
    }
    LinkedMapIterator.prototype.next = function () {
        if (!this.node) {
            return { done: true };
        }
        var _a = this.node, key = _a.key, value = _a.value;
        this.node = this.node.prev;
        return { done: false, value: [key, value] };
    };
    return LinkedMapIterator;
}(AbstractIterator_1.AbstractIterator));
var LinkedMap = /** @class */ (function (_super) {
    tslib_1.__extends(LinkedMap, _super);
    function LinkedMap(entries) {
        var _this = _super.call(this) || this;
        _this.head = null;
        _this.tail = null;
        _this.map = new Map();
        if (entries) {
            _this.setAll(entries);
        }
        return _this;
    }
    Object.defineProperty(LinkedMap.prototype, "size", {
        get: function () {
            return this.map.size;
        },
        enumerable: true,
        configurable: true
    });
    LinkedMap.prototype.entries = function () {
        return new LinkedMapIterator(this.tail);
    };
    LinkedMap.prototype.clear = function () {
        this.map.clear();
        this.head = null;
        this.tail = null;
    };
    LinkedMap.prototype.delete = function (key) {
        var node = this.map.get(key);
        if (node) {
            this.unlinkNode(node);
            this.map.delete(key);
            return true;
        }
        return false;
    };
    LinkedMap.prototype.get = function (key) {
        var node = this.map.get(key);
        return node ? node.value : undefined;
    };
    LinkedMap.prototype.has = function (key) {
        return this.map.has(key);
    };
    LinkedMap.prototype.set = function (key, value) {
        var node = this.insert(key, value);
        this.setHead(node);
        return this;
    };
    LinkedMap.prototype.setFirst = function (key, value) {
        var node = this.insert(key, value);
        this.setTail(node);
        return this;
    };
    LinkedMap.prototype.firstEntry = function () {
        var node = this.tail;
        return node ? [node.key, node.value] : undefined;
    };
    LinkedMap.prototype.lastEntry = function () {
        var node = this.head;
        return node ? [node.key, node.value] : undefined;
    };
    LinkedMap.prototype.setHead = function (node) {
        node.next = this.head;
        node.prev = null;
        if (this.head) {
            this.head.prev = node;
        }
        this.head = node;
        if (!this.tail) {
            this.tail = node;
        }
    };
    LinkedMap.prototype.setTail = function (node) {
        node.next = null;
        node.prev = this.tail;
        if (this.tail) {
            this.tail.next = node;
        }
        this.tail = node;
        if (!this.head) {
            this.head = node;
        }
    };
    LinkedMap.prototype.insert = function (key, value) {
        var node = this.map.get(key);
        if (node) {
            node.value = value;
            this.unlinkNode(node);
        }
        else {
            node = new LinkedMapNode(key, value);
            this.map.set(key, node);
        }
        return node;
    };
    LinkedMap.prototype.unlinkNode = function (_a) {
        var prev = _a.prev, next = _a.next;
        if (prev) {
            prev.next = next;
        }
        else {
            this.head = next;
        }
        if (next) {
            next.prev = prev;
        }
        else {
            this.tail = prev;
        }
    };
    return LinkedMap;
}(SortedMap_1.SortedMap));
exports.LinkedMap = LinkedMap;
//# sourceMappingURL=LinkedMap.js.map