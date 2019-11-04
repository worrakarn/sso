"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _appRootPath = _interopRequireDefault(require("app-root-path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _provider = _interopRequireDefault(require("./config/provider.service"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _yamljs = _interopRequireDefault(require("yamljs"));

var _error = _interopRequireDefault(require("./config/error"));

var _indexs = _interopRequireDefault(require("./routes/indexs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

var swaggerDocument = _yamljs["default"].load("".concat(_appRootPath["default"], "/src/public/swagger.yaml"));

app.use((0, _helmet["default"])());
if ((process.env.NODE_ENV || '').trim() !== 'production') app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.set('context', _provider["default"]);
app.use('/1.0.0/api-docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(swaggerDocument));
app.use('/1.0.0', _indexs["default"]);
app.use(_error["default"]);
var _default = app;
exports["default"] = _default;