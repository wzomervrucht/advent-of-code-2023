"use strict";

var assert = require("../common/assert");
var _ = require("../common/utils");

function solve1(input) {
  assert(input.length === 2 && regex0.test(input[0]) && regex1.test(input[1]));
  var times = input[0].match(/\d+/g).map(_.parse);
  var distances = input[1].match(/\d+/g).map(_.parse);
  assert(times.length === distances.length);
  var options = times.map(function (time, i) {
    return countOptions(time, distances[i]);
  });
  return _.product(options);
}

function solve2(input) {
  assert(input.length === 2 && regex0.test(input[0]) && regex1.test(input[1]));
  var time = _.parse(input[0].match(/\d+/g).join(""));
  var distance = _.parse(input[1].match(/\d+/g).join(""));
  return countOptions(time, distance);
}

function countOptions(time, distance) {
  // count n such that n * (time - n) > distance
  var min = (time - Math.sqrt(time * time - 4 * distance)) / 2;
  min = _.isInteger(min) ? min + 1 : Math.ceil(min);
  var max = (time + Math.sqrt(time * time - 4 * distance)) / 2;
  max = _.isInteger(max) ? max - 1 : Math.floor(max);
  return max - min + 1;
}

var regex0 = /^Time:( +\d+)+$/;
var regex1 = /^Distance:( +\d+)+$/;

module.exports = {
  day: 6,
  title: "Wait For It",
  solve1: solve1,
  solve2: solve2,
  tests: [{ input: "test.txt", answer1: 288, answer2: 71503 }]
};
