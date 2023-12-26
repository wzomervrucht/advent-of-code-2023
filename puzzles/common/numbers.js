"use strict";

function max(values) {
  return Math.max.apply(Math, values);
}

function min(values) {
  return Math.min.apply(Math, values);
}

function parse(value) {
  return parseInt(value);
}

function sum(values) {
  return values.reduce(function (x, y) {
    return x + y;
  }, 0);
}

module.exports = {
  max: max,
  min: min,
  parse: parse,
  sum: sum
};
