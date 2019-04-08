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

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ "./node_modules/axios/lib/helpers/btoa.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ( true &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");
var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/progress-promise/index.js":
/*!************************************************!*\
  !*** ./node_modules/progress-promise/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Fallback for engines that don't support Symbol
const LISTENERS = Symbol ? Symbol() : '__listeners';

class ProgressPromise extends Promise {
  constructor(executor) {
    super((resolve, reject) => executor(resolve, reject,
      // Pass method for passing progress to listener
      value => {
        try {
          return this[LISTENERS].forEach(listener => listener(value));
        } catch(error) {
          reject(error);
        }
      }));
    this[LISTENERS] = [];
  }
  progress(handler) {
    if(typeof handler !== 'function')
      throw new Error('PROGRESS_REQUIRES_FUNCTION');
    this[LISTENERS].push(handler);
    return this;
  }
  static all(promises) {
    const results = new Array(promises.length);
    const length = promises.length;
    let resolveCount = 0;
    return new ProgressPromise((resolve, reject, progress) => {
      promises.forEach((promise, index) => {
        promise.then(result => {
          results[index] = result;
          results.proportion = ++resolveCount / length;
          progress(results);
          if(resolveCount === length) resolve(results);
        }).catch(reject);
      });
    });
  }
  static sequence(inputs, handler) {
    const results = [];
    const length = inputs.length;
    let resolveCount = 0;
    return new ProgressPromise((resolve, reject, progress) => {
      function invokeNext() {
        handler.call(null, inputs[results.length])
          .then(result => {
            results.push(result);
            results.proportion = ++resolveCount / length;
            progress(results);
            if(results.length === length) resolve(results);
            else invokeNext();
          }).catch(reject);;
      }
      invokeNext();
    });
  }
}

module.exports = ProgressPromise;



/***/ }),

/***/ "./src/core/fetcher.js":
/*!*****************************!*\
  !*** ./src/core/fetcher.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fetcher = void 0;

var _runner = __webpack_require__(/*! ./runner */ "./src/core/runner.js");

var _processor = __webpack_require__(/*! ./processor */ "./src/core/processor.js");

var _progressPromise = _interopRequireDefault(__webpack_require__(/*! progress-promise */ "./node_modules/progress-promise/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Represents the fetcher process
 *@extends Processor
 */
var Fetcher =
/*#__PURE__*/
function (_Processor) {
  _inherits(Fetcher, _Processor);

  /**
   * Creates a fethcer
   * @constructor
   */
  function Fetcher() {
    var _this;

    _classCallCheck(this, Fetcher);

    _this = _possibleConstructorReturn(this, (Fetcher.__proto__ || Object.getPrototypeOf(Fetcher)).call(this));
    _this.parameters = {};
    return _this;
  }
  /**
   * Gets the URL Parameters
   * @returns {string}
   * @private
   */


  _createClass(Fetcher, [{
    key: "get",

    /**
     * Gets the running process started
     * @returns {ProgressPromise}
     */
    value: function get() {
      return new _runner.Runner().getResults(this);
    }
    /**
     * Set paremeters
     * @param {Object} parameters
     * @returns {Fetcher}
     */

  }, {
    key: "setParameters",
    value: function setParameters(parameters) {
      var _this2 = this;

      Object.keys(parameters).forEach(function (key) {
        _this2.parameters[key] = parameters[key];
      });
      return this;
    }
    /**
     * Get Dependency results
     * @returns {ProgressPromise}
     */

  }, {
    key: "getDependecyFetchResults",
    value: function getDependecyFetchResults() {
      var promises = this.dependencies.map(function (dependency) {
        return new _runner.Runner().getResults(dependency.processor);
      });
      return _progressPromise.default.all(promises);
    }
  }, {
    key: "_urlParameters",
    get: function get() {
      var _this3 = this;

      var url = '';
      Object.keys(this.parameters).forEach(function (key) {
        if (url !== '') {
          url += '&';
        }

        if (typeof _this3.parameters[key] === 'string') {
          url += key + '=' + _this3.parameters[key];
        } else {
          Object.keys(_this3.parameters[key]).forEach(function (key2) {
            if (url !== '') {
              url += '&';
            }

            url += key + '=' + key2 + ':' + _this3.parameters[key][key2];
          });
        }
      });
      return url;
    }
    /**
     * Gets the url
     * @throws Implementation Error
     */

  }, {
    key: "url",
    get: function get() {
      throw new Error('Should implement url generation');
    }
  }]);

  return Fetcher;
}(_processor.Processor);

exports.Fetcher = Fetcher;

/***/ }),

/***/ "./src/core/identifiable-object.js":
/*!*****************************************!*\
  !*** ./src/core/identifiable-object.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IdentifiableObject = void 0;

var _fetcher = __webpack_require__(/*! ../core/fetcher */ "./src/core/fetcher.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var IdentifiableObject =
/*#__PURE__*/
function (_Fetcher) {
  _inherits(IdentifiableObject, _Fetcher);

  function IdentifiableObject() {
    var _this;

    _classCallCheck(this, IdentifiableObject);

    _this = _possibleConstructorReturn(this, (IdentifiableObject.__proto__ || Object.getPrototypeOf(IdentifiableObject)).call(this));
    _this._filters = [];
    return _this;
  }

  _createClass(IdentifiableObject, [{
    key: "where",
    value: function where(right, operator, left) {
      this._filters.push({
        right: right,
        operator: operator,
        left: left
      });

      return this;
    }
  }, {
    key: "name",
    get: function get() {
      throw Error('Object name not implemented');
    }
  }, {
    key: "url",
    get: function get() {
      var url = this._urlParameters;

      this._filters.forEach(function (filter) {
        url += 'filter=' + filter.right;

        if (filter.operator === '==') {
          url += ':eq:' + filter.left;
        } else if (filter.operator === '<') {
          url += ':lt:' + filter.left;
        } else if (filter.operator === '<=') {
          url += ':le:' + filter.left;
        } else if (filter.operator === '>') {
          url += ':gt:' + filter.left;
        } else if (filter.operator === '>=') {
          url += ':ge:' + filter.left;
        } else if (filter.operator === '<>') {
          url += ':!eq:' + filter.left;
        } else if (filter.operator === 'in' || filter.operator === '!in') {
          url += ':' + filter.operator + ':[' + filter.left + ']';
        } else if (!filter.left) {
          url += ':' + filter.operator;
        } else {
          url += ':' + filter.operator + ':' + filter.left;
        }
      });

      return this.name + '.json?' + url;
    }
  }]);

  return IdentifiableObject;
}(_fetcher.Fetcher);

exports.IdentifiableObject = IdentifiableObject;

/***/ }),

/***/ "./src/core/multi-fetcher.js":
/*!***********************************!*\
  !*** ./src/core/multi-fetcher.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiFetcher = void 0;

var _runner = __webpack_require__(/*! ./runner */ "./src/core/runner.js");

var _fetcher = __webpack_require__(/*! ./fetcher */ "./src/core/fetcher.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MultiFetcher =
/*#__PURE__*/
function (_Fetcher) {
  _inherits(MultiFetcher, _Fetcher);

  function MultiFetcher(fetchers) {
    var _this;

    _classCallCheck(this, MultiFetcher);

    _this = _possibleConstructorReturn(this, (MultiFetcher.__proto__ || Object.getPrototypeOf(MultiFetcher)).call(this));
    _this._fetchers = fetchers;
    return _this;
  }

  _createClass(MultiFetcher, [{
    key: "get",
    value: function get() {
      return new _runner.Runner().getAllResults(this);
    }
  }, {
    key: "fetchers",
    get: function get() {
      return this._fetchers;
    }
  }]);

  return MultiFetcher;
}(_fetcher.Fetcher);

exports.MultiFetcher = MultiFetcher;

/***/ }),

/***/ "./src/core/processor.js":
/*!*******************************!*\
  !*** ./src/core/processor.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Processor = exports.Dependency = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This callback type is called `processCallback`.
 *
 * @callback processCallback
 * @param {Object} result
 */

/**
 * Represents a process dependency
 */
var Dependency =
/**
 * Creates a dependency instance
 * @param {Processor} processor
 * @param {processCallback} process
 */
function Dependency(processor, process) {
  _classCallCheck(this, Dependency);

  this.processor = processor;
  this.process = process;
};
/**
 * This is the representation of the processor
 */


exports.Dependency = Dependency;

var Processor =
/*#__PURE__*/
function () {
  /**
   * Creates a processor
   */
  function Processor() {
    _classCallCheck(this, Processor);

    this.postProcessors = [];
    this.dependencies = [];
  }
  /**
   * Checks if processor has dependencies
   * @returns {boolean}
   */


  _createClass(Processor, [{
    key: "hasDependencies",
    value: function hasDependencies() {
      return this.dependencies.length > 0;
    }
    /**
     * Adds dependency to the processor
     * @param {Dependency} dependency
     * @returns {Processor}
     */

  }, {
    key: "preProcess",
    value: function preProcess(dependency) {
      this.dependencies.push(dependency);
      return this;
    }
    /**
     * Adds callback process the output process
     * @param callback
     * @returns {Processor}
     */

  }, {
    key: "postProcess",
    value: function postProcess(callback) {
      this.postProcessors.push(callback);
      return this;
    }
    /**
     * Performs pre process
     * @returns {Processor}
     */

  }, {
    key: "performPreProcess",
    value: function performPreProcess() {
      var _this = this;

      this.dependencies.forEach(function (dependency) {
        dependency.process(dependency.processor._results, _this);
      });
      return this;
    }
    /**
     * Performs post process after the process has ended
     * @param {Object} data
     * @returns {Object}
     */

  }, {
    key: "performPostProcess",
    value: function performPostProcess(data) {
      this._results = data;
      var dataToProcess = data;
      this.postProcessors.forEach(function (callback) {
        dataToProcess = callback(dataToProcess);
      });
      return dataToProcess;
    }
  }]);

  return Processor;
}();

exports.Processor = Processor;

/***/ }),

/***/ "./src/core/runner.js":
/*!****************************!*\
  !*** ./src/core/runner.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Runner = void 0;

var _progressPromise = _interopRequireDefault(__webpack_require__(/*! progress-promise */ "./node_modules/progress-promise/index.js"));

var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));

var _http = _interopRequireDefault(__webpack_require__(/*! axios/lib/adapters/http */ "./node_modules/axios/lib/adapters/xhr.js"));

