"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mongoose["default"].connect("mongodb://localhost:27017/sso?retryWrites=false", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

_mongoose["default"].connection.once("open", function () {
  console.log("Good to go");
}).on("error", function (error) {
  return console.warn("Warning", error);
});

var _default = _mongoose["default"];
exports["default"] = _default;