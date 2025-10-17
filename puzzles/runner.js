"use strict";

var fs = require("fs");
var path = require("path");
var util = require("util");
var _ = require("./common/utils");
var puzzles = require("./puzzles");

exports.solve = function () {
  var args = parseArgs(["day", "part", "input"]);
  if (!args.day) {
    args.part && throwError("Invalid option '--part' without option '--day'");
    args.input && throwError("Invalid option '--input' without option '--day'");
    runAll(solvePuzzle);
  } else {
    var day = parseDay(args.day);
    var part = parsePart(args.part);
    runDay(solvePuzzle, day, part, args.input);
  }
};

function solvePuzzle(puzzle, part, filename) {
  console.log("=== Day %d: %s ===", puzzle.day, puzzle.title);
  var input = getInput(filename || path.join(puzzle.dirname, "input.txt"));
  part !== 2 && console.log("Part 1: %s", puzzle.solve1(input));
  part !== 1 && console.log("Part 2: %s", puzzle.solve2(input));
}

exports.test = function () {
  var args = parseArgs(["day", "part"]);
  if (!args.day) {
    args.part && throwError("Invalid option '--part' without option '--day'");
    runAll(testPuzzle);
  } else {
    var day = parseDay(args.day);
    var part = parsePart(args.part);
    runDay(testPuzzle, day, part);
  }
};

function testPuzzle(puzzle, part) {
  console.log("=== Day %d: %s ===", puzzle.day, puzzle.title);
  puzzle.tests.forEach(function (test) {
    part !== 2 && test.answer1 !== undefined && testPart(puzzle, test, 1);
    part !== 1 && test.answer2 !== undefined && testPart(puzzle, test, 2);
  });
}

function testPart(puzzle, test, part) {
  var input = getInput(path.join(puzzle.dirname, test.input));
  var solve = part === 1 ? puzzle.solve1 : puzzle.solve2;
  var expected = part === 1 ? test.answer1 : test.answer2;
  var actual = solve(input, test.config);
  if (expected === actual) {
    console.log("Test %d Part %d: PASS", test.test, part);
  } else {
    console.log("Test %d Part %d: FAIL expected '%s' actual '%s'", test.test, part, expected, actual);
  }
}

function parseArgs(options) {
  var regex = new RegExp("^--(" + options.join("|") + ")=(.*)$");
  return process.argv.slice(2).reduce(function (args, arg) {
    var match = arg.match(regex);
    match || throwError("Unexpected argument '%s'", arg);
    args[match[1]] = match[2];
    return args;
  }, {});
}

function parseDay(day) {
  !day || day.match(/^\d+$/) || throwError("Value '%s' not allowed for option '--day'", day);
  return day && parseInt(day);
}

function parsePart(part) {
  !part || part.match(/^[12]$/) || throwError("Value '%s' not allowed for option '--part'", part);
  return part && parseInt(part);
}

function runAll(run) {
  puzzles.forEach(_.unary(run));
}

function runDay(run, day, part, filename) {
  var puzzle = _.find(puzzles, _.has("day", day));
  puzzle || throwError("Day '%d' not found", day);
  run(puzzle, part, filename);
}

function getInput(filename) {
  var file = fs.readFileSync(filename, { encoding: "utf8" });
  _.includes(file, "\r") && throwError("Input file should have LF line endings");
  _.last(file) === "\n" || throwError("Input file should have a final newline");
  return file.slice(0, -1).split("\n");
}

function throwError() {
  throw new Error(util.format.apply(util, arguments));
}
