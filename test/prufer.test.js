'use strict'

const _ = require('lodash')
    , test = require('tap').test
    , treeFromPrufer = require('../lib/tree')
    , randomTree = require('../lib/random-tree')
    , randomPruferSequence = require('../lib/random-sequence')

test('Genrating trees from Prüfer sequences', function(t) {
  var prufer = [3, 3, 3, 4]
    , expected = [ [ 3, 0 ], [ 3, 1 ], [ 3, 2 ], [ 4, 3 ], [ 4, 5 ] ]
    , tree = treeFromPrufer(prufer)

  t.same(tree, expected, 'Should return the expected tree.')
  t.end()
})

test('Genrating random Prüfer sequences', function(t) {
  t.equal(
      randomPruferSequence(10).length
    , 10
    , 'Should return a sequence  with the requested number of items'
    )
  t.end()
})

test('Generating random trees by node count', function(t) {

  t.throws(randomTreeLater(0), 'Should throw for less than 3 nodes')
  t.throws(randomTreeLater(1), 'Should throw for less than 3 nodes')
  t.throws(randomTreeLater(2), 'Should throw for less than 3 nodes')

  t.equal(
      countNodes(randomTree(3))
    , 3
    , 'Should have the requested node count'
    )

  t.equal(
      countNodes(randomTree(10))
    , 10
    , 'Should have the requested node count'
    )

  t.end()

  function randomTreeLater(n) {
    return function() {
      randomTree(n)
    }
  }

})

function countNodes(tree) {
  return _.chain(tree).flatten().uniq().value().length
}
