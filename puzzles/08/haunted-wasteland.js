"use strict";

var assert = require("../common/assert");
var assume = require("../common/assume");
var _ = require("../common/utils");

function solve1(input) {
  assert(regex0.test(input[0]) && input[1] === "");
  var instructions = input[0];
  var nodes = parseNodes(input.slice(2));
  assert(nodes["AAA"]);
  var path = navigate(nodes, instructions, "AAA", "ZZZ");
  assert(path.node === "ZZZ");
  return path.steps;
}

function solve2(input) {
  assert(regex0.test(input[0]) && input[1] === "");
  var instructions = input[0];
  var nodes = parseNodes(input.slice(2));
  var startNodes = _.keys(nodes).filter(isStartNode);
  var endNodes = _.keys(nodes).filter(isEndNode);
  assert(startNodes.length);
  var cycles = startNodes.map(function (startNode) {
    var path = navigate(nodes, instructions, startNode);
    return findCycle(path, endNodes);
  });
  return _.lcm(cycles);
}

function parseNodes(lines) {
  return lines.reduce(function (nodes, line) {
    assert(regex1.test(line));
    nodes[line.slice(0, 3)] = { L: line.slice(7, 10), R: line.slice(12, 15) };
    return nodes;
  }, {});
}

function navigate(nodes, instructions, startNode, endNode) {
  var visits = _.keys(nodes).reduce(function (object, key) {
    object[key] = [];
    return object;
  }, {});
  var node = startNode;
  var steps = 0;
  var cycle;
  while (node !== endNode && cycle === undefined) {
    visits[node].push(steps);
    node = nodes[node][instructions[steps++ % instructions.length]];
    assert(nodes[node]);
    cycle = _.find(visits[node], isEqualModulo(steps, instructions.length));
  }
  return { node: node, steps: steps, cycle: cycle, visits: visits };
}

function isEqualModulo(value, modulus) {
  return function (other) {
    return (value - other) % modulus === 0;
  };
}

function isStartNode(node) {
  return node[2] === "A";
}

function isEndNode(node) {
  return node[2] === "Z";
}

function findCycle(path, endNodes) {
  // step numbers at which an end node is reached
  var ends = _.sort(_.flat(endNodes.map(_.evaluate(path.visits))));
  assert(ends.length);
  // apparently, this occurs at every multiple of ends[0] steps
  assume(ends.length === 1 || (ends.length === 2 && ends[1] === 2 * ends[0]));
  assume(_.first(ends) >= path.cycle && _.last(ends) === path.steps - path.cycle);
  return ends[0];
}

var regex0 = /^[LR]+$/;
var regex1 = /^\w{3} = \(\w{3}, \w{3}\)$/;

module.exports = {
  day: 8,
  title: "Haunted Wasteland",
  solve1: solve1,
  solve2: solve2,
  answer1: 20569,
  answer2: 21366921060721,
  tests: [
    { input: "test1.txt", answer1: 2 },
    { input: "test2.txt", answer1: 6 },
    { input: "test3.txt", answer2: 6 }
  ]
};
