"use strict";

var assert = require("../common/assert");
var _ = require("../common/utils");

function solve1(input) {
  var games = input.map(parseGame);
  var ids = games.filter(isPossible).map(_.getProperty("id"));
  return _.sum(ids);
}

function solve2(input) {
  var games = input.map(parseGame);
  var powers = games.map(getPower);
  return _.sum(powers);
}

function parseGame(line) {
  assert(regex.test(line));
  return {
    id: _.parse(line.match(/\d+/)[0]),
    red: _.max((line.match(/\d+ red/g) || []).map(_.parse).concat(0)),
    green: _.max((line.match(/\d+ green/g) || []).map(_.parse).concat(0)),
    blue: _.max((line.match(/\d+ blue/g) || []).map(_.parse).concat(0))
  };
}

function isPossible(game) {
  return game.red <= 12 && game.green <= 13 && game.blue <= 14;
}

function getPower(game) {
  return game.red * game.green * game.blue;
}

var regex = /^Game \d+: \d+ (?:red|green|blue)(?:[,;] \d+ (?:red|green|blue))*$/;

module.exports = {
  day: 2,
  title: "Cube Conundrum",
  solve1: solve1,
  solve2: solve2,
  answer1: 2685,
  answer2: 83707,
  tests: [{ input: "test.txt", answer1: 8, answer2: 2286 }]
};
