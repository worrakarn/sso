"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var Client = _interopRequireWildcard(require("../controller/sso.client.controller"));

var User = _interopRequireWildcard(require("../controller/sso.user.controller"));

var Oauth2 = _interopRequireWildcard(require("../controller/sso.oauth.controller"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post("/sso/save_client", Client.saveClientController);
router.get("/sso/view_client", Client.viewClientController);
router.post("/sso/save_user", User.saveUserController);
router.get("/sso/view_user", User.viewUserController);
router.all("/sso/token", Oauth2.obtainToken);
router.get("/sso/authenticate", Oauth2.authenticateRequest);
var _default = router;
exports["default"] = _default;