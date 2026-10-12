"use strict";

var assert = require("../common/assert");
var _ = require("../common/utils");

function solve1(input) {
  assert(input.length === 1);
  var steps = input[0].split(",");
  var hashes = steps.map(hash);
  return _.sum(hashes);
}

function solve2(input) {
  assert(input.length === 1);
  var steps = input[0].split(",").map(parseStep);
  var boxes = _.range(256).map(_.nullary(Array));
  steps.forEach(performStep(boxes));
  return getPower(boxes);
}

function parseStep(step) {
  assert(step.match(/^[a-z]+(-|=\d)$/));
  return _.last(step) === "-"
    ? { label: step.slice(0, -1), operation: "-" }
    : { label: step.slice(0, -2), operation: "=", focalLength: parseInt(_.last(step)) };
}

function performStep(boxes) {
  return function (step) {
    var box = boxes[hash(step.label)];
    var index = _.findIndex(box, _.has("label", step.label));
    if (step.operation === "-") {
      index >= 0 && box.splice(index, 1);
    } else if (index >= 0) {
      box[index].focalLength = step.focalLength;
    } else {
      box.push({ label: step.label, focalLength: step.focalLength });
    }
  };
}

function hash(string) {
  return _.range(string.length).reduce(function (value, i) {
    return ((value + string.charCodeAt(i)) * 17) % 256;
  }, 0);
}

function getPower(boxes) {
  var boxPowers = boxes.map(getBoxPower);
  return _.sum(boxPowers);
}

function getBoxPower(box, m) {
  var lensPowers = box.map(getLensPower);
  return (m + 1) * _.sum(lensPowers);
}

function getLensPower(lens, n) {
  return (n + 1) * lens.focalLength;
}

module.exports = {
  day: 15,
  title: "Lens Library",
  solve1: solve1,
  solve2: solve2,
  tests: [{ test: 1, input: "test.txt", answer1: 1320, answer2: 145 }],
  dirname: __dirname
};
