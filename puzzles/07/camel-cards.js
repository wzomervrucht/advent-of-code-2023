"use strict";

var assert = require("../common/assert");
var _ = require("../common/utils");

function solve1(input) {
  var hands = input.map(parseHand);
  sortHands(hands, false);
  var winnings = hands.map(getWinnings);
  return _.sum(winnings);
}

function solve2(input) {
  var hands = input.map(parseHand);
  sortHands(hands, true);
  var winnings = hands.map(getWinnings);
  return _.sum(winnings);
}

function parseHand(line) {
  assert(regex.test(line));
  return {
    cards: _.toArray(line.slice(0, 5)),
    bid: _.parse(line.slice(6))
  };
}

function sortHands(hands, joker) {
  hands.forEach(function (hand) {
    hand.type = getType(hand.cards, joker);
    hand.strength = getStrength(hand.cards, joker);
  });
  hands.sort(function (a, b) {
    return a.type - b.type || a.strength - b.strength;
  });
}

function getType(cards, joker) {
  var jokers = joker ? cards.filter(_.isEqual("J")).length : 0;
  var others = joker ? _.difference(cards, ["J"]) : cards;
  var counts = _.distinct(others).map(function (card) {
    return others.filter(_.isEqual(card)).length;
  });
  switch (_.max(counts.concat(0)) + jokers) {
    case 5:
      return 6; // five of a kind
    case 4:
      return 5; // four of a kind
    case 3:
      return counts.length === 2 ? 4 : 3; // full house, three of a kind
    case 2:
      return counts.length === 3 ? 2 : 1; // two pair, one pair
    default:
      return 0; // high card
  }
}

function getStrength(cards, joker) {
  var hex = cards.map(function (card) {
    switch (card) {
      case "A":
        return "E";
      case "K":
        return "D";
      case "Q":
        return "C";
      case "J":
        return joker ? "1" : "B";
      case "T":
        return "A";
      default:
        return card;
    }
  });
  return parseInt(hex.join(""), 16);
}

function getWinnings(hand, index) {
  return hand.bid * (index + 1);
}

var regex = /^[2-9TJQKA]{5} \d+$/;

module.exports = {
  day: 7,
  title: "Camel Cards",
  solve1: solve1,
  solve2: solve2,
  tests: [{ input: "test.txt", answer1: 6440, answer2: 5905 }]
};
