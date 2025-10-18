"use strict";

var assert = require("../common/assert");
var _ = require("../common/utils");

function solve1(input) {
  var chunks = _.split(input, "");
  var seeds = parseSeeds(chunks[0]);
  var maps = chunks.slice(1).map(parseMap);
  var target = maps.reduce(mapItems, seeds);
  assert(target.category === "location");
  return _.min(target.items);
}

function solve2(input) {
  var chunks = _.split(input, "");
  var seeds = parseSeedRanges(chunks[0]);
  var maps = chunks.slice(1).map(parseMap);
  var target = maps.reduce(mapRanges, seeds);
  assert(target.category === "location");
  return _.min(target.ranges.map(_.get("start")));
}

function parseSeeds(lines) {
  assert(lines.length === 1 && lines[0].match(/^seeds:(?: \d+)+$/));
  return {
    category: "seed",
    items: lines[0].match(/\d+/g).map(_.parseInt)
  };
}

function parseSeedRanges(lines) {
  assert(lines.length === 1 && lines[0].match(/^seeds:(?: \d+ \d+)+$/));
  var numbers = lines[0].match(/\d+/g).map(_.parseInt);
  var ranges = _.range(numbers.length / 2).map(function (i) {
    return {
      start: numbers[2 * i],
      end: numbers[2 * i] + numbers[2 * i + 1]
    };
  });
  return {
    category: "seed",
    ranges: ranges
  };
}

function parseMap(lines) {
  assert(lines.length >= 2 && lines[0].match(/^\w+-to-\w+ map:$/));
  var words = lines[0].match(/\w+/g);
  return {
    source: words[0],
    destination: words[2],
    rules: parseRules(lines.slice(1))
  };
}

function parseRules(lines) {
  var rules = lines.map(function (line) {
    assert(line.match(/^\d+ \d+ \d+$/));
    var numbers = line.match(/\d+/g).map(_.parseInt);
    return {
      start: numbers[1],
      end: numbers[1] + numbers[2],
      offset: numbers[0] - numbers[1]
    };
  });
  _.sort(rules, _.get("start"));

  // insert offset 0 rules in the gaps
  for (var i = 1; i < rules.length; i++) {
    assert(rules[i - 1].end <= rules[i].start);
    if (rules[i - 1].end < rules[i].start) {
      rules.splice(i, 0, {
        start: rules[i - 1].end,
        end: rules[i].start,
        offset: 0
      });
    }
  }
  rules.unshift({ start: -Infinity, end: _.first(rules).start, offset: 0 });
  rules.push({ start: _.last(rules).end, end: Infinity, offset: 0 });

  return rules;
}

function mapItems(resource, map) {
  assert(resource.category === map.source);
  return {
    category: map.destination,
    items: resource.items.map(mapItem(map))
  };
}

function mapItem(map) {
  return function (item) {
    var rule = _.find(map.rules, function (r) {
      return item < r.end;
    });
    return item + rule.offset;
  };
}

function mapRanges(resource, map) {
  assert(resource.category === map.source);
  return {
    category: map.destination,
    ranges: _.flat(resource.ranges.map(mapRange(map)))
  };
}

function mapRange(map) {
  return function (range) {
    var rules = map.rules.filter(function (rule) {
      return range.start < rule.end && rule.start < range.end;
    });
    return rules.map(function (rule) {
      return {
        start: _.max(rule.start, range.start) + rule.offset,
        end: _.min(rule.end, range.end) + rule.offset
      };
    });
  };
}

module.exports = {
  day: 5,
  title: "If You Give A Seed A Fertilizer",
  solve1: solve1,
  solve2: solve2,
  tests: [{ test: 1, input: "test.txt", answer1: 35, answer2: 46 }],
  dirname: __dirname
};
