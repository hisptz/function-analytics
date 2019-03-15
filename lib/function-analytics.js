(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("function-analytics", [], factory);
	else if(typeof exports === 'object')
		exports["function-analytics"] = factory();
	else
		root["function-analytics"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/analytics.js":
/*!**************************!*\
  !*** ./src/analytics.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Analytics = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Analytics =
/*#__PURE__*/
function () {
  function Analytics() {
    _classCallCheck(this, Analytics);
  }

  _createClass(Analytics, [{
    key: "setData",
    value: function setData(dx) {
      return this;
    }
  }, {
    key: "setPeriod",
    value: function setPeriod(pe) {
      return this;
    }
  }, {
    key: "setOrgUnit",
    value: function setOrgUnit(ou) {
      return this;
    }
  }, {
    key: "setDimension",
    value: function setDimension(dim) {
      return this;
    }
  }, {
    key: "getUrl",
    value: function getUrl() {
      return this;
    }
  }]);

  return Analytics;
}();

exports.Analytics = Analytics;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fn = void 0;

var _analytics = __webpack_require__(/*! ./analytics.js */ "./src/analytics.js");

var _progressPromise = _interopRequireDefault(__webpack_require__(/*! ./promise/progress-promise.js */ "./src/promise/progress-promise.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Fn = {
  Promise: _progressPromise.default,
  Analytics: _analytics.Analytics
};
exports.Fn = Fn;

/***/ }),

/***/ "./src/promise/progress-promise.js":
/*!*****************************************!*\
  !*** ./src/promise/progress-promise.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Fallback for engines that don't support Symbol

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LISTENERS = Symbol ? Symbol() : '__listeners';

var ProgressPromise =
/*#__PURE__*/
function (_Promise) {
  _inherits(ProgressPromise, _Promise);

  function ProgressPromise(executor) {
    var _this;

    _classCallCheck(this, ProgressPromise);

    _this = _possibleConstructorReturn(this, (ProgressPromise.__proto__ || Object.getPrototypeOf(ProgressPromise)).call(this, function (resolve, reject) {
      var _this2 = this;

      return executor(resolve, reject, function (value) {
        try {
          return _this2[LISTENERS].forEach(function (listener) {
            return listener(value);
          });
        } catch (error) {
          reject(error);
          return [];
        }
      });
    }));
    _this[LISTENERS] = [];
    return _this;
  }

  _createClass(ProgressPromise, [{
    key: "progress",
    value: function progress(handler) {
      if (typeof handler !== 'function') {
        throw new Error('PROGRESS_REQUIRES_FUNCTION');
      }

      this[LISTENERS].push(handler);
      return this;
    }
  }], [{
    key: "all",
    value: function all(promises) {
      var results = new Array(promises.length);
      var length = promises.length;
      var resolveCount = 0;
      return new ProgressPromise(function (resolve, reject, progress) {
        promises.forEach(function (promise, index) {
          promise.then(function (result) {
            results[index] = result;
            results.proportion = ++resolveCount / length;
            progress(results);

            if (resolveCount === length) {
              resolve(results);
            }
          }).catch(reject);
        });
      });
    }
  }, {
    key: "sequence",
    value: function sequence(inputs, handler) {
      var results = [];
      var length = inputs.length;
      var resolveCount = 0;
      return new ProgressPromise(function (resolve, reject, progress) {
        function invokeNext() {
          handler.call(null, inputs[results.length]).then(function (result) {
            results.push(result);
            results.proportion = ++resolveCount / length;
            progress(results);
            if (results.length === length) resolve(results);else invokeNext();
          }).catch(reject);
          ;
        }

        invokeNext();
      });
    }
  }]);

  return ProgressPromise;
}(Promise);

exports.default = ProgressPromise;
module.exports = exports["default"];

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3Mvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9zcmMvYW5hbHl0aWNzLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9zcmMvcHJvbWlzZS9wcm9ncmVzcy1wcm9taXNlLmpzIl0sIm5hbWVzIjpbIkFuYWx5dGljcyIsImR4IiwicGUiLCJvdSIsImRpbSIsIkZuIiwiUHJvbWlzZSIsIkxJU1RFTkVSUyIsIlN5bWJvbCIsIlByb2dyZXNzUHJvbWlzZSIsImV4ZWN1dG9yIiwicmVzb2x2ZSIsInJlamVjdCIsInZhbHVlIiwiZm9yRWFjaCIsImxpc3RlbmVyIiwiZXJyb3IiLCJoYW5kbGVyIiwiRXJyb3IiLCJwdXNoIiwicHJvbWlzZXMiLCJyZXN1bHRzIiwiQXJyYXkiLCJsZW5ndGgiLCJyZXNvbHZlQ291bnQiLCJwcm9ncmVzcyIsInByb21pc2UiLCJpbmRleCIsInRoZW4iLCJyZXN1bHQiLCJwcm9wb3J0aW9uIiwiY2F0Y2giLCJpbnB1dHMiLCJpbnZva2VOZXh0IiwiY2FsbCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNB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UDtBQUNEO0FBQ0YsV0FQRCxFQU9HVSxLQVBILENBT1NuQixNQVBUO0FBUUQsU0FURDtBQVVELE9BWE0sQ0FBUDtBQVlEOzs7NkJBQ2VvQixNLEVBQVFmLE8sRUFBUztBQUMvQixVQUFNSSxPQUFPLEdBQUcsRUFBaEI7QUFDQSxVQUFNRSxNQUFNLEdBQUdTLE1BQU0sQ0FBQ1QsTUFBdEI7QUFDQSxVQUFJQyxZQUFZLEdBQUcsQ0FBbkI7QUFFQSxhQUFPLElBQUlmLGVBQUosQ0FBb0IsVUFBQ0UsT0FBRCxFQUFVQyxNQUFWLEVBQWtCYSxRQUFsQixFQUErQjtBQUN4RCxpQkFBU1EsVUFBVCxHQUFzQjtBQUNwQmhCLGlCQUFPLENBQUNpQixJQUFSLENBQWEsSUFBYixFQUFtQkYsTUFBTSxDQUFDWCxPQUFPLENBQUNFLE1BQVQsQ0FBekIsRUFDR0ssSUFESCxDQUNRLFVBQUFDLE1BQU0sRUFBSTtBQUNkUixtQkFBTyxDQUFDRixJQUFSLENBQWFVLE1BQWI7QUFDQVIsbUJBQU8sQ0FBQ1MsVUFBUixHQUFxQixFQUFFTixZQUFGLEdBQWlCRCxNQUF0QztBQUNBRSxvQkFBUSxDQUFDSixPQUFELENBQVI7QUFDQSxnQkFBSUEsT0FBTyxDQUFDRSxNQUFSLEtBQW1CQSxNQUF2QixFQUErQlosT0FBTyxDQUFDVSxPQUFELENBQVAsQ0FBL0IsS0FDS1ksVUFBVTtBQUNoQixXQVBILEVBT0tGLEtBUEwsQ0FPV25CLE1BUFg7QUFPbUI7QUFDcEI7O0FBQ0RxQixrQkFBVTtBQUNYLE9BWk0sQ0FBUDtBQWFEOzs7O0VBMUQwQzNCLE8iLCJmaWxlIjoiZnVuY3Rpb24tYW5hbHl0aWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJmdW5jdGlvbi1hbmFseXRpY3NcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZnVuY3Rpb24tYW5hbHl0aWNzXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImZ1bmN0aW9uLWFuYWx5dGljc1wiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCBjbGFzcyBBbmFseXRpY3Mge1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgc2V0RGF0YShkeCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHNldFBlcmlvZChwZSkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHNldE9yZ1VuaXQob3UpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBzZXREaW1lbnNpb24oZGltKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRVcmwoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiIsImltcG9ydCB7QW5hbHl0aWNzfSBmcm9tICcuL2FuYWx5dGljcy5qcyc7XG5pbXBvcnQgUHJvZ3Jlc3NQcm9taXNlIGZyb20gJy4vcHJvbWlzZS9wcm9ncmVzcy1wcm9taXNlLmpzJztcbmxldCBGbiA9IHtcbiAgUHJvbWlzZTogUHJvZ3Jlc3NQcm9taXNlLFxuICBBbmFseXRpY3M6IEFuYWx5dGljc1xufTtcblxuZXhwb3J0IHsgRm4gfTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIEZhbGxiYWNrIGZvciBlbmdpbmVzIHRoYXQgZG9uJ3Qgc3VwcG9ydCBTeW1ib2xcbmNvbnN0IExJU1RFTkVSUyA9IFN5bWJvbCA/IFN5bWJvbCgpIDogJ19fbGlzdGVuZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZ3Jlc3NQcm9taXNlIGV4dGVuZHMgUHJvbWlzZSB7XG4gIGNvbnN0cnVjdG9yKGV4ZWN1dG9yKSB7XG4gICAgc3VwZXIoXG4gICAgICBmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHJldHVybiBleGVjdXRvcihyZXNvbHZlLCByZWplY3QsICh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1tMSVNURU5FUlNdLmZvckVhY2gobGlzdGVuZXIgPT4gbGlzdGVuZXIodmFsdWUpKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgdGhpc1tMSVNURU5FUlNdID0gW107XG4gIH1cbiAgcHJvZ3Jlc3MoaGFuZGxlcikge1xuICAgIGlmICh0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQUk9HUkVTU19SRVFVSVJFU19GVU5DVElPTicpO1xuICAgIH1cbiAgICB0aGlzW0xJU1RFTkVSU10ucHVzaChoYW5kbGVyKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBzdGF0aWMgYWxsKHByb21pc2VzKSB7XG4gICAgY29uc3QgcmVzdWx0cyA9IG5ldyBBcnJheShwcm9taXNlcy5sZW5ndGgpO1xuICAgIGNvbnN0IGxlbmd0aCA9IHByb21pc2VzLmxlbmd0aDtcbiAgICBsZXQgcmVzb2x2ZUNvdW50ID0gMDtcblxuICAgIHJldHVybiBuZXcgUHJvZ3Jlc3NQcm9taXNlKChyZXNvbHZlLCByZWplY3QsIHByb2dyZXNzKSA9PiB7XG4gICAgICBwcm9taXNlcy5mb3JFYWNoKChwcm9taXNlLCBpbmRleCkgPT4ge1xuICAgICAgICBwcm9taXNlLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICByZXN1bHRzW2luZGV4XSA9IHJlc3VsdDtcbiAgICAgICAgICByZXN1bHRzLnByb3BvcnRpb24gPSArK3Jlc29sdmVDb3VudCAvIGxlbmd0aDtcbiAgICAgICAgICBwcm9ncmVzcyhyZXN1bHRzKTtcbiAgICAgICAgICBpZiAocmVzb2x2ZUNvdW50ID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0cyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaChyZWplY3QpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgc3RhdGljIHNlcXVlbmNlKGlucHV0cywgaGFuZGxlcikge1xuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICBjb25zdCBsZW5ndGggPSBpbnB1dHMubGVuZ3RoO1xuICAgIGxldCByZXNvbHZlQ291bnQgPSAwO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9ncmVzc1Byb21pc2UoKHJlc29sdmUsIHJlamVjdCwgcHJvZ3Jlc3MpID0+IHtcbiAgICAgIGZ1bmN0aW9uIGludm9rZU5leHQoKSB7XG4gICAgICAgIGhhbmRsZXIuY2FsbChudWxsLCBpbnB1dHNbcmVzdWx0cy5sZW5ndGhdKVxuICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgIHJlc3VsdHMucHJvcG9ydGlvbiA9ICsrcmVzb2x2ZUNvdW50IC8gbGVuZ3RoO1xuICAgICAgICAgICAgcHJvZ3Jlc3MocmVzdWx0cyk7XG4gICAgICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPT09IGxlbmd0aCkgcmVzb2x2ZShyZXN1bHRzKTtcbiAgICAgICAgICAgIGVsc2UgaW52b2tlTmV4dCgpO1xuICAgICAgICAgIH0pLmNhdGNoKHJlamVjdCk7O1xuICAgICAgfVxuICAgICAgaW52b2tlTmV4dCgpO1xuICAgIH0pO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9