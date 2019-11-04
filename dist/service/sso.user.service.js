"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _ssoUser = require("../model/sso.user.model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User =
/*#__PURE__*/
function () {
  function User(Fn, auth) {
    _classCallCheck(this, User);

    this.Fn = Fn;
    this.auth = auth;
  }

  _createClass(User, [{
    key: "validateSaveUser",
    value: function () {
      var _validateSaveUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(dataReq) {
        var schema, vali;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                schema = _ssoUser.joiCreateUser;
                vali = this.Fn.validate(dataReq, schema);
                return _context.abrupt("return", vali);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function validateSaveUser(_x) {
        return _validateSaveUser.apply(this, arguments);
      }

      return validateSaveUser;
    }()
  }, {
    key: "saveUser",
    value: function () {
      var _saveUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(dataReq) {
        var user;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                user = new _ssoUser.UserModel(dataReq);
                _context2.next = 3;
                return user.save();

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function saveUser(_x2) {
        return _saveUser.apply(this, arguments);
      }

      return saveUser;
    }()
  }, {
    key: "viewUser",
    value: function () {
      var _viewUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var users;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _ssoUser.UserModel.find().select("-_id email firstname lastname username").exec();

              case 2:
                users = _context3.sent;
                return _context3.abrupt("return", users);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function viewUser() {
        return _viewUser.apply(this, arguments);
      }

      return viewUser;
    }()
  }]);

  return User;
}();

exports["default"] = User;