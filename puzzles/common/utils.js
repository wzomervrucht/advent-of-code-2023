"use strict";

function first(iterable) {
  return iterable[0];
}

function getProperty(key) {
  return function (object) {
    return object[key];
  };
}

function includes(iterable, value) {
  return iterable.indexOf(value) !== -1;
}

function last(iterable) {
  return iterable[iterable.length - 1];
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
  first: first,
  getProperty: getProperty,
  includes: includes,
  last: last,
  max: max,
  min: min,
  parse: parse,
  sum: sum
};
