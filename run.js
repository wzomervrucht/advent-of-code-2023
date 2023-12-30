"use strict";

var fs = require("fs");
var assert = require("./puzzles/common/assert");
var utils = require("./puzzles/common/utils");

function getInput(file) {
  var input = fs.readFileSync(file, { encoding: "utf8" });
  assert(!utils.includes(input, "\r") && utils.last(input) === "\n");
  return input.slice(0, -1).split("\n");
}

try {
  var puzzle = require("./puzzles/03/gear-ratios.js");
  var input = getInput("./puzzles/03/gear-ratios.txt");
  console.log("Part 1: " + (puzzle.solve1(input) || "-"));
  console.log("Part 2: " + (puzzle.solve2(input) || "-"));
} catch (error) {
  console.log(error.message);
}
