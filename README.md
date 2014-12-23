basic-node
==========

Constructor implementing a basic Node interface.

Installation
------------

    npm install basic-node

Usage
-----

A basic example:

    var Node = require('basic-node')
      , parent = new Node()
      , child = new Node();

    child.on('added', function () {
      console.log('child has been added to', child.parent);
    });

    child.on('removed', function () {
      console.log('child no longer has a parent');
    });

    parent.add(child);

    console.log(parent.children.length); // => 1

    parent.remove(child);