var _xhr = _interopRequireDefault(__webpack_require__(/*! axios/lib/adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _instance;
/**
 * Runner represents the process which will schedule and run operations of the processes
 */


var Runner =
/*#__PURE__*/
function () {
  function Runner() {
    _classCallCheck(this, Runner);
  }

  _createClass(Runner, [{
    key: "_fetch",

    /**
     * This callback type is called `resolveCallback`.
     *
     * @callback resolveCallback
     * @param {Object} responseResult
     */

    /**
     * This callback type is called `rejectCallback`.
     *
     * @callback rejectCallback
     * @param {Error} error
     */

    /**
     * Fetches the data from the fetcher
     * @param {Fetcher} fetcher
     * @param {resolveCallback} resolve
     * @param {rejectCallback} reject
     * @private
     */
    value: function _fetch(fetcher, resolve, reject) {
      if (!_instance) {
        var error = 'Configration not set please configre function ' + 'analytics eg {baseUrl:"dhis_base_url", username:"username", ' + 'password:"password"}';
        throw Error(error);
      }

      var config = {
        url: _instance.config.baseUrl + fetcher.url,
        method: 'get',
        adapter: typeof process !== 'undefined' ? _http.default : _xhr.default
      };

      if (_instance.config.username && _instance.config.password) {
        config.auth = {
          username: _instance.config.username,
          password: _instance.config.password
        };
      }

      _axios.default.request(config).then(function (results) {
        resolve(fetcher.performPostProcess(results.data));
      }, function (err) {
        reject(err);
      });
    }
    /**
     * Fetches data related to a fetcher
     * @param {Fetcher} fetcher
     * @returns {ProgressPromise}
     */

  }, {
    key: "getResults",
    value: function getResults(fetcher) {
      var _this = this;

      if (fetcher._fetchers) {
        // If is a multifetcher
        return this.getAllResults(fetcher);
      }

      return new _progressPromise.default(function (resolve, reject, progress) {
        if (fetcher.hasDependencies()) {
          fetcher.getDependecyFetchResults().then(function () {
            fetcher.performPreProcess();

            _this._fetch(fetcher, resolve, reject);
          }).catch(function (err) {
            console.log('Errrrrrrrrrr:', err);
            reject();
          });
        } else {
          _this._fetch(fetcher, resolve, reject);
        }
      });
    }
    /**
     * Fetches data for multiple fetchers
     * @param {MultiFetcher} multifetcher
     * @returns {ProgressPromise}
     */

  }, {
    key: "getAllResults",
    value: function getAllResults(multifetcher) {
      return new _progressPromise.default(function (resolve, reject, progress) {
        var promises = multifetcher.fetchers.map(function (fetcher) {
          return new Runner().getResults(fetcher);
        });
        return _progressPromise.default.all(promises).then(function (results) {
          resolve(multifetcher.performPostProcess(results));
        }).catch(function (err) {
          reject(err);
        });
      });
    }
  }, {
    key: "instance",

    /**
     * Get the Runner instance
     * @returns {Runner}
     */
    get: function get() {
      return _instance;
    }
    /**
     * Set the configuration
     * @param configurations
     */

  }, {
    key: "config",
    set: function set(configurations) {
      this.config = configurations;
    }
    /**
     * Get the configurations
     * @returns {*}
     */
    ,
    get: function get() {
      return this.config;
    }
  }], [{
    key: "initiateRunner",

    /**
     * Initiates the runner singleton instance
     * @param configurations
     */
    value: function initiateRunner(configurations) {
      if (!Runner.instance) {
        this.config = configurations;
        _instance = this;
      }
    }
  }]);

  return Runner;
}();

exports.Runner = Runner;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./src/impl/analytics.js":
/*!*******************************!*\
  !*** ./src/impl/analytics.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Analytics = exports.AnalyticsObject = exports.AnalyticsHeaders = exports.AnalyticsHeader = void 0;

var _fetcher = __webpack_require__(/*! ../core/fetcher */ "./src/core/fetcher.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This represents the Analytics header
 *
 */
var AnalyticsHeader = function AnalyticsHeader() {
  _classCallCheck(this, AnalyticsHeader);
};
/**
 * This represents the Analytics Headers
 *
 * @extends Array
 */


exports.AnalyticsHeader = AnalyticsHeader;

var AnalyticsHeaders =
/*#__PURE__*/
function (_Array) {
  _inherits(AnalyticsHeaders, _Array);

  function AnalyticsHeaders(data) {
    var _ref;

    var _this;

    _classCallCheck(this, AnalyticsHeaders);

    _this = _possibleConstructorReturn(this, (_ref = AnalyticsHeaders.__proto__ || Object.getPrototypeOf(AnalyticsHeaders)).call.apply(_ref, [this].concat(_toConsumableArray(data))));
    Object.setPrototypeOf(_this, Object.create(AnalyticsHeaders.prototype));
    return _this;
  }
  /**
   * Gets the data analytics header
   *
   * @returns {AnalyticsHeader}
   */


  _createClass(AnalyticsHeaders, [{
    key: "getHeader",

    /**
     * Gets the header of a parameter
     * @param id
     * @returns {AnalyticsHeader}
     */
    value: function getHeader(id) {
      var returnHeader;
      this.forEach(function (header, index) {
        if (header.name === id) {
          returnHeader = header;
          returnHeader.index = index;
        }
      });
      return returnHeader;
    }
  }, {
    key: "dx",
    get: function get() {
      return this.getHeader('dx');
    }
    /**
     * Gets the period analytics header
     *
     * @returns {AnalyticsHeader}
     */

  }, {
    key: "pe",
    get: function get() {
      return this.getHeader('pe');
    }
    /**
     * Gets the organisation unit analytics header
     *
     * @returns {AnalyticsHeader}
     */

  }, {
    key: "ou",
    get: function get() {
      return this.getHeader('ou');
    }
    /**
     * Gets the value analytics header
     *
     * @returns {AnalyticsHeader}
     */

  }, {
    key: "value",
    get: function get() {
      return this.getHeader('value');
    }
  }]);

  return AnalyticsHeaders;
}(Array);
/**
 * This represents the Analytics Results
 *
 */


exports.AnalyticsHeaders = AnalyticsHeaders;

var AnalyticsObject =
/*#__PURE__*/
function () {
  /**
   * Creates ana Analytics Object
   *
   * @param {Object} - DHIS Analytics object
   */
  function AnalyticsObject(analyticsObject) {
    _classCallCheck(this, AnalyticsObject);

    this._data = analyticsObject;
  }
  /**
   * Gets the Analytics Headers Array
   *
   * @returns {AnalyticsHeaders}
   */


  _createClass(AnalyticsObject, [{
    key: "headers",
    get: function get() {
      return new AnalyticsHeaders(this._data.headers);
    }
    /**
     * Gets the Analytics Metadata Object
     *
     * @returns {*|metaData|{dimensions, names, dx, pe, ou, co}|{ouHierarchy, items, dimensions}}
     */

  }, {
    key: "metaData",
    get: function get() {
      return this._data.metaData;
    }
    /**
     * Gets the rows of the analytics object
     *
     * @returns {Array}
     */

  }, {
    key: "rows",
    get: function get() {
      return this._data.rows;
    }
    /**
     * Gets the Analytics height
     *
     * @returns {number}
     */

  }, {
    key: "height",
    get: function get() {
      return this._data.height;
    }
    /**
     * Gets the Analytics width
     *
     * @returns {number}
     */

  }, {
    key: "width",
    get: function get() {
      return this._data.width;
    }
  }]);

  return AnalyticsObject;
}();
/**
 * This represents the Analytics Fetcher for processing analytics calls
 *
 * @extends Fetcher
 */


exports.AnalyticsObject = AnalyticsObject;

var Analytics =
/*#__PURE__*/
function (_Fetcher) {
  _inherits(Analytics, _Fetcher);

  /**
   * Creates an analytics fethcer
   *
   * @param oldAnalytics - Whether the structure to be returned should be old or new.
   */
  function Analytics() {
    var _this2;

    var oldAnalytics = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    _classCallCheck(this, Analytics);

    _this2 = _possibleConstructorReturn(this, (Analytics.__proto__ || Object.getPrototypeOf(Analytics)).call(this));
    _this2.parameters['dimension'] = {};

    _this2.postProcess(function (data) {
      return _this2.standardizeAnalytics(data, oldAnalytics);
    });

    return _this2;
  }
  /**
   * Sets the data for the fetch
   * @param dx
   * @returns {Analytics}
   */


  _createClass(Analytics, [{
    key: "setData",
    value: function setData(dx) {
      this.parameters['dimension']['dx'] = dx;
      return this;
    }
    /**
     * Sets the period for the fetch
     * @param pe
     * @returns {Analytics}
     */

  }, {
    key: "setPeriod",
    value: function setPeriod(pe) {
      this.parameters['dimension']['pe'] = pe;
      return this;
    }
    /**
     * Sets the organisation unit for the fetching of the analytics
     * @param ou
     * @returns {Analytics}
     */

  }, {
    key: "setOrgUnit",
    value: function setOrgUnit(ou) {
      this.parameters['dimension']['ou'] = ou;
      return this;
    }
    /**
     * Standardizes the analytics object
     *
     * @param analyticsObject - The analytics object
     * @param preferNormalStructure - Whether to prefer the old or new analytics structure
     * @returns {AnalyticsObject}
     */

  }, {
    key: "standardizeAnalytics",
    value: function standardizeAnalytics(analyticsObject) {
      var preferNormalStructure = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      // if Serverside Event clustering do nothing
      if (analyticsObject.count) {
        return analyticsObject;
      }

      var sanitizedAnalyticsObject = {
        headers: [],
        metaData: {
          dimensions: {},
          names: {},
          dx: [],
          pe: [],
          ou: [],
          co: []
        },
        rows: []
      };

      if (analyticsObject) {
        /**
         * Check headers
         */
        if (analyticsObject.headers) {
          analyticsObject.headers.forEach(function (header) {
            try {
              var newHeader = header;
              sanitizedAnalyticsObject.headers.push(newHeader);
            } catch (e) {
              console.warn('Invalid header object');
            }
          });
        }
        /**
         * Check metaData
         */


        if (analyticsObject.metaData) {
          try {
            var sanitizedMetadata = this.getSanitizedAnalyticsMetadata(analyticsObject.metaData, preferNormalStructure);
            sanitizedAnalyticsObject.metaData = sanitizedMetadata;
          } catch (e) {
            console.warn('Invalid metadata object');
          }
        }
        /**
         * Check rows
         */


        if (analyticsObject.rows) {
          sanitizedAnalyticsObject.rows = analyticsObject.rows;
        }
      }

      sanitizedAnalyticsObject.height = analyticsObject.height;
      sanitizedAnalyticsObject.width = analyticsObject.width;
      return new AnalyticsObject(sanitizedAnalyticsObject);
    }
    /**
     * Standardizes the analytics metadata object
     *
     * @param analyticMetadata - The analytics metadata object
     * @param preferNormalStructure - Whether to prefer the old or new analytics structure
     * @returns {Object}
     */

  }, {
    key: "getSanitizedAnalyticsMetadata",
    value: function getSanitizedAnalyticsMetadata(analyticMetadata, preferNormalStructure) {
      var sanitizedMetadata = {
        dimensions: {},
        names: {},
        dx: [],
        pe: [],
        ou: [],
        co: []
      };

      if (analyticMetadata) {
        if (analyticMetadata.ouHierarchy) {
          sanitizedMetadata.ouHierarchy = analyticMetadata.ouHierarchy;
        }
        /**
         * Get metadata names
         */


        if (analyticMetadata.names) {
          sanitizedMetadata.names = analyticMetadata.names;
        } else if (analyticMetadata.items) {
          var metadataNames = {};

          for (var metadataItemKey in analyticMetadata.items) {
            metadataNames[metadataItemKey] = analyticMetadata.items[metadataItemKey].name;
          }

          sanitizedMetadata['names'] = metadataNames;
        }
        /**
         * Get metadata dimensions
         */


        if (analyticMetadata.dimensions) {
          if (!preferNormalStructure) {
            sanitizedMetadata['dimensions'] = analyticMetadata.dimensions;
          } else {
            delete sanitizedMetadata.dimensions;
            sanitizedMetadata.dx = analyticMetadata.dimensions.dx;
            sanitizedMetadata.ou = analyticMetadata.dimensions.ou;
            sanitizedMetadata.pe = analyticMetadata.dimensions.pe;
            sanitizedMetadata.co = analyticMetadata.dimensions.co;
          }
        } else {
          var metadataDimensions = {};

          for (var metadataKey in analyticMetadata.dimensions) {
            if (analyticMetadata.hasOwnProperty(metadataKey)) {
              if (metadataKey !== 'names') {
                metadataDimensions[metadataKey] = analyticMetadata.dimensions[metadataKey];
              }
            }
          }

          if (!preferNormalStructure) {
            sanitizedMetadata['dimensions'] = metadataDimensions;
          } else {
            sanitizedMetadata.dx = metadataDimensions.dx;
            sanitizedMetadata.ou = metadataDimensions.ou;
            sanitizedMetadata.pe = metadataDimensions.pe;
            sanitizedMetadata.co = metadataDimensions.co;
          }
        }
      }

      return sanitizedMetadata;
    }
    /**
     * Gets the url for fetching
     * @returns {string}
     */

  }, {
    key: "url",
    get: function get() {
      return 'analytics?' + this._urlParameters;
    }
  }]);

  return Analytics;
}(_fetcher.Fetcher);

exports.Analytics = Analytics;

/***/ }),

