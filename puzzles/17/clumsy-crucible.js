"use strict";

var assert = require("../common/assert");
var _ = require("../common/utils");

function solve1(input) {
  var grid = parseGrid(input);
  return getMinimalLoss(grid, [1, 2, 3]);
}

function solve2(input) {
  var grid = parseGrid(input);
  return getMinimalLoss(grid, [4, 5, 6, 7, 8, 9, 10]);
}

function parseGrid(input) {
  assert(_.isRectangular(input) && input.join("").match(/^\d+$/));
  return input.map(function (line) {
    return line.split("").map(_.parseInt);
  });
}

function getMinimalLoss(grid, offsets) {
  var positions = getPositions(grid);
  var queue = _.flat(_.flat(positions));
  var position = popQueue(queue);
  while (!position.final) {
    updateLoss(queue, positions, position, offsets);
    position = popQueue(queue);
  }
  return position.loss;
}

function getPositions(grid) {
  var i = 0;
  return grid.map(function (row, x) {
    return row.map(function (heat, y) {
      var isStartPoint = x === 0 && y === 0;
      var isEndPoint = x === grid.length - 1 && y === grid[0].length - 1;
      return [
        { x: x, y: y, direction: 0, index: i++, heat: heat, loss: isStartPoint ? 0 : Infinity, final: isEndPoint },
        { x: x, y: y, direction: 1, index: i++, heat: heat, loss: isStartPoint ? 0 : Infinity, final: isEndPoint }
      ];
    });
  });
}

function updateLoss(queue, positions, position, offsets) {
  var moves = getMoves(positions, position, offsets);
  moves.forEach(function (move) {
    updateQueue(queue, move.target, position.loss + move.loss);
  });
}

function getMoves(positions, position, offsets) {
  var moves = offsets.map(function (offset) {
    return [-1, 1].map(function (sign) {
      return getMove(positions, position, offset, sign);
    });
  });
  return _.flat(moves).filter(_.identity);
}

function getMove(positions, position, offset, sign) {
  var path = _.range(offset).map(function (a) {
    var d = sign * (1 + a);
    return position.direction === 0
      ? { x: position.x, y: position.y + d, direction: 1 }
      : { x: position.x + d, y: position.y, direction: 0 };
  });
  var last = _.last(path);
  if (!positions[last.x] || !positions[last.x][last.y]) {
    return undefined;
  }
  return {
    loss: getLoss(positions, path),
    target: positions[last.x][last.y][last.direction]
  };
}

function getLoss(positions, path) {
  return path.reduce(function (loss, p) {
    return loss + positions[p.x][p.y][p.direction].heat;
  }, 0);
}

function popQueue(queue) {
  var min = queue[0];
  var node = queue.pop();
  if (queue.length) {
    queue[0] = node;
    node.index = 0;
    siftDown(queue, node);
  }
  return min;
}

function updateQueue(queue, node, loss) {
  if (loss < node.loss) {
    node.loss = loss;
    siftUp(queue, node);
  }
}

function siftDown(queue, node) {
  var child = getSmallestChild(queue, node);
  while (child && child.loss < node.loss) {
    swap(queue, node, child);
    child = getSmallestChild(queue, node);
  }
}

function siftUp(queue, node) {
  var parent = getParent(queue, node);
  while (parent && parent.loss > node.loss) {
    swap(queue, node, parent);
    parent = getParent(queue, node);
  }
}

function getSmallestChild(queue, node) {
  var child1 = queue[2 * node.index + 1];
  var child2 = queue[2 * node.index + 2];
  return child2 && child2.loss < child1.loss ? child2 : child1;
}

function getParent(queue, node) {
  return queue[Math.floor((node.index - 1) / 2)];
}

function swap(queue, node1, node2) {
  queue[node1.index] = node2;
  queue[node2.index] = node1;
  var index = node1.index;
  node1.index = node2.index;
  node2.index = index;
}

module.exports = {
  day: 17,
  title: "Clumsy Crucible",
  solve1: solve1,
  solve2: solve2,
  tests: [
    { test: 1, input: "test1.txt", answer1: 102, answer2: 94 },
    { test: 2, input: "test2.txt", answer2: 71 }
  ],
  dirname: __dirname
};
