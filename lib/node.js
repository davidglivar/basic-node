import { EventEmitter } from 'events';

/**
 * Constructor implementing a basic Node interface. Node instances can have
 * many children and only one parent.
 * @augments EventEmitter
 */
class Node extends EventEmitter {

  constructor() {
    this.children = [];
    this.isNode = true;
    this.parent = null;
  }

  /**
   * Adds a child Node instance to this Node.
   * @public
   * @param {Node} child - The child to be added to this node
   * @param {number} [index] - The index at which to add the child
   * @fires child#added
   * @returns {boolean}
   */
  add(child, index) {
    if (this.children.indexOf(child) >= 0 
    || !child.isNode
    || child.parent !== null
    || this.parent === child) {
      return false;
    }
    if (typeof index === 'number') {
      this.children.splice(index, 0, child);
    } else {
      this.children.push(child);
    }
    child.parent = this;
    child.emit('added');
    return true;
  }

  /**
   * Removes a child Node from this Node.
   * @public
   * @param {Node} child - The child to remove from this node
   * @fires child#removed
   * @returns {boolean}
   */
  remove(child) {
    var index = this.children.indexOf(child);
    if (index < 0 || !child.isNode) return false;
    this.children.splice(index, 1);
    child.parent = null;
    child.emit('removed');
    return true;
  }
}

export default Node;
