"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _winston = _interopRequireDefault(require("./winston"));

var _lodash = _interopRequireDefault(require("lodash"));

var _global = _interopRequireDefault(require("../service/global.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rsCode = {
  GET: {
    "100": "Success",
    "101": "Data not found",
    "102": "Data not validate"
  },
  POST: {
    "200": "Success",
    "201": "Data not found",
    "210": "Create success",
    "211": "Data not validate",
    "212": "Already data",
    "220": "Update success"
  },
  PUT: {
    "300": "Update success",
    "301": "Data is required",
    "302": "Data not validate",
    "303": "Data not found"
  },
  DELETE: {
    "600": "Delete success",
    "601": "Data not found"
  },
  ERROR: {
    "500": "Internal server error"
  }
};

function _default(err, req, res, next) {
  var global = new _global["default"]();
  var resultReturn = {
    'resultCode': '500',
    'resultMessage': rsCode.ERROR['500'],
    'resultData': []
  };

  if (err.length > 1) {
    resultReturn = global.resultMessage(err[1], resultReturn);
  }

  var msgErr = err.message ? err.message.toString().replace(/"/g, "") : err.length ? err[0] : err;

  if (!_lodash["default"].isEmpty(_lodash["default"].filter(msgErr, {
    'error': []
  }))) {
    resultReturn.resultData = msgErr;
    res.status(400).send(resultReturn);
  } else {
    _winston["default"].error(msgErr);

    resultReturn.resultData = msgErr;
    res.status(500).send(resultReturn);
  }
}