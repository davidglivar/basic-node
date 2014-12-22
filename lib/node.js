// jshint esnext:true

import { EventEmitter } from 'events';

class Node extends EventEmitter {

  constructor() {
    this.children = [];
    this.isNode = true;
    this.parent = null;
  }

  add(child, index) {
    if (this.children.indexOf(child) >= 0 || !this.isNode) return false;
    if (typeof index === 'number') {
      this.children.splice(index, 0, child);
    } else {
      this.children.push(child);
    }
    child.parent = this;
    child.emit('added');
    return true;
  }

  remove(child) {
    var index = this.children.indexOf(child);
    if (index < 0 || !this.isNode) return false;
    this.children.splice(index, 1);
    child.parent = null;
    child.emit('removed');
    return true;
  }
}

export default Node;
