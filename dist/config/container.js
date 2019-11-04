"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Container =
/*#__PURE__*/
function () {
  function Container() {
    _classCallCheck(this, Container);

    this._services = new Map();
    this._singletons = new Map();
  }

  _createClass(Container, [{
    key: "register",
    value: function register(name, definition, dependencies) {
      this._services.set(name, {
        definition: definition,
        dependencies: dependencies
      });
    }
  }, {
    key: "singleton",
    value: function singleton(name, definition, dependencies) {
      this._services.set(name, {
        definition: definition,
        dependencies: dependencies,
        singleton: true
      });
    }
  }, {
    key: "get",
    value: function get(name) {
      var c = this._services.get(name);

      if (this._isClass(c.definition)) {
        if (c.singleton) {
          var singletonInstance = this._singletons.get(name);

          if (singletonInstance) {
            return singletonInstance;
          } else {
            var newSingletonInstance = this._createInstance(c);

            this._singletons.set(name, newSingletonInstance);

            return newSingletonInstance;
          }
        }

        return this._createInstance(c);
      } else {
        return c.definition;
      }
    }
  }, {
    key: "_getResolvedDependencies",
    value: function _getResolvedDependencies(service) {
      var _this = this;

      var classDependencies = [];

      if (service.dependencies) {
        classDependencies = service.dependencies.map(function (dep) {
          return _this.get(dep);
        });
      }

      return classDependencies;
    }
  }, {
    key: "_createInstance",
    value: function _createInstance(service) {
      return _construct(service.definition, _toConsumableArray(this._getResolvedDependencies(service)));
    }
  }, {
    key: "_isClass",
    value: function _isClass(definition) {
      return typeof definition === 'function';
    }
  }]);

  return Container;
}();

var _default = Container;
exports["default"] = _default;