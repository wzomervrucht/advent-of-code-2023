"use strict";

function getProperty(key) {
  return function (obj) {
    return obj[key];
  };
}

module.exports = {
  getProperty: getProperty
};