/***/ "./src/impl/organisation-unit.js":
/*!***************************************!*\
  !*** ./src/impl/organisation-unit.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrganisationUnit = void 0;

var _identifiableObject = __webpack_require__(/*! ../core/identifiable-object */ "./src/core/identifiable-object.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Represents the fetcher for the organisation unit
 *
 * @extends IdentifiableObject
 */
var OrganisationUnit =
/*#__PURE__*/
function (_IdentifiableObject) {
  _inherits(OrganisationUnit, _IdentifiableObject);

  function OrganisationUnit() {
    _classCallCheck(this, OrganisationUnit);

    return _possibleConstructorReturn(this, (OrganisationUnit.__proto__ || Object.getPrototypeOf(OrganisationUnit)).apply(this, arguments));
  }

  _createClass(OrganisationUnit, [{
    key: "name",

    /**
     * Gets the name for fetching the identifiable object
     * @returns {string}
     */
    get: function get() {
      return 'organisationUnits';
    }
  }]);

  return OrganisationUnit;
}(_identifiableObject.IdentifiableObject);

exports.OrganisationUnit = OrganisationUnit;

/***/ }),

/***/ "./src/impl/sql-view.js":
/*!******************************!*\
  !*** ./src/impl/sql-view.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SQLViewData = void 0;

var _fetcher = __webpack_require__(/*! ../core/fetcher */ "./src/core/fetcher.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Represents a fetcher to load sql view data
 *
 * @extends Fetcher
 */
var SQLViewData =
/*#__PURE__*/
function (_Fetcher) {
  _inherits(SQLViewData, _Fetcher);

  /**
   * Creates the SQLViewData Instance
   * @param id
   */
  function SQLViewData(id) {
    var _this;

    _classCallCheck(this, SQLViewData);

    _this = _possibleConstructorReturn(this, (SQLViewData.__proto__ || Object.getPrototypeOf(SQLViewData)).call(this));
    _this._id = id;
    return _this;
  }
  /**
   * Gets the url for fetching
   * @returns {string}
   */


  _createClass(SQLViewData, [{
    key: "url",
    get: function get() {
      var url = 'sqlViews/' + this._id + '/data.json';
      return url;
    }
  }]);

  return SQLViewData;
}(_fetcher.Fetcher);

exports.SQLViewData = SQLViewData;

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

var _analytics = __webpack_require__(/*! ./impl/analytics.js */ "./src/impl/analytics.js");

var _sqlView = __webpack_require__(/*! ./impl/sql-view.js */ "./src/impl/sql-view.js");

var _organisationUnit = __webpack_require__(/*! ./impl/organisation-unit.js */ "./src/impl/organisation-unit.js");

var _progressPromise = _interopRequireDefault(__webpack_require__(/*! progress-promise */ "./node_modules/progress-promise/index.js"));

var _runner = __webpack_require__(/*! ./core/runner.js */ "./src/core/runner.js");

var _processor = __webpack_require__(/*! ./core/processor */ "./src/core/processor.js");

