"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokenModel = void 0;

var _db = _interopRequireDefault(require("../config/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _db["default"].Schema;
var TokenSchema = new Schema({
  accessToken: {
    type: String
  },
  accessTokenExpiresAt: {
    type: Date
  },
  client: {
    type: Object
  },
  clientId: {
    type: String
  },
  refreshToken: {
    type: String
  },
  refreshTokenExpiresAt: {
    type: Date
  },
  user: {
    type: Object
  },
  userId: {
    type: String
  },
  scope: {
    type: Array
  },
  flagCredential: {
    type: Boolean
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

var TokenModel = _db["default"].model("tokens", TokenSchema);

exports.TokenModel = TokenModel;