"use strict";

var assert = require("../common/assert");
var _ = require("../common/utils");

function solve1(input) {
  assert(_.isRectangular(input) && regex.test(input.join("")));
  var loop = findLoop(input);
  var pipe = loop.map(countPipe);
  return _.sum(pipe) / 2;
}

function solve2(input) {
  assert(_.isRectangular(input) && regex.test(input.join("")));
  var loop = findLoop(input);
  var inner = loop.map(countInner);
  return _.sum(inner);
}

function findLoop(maze) {
  var loop = maze.map(function (row) {
    return _.toArray(row).map(_.constant(""));
  });
  var position = findStart(maze);
  while (!loop[position.x][position.y]) {
    loop[position.x][position.y] = position.pipe;
    position = findNext(maze, position);
  }
  assert(position.pipe === "S");
  return loop;
}

function findStart(maze) {
  var x = _.findIndex(maze, function (row) {
    return _.includes(row, "S");
  });
  var y = maze[x].indexOf("S");

  // find connecting pipes in neighboring tiles
  var neighbors = {
    N: maze[x - 1] && _.includes(_.keys(directions.N), maze[x - 1][y]),
    E: _.includes(_.keys(directions.E), maze[x][y + 1]),
    S: maze[x + 1] && _.includes(_.keys(directions.S), maze[x + 1][y]),
    W: _.includes(_.keys(directions.W), maze[x][y - 1])
  };
  var connections = ["N", "E", "S", "W"].filter(_.evaluate(neighbors));
  assert(connections.length === 2);

  // deduce starting direction and pipe type
  var directionIn = { N: "S", E: "W", S: "N", W: "E" }[connections[0]];
  var directionOut = connections[1];
  var pipe = _.findKey(directions[directionIn], _.isEqual(directionOut));

  return { x: x, y: y, direction: directionIn, pipe: pipe };
}

function findNext(maze, position) {
  var x = position.x;
  var y = position.y;
  var direction = directions[position.direction][position.pipe];
  assert(direction);
  direction === "N" && x--;
  direction === "E" && y++;
  direction === "S" && x++;
  direction === "W" && y--;
  assert(maze[x] && maze[x][y]);
  return { x: x, y: y, direction: direction, pipe: maze[x][y] };
}

function countPipe(row) {
  return row.filter(_.identity).length;
}

function countInner(row) {
  var count = 0;
  var inside = false;
  var pipe;
  row.forEach(function (tile) {
    if (tile === "L" || tile === "F") {
      pipe = tile;
    } else if (tile === "|" || (tile === "7" && pipe === "L") || (tile === "J" && pipe === "F")) {
      inside = !inside;
    } else if (!tile && inside) {
      count++;
    }
  });
  return count;
}

var directions = {
  N: { 7: "W", "|": "N", F: "E" },
  E: { J: "N", "-": "E", 7: "S" },
  S: { L: "E", "|": "S", J: "W" },
  W: { F: "S", "-": "W", L: "N" }
};

var regex = /^[|\-.7FJL]*S[|\-.7FJL]*$/;

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
