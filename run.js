"use strict";

var fs = require("fs");
var assert = require("./puzzles/common/assert");
var str = require("./puzzles/common/strings");

function getInput(file) {
  var input = fs.readFileSync(file, { encoding: "utf8" });
  assert(typeof input === "string", "Input should be a string.");
  assert(!str.includes(input, "\r"), "Input should have LF line endings.");
  assert(str.last(input) === "\n", "Input should have a final newline.");
  return input.slice(0, -1).split("\n");
}

try {
  var puzzle = require("./puzzles/02/cube-conundrum.js");
  var input = getInput("./puzzles/02/cube-conundrum.txt");
  console.log("Part 1: " + (puzzle.solve1(input) || "-"));
  console.log("Part 2: " + (puzzle.solve2(input) || "-"));
} catch (error) {
  console.log(error.message);
}
