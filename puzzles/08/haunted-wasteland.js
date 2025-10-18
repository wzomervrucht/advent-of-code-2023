"use strict";

var assert = require("../common/assert");
var assume = require("../common/assume");
var _ = require("../common/utils");

function solve1(input) {
  validate(input.slice(0, 2));
  var instructions = input[0];
  var nodes = parseNodes(input.slice(2));
  assert("AAA" in nodes);
  var path = findPath(nodes, instructions, "AAA", "ZZZ");
  assert(path.node === "ZZZ");
  return path.steps;
}

function solve2(input) {
  validate(input.slice(0, 2));
  var instructions = input[0];
  var nodes = parseNodes(input.slice(2));
  var startNodes = _.keys(nodes).filter(isStartNode);
  var endNodes = _.keys(nodes).filter(isEndNode);
  assert(startNodes.length);
  var cycles = startNodes.map(function (startNode) {
    var path = findPath(nodes, instructions, startNode);
    return findCycle(path, endNodes);
  });
  return _.lcm(cycles);
}

function validate(lines) {
  assert(lines.length === 2);
  assert(lines[0].match(/^[LR]+$/) && lines[1] === "");
}

function parseNodes(lines) {
  return lines.reduce(function (nodes, line) {
    assert(line.match(/^\w{3} = \(\w{3}, \w{3}\)$/));
    nodes[line.slice(0, 3)] = {
      L: line.slice(7, 10),
      R: line.slice(12, 15)
    };
    return nodes;
  }, {});
}

function isStartNode(node) {
  return node[2] === "A";
}

function isEndNode(node) {
  return node[2] === "Z";
}

function findPath(nodes, instructions, startNode, endNode) {
  var visits = _.map(nodes, function () {
    return [];
  });
  var node = startNode;
  var steps = 0;
  var loop;
  while (node !== endNode && loop === undefined) {
    visits[node].push(steps);
    node = nodes[node][instructions[steps++ % instructions.length]];
    assert(node in nodes);
    loop = _.find(visits[node], _.equalsMod(steps, instructions.length));
  }
  return { node: node, steps: steps, loop: loop, visits: visits };
}

function findCycle(path, endNodes) {
  var loop = { start: path.loop, length: path.steps - path.loop };
  // step numbers at which an end node is reached
  var ends = _.sort(_.flat(endNodes.map(_.evaluate(path.visits))));
  assert(ends.length);
  // apparently, this occurs at every multiple of ends[0] steps
  assume(ends.length === 1 || (ends.length === 2 && ends[1] === 2 * ends[0]));
  assume(_.first(ends) >= loop.start && _.last(ends) === loop.length);
  return ends[0];
}

module.exports = {
  day: 8,
  title: "Haunted Wasteland",
  solve1: solve1,
  solve2: solve2,
  tests: [
    { test: 1, input: "test1.txt", answer1: 2 },
    { test: 2, input: "test2.txt", answer1: 6 },
    { test: 3, input: "test3.txt", answer2: 6 }
  ],
  dirname: __dirname
};
