(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define("react-video-cover", ["react"], factory);
	else if(typeof exports === 'object')
		exports["react-video-cover"] = factory(require("react"));
	else
		root["react-video-cover"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _VideoCoverFallback = __webpack_require__(8);

	var _VideoCoverFallback2 = _interopRequireDefault(_VideoCoverFallback);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/*
	 * this component is a simple wrapper around <video/> that displays the video filling
	 * the container, while preserving it's aspect ratio
	 * this is analogous to background-size: cover for background images
	 * and very easy to achieve with the css property object-fit: cover
	 * unfortunately object-fit is not implemented in IE so a fallback will be used
	 *
	 * IF YOU DO NOT HAVE TO SUPPORT IE, you probably do not need this component
	 * just have a look at the styles for the non-fallback implementation
	 */
	var VideoCover = function (_Component) {
	  _inherits(VideoCover, _Component);

	  function VideoCover() {
	    _classCallCheck(this, VideoCover);

	    return _possibleConstructorReturn(this, (VideoCover.__proto__ || Object.getPrototypeOf(VideoCover)).apply(this, arguments));
	  }

	  _createClass(VideoCover, [{
	    key: 'render',
	    value: function render() {
	      var style = _extends({
	        width: '100%',
	        height: '100%'
	      }, this.props.style, {
	        objectFit: 'cover'
	      });
	      if (this.props.forceFallback || /MSIE|Trident|Edge/.test(window.navigator.userAgent)) {
	        return _react2.default.createElement(_VideoCoverFallback2.default, this.props);
	      }
	      return _react2.default.createElement('video', _extends({
	        className: this.props.className,
	        style: style
	      }, this.props.videoOptions));
	    }
	  }]);

	  return VideoCover;
	}(_react.Component);

	VideoCover.propTypes = {
	  /**
	   * This component will use object-fit: cover if available,
	   * that is in all modern browsers except IE.
	   * This prop forces use of the fallback. This is helpful during troubleshooting,
	   * but apart from that you should not use it.
	   * default: false
	   */
	  forceFallback: _propTypes2.default.bool,
	  /**
	   * If set, an event listener on window-resize is added when the Fallback is used.
	   * It will re-evaluate the aspect-ratio and update the styles if necessary.
	   * This has no effect if the fallback is not used.
	   * The classic example where it makes sense to use this is when using a background video.
	   * If you need to react to different events to re-measure the aspect-ratio
	   * please see the onFallbackDidMount prop.
	   * default: false
	   */
	  remeasureOnWindowResize: _propTypes2.default.bool,
	  /**
	   * Will be executed when the Fallback is mounted.
	   * The only parameter is a function, which can be used to force a re-measuring,
	   * for example after the size of the surrounding container has changed.
	   * Please note that this will only be invoked if the fallback is used, that is in IE.
	   * See ResizableCoverExample for an example implementation.
	   */
	  onFallbackDidMount: _propTypes2.default.func,
	  /**
	   * Will be executed before the Fallback unmounts.
	   * You probably want to use this to clear any event-listeners added in onFallbackDidMount.
	   */
	  onFallbackWillUnmount: _propTypes2.default.func,
	  /**
	   * All members of videoOptions will be passed as props to the <video/>.
	   */
	  videoOptions: _propTypes2.default.object,
	  /**
	   * Additional styles which will be merged with those defined by this component.
	   * Please note that some styles are not possible to override, in particular:
	   *   - object-fit: cover (when the fallback is not used)
	   *   - position: relative and overflow: hidden (when the fallback is used)
	   */
	  style: _propTypes2.default.object,
	  /**
	   * Use this to set a custom className.
	   */
	  className: _propTypes2.default.string
	};
	VideoCover.defaultProps = {
	  forceFallback: false,
	  remeasureOnWindowResize: false
	};
	exports.default = VideoCover;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	if (false) {
	  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

	  var isValidElement = function isValidElement(object) {
	    return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(4)();
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(5);
	var invariant = __webpack_require__(6);
	var ReactPropTypesSecret = __webpack_require__(7);

	module.exports = function () {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim
	  };

	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	if (false) {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var VideoCoverFallback = function (_Component) {
	  _inherits(VideoCoverFallback, _Component);

	  function VideoCoverFallback() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, VideoCoverFallback);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = VideoCoverFallback.__proto__ || Object.getPrototypeOf(VideoCoverFallback)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      innerRatio: undefined,
	      outerRatio: undefined
	    }, _this.updateContainerRatio = function () {
	      if (_this.containerRef) {
	        var _this$containerRef$ge = _this.containerRef.getBoundingClientRect(),
	            width = _this$containerRef$ge.width,
	            height = _this$containerRef$ge.height;

	        _this.setState({
	          outerRatio: width / height
	        });
	      }
	    }, _this.updateVideoRatio = function (width, height) {
	      _this.setState({
	        innerRatio: width / height
	      });
	    }, _this.initEventListeners = function () {
	      window.addEventListener('resize', _this.updateContainerRatio);
	    }, _this.removeEventListeners = function () {
	      window.removeEventListener('resize', _this.updateContainerRatio);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(VideoCoverFallback, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.updateContainerRatio();
	      if (typeof this.props.onFallbackDidMount === 'function') {
	        this.props.onFallbackDidMount(this.updateContainerRatio);
	      }
	      if (this.props.remeasureOnWindowResize) {
	        this.initEventListeners();
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.remeasureOnWindowResize !== this.props.remeasureOnWindowResize) {
	        if (nextProps.remeasureOnWindowResize) {
	          this.initEventListeners();
	        } else {
	          this.removeEventListeners();
	        }
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.removeEventListeners();
	      if (typeof this.props.onFallbackWillUnmount === 'function') {
	        this.props.onFallbackWillUnmount();
	      }
	    }
	  }, {
	    key: 'render',


	    /**
	     * We can get the width and height of a video after it has started loading.
	     * Then we can compare the aspect ratio of the video to that of it's surrounding container.
	     * That is all we need to determine if the video fills the container vertically or horizontally.
	     * In the other dimension we just have to maintain the original aspect-ratio.
	     */
	    value: function render() {
	      var _this2 = this;

	      var _state = this.state,
	          innerRatio = _state.innerRatio,
	          outerRatio = _state.outerRatio;

	      var style = {
	        width: innerRatio > outerRatio ? 'auto' : '100%',
	        height: innerRatio > outerRatio ? '100%' : 'auto',

	        /* the following is for centering the video.
	        There has to be some better solution?!
	        any help is very much appreciated :) */
	        position: 'absolute',
	        top: '-9999px',
	        bottom: '-9999px',
	        left: '-9999px',
	        right: '-9999px',
	        margin: 'auto'
	      };

	      var outerStyle = _extends({
	        width: '100%',
	        height: '100%'
	      }, this.props.style, {
	        position: 'relative',
	        overflow: 'hidden'
	      });

	      return _react2.default.createElement(
	        'div',
	        {
	          style: outerStyle,
	          ref: function ref(_ref2) {
	            _this2.containerRef = _ref2;
	          },
	          className: this.props.className
	        },
	        _react2.default.createElement('video', _extends({
	          onLoadedData: function onLoadedData(event) {
	            _this2.updateVideoRatio(event.target.videoWidth, event.target.videoHeight);
	          },
	          style: style
	        }, this.props.videoOptions))
	      );
	    }
	  }]);

	  return VideoCoverFallback;
	}(_react.Component);

	VideoCoverFallback.propTypes = {
	  style: _propTypes2.default.object,
	  onFallbackDidMount: _propTypes2.default.func,
	  onFallbackWillUnmount: _propTypes2.default.func,
	  videoOptions: _propTypes2.default.object,
	  forceFallback: _propTypes2.default.bool,
	  remeasureOnWindowResize: _propTypes2.default.bool,
	  className: _propTypes2.default.string
	};
	exports.default = VideoCoverFallback;

/***/ }
/******/ ])
});
;