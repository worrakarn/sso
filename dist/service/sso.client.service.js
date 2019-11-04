"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _ssoClient = require("../model/sso.client.model");

var _md = _interopRequireDefault(require("md5"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Client =
/*#__PURE__*/
function () {
  function Client(Fn, auth) {
    _classCallCheck(this, Client);

    this.Fn = Fn;
    this.auth = auth;
  }

  _createClass(Client, [{
    key: "validateSaveClient",
    value: function () {
      var _validateSaveClient = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(dataReq) {
        var schema, vali;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                schema = _ssoClient.joiCreateClient;
                vali = this.Fn.validate(dataReq, schema);
                return _context.abrupt("return", vali);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function validateSaveClient(_x) {
        return _validateSaveClient.apply(this, arguments);
      }

      return validateSaveClient;
    }()
  }, {
    key: "saveClient",
    value: function () {
      var _saveClient = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(dataReq) {
        var client;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                dataReq.clientName = dataReq.clientId;
                dataReq.id = (0, _md["default"])(dataReq.clientId);
                dataReq.clientId = (0, _md["default"])(dataReq.clientId);
                dataReq.clientSecret = (0, _md["default"])(dataReq.clientSecret);
                client = new _ssoClient.ClientModel(dataReq);
                _context2.next = 7;
                return client.save();

              case 7:
                return _context2.abrupt("return", _context2.sent);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function saveClient(_x2) {
        return _saveClient.apply(this, arguments);
      }

      return saveClient;
    }()
  }, {
    key: "viewClient",
    value: function () {
      var _viewClient = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var cliens;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _ssoClient.ClientModel.find().select("-_id clientId grants redirectUris").exec();

              case 2:
                cliens = _context3.sent;
                return _context3.abrupt("return", cliens);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function viewClient() {
        return _viewClient.apply(this, arguments);
      }

      return viewClient;
    }()
  }]);

  return Client;
}();

exports["default"] = Client;