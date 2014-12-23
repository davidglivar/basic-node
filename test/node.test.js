var test = require('tape')
  , Node = require('../index');

test('initialization', function (t) {

  var node = new Node();

  t.plan(4);

  t.test('children', function (st) {
    st.plan(3);
    st.ok('children' in node, 'has children property');
    st.ok(Array.isArray(node.children), 'is an array');
    st.equal(node.children.length, 0, 'is empty');
  });

  t.test('isNode', function (st) {
    st.plan(2);
    st.ok('isNode' in node, 'has isNode property');
    st.equal(node.isNode, true, 'is true');
  });

  t.test('parent', function (st) {
    st.plan(2);
    st.ok('parent' in node, 'has parent property');
    st.equal(node.parent, null, 'is null');
  });

  t.test('extends EventEmitter', function (st) {
    st.ok('on' in node, 'inherits "on" method');
    st.ok('emit' in node, 'inherits "emit" method');
    st.end();
  });
});

test('add', function (t) {

  var parent
    , child
    , before = function () {
        parent = new Node();
        child = new Node();
      };

  t.plan(9);
  before();

  t.equal(parent.add.length, 2, 'has an arity of 2');
  
  t.test('returns false if child is not a Node instance', function (st) {
    before();
    st.plan(1);
    st.equal(parent.add({}), false, 'returns false');
  });

  t.test('returns false if child is already a child of the parent', function (st) {
    before();
    st.plan(1);
    parent.add(child);
    st.equal(parent.add(child), false, 'returns false');    
  });

  t.test('returns false if parent is a child of child', function (st) {
    before();
    st.plan(1);
    child.add(parent);
    st.equal(parent.add(child), false, 'returns false');
  });

  t.test('returns false if child has a non null parent property', function (st) {
    before();
    st.plan(1);
    var parentB = new Node();
    parentB.add(child);
    st.equal(parent.add(child), false, 'returns false');
  });

  t.test('returns true if child is successfully added', function (st) {
    before();
    st.plan(2);
    st.equal(parent.add(child), true, 'returns true');
    before();
    st.equal(parent.add(child, 0), true, 'returns true');
  });

  t.test('adds a child without index argument', function (st) {
    before();
    st.plan(3);
    st.equal(parent.add(child), true, 'returns true');
    st.equal(parent.children.length, 1, 'adds a Node to the children array');
    st.equal(parent.children.indexOf(child), 0, 'child is at index 0');
  });

  t.test('adds a child with index argument', function (st) {
    before();
    st.plan(5);
    var childB = new Node();
    st.equal(parent.add(child, 0), true, 'returns true');
    st.equal(parent.children.length, 1, 'adds a Node to the children array');
    st.equal(parent.children.indexOf(child), 0, 'child is at index 0');

    parent.add(childB, 0);
    st.equal(parent.children.length, 2, 'added second child to children array');
    st.equal(parent.children.indexOf(childB), 0, 'child B is at index 3');
  });

  t.test('adding a child emits the "added" event on the child node', function (st) {
    before();
    st.plan(1);
    child.on('added', function () {
      st.pass('added event emitted');
    });
    parent.add(child);
  });
});

test('remove', function (t) {
  
  var parent
    , child
    , before = function () {
        parent = new Node();
        child = new Node();
      };

  t.plan(6);
  before();

  t.equal(parent.remove.length, 1, 'has an arity of 1');

  t.test('returns false if child is not a Node instance', function (st) {
    before();
    st.plan(1);
    st.equal(parent.remove({}), false, 'returns false');
  });

  t.test('returns false if child is not in the children array', function (st) {
    before();
    parent.add(child);
    st.plan(1);
    st.equal(parent.remove(new Node()), false, 'returns false');
  });

  t.test('returns true if child is successfully removed', function (st) {
    before();
    parent.add(child);
    st.plan(1);
    st.equal(parent.remove(child), true, 'returns true');
  });

  t.test('removes a child', function (st) {
    before();
    parent.add(child);
    st.plan(2);
    st.equal(parent.children.length, 1, 'children array length is 1');
    parent.remove(child);
    st.equal(parent.children.length, 0, 'children array length is 0');
  });

  t.test('removing a child emits the "removed" event on the child node', function (st) {
    before();
    st.plan(1);
    child.on('removed', function () {
      st.pass('removed event emitted');
    });
    parent.add(child);
    parent.remove(child);
  });
});
