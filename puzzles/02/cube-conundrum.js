"use strict";

var assert = require("../common/assert");
var _ = require("../common/utils");

function solve1(input) {
  var games = input.map(parseGame);
  var ids = games.filter(isPossible).map(_.get("id"));
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
    id: parseInt(line.match(/\d+/)[0]),
    red: _.max((line.match(/\d+(?= red)/g) || ["0"]).map(_.parseInt)),
    green: _.max((line.match(/\d+(?= green)/g) || ["0"]).map(_.parseInt)),
    blue: _.max((line.match(/\d+(?= blue)/g) || ["0"]).map(_.parseInt))
  };
}

function isPossible(game) {
  return game.red <= 12 && game.green <= 13 && game.blue <= 14;
}

function getPower(game) {
  return game.red * game.green * game.blue;
}

var regex = /^Game \d+:(?: \d+ (red|green|blue)(?![^;]*\1)(?:[,;](?=.)|$))+$/;

module.exports = {
  day: 2,
  title: "Cube Conundrum",
  solve1: solve1,
  solve2: solve2,
  tests: [{ test: 1, input: "test.txt", answer1: 8, answer2: 2286 }],
  dirname: __dirname
};
