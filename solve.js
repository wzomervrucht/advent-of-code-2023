"use strict";

var runner = require("./puzzles/runner");

(function () {
  try {
    runner.solve();
  } catch (error) {
    console.log("Error: " + error.message);
    process.exit(1);
  }
})();