var _multiFetcher = __webpack_require__(/*! ./core/multi-fetcher */ "./src/core/multi-fetcher.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This is the main holder for the functionalities of the function
 * @type {{Promise: ProgressPromise, Analytics: Analytics,
  *   AnalyticsObject: AnalyticsObject, AnalyticsHeaders: AnalyticsHeaders,
  *   OrganisationUnit: OrganisationUnit, SQLViewData: SQLViewData,
  *   Runner: Runner, Dependency: Dependency, MultiFetcher: MultiFetcher,
  *   all: (function(Fetcher[])), init: (function(*=))}
  * }
 */
var Fn = {
  Promise: _progressPromise.default,
  Analytics: _analytics.Analytics,
  AnalyticsObject: _analytics.AnalyticsObject,
  AnalyticsHeaders: _analytics.AnalyticsHeaders,
  OrganisationUnit: _organisationUnit.OrganisationUnit,
  SQLViewData: _sqlView.SQLViewData,
  Runner: _runner.Runner,
  Dependency: _processor.Dependency,
  MultiFetcher: _multiFetcher.MultiFetcher,

  /**
   * Adds multiple fetchers in queue for execution.
   *
   * @param {Fetcher[]} fetchers - The fethers is an array of the fetchers
   * @returns {ProgressPromise} - Progress Promise for fetching the various fetchers
   * @example
   * Fn.all([new Fn.Analytics(), new Fn.OrganisationUnit()]);
   */
  all: function all(fetchers) {
    return new _multiFetcher.MultiFetcher(fetchers);
  },

  /**
   * Configures the running environment parameters
   *
   * @param {Object} configuration - The fethers is an array of the fetchers
   * @returns {ProgressPromise} - Progress Promise for fetching the various fetchers
   * @example
   * Fn.all({baseUrl:''});
   */
  init: function init(config) {
    _runner.Runner.initiateRunner(config);
  }
};
exports.Fn = Fn;

if (typeof window !== 'undefined') {
  window.Fn = Fn;
}

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3Mvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J0b2EuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9ub2RlX21vZHVsZXMvcHJvZ3Jlc3MtcHJvbWlzZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9zcmMvY29yZS9mZXRjaGVyLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL3NyYy9jb3JlL2lkZW50aWZpYWJsZS1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vc3JjL2NvcmUvbXVsdGktZmV0Y2hlci5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9zcmMvY29yZS9wcm9jZXNzb3IuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vc3JjL2NvcmUvcnVubmVyLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL3NyYy9pbXBsL2FuYWx5dGljcy5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9zcmMvaW1wbC9vcmdhbmlzYXRpb24tdW5pdC5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9zcmMvaW1wbC9zcWwtdmlldy5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiRmV0Y2hlciIsInBhcmFtZXRlcnMiLCJnZXRSZXN1bHRzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJwcm9taXNlcyIsImRlcGVuZGVuY2llcyIsIm1hcCIsImRlcGVuZGVuY3kiLCJwcm9jZXNzb3IiLCJhbGwiLCJ1cmwiLCJrZXkyIiwiRXJyb3IiLCJJZGVudGlmaWFibGVPYmplY3QiLCJfZmlsdGVycyIsInJpZ2h0Iiwib3BlcmF0b3IiLCJsZWZ0IiwicHVzaCIsIl91cmxQYXJhbWV0ZXJzIiwiZmlsdGVyIiwibmFtZSIsIk11bHRpRmV0Y2hlciIsImZldGNoZXJzIiwiX2ZldGNoZXJzIiwiZ2V0QWxsUmVzdWx0cyIsIkRlcGVuZGVuY3kiLCJwcm9jZXNzIiwiUHJvY2Vzc29yIiwicG9zdFByb2Nlc3NvcnMiLCJsZW5ndGgiLCJjYWxsYmFjayIsIl9yZXN1bHRzIiwiZGF0YSIsImRhdGFUb1Byb2Nlc3MiLCJfaW5zdGFuY2UiLCJSdW5uZXIiLCJmZXRjaGVyIiwicmVzb2x2ZSIsInJlamVjdCIsImVycm9yIiwiY29uZmlnIiwiYmFzZVVybCIsIm1ldGhvZCIsImFkYXB0ZXIiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiYXV0aCIsInJlcXVlc3QiLCJ0aGVuIiwicmVzdWx0cyIsInBlcmZvcm1Qb3N0UHJvY2VzcyIsImVyciIsInByb2dyZXNzIiwiaGFzRGVwZW5kZW5jaWVzIiwiZ2V0RGVwZW5kZWN5RmV0Y2hSZXN1bHRzIiwicGVyZm9ybVByZVByb2Nlc3MiLCJfZmV0Y2giLCJjYXRjaCIsImNvbnNvbGUiLCJsb2ciLCJtdWx0aWZldGNoZXIiLCJjb25maWd1cmF0aW9ucyIsImluc3RhbmNlIiwiQW5hbHl0aWNzSGVhZGVyIiwiQW5hbHl0aWNzSGVhZGVycyIsInNldFByb3RvdHlwZU9mIiwiY3JlYXRlIiwicHJvdG90eXBlIiwiaWQiLCJyZXR1cm5IZWFkZXIiLCJoZWFkZXIiLCJpbmRleCIsImdldEhlYWRlciIsIkFycmF5IiwiQW5hbHl0aWNzT2JqZWN0IiwiYW5hbHl0aWNzT2JqZWN0IiwiX2RhdGEiLCJoZWFkZXJzIiwibWV0YURhdGEiLCJyb3dzIiwiaGVpZ2h0Iiwid2lkdGgiLCJBbmFseXRpY3MiLCJvbGRBbmFseXRpY3MiLCJwb3N0UHJvY2VzcyIsInN0YW5kYXJkaXplQW5hbHl0aWNzIiwiZHgiLCJwZSIsIm91IiwicHJlZmVyTm9ybWFsU3RydWN0dXJlIiwiY291bnQiLCJzYW5pdGl6ZWRBbmFseXRpY3NPYmplY3QiLCJkaW1lbnNpb25zIiwibmFtZXMiLCJjbyIsIm5ld0hlYWRlciIsImUiLCJ3YXJuIiwic2FuaXRpemVkTWV0YWRhdGEiLCJnZXRTYW5pdGl6ZWRBbmFseXRpY3NNZXRhZGF0YSIsImFuYWx5dGljTWV0YWRhdGEiLCJvdUhpZXJhcmNoeSIsIml0ZW1zIiwibWV0YWRhdGFOYW1lcyIsIm1ldGFkYXRhSXRlbUtleSIsIm1ldGFkYXRhRGltZW5zaW9ucyIsIm1ldGFkYXRhS2V5IiwiaGFzT3duUHJvcGVydHkiLCJPcmdhbmlzYXRpb25Vbml0IiwiU1FMVmlld0RhdGEiLCJfaWQiLCJGbiIsIlByb21pc2UiLCJpbml0IiwiaW5pdGlhdGVSdW5uZXIiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUMsT0FBTztBQUMxQztBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUyxHQUFHLFNBQVM7QUFDNUMsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM5U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNwQkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNB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bkM7QUFFQSxhQUFPckcsR0FBUDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUJIOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7OztBQVNBLElBQUlzRyxFQUFFLEdBQUc7QUFDUEMsU0FBTywwQkFEQTtBQUVQOUIsV0FBUyxzQkFGRjtBQUdQUixpQkFBZSw0QkFIUjtBQUlQVixrQkFBZ0IsNkJBSlQ7QUFLUDRDLGtCQUFnQixvQ0FMVDtBQU1QQyxhQUFXLHNCQU5KO0FBT1AxRSxRQUFNLGdCQVBDO0FBUVBWLFlBQVUsdUJBUkg7QUFTUEosY0FBWSw0QkFUTDs7QUFVUDs7Ozs7Ozs7QUFRQWIsS0FBRyxFQUFFLGFBQUNjLFFBQUQsRUFBYztBQUNqQixXQUFPLCtCQUFpQkEsUUFBakIsQ0FBUDtBQUNELEdBcEJNOztBQXFCUDs7Ozs7Ozs7QUFRQTJGLE1BQUksRUFBRSxjQUFDekUsTUFBRCxFQUFVO0FBQ2QsbUJBQU8wRSxjQUFQLENBQXNCMUUsTUFBdEI7QUFDRDtBQS9CTSxDQUFUOzs7QUFrQ0EsSUFBSSxPQUFPMkUsTUFBUCxLQUFrQixXQUF0QixFQUFtQztBQUNqQ0EsUUFBTSxDQUFDSixFQUFQLEdBQVlBLEVBQVo7QUFDRCxDIiwiZmlsZSI6ImZ1bmN0aW9uLWFuYWx5dGljcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiZnVuY3Rpb24tYW5hbHl0aWNzXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImZ1bmN0aW9uLWFuYWx5dGljc1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJmdW5jdGlvbi1hbmFseXRpY3NcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3BhcnNlSGVhZGVycycpO1xudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc1VSTFNhbWVPcmlnaW4nKTtcbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvY3JlYXRlRXJyb3InKTtcbnZhciBidG9hID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5idG9hICYmIHdpbmRvdy5idG9hLmJpbmQod2luZG93KSkgfHwgcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J0b2EnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB2YXIgbG9hZEV2ZW50ID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG4gICAgdmFyIHhEb21haW4gPSBmYWxzZTtcblxuICAgIC8vIEZvciBJRSA4LzkgQ09SUyBzdXBwb3J0XG4gICAgLy8gT25seSBzdXBwb3J0cyBQT1NUIGFuZCBHRVQgY2FsbHMgYW5kIGRvZXNuJ3QgcmV0dXJucyB0aGUgcmVzcG9uc2UgaGVhZGVycy5cbiAgICAvLyBET04nVCBkbyB0aGlzIGZvciB0ZXN0aW5nIGIvYyBYTUxIdHRwUmVxdWVzdCBpcyBtb2NrZWQsIG5vdCBYRG9tYWluUmVxdWVzdC5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICd0ZXN0JyAmJlxuICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB3aW5kb3cuWERvbWFpblJlcXVlc3QgJiYgISgnd2l0aENyZWRlbnRpYWxzJyBpbiByZXF1ZXN0KSAmJlxuICAgICAgICAhaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSB7XG4gICAgICByZXF1ZXN0ID0gbmV3IHdpbmRvdy5YRG9tYWluUmVxdWVzdCgpO1xuICAgICAgbG9hZEV2ZW50ID0gJ29ubG9hZCc7XG4gICAgICB4RG9tYWluID0gdHJ1ZTtcbiAgICAgIHJlcXVlc3Qub25wcm9ncmVzcyA9IGZ1bmN0aW9uIGhhbmRsZVByb2dyZXNzKCkge307XG4gICAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7fTtcbiAgICB9XG5cbiAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkIHx8ICcnO1xuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcblxuICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGVcbiAgICByZXF1ZXN0W2xvYWRFdmVudF0gPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0IHx8IChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQgJiYgIXhEb21haW4pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIWNvbmZpZy5yZXNwb25zZVR5cGUgfHwgY29uZmlnLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIC8vIElFIHNlbmRzIDEyMjMgaW5zdGVhZCBvZiAyMDQgKGh0dHBzOi8vZ2l0aHViLmNvbS9heGlvcy9heGlvcy9pc3N1ZXMvMjAxKVxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzID09PSAxMjIzID8gMjA0IDogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzID09PSAxMjIzID8gJ05vIENvbnRlbnQnIDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnLCBudWxsLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcigndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICB2YXIgY29va2llcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb29raWVzJyk7XG5cbiAgICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgICAgdmFyIHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgICAgdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzW2NvbmZpZy54c3JmSGVhZGVyTmFtZV0gPSB4c3JmVmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMsIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0RGF0YSA9PT0gJ3VuZGVmaW5lZCcgJiYga2V5LnRvTG93ZXJDYXNlKCkgPT09ICdjb250ZW50LXR5cGUnKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1trZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSBhZGQgaGVhZGVyIHRvIHRoZSByZXF1ZXN0XG4gICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cbiAgICAgICAgLy8gQnV0LCB0aGlzIGNhbiBiZSBzdXBwcmVzc2VkIGZvciAnanNvbicgdHlwZSBhcyBpdCBjYW4gYmUgcGFyc2VkIGJ5IGRlZmF1bHQgJ3RyYW5zZm9ybVJlc3BvbnNlJyBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7XG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVxdWVzdERhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZSh1dGlscy5tZXJnZShkZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcblxuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vLi4vZGVmYXVsdHMnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSB1dGlscy5tZXJnZSh7XG4gICAgICB1cmw6IGFyZ3VtZW50c1swXVxuICAgIH0sIGFyZ3VtZW50c1sxXSk7XG4gIH1cblxuICBjb25maWcgPSB1dGlscy5tZXJnZShkZWZhdWx0cywge21ldGhvZDogJ2dldCd9LCB0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuXG4gIC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmxcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVuaGFuY2VFcnJvciA9IHJlcXVpcmUoJy4vZW5oYW5jZUVycm9yJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBTdXBwb3J0IGJhc2VVUkwgY29uZmlnXG4gIGlmIChjb25maWcuYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChjb25maWcudXJsKSkge1xuICAgIGNvbmZpZy51cmwgPSBjb21iaW5lVVJMcyhjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gIH1cblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzIHx8IHt9XG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cbiAgZXJyb3IucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gIHJldHVybiBlcnJvcjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICB2YXIgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIC8vIE5vdGU6IHN0YXR1cyBpcyBub3QgZXhwb3NlZCBieSBYRG9tYWluUmVxdWVzdFxuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChjcmVhdGVFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICBudWxsLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gYnRvYSBwb2x5ZmlsbCBmb3IgSUU8MTAgY291cnRlc3kgaHR0cHM6Ly9naXRodWIuY29tL2RhdmlkY2hhbWJlcnMvQmFzZTY0LmpzXG5cbnZhciBjaGFycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSc7XG5cbmZ1bmN0aW9uIEUoKSB7XG4gIHRoaXMubWVzc2FnZSA9ICdTdHJpbmcgY29udGFpbnMgYW4gaW52YWxpZCBjaGFyYWN0ZXInO1xufVxuRS5wcm90b3R5cGUgPSBuZXcgRXJyb3I7XG5FLnByb3RvdHlwZS5jb2RlID0gNTtcbkUucHJvdG90eXBlLm5hbWUgPSAnSW52YWxpZENoYXJhY3RlckVycm9yJztcblxuZnVuY3Rpb24gYnRvYShpbnB1dCkge1xuICB2YXIgc3RyID0gU3RyaW5nKGlucHV0KTtcbiAgdmFyIG91dHB1dCA9ICcnO1xuICBmb3IgKFxuICAgIC8vIGluaXRpYWxpemUgcmVzdWx0IGFuZCBjb3VudGVyXG4gICAgdmFyIGJsb2NrLCBjaGFyQ29kZSwgaWR4ID0gMCwgbWFwID0gY2hhcnM7XG4gICAgLy8gaWYgdGhlIG5leHQgc3RyIGluZGV4IGRvZXMgbm90IGV4aXN0OlxuICAgIC8vICAgY2hhbmdlIHRoZSBtYXBwaW5nIHRhYmxlIHRvIFwiPVwiXG4gICAgLy8gICBjaGVjayBpZiBkIGhhcyBubyBmcmFjdGlvbmFsIGRpZ2l0c1xuICAgIHN0ci5jaGFyQXQoaWR4IHwgMCkgfHwgKG1hcCA9ICc9JywgaWR4ICUgMSk7XG4gICAgLy8gXCI4IC0gaWR4ICUgMSAqIDhcIiBnZW5lcmF0ZXMgdGhlIHNlcXVlbmNlIDIsIDQsIDYsIDhcbiAgICBvdXRwdXQgKz0gbWFwLmNoYXJBdCg2MyAmIGJsb2NrID4+IDggLSBpZHggJSAxICogOClcbiAgKSB7XG4gICAgY2hhckNvZGUgPSBzdHIuY2hhckNvZGVBdChpZHggKz0gMyAvIDQpO1xuICAgIGlmIChjaGFyQ29kZSA+IDB4RkYpIHtcbiAgICAgIHRocm93IG5ldyBFKCk7XG4gICAgfVxuICAgIGJsb2NrID0gYmxvY2sgPDwgOCB8IGNoYXJDb2RlO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnRvYTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lNDAvZ2ksICdAJykuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgY29va2llLnB1c2gobmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuXG4gICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgfSxcblxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgfVxuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGRcXCtcXC1cXC5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxuICAvLyB3aGV0aGVyIHRoZSByZXF1ZXN0IFVSTCBpcyBvZiB0aGUgc2FtZSBvcmlnaW4gYXMgY3VycmVudCBsb2NhdGlvbi5cbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgdmFyIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIHZhciBvcmlnaW5VUkw7XG5cbiAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgfVxuXG4gICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcblxuICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcbiAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXG4gICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICB9O1xuICAgIH1cblxuICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbihyZXF1ZXN0VVJMKSB7XG4gICAgICB2YXIgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICB9O1xuICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09IG5vcm1hbGl6ZWROYW1lICYmIG5hbWUudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8vIEhlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG52YXIgaWdub3JlRHVwbGljYXRlT2YgPSBbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXTtcblxuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZUhlYWRlcnMoaGVhZGVycykge1xuICB2YXIgcGFyc2VkID0ge307XG4gIHZhciBrZXk7XG4gIHZhciB2YWw7XG4gIHZhciBpO1xuXG4gIGlmICghaGVhZGVycykgeyByZXR1cm4gcGFyc2VkOyB9XG5cbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cigwLCBpKSkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKGkgKyAxKSk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2YuaW5kZXhPZihrZXkpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gKHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gOiBbXSkuY29uY2F0KFt2YWxdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcGFyc2VkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIGlzQnVmZmVyID0gcmVxdWlyZSgnaXMtYnVmZmVyJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW1cbn07XG4iLCIvKiFcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXJcbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIndXNlIHN0cmljdCc7XG4vLyBGYWxsYmFjayBmb3IgZW5naW5lcyB0aGF0IGRvbid0IHN1cHBvcnQgU3ltYm9sXG5jb25zdCBMSVNURU5FUlMgPSBTeW1ib2wgPyBTeW1ib2woKSA6ICdfX2xpc3RlbmVycyc7XG5cbmNsYXNzIFByb2dyZXNzUHJvbWlzZSBleHRlbmRzIFByb21pc2Uge1xuICBjb25zdHJ1Y3RvcihleGVjdXRvcikge1xuICAgIHN1cGVyKChyZXNvbHZlLCByZWplY3QpID0+IGV4ZWN1dG9yKHJlc29sdmUsIHJlamVjdCxcbiAgICAgIC8vIFBhc3MgbWV0aG9kIGZvciBwYXNzaW5nIHByb2dyZXNzIHRvIGxpc3RlbmVyXG4gICAgICB2YWx1ZSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNbTElTVEVORVJTXS5mb3JFYWNoKGxpc3RlbmVyID0+IGxpc3RlbmVyKHZhbHVlKSk7XG4gICAgICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgdGhpc1tMSVNURU5FUlNdID0gW107XG4gIH1cbiAgcHJvZ3Jlc3MoaGFuZGxlcikge1xuICAgIGlmKHR5cGVvZiBoYW5kbGVyICE9PSAnZnVuY3Rpb24nKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQUk9HUkVTU19SRVFVSVJFU19GVU5DVElPTicpO1xuICAgIHRoaXNbTElTVEVORVJTXS5wdXNoKGhhbmRsZXIpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHN0YXRpYyBhbGwocHJvbWlzZXMpIHtcbiAgICBjb25zdCByZXN1bHRzID0gbmV3IEFycmF5KHByb21pc2VzLmxlbmd0aCk7XG4gICAgY29uc3QgbGVuZ3RoID0gcHJvbWlzZXMubGVuZ3RoO1xuICAgIGxldCByZXNvbHZlQ291bnQgPSAwO1xuICAgIHJldHVybiBuZXcgUHJvZ3Jlc3NQcm9taXNlKChyZXNvbHZlLCByZWplY3QsIHByb2dyZXNzKSA9PiB7XG4gICAgICBwcm9taXNlcy5mb3JFYWNoKChwcm9taXNlLCBpbmRleCkgPT4ge1xuICAgICAgICBwcm9taXNlLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICByZXN1bHRzW2luZGV4XSA9IHJlc3VsdDtcbiAgICAgICAgICByZXN1bHRzLnByb3BvcnRpb24gPSArK3Jlc29sdmVDb3VudCAvIGxlbmd0aDtcbiAgICAgICAgICBwcm9ncmVzcyhyZXN1bHRzKTtcbiAgICAgICAgICBpZihyZXNvbHZlQ291bnQgPT09IGxlbmd0aCkgcmVzb2x2ZShyZXN1bHRzKTtcbiAgICAgICAgfSkuY2F0Y2gocmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIHN0YXRpYyBzZXF1ZW5jZShpbnB1dHMsIGhhbmRsZXIpIHtcbiAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgY29uc3QgbGVuZ3RoID0gaW5wdXRzLmxlbmd0aDtcbiAgICBsZXQgcmVzb2x2ZUNvdW50ID0gMDtcbiAgICByZXR1cm4gbmV3IFByb2dyZXNzUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0LCBwcm9ncmVzcykgPT4ge1xuICAgICAgZnVuY3Rpb24gaW52b2tlTmV4dCgpIHtcbiAgICAgICAgaGFuZGxlci5jYWxsKG51bGwsIGlucHV0c1tyZXN1bHRzLmxlbmd0aF0pXG4gICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgcmVzdWx0cy5wcm9wb3J0aW9uID0gKytyZXNvbHZlQ291bnQgLyBsZW5ndGg7XG4gICAgICAgICAgICBwcm9ncmVzcyhyZXN1bHRzKTtcbiAgICAgICAgICAgIGlmKHJlc3VsdHMubGVuZ3RoID09PSBsZW5ndGgpIHJlc29sdmUocmVzdWx0cyk7XG4gICAgICAgICAgICBlbHNlIGludm9rZU5leHQoKTtcbiAgICAgICAgICB9KS5jYXRjaChyZWplY3QpOztcbiAgICAgIH1cbiAgICAgIGludm9rZU5leHQoKTtcbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2dyZXNzUHJvbWlzZTtcblxuIiwiaW1wb3J0IHsgUnVubmVyIH0gZnJvbSAnLi9ydW5uZXInO1xuaW1wb3J0IHsgUHJvY2Vzc29yIH0gZnJvbSAnLi9wcm9jZXNzb3InO1xuaW1wb3J0IFByb2dyZXNzUHJvbWlzZSBmcm9tICdwcm9ncmVzcy1wcm9taXNlJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBmZXRjaGVyIHByb2Nlc3NcbiAqQGV4dGVuZHMgUHJvY2Vzc29yXG4gKi9cbmV4cG9ydCBjbGFzcyBGZXRjaGVyIGV4dGVuZHMgUHJvY2Vzc29yIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBmZXRoY2VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBVUkwgUGFyYW1ldGVyc1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZ2V0IF91cmxQYXJhbWV0ZXJzKCkge1xuICAgIGxldCB1cmwgPSAnJztcblxuICAgIE9iamVjdC5rZXlzKHRoaXMucGFyYW1ldGVycykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAodXJsICE9PSAnJykge1xuICAgICAgICB1cmwgKz0gJyYnO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB0aGlzLnBhcmFtZXRlcnNba2V5XSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdXJsICs9IGtleSArICc9JyArIHRoaXMucGFyYW1ldGVyc1trZXldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5wYXJhbWV0ZXJzW2tleV0pLmZvckVhY2goKGtleTIpID0+IHtcbiAgICAgICAgICBpZiAodXJsICE9PSAnJykge1xuICAgICAgICAgICAgdXJsICs9ICcmJztcbiAgICAgICAgICB9XG4gICAgICAgICAgdXJsICs9IGtleSArICc9JyArIGtleTIgKyAnOicgKyB0aGlzLnBhcmFtZXRlcnNba2V5XVtrZXkyXTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB1cmxcbiAgICogQHRocm93cyBJbXBsZW1lbnRhdGlvbiBFcnJvclxuICAgKi9cbiAgZ2V0IHVybCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Nob3VsZCBpbXBsZW1lbnQgdXJsIGdlbmVyYXRpb24nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBydW5uaW5nIHByb2Nlc3Mgc3RhcnRlZFxuICAgKiBAcmV0dXJucyB7UHJvZ3Jlc3NQcm9taXNlfVxuICAgKi9cbiAgZ2V0KCkge1xuICAgIHJldHVybiAobmV3IFJ1bm5lcigpKS5nZXRSZXN1bHRzKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBwYXJlbWV0ZXJzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbWV0ZXJzXG4gICAqIEByZXR1cm5zIHtGZXRjaGVyfVxuICAgKi9cbiAgc2V0UGFyYW1ldGVycyhwYXJhbWV0ZXJzKSB7XG4gICAgT2JqZWN0LmtleXMocGFyYW1ldGVycykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICB0aGlzLnBhcmFtZXRlcnNba2V5XSA9IHBhcmFtZXRlcnNba2V5XTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgRGVwZW5kZW5jeSByZXN1bHRzXG4gICAqIEByZXR1cm5zIHtQcm9ncmVzc1Byb21pc2V9XG4gICAqL1xuICBnZXREZXBlbmRlY3lGZXRjaFJlc3VsdHMoKSB7XG4gICAgY29uc3QgcHJvbWlzZXMgPSB0aGlzLmRlcGVuZGVuY2llcy5tYXAoKGRlcGVuZGVuY3kpID0+IHtcbiAgICAgIHJldHVybiAobmV3IFJ1bm5lcigpKS5nZXRSZXN1bHRzKGRlcGVuZGVuY3kucHJvY2Vzc29yKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBQcm9ncmVzc1Byb21pc2UuYWxsKHByb21pc2VzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRmV0Y2hlciB9IGZyb20gJy4uL2NvcmUvZmV0Y2hlcic7XG5cbmV4cG9ydCBjbGFzcyBJZGVudGlmaWFibGVPYmplY3QgZXh0ZW5kcyBGZXRjaGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9maWx0ZXJzID0gW107XG4gIH1cbiAgZ2V0IG5hbWUoKSB7XG4gICAgdGhyb3cgRXJyb3IoJ09iamVjdCBuYW1lIG5vdCBpbXBsZW1lbnRlZCcpO1xuICB9XG4gIHdoZXJlKHJpZ2h0LCBvcGVyYXRvciwgbGVmdCkge1xuICAgIHRoaXMuX2ZpbHRlcnMucHVzaCh7XG4gICAgICByaWdodDogcmlnaHQsXG4gICAgICBvcGVyYXRvcjogb3BlcmF0b3IsXG4gICAgICBsZWZ0OiBsZWZ0XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQgdXJsKCkge1xuICAgIHZhciB1cmwgPSB0aGlzLl91cmxQYXJhbWV0ZXJzO1xuXG4gICAgdGhpcy5fZmlsdGVycy5mb3JFYWNoKChmaWx0ZXIpID0+IHtcbiAgICAgIHVybCArPSAnZmlsdGVyPScgKyBmaWx0ZXIucmlnaHQ7XG4gICAgICBpZiAoZmlsdGVyLm9wZXJhdG9yID09PSAnPT0nKSB7XG4gICAgICAgIHVybCArPSAnOmVxOicgKyBmaWx0ZXIubGVmdDtcbiAgICAgIH0gZWxzZSBpZiAoZmlsdGVyLm9wZXJhdG9yID09PSAnPCcpIHtcbiAgICAgICAgdXJsICs9ICc6bHQ6JyArIGZpbHRlci5sZWZ0O1xuICAgICAgfSBlbHNlIGlmIChmaWx0ZXIub3BlcmF0b3IgPT09ICc8PScpIHtcbiAgICAgICAgdXJsICs9ICc6bGU6JyArIGZpbHRlci5sZWZ0O1xuICAgICAgfSBlbHNlIGlmIChmaWx0ZXIub3BlcmF0b3IgPT09ICc+Jykge1xuICAgICAgICB1cmwgKz0gJzpndDonICsgZmlsdGVyLmxlZnQ7XG4gICAgICB9IGVsc2UgaWYgKGZpbHRlci5vcGVyYXRvciA9PT0gJz49Jykge1xuICAgICAgICB1cmwgKz0gJzpnZTonICsgZmlsdGVyLmxlZnQ7XG4gICAgICB9IGVsc2UgaWYgKGZpbHRlci5vcGVyYXRvciA9PT0gJzw+Jykge1xuICAgICAgICB1cmwgKz0gJzohZXE6JyArIGZpbHRlci5sZWZ0O1xuICAgICAgfSBlbHNlIGlmIChmaWx0ZXIub3BlcmF0b3IgPT09ICdpbicgfHwgZmlsdGVyLm9wZXJhdG9yID09PSAnIWluJykge1xuICAgICAgICB1cmwgKz0gJzonICsgZmlsdGVyLm9wZXJhdG9yICsgJzpbJyArIGZpbHRlci5sZWZ0ICsgJ10nO1xuICAgICAgfSBlbHNlIGlmICghZmlsdGVyLmxlZnQpIHtcbiAgICAgICAgdXJsICs9ICc6JyArIGZpbHRlci5vcGVyYXRvcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVybCArPSAnOicgKyBmaWx0ZXIub3BlcmF0b3IgKyAnOicgKyBmaWx0ZXIubGVmdDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5uYW1lICsgJy5qc29uPycgKyB1cmw7XG4gIH1cbn1cbiIsImltcG9ydCB7IFJ1bm5lciB9IGZyb20gJy4vcnVubmVyJztcbmltcG9ydCB7IEZldGNoZXIgfSBmcm9tICcuL2ZldGNoZXInO1xuXG5leHBvcnQgY2xhc3MgTXVsdGlGZXRjaGVyIGV4dGVuZHMgRmV0Y2hlciB7XG4gIGNvbnN0cnVjdG9yKGZldGNoZXJzKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9mZXRjaGVycyA9IGZldGNoZXJzO1xuICB9XG4gIGdldCBmZXRjaGVycygpIHtcbiAgICByZXR1cm4gdGhpcy5fZmV0Y2hlcnM7XG4gIH1cblxuICBnZXQoKSB7XG4gICAgcmV0dXJuIChuZXcgUnVubmVyKCkpLmdldEFsbFJlc3VsdHModGhpcyk7XG4gIH1cbn1cbiIsIi8qKlxuICogVGhpcyBjYWxsYmFjayB0eXBlIGlzIGNhbGxlZCBgcHJvY2Vzc0NhbGxiYWNrYC5cbiAqXG4gKiBAY2FsbGJhY2sgcHJvY2Vzc0NhbGxiYWNrXG4gKiBAcGFyYW0ge09iamVjdH0gcmVzdWx0XG4gKi9cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcHJvY2VzcyBkZXBlbmRlbmN5XG4gKi9cbmV4cG9ydCBjbGFzcyBEZXBlbmRlbmN5IHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZXBlbmRlbmN5IGluc3RhbmNlXG4gICAqIEBwYXJhbSB7UHJvY2Vzc29yfSBwcm9jZXNzb3JcbiAgICogQHBhcmFtIHtwcm9jZXNzQ2FsbGJhY2t9IHByb2Nlc3NcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByb2Nlc3NvciwgcHJvY2Vzcykge1xuICAgIHRoaXMucHJvY2Vzc29yID0gcHJvY2Vzc29yO1xuICAgIHRoaXMucHJvY2VzcyA9IHByb2Nlc3M7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGlzIGlzIHRoZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgcHJvY2Vzc29yXG4gKi9cbmV4cG9ydCBjbGFzcyBQcm9jZXNzb3Ige1xuICAvKipcbiAgICogQ3JlYXRlcyBhIHByb2Nlc3NvclxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wb3N0UHJvY2Vzc29ycyA9IFtdO1xuICAgIHRoaXMuZGVwZW5kZW5jaWVzID0gW107XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHByb2Nlc3NvciBoYXMgZGVwZW5kZW5jaWVzXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaGFzRGVwZW5kZW5jaWVzKCkge1xuICAgIHJldHVybiB0aGlzLmRlcGVuZGVuY2llcy5sZW5ndGggPiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZGVwZW5kZW5jeSB0byB0aGUgcHJvY2Vzc29yXG4gICAqIEBwYXJhbSB7RGVwZW5kZW5jeX0gZGVwZW5kZW5jeVxuICAgKiBAcmV0dXJucyB7UHJvY2Vzc29yfVxuICAgKi9cbiAgcHJlUHJvY2VzcyhkZXBlbmRlbmN5KSB7XG4gICAgdGhpcy5kZXBlbmRlbmNpZXMucHVzaChkZXBlbmRlbmN5KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGNhbGxiYWNrIHByb2Nlc3MgdGhlIG91dHB1dCBwcm9jZXNzXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKiBAcmV0dXJucyB7UHJvY2Vzc29yfVxuICAgKi9cbiAgcG9zdFByb2Nlc3MoY2FsbGJhY2spIHtcbiAgICB0aGlzLnBvc3RQcm9jZXNzb3JzLnB1c2goY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIHByZSBwcm9jZXNzXG4gICAqIEByZXR1cm5zIHtQcm9jZXNzb3J9XG4gICAqL1xuICBwZXJmb3JtUHJlUHJvY2VzcygpIHtcbiAgICB0aGlzLmRlcGVuZGVuY2llcy5mb3JFYWNoKChkZXBlbmRlbmN5KSA9PiB7XG4gICAgICBkZXBlbmRlbmN5LnByb2Nlc3MoZGVwZW5kZW5jeS5wcm9jZXNzb3IuX3Jlc3VsdHMsIHRoaXMpO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIHBvc3QgcHJvY2VzcyBhZnRlciB0aGUgcHJvY2VzcyBoYXMgZW5kZWRcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIHBlcmZvcm1Qb3N0UHJvY2VzcyhkYXRhKSB7XG4gICAgdGhpcy5fcmVzdWx0cyA9IGRhdGE7XG4gICAgbGV0IGRhdGFUb1Byb2Nlc3MgPSBkYXRhO1xuXG4gICAgdGhpcy5wb3N0UHJvY2Vzc29ycy5mb3JFYWNoKChjYWxsYmFjaykgPT4ge1xuICAgICAgZGF0YVRvUHJvY2VzcyA9IGNhbGxiYWNrKGRhdGFUb1Byb2Nlc3MpO1xuICAgIH0pO1xuICAgIHJldHVybiBkYXRhVG9Qcm9jZXNzO1xuICB9XG59XG4iLCJpbXBvcnQgUHJvZ3Jlc3NQcm9taXNlIGZyb20gJ3Byb2dyZXNzLXByb21pc2UnO1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCBodHRwYWRhcHRlciBmcm9tICdheGlvcy9saWIvYWRhcHRlcnMvaHR0cCc7XG5pbXBvcnQgeGhyYWRhcHRlciBmcm9tICdheGlvcy9saWIvYWRhcHRlcnMveGhyJztcbmxldCBfaW5zdGFuY2U7XG5cbi8qKlxuICogUnVubmVyIHJlcHJlc2VudHMgdGhlIHByb2Nlc3Mgd2hpY2ggd2lsbCBzY2hlZHVsZSBhbmQgcnVuIG9wZXJhdGlvbnMgb2YgdGhlIHByb2Nlc3Nlc1xuICovXG5leHBvcnQgY2xhc3MgUnVubmVyIHtcbiAgLyoqXG4gICAqIEluaXRpYXRlcyB0aGUgcnVubmVyIHNpbmdsZXRvbiBpbnN0YW5jZVxuICAgKiBAcGFyYW0gY29uZmlndXJhdGlvbnNcbiAgICovXG4gIHN0YXRpYyBpbml0aWF0ZVJ1bm5lcihjb25maWd1cmF0aW9ucykge1xuICAgIGlmICghUnVubmVyLmluc3RhbmNlKSB7XG4gICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZ3VyYXRpb25zO1xuICAgICAgX2luc3RhbmNlID0gdGhpcztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBSdW5uZXIgaW5zdGFuY2VcbiAgICogQHJldHVybnMge1J1bm5lcn1cbiAgICovXG4gIGdldCBpbnN0YW5jZSgpIHtcbiAgICByZXR1cm4gX2luc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgY29uZmlndXJhdGlvblxuICAgKiBAcGFyYW0gY29uZmlndXJhdGlvbnNcbiAgICovXG4gIHNldCBjb25maWcoY29uZmlndXJhdGlvbnMpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZ3VyYXRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY29uZmlndXJhdGlvbnNcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXQgY29uZmlnKCkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGNhbGxiYWNrIHR5cGUgaXMgY2FsbGVkIGByZXNvbHZlQ2FsbGJhY2tgLlxuICAgKlxuICAgKiBAY2FsbGJhY2sgcmVzb2x2ZUNhbGxiYWNrXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZVJlc3VsdFxuICAgKi9cblxuICAvKipcbiAgICogVGhpcyBjYWxsYmFjayB0eXBlIGlzIGNhbGxlZCBgcmVqZWN0Q2FsbGJhY2tgLlxuICAgKlxuICAgKiBAY2FsbGJhY2sgcmVqZWN0Q2FsbGJhY2tcbiAgICogQHBhcmFtIHtFcnJvcn0gZXJyb3JcbiAgICovXG5cbiAgLyoqXG4gICAqIEZldGNoZXMgdGhlIGRhdGEgZnJvbSB0aGUgZmV0Y2hlclxuICAgKiBAcGFyYW0ge0ZldGNoZXJ9IGZldGNoZXJcbiAgICogQHBhcmFtIHtyZXNvbHZlQ2FsbGJhY2t9IHJlc29sdmVcbiAgICogQHBhcmFtIHtyZWplY3RDYWxsYmFja30gcmVqZWN0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZmV0Y2goZmV0Y2hlciwgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgaWYgKCFfaW5zdGFuY2UpIHtcbiAgICAgIGxldCBlcnJvciA9ICdDb25maWdyYXRpb24gbm90IHNldCBwbGVhc2UgY29uZmlncmUgZnVuY3Rpb24gJyArXG4gICAgICAgICdhbmFseXRpY3MgZWcge2Jhc2VVcmw6XCJkaGlzX2Jhc2VfdXJsXCIsIHVzZXJuYW1lOlwidXNlcm5hbWVcIiwgJyArXG4gICAgICAgICdwYXNzd29yZDpcInBhc3N3b3JkXCJ9JztcblxuICAgICAgdGhyb3cgRXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICB1cmw6IF9pbnN0YW5jZS5jb25maWcuYmFzZVVybCArIGZldGNoZXIudXJsLFxuICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgIGFkYXB0ZXI6IHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyA/IGh0dHBhZGFwdGVyIDogeGhyYWRhcHRlclxuICAgIH07XG5cbiAgICBpZiAoX2luc3RhbmNlLmNvbmZpZy51c2VybmFtZSAmJiBfaW5zdGFuY2UuY29uZmlnLnBhc3N3b3JkKSB7XG4gICAgICBjb25maWcuYXV0aCA9IHtcbiAgICAgICAgdXNlcm5hbWU6IF9pbnN0YW5jZS5jb25maWcudXNlcm5hbWUsXG4gICAgICAgIHBhc3N3b3JkOiBfaW5zdGFuY2UuY29uZmlnLnBhc3N3b3JkXG4gICAgICB9O1xuICAgIH1cbiAgICBheGlvcy5yZXF1ZXN0KGNvbmZpZykudGhlbigocmVzdWx0cykgPT4ge1xuICAgICAgcmVzb2x2ZShmZXRjaGVyLnBlcmZvcm1Qb3N0UHJvY2VzcyhyZXN1bHRzLmRhdGEpKTtcbiAgICB9LCAoZXJyKSA9PiB7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaGVzIGRhdGEgcmVsYXRlZCB0byBhIGZldGNoZXJcbiAgICogQHBhcmFtIHtGZXRjaGVyfSBmZXRjaGVyXG4gICAqIEByZXR1cm5zIHtQcm9ncmVzc1Byb21pc2V9XG4gICAqL1xuICBnZXRSZXN1bHRzKGZldGNoZXIpIHtcbiAgICBpZiAoZmV0Y2hlci5fZmV0Y2hlcnMpIHsgLy8gSWYgaXMgYSBtdWx0aWZldGNoZXJcbiAgICAgIHJldHVybiB0aGlzLmdldEFsbFJlc3VsdHMoZmV0Y2hlcik7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUHJvZ3Jlc3NQcm9taXNlKChyZXNvbHZlLCByZWplY3QsIHByb2dyZXNzKSA9PiB7XG4gICAgICBpZiAoZmV0Y2hlci5oYXNEZXBlbmRlbmNpZXMoKSkge1xuICAgICAgICBmZXRjaGVyLmdldERlcGVuZGVjeUZldGNoUmVzdWx0cygpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGZldGNoZXIucGVyZm9ybVByZVByb2Nlc3MoKTtcbiAgICAgICAgICB0aGlzLl9mZXRjaChmZXRjaGVyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0VycnJycnJycnJycjonLCBlcnIpO1xuICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2ZldGNoKGZldGNoZXIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2hlcyBkYXRhIGZvciBtdWx0aXBsZSBmZXRjaGVyc1xuICAgKiBAcGFyYW0ge011bHRpRmV0Y2hlcn0gbXVsdGlmZXRjaGVyXG4gICAqIEByZXR1cm5zIHtQcm9ncmVzc1Byb21pc2V9XG4gICAqL1xuICBnZXRBbGxSZXN1bHRzKG11bHRpZmV0Y2hlcikge1xuICAgIHJldHVybiBuZXcgUHJvZ3Jlc3NQcm9taXNlKChyZXNvbHZlLCByZWplY3QsIHByb2dyZXNzKSA9PiB7XG4gICAgICBjb25zdCBwcm9taXNlcyA9IG11bHRpZmV0Y2hlci5mZXRjaGVycy5tYXAoKGZldGNoZXIpID0+IChuZXcgUnVubmVyKCkpLmdldFJlc3VsdHMoZmV0Y2hlcikpO1xuXG4gICAgICByZXR1cm4gUHJvZ3Jlc3NQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigocmVzdWx0cykgPT4ge1xuICAgICAgICByZXNvbHZlKG11bHRpZmV0Y2hlci5wZXJmb3JtUG9zdFByb2Nlc3MocmVzdWx0cykpO1xuICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBGZXRjaGVyIH0gZnJvbSAnLi4vY29yZS9mZXRjaGVyJztcblxuLyoqXG4gKiBUaGlzIHJlcHJlc2VudHMgdGhlIEFuYWx5dGljcyBoZWFkZXJcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBBbmFseXRpY3NIZWFkZXIge31cbi8qKlxuICogVGhpcyByZXByZXNlbnRzIHRoZSBBbmFseXRpY3MgSGVhZGVyc1xuICpcbiAqIEBleHRlbmRzIEFycmF5XG4gKi9cbmV4cG9ydCBjbGFzcyBBbmFseXRpY3NIZWFkZXJzIGV4dGVuZHMgQXJyYXkge1xuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgc3VwZXIoLi4uZGF0YSk7XG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIE9iamVjdC5jcmVhdGUoQW5hbHl0aWNzSGVhZGVycy5wcm90b3R5cGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBkYXRhIGFuYWx5dGljcyBoZWFkZXJcbiAgICpcbiAgICogQHJldHVybnMge0FuYWx5dGljc0hlYWRlcn1cbiAgICovXG4gIGdldCBkeCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRIZWFkZXIoJ2R4Jyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgcGVyaW9kIGFuYWx5dGljcyBoZWFkZXJcbiAgICpcbiAgICogQHJldHVybnMge0FuYWx5dGljc0hlYWRlcn1cbiAgICovXG4gIGdldCBwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRIZWFkZXIoJ3BlJyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgb3JnYW5pc2F0aW9uIHVuaXQgYW5hbHl0aWNzIGhlYWRlclxuICAgKlxuICAgKiBAcmV0dXJucyB7QW5hbHl0aWNzSGVhZGVyfVxuICAgKi9cbiAgZ2V0IG91KCkge1xuICAgIHJldHVybiB0aGlzLmdldEhlYWRlcignb3UnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB2YWx1ZSBhbmFseXRpY3MgaGVhZGVyXG4gICAqXG4gICAqIEByZXR1cm5zIHtBbmFseXRpY3NIZWFkZXJ9XG4gICAqL1xuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0SGVhZGVyKCd2YWx1ZScpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGhlYWRlciBvZiBhIHBhcmFtZXRlclxuICAgKiBAcGFyYW0gaWRcbiAgICogQHJldHVybnMge0FuYWx5dGljc0hlYWRlcn1cbiAgICovXG4gIGdldEhlYWRlcihpZCkge1xuICAgIGxldCByZXR1cm5IZWFkZXI7XG5cbiAgICB0aGlzLmZvckVhY2goKGhlYWRlciwgaW5kZXgpID0+IHtcbiAgICAgIGlmIChoZWFkZXIubmFtZSA9PT0gaWQpIHtcbiAgICAgICAgcmV0dXJuSGVhZGVyID0gaGVhZGVyO1xuICAgICAgICByZXR1cm5IZWFkZXIuaW5kZXggPSBpbmRleDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmV0dXJuSGVhZGVyO1xuICB9XG59XG5cbi8qKlxuICogVGhpcyByZXByZXNlbnRzIHRoZSBBbmFseXRpY3MgUmVzdWx0c1xuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEFuYWx5dGljc09iamVjdCB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW5hIEFuYWx5dGljcyBPYmplY3RcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IC0gREhJUyBBbmFseXRpY3Mgb2JqZWN0XG4gICAqL1xuICBjb25zdHJ1Y3RvcihhbmFseXRpY3NPYmplY3QpIHtcbiAgICB0aGlzLl9kYXRhID0gYW5hbHl0aWNzT2JqZWN0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIEFuYWx5dGljcyBIZWFkZXJzIEFycmF5XG4gICAqXG4gICAqIEByZXR1cm5zIHtBbmFseXRpY3NIZWFkZXJzfVxuICAgKi9cbiAgZ2V0IGhlYWRlcnMoKSB7XG4gICAgcmV0dXJuIG5ldyBBbmFseXRpY3NIZWFkZXJzKHRoaXMuX2RhdGEuaGVhZGVycyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgQW5hbHl0aWNzIE1ldGFkYXRhIE9iamVjdFxuICAgKlxuICAgKiBAcmV0dXJucyB7KnxtZXRhRGF0YXx7ZGltZW5zaW9ucywgbmFtZXMsIGR4LCBwZSwgb3UsIGNvfXx7b3VIaWVyYXJjaHksIGl0ZW1zLCBkaW1lbnNpb25zfX1cbiAgICovXG4gIGdldCBtZXRhRGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YS5tZXRhRGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSByb3dzIG9mIHRoZSBhbmFseXRpY3Mgb2JqZWN0XG4gICAqXG4gICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICovXG4gIGdldCByb3dzKCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhLnJvd3M7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgQW5hbHl0aWNzIGhlaWdodFxuICAgKlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0IGhlaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YS5oZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgQW5hbHl0aWNzIHdpZHRoXG4gICAqXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBnZXQgd2lkdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGEud2lkdGg7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGlzIHJlcHJlc2VudHMgdGhlIEFuYWx5dGljcyBGZXRjaGVyIGZvciBwcm9jZXNzaW5nIGFuYWx5dGljcyBjYWxsc1xuICpcbiAqIEBleHRlbmRzIEZldGNoZXJcbiAqL1xuZXhwb3J0IGNsYXNzIEFuYWx5dGljcyBleHRlbmRzIEZldGNoZXIge1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGFuYWx5dGljcyBmZXRoY2VyXG4gICAqXG4gICAqIEBwYXJhbSBvbGRBbmFseXRpY3MgLSBXaGV0aGVyIHRoZSBzdHJ1Y3R1cmUgdG8gYmUgcmV0dXJuZWQgc2hvdWxkIGJlIG9sZCBvciBuZXcuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvbGRBbmFseXRpY3MgPSB0cnVlKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnBhcmFtZXRlcnNbJ2RpbWVuc2lvbiddID0ge307XG4gICAgdGhpcy5wb3N0UHJvY2VzcygoZGF0YSkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuc3RhbmRhcmRpemVBbmFseXRpY3MoZGF0YSwgb2xkQW5hbHl0aWNzKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBkYXRhIGZvciB0aGUgZmV0Y2hcbiAgICogQHBhcmFtIGR4XG4gICAqIEByZXR1cm5zIHtBbmFseXRpY3N9XG4gICAqL1xuICBzZXREYXRhKGR4KSB7XG4gICAgdGhpcy5wYXJhbWV0ZXJzWydkaW1lbnNpb24nXVsnZHgnXSA9IGR4O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHBlcmlvZCBmb3IgdGhlIGZldGNoXG4gICAqIEBwYXJhbSBwZVxuICAgKiBAcmV0dXJucyB7QW5hbHl0aWNzfVxuICAgKi9cbiAgc2V0UGVyaW9kKHBlKSB7XG4gICAgdGhpcy5wYXJhbWV0ZXJzWydkaW1lbnNpb24nXVsncGUnXSA9IHBlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIG9yZ2FuaXNhdGlvbiB1bml0IGZvciB0aGUgZmV0Y2hpbmcgb2YgdGhlIGFuYWx5dGljc1xuICAgKiBAcGFyYW0gb3VcbiAgICogQHJldHVybnMge0FuYWx5dGljc31cbiAgICovXG4gIHNldE9yZ1VuaXQob3UpIHtcbiAgICB0aGlzLnBhcmFtZXRlcnNbJ2RpbWVuc2lvbiddWydvdSddID0gb3U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU3RhbmRhcmRpemVzIHRoZSBhbmFseXRpY3Mgb2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSBhbmFseXRpY3NPYmplY3QgLSBUaGUgYW5hbHl0aWNzIG9iamVjdFxuICAgKiBAcGFyYW0gcHJlZmVyTm9ybWFsU3RydWN0dXJlIC0gV2hldGhlciB0byBwcmVmZXIgdGhlIG9sZCBvciBuZXcgYW5hbHl0aWNzIHN0cnVjdHVyZVxuICAgKiBAcmV0dXJucyB7QW5hbHl0aWNzT2JqZWN0fVxuICAgKi9cbiAgc3RhbmRhcmRpemVBbmFseXRpY3MoYW5hbHl0aWNzT2JqZWN0LCBwcmVmZXJOb3JtYWxTdHJ1Y3R1cmUgPSB0cnVlKSB7XG4gICAgLy8gaWYgU2VydmVyc2lkZSBFdmVudCBjbHVzdGVyaW5nIGRvIG5vdGhpbmdcbiAgICBpZiAoYW5hbHl0aWNzT2JqZWN0LmNvdW50KSB7XG4gICAgICByZXR1cm4gYW5hbHl0aWNzT2JqZWN0O1xuICAgIH1cbiAgICBsZXQgc2FuaXRpemVkQW5hbHl0aWNzT2JqZWN0ID0ge1xuICAgICAgaGVhZGVyczogW10sXG4gICAgICBtZXRhRGF0YToge1xuICAgICAgICBkaW1lbnNpb25zOiB7fSxcbiAgICAgICAgbmFtZXM6IHt9LFxuICAgICAgICBkeDogW10sXG4gICAgICAgIHBlOiBbXSxcbiAgICAgICAgb3U6IFtdLFxuICAgICAgICBjbzogW11cbiAgICAgIH0sXG4gICAgICByb3dzOiBbXVxuICAgIH07XG5cbiAgICBpZiAoYW5hbHl0aWNzT2JqZWN0KSB7XG5cbiAgICAgIC8qKlxuICAgICAgICogQ2hlY2sgaGVhZGVyc1xuICAgICAgICovXG4gICAgICBpZiAoYW5hbHl0aWNzT2JqZWN0LmhlYWRlcnMpIHtcbiAgICAgICAgYW5hbHl0aWNzT2JqZWN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbiAoaGVhZGVyKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBuZXdIZWFkZXIgPSBoZWFkZXI7XG5cbiAgICAgICAgICAgIHNhbml0aXplZEFuYWx5dGljc09iamVjdC5oZWFkZXJzLnB1c2gobmV3SGVhZGVyKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0ludmFsaWQgaGVhZGVyIG9iamVjdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogQ2hlY2sgbWV0YURhdGFcbiAgICAgICAqL1xuICAgICAgaWYgKGFuYWx5dGljc09iamVjdC5tZXRhRGF0YSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGxldCBzYW5pdGl6ZWRNZXRhZGF0YSA9IHRoaXMuZ2V0U2FuaXRpemVkQW5hbHl0aWNzTWV0YWRhdGEoYW5hbHl0aWNzT2JqZWN0Lm1ldGFEYXRhLCBwcmVmZXJOb3JtYWxTdHJ1Y3R1cmUpO1xuXG4gICAgICAgICAgc2FuaXRpemVkQW5hbHl0aWNzT2JqZWN0Lm1ldGFEYXRhID0gc2FuaXRpemVkTWV0YWRhdGE7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ0ludmFsaWQgbWV0YWRhdGEgb2JqZWN0Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBDaGVjayByb3dzXG4gICAgICAgKi9cbiAgICAgIGlmIChhbmFseXRpY3NPYmplY3Qucm93cykge1xuICAgICAgICBzYW5pdGl6ZWRBbmFseXRpY3NPYmplY3Qucm93cyA9IGFuYWx5dGljc09iamVjdC5yb3dzO1xuICAgICAgfVxuICAgIH1cbiAgICBzYW5pdGl6ZWRBbmFseXRpY3NPYmplY3QuaGVpZ2h0ID0gYW5hbHl0aWNzT2JqZWN0LmhlaWdodDtcbiAgICBzYW5pdGl6ZWRBbmFseXRpY3NPYmplY3Qud2lkdGggPSBhbmFseXRpY3NPYmplY3Qud2lkdGg7XG4gICAgcmV0dXJuIG5ldyBBbmFseXRpY3NPYmplY3Qoc2FuaXRpemVkQW5hbHl0aWNzT2JqZWN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFuZGFyZGl6ZXMgdGhlIGFuYWx5dGljcyBtZXRhZGF0YSBvYmplY3RcbiAgICpcbiAgICogQHBhcmFtIGFuYWx5dGljTWV0YWRhdGEgLSBUaGUgYW5hbHl0aWNzIG1ldGFkYXRhIG9iamVjdFxuICAgKiBAcGFyYW0gcHJlZmVyTm9ybWFsU3RydWN0dXJlIC0gV2hldGhlciB0byBwcmVmZXIgdGhlIG9sZCBvciBuZXcgYW5hbHl0aWNzIHN0cnVjdHVyZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgZ2V0U2FuaXRpemVkQW5hbHl0aWNzTWV0YWRhdGEoYW5hbHl0aWNNZXRhZGF0YSwgcHJlZmVyTm9ybWFsU3RydWN0dXJlKSB7XG4gICAgbGV0IHNhbml0aXplZE1ldGFkYXRhID0ge1xuICAgICAgZGltZW5zaW9uczoge30sXG4gICAgICBuYW1lczoge30sXG4gICAgICBkeDogW10sXG4gICAgICBwZTogW10sXG4gICAgICBvdTogW10sXG4gICAgICBjbzogW11cbiAgICB9O1xuXG4gICAgaWYgKGFuYWx5dGljTWV0YWRhdGEpIHtcbiAgICAgIGlmIChhbmFseXRpY01ldGFkYXRhLm91SGllcmFyY2h5KSB7XG4gICAgICAgIHNhbml0aXplZE1ldGFkYXRhLm91SGllcmFyY2h5ID0gYW5hbHl0aWNNZXRhZGF0YS5vdUhpZXJhcmNoeTtcbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICogR2V0IG1ldGFkYXRhIG5hbWVzXG4gICAgICAgKi9cbiAgICAgIGlmIChhbmFseXRpY01ldGFkYXRhLm5hbWVzKSB7XG4gICAgICAgIHNhbml0aXplZE1ldGFkYXRhLm5hbWVzID0gYW5hbHl0aWNNZXRhZGF0YS5uYW1lcztcbiAgICAgIH0gZWxzZSBpZiAoYW5hbHl0aWNNZXRhZGF0YS5pdGVtcykge1xuXG4gICAgICAgIGxldCBtZXRhZGF0YU5hbWVzID0ge307XG5cbiAgICAgICAgZm9yIChsZXQgbWV0YWRhdGFJdGVtS2V5IGluIGFuYWx5dGljTWV0YWRhdGEuaXRlbXMpIHtcbiAgICAgICAgICBtZXRhZGF0YU5hbWVzW21ldGFkYXRhSXRlbUtleV0gPSBhbmFseXRpY01ldGFkYXRhLml0ZW1zW21ldGFkYXRhSXRlbUtleV0ubmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNhbml0aXplZE1ldGFkYXRhWyduYW1lcyddID0gbWV0YWRhdGFOYW1lcztcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBHZXQgbWV0YWRhdGEgZGltZW5zaW9uc1xuICAgICAgICovXG4gICAgICBpZiAoYW5hbHl0aWNNZXRhZGF0YS5kaW1lbnNpb25zKSB7XG4gICAgICAgIGlmICghcHJlZmVyTm9ybWFsU3RydWN0dXJlKSB7XG4gICAgICAgICAgc2FuaXRpemVkTWV0YWRhdGFbJ2RpbWVuc2lvbnMnXSA9IGFuYWx5dGljTWV0YWRhdGEuZGltZW5zaW9ucztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgc2FuaXRpemVkTWV0YWRhdGEuZGltZW5zaW9ucztcbiAgICAgICAgICBzYW5pdGl6ZWRNZXRhZGF0YS5keCA9IGFuYWx5dGljTWV0YWRhdGEuZGltZW5zaW9ucy5keDtcbiAgICAgICAgICBzYW5pdGl6ZWRNZXRhZGF0YS5vdSA9IGFuYWx5dGljTWV0YWRhdGEuZGltZW5zaW9ucy5vdTtcbiAgICAgICAgICBzYW5pdGl6ZWRNZXRhZGF0YS5wZSA9IGFuYWx5dGljTWV0YWRhdGEuZGltZW5zaW9ucy5wZTtcbiAgICAgICAgICBzYW5pdGl6ZWRNZXRhZGF0YS5jbyA9IGFuYWx5dGljTWV0YWRhdGEuZGltZW5zaW9ucy5jbztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IG1ldGFkYXRhRGltZW5zaW9ucyA9IHt9O1xuXG4gICAgICAgIGZvciAobGV0IG1ldGFkYXRhS2V5IGluIGFuYWx5dGljTWV0YWRhdGEuZGltZW5zaW9ucykge1xuICAgICAgICAgIGlmIChhbmFseXRpY01ldGFkYXRhLmhhc093blByb3BlcnR5KG1ldGFkYXRhS2V5KSkge1xuICAgICAgICAgICAgaWYgKG1ldGFkYXRhS2V5ICE9PSAnbmFtZXMnKSB7XG4gICAgICAgICAgICAgIG1ldGFkYXRhRGltZW5zaW9uc1ttZXRhZGF0YUtleV0gPSBhbmFseXRpY01ldGFkYXRhLmRpbWVuc2lvbnNbbWV0YWRhdGFLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcHJlZmVyTm9ybWFsU3RydWN0dXJlKSB7XG4gICAgICAgICAgc2FuaXRpemVkTWV0YWRhdGFbJ2RpbWVuc2lvbnMnXSA9IG1ldGFkYXRhRGltZW5zaW9ucztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzYW5pdGl6ZWRNZXRhZGF0YS5keCA9IG1ldGFkYXRhRGltZW5zaW9ucy5keDtcbiAgICAgICAgICBzYW5pdGl6ZWRNZXRhZGF0YS5vdSA9IG1ldGFkYXRhRGltZW5zaW9ucy5vdTtcbiAgICAgICAgICBzYW5pdGl6ZWRNZXRhZGF0YS5wZSA9IG1ldGFkYXRhRGltZW5zaW9ucy5wZTtcbiAgICAgICAgICBzYW5pdGl6ZWRNZXRhZGF0YS5jbyA9IG1ldGFkYXRhRGltZW5zaW9ucy5jbztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzYW5pdGl6ZWRNZXRhZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB1cmwgZm9yIGZldGNoaW5nXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBnZXQgdXJsKCkge1xuICAgIHJldHVybiAnYW5hbHl0aWNzPycgKyB0aGlzLl91cmxQYXJhbWV0ZXJzO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJZGVudGlmaWFibGVPYmplY3QgfSBmcm9tICcuLi9jb3JlL2lkZW50aWZpYWJsZS1vYmplY3QnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGZldGNoZXIgZm9yIHRoZSBvcmdhbmlzYXRpb24gdW5pdFxuICpcbiAqIEBleHRlbmRzIElkZW50aWZpYWJsZU9iamVjdFxuICovXG5leHBvcnQgY2xhc3MgT3JnYW5pc2F0aW9uVW5pdCBleHRlbmRzIElkZW50aWZpYWJsZU9iamVjdCB7XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIG5hbWUgZm9yIGZldGNoaW5nIHRoZSBpZGVudGlmaWFibGUgb2JqZWN0XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gJ29yZ2FuaXNhdGlvblVuaXRzJztcbiAgfVxufVxuIiwiaW1wb3J0IHsgRmV0Y2hlciB9IGZyb20gJy4uL2NvcmUvZmV0Y2hlcic7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGZldGNoZXIgdG8gbG9hZCBzcWwgdmlldyBkYXRhXG4gKlxuICogQGV4dGVuZHMgRmV0Y2hlclxuICovXG5leHBvcnQgY2xhc3MgU1FMVmlld0RhdGEgZXh0ZW5kcyBGZXRjaGVyIHtcblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgU1FMVmlld0RhdGEgSW5zdGFuY2VcbiAgICogQHBhcmFtIGlkXG4gICAqL1xuICBjb25zdHJ1Y3RvcihpZCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5faWQgPSBpZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB1cmwgZm9yIGZldGNoaW5nXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBnZXQgdXJsKCkge1xuICAgIHZhciB1cmwgPSAnc3FsVmlld3MvJyArIHRoaXMuX2lkICsgJy9kYXRhLmpzb24nO1xuXG4gICAgcmV0dXJuIHVybDtcbiAgfVxufVxuIiwiaW1wb3J0IHtBbmFseXRpY3MsIEFuYWx5dGljc09iamVjdCwgQW5hbHl0aWNzSGVhZGVyc30gZnJvbSAnLi9pbXBsL2FuYWx5dGljcy5qcyc7XG5pbXBvcnQge1NRTFZpZXdEYXRhfSBmcm9tICcuL2ltcGwvc3FsLXZpZXcuanMnO1xuaW1wb3J0IHtPcmdhbmlzYXRpb25Vbml0fSBmcm9tICcuL2ltcGwvb3JnYW5pc2F0aW9uLXVuaXQuanMnO1xuaW1wb3J0IFByb2dyZXNzUHJvbWlzZSBmcm9tICdwcm9ncmVzcy1wcm9taXNlJztcbmltcG9ydCB7IFJ1bm5lciB9IGZyb20gJy4vY29yZS9ydW5uZXIuanMnO1xuaW1wb3J0IHsgRGVwZW5kZW5jeSB9IGZyb20gJy4vY29yZS9wcm9jZXNzb3InO1xuaW1wb3J0IHsgTXVsdGlGZXRjaGVyIH0gZnJvbSAnLi9jb3JlL211bHRpLWZldGNoZXInO1xuXG4vKipcbiAqIFRoaXMgaXMgdGhlIG1haW4gaG9sZGVyIGZvciB0aGUgZnVuY3Rpb25hbGl0aWVzIG9mIHRoZSBmdW5jdGlvblxuICogQHR5cGUge3tQcm9taXNlOiBQcm9ncmVzc1Byb21pc2UsIEFuYWx5dGljczogQW5hbHl0aWNzLFxuICAqICAgQW5hbHl0aWNzT2JqZWN0OiBBbmFseXRpY3NPYmplY3QsIEFuYWx5dGljc0hlYWRlcnM6IEFuYWx5dGljc0hlYWRlcnMsXG4gICogICBPcmdhbmlzYXRpb25Vbml0OiBPcmdhbmlzYXRpb25Vbml0LCBTUUxWaWV3RGF0YTogU1FMVmlld0RhdGEsXG4gICogICBSdW5uZXI6IFJ1bm5lciwgRGVwZW5kZW5jeTogRGVwZW5kZW5jeSwgTXVsdGlGZXRjaGVyOiBNdWx0aUZldGNoZXIsXG4gICogICBhbGw6IChmdW5jdGlvbihGZXRjaGVyW10pKSwgaW5pdDogKGZ1bmN0aW9uKCo9KSl9XG4gICogfVxuICovXG5sZXQgRm4gPSB7XG4gIFByb21pc2U6IFByb2dyZXNzUHJvbWlzZSxcbiAgQW5hbHl0aWNzOiBBbmFseXRpY3MsXG4gIEFuYWx5dGljc09iamVjdDogQW5hbHl0aWNzT2JqZWN0LFxuICBBbmFseXRpY3NIZWFkZXJzOiBBbmFseXRpY3NIZWFkZXJzLFxuICBPcmdhbmlzYXRpb25Vbml0OiBPcmdhbmlzYXRpb25Vbml0LFxuICBTUUxWaWV3RGF0YTogU1FMVmlld0RhdGEsXG4gIFJ1bm5lcjogUnVubmVyLFxuICBEZXBlbmRlbmN5OiBEZXBlbmRlbmN5LFxuICBNdWx0aUZldGNoZXI6IE11bHRpRmV0Y2hlcixcbiAgLyoqXG4gICAqIEFkZHMgbXVsdGlwbGUgZmV0Y2hlcnMgaW4gcXVldWUgZm9yIGV4ZWN1dGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtGZXRjaGVyW119IGZldGNoZXJzIC0gVGhlIGZldGhlcnMgaXMgYW4gYXJyYXkgb2YgdGhlIGZldGNoZXJzXG4gICAqIEByZXR1cm5zIHtQcm9ncmVzc1Byb21pc2V9IC0gUHJvZ3Jlc3MgUHJvbWlzZSBmb3IgZmV0Y2hpbmcgdGhlIHZhcmlvdXMgZmV0Y2hlcnNcbiAgICogQGV4YW1wbGVcbiAgICogRm4uYWxsKFtuZXcgRm4uQW5hbHl0aWNzKCksIG5ldyBGbi5PcmdhbmlzYXRpb25Vbml0KCldKTtcbiAgICovXG4gIGFsbDogKGZldGNoZXJzKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBNdWx0aUZldGNoZXIoZmV0Y2hlcnMpO1xuICB9LFxuICAvKipcbiAgICogQ29uZmlndXJlcyB0aGUgcnVubmluZyBlbnZpcm9ubWVudCBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWd1cmF0aW9uIC0gVGhlIGZldGhlcnMgaXMgYW4gYXJyYXkgb2YgdGhlIGZldGNoZXJzXG4gICAqIEByZXR1cm5zIHtQcm9ncmVzc1Byb21pc2V9IC0gUHJvZ3Jlc3MgUHJvbWlzZSBmb3IgZmV0Y2hpbmcgdGhlIHZhcmlvdXMgZmV0Y2hlcnNcbiAgICogQGV4YW1wbGVcbiAgICogRm4uYWxsKHtiYXNlVXJsOicnfSk7XG4gICAqL1xuICBpbml0OiAoY29uZmlnKT0+e1xuICAgIFJ1bm5lci5pbml0aWF0ZVJ1bm5lcihjb25maWcpO1xuICB9XG59O1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgd2luZG93LkZuID0gRm47XG59XG5leHBvcnQgeyBGbiB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==