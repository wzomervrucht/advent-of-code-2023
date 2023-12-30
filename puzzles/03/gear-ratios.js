"use strict";

var assert = require("../common/assert");
var utils = require("../common/utils");

function solve1(input) {
  assert(utils.isRectangular(input));
  var numbers = utils.flat(input.map(findNumbers));
  var symbols = utils.flat(input.map(findSymbols));
  var partNumbers = numbers.filter(hasAdjacentSymbol(symbols)).map(utils.getProperty("value"));
  return utils.sum(partNumbers);
}

function solve2(input) {
  assert(utils.isRectangular(input));
  var numbers = utils.flat(input.map(findNumbers));
  var asterisks = utils.flat(input.map(findAsterisks));
  var gearRatios = asterisks.map(getAdjacentNumbers(numbers)).map(getGearRatio);
  return utils.sum(gearRatios);
}

function findNumbers(line, x) {
  var matches = utils.matchAll(line, /\d+/g);
  return matches.map(function (match) {
    return {
      x: x,
      y: match.index,
      length: match[0].length,
      value: utils.parse(match[0])
    };
  });
}

function findSymbols(line, x) {
  var matches = utils.matchAll(line, /[^\d.]/g);
  return matches.map(function (match) {
    return { x: x, y: match.index };
  });
}

function findAsterisks(line, x) {
  var matches = utils.matchAll(line, /\*/g);
  return matches.map(function (match) {
    return { x: x, y: match.index };
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
  input: "gear-ratios.txt",
  answer1: 544433,
  answer2: 76314915,
  tests: [{ input: "test.txt", answer1: 4361, answer2: 467835 }]
};
