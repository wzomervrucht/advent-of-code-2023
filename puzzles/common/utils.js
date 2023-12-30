"use strict";

function constant(value) {
  return function () {
    return value;
  };
}

function first(iterable) {
  return iterable[0];
}

function flat(array) {
  return Array.prototype.concat.apply([], array);
}

function getProperty(key) {
  return function (object) {
    return object[key];
  };
}

function includes(iterable, value) {
  return iterable.indexOf(value) !== -1;
}

function isRectangular(array) {
  return array.every(function (row) {
    return row.length === array[0].length;
  });
}

function last(iterable) {
  return iterable[iterable.length - 1];
}

function matchAll(string, regex) {
  var matches = [];
  var match = regex.exec(string);
  while (match) {
    matches.push(match);
    match = regex.exec(string);
  }
  return matches;
}

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
  constant: constant,
  first: first,
  flat: flat,
  getProperty: getProperty,
  includes: includes,
  isRectangular: isRectangular,
  last: last,
  matchAll: matchAll,
  max: max,
  min: min,
  parse: parse,
  sum: sum
};
