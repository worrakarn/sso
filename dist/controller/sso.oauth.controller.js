"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.obtainToken = obtainToken;
exports.authenticateRequest = authenticateRequest;

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

function obtainToken(_x, _x2, _x3) {
  return _obtainToken.apply(this, arguments);
}

function _obtainToken() {
  _obtainToken = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var resultReturn, container, auth, Fn, ReqAndRes, request, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            resultReturn = {
              resultCode: "210",
              resultMessage: rsCode.POST["210"],
              resultData: []
            };
            container = req.app.get("context");
            auth = container.get("sso.oauth");
            Fn = container.get("global");
            ReqAndRes = Fn.RequestAndResponse(req, res);
            request = ReqAndRes.request;
            response = ReqAndRes.response;
            return _context.abrupt("return", auth.token(request, response).then(function (token) {
              resultReturn.resultData = token;
              res.json(resultReturn);
            })["catch"](function (err) {
              var error = Fn.errorHandler(err, resultReturn);
              if (error.resultCode == 401 || error.resultCode == 400) res.status(error.resultCode).send(resultReturn);else next(error);
            }));

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            next(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));
  return _obtainToken.apply(this, arguments);
}

function authenticateRequest(_x4, _x5, _x6) {
  return _authenticateRequest.apply(this, arguments);
}

function _authenticateRequest() {
  _authenticateRequest = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res, next) {
    var resultReturn, container, auth, Fn, ReqAndRes, request, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            resultReturn = {
              resultCode: "100",
              resultMessage: rsCode.GET["100"],
              resultData: []
            };
            container = req.app.get("context");
            auth = container.get("sso.oauth");
            Fn = container.get("global");
            ReqAndRes = Fn.RequestAndResponse(req, res);
            request = ReqAndRes.request;
            response = ReqAndRes.response;
            return _context2.abrupt("return", auth.authenticate(request, response).then(function (token) {
              res.send(resultReturn);
            })["catch"](function (err) {
              var error = Fn.errorHandler(err, resultReturn);
              if (error.resultCode == 401 || error.resultCode == 400) res.status(error.resultCode).send(resultReturn);else next(error);
            }));

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return _authenticateRequest.apply(this, arguments);
}