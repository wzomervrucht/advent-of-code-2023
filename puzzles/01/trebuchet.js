"use strict";

var assert = require("../common/assert");
var _ = require("../common/utils");

function solve1(input) {
  var values = input.map(function (line) {
    var digits = (line.match(/\d/g) || []).map(_.parseInt);
    assert(digits.length);
    return 10 * _.first(digits) + _.last(digits);
  });
  return _.sum(values);
}

function solve2(input) {
  var values = input.map(function (line) {
    var digits = findDigits(line);
    assert(digits.length);
    return 10 * _.first(digits) + _.last(digits);
  });
  return _.sum(values);
}

function findDigits(line) {
  // take care of overlapping matches
  var digits = [];
  var regex = new RegExp("\\d|" + written.join("|"), "g");
  var match = regex.exec(line);
  while (match) {
    digits.push(parseDigit(match[0]));
    regex.lastIndex = match.index + 1;
    match = regex.exec(line);
  }
  return digits;
}

function parseDigit(digit) {
  return written.indexOf(digit) + 1 || parseInt(digit);
}

var written = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

module.exports = {
  day: 1,
  title: "Trebuchet?!",
  solve1: solve1,
  solve2: solve2,
  tests: [
    { test: 1, input: "test1.txt", answer1: 142 },
    { test: 2, input: "test2.txt", answer2: 281 }
  ],
  dirname: __dirname
};
