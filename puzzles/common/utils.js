"use strict";

// not exported
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

function equals(value) {
  return function (other) {
    return other === value;
  };
}

function equalsMod(value, modulus) {
  return function (other) {
    return (other - value) % modulus === 0;
  };
}

function evaluate(object) {
  return function (key) {
    return object[key];
  };
}

function find(iterable, callback) {
  return iterable[findIndex(iterable, callback)];
}

function findIndex(iterable, callback) {
  for (var i = 0; i < iterable.length; i++) {
    if (callback(iterable[i])) {
      return i;
    }
  }
  return -1;
}

function findKey(object, callback) {
  return find(keys(object), function (key) {
    return callback(object[key]);
  });
}

function first(iterable) {
  return iterable[0];
}

function flat(array) {
  return Array.prototype.concat.apply([], array);
}

// expects a non-empty list of positive integers
function gcd() {
  var values = sort(args(arguments));
  while (values.length > 1) {
    var r = values.pop() % values[0];
    r && values.unshift(r);
  }
  return values[0];
}

function get(key) {
  return function (object) {
    return object[key];
  };
}

function has(key, value) {
  return function (object) {
    return object[key] === value;
  };
}

function identity(value) {
  return value;
}

function includes(iterable, value) {
  return iterable.indexOf(value) !== -1;
}

function isInteger(value) {
  return Math.round(value) === value;
}

function isRectangular(grid) {
  return grid.every(function (row) {
    return row.length === grid[0].length;
  });
}

function keys(object) {
  return Object.keys(object);
}

function last(iterable) {
  return iterable[iterable.length - 1];
}

// expects a non-empty list of positive integers
function lcm() {
  return args(arguments).reduce(function (x, y) {
    return x * (y / gcd(x, y));
  });
}

function map(object, callback) {
  return keys(object).reduce(function (mapped, key) {
    mapped[key] = callback(object[key]);
    return mapped;
  }, {});
}

// expects a global regex
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

function product(values) {
  return values.reduce(function (x, y) {
    return x * y;
  }, 1);
}

function range(length) {
  var array = new Array(length);
  for (var i = 0; i < length; i++) {
    array[i] = i;
  }
  return array;
}

function sort(array, callback) {
  return array.sort(function (a, b) {
    return callback ? callback(a) - callback(b) : a - b;
  });
}

function split(array, value) {
  var chunks = [];
  var start = 0;
  var end = array.indexOf(value);
  while (end !== -1) {
    chunks.push(array.slice(start, end));
    start = end + 1;
    end = array.indexOf(value, start);
  }
  chunks.push(array.slice(start));
  return chunks;
}

function sum(values) {
  return values.reduce(function (x, y) {
    return x + y;
  }, 0);
}

function unary(callback) {
  return function (value) {
    return callback(value);
  };
}

function unique(array) {
  return array.filter(function (value, index) {
    return array.indexOf(value) === index;
  });
}

module.exports = {
  constant: constant,
  difference: difference,
  equals: equals,
  equalsMod: equalsMod,
  evaluate: evaluate,
  find: find,
  findIndex: findIndex,
  findKey: findKey,
  first: first,
  flat: flat,
  gcd: gcd,
  get: get,
  has: has,
  identity: identity,
  includes: includes,
  isInteger: isInteger,
  isRectangular: isRectangular,
  keys: keys,
  last: last,
  lcm: lcm,
  map: map,
  matchAll: matchAll,
  max: max,
  min: min,
  parseInt: unary(parseInt),
  product: product,
  range: range,
  sort: sort,
  split: split,
  sum: sum,
  unary: unary,
  unique: unique
};
