"use strict";

function parse(value) {
  return parseInt(value);
}

function sum(values) {
  return values.reduce(function (x, y) {
    return x + y;
  }, 0);
}

module.exports = {
  parse: parse,
  sum: sum
};
