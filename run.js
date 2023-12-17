"use strict";

var fs = require("fs");

function readFile(file) {
  return fs.readFileSync(file, { encoding: "utf8" });
}

var puzzle = require("./puzzles/01/trebuchet.js");
var input = readFile("./puzzles/01/trebuchet.txt");

var answer = puzzle.solve1(input);
console.log(answer);
