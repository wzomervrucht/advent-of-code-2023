"use strict";

function assume(assumption, message) {
  !assumption && assume.fail(message);
}

assume.fail = function (message) {
  throw new Error("Invalid assumption" + (message ? ": " + message : "."));
};

module.exports = assume;
