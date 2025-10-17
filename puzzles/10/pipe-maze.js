"use strict";

var assert = require("../common/assert");
var _ = require("../common/utils");

function solve1(input) {
  validate(input);
  var loop = findLoop(input);
  var pipes = loop.map(countPipes);
  return _.sum(pipes) / 2;
}

function solve2(input) {
  validate(input);
  var loop = findLoop(input);
  var inner = loop.map(countInner);
  return _.sum(inner);
}

function validate(input) {
  assert(_.isRectangular(input));
  assert(input.join("").match(/^[|\-LJ7F.]*S[|\-LJ7F.]*$/));
}

function findLoop(grid) {
  var loop = grid.map(function (row) {
    return row.split("").map(_.constant());
  });
  var position = findStart(grid);
  while (!loop[position.x][position.y]) {
    loop[position.x][position.y] = position.pipe;
    position = findNext(grid, position);
  }
  assert(position.pipe === "S");
  return loop;
}

function findStart(grid) {
  var x = _.findIndex(grid, function (row) {
    return _.includes(row, "S");
  });
  var y = grid[x].indexOf("S");

  // find connecting pipes in neighboring tiles
  var neighbors = {
    N: grid[x - 1] && directions.N[grid[x - 1][y]],
    E: grid[x][y + 1] && directions.E[grid[x][y + 1]],
    S: grid[x + 1] && directions.S[grid[x + 1][y]],
    W: grid[x][y - 1] && directions.W[grid[x][y - 1]]
  };
  var connections = ["N", "E", "S", "W"].filter(_.evaluate(neighbors));
  assert(connections.length === 2);

  // deduce starting direction and pipe type
  var directionIn = { N: "S", E: "W", S: "N", W: "E" }[connections[0]];
  var directionOut = connections[1];
  var pipe = _.findKey(directions[directionIn], _.equals(directionOut));

  return { x: x, y: y, direction: directionIn, pipe: pipe };
}

function findNext(grid, position) {
  var x = position.x;
  var y = position.y;
  var direction = directions[position.direction][position.pipe];
  assert(direction);
  direction === "N" && x--;
  direction === "E" && y++;
  direction === "S" && x++;
  direction === "W" && y--;
  assert(grid[x] && grid[x][y]);
  return { x: x, y: y, direction: direction, pipe: grid[x][y] };
}

function countPipes(row) {
  return row.filter(_.identity).length;
}

function countInner(row) {
  var pipe;
  var inside = false;
  return row.reduce(function (count, tile) {
    if (tile === "L" || tile === "F") {
      pipe = tile;
    }
    if (tile === "|" || (tile === "7" && pipe === "L") || (tile === "J" && pipe === "F")) {
      inside = !inside;
    }
    return !tile && inside ? count + 1 : count;
  }, 0);
}

var directions = {
  N: { 7: "W", "|": "N", F: "E" },
  E: { J: "N", "-": "E", 7: "S" },
  S: { L: "E", "|": "S", J: "W" },
  W: { F: "S", "-": "W", L: "N" }
};

module.exports = {
  day: 10,
  title: "Pipe Maze",
  solve1: solve1,
  solve2: solve2,
  tests: [
    { test: 1, input: "test1.txt", answer1: 4 },
    { test: 2, input: "test2.txt", answer1: 8 },
    { test: 3, input: "test3.txt", answer2: 4 },
    { test: 4, input: "test4.txt", answer2: 4 },
    { test: 5, input: "test5.txt", answer2: 8 },
    { test: 6, input: "test6.txt", answer2: 10 }
  ],
  dirname: __dirname
};
