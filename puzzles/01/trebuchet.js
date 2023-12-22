"use strict";

var assert = require("../common/assert");
var arr = require("../common/arrays");
var num = require("../common/numbers");

function validate(input, config) {
  input.forEach(function (line) {
    config && config.allowWrittenOnly
      ? assert(regex.test(line), "Each line should contain a numeric or written digit.")
      : assert(/\d/.test(line), "Each line should contain a numeric digit.");
  });
}

function solve1(input) {
  var values = input.map(function (line) {
    var digits = line.match(/\d/g).map(num.parse);
    return 10 * arr.first(digits) + arr.last(digits);
  });
  return num.sum(values);
}

function solve2(input) {
  var values = input.map(function (line) {
    var digits = findDigits(line);
    return 10 * arr.first(digits) + arr.last(digits);
  });
  return num.sum(values);
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
  return written.indexOf(digit) + 1 || num.parse(digit);
}

var written = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
var regex = new RegExp("\\d|" + written.join("|"));

module.exports = {
  day: 1,
  title: "Trebuchet?!",
  validate: validate,
  solve1: solve1,
  solve2: solve2,
  input: "trebuchet.txt",
  answer1: 54927,
  answer2: 54581,
  tests: [
    { input: "test1.txt", answer1: 142 },
    { input: "test2.txt", config: { allowWrittenOnly: true }, answer2: 281 }
  ]
};
