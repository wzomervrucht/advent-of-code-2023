"use strict";

function assert(assertion, message) {
  assertion || assert.fail(message);
}

assert.fail = function (message) {
  throw new Error("Invalid input" + (message ? ": " + message : "."));
};

module.exports = assert;
