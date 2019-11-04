"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _ssoClient = require("../model/sso.client.model");

var _ssoUser = require("../model/sso.user.model");

var _ssoOauth = require("../model/sso.oauth.model");

var _inspector = require("inspector");

var _md = _interopRequireDefault(require("md5"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Oauth2 =
/*#__PURE__*/
function () {
  function Oauth2(Fn) {
    _classCallCheck(this, Oauth2);

    this.Fn = Fn;
  }

  _createClass(Oauth2, [{
    key: "getAccessToken",
    value: function () {
      var _getAccessToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(token) {
        var tokens;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _ssoOauth.TokenModel.findOne().where({
                  accessToken: token
                }).exec();

              case 2:
                tokens = _context.sent;
                if (tokens.flagCredential && tokens) tokens.user = {};
                return _context.abrupt("return", tokens);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getAccessToken(_x) {
        return _getAccessToken.apply(this, arguments);
      }

      return getAccessToken;
    }()
  }, {
    key: "getClient",
    value: function () {
      var _getClient = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(clientId, clientSecret) {
        var clients;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                clients = [];

                if (!clientSecret) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 4;
                return _ssoClient.ClientModel.findOne().and([{
                  clientId: clientId
                }, {
                  clientSecret: clientSecret
                }]).exec();

              case 4:
                clients = _context2.sent;
                _context2.next = 10;
                break;

              case 7:
                _context2.next = 9;
                return _ssoClient.ClientModel.findOne().where({
                  clientId: clientId
                }).exec();

              case 9:
                clients = _context2.sent;

              case 10:
                return _context2.abrupt("return", clients);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getClient(_x2, _x3) {
        return _getClient.apply(this, arguments);
      }

      return getClient;
    }()
  }, {
    key: "saveToken",
    value: function () {
      var _saveToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(token, client, user) {
        var Token, condition, session;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                token.client = {
                  id: client.clientId
                };
                _lodash["default"].isObject(user) ? token.user = {
                  username: user.username
                } : token.user = {};
                _lodash["default"].isObject(user) ? token.flagCredential = false : token.flagCredential = true;
                Token = new _ssoOauth.TokenModel(token);
                condition = token.flagCredential ? [{
                  client: {
                    id: client.clientId
                  }
                }, {
                  flagCredential: token.flagCredential
                }] : [{
                  client: {
                    id: client.clientId
                  }
                }, {
                  flagCredential: token.flagCredential
                }, {
                  user: {
                    username: user.username
                  }
                }];
                session = null;
                _context5.next = 8;
                return _ssoOauth.TokenModel.startSession().then(
                /*#__PURE__*/
                function () {
                  var _ref = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee3(_session) {
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            session = _session;
                            session.startTransaction();
                            _context3.next = 4;
                            return _ssoOauth.TokenModel.deleteMany().and(condition);

                          case 4:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function (_x7) {
                    return _ref.apply(this, arguments);
                  };
                }()).then(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee4() {
                  return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _context4.next = 2;
                          return Token.save();

                        case 2:
                          return _context4.abrupt("return", _context4.sent);

                        case 3:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4);
                }))).then(function () {
                  return session.commitTransaction();
                })["catch"](function (error) {
                  session.abortTransaction();
                  throw error;
                });

              case 8:
                return _context5.abrupt("return", token);

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function saveToken(_x4, _x5, _x6) {
        return _saveToken.apply(this, arguments);
      }

      return saveToken;
    }()
  }, {
    key: "getUser",
    value: function () {
      var _getUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(username, password) {
        var users;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                password = (0, _md["default"])(password);
                _context6.next = 3;
                return _ssoUser.UserModel.findOne().and([{
                  username: username
                }, {
                  password: password
                }]).exec();

              case 3:
                users = _context6.sent;
                return _context6.abrupt("return", users);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function getUser(_x8, _x9) {
        return _getUser.apply(this, arguments);
      }

      return getUser;
    }()
  }, {
    key: "getUserFromClient",
    value: function () {
      var _getUserFromClient = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(client) {
        var clients;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _ssoClient.ClientModel.findOne().and([{
                  clientId: client.clientId
                }, {
                  clientSecret: client.clientSecret
                }]).exec();

              case 2:
                clients = _context7.sent;
                return _context7.abrupt("return", !!clients);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function getUserFromClient(_x10) {
        return _getUserFromClient.apply(this, arguments);
      }

      return getUserFromClient;
    }()
  }, {
    key: "getRefreshToken",
    value: function () {
      var _getRefreshToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(refreshToken) {
        var tokens;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _ssoOauth.TokenModel.findOne().where({
                  refreshToken: refreshToken
                }).exec();

              case 2:
                tokens = _context8.sent;
                return _context8.abrupt("return", tokens);

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function getRefreshToken(_x11) {
        return _getRefreshToken.apply(this, arguments);
      }

      return getRefreshToken;
    }()
  }, {
    key: "revokeToken",
    value: function () {
      var _revokeToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(token) {
        var tokens;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return _ssoOauth.TokenModel.deleteOne().where({
                  refreshToken: token.refreshToken
                }).exec();

              case 2:
                tokens = _context9.sent;
                return _context9.abrupt("return", !!tokens.n);

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function revokeToken(_x12) {
        return _revokeToken.apply(this, arguments);
      }

      return revokeToken;
    }()
  }]);

  return Oauth2;
}();

exports["default"] = Oauth2;