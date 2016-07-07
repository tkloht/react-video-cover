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

    return _possibleConstructorReturn(this, Object.getPrototypeOf(VideoCover).apply(this, arguments));
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