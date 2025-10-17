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
  return _.min(locations.map(_.get("start")));
}

function parseSeeds(lines) {
  assert(lines.length === 1 && lines[0].match(/^seeds:(?: \d+)+$/));
  return lines[0].match(/\d+/g).map(_.parseInt);
}

function parseSeedRanges(lines) {
  assert(lines.length === 1 && lines[0].match(/^seeds:(?: \d+ \d+)+$/));
  var numbers = lines[0].match(/\d+/g).map(_.parseInt);
  var ranges = [];
  for (var i = 0; i < numbers.length; i += 2) {
    ranges.push({
      start: numbers[i],
      end: numbers[i] + numbers[i + 1]
    });
  }
  return ranges;
}

function parseMap(lines) {
  assert(lines.length >= 2 && lines[0].match(/^\w+-to-\w+ map:$/));
  var map = lines.slice(1).map(function (line) {
    assert(line.match(/^\d+ \d+ \d+$/));
    var numbers = line.match(/\d+/g).map(_.parseInt);
    return {
      start: numbers[1],
      end: numbers[1] + numbers[2],
      offset: numbers[0] - numbers[1]
    };
  });
  _.sort(map, _.get("start"));

  // insert offset 0 map ranges in the gaps
  for (var i = 1; i < map.length; i++) {
    assert(map[i - 1].end <= map[i].start);
    if (map[i - 1].end < map[i].start) {
      map.splice(i, 0, {
        start: map[i - 1].end,
        end: map[i].start,
        offset: 0
      });
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

module.exports = {
  day: 5,
  title: "If You Give A Seed A Fertilizer",
  solve1: solve1,
  solve2: solve2,
  tests: [{ test: 1, input: "test.txt", answer1: 35, answer2: 46 }],
  dirname: __dirname
};
