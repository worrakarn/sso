"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mongoose["default"].connect("mongodb+srv://admin:admin123456@sso-5sunc.mongodb.net/sso?retryWrites=true&w=majority", {
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