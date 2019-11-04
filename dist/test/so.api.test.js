"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _www = _interopRequireDefault(require("../config/www"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Import the dependencies for testing
// Configure chai
_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe("Students", function () {
  describe("GET /", function () {
    // Test to get all students record
    xit("should get all students record", function (done) {
      done();
    });
  });
});