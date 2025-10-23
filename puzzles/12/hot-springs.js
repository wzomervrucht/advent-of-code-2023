"use strict";

var assert = require("../common/assert");
var _ = require("../common/utils");

function solve1(input) {
  var records = input.map(parseRecord);
  var counts = records.map(countArrangements);
  return _.sum(counts);
}

function solve2(input) {
  var records = input.map(parseRecord).map(unfold);
  var counts = records.map(countArrangements);
  return _.sum(counts);
}

function parseRecord(line) {
  assert(line.match(/^[.#?]+ \d+(?:,\d+)*$/));
  return {
    springs: line.slice(0, line.indexOf(" ")),
    groups: line.match(/\d+/g).map(_.parseInt)
  };
}

function unfold(record) {
  return {
    springs: _.range(5).map(_.constant(record.springs)).join("?"),
    groups: _.flat(_.range(5).map(_.constant(record.groups)))
  };
}

function countArrangements(record) {
  return countRecord(record.springs, record.groups, {});
}

function countRecord(springs, groups, counts) {
  if (!groups.length) {
    return _.includes(springs, "#") ? 0 : 1;
  }
  var record = springs + " " + groups.join();
  if (record in counts) {
    return counts[record];
  }
  var group = groups[0];
  var count = 0;
  for (var i = 0; i <= springs.length - group; i++) {
    if (!_.includes(springs.slice(i, i + group), ".") && springs[i + group] !== "#") {
      count += countRecord(springs.slice(i + group + 1), groups.slice(1), counts);
    }
    if (springs[i] === "#") {
      break;
    }
  }
  counts[record] = count;
  return count;
}

module.exports = {
  day: 12,
  title: "Hot Springs",
  solve1: solve1,
  solve2: solve2,
  tests: [{ test: 1, input: "test.txt", answer1: 21, answer2: 525152 }],
  dirname: __dirname
};
