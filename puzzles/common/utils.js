"use strict";

function args(values) {
  if (values.length === 1 && Array.isArray(values[0])) {
    return values[0];
  }
  return Array.prototype.slice.apply(values);
}

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

function evaluate(object) {
  return function (key) {
    return object[key];
  };
}

function find(array, callback) {
  return array[findIndex(array, callback)];
}

function findIndex(array, callback) {
  for (var i = 0; i < array.length; i++) {
    if (callback(array[i])) {
      return i;
    }
  }
  return -1;
}

function first(iterable) {
  return iterable[0];
}

function flat(array) {
  return Array.prototype.concat.apply([], array);
}

function gcd() {
  var values = sort(args(arguments));
  while (values.length > 1) {
    var r = values.pop() % values[0];
    r && values.unshift(r);
  }
  return values[0];
}

function getProperty(key) {
  return function (object) {
    return object[key];
  };
}

function identity(value) {
  return value;
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

function keys(object) {
  return Object.keys(object);
}

function last(iterable) {
  return iterable[iterable.length - 1];
}

function lcm() {
  return args(arguments).reduce(function (x, y) {
    return (x * y) / gcd(x, y);
  });
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

function max() {
  return Math.max.apply(Math, args(arguments));
}

function min() {
  return Math.min.apply(Math, args(arguments));
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
  return array.sort(function (a, b) {
    return callback ? callback(a) - callback(b) : a - b;
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
  evaluate: evaluate,
  find: find,
  findIndex: findIndex,
  first: first,
  flat: flat,
  gcd: gcd,
  getProperty: getProperty,
  identity: identity,
  includes: includes,
  isEqual: isEqual,
  isInteger: isInteger,
  isRectangular: isRectangular,
  keys: keys,
  last: last,
  lcm: lcm,
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
