"use strict";

var assert = require("../common/assert");
var _ = require("../common/utils");

function solve1(input) {
  var grid = parseGrid(input);
  tiltNorth(grid);
  return getLoad(grid);
}

function solve2(input) {
  var grid = parseGrid(input);
  var key = getKey(grid);
  var keys = {};
  var cycles = 0;

  // perform spin cycles until we return to a previous state
  while (!(key in keys)) {
    keys[key] = cycles++;
    tilt(grid);
    key = getKey(grid);
  }

  var start = keys[key];
  var offset = (1000000000 - start) % (cycles - start);
  key = _.findKey(keys, _.equals(start + offset));
  grid = fromKey(key, grid.length, grid[0].length);
  return getLoad(grid);
}

function parseGrid(input) {
  assert(_.isRectangular(input) && input.join("").match(/^[.#O]+$/));
  return input.map(function (line) {
    return line.split("");
  });
}

function tilt(grid) {
  tiltNorth(grid);
  tiltWest(grid);
  tiltSouth(grid);
  tiltEast(grid);
}

function tiltNorth(grid) {
  for (var j = 0; j < grid[0].length; j++) {
    var block = -1; // north-most blocked position
    for (var i = 0; i < grid.length; i++) {
      if (grid[i][j] === "#") {
        block = i;
      }
      if (grid[i][j] === "O") {
        block++;
        grid[i][j] = ".";
        grid[block][j] = "O";
      }
    }
  }
}

function tiltWest(grid) {
  for (var i = 0; i < grid.length; i++) {
    var block = -1; // west-most blocked position
    for (var j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "#") {
        block = j;
      }
      if (grid[i][j] === "O") {
        block++;
        grid[i][j] = ".";
        grid[i][block] = "O";
      }
    }
  }
}

function tiltSouth(grid) {
  for (var j = 0; j < grid[0].length; j++) {
    var block = grid.length; // south-most blocked position
    for (var i = grid.length - 1; i >= 0; i--) {
      if (grid[i][j] === "#") {
        block = i;
      }
      if (grid[i][j] === "O") {
        block--;
        grid[i][j] = ".";
        grid[block][j] = "O";
      }
    }
  }
}

function tiltEast(grid) {
  for (var i = 0; i < grid.length; i++) {
    var block = grid[0].length; // east-most blocked position
    for (var j = grid[0].length - 1; j >= 0; j--) {
      if (grid[i][j] === "#") {
        block = j;
      }
      if (grid[i][j] === "O") {
        block--;
        grid[i][j] = ".";
        grid[i][block] = "O";
      }
    }
  }
}

function getKey(grid) {
  return _.flat(grid).join("");
}

function fromKey(key, m, n) {
  return _.range(m).map(function (x) {
    return key.slice(x * n, x * n + n).split("");
  });
}

function getLoad(grid) {
  return grid.reduce(function (load, row, x) {
    return load + _.count(row, _.equals("O")) * (grid.length - x);
  }, 0);
}

module.exports = {
  day: 14,
  title: "Parabolic Reflector Dish",
  solve1: solve1,
  solve2: solve2,
  tests: [{ test: 1, input: "test.txt", answer1: 136, answer2: 64 }],
  dirname: __dirname
};
