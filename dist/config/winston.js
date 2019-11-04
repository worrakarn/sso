"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _appRootPath = _interopRequireDefault(require("app-root-path"));

var _winston = _interopRequireDefault(require("winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _winston$format = _winston["default"].format,
    combine = _winston$format.combine,
    timestamp = _winston$format.timestamp,
    json = _winston$format.json;
var options = {
  fileErr: {
    level: 'error',
    filename: "".concat(_appRootPath["default"], "/logs/error.log"),
    handleExceptions: false,
    json: true,
    maxsize: 5242880,
    // 5MB
    maxFiles: 5,
    colorize: false
  },
  unCaughtErr: {
    level: 'error',
    filename: "".concat(_appRootPath["default"], "/logs/uncaught.log"),
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'error',
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

var logger = _winston["default"].createLogger({
  transports: [new _winston["default"].transports.File(options.fileErr)],
  exceptionHandlers: [new _winston["default"].transports.File(options.unCaughtErr)],
  exitOnError: true,
  // do exit on handled exceptions
  format: combine(timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }), json())
});

if ((process.env.NODE_ENV || '').trim() !== 'production') {
  logger.add(new _winston["default"].transports.Console(options.console));
}

var _default = logger;
exports["default"] = _default;