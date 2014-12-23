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
    st.fail('PENDING');

    st.end();
  });
});

test('add', function (t) {

  var parent = new Node()
    , child = new Node();

  t.plan(7);

  t.equal(parent.add.length, 2, 'has an arity of 2');
  
  t.test('returns false if child is not a Node instance', function (st) {
    st.fail('PENDING');

    st.end();
  });

  t.test('returns false if child is already a child of the parent', function (st) {
    st.fail('PENDING');
    
    st.end();
  });

  t.test('returns true if child is successfully added', function (st) {
    st.fail('PENDING');

    st.end();
  });

  t.test('adds a child without index argument', function (st) {
    st.plan(2);
    parent.add(child);
    st.equal(parent.children.length, 1, 'adds a Node to the children array');
    st.equal(parent.children.indexOf(child), 0, 'child is at index 0');
  });

  t.test('adds a child with index argument', function (st) {
    st.fail('PENDING');

    st.end();
  });

  t.test('adding a child emits the "added" event on the child node', function (st) {
    st.fail('PENDING');

    st.end(); 
  });
});

test('remove', function (t) {
  
  var parent = new Node()
    , child = new Node();

  t.plan(6);

  t.equal(parent.remove.length, 1, 'has an arity of 1');

  t.test('returns false if child is not a Node instance', function (st) {
    st.fail('PENDING');

    st.end();
  });

  t.test('returns false if child is not in the children array', function (st) {
    st.fail('PENDING');

    st.end();
  });

  t.test('returns true if child is successfully removed', function (st) {
    st.fail('PENDING');

    st.end();
  });

  t.test('removes a child', function (st) {
    st.fail('PENDING'); 

    st.end();
  });

  t.test('removing a child emits the "removed" event on the child node', function (st) {
    st.fail('PENDING'); 

    st.end();
  });
});
