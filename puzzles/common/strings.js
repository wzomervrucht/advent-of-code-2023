"use strict";

function first(str) {
  return str[0];
}

function includes(str, substr) {
  return str.indexOf(substr) !== -1;
}

function last(str) {
  return str[str.length - 1];
}

module.exports = {
  first: first,
  includes: includes,
  last: last
};
