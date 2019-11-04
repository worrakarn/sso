"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _container = _interopRequireDefault(require("./container"));

var _oauth2Server = _interopRequireDefault(require("oauth2-server"));

var _global = _interopRequireDefault(require("../service/global.service"));

var _ssoClient = _interopRequireDefault(require("../service/sso.client.service"));

var _ssoOauth = _interopRequireDefault(require("../service/sso.oauth.service"));

var _ssoUser = _interopRequireDefault(require("../service/sso.user.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var oauth2 = new _ssoOauth["default"](new _global["default"]());
var oauth = new _oauth2Server["default"]({
  model: oauth2,
  accessTokenLifetime: 60 * 60,
  allowBearerTokensInQueryString: true
});
var container = new _container["default"]();
container.register("global", _global["default"]);
container.register("sso.oauth", oauth);
container.register("sso.client", _ssoClient["default"], ["global", "sso.oauth"]);
container.register("sso.user", _ssoUser["default"], ["global", "sso.oauth"]);
var _default = container;
exports["default"] = _default;