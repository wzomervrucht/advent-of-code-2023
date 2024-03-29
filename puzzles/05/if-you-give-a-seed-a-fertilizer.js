"use strict";

var assert = require("../common/assert");
var _ = require("../common/utils");

function solve1(input) {
  var chunks = _.split(input, "");
  var seeds = parseSeeds(chunks[0]);
  var maps = chunks.slice(1).map(parseMap);
  var locations = maps.reduce(mapItems, seeds);
  return _.min(locations);
}

function solve2(input) {
  var chunks = _.split(input, "");
  var seeds = parseSeedRanges(chunks[0]);
  var maps = chunks.slice(1).map(parseMap);
  var locations = maps.reduce(mapRanges, seeds);
  return _.min(locations.map(_.getProperty("start")));
}

function parseSeeds(lines) {
  assert(lines.length === 1 && regex0.test(lines[0]));
  return lines[0].match(/\d+/g).map(_.parse);
}

function parseSeedRanges(lines) {
  assert(lines.length === 1 && regex0.test(lines[0]));
  var numbers = lines[0].match(/\d+/g).map(_.parse);
  var ranges = [];
  for (var i = 0; i < numbers.length; i += 2) {
    ranges.push({ start: numbers[i], end: numbers[i] + numbers[i + 1] });
  }
  return ranges;
}

function parseMap(lines) {
  assert(lines.length >= 2 && regex1.test(lines[0]));
  var map = lines.slice(1).map(function (line) {
    assert(regex2.test(line));
    var numbers = line.match(/\d+/g).map(_.parse);
    return {
      start: numbers[1],
      end: numbers[1] + numbers[2],
      offset: numbers[0] - numbers[1]
    };
  });
  _.sort(map, _.getProperty("start"));

  // insert offset 0 map ranges in the gaps
  for (var i = 1; i < map.length; i++) {
    assert(map[i - 1].end <= map[i].start);
    if (map[i - 1].end < map[i].start) {
      map.splice(i, 0, { start: map[i - 1].end, end: map[i].start, offset: 0 });
    }
  }
  map.unshift({ start: -Infinity, end: _.first(map).start, offset: 0 });
  map.push({ start: _.last(map).end, end: Infinity, offset: 0 });

  return map;
}

function mapItems(items, map) {
  return items.map(function (item) {
    var i = _.findIndex(map, function (m) {
      return item < m.end;
    });
    return item + map[i].offset;
  });
}

function mapRanges(ranges, map) {
  var mappedRanges = [];
  ranges.forEach(function (range) {
    var i = _.findIndex(map, function (m) {
      return range.start < m.end;
    });
    while (map[i] && map[i].start < range.end) {
      mappedRanges.push({
        start: _.max(map[i].start, range.start) + map[i].offset,
        end: _.min(map[i].end, range.end) + map[i].offset
      });
      i++;
    }
  });
  return mappedRanges;
}

var regex0 = /^seeds:(?: \d+ \d+)+$/;
var regex1 = /^\w+-to-\w+ map:$/;
var regex2 = /^\d+ \d+ \d+$/;

module.exports = {
  day: 5,
  title: "If You Give A Seed A Fertilizer",
  solve1: solve1,
  solve2: solve2,
  answer1: 88151870,
  answer2: 2008785,
  tests: [{ input: "test.txt", answer1: 35, answer2: 46 }]
};
