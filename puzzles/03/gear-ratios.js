"use strict";

var assert = require("../common/assert");
var _ = require("../common/utils");

function solve1(input) {
  assert(_.isRectangular(input));
  var numbers = _.flat(input.map(findNumbers));
  var symbols = _.flat(input.map(findSymbols));
  var partNumbers = numbers.filter(hasAdjacentSymbol(symbols)).map(_.getProperty("value"));
  return _.sum(partNumbers);
}

function solve2(input) {
  assert(_.isRectangular(input));
  var numbers = _.flat(input.map(findNumbers));
  var asterisks = _.flat(input.map(findAsterisks));
  var gearRatios = asterisks.map(getAdjacentNumbers(numbers)).map(getGearRatio);
  return _.sum(gearRatios);
}

function findNumbers(line, index) {
  var matches = _.matchAll(line, /\d+/g);
  return matches.map(function (match) {
    return {
      x: index,
      y: match.index,
      length: match[0].length,
      value: _.parse(match[0])
    };
  });
}

function findSymbols(line, index) {
  var matches = _.matchAll(line, /[^\d.]/g);
  return matches.map(function (match) {
    return { x: index, y: match.index };
  });
}

function findAsterisks(line, index) {
  var matches = _.matchAll(line, /\*/g);
  return matches.map(function (match) {
    return { x: index, y: match.index };
  });
}

function hasAdjacentSymbol(symbols) {
  return function (number) {
    return symbols.some(function (symbol) {
      return isAdjacent(number, symbol);
    });
  };
}

function getAdjacentNumbers(numbers) {
  return function (symbol) {
    return numbers.filter(function (number) {
      return isAdjacent(number, symbol);
    });
  };
}

function isAdjacent(number, symbol) {
  return Math.abs(symbol.x - number.x) <= 1 && symbol.y >= number.y - 1 && symbol.y <= number.y + number.length;
}

function getGearRatio(numbers) {
  return numbers.length === 2 ? numbers[0].value * numbers[1].value : 0;
}

module.exports = {
  day: 3,
  title: "Gear Ratios",
  solve1: solve1,
  solve2: solve2,
  tests: [{ test: 1, input: "test.txt", answer1: 4361, answer2: 467835 }],
  dirname: __dirname
};
