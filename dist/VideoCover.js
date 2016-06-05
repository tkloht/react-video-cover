'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _VideoCoverFallback = require('./VideoCoverFallback');

var _VideoCoverFallback2 = _interopRequireDefault(_VideoCoverFallback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * this component is a simple wrapper around <video/> that displays the video filling
 * the container, while preserving it's aspect ratio
 * this is analogous to background-size: cover for background images
 * this is very easy to achieve with the css property object-fit: cover
 * unfortunately object-fit is not implemented in IE so a fallback will be used
 *
 * IF YOU DO NOT HAVE TO SUPPORT IE, you probably do not need this component
 * just have a look at the styles for the non-fallback implementation
 */

var VideoCover = function (_Component) {
  _inherits(VideoCover, _Component);

  function VideoCover() {
    _classCallCheck(this, VideoCover);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(VideoCover).apply(this, arguments));
  }

  _createClass(VideoCover, [{
    key: 'render',
    value: function render() {
      var style = _extends({}, this.props.style, {
        objectFit: 'cover',
        width: '100%',
        height: '100%'
      });
      switch (this.props.forceFallback || /MSIE|Trident/.test(navigator.userAgent)) {
        case true:
          return _react2.default.createElement(_VideoCoverFallback2.default, this.props);
        case false:
        default:
          return _react2.default.createElement('video', _extends({
            style: style
          }, this.props.videoOptions));
      }
    }
  }]);

  return VideoCover;
}(_react.Component);

VideoCover.propTypes = {
  /**
   * this component will use object-fit: cover if available.
   * this should be the case in all modern browsers except IE.
   * it is possible to force using the fallback for example during troubleshooting,
   * but apart from that it you should not use it.
   */
  forceFallback: _react.PropTypes.bool,
  /**
   * default: false
   * if set an event listener on window-resize is added when the Fallback is used
   * it will re-evaluate the aspect-ratio and update if necessary
   * (basically the same as using the function from getResizeNotifyer in window resize)
   * will only affect the Fallback component
   */
  remeasureOnWindowResize: _react.PropTypes.bool,
  /**
   * default: false
   * pass a function. when when the fallback is mounted, this function will be called
   * with another function (resizeNotifyer) as parameter
   * you can call resizeNotifyer to force re-measuring,
   * for example after the size of the surrounding container has changed.
   * please note that this will only be invoked if the fallback is used, that is in IE.
   * if object-fit is used it is not necessary to measure anything.
   * long story short, this will only be called in IE and you should keep that in mind.
   */
  getResizeNotifyer: _react.PropTypes.func,
  /**
   * all of these will be passed to the <video/>
   */
  videoOptions: _react.PropTypes.object,
  /**
   * additional styles, will be merged with those defined by this component
   */
  style: _react.PropTypes.object,
  /**
   * set a custom classname
   */
  className: _react.PropTypes.string
};
VideoCover.defaultProps = {
  forceFallback: false,
  remeasureOnWindowResize: false
};
exports.default = VideoCover;