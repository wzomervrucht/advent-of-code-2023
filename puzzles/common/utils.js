"use strict";

function constant(value) {
  return function () {
    return value;
  };
}

function difference(array, values) {
  return array.filter(function (value) {
    return values.indexOf(value) === -1;
  });
}

function distinct(array) {
  return array.filter(function (value, index) {
    return array.indexOf(value) === index;
  });
}

function findIndex(array, callback) {
  for (var i = 0; i < array.length; i++) {
    if (callback(array[i])) return i;
  }
  return -1;
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

function isEqual(value) {
  return function (other) {
    return value === other;
  };
}

function isInteger(value) {
  return Math.round(value) === value;
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

function product(values) {
  return values.reduce(function (x, y) {
    return x * y;
  }, 1);
}

function sort(array, callback) {
  array.sort(function (a, b) {
    return callback(a) - callback(b);
  });
}

function split(array, value) {
  var chunks = [];
  var from = 0;
  var index = array.indexOf(value);
  while (index !== -1) {
    chunks.push(array.slice(from, index));
    from = index + 1;
    index = array.indexOf(value, from);
  }
  chunks.push(array.slice(from));
  return chunks;
}

function sum(values) {
  return values.reduce(function (x, y) {
    return x + y;
  }, 0);
}

function toArray(string) {
  return string.split("");
}

module.exports = {
  constant: constant,
  difference: difference,
  distinct: distinct,
  findIndex: findIndex,
  first: first,
  flat: flat,
  getProperty: getProperty,
  includes: includes,
  isEqual: isEqual,
  isInteger: isInteger,
  isRectangular: isRectangular,
  last: last,
  matchAll: matchAll,
  max: max,
  min: min,
  parse: parse,
  product: product,
  sort: sort,
  split: split,
  sum: sum,
  toArray: toArray
};
