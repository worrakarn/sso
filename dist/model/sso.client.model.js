"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.joiCreateClient = exports.ClientModel = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _db = _interopRequireDefault(require("../config/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _db["default"].Schema;
var ClientSchema = new Schema({
  id: {
    type: String
  },
  clientId: {
    type: String
  },
  clientSecret: {
    type: String
  },
  clientName: {
    type: String
  },
  grants: {
    type: Array
  },
  redirectUris: {
    type: Array
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

var ClientModel = _db["default"].model("client", ClientSchema);

exports.ClientModel = ClientModel;

var joiCreateClient = _joi["default"].object({
  clientId: _joi["default"].string().required().label("clientId"),
  clientSecret: _joi["default"].string().required().label("clientSecret"),
  grants: _joi["default"].array().items(_joi["default"].string()).required().label("grants"),
  redirectUris: _joi["default"].array().items(_joi["default"].string()).required().label("redirectUris")
});

exports.joiCreateClient = joiCreateClient;