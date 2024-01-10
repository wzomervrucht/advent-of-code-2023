"use strict";

var assert = require("../common/assert");
var _ = require("../common/utils");

function solve1(input) {
  return solve(input, 2);
}

function solve2(input, config) {
  var expansion = config ? config.expansion : 1000000;
  assert(typeof expansion === "number" && isFinite(expansion));
  return solve(input, expansion);
}

function solve(input, expansion) {
  assert(_.isRectangular(input) && regex.test(input.join("")));
  var galaxies = findGalaxies(input);
  var emptyRows = _.difference(_.range(input.length), galaxies.map(_.getProperty("x")));
  var emptyCols = _.difference(_.range(input[0].length), galaxies.map(_.getProperty("y")));
  var total = 0;
  for (var i = 0; i < galaxies.length; i++) {
    for (var j = i + 1; j < galaxies.length; j++) {
      total += getDistance(galaxies[i], galaxies[j], emptyRows, emptyCols, expansion);
    }
  }
  return total;
}

function findGalaxies(input) {
  var galaxies = input.map(function (line, index) {
    return _.matchAll(line, /#/g).map(function (match) {
      return { x: index, y: match.index };
    });
  });
  return _.flat(galaxies);
}

function getDistance(a, b, emptyRows, emptyCols, expansion) {
  var rows = emptyRows.filter(function (x) {
    return (a.x < x && x < b.x) || (b.x < x && x < a.x);
  }).length;
  var cols = emptyCols.filter(function (y) {
    return (a.y < y && y < b.y) || (b.y < y && y < a.y);
  }).length;
  return Math.abs(b.x - a.x) + Math.abs(b.y - a.y) + (expansion - 1) * (rows + cols);
}

var regex = /^[.#]*$/;

module.exports = {
  day: 11,
  title: "Cosmic Expansion",
  solve1: solve1,
  solve2: solve2,
  answer1: 9522407,
  answer2: 544723432977,
  tests: [
    { input: "test.txt", answer1: 374 },
    { input: "test.txt", config: { expansion: 10 }, answer2: 1030 },
    { input: "test.txt", config: { expansion: 100 }, answer2: 8410 }
  ]
};
