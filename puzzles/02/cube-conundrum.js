"use strict";

var assert = require("../common/assert");
var num = require("../common/numbers");
var obj = require("../common/objects");

function solve1(input) {
  var games = input.map(parseGame);
  var ids = games.filter(isPossible).map(obj.getProperty("id"));
  return num.sum(ids);
}

function solve2(input) {
  var games = input.map(parseGame);
  var powers = games.map(getPower);
  return num.sum(powers);
}

function parseGame(line) {
  assert(regex.test(line), "Each line should be formatted correctly.");
  return {
    id: num.parse(line.match(/\d+/)[0]),
    red: num.max((line.match(/\d+ red/g) || []).map(num.parse).concat(0)),
    green: num.max((line.match(/\d+ green/g) || []).map(num.parse).concat(0)),
    blue: num.max((line.match(/\d+ blue/g) || []).map(num.parse).concat(0))
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
  input: "cube-conundrum.txt",
  answer1: 2685,
  answer2: 83707,
  tests: [{ input: "test.txt", answer1: 8, answer2: 2286 }]
};
