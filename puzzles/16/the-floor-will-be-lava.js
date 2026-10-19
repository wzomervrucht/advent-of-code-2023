"use strict";

var assert = require("../common/assert");
var _ = require("../common/utils");

function solve1(input) {
  var grid = parseGrid(input);
  var tiles = _.flat(grid);
  energize(grid, { x: 0, y: 0, direction: "E" });
  return _.count(tiles, isEnergized);
}

function solve2(input) {
  var grid = parseGrid(input);
  var tiles = _.flat(grid);
  var configurations = getConfigurations(grid.length, grid[0].length);
  var energized = configurations.map(function (configuration) {
    deenergize(tiles);
    energize(grid, configuration);
    return _.count(tiles, isEnergized);
  });
  return _.max(energized);
}

function parseGrid(input) {
  assert(_.isRectangular(input) && input.join("").match(/^[./\\|-]+$/));
  var grid = input.map(function (line, x) {
    return line.split("").map(function (char, y) {
      return {
        N: { x: x, y: y, char: char, direction: "N" },
        E: { x: x, y: y, char: char, direction: "E" },
        S: { x: x, y: y, char: char, direction: "S" },
        W: { x: x, y: y, char: char, direction: "W" }
      };
    });
  });
  grid.forEach(function (row) {
    row.forEach(function (tile) {
      tile.N.next = getNext(grid, tile.N);
      tile.E.next = getNext(grid, tile.E);
      tile.S.next = getNext(grid, tile.S);
      tile.W.next = getNext(grid, tile.W);
    });
  });
  return grid;
}

function getNext(grid, position) {
  var directions = getNextDirections(position);
  var next = directions.map(function (direction) {
    var x = position.x;
    var y = position.y;
    direction === "N" && x--;
    direction === "E" && y++;
    direction === "S" && x++;
    direction === "W" && y--;
    return grid[x] && grid[x][y] && grid[x][y][direction];
  });
  return next.filter(_.identity);
}

function getNextDirections(position) {
  if (position.char === "/") {
    return [{ N: "E", E: "N", S: "W", W: "S" }[position.direction]];
  }
  if (position.char === "\\") {
    return [{ N: "W", E: "S", S: "E", W: "N" }[position.direction]];
  }
  if (position.char === "|" && _.includes(["E", "W"], position.direction)) {
    return ["N", "S"];
  }
  if (position.char === "-" && _.includes(["N", "S"], position.direction)) {
    return ["E", "W"];
  }
  return [position.direction];
}

function getConfigurations(m, n) {
  return _.flat([
    _.range(n).map(function (y) {
      return { x: m - 1, y: y, direction: "N" };
    }),
    _.range(m).map(function (x) {
      return { x: x, y: 0, direction: "E" };
    }),
    _.range(n).map(function (y) {
      return { x: 0, y: y, direction: "S" };
    }),
    _.range(m).map(function (x) {
      return { x: x, y: n - 1, direction: "W" };
    })
  ]);
}

function energize(grid, configuration) {
  var initial = grid[configuration.x][configuration.y][configuration.direction];
  var next = [initial];
  while (next.length) {
    var position = next.pop();
    if (!position.energized) {
      position.energized = true;
      Array.prototype.push.apply(next, position.next);
    }
  }
}

function deenergize(tiles) {
  tiles.forEach(function (tile) {
    tile.N.energized = false;
    tile.E.energized = false;
    tile.S.energized = false;
    tile.W.energized = false;
  });
}

function isEnergized(tile) {
  return tile.N.energized || tile.E.energized || tile.S.energized || tile.W.energized;
}

module.exports = {
  day: 16,
  title: "The Floor Will Be Lava",
  solve1: solve1,
  solve2: solve2,
  tests: [{ test: 1, input: "test.txt", answer1: 46, answer2: 51 }],
  dirname: __dirname
};
