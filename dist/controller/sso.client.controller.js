"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveClientController = saveClientController;
exports.viewClientController = viewClientController;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

function saveClientController(_x, _x2, _x3) {
  return _saveClientController.apply(this, arguments);
}

function _saveClientController() {
  _saveClientController = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res, next) {
    var resultReturn, container, Client, ReqAndRes, request, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            resultReturn = {
              resultCode: "210",
              resultMessage: rsCode.POST["210"],
              resultData: []
            };
            container = req.app.get("context");
            Client = container.get("sso.client");
            ReqAndRes = Client.Fn.RequestAndResponse(req, res);
            request = ReqAndRes.request;
            response = ReqAndRes.response;
            return _context2.abrupt("return", Client.auth.authenticate(request, response).then(
            /*#__PURE__*/
            function () {
              var _ref = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(token) {
                var dataReq, alert, result;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!token.refreshToken) {
                          _context.next = 4;
                          break;
                        }

                        throw {
                          code: 401,
                          name: "invalid_token"
                        };

                      case 4:
                        dataReq = Client.Fn.trimObj(req.body);
                        _context.next = 7;
                        return Client.validateSaveClient(dataReq);

                      case 7:
                        alert = _context.sent;

                        if (_lodash["default"].isEmpty(alert)) {
                          _context.next = 10;
                          break;
                        }

                        throw [alert, 3];

                      case 10:
                        _context.next = 12;
                        return Client.saveClient(dataReq);

                      case 12:
                        result = _context.sent;
                        resultReturn.resultData = result;
                        res.status(200).send(resultReturn);

                      case 15:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x7) {
                return _ref.apply(this, arguments);
              };
            }())["catch"](function (err) {
              var error = Client.Fn.errorHandler(err, resultReturn);
              if (error.resultCode == 401 || error.resultCode == 400) res.status(error.resultCode).send(resultReturn);else next(error);
            }));

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return _saveClientController.apply(this, arguments);
}

function viewClientController(_x4, _x5, _x6) {
  return _viewClientController.apply(this, arguments);
}

function _viewClientController() {
  _viewClientController = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res, next) {
    var resultReturn, container, Client, ReqAndRes, request, response;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            resultReturn = {
              resultCode: "100",
              resultMessage: rsCode.GET["100"],
              resultData: []
            };
            container = req.app.get("context");
            Client = container.get("sso.client");
            ReqAndRes = Client.Fn.RequestAndResponse(req, res);
            request = ReqAndRes.request;
            response = ReqAndRes.response;
            return _context4.abrupt("return", Client.auth.authenticate(request, response).then(
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee3(token) {
                var result;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        if (!token.refreshToken) {
                          _context3.next = 4;
                          break;
                        }

                        throw {
                          code: 401,
                          name: "invalid_token"
                        };

                      case 4:
                        _context3.next = 6;
                        return Client.viewClient();

                      case 6:
                        result = _context3.sent;
                        if (_lodash["default"].isEmpty(result)) Client.Fn.resultMessage(2, resultReturn);
                        resultReturn.resultData = result;
                        res.status(200).send(resultReturn);

                      case 10:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x8) {
                return _ref2.apply(this, arguments);
              };
            }())["catch"](function (err) {
              var error = Client.Fn.errorHandler(err, resultReturn);
              if (error.resultCode == 401 || error.resultCode == 400) res.status(error.resultCode).send(resultReturn);else next(error);
            }));

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            next(_context4.t0);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 10]]);
  }));
  return _viewClientController.apply(this, arguments);
}