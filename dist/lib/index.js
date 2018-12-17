(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define("react-video-cover", ["prop-types", "react"], factory);
	else if(typeof exports === 'object')
		exports["react-video-cover"] = factory(require("prop-types"), require("react"));
	else
		root["react-video-cover"] = factory(root["prop-types"], root["react"]);
})(global, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__1__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(1);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// CONCATENATED MODULE: ./lib/VideoCoverFallback.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }




var VideoCoverFallback_VideoCoverFallback =
/*#__PURE__*/
function (_Component) {
  _inherits(VideoCoverFallback, _Component);

  function VideoCoverFallback(props) {
    var _this;

    _classCallCheck(this, VideoCoverFallback);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VideoCoverFallback).call(this, props));
    _this.state = {
      innerRatio: undefined,
      outerRatio: undefined
    };
    _this.updateContainerRatio = _this.updateContainerRatio.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.updateVideoRatio = _this.updateVideoRatio.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.initEventListeners = _this.initEventListeners.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.removeEventListeners = _this.removeEventListeners.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(VideoCoverFallback, [{
    key: "componentDidMount",
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
    key: "componentWillReceiveProps",
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
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.removeEventListeners();

      if (typeof this.props.onFallbackWillUnmount === 'function') {
        this.props.onFallbackWillUnmount();
      }
    }
  }, {
    key: "updateContainerRatio",
    value: function updateContainerRatio() {
      if (this.containerRef) {
        var _this$containerRef$ge = this.containerRef.getBoundingClientRect(),
            width = _this$containerRef$ge.width,
            height = _this$containerRef$ge.height;

        this.setState({
          outerRatio: width / height
        });
      }
    }
  }, {
    key: "updateVideoRatio",
    value: function updateVideoRatio(width, height) {
      this.setState({
        innerRatio: width / height
      });
    }
  }, {
    key: "initEventListeners",
    value: function initEventListeners() {
      window.addEventListener('resize', this.updateContainerRatio);
    }
  }, {
    key: "removeEventListeners",
    value: function removeEventListeners() {
      window.removeEventListener('resize', this.updateContainerRatio);
    }
    /**
     * We can get the width and height of a video after it has started loading.
     * Then we can compare the aspect ratio of the video to that of it's surrounding container.
     * That is all we need to determine if the video fills the container vertically or horizontally.
     * In the other dimension we just have to maintain the original aspect-ratio.
     */

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          innerRatio = _this$state.innerRatio,
          outerRatio = _this$state.outerRatio;
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

      var outerStyle = _objectSpread({
        width: '100%',
        height: '100%'
      }, this.props.style, {
        position: 'relative',
        overflow: 'hidden'
      });

      return external_react_default.a.createElement("div", {
        style: outerStyle,
        ref: function ref(_ref) {
          _this2.containerRef = _ref;
        },
        className: this.props.className
      }, external_react_default.a.createElement("video", _extends({
        onLoadedData: function onLoadedData(event) {
          _this2.updateVideoRatio(event.target.videoWidth, event.target.videoHeight);
        },
        style: style
      }, this.props.videoOptions)));
    }
  }]);

  return VideoCoverFallback;
}(external_react_["Component"]);

VideoCoverFallback_VideoCoverFallback.propTypes = {
  style: external_prop_types_default.a.object,
  onFallbackDidMount: external_prop_types_default.a.func,
  onFallbackWillUnmount: external_prop_types_default.a.func,
  videoOptions: external_prop_types_default.a.object,
  forceFallback: external_prop_types_default.a.bool,
  remeasureOnWindowResize: external_prop_types_default.a.bool,
  className: external_prop_types_default.a.string
};
/* harmony default export */ var lib_VideoCoverFallback = (VideoCoverFallback_VideoCoverFallback);
// CONCATENATED MODULE: ./lib/index.js
function lib_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { lib_typeof = function _typeof(obj) { return typeof obj; }; } else { lib_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return lib_typeof(obj); }

