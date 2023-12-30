"use strict";

var assert = require("../common/assert");
var _ = require("../common/utils");

function solve1(input) {
  var values = input.map(function (line) {
    var digits = (line.match(/\d/g) || []).map(_.parse);
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
  var digits = [];
  var from = 0;
  var match = line.match(regex);
  while (match) {
    digits.push(parseDigit(match[0]));
    from += match.index + 1;
    match = line.slice(from).match(regex);
  }
  return digits;
}

function parseDigit(digit) {
  return written.indexOf(digit) + 1 || _.parse(digit);
}

var written = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
var regex = new RegExp("\\d|" + written.join("|"));

module.exports = {
  day: 1,
  title: "Trebuchet?!",
  solve1: solve1,
  solve2: solve2,
  input: "trebuchet.txt",
  answer1: 54927,
  answer2: 54581,
  tests: [
    { input: "test1.txt", answer1: 142 },
    { input: "test2.txt", answer2: 281 }
  ]
};
