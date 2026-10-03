"use strict";

var assert = require("../common/assert");
var _ = require("../common/utils");

function solve1(input) {
  var patterns = _.split(input, "");
  var reflections = patterns.map(findPerfectReflection);
  return _.sum(reflections);
}

function solve2(input) {
  var patterns = _.split(input, "");
  var reflections = patterns.map(findSmudgedReflection);
  return _.sum(reflections);
}

function findPerfectReflection(pattern) {
  return findReflection(pattern, 0);
}

function findSmudgedReflection(pattern) {
  return findReflection(pattern, 1);
}

function findReflection(pattern, smudges) {
  assert(_.isRectangular(pattern) && pattern.join("").match(/^[.#]+$/));
  var verticals = findVerticalReflections(pattern, smudges);
  var horizontals = findHorizontalReflections(pattern, smudges);
  assert(verticals.length + horizontals.length === 1);
  return verticals[0] || 100 * horizontals[0];
}

function findVerticalReflections(pattern, smudges) {
  var verticals = _.range(pattern[0].length).slice(1);
  return verticals.filter(function (y) {
    // count smudges for reflection between columns y and y+1
    var d = _.min(y, pattern[0].length - y);
    var s = _.range(d).map(function (j) {
      return _.count(_.range(pattern.length), function (x) {
        return pattern[x][y - 1 - j] !== pattern[x][y + j];
      });
    });
    return _.sum(s) === smudges;
  });
}

function findHorizontalReflections(pattern, smudges) {
  var horizontals = _.range(pattern.length).slice(1);
  return horizontals.filter(function (x) {
    // count smudges for reflection between rows x and x+1
    var d = _.min(x, pattern.length - x);
    var s = _.range(d).map(function (i) {
      return _.count(_.range(pattern[0].length), function (y) {
        return pattern[x - 1 - i][y] !== pattern[x + i][y];
      });
    });
    return _.sum(s) === smudges;
  });
}

module.exports = {
  day: 13,
  title: "Point of Incidence",
  solve1: solve1,
  solve2: solve2,
  tests: [{ test: 1, input: "test.txt", answer1: 405, answer2: 400 }],
  dirname: __dirname
};
