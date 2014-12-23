"use strict";

var _extends = function (child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  child.__proto__ = parent;
};

var EventEmitter = require('events').EventEmitter;
var Node = (function (EventEmitter) {
  var Node = function Node() {
    this.children = [];
    this.isNode = true;
    this.parent = null;
  };

  _extends(Node, EventEmitter);

  Node.prototype.add = function (child, index) {
    if (this.children.indexOf(child) >= 0 || !child.isNode || child.parent !== null || this.parent === child) {
      return false;
    }
    if (typeof index === "number") {
      this.children.splice(index, 0, child);
    } else {
      this.children.push(child);
    }
    child.parent = this;
    child.emit("added");
    return true;
  };

  Node.prototype.remove = function (child) {
    var index = this.children.indexOf(child);
    if (index < 0 || !child.isNode) return false;
    this.children.splice(index, 1);
    child.parent = null;
    child.emit("removed");
    return true;
  };

  return Node;
})(EventEmitter);

exports["default"] = Node;