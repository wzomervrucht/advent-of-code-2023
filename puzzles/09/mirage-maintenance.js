"use strict";

var assert = require("../common/assert");
var _ = require("../common/utils");

function solve1(input) {
  var histories = input.map(parseHistory);
  var next = histories.map(findNext);
  return _.sum(next);
}

function solve2(input) {
  var histories = input.map(parseHistory);
  var previous = histories.map(findPrevious);
  return _.sum(previous);
}

function parseHistory(line) {
  assert(regex.test(line));
  return line.match(/-?\d+/g).map(_.parse);
}

function findNext(history) {
  var next = 0;
  var sequence = history;
  while (sequence.some(_.identity)) {
    next += _.last(sequence);
    sequence = getDifferences(sequence);
    assert(sequence.length);
  }
  return next;
}

function findPrevious(history) {
  var previous = 0;
  var sign = 1;
  var sequence = history;
  while (sequence.some(_.identity)) {
    previous += sign * _.first(sequence);
    sign = -sign;
    sequence = getDifferences(sequence);
    assert(sequence.length);
  }
  return previous;
}

function getDifferences(sequence) {
  return sequence.slice(1).map(function (value, i) {
    return value - sequence[i];
  });
}

var regex = /^-?\d+(?: -?\d+)*$/;

module.exports = {
  day: 9,
  title: "Mirage Maintenance",
  solve1: solve1,
  solve2: solve2,
  answer1: 1987402313,
  answer2: 900,
  tests: [{ input: "test.txt", answer1: 114, answer2: 2 }]
};
