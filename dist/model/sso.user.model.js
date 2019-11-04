"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.joiCreateUser = exports.UserModel = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _db = _interopRequireDefault(require("../config/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _db["default"].Schema;
var UserSchema = new Schema({
  email: {
    type: String,
    "default": ""
  },
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  password: {
    type: String
  },
  username: {
    type: String
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  createdAtId: {
    type: Number
  },
  updatedAt: {
    type: Date,
    "default": Date.now
  },
  updatedAtId: {
    type: Number
  }
}, {
  versionKey: false
});

var UserModel = _db["default"].model("users", UserSchema);

exports.UserModel = UserModel;

var joiCreateUser = _joi["default"].object({
  email: _joi["default"].string().label("clientId"),
  firstname: _joi["default"].string().required().label("clientSecret"),
  lastname: _joi["default"].string().required().label("clientSecret"),
  password: _joi["default"].string().required().label("clientSecret"),
  username: _joi["default"].string().required().label("clientSecret")
});

exports.joiCreateUser = joiCreateUser;