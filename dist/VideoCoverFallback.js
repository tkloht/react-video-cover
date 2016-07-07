'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoCoverFallback = function (_Component) {
  _inherits(VideoCoverFallback, _Component);

  function VideoCoverFallback() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, VideoCoverFallback);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(VideoCoverFallback)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      innerRatio: undefined,
      outerRatio: undefined
    }, _this.updateContainerRatio = function () {
      var ref = arguments.length <= 0 || arguments[0] === undefined ? _this.containerRef : arguments[0];

      if (ref) {
        var _ref$getBoundingClien = ref.getBoundingClientRect();

        var width = _ref$getBoundingClien.width;
        var height = _ref$getBoundingClien.height;

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
          ref: function ref(_ref) {
            _this2.containerRef = _ref;
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