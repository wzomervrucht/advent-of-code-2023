"use strict";

var fs = require("fs");
var assert = require("./puzzles/common/assert");
var _ = require("./puzzles/common/utils");

function getInput(file) {
  var input = fs.readFileSync(file, { encoding: "utf8" });
  assert(!_.includes(input, "\r") && _.last(input) === "\n");
  return input.slice(0, -1).split("\n");
}

(function () {
  try {
    var puzzle = require("./puzzles/10/pipe-maze.js");
    var input = getInput("./puzzles/10/pipe-maze.txt");
    console.log("Part 1: " + puzzle.solve1(input));
    console.log("Part 2: " + puzzle.solve2(input));
  } catch (error) {
    console.log(error.message);
  }
})();
