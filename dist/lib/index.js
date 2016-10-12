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

	var _VideoCoverFallback = __webpack_require__(3);

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
	  forceFallback: _react.PropTypes.bool,
	  /**
	   * If set, an event listener on window-resize is added when the Fallback is used.
	   * It will re-evaluate the aspect-ratio and update the styles if necessary.
	   * This has no effect if the fallback is not used.
	   * The classic example where it makes sense to use this is when using a background video.
	   * If you need to react to different events to re-measure the aspect-ratio
	   * please see the onFallbackDidMount prop.
	   * default: false
	   */
	  remeasureOnWindowResize: _react.PropTypes.bool,
	  /**
	   * Will be executed when the Fallback is mounted.
	   * The only parameter is a function, which can be used to force a re-measuring,
	   * for example after the size of the surrounding container has changed.
	   * Please note that this will only be invoked if the fallback is used, that is in IE.
	   * See ResizableCoverExample for an example implementation.
	   */
	  onFallbackDidMount: _react.PropTypes.func,
	  /**
	   * Will be executed before the Fallback unmounts.
	   * You probably want to use this to clear any event-listeners added in onFallbackDidMount.
	   */
	  onFallbackWillUnmount: _react.PropTypes.func,
	  /**
	   * All members of videoOptions will be passed as props to the <video/>.
	   */
	  videoOptions: _react.PropTypes.object,
	  /**
	   * Additional styles which will be merged with those defined by this component.
	   * Please note that some styles are not possible to override, in particular:
	   *   - object-fit: cover (when the fallback is not used)
	   *   - position: relative and overflow: hidden (when the fallback is used)
	   */
	  style: _react.PropTypes.object,
	  /**
	   * Use this to set a custom className.
	   */
	  className: _react.PropTypes.string
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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

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
	        var _this$containerRef$ge = _this.containerRef.getBoundingClientRect();

	        var width = _this$containerRef$ge.width;
	        var height = _this$containerRef$ge.height;

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

	      var _state = this.state;
	      var innerRatio = _state.innerRatio;
	      var outerRatio = _state.outerRatio;

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
	  style: _react.PropTypes.object,
	  onFallbackDidMount: _react.PropTypes.func,
	  onFallbackWillUnmount: _react.PropTypes.func,
	  videoOptions: _react.PropTypes.object,
	  forceFallback: _react.PropTypes.bool,
	  remeasureOnWindowResize: _react.PropTypes.bool,
	  className: _react.PropTypes.string
	};
	exports.default = VideoCoverFallback;

/***/ }
/******/ ])
});
;