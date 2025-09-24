"use strict";

var assert = require("../common/assert");
var _ = require("../common/utils");

function solve1(input) {
  var cards = input.map(parseCard);
  var matches = cards.map(countMatches);
  var points = matches.map(getPoints);
  return _.sum(points);
}

function solve2(input) {
  var cards = input.map(parseCard);
  var matches = cards.map(countMatches);
  var copies = cards.map(_.constant(1));
  for (var i = 0; i < cards.length; i++) {
    assert(i + matches[i] < cards.length);
    for (var j = i + 1; j <= i + matches[i]; j++) {
      copies[j] += copies[i];
    }
  }
  return _.sum(copies);
}

function parseCard(line) {
  assert(regex.test(line));
  var i = line.indexOf(":");
  var j = line.indexOf("|");
  return {
    winning: line.slice(i, j).match(/\d+/g).map(_.parse),
    numbers: line.slice(j).match(/\d+/g).map(_.parse)
  };
}

function countMatches(card) {
  return card.numbers.filter(function (number) {
    return _.includes(card.winning, number);
  }).length;
}

function getPoints(matches) {
  return matches ? Math.pow(2, matches - 1) : 0;
}

var regex = /^Card +\d+:(?: +\d+)+ \|(?: +\d+)+$/;

module.exports = {
  day: 4,
  title: "Scratchcards",
  solve1: solve1,
  solve2: solve2,
  tests: [{ test: 1, input: "test.txt", answer1: 13, answer2: 30 }],
  dirname: __dirname
};
