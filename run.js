"use strict";

var fs = require("fs");
var assert = require("./puzzles/common/assert");

function getInput(file) {
  var input = fs.readFileSync(file, { encoding: "utf8" });
  assert(typeof input === "string", "Input should be a string.");
  assert(input.indexOf("\r") === -1, "Input should have LF line endings.");
  assert(input[input.length - 1] === "\n", "Input should have a final newline.");
  return input.slice(0, -1).split("\n");
}

try {
  var puzzle = require("./puzzles/01/trebuchet.js");
  var input = getInput("./puzzles/01/trebuchet.txt");
  var answer = puzzle.solve1(input);
  console.log(answer);
} catch (error) {
  console.log(error.message);
}
