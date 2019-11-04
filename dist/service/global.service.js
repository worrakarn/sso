"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _lodash = _interopRequireDefault(require("lodash"));

var _oauth2Server = _interopRequireDefault(require("oauth2-server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var Request = _oauth2Server["default"].Request;
var Response = _oauth2Server["default"].Response;

var Global =
/*#__PURE__*/
function () {
  function Global() {
    _classCallCheck(this, Global);
  }

  _createClass(Global, [{
    key: "trimObj",
    value: function trimObj(obj) {
      if (!Array.isArray(obj) && _typeof(obj) != "object") return obj;
      return Object.keys(obj).reduce(function (acc, key) {
        acc[key.trim()] = typeof obj[key] == "string" ? obj[key].trim() : this.trimObj(obj[key]);
        return acc;
      }.bind(this), Array.isArray(obj) ? [] : {});
    }
  }, {
    key: "validate",
    value: function validate(value, schema, options) {
      var joiOptions = {
        convert: true,
        abortEarly: false
      };
      if (options) joiOptions = options;
      var result = schema.validate(value, joiOptions);

      if (result.error) {
        var arrEx = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = result.error.details[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var err = _step.value;
            var positionMap = {
              position: typeof err.path[0] == "number" ? err.path[0] : 0
            };

            var checkNumRow = _lodash["default"].findIndex(arrEx, positionMap);

            var countErrorPath = err.path.length;

            if (checkNumRow == -1) {
              if (err.message.length > 1) {
                arrEx.push({
                  position: positionMap.position,
                  error: [_defineProperty({}, this.validateIndex(countErrorPath, err), err.message.replace(/"/g, ""))]
                });
              }
            } else {
              if (err.message.length > 1) {
                arrEx[checkNumRow].error[0][this.validateIndex(countErrorPath, err)] = err.message.replace(/"/g, "");
              }
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return arrEx;
      } else {
        return null;
      }
    }
  }, {
    key: "validateIndex",
    value: function validateIndex(countErrorPath, err) {
      switch (countErrorPath) {
        case 1:
          return isNaN(parseInt(err.path[0])) ? "".concat(err.context.label) : err.context.path ? "".concat(err.path[0], "_").concat(err.context.label, "_").concat(err.context.path) : "".concat(err.path[0], "_").concat(err.context.label);

        case 2:
          return "".concat(err.path[0], "_").concat(err.path[1]);

        case 3:
          return "".concat(err.path[0], "_").concat(err.path[1], "_").concat(err.path[2]);

        case 4:
          return "".concat(err.path[0], "_").concat(err.path[1], "_").concat(err.path[2], "_").concat(err.path[3]);

        case 5:
          return "".concat(err.path[0], "_").concat(err.path[1], "_").concat(err.path[2], "_").concat(err.path[3], "_").concat(err.path[4]);

        default:
          return err.context.key ? "".concat(err.context.key) : "".concat(err.context.label);
      }
    }
  }, {
    key: "reverseDateTimeJoin",
    value: function reverseDateTimeJoin(dateTime, Join) {
      var splitDate = function splitDate(value) {
        return value.split(" ");
      };

      var reverseDate = function reverseDate(value) {
        return value.split(/\/|-/g).reverse().join("".concat(Join));
      };

      var pipe = function pipe(ops) {
        return "".concat(reverseDate(ops[0]), " ").concat(ops[1] ? ops[1] : "").trim();
      };

      return pipe(splitDate(dateTime));
    }
  }, {
    key: "NotAllow",
    value: function NotAllow() {
      var resultReturn = {
        resultCode: "500",
        resultMessage: rsCode.ERROR["500"],
        resultData: []
      };
      resultReturn.resultData = "Invalid Token";
      return resultReturn;
    }
  }, {
    key: "padZero",
    value: function padZero(number) {
      return number < 10 ? "0".concat(number) : number;
    }
  }, {
    key: "resultMessage",
    value: function resultMessage(key, resultReturn) {
      switch (key) {
        case 1:
          resultReturn.resultCode = "100";
          resultReturn.resultMessage = rsCode.GET["100"];
          break;

        case 2:
          resultReturn.resultCode = "101";
          resultReturn.resultMessage = rsCode.GET["101"];
          break;

        case 3:
          resultReturn.resultCode = "102";
          resultReturn.resultMessage = rsCode.GET["102"];
          break;

        case 4:
          resultReturn.resultCode = "200";
          resultReturn.resultMessage = rsCode.POST["200"];
          break;

        case 5:
          resultReturn.resultCode = "201";
          resultReturn.resultMessage = rsCode.POST["201"];
          break;

        case 6:
          resultReturn.resultCode = "211";
          resultReturn.resultMessage = rsCode.POST["211"];
          break;

        case 7:
          resultReturn.resultCode = "212";
          resultReturn.resultMessage = rsCode.POST["212"];
          break;

        case 8:
          resultReturn.resultCode = "220";
          resultReturn.resultMessage = rsCode.POST["220"];
          break;

        case 9:
          resultReturn.resultCode = "300";
          resultReturn.resultMessage = rsCode.PUT["300"];
          break;

        case 10:
          resultReturn.resultCode = "301";
          resultReturn.resultMessage = rsCode.PUT["301"];
          break;

        case 11:
          resultReturn.resultCode = "302";
          resultReturn.resultMessage = rsCode.PUT["302"];
          break;

        case 12:
          resultReturn.resultCode = "303";
          resultReturn.resultMessage = rsCode.PUT["303"];
          break;

        case 13:
          resultReturn.resultCode = "400";
          break;

        case 14:
          resultReturn.resultCode = "401";
          break;

        case 15:
          resultReturn.resultCode = "600";
          resultReturn.resultMessage = rsCode.DELETE["600"];
          break;

        case 16:
          resultReturn.resultCode = "601";
          resultReturn.resultMessage = rsCode.DELETE["601"];
          break;

        default:
          resultReturn.resultCode = "500";
          resultReturn.resultMessage = rsCode.ERROR["500"];
          break;
      }

      return resultReturn;
    }
  }, {
    key: "RequestAndResponse",
    value: function RequestAndResponse(req, res) {
      var request = new Request(req);
      var response = new Response(res);
      return {
        request: request,
        response: response
      };
    }
  }, {
    key: "errorHandler",
    value: function errorHandler(err, resultReturn) {
      if (err.code == 401 || err.code == 400) {
        var code = 13;
        err.code == 400 ? code = 13 : code = 14;
        this.resultMessage(code, resultReturn);
        resultReturn.resultMessage = err.name;
        return resultReturn;
      } else {
        return err;
      }
    }
  }]);

  return Global;
}();

exports["default"] = Global;