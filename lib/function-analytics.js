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

            if (_this3.parameters[key][key2] === '') {
              url += key + '=' + key2;
            } else {
              url += key + '=' + key2 + ':' + _this3.parameters[key][key2];
            }
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
      this.setDimension('dx', dx);
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
      this.setDimension('pe', pe);
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
      this.setDimension('ou', ou);
      return this;
    }
    /**
     * Sets the dimension for the fetching of the analytics
     * @param {dim, value}
     * @returns {Analytics}
     */

  }, {
    key: "setDimension",
    value: function setDimension(dim, value) {
      this.parameters['dimension'][dim] = value ? value : '';
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
      var sanitizedMetadata = {};

      if (analyticMetadata) {
        if (analyticMetadata.ouHierarchy) {
          sanitizedMetadata.ouHierarchy = analyticMetadata.ouHierarchy;
        }

        if (preferNormalStructure) {
          // Get old structure
          sanitizedMetadata.names = {};

          if (analyticMetadata.names) {
            sanitizedMetadata.names = analyticMetadata.names;
          } else if (analyticMetadata.items) {
            Object.keys(analyticMetadata.items).forEach(function (nameKey) {
              sanitizedMetadata.names[nameKey] = analyticMetadata.items[nameKey].name;
            });
          }

          if (analyticMetadata.dimensions) {
            Object.keys(analyticMetadata.dimensions).forEach(function (nameKey) {
              sanitizedMetadata[nameKey] = analyticMetadata.dimensions[nameKey];
            });
          }
        } else {
          // Get new structure
          sanitizedMetadata.items = {};

          if (analyticMetadata.items) {
            sanitizedMetadata.items = analyticMetadata.items;
          } else if (analyticMetadata.names) {
            Object.keys(analyticMetadata.items).forEach(function (nameKey) {
              analyticMetadata.items[nameKey] = {
                name: analyticMetadata.names[nameKey]
              };
            });
          }

          if (!analyticMetadata.dimensions) {
            sanitizedMetadata.dimensions = {};
            Object.keys(analyticMetadata).forEach(function (nameKey) {
              if (['names', 'items', 'dimensions'].indexOf(nameKey) === -1) {
                sanitizedMetadata.dimensions[nameKey] = analyticMetadata[nameKey];
              }
            });
          } else {
            sanitizedMetadata.dimensions = analyticMetadata.dimensions;
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

/***/ "./src/impl/event-analytics.js":
/*!*************************************!*\
  !*** ./src/impl/event-analytics.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventAnalytics = void 0;

var _analytics = __webpack_require__(/*! ./analytics */ "./src/impl/analytics.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * This represents the Event Analytics Fetcher for processing analytics calls
 *
 * @extends Fetcher
 */
var EventAnalytics =
/*#__PURE__*/
function (_Analytics) {
  _inherits(EventAnalytics, _Analytics);

  function EventAnalytics() {
    _classCallCheck(this, EventAnalytics);

    return _possibleConstructorReturn(this, (EventAnalytics.__proto__ || Object.getPrototypeOf(EventAnalytics)).apply(this, arguments));
  }

  _createClass(EventAnalytics, [{
    key: "setProgram",

    /**
     * Sets the Program for the fetch
     * @param program
     * @returns {EventAnalytics}
     */
    value: function setProgram(program) {
      this.program = program;
      return this;
    }
    /**
     * Gets the url for fetching
     * @returns {string}
     */

  }, {
    key: "url",
    get: function get() {
      return 'analytics/events/query/' + this.program + '?' + this._urlParameters;
    }
  }]);

  return EventAnalytics;
}(_analytics.Analytics);

exports.EventAnalytics = EventAnalytics;

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

var _eventAnalytics = __webpack_require__(/*! ./impl/event-analytics.js */ "./src/impl/event-analytics.js");

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
  EventAnalytics: _eventAnalytics.EventAnalytics,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3Mvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J0b2EuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9ub2RlX21vZHVsZXMvcHJvZ3Jlc3MtcHJvbWlzZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9zcmMvY29yZS9mZXRjaGVyLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL3NyYy9jb3JlL2lkZW50aWZpYWJsZS1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vc3JjL2NvcmUvbXVsdGktZmV0Y2hlci5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9zcmMvY29yZS9wcm9jZXNzb3IuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vc3JjL2NvcmUvcnVubmVyLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL3NyYy9pbXBsL2FuYWx5dGljcy5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9zcmMvaW1wbC9ldmVudC1hbmFseXRpY3MuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vc3JjL2ltcGwvb3JnYW5pc2F0aW9uLXVuaXQuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vc3JjL2ltcGwvc3FsLXZpZXcuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIkZldGNoZXIiLCJwYXJhbWV0ZXJzIiwiZ2V0UmVzdWx0cyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwicHJvbWlzZXMiLCJkZXBlbmRlbmNpZXMiLCJtYXAiLCJkZXBlbmRlbmN5IiwicHJvY2Vzc29yIiwiYWxsIiwidXJsIiwia2V5MiIsIkVycm9yIiwiSWRlbnRpZmlhYmxlT2JqZWN0IiwiX2ZpbHRlcnMiLCJyaWdodCIsIm9wZXJhdG9yIiwibGVmdCIsInB1c2giLCJfdXJsUGFyYW1ldGVycyIsImZpbHRlciIsIm5hbWUiLCJNdWx0aUZldGNoZXIiLCJmZXRjaGVycyIsIl9mZXRjaGVycyIsImdldEFsbFJlc3VsdHMiLCJEZXBlbmRlbmN5IiwicHJvY2VzcyIsIlByb2Nlc3NvciIsInBvc3RQcm9jZXNzb3JzIiwibGVuZ3RoIiwiY2FsbGJhY2siLCJfcmVzdWx0cyIsImRhdGEiLCJkYXRhVG9Qcm9jZXNzIiwiX2luc3RhbmNlIiwiUnVubmVyIiwiZmV0Y2hlciIsInJlc29sdmUiLCJyZWplY3QiLCJlcnJvciIsImNvbmZpZyIsImJhc2VVcmwiLCJtZXRob2QiLCJhZGFwdGVyIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImF1dGgiLCJyZXF1ZXN0IiwidGhlbiIsInJlc3VsdHMiLCJwZXJmb3JtUG9zdFByb2Nlc3MiLCJlcnIiLCJwcm9ncmVzcyIsImhhc0RlcGVuZGVuY2llcyIsImdldERlcGVuZGVjeUZldGNoUmVzdWx0cyIsInBlcmZvcm1QcmVQcm9jZXNzIiwiX2ZldGNoIiwiY2F0Y2giLCJjb25zb2xlIiwibG9nIiwibXVsdGlmZXRjaGVyIiwiY29uZmlndXJhdGlvbnMiLCJpbnN0YW5jZSIsIkFuYWx5dGljc0hlYWRlciIsIkFuYWx5dGljc0hlYWRlcnMiLCJzZXRQcm90b3R5cGVPZiIsImNyZWF0ZSIsInByb3RvdHlwZSIsImlkIiwicmV0dXJuSGVhZGVyIiwiaGVhZGVyIiwiaW5kZXgiLCJnZXRIZWFkZXIiLCJBcnJheSIsIkFuYWx5dGljc09iamVjdCIsImFuYWx5dGljc09iamVjdCIsIl9kYXRhIiwiaGVhZGVycyIsIm1ldGFEYXRhIiwicm93cyIsImhlaWdodCIsIndpZHRoIiwiQW5hbHl0aWNzIiwib2xkQW5hbHl0aWNzIiwicG9zdFByb2Nlc3MiLCJzdGFuZGFyZGl6ZUFuYWx5dGljcyIsImR4Iiwic2V0RGltZW5zaW9uIiwicGUiLCJvdSIsImRpbSIsInZhbHVlIiwicHJlZmVyTm9ybWFsU3RydWN0dXJlIiwiY291bnQiLCJzYW5pdGl6ZWRBbmFseXRpY3NPYmplY3QiLCJkaW1lbnNpb25zIiwibmFtZXMiLCJjbyIsIm5ld0hlYWRlciIsImUiLCJ3YXJuIiwic2FuaXRpemVkTWV0YWRhdGEiLCJnZXRTYW5pdGl6ZWRBbmFseXRpY3NNZXRhZGF0YSIsImFuYWx5dGljTWV0YWRhdGEiLCJvdUhpZXJhcmNoeSIsIml0ZW1zIiwibmFtZUtleSIsImluZGV4T2YiLCJFdmVudEFuYWx5dGljcyIsInByb2dyYW0iLCJPcmdhbmlzYXRpb25Vbml0IiwiU1FMVmlld0RhdGEiLCJfaWQiLCJGbiIsIlByb21pc2UiLCJpbml0IiwiaW5pdGlhdGVSdW5uZXIiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFj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SDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM5U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNwQkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q00sQ0FBVDs7O0FBbUNBLElBQUksT0FBTzZFLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7QUFDakNBLFFBQU0sQ0FBQ0osRUFBUCxHQUFZQSxFQUFaO0FBQ0QsQyIsImZpbGUiOiJmdW5jdGlvbi1hbmFseXRpY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcImZ1bmN0aW9uLWFuYWx5dGljc1wiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJmdW5jdGlvbi1hbmFseXRpY3NcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiZnVuY3Rpb24tYW5hbHl0aWNzXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG52YXIgYnRvYSA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuYnRvYSAmJiB3aW5kb3cuYnRvYS5iaW5kKHdpbmRvdykpIHx8IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idG9hJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgdmFyIGxvYWRFdmVudCA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xuICAgIHZhciB4RG9tYWluID0gZmFsc2U7XG5cbiAgICAvLyBGb3IgSUUgOC85IENPUlMgc3VwcG9ydFxuICAgIC8vIE9ubHkgc3VwcG9ydHMgUE9TVCBhbmQgR0VUIGNhbGxzIGFuZCBkb2Vzbid0IHJldHVybnMgdGhlIHJlc3BvbnNlIGhlYWRlcnMuXG4gICAgLy8gRE9OJ1QgZG8gdGhpcyBmb3IgdGVzdGluZyBiL2MgWE1MSHR0cFJlcXVlc3QgaXMgbW9ja2VkLCBub3QgWERvbWFpblJlcXVlc3QuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAndGVzdCcgJiZcbiAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgd2luZG93LlhEb21haW5SZXF1ZXN0ICYmICEoJ3dpdGhDcmVkZW50aWFscycgaW4gcmVxdWVzdCkgJiZcbiAgICAgICAgIWlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkge1xuICAgICAgcmVxdWVzdCA9IG5ldyB3aW5kb3cuWERvbWFpblJlcXVlc3QoKTtcbiAgICAgIGxvYWRFdmVudCA9ICdvbmxvYWQnO1xuICAgICAgeERvbWFpbiA9IHRydWU7XG4gICAgICByZXF1ZXN0Lm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiBoYW5kbGVQcm9ncmVzcygpIHt9O1xuICAgICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge307XG4gICAgfVxuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCB8fCAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG4gICAgcmVxdWVzdFtsb2FkRXZlbnRdID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0ICYmICF4RG9tYWluKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICAvLyBJRSBzZW5kcyAxMjIzIGluc3RlYWQgb2YgMjA0IChodHRwczovL2dpdGh1Yi5jb20vYXhpb3MvYXhpb3MvaXNzdWVzLzIwMSlcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyA9PT0gMTIyMyA/IDIwNCA6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1cyA9PT0gMTIyMyA/ICdObyBDb250ZW50JyA6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignTmV0d29yayBFcnJvcicsIGNvbmZpZywgbnVsbCwgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJywgY29uZmlnLCAnRUNPTk5BQk9SVEVEJyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgdmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xuXG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oY29uZmlnLnVybCkpICYmIGNvbmZpZy54c3JmQ29va2llTmFtZSA/XG4gICAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxuICAgICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLndpdGhDcmVkZW50aWFscykge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBFeHBlY3RlZCBET01FeGNlcHRpb24gdGhyb3duIGJ5IGJyb3dzZXJzIG5vdCBjb21wYXRpYmxlIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIuXG4gICAgICAgIC8vIEJ1dCwgdGhpcyBjYW4gYmUgc3VwcHJlc3NlZCBmb3IgJ2pzb24nIHR5cGUgYXMgaXQgY2FuIGJlIHBhcnNlZCBieSBkZWZhdWx0ICd0cmFuc2Zvcm1SZXNwb25zZScgZnVuY3Rpb24uXG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25VcGxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnByb21pc2UudGhlbihmdW5jdGlvbiBvbkNhbmNlbGVkKGNhbmNlbCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlamVjdChjYW5jZWwpO1xuICAgICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UodXRpbHMubWVyZ2UoZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59O1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zO1xuXG4vLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBheGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBBIGBDYW5jZWxgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ0NhbmNlbCcgKyAodGhpcy5tZXNzYWdlID8gJzogJyArIHRoaXMubWVzc2FnZSA6ICcnKTtcbn07XG5cbkNhbmNlbC5wcm90b3R5cGUuX19DQU5DRUxfXyA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLy4uL2RlZmF1bHRzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gdXRpbHMubWVyZ2Uoe1xuICAgICAgdXJsOiBhcmd1bWVudHNbMF1cbiAgICB9LCBhcmd1bWVudHNbMV0pO1xuICB9XG5cbiAgY29uZmlnID0gdXRpbHMubWVyZ2UoZGVmYXVsdHMsIHttZXRob2Q6ICdnZXQnfSwgdGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcblxuICAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFcnJvcihtZXNzYWdlLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTCcpO1xudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgLy8gU3VwcG9ydCBiYXNlVVJMIGNvbmZpZ1xuICBpZiAoY29uZmlnLmJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwoY29uZmlnLnVybCkpIHtcbiAgICBjb25maWcudXJsID0gY29tYmluZVVSTHMoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICB9XG5cbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICBjb25maWcuZGF0YSxcbiAgICBjb25maWcuaGVhZGVycyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVycyB8fCB7fVxuICApO1xuXG4gIHV0aWxzLmZvckVhY2goXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgICB9XG4gICk7XG5cbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXBkYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWcsIGVycm9yIGNvZGUsIGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBUaGUgZXJyb3IgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgZXJyb3IuY29uZmlnID0gY29uZmlnO1xuICBpZiAoY29kZSkge1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICB9XG4gIGVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICByZXR1cm4gZXJyb3I7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICAvLyBOb3RlOiBzdGF0dXMgaXMgbm90IGV4cG9zZWQgYnkgWERvbWFpblJlcXVlc3RcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgbnVsbCxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMveGhyJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfVxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkgeyAvKiBJZ25vcmUgKi8gfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIGJ0b2EgcG9seWZpbGwgZm9yIElFPDEwIGNvdXJ0ZXN5IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXZpZGNoYW1iZXJzL0Jhc2U2NC5qc1xuXG52YXIgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nO1xuXG5mdW5jdGlvbiBFKCkge1xuICB0aGlzLm1lc3NhZ2UgPSAnU3RyaW5nIGNvbnRhaW5zIGFuIGludmFsaWQgY2hhcmFjdGVyJztcbn1cbkUucHJvdG90eXBlID0gbmV3IEVycm9yO1xuRS5wcm90b3R5cGUuY29kZSA9IDU7XG5FLnByb3RvdHlwZS5uYW1lID0gJ0ludmFsaWRDaGFyYWN0ZXJFcnJvcic7XG5cbmZ1bmN0aW9uIGJ0b2EoaW5wdXQpIHtcbiAgdmFyIHN0ciA9IFN0cmluZyhpbnB1dCk7XG4gIHZhciBvdXRwdXQgPSAnJztcbiAgZm9yIChcbiAgICAvLyBpbml0aWFsaXplIHJlc3VsdCBhbmQgY291bnRlclxuICAgIHZhciBibG9jaywgY2hhckNvZGUsIGlkeCA9IDAsIG1hcCA9IGNoYXJzO1xuICAgIC8vIGlmIHRoZSBuZXh0IHN0ciBpbmRleCBkb2VzIG5vdCBleGlzdDpcbiAgICAvLyAgIGNoYW5nZSB0aGUgbWFwcGluZyB0YWJsZSB0byBcIj1cIlxuICAgIC8vICAgY2hlY2sgaWYgZCBoYXMgbm8gZnJhY3Rpb25hbCBkaWdpdHNcbiAgICBzdHIuY2hhckF0KGlkeCB8IDApIHx8IChtYXAgPSAnPScsIGlkeCAlIDEpO1xuICAgIC8vIFwiOCAtIGlkeCAlIDEgKiA4XCIgZ2VuZXJhdGVzIHRoZSBzZXF1ZW5jZSAyLCA0LCA2LCA4XG4gICAgb3V0cHV0ICs9IG1hcC5jaGFyQXQoNjMgJiBibG9jayA+PiA4IC0gaWR4ICUgMSAqIDgpXG4gICkge1xuICAgIGNoYXJDb2RlID0gc3RyLmNoYXJDb2RlQXQoaWR4ICs9IDMgLyA0KTtcbiAgICBpZiAoY2hhckNvZGUgPiAweEZGKSB7XG4gICAgICB0aHJvdyBuZXcgRSgpO1xuICAgIH1cbiAgICBibG9jayA9IGJsb2NrIDw8IDggfCBjaGFyQ29kZTtcbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ0b2E7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTQwL2dpLCAnQCcpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xuICB9IGVsc2UgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcnRzID0gW107XG5cbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cbiAgICAgICAgcGFydHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2KSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICB2YXIgY29va2llID0gW107XG4gICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICB9LFxuXG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHt9LFxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkXFwrXFwtXFwuXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgIH1cblxuICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBpc0J1ZmZlciA9IHJlcXVpcmUoJ2lzLWJ1ZmZlcicpO1xuXG4vKmdsb2JhbCB0b1N0cmluZzp0cnVlKi9cblxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbCkge1xuICByZXR1cm4gKHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcpICYmICh2YWwgaW5zdGFuY2VvZiBGb3JtRGF0YSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKHZhbC5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcik7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcztcbn1cblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqL1xuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGV4dGVuZDogZXh0ZW5kLFxuICB0cmltOiB0cmltXG59O1xuIiwiLyohXG4gKiBEZXRlcm1pbmUgaWYgYW4gb2JqZWN0IGlzIGEgQnVmZmVyXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuXG4vLyBUaGUgX2lzQnVmZmVyIGNoZWNrIGlzIGZvciBTYWZhcmkgNS03IHN1cHBvcnQsIGJlY2F1c2UgaXQncyBtaXNzaW5nXG4vLyBPYmplY3QucHJvdG90eXBlLmNvbnN0cnVjdG9yLiBSZW1vdmUgdGhpcyBldmVudHVhbGx5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAhPSBudWxsICYmIChpc0J1ZmZlcihvYmopIHx8IGlzU2xvd0J1ZmZlcihvYmopIHx8ICEhb2JqLl9pc0J1ZmZlcilcbn1cblxuZnVuY3Rpb24gaXNCdWZmZXIgKG9iaikge1xuICByZXR1cm4gISFvYmouY29uc3RydWN0b3IgJiYgdHlwZW9mIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKVxufVxuXG4vLyBGb3IgTm9kZSB2MC4xMCBzdXBwb3J0LiBSZW1vdmUgdGhpcyBldmVudHVhbGx5LlxuZnVuY3Rpb24gaXNTbG93QnVmZmVyIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmoucmVhZEZsb2F0TEUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG9iai5zbGljZSA9PT0gJ2Z1bmN0aW9uJyAmJiBpc0J1ZmZlcihvYmouc2xpY2UoMCwgMCkpXG59XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gRmFsbGJhY2sgZm9yIGVuZ2luZXMgdGhhdCBkb24ndCBzdXBwb3J0IFN5bWJvbFxuY29uc3QgTElTVEVORVJTID0gU3ltYm9sID8gU3ltYm9sKCkgOiAnX19saXN0ZW5lcnMnO1xuXG5jbGFzcyBQcm9ncmVzc1Byb21pc2UgZXh0ZW5kcyBQcm9taXNlIHtcbiAgY29uc3RydWN0b3IoZXhlY3V0b3IpIHtcbiAgICBzdXBlcigocmVzb2x2ZSwgcmVqZWN0KSA9PiBleGVjdXRvcihyZXNvbHZlLCByZWplY3QsXG4gICAgICAvLyBQYXNzIG1ldGhvZCBmb3IgcGFzc2luZyBwcm9ncmVzcyB0byBsaXN0ZW5lclxuICAgICAgdmFsdWUgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiB0aGlzW0xJU1RFTkVSU10uZm9yRWFjaChsaXN0ZW5lciA9PiBsaXN0ZW5lcih2YWx1ZSkpO1xuICAgICAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIHRoaXNbTElTVEVORVJTXSA9IFtdO1xuICB9XG4gIHByb2dyZXNzKGhhbmRsZXIpIHtcbiAgICBpZih0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgIHRocm93IG5ldyBFcnJvcignUFJPR1JFU1NfUkVRVUlSRVNfRlVOQ1RJT04nKTtcbiAgICB0aGlzW0xJU1RFTkVSU10ucHVzaChoYW5kbGVyKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBzdGF0aWMgYWxsKHByb21pc2VzKSB7XG4gICAgY29uc3QgcmVzdWx0cyA9IG5ldyBBcnJheShwcm9taXNlcy5sZW5ndGgpO1xuICAgIGNvbnN0IGxlbmd0aCA9IHByb21pc2VzLmxlbmd0aDtcbiAgICBsZXQgcmVzb2x2ZUNvdW50ID0gMDtcbiAgICByZXR1cm4gbmV3IFByb2dyZXNzUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0LCBwcm9ncmVzcykgPT4ge1xuICAgICAgcHJvbWlzZXMuZm9yRWFjaCgocHJvbWlzZSwgaW5kZXgpID0+IHtcbiAgICAgICAgcHJvbWlzZS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgcmVzdWx0c1tpbmRleF0gPSByZXN1bHQ7XG4gICAgICAgICAgcmVzdWx0cy5wcm9wb3J0aW9uID0gKytyZXNvbHZlQ291bnQgLyBsZW5ndGg7XG4gICAgICAgICAgcHJvZ3Jlc3MocmVzdWx0cyk7XG4gICAgICAgICAgaWYocmVzb2x2ZUNvdW50ID09PSBsZW5ndGgpIHJlc29sdmUocmVzdWx0cyk7XG4gICAgICAgIH0pLmNhdGNoKHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBzdGF0aWMgc2VxdWVuY2UoaW5wdXRzLCBoYW5kbGVyKSB7XG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgIGNvbnN0IGxlbmd0aCA9IGlucHV0cy5sZW5ndGg7XG4gICAgbGV0IHJlc29sdmVDb3VudCA9IDA7XG4gICAgcmV0dXJuIG5ldyBQcm9ncmVzc1Byb21pc2UoKHJlc29sdmUsIHJlamVjdCwgcHJvZ3Jlc3MpID0+IHtcbiAgICAgIGZ1bmN0aW9uIGludm9rZU5leHQoKSB7XG4gICAgICAgIGhhbmRsZXIuY2FsbChudWxsLCBpbnB1dHNbcmVzdWx0cy5sZW5ndGhdKVxuICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgIHJlc3VsdHMucHJvcG9ydGlvbiA9ICsrcmVzb2x2ZUNvdW50IC8gbGVuZ3RoO1xuICAgICAgICAgICAgcHJvZ3Jlc3MocmVzdWx0cyk7XG4gICAgICAgICAgICBpZihyZXN1bHRzLmxlbmd0aCA9PT0gbGVuZ3RoKSByZXNvbHZlKHJlc3VsdHMpO1xuICAgICAgICAgICAgZWxzZSBpbnZva2VOZXh0KCk7XG4gICAgICAgICAgfSkuY2F0Y2gocmVqZWN0KTs7XG4gICAgICB9XG4gICAgICBpbnZva2VOZXh0KCk7XG4gICAgfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQcm9ncmVzc1Byb21pc2U7XG5cbiIsImltcG9ydCB7IFJ1bm5lciB9IGZyb20gJy4vcnVubmVyJztcbmltcG9ydCB7IFByb2Nlc3NvciB9IGZyb20gJy4vcHJvY2Vzc29yJztcbmltcG9ydCBQcm9ncmVzc1Byb21pc2UgZnJvbSAncHJvZ3Jlc3MtcHJvbWlzZSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgZmV0Y2hlciBwcm9jZXNzXG4gKkBleHRlbmRzIFByb2Nlc3NvclxuICovXG5leHBvcnQgY2xhc3MgRmV0Y2hlciBleHRlbmRzIFByb2Nlc3NvciB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZmV0aGNlclxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5wYXJhbWV0ZXJzID0ge307XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgVVJMIFBhcmFtZXRlcnNcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldCBfdXJsUGFyYW1ldGVycygpIHtcbiAgICBsZXQgdXJsID0gJyc7XG5cbiAgICBPYmplY3Qua2V5cyh0aGlzLnBhcmFtZXRlcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmICh1cmwgIT09ICcnKSB7XG4gICAgICAgIHVybCArPSAnJic7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHRoaXMucGFyYW1ldGVyc1trZXldID09PSAnc3RyaW5nJykge1xuICAgICAgICB1cmwgKz0ga2V5ICsgJz0nICsgdGhpcy5wYXJhbWV0ZXJzW2tleV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnBhcmFtZXRlcnNba2V5XSkuZm9yRWFjaChrZXkyID0+IHtcbiAgICAgICAgICBpZiAodXJsICE9PSAnJykge1xuICAgICAgICAgICAgdXJsICs9ICcmJztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMucGFyYW1ldGVyc1trZXldW2tleTJdID09PSAnJykge1xuICAgICAgICAgICAgdXJsICs9IGtleSArICc9JyArIGtleTI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVybCArPSBrZXkgKyAnPScgKyBrZXkyICsgJzonICsgdGhpcy5wYXJhbWV0ZXJzW2tleV1ba2V5Ml07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHVybFxuICAgKiBAdGhyb3dzIEltcGxlbWVudGF0aW9uIEVycm9yXG4gICAqL1xuICBnZXQgdXJsKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignU2hvdWxkIGltcGxlbWVudCB1cmwgZ2VuZXJhdGlvbicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHJ1bm5pbmcgcHJvY2VzcyBzdGFydGVkXG4gICAqIEByZXR1cm5zIHtQcm9ncmVzc1Byb21pc2V9XG4gICAqL1xuICBnZXQoKSB7XG4gICAgcmV0dXJuIG5ldyBSdW5uZXIoKS5nZXRSZXN1bHRzKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBwYXJlbWV0ZXJzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbWV0ZXJzXG4gICAqIEByZXR1cm5zIHtGZXRjaGVyfVxuICAgKi9cbiAgc2V0UGFyYW1ldGVycyhwYXJhbWV0ZXJzKSB7XG4gICAgT2JqZWN0LmtleXMocGFyYW1ldGVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzW2tleV0gPSBwYXJhbWV0ZXJzW2tleV07XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IERlcGVuZGVuY3kgcmVzdWx0c1xuICAgKiBAcmV0dXJucyB7UHJvZ3Jlc3NQcm9taXNlfVxuICAgKi9cbiAgZ2V0RGVwZW5kZWN5RmV0Y2hSZXN1bHRzKCkge1xuICAgIGNvbnN0IHByb21pc2VzID0gdGhpcy5kZXBlbmRlbmNpZXMubWFwKGRlcGVuZGVuY3kgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBSdW5uZXIoKS5nZXRSZXN1bHRzKGRlcGVuZGVuY3kucHJvY2Vzc29yKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBQcm9ncmVzc1Byb21pc2UuYWxsKHByb21pc2VzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRmV0Y2hlciB9IGZyb20gJy4uL2NvcmUvZmV0Y2hlcic7XG5cbmV4cG9ydCBjbGFzcyBJZGVudGlmaWFibGVPYmplY3QgZXh0ZW5kcyBGZXRjaGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9maWx0ZXJzID0gW107XG4gIH1cbiAgZ2V0IG5hbWUoKSB7XG4gICAgdGhyb3cgRXJyb3IoJ09iamVjdCBuYW1lIG5vdCBpbXBsZW1lbnRlZCcpO1xuICB9XG4gIHdoZXJlKHJpZ2h0LCBvcGVyYXRvciwgbGVmdCkge1xuICAgIHRoaXMuX2ZpbHRlcnMucHVzaCh7XG4gICAgICByaWdodDogcmlnaHQsXG4gICAgICBvcGVyYXRvcjogb3BlcmF0b3IsXG4gICAgICBsZWZ0OiBsZWZ0XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQgdXJsKCkge1xuICAgIHZhciB1cmwgPSB0aGlzLl91cmxQYXJhbWV0ZXJzO1xuXG4gICAgdGhpcy5fZmlsdGVycy5mb3JFYWNoKChmaWx0ZXIpID0+IHtcbiAgICAgIHVybCArPSAnZmlsdGVyPScgKyBmaWx0ZXIucmlnaHQ7XG4gICAgICBpZiAoZmlsdGVyLm9wZXJhdG9yID09PSAnPT0nKSB7XG4gICAgICAgIHVybCArPSAnOmVxOicgKyBmaWx0ZXIubGVmdDtcbiAgICAgIH0gZWxzZSBpZiAoZmlsdGVyLm9wZXJhdG9yID09PSAnPCcpIHtcbiAgICAgICAgdXJsICs9ICc6bHQ6JyArIGZpbHRlci5sZWZ0O1xuICAgICAgfSBlbHNlIGlmIChmaWx0ZXIub3BlcmF0b3IgPT09ICc8PScpIHtcbiAgICAgICAgdXJsICs9ICc6bGU6JyArIGZpbHRlci5sZWZ0O1xuICAgICAgfSBlbHNlIGlmIChmaWx0ZXIub3BlcmF0b3IgPT09ICc+Jykge1xuICAgICAgICB1cmwgKz0gJzpndDonICsgZmlsdGVyLmxlZnQ7XG4gICAgICB9IGVsc2UgaWYgKGZpbHRlci5vcGVyYXRvciA9PT0gJz49Jykge1xuICAgICAgICB1cmwgKz0gJzpnZTonICsgZmlsdGVyLmxlZnQ7XG4gICAgICB9IGVsc2UgaWYgKGZpbHRlci5vcGVyYXRvciA9PT0gJzw+Jykge1xuICAgICAgICB1cmwgKz0gJzohZXE6JyArIGZpbHRlci5sZWZ0O1xuICAgICAgfSBlbHNlIGlmIChmaWx0ZXIub3BlcmF0b3IgPT09ICdpbicgfHwgZmlsdGVyLm9wZXJhdG9yID09PSAnIWluJykge1xuICAgICAgICB1cmwgKz0gJzonICsgZmlsdGVyLm9wZXJhdG9yICsgJzpbJyArIGZpbHRlci5sZWZ0ICsgJ10nO1xuICAgICAgfSBlbHNlIGlmICghZmlsdGVyLmxlZnQpIHtcbiAgICAgICAgdXJsICs9ICc6JyArIGZpbHRlci5vcGVyYXRvcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVybCArPSAnOicgKyBmaWx0ZXIub3BlcmF0b3IgKyAnOicgKyBmaWx0ZXIubGVmdDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5uYW1lICsgJy5qc29uPycgKyB1cmw7XG4gIH1cbn1cbiIsImltcG9ydCB7IFJ1bm5lciB9IGZyb20gJy4vcnVubmVyJztcbmltcG9ydCB7IEZldGNoZXIgfSBmcm9tICcuL2ZldGNoZXInO1xuXG5leHBvcnQgY2xhc3MgTXVsdGlGZXRjaGVyIGV4dGVuZHMgRmV0Y2hlciB7XG4gIGNvbnN0cnVjdG9yKGZldGNoZXJzKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9mZXRjaGVycyA9IGZldGNoZXJzO1xuICB9XG4gIGdldCBmZXRjaGVycygpIHtcbiAgICByZXR1cm4gdGhpcy5fZmV0Y2hlcnM7XG4gIH1cblxuICBnZXQoKSB7XG4gICAgcmV0dXJuIChuZXcgUnVubmVyKCkpLmdldEFsbFJlc3VsdHModGhpcyk7XG4gIH1cbn1cbiIsIi8qKlxuICogVGhpcyBjYWxsYmFjayB0eXBlIGlzIGNhbGxlZCBgcHJvY2Vzc0NhbGxiYWNrYC5cbiAqXG4gKiBAY2FsbGJhY2sgcHJvY2Vzc0NhbGxiYWNrXG4gKiBAcGFyYW0ge09iamVjdH0gcmVzdWx0XG4gKi9cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcHJvY2VzcyBkZXBlbmRlbmN5XG4gKi9cbmV4cG9ydCBjbGFzcyBEZXBlbmRlbmN5IHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZXBlbmRlbmN5IGluc3RhbmNlXG4gICAqIEBwYXJhbSB7UHJvY2Vzc29yfSBwcm9jZXNzb3JcbiAgICogQHBhcmFtIHtwcm9jZXNzQ2FsbGJhY2t9IHByb2Nlc3NcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByb2Nlc3NvciwgcHJvY2Vzcykge1xuICAgIHRoaXMucHJvY2Vzc29yID0gcHJvY2Vzc29yO1xuICAgIHRoaXMucHJvY2VzcyA9IHByb2Nlc3M7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGlzIGlzIHRoZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgcHJvY2Vzc29yXG4gKi9cbmV4cG9ydCBjbGFzcyBQcm9jZXNzb3Ige1xuICAvKipcbiAgICogQ3JlYXRlcyBhIHByb2Nlc3NvclxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wb3N0UHJvY2Vzc29ycyA9IFtdO1xuICAgIHRoaXMuZGVwZW5kZW5jaWVzID0gW107XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHByb2Nlc3NvciBoYXMgZGVwZW5kZW5jaWVzXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaGFzRGVwZW5kZW5jaWVzKCkge1xuICAgIHJldHVybiB0aGlzLmRlcGVuZGVuY2llcy5sZW5ndGggPiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZGVwZW5kZW5jeSB0byB0aGUgcHJvY2Vzc29yXG4gICAqIEBwYXJhbSB7RGVwZW5kZW5jeX0gZGVwZW5kZW5jeVxuICAgKiBAcmV0dXJucyB7UHJvY2Vzc29yfVxuICAgKi9cbiAgcHJlUHJvY2VzcyhkZXBlbmRlbmN5KSB7XG4gICAgdGhpcy5kZXBlbmRlbmNpZXMucHVzaChkZXBlbmRlbmN5KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGNhbGxiYWNrIHByb2Nlc3MgdGhlIG91dHB1dCBwcm9jZXNzXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKiBAcmV0dXJucyB7UHJvY2Vzc29yfVxuICAgKi9cbiAgcG9zdFByb2Nlc3MoY2FsbGJhY2spIHtcbiAgICB0aGlzLnBvc3RQcm9jZXNzb3JzLnB1c2goY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIHByZSBwcm9jZXNzXG4gICAqIEByZXR1cm5zIHtQcm9jZXNzb3J9XG4gICAqL1xuICBwZXJmb3JtUHJlUHJvY2VzcygpIHtcbiAgICB0aGlzLmRlcGVuZGVuY2llcy5mb3JFYWNoKChkZXBlbmRlbmN5KSA9PiB7XG4gICAgICBkZXBlbmRlbmN5LnByb2Nlc3MoZGVwZW5kZW5jeS5wcm9jZXNzb3IuX3Jlc3VsdHMsIHRoaXMpO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIHBvc3QgcHJvY2VzcyBhZnRlciB0aGUgcHJvY2VzcyBoYXMgZW5kZWRcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIHBlcmZvcm1Qb3N0UHJvY2VzcyhkYXRhKSB7XG4gICAgdGhpcy5fcmVzdWx0cyA9IGRhdGE7XG4gICAgbGV0IGRhdGFUb1Byb2Nlc3MgPSBkYXRhO1xuXG4gICAgdGhpcy5wb3N0UHJvY2Vzc29ycy5mb3JFYWNoKChjYWxsYmFjaykgPT4ge1xuICAgICAgZGF0YVRvUHJvY2VzcyA9IGNhbGxiYWNrKGRhdGFUb1Byb2Nlc3MpO1xuICAgIH0pO1xuICAgIHJldHVybiBkYXRhVG9Qcm9jZXNzO1xuICB9XG59XG4iLCJpbXBvcnQgUHJvZ3Jlc3NQcm9taXNlIGZyb20gJ3Byb2dyZXNzLXByb21pc2UnO1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCBodHRwYWRhcHRlciBmcm9tICdheGlvcy9saWIvYWRhcHRlcnMvaHR0cCc7XG5pbXBvcnQgeGhyYWRhcHRlciBmcm9tICdheGlvcy9saWIvYWRhcHRlcnMveGhyJztcbmxldCBfaW5zdGFuY2U7XG5cbi8qKlxuICogUnVubmVyIHJlcHJlc2VudHMgdGhlIHByb2Nlc3Mgd2hpY2ggd2lsbCBzY2hlZHVsZSBhbmQgcnVuIG9wZXJhdGlvbnMgb2YgdGhlIHByb2Nlc3Nlc1xuICovXG5leHBvcnQgY2xhc3MgUnVubmVyIHtcbiAgLyoqXG4gICAqIEluaXRpYXRlcyB0aGUgcnVubmVyIHNpbmdsZXRvbiBpbnN0YW5jZVxuICAgKiBAcGFyYW0gY29uZmlndXJhdGlvbnNcbiAgICovXG4gIHN0YXRpYyBpbml0aWF0ZVJ1bm5lcihjb25maWd1cmF0aW9ucykge1xuICAgIGlmICghUnVubmVyLmluc3RhbmNlKSB7XG4gICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZ3VyYXRpb25zO1xuICAgICAgX2luc3RhbmNlID0gdGhpcztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBSdW5uZXIgaW5zdGFuY2VcbiAgICogQHJldHVybnMge1J1bm5lcn1cbiAgICovXG4gIGdldCBpbnN0YW5jZSgpIHtcbiAgICByZXR1cm4gX2luc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgY29uZmlndXJhdGlvblxuICAgKiBAcGFyYW0gY29uZmlndXJhdGlvbnNcbiAgICovXG4gIHNldCBjb25maWcoY29uZmlndXJhdGlvbnMpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZ3VyYXRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY29uZmlndXJhdGlvbnNcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXQgY29uZmlnKCkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGNhbGxiYWNrIHR5cGUgaXMgY2FsbGVkIGByZXNvbHZlQ2FsbGJhY2tgLlxuICAgKlxuICAgKiBAY2FsbGJhY2sgcmVzb2x2ZUNhbGxiYWNrXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZVJlc3VsdFxuICAgKi9cblxuICAvKipcbiAgICogVGhpcyBjYWxsYmFjayB0eXBlIGlzIGNhbGxlZCBgcmVqZWN0Q2FsbGJhY2tgLlxuICAgKlxuICAgKiBAY2FsbGJhY2sgcmVqZWN0Q2FsbGJhY2tcbiAgICogQHBhcmFtIHtFcnJvcn0gZXJyb3JcbiAgICovXG5cbiAgLyoqXG4gICAqIEZldGNoZXMgdGhlIGRhdGEgZnJvbSB0aGUgZmV0Y2hlclxuICAgKiBAcGFyYW0ge0ZldGNoZXJ9IGZldGNoZXJcbiAgICogQHBhcmFtIHtyZXNvbHZlQ2FsbGJhY2t9IHJlc29sdmVcbiAgICogQHBhcmFtIHtyZWplY3RDYWxsYmFja30gcmVqZWN0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZmV0Y2goZmV0Y2hlciwgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgaWYgKCFfaW5zdGFuY2UpIHtcbiAgICAgIGxldCBlcnJvciA9ICdDb25maWdyYXRpb24gbm90IHNldCBwbGVhc2UgY29uZmlncmUgZnVuY3Rpb24gJyArXG4gICAgICAgICdhbmFseXRpY3MgZWcge2Jhc2VVcmw6XCJkaGlzX2Jhc2VfdXJsXCIsIHVzZXJuYW1lOlwidXNlcm5hbWVcIiwgJyArXG4gICAgICAgICdwYXNzd29yZDpcInBhc3N3b3JkXCJ9JztcblxuICAgICAgdGhyb3cgRXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICB1cmw6IF9pbnN0YW5jZS5jb25maWcuYmFzZVVybCArIGZldGNoZXIudXJsLFxuICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgIGFkYXB0ZXI6IHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyA/IGh0dHBhZGFwdGVyIDogeGhyYWRhcHRlclxuICAgIH07XG5cbiAgICBpZiAoX2luc3RhbmNlLmNvbmZpZy51c2VybmFtZSAmJiBfaW5zdGFuY2UuY29uZmlnLnBhc3N3b3JkKSB7XG4gICAgICBjb25maWcuYXV0aCA9IHtcbiAgICAgICAgdXNlcm5hbWU6IF9pbnN0YW5jZS5jb25maWcudXNlcm5hbWUsXG4gICAgICAgIHBhc3N3b3JkOiBfaW5zdGFuY2UuY29uZmlnLnBhc3N3b3JkXG4gICAgICB9O1xuICAgIH1cbiAgICBheGlvcy5yZXF1ZXN0KGNvbmZpZykudGhlbigocmVzdWx0cykgPT4ge1xuICAgICAgcmVzb2x2ZShmZXRjaGVyLnBlcmZvcm1Qb3N0UHJvY2VzcyhyZXN1bHRzLmRhdGEpKTtcbiAgICB9LCAoZXJyKSA9PiB7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaGVzIGRhdGEgcmVsYXRlZCB0byBhIGZldGNoZXJcbiAgICogQHBhcmFtIHtGZXRjaGVyfSBmZXRjaGVyXG4gICAqIEByZXR1cm5zIHtQcm9ncmVzc1Byb21pc2V9XG4gICAqL1xuICBnZXRSZXN1bHRzKGZldGNoZXIpIHtcbiAgICBpZiAoZmV0Y2hlci5fZmV0Y2hlcnMpIHsgLy8gSWYgaXMgYSBtdWx0aWZldGNoZXJcbiAgICAgIHJldHVybiB0aGlzLmdldEFsbFJlc3VsdHMoZmV0Y2hlcik7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUHJvZ3Jlc3NQcm9taXNlKChyZXNvbHZlLCByZWplY3QsIHByb2dyZXNzKSA9PiB7XG4gICAgICBpZiAoZmV0Y2hlci5oYXNEZXBlbmRlbmNpZXMoKSkge1xuICAgICAgICBmZXRjaGVyLmdldERlcGVuZGVjeUZldGNoUmVzdWx0cygpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGZldGNoZXIucGVyZm9ybVByZVByb2Nlc3MoKTtcbiAgICAgICAgICB0aGlzLl9mZXRjaChmZXRjaGVyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0VycnJycnJycnJycjonLCBlcnIpO1xuICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2ZldGNoKGZldGNoZXIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2hlcyBkYXRhIGZvciBtdWx0aXBsZSBmZXRjaGVyc1xuICAgKiBAcGFyYW0ge011bHRpRmV0Y2hlcn0gbXVsdGlmZXRjaGVyXG4gICAqIEByZXR1cm5zIHtQcm9ncmVzc1Byb21pc2V9XG4gICAqL1xuICBnZXRBbGxSZXN1bHRzKG11bHRpZmV0Y2hlcikge1xuICAgIHJldHVybiBuZXcgUHJvZ3Jlc3NQcm9taXNlKChyZXNvbHZlLCByZWplY3QsIHByb2dyZXNzKSA9PiB7XG4gICAgICBjb25zdCBwcm9taXNlcyA9IG11bHRpZmV0Y2hlci5mZXRjaGVycy5tYXAoKGZldGNoZXIpID0+IChuZXcgUnVubmVyKCkpLmdldFJlc3VsdHMoZmV0Y2hlcikpO1xuXG4gICAgICByZXR1cm4gUHJvZ3Jlc3NQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigocmVzdWx0cykgPT4ge1xuICAgICAgICByZXNvbHZlKG11bHRpZmV0Y2hlci5wZXJmb3JtUG9zdFByb2Nlc3MocmVzdWx0cykpO1xuICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBGZXRjaGVyIH0gZnJvbSAnLi4vY29yZS9mZXRjaGVyJztcblxuLyoqXG4gKiBUaGlzIHJlcHJlc2VudHMgdGhlIEFuYWx5dGljcyBoZWFkZXJcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBBbmFseXRpY3NIZWFkZXIge31cbi8qKlxuICogVGhpcyByZXByZXNlbnRzIHRoZSBBbmFseXRpY3MgSGVhZGVyc1xuICpcbiAqIEBleHRlbmRzIEFycmF5XG4gKi9cbmV4cG9ydCBjbGFzcyBBbmFseXRpY3NIZWFkZXJzIGV4dGVuZHMgQXJyYXkge1xuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgc3VwZXIoLi4uZGF0YSk7XG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIE9iamVjdC5jcmVhdGUoQW5hbHl0aWNzSGVhZGVycy5wcm90b3R5cGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBkYXRhIGFuYWx5dGljcyBoZWFkZXJcbiAgICpcbiAgICogQHJldHVybnMge0FuYWx5dGljc0hlYWRlcn1cbiAgICovXG4gIGdldCBkeCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRIZWFkZXIoJ2R4Jyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgcGVyaW9kIGFuYWx5dGljcyBoZWFkZXJcbiAgICpcbiAgICogQHJldHVybnMge0FuYWx5dGljc0hlYWRlcn1cbiAgICovXG4gIGdldCBwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRIZWFkZXIoJ3BlJyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgb3JnYW5pc2F0aW9uIHVuaXQgYW5hbHl0aWNzIGhlYWRlclxuICAgKlxuICAgKiBAcmV0dXJucyB7QW5hbHl0aWNzSGVhZGVyfVxuICAgKi9cbiAgZ2V0IG91KCkge1xuICAgIHJldHVybiB0aGlzLmdldEhlYWRlcignb3UnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB2YWx1ZSBhbmFseXRpY3MgaGVhZGVyXG4gICAqXG4gICAqIEByZXR1cm5zIHtBbmFseXRpY3NIZWFkZXJ9XG4gICAqL1xuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0SGVhZGVyKCd2YWx1ZScpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGhlYWRlciBvZiBhIHBhcmFtZXRlclxuICAgKiBAcGFyYW0gaWRcbiAgICogQHJldHVybnMge0FuYWx5dGljc0hlYWRlcn1cbiAgICovXG4gIGdldEhlYWRlcihpZCkge1xuICAgIGxldCByZXR1cm5IZWFkZXI7XG5cbiAgICB0aGlzLmZvckVhY2goKGhlYWRlciwgaW5kZXgpID0+IHtcbiAgICAgIGlmIChoZWFkZXIubmFtZSA9PT0gaWQpIHtcbiAgICAgICAgcmV0dXJuSGVhZGVyID0gaGVhZGVyO1xuICAgICAgICByZXR1cm5IZWFkZXIuaW5kZXggPSBpbmRleDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmV0dXJuSGVhZGVyO1xuICB9XG59XG5cbi8qKlxuICogVGhpcyByZXByZXNlbnRzIHRoZSBBbmFseXRpY3MgUmVzdWx0c1xuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEFuYWx5dGljc09iamVjdCB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuYSBBbmFseXRpY3MgT2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAtIERISVMgQW5hbHl0aWNzIG9iamVjdFxuICAgKi9cbiAgY29uc3RydWN0b3IoYW5hbHl0aWNzT2JqZWN0KSB7XG4gICAgdGhpcy5fZGF0YSA9IGFuYWx5dGljc09iamVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBBbmFseXRpY3MgSGVhZGVycyBBcnJheVxuICAgKlxuICAgKiBAcmV0dXJucyB7QW5hbHl0aWNzSGVhZGVyc31cbiAgICovXG4gIGdldCBoZWFkZXJzKCkge1xuICAgIHJldHVybiBuZXcgQW5hbHl0aWNzSGVhZGVycyh0aGlzLl9kYXRhLmhlYWRlcnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIEFuYWx5dGljcyBNZXRhZGF0YSBPYmplY3RcbiAgICpcbiAgICogQHJldHVybnMgeyp8bWV0YURhdGF8e2RpbWVuc2lvbnMsIG5hbWVzLCBkeCwgcGUsIG91LCBjb318e291SGllcmFyY2h5LCBpdGVtcywgZGltZW5zaW9uc319XG4gICAqL1xuICBnZXQgbWV0YURhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGEubWV0YURhdGE7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgcm93cyBvZiB0aGUgYW5hbHl0aWNzIG9iamVjdFxuICAgKlxuICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAqL1xuICBnZXQgcm93cygpIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YS5yb3dzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIEFuYWx5dGljcyBoZWlnaHRcbiAgICpcbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICovXG4gIGdldCBoZWlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGEuaGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIEFuYWx5dGljcyB3aWR0aFxuICAgKlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0IHdpZHRoKCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhLndpZHRoO1xuICB9XG59XG5cbi8qKlxuICogVGhpcyByZXByZXNlbnRzIHRoZSBBbmFseXRpY3MgRmV0Y2hlciBmb3IgcHJvY2Vzc2luZyBhbmFseXRpY3MgY2FsbHNcbiAqXG4gKiBAZXh0ZW5kcyBGZXRjaGVyXG4gKi9cbmV4cG9ydCBjbGFzcyBBbmFseXRpY3MgZXh0ZW5kcyBGZXRjaGVyIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gYW5hbHl0aWNzIGZldGhjZXJcbiAgICpcbiAgICogQHBhcmFtIG9sZEFuYWx5dGljcyAtIFdoZXRoZXIgdGhlIHN0cnVjdHVyZSB0byBiZSByZXR1cm5lZCBzaG91bGQgYmUgb2xkIG9yIG5ldy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKG9sZEFuYWx5dGljcyA9IHRydWUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucGFyYW1ldGVyc1snZGltZW5zaW9uJ10gPSB7fTtcbiAgICB0aGlzLnBvc3RQcm9jZXNzKGRhdGEgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuc3RhbmRhcmRpemVBbmFseXRpY3MoZGF0YSwgb2xkQW5hbHl0aWNzKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBkYXRhIGZvciB0aGUgZmV0Y2hcbiAgICogQHBhcmFtIGR4XG4gICAqIEByZXR1cm5zIHtBbmFseXRpY3N9XG4gICAqL1xuICBzZXREYXRhKGR4KSB7XG4gICAgdGhpcy5zZXREaW1lbnNpb24oJ2R4JywgZHgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHBlcmlvZCBmb3IgdGhlIGZldGNoXG4gICAqIEBwYXJhbSBwZVxuICAgKiBAcmV0dXJucyB7QW5hbHl0aWNzfVxuICAgKi9cbiAgc2V0UGVyaW9kKHBlKSB7XG4gICAgdGhpcy5zZXREaW1lbnNpb24oJ3BlJywgcGUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIG9yZ2FuaXNhdGlvbiB1bml0IGZvciB0aGUgZmV0Y2hpbmcgb2YgdGhlIGFuYWx5dGljc1xuICAgKiBAcGFyYW0gb3VcbiAgICogQHJldHVybnMge0FuYWx5dGljc31cbiAgICovXG4gIHNldE9yZ1VuaXQob3UpIHtcbiAgICB0aGlzLnNldERpbWVuc2lvbignb3UnLCBvdSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZGltZW5zaW9uIGZvciB0aGUgZmV0Y2hpbmcgb2YgdGhlIGFuYWx5dGljc1xuICAgKiBAcGFyYW0ge2RpbSwgdmFsdWV9XG4gICAqIEByZXR1cm5zIHtBbmFseXRpY3N9XG4gICAqL1xuICBzZXREaW1lbnNpb24oZGltLCB2YWx1ZSkge1xuICAgIHRoaXMucGFyYW1ldGVyc1snZGltZW5zaW9uJ11bZGltXSA9IHZhbHVlID8gdmFsdWUgOiAnJztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFuZGFyZGl6ZXMgdGhlIGFuYWx5dGljcyBvYmplY3RcbiAgICpcbiAgICogQHBhcmFtIGFuYWx5dGljc09iamVjdCAtIFRoZSBhbmFseXRpY3Mgb2JqZWN0XG4gICAqIEBwYXJhbSBwcmVmZXJOb3JtYWxTdHJ1Y3R1cmUgLSBXaGV0aGVyIHRvIHByZWZlciB0aGUgb2xkIG9yIG5ldyBhbmFseXRpY3Mgc3RydWN0dXJlXG4gICAqIEByZXR1cm5zIHtBbmFseXRpY3NPYmplY3R9XG4gICAqL1xuICBzdGFuZGFyZGl6ZUFuYWx5dGljcyhhbmFseXRpY3NPYmplY3QsIHByZWZlck5vcm1hbFN0cnVjdHVyZSA9IHRydWUpIHtcbiAgICAvLyBpZiBTZXJ2ZXJzaWRlIEV2ZW50IGNsdXN0ZXJpbmcgZG8gbm90aGluZ1xuICAgIGlmIChhbmFseXRpY3NPYmplY3QuY291bnQpIHtcbiAgICAgIHJldHVybiBhbmFseXRpY3NPYmplY3Q7XG4gICAgfVxuICAgIGxldCBzYW5pdGl6ZWRBbmFseXRpY3NPYmplY3QgPSB7XG4gICAgICBoZWFkZXJzOiBbXSxcbiAgICAgIG1ldGFEYXRhOiB7XG4gICAgICAgIGRpbWVuc2lvbnM6IHt9LFxuICAgICAgICBuYW1lczoge30sXG4gICAgICAgIGR4OiBbXSxcbiAgICAgICAgcGU6IFtdLFxuICAgICAgICBvdTogW10sXG4gICAgICAgIGNvOiBbXVxuICAgICAgfSxcbiAgICAgIHJvd3M6IFtdXG4gICAgfTtcblxuICAgIGlmIChhbmFseXRpY3NPYmplY3QpIHtcbiAgICAgIC8qKlxuICAgICAgICogQ2hlY2sgaGVhZGVyc1xuICAgICAgICovXG4gICAgICBpZiAoYW5hbHl0aWNzT2JqZWN0LmhlYWRlcnMpIHtcbiAgICAgICAgYW5hbHl0aWNzT2JqZWN0LmhlYWRlcnMuZm9yRWFjaCgoaGVhZGVyKSA9PiB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBuZXdIZWFkZXIgPSBoZWFkZXI7XG5cbiAgICAgICAgICAgIHNhbml0aXplZEFuYWx5dGljc09iamVjdC5oZWFkZXJzLnB1c2gobmV3SGVhZGVyKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0ludmFsaWQgaGVhZGVyIG9iamVjdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogQ2hlY2sgbWV0YURhdGFcbiAgICAgICAqL1xuICAgICAgaWYgKGFuYWx5dGljc09iamVjdC5tZXRhRGF0YSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGxldCBzYW5pdGl6ZWRNZXRhZGF0YSA9IHRoaXMuZ2V0U2FuaXRpemVkQW5hbHl0aWNzTWV0YWRhdGEoXG4gICAgICAgICAgICBhbmFseXRpY3NPYmplY3QubWV0YURhdGEsXG4gICAgICAgICAgICBwcmVmZXJOb3JtYWxTdHJ1Y3R1cmVcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgc2FuaXRpemVkQW5hbHl0aWNzT2JqZWN0Lm1ldGFEYXRhID0gc2FuaXRpemVkTWV0YWRhdGE7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ0ludmFsaWQgbWV0YWRhdGEgb2JqZWN0Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBDaGVjayByb3dzXG4gICAgICAgKi9cbiAgICAgIGlmIChhbmFseXRpY3NPYmplY3Qucm93cykge1xuICAgICAgICBzYW5pdGl6ZWRBbmFseXRpY3NPYmplY3Qucm93cyA9IGFuYWx5dGljc09iamVjdC5yb3dzO1xuICAgICAgfVxuICAgIH1cbiAgICBzYW5pdGl6ZWRBbmFseXRpY3NPYmplY3QuaGVpZ2h0ID0gYW5hbHl0aWNzT2JqZWN0LmhlaWdodDtcbiAgICBzYW5pdGl6ZWRBbmFseXRpY3NPYmplY3Qud2lkdGggPSBhbmFseXRpY3NPYmplY3Qud2lkdGg7XG4gICAgcmV0dXJuIG5ldyBBbmFseXRpY3NPYmplY3Qoc2FuaXRpemVkQW5hbHl0aWNzT2JqZWN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFuZGFyZGl6ZXMgdGhlIGFuYWx5dGljcyBtZXRhZGF0YSBvYmplY3RcbiAgICpcbiAgICogQHBhcmFtIGFuYWx5dGljTWV0YWRhdGEgLSBUaGUgYW5hbHl0aWNzIG1ldGFkYXRhIG9iamVjdFxuICAgKiBAcGFyYW0gcHJlZmVyTm9ybWFsU3RydWN0dXJlIC0gV2hldGhlciB0byBwcmVmZXIgdGhlIG9sZCBvciBuZXcgYW5hbHl0aWNzIHN0cnVjdHVyZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgZ2V0U2FuaXRpemVkQW5hbHl0aWNzTWV0YWRhdGEoYW5hbHl0aWNNZXRhZGF0YSwgcHJlZmVyTm9ybWFsU3RydWN0dXJlKSB7XG4gICAgbGV0IHNhbml0aXplZE1ldGFkYXRhID0ge307XG5cbiAgICBpZiAoYW5hbHl0aWNNZXRhZGF0YSkge1xuICAgICAgaWYgKGFuYWx5dGljTWV0YWRhdGEub3VIaWVyYXJjaHkpIHtcbiAgICAgICAgc2FuaXRpemVkTWV0YWRhdGEub3VIaWVyYXJjaHkgPSBhbmFseXRpY01ldGFkYXRhLm91SGllcmFyY2h5O1xuICAgICAgfVxuICAgICAgaWYgKHByZWZlck5vcm1hbFN0cnVjdHVyZSkgeyAvLyBHZXQgb2xkIHN0cnVjdHVyZVxuICAgICAgICBzYW5pdGl6ZWRNZXRhZGF0YS5uYW1lcyA9IHt9O1xuICAgICAgICBpZiAoYW5hbHl0aWNNZXRhZGF0YS5uYW1lcykge1xuICAgICAgICAgIHNhbml0aXplZE1ldGFkYXRhLm5hbWVzID0gYW5hbHl0aWNNZXRhZGF0YS5uYW1lcztcbiAgICAgICAgfSBlbHNlIGlmIChhbmFseXRpY01ldGFkYXRhLml0ZW1zKSB7XG4gICAgICAgICAgT2JqZWN0LmtleXMoYW5hbHl0aWNNZXRhZGF0YS5pdGVtcykuZm9yRWFjaChuYW1lS2V5ID0+IHtcbiAgICAgICAgICAgIHNhbml0aXplZE1ldGFkYXRhLm5hbWVzW25hbWVLZXldID0gYW5hbHl0aWNNZXRhZGF0YS5pdGVtc1tuYW1lS2V5XS5uYW1lO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFuYWx5dGljTWV0YWRhdGEuZGltZW5zaW9ucykge1xuICAgICAgICAgIE9iamVjdC5rZXlzKGFuYWx5dGljTWV0YWRhdGEuZGltZW5zaW9ucykuZm9yRWFjaChcbiAgICAgICAgICAgIG5hbWVLZXkgPT4ge1xuICAgICAgICAgICAgICBzYW5pdGl6ZWRNZXRhZGF0YVtuYW1lS2V5XSA9XG4gICAgICAgICAgICAgICAgYW5hbHl0aWNNZXRhZGF0YS5kaW1lbnNpb25zW25hbWVLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7IC8vIEdldCBuZXcgc3RydWN0dXJlXG4gICAgICAgIHNhbml0aXplZE1ldGFkYXRhLml0ZW1zID0ge307XG4gICAgICAgIGlmIChhbmFseXRpY01ldGFkYXRhLml0ZW1zKSB7XG4gICAgICAgICAgc2FuaXRpemVkTWV0YWRhdGEuaXRlbXMgPSBhbmFseXRpY01ldGFkYXRhLml0ZW1zO1xuICAgICAgICB9IGVsc2UgaWYgKGFuYWx5dGljTWV0YWRhdGEubmFtZXMpIHtcbiAgICAgICAgICBPYmplY3Qua2V5cyhhbmFseXRpY01ldGFkYXRhLml0ZW1zKS5mb3JFYWNoKG5hbWVLZXkgPT4ge1xuICAgICAgICAgICAgYW5hbHl0aWNNZXRhZGF0YS5pdGVtc1tuYW1lS2V5XSA9IHtcbiAgICAgICAgICAgICAgbmFtZTogYW5hbHl0aWNNZXRhZGF0YS5uYW1lc1tuYW1lS2V5XVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghYW5hbHl0aWNNZXRhZGF0YS5kaW1lbnNpb25zKSB7XG4gICAgICAgICAgc2FuaXRpemVkTWV0YWRhdGEuZGltZW5zaW9ucyA9IHt9O1xuICAgICAgICAgIE9iamVjdC5rZXlzKGFuYWx5dGljTWV0YWRhdGEpLmZvckVhY2gobmFtZUtleSA9PiB7XG4gICAgICAgICAgICBpZiAoWyduYW1lcycsICdpdGVtcycsICdkaW1lbnNpb25zJ10uaW5kZXhPZihuYW1lS2V5KSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgc2FuaXRpemVkTWV0YWRhdGEuZGltZW5zaW9uc1tuYW1lS2V5XSA9IGFuYWx5dGljTWV0YWRhdGFbbmFtZUtleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2FuaXRpemVkTWV0YWRhdGEuZGltZW5zaW9ucyA9IGFuYWx5dGljTWV0YWRhdGEuZGltZW5zaW9ucztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2FuaXRpemVkTWV0YWRhdGE7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgdXJsIGZvciBmZXRjaGluZ1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0IHVybCgpIHtcbiAgICByZXR1cm4gJ2FuYWx5dGljcz8nICsgdGhpcy5fdXJsUGFyYW1ldGVycztcbiAgfVxufVxuIiwiaW1wb3J0IHsgQW5hbHl0aWNzIH0gZnJvbSAnLi9hbmFseXRpY3MnO1xuXG4vKipcbiAqIFRoaXMgcmVwcmVzZW50cyB0aGUgRXZlbnQgQW5hbHl0aWNzIEZldGNoZXIgZm9yIHByb2Nlc3NpbmcgYW5hbHl0aWNzIGNhbGxzXG4gKlxuICogQGV4dGVuZHMgRmV0Y2hlclxuICovXG5leHBvcnQgY2xhc3MgRXZlbnRBbmFseXRpY3MgZXh0ZW5kcyBBbmFseXRpY3Mge1xuICAvKipcbiAgICogU2V0cyB0aGUgUHJvZ3JhbSBmb3IgdGhlIGZldGNoXG4gICAqIEBwYXJhbSBwcm9ncmFtXG4gICAqIEByZXR1cm5zIHtFdmVudEFuYWx5dGljc31cbiAgICovXG4gIHNldFByb2dyYW0ocHJvZ3JhbSkge1xuICAgIHRoaXMucHJvZ3JhbSA9IHByb2dyYW07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqXG4gICAqIEdldHMgdGhlIHVybCBmb3IgZmV0Y2hpbmdcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIGdldCB1cmwoKSB7XG4gICAgcmV0dXJuICdhbmFseXRpY3MvZXZlbnRzL3F1ZXJ5LycgKyB0aGlzLnByb2dyYW0gKyAnPycgKyB0aGlzLl91cmxQYXJhbWV0ZXJzO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJZGVudGlmaWFibGVPYmplY3QgfSBmcm9tICcuLi9jb3JlL2lkZW50aWZpYWJsZS1vYmplY3QnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGZldGNoZXIgZm9yIHRoZSBvcmdhbmlzYXRpb24gdW5pdFxuICpcbiAqIEBleHRlbmRzIElkZW50aWZpYWJsZU9iamVjdFxuICovXG5leHBvcnQgY2xhc3MgT3JnYW5pc2F0aW9uVW5pdCBleHRlbmRzIElkZW50aWZpYWJsZU9iamVjdCB7XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIG5hbWUgZm9yIGZldGNoaW5nIHRoZSBpZGVudGlmaWFibGUgb2JqZWN0XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gJ29yZ2FuaXNhdGlvblVuaXRzJztcbiAgfVxufVxuIiwiaW1wb3J0IHsgRmV0Y2hlciB9IGZyb20gJy4uL2NvcmUvZmV0Y2hlcic7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGZldGNoZXIgdG8gbG9hZCBzcWwgdmlldyBkYXRhXG4gKlxuICogQGV4dGVuZHMgRmV0Y2hlclxuICovXG5leHBvcnQgY2xhc3MgU1FMVmlld0RhdGEgZXh0ZW5kcyBGZXRjaGVyIHtcblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgU1FMVmlld0RhdGEgSW5zdGFuY2VcbiAgICogQHBhcmFtIGlkXG4gICAqL1xuICBjb25zdHJ1Y3RvcihpZCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5faWQgPSBpZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB1cmwgZm9yIGZldGNoaW5nXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBnZXQgdXJsKCkge1xuICAgIHZhciB1cmwgPSAnc3FsVmlld3MvJyArIHRoaXMuX2lkICsgJy9kYXRhLmpzb24nO1xuXG4gICAgcmV0dXJuIHVybDtcbiAgfVxufVxuIiwiaW1wb3J0IHtBbmFseXRpY3MsIEFuYWx5dGljc09iamVjdCwgQW5hbHl0aWNzSGVhZGVyc30gZnJvbSAnLi9pbXBsL2FuYWx5dGljcy5qcyc7XG5pbXBvcnQge0V2ZW50QW5hbHl0aWNzfSBmcm9tICcuL2ltcGwvZXZlbnQtYW5hbHl0aWNzLmpzJztcbmltcG9ydCB7U1FMVmlld0RhdGF9IGZyb20gJy4vaW1wbC9zcWwtdmlldy5qcyc7XG5pbXBvcnQge09yZ2FuaXNhdGlvblVuaXR9IGZyb20gJy4vaW1wbC9vcmdhbmlzYXRpb24tdW5pdC5qcyc7XG5pbXBvcnQgUHJvZ3Jlc3NQcm9taXNlIGZyb20gJ3Byb2dyZXNzLXByb21pc2UnO1xuaW1wb3J0IHsgUnVubmVyIH0gZnJvbSAnLi9jb3JlL3J1bm5lci5qcyc7XG5pbXBvcnQgeyBEZXBlbmRlbmN5IH0gZnJvbSAnLi9jb3JlL3Byb2Nlc3Nvcic7XG5pbXBvcnQgeyBNdWx0aUZldGNoZXIgfSBmcm9tICcuL2NvcmUvbXVsdGktZmV0Y2hlcic7XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgbWFpbiBob2xkZXIgZm9yIHRoZSBmdW5jdGlvbmFsaXRpZXMgb2YgdGhlIGZ1bmN0aW9uXG4gKiBAdHlwZSB7e1Byb21pc2U6IFByb2dyZXNzUHJvbWlzZSwgQW5hbHl0aWNzOiBBbmFseXRpY3MsXG4gICogICBBbmFseXRpY3NPYmplY3Q6IEFuYWx5dGljc09iamVjdCwgQW5hbHl0aWNzSGVhZGVyczogQW5hbHl0aWNzSGVhZGVycyxcbiAgKiAgIE9yZ2FuaXNhdGlvblVuaXQ6IE9yZ2FuaXNhdGlvblVuaXQsIFNRTFZpZXdEYXRhOiBTUUxWaWV3RGF0YSxcbiAgKiAgIFJ1bm5lcjogUnVubmVyLCBEZXBlbmRlbmN5OiBEZXBlbmRlbmN5LCBNdWx0aUZldGNoZXI6IE11bHRpRmV0Y2hlcixcbiAgKiAgIGFsbDogKGZ1bmN0aW9uKEZldGNoZXJbXSkpLCBpbml0OiAoZnVuY3Rpb24oKj0pKX1cbiAgKiB9XG4gKi9cbmxldCBGbiA9IHtcbiAgUHJvbWlzZTogUHJvZ3Jlc3NQcm9taXNlLFxuICBBbmFseXRpY3M6IEFuYWx5dGljcyxcbiAgRXZlbnRBbmFseXRpY3M6IEV2ZW50QW5hbHl0aWNzLFxuICBBbmFseXRpY3NPYmplY3Q6IEFuYWx5dGljc09iamVjdCxcbiAgQW5hbHl0aWNzSGVhZGVyczogQW5hbHl0aWNzSGVhZGVycyxcbiAgT3JnYW5pc2F0aW9uVW5pdDogT3JnYW5pc2F0aW9uVW5pdCxcbiAgU1FMVmlld0RhdGE6IFNRTFZpZXdEYXRhLFxuICBSdW5uZXI6IFJ1bm5lcixcbiAgRGVwZW5kZW5jeTogRGVwZW5kZW5jeSxcbiAgTXVsdGlGZXRjaGVyOiBNdWx0aUZldGNoZXIsXG4gIC8qKlxuICAgKiBBZGRzIG11bHRpcGxlIGZldGNoZXJzIGluIHF1ZXVlIGZvciBleGVjdXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7RmV0Y2hlcltdfSBmZXRjaGVycyAtIFRoZSBmZXRoZXJzIGlzIGFuIGFycmF5IG9mIHRoZSBmZXRjaGVyc1xuICAgKiBAcmV0dXJucyB7UHJvZ3Jlc3NQcm9taXNlfSAtIFByb2dyZXNzIFByb21pc2UgZm9yIGZldGNoaW5nIHRoZSB2YXJpb3VzIGZldGNoZXJzXG4gICAqIEBleGFtcGxlXG4gICAqIEZuLmFsbChbbmV3IEZuLkFuYWx5dGljcygpLCBuZXcgRm4uT3JnYW5pc2F0aW9uVW5pdCgpXSk7XG4gICAqL1xuICBhbGw6IChmZXRjaGVycykgPT4ge1xuICAgIHJldHVybiBuZXcgTXVsdGlGZXRjaGVyKGZldGNoZXJzKTtcbiAgfSxcbiAgLyoqXG4gICAqIENvbmZpZ3VyZXMgdGhlIHJ1bm5pbmcgZW52aXJvbm1lbnQgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlndXJhdGlvbiAtIFRoZSBmZXRoZXJzIGlzIGFuIGFycmF5IG9mIHRoZSBmZXRjaGVyc1xuICAgKiBAcmV0dXJucyB7UHJvZ3Jlc3NQcm9taXNlfSAtIFByb2dyZXNzIFByb21pc2UgZm9yIGZldGNoaW5nIHRoZSB2YXJpb3VzIGZldGNoZXJzXG4gICAqIEBleGFtcGxlXG4gICAqIEZuLmFsbCh7YmFzZVVybDonJ30pO1xuICAgKi9cbiAgaW5pdDogKGNvbmZpZyk9PntcbiAgICBSdW5uZXIuaW5pdGlhdGVSdW5uZXIoY29uZmlnKTtcbiAgfVxufTtcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHdpbmRvdy5GbiA9IEZuO1xufVxuZXhwb3J0IHsgRm4gfTtcbiJdLCJzb3VyY2VSb290IjoiIn0=