function lib_extends() { lib_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return lib_extends.apply(this, arguments); }

function lib_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { lib_defineProperty(target, key, source[key]); }); } return target; }

function lib_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function lib_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function lib_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function lib_createClass(Constructor, protoProps, staticProps) { if (protoProps) lib_defineProperties(Constructor.prototype, protoProps); if (staticProps) lib_defineProperties(Constructor, staticProps); return Constructor; }

function lib_possibleConstructorReturn(self, call) { if (call && (lib_typeof(call) === "object" || typeof call === "function")) { return call; } return lib_assertThisInitialized(self); }

function lib_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function lib_getPrototypeOf(o) { lib_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return lib_getPrototypeOf(o); }

function lib_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) lib_setPrototypeOf(subClass, superClass); }

function lib_setPrototypeOf(o, p) { lib_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return lib_setPrototypeOf(o, p); }




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

var lib_VideoCover =
/*#__PURE__*/
function (_Component) {
  lib_inherits(VideoCover, _Component);

  function VideoCover() {
    lib_classCallCheck(this, VideoCover);

    return lib_possibleConstructorReturn(this, lib_getPrototypeOf(VideoCover).apply(this, arguments));
  }

  lib_createClass(VideoCover, [{
    key: "render",
    value: function render() {
      var style = lib_objectSpread({
        width: '100%',
        height: '100%'
      }, this.props.style, {
        objectFit: 'cover'
      });

      if (this.props.forceFallback || typeof window !== 'undefined' && /MSIE|Trident|Edge/.test(window.navigator.userAgent)) {
        return external_react_default.a.createElement(lib_VideoCoverFallback, this.props);
      }

      return external_react_default.a.createElement("video", lib_extends({
        className: this.props.className,
        style: style
      }, this.props.videoOptions));
    }
  }]);

  return VideoCover;
}(external_react_["Component"]);

lib_VideoCover.propTypes = {
  /**
   * This component will use object-fit: cover if available,
   * that is in all modern browsers except IE.
   * This prop forces use of the fallback. This is helpful during troubleshooting,
   * but apart from that you should not use it.
   * default: false
   */
  forceFallback: external_prop_types_default.a.bool,

  /**
   * If set, an event listener on window-resize is added when the Fallback is used.
   * It will re-evaluate the aspect-ratio and update the styles if necessary.
   * This has no effect if the fallback is not used.
   * The classic example where it makes sense to use this is when using a background video.
   * If you need to react to different events to re-measure the aspect-ratio
   * please see the onFallbackDidMount prop.
   * default: false
   */
  remeasureOnWindowResize: external_prop_types_default.a.bool,

  /**
   * Will be executed when the Fallback is mounted.
   * The only parameter is a function, which can be used to force a re-measuring,
   * for example after the size of the surrounding container has changed.
   * Please note that this will only be invoked if the fallback is used, that is in IE.
   * See ResizableCoverExample for an example implementation.
   */
  onFallbackDidMount: external_prop_types_default.a.func,

  /**
   * Will be executed before the Fallback unmounts.
   * You probably want to use this to clear any event-listeners added in onFallbackDidMount.
   */
  onFallbackWillUnmount: external_prop_types_default.a.func,

  /**
   * All members of videoOptions will be passed as props to the <video/>.
   */
  videoOptions: external_prop_types_default.a.object,

  /**
   * Additional styles which will be merged with those defined by this component.
   * Please note that some styles are not possible to override, in particular:
   *   - object-fit: cover (when the fallback is not used)
   *   - position: relative and overflow: hidden (when the fallback is used)
   */
  style: external_prop_types_default.a.object,

  /**
   * Use this to set a custom className.
   */
  className: external_prop_types_default.a.string
};
lib_VideoCover.defaultProps = {
  forceFallback: false,
  remeasureOnWindowResize: false
};
/* harmony default export */ var lib = __webpack_exports__["default"] = (lib_VideoCover);

/***/ })
/******/ ]);
});