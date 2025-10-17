"use strict";

var assert = require("../common/assert");
var _ = require("../common/utils");

function solve1(input) {
  validate(input);
  var times = input[0].match(/\d+/g).map(_.parseInt);
  var distances = input[1].match(/\d+/g).map(_.parseInt);
  assert(times.length === distances.length);
  var options = times.map(function (time, i) {
    return countOptions(time, distances[i]);
  });
  return _.product(options);
}

function solve2(input) {
  validate(input);
  var time = parseInt(input[0].match(/\d+/g).join(""));
  var distance = parseInt(input[1].match(/\d+/g).join(""));
  return countOptions(time, distance);
}

function validate(input) {
  assert(input.length === 2);
  assert(input[0].match(/^Time:(?: +\d+)+$/) && input[1].match(/^Distance:(?: +\d+)+$/));
}

function countOptions(time, distance) {
  // count n such that n * (time - n) > distance
  var min = (time - Math.sqrt(time * time - 4 * distance)) / 2;
  min = _.isInteger(min) ? min + 1 : Math.ceil(min);
  var max = (time + Math.sqrt(time * time - 4 * distance)) / 2;
  max = _.isInteger(max) ? max - 1 : Math.floor(max);
  return max - min + 1;
}

module.exports = {
  day: 6,
  title: "Wait For It",
  solve1: solve1,
  solve2: solve2,
  tests: [{ test: 1, input: "test.txt", answer1: 288, answer2: 71503 }],
  dirname: __dirname
};
