import React, { Component } from 'react';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var VideoCoverFallback = /*#__PURE__*/function (_Component) {
  _inheritsLoose(VideoCoverFallback, _Component);

  function VideoCoverFallback(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.containerRef = null;
    _this.state = {
      innerRatio: 0,
      outerRatio: 0
    };
    _this.updateContainerRatio = _this.updateContainerRatio.bind(_assertThisInitialized(_this));
    _this.updateVideoRatio = _this.updateVideoRatio.bind(_assertThisInitialized(_this));
    _this.initEventListeners = _this.initEventListeners.bind(_assertThisInitialized(_this));
    _this.removeEventListeners = _this.removeEventListeners.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = VideoCoverFallback.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.updateContainerRatio();

    if (typeof this.props.onFallbackDidMount === "function") {
      this.props.onFallbackDidMount(this.updateContainerRatio);
    }

    if (this.props.remeasureOnWindowResize) {
      this.initEventListeners();
    }
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.remeasureOnWindowResize !== this.props.remeasureOnWindowResize) {
      if (nextProps.remeasureOnWindowResize) {
        this.initEventListeners();
      } else {
        this.removeEventListeners();
      }
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.removeEventListeners();

    if (typeof this.props.onFallbackWillUnmount === "function") {
      this.props.onFallbackWillUnmount();
    }
  };

  _proto.updateContainerRatio = function updateContainerRatio() {
    if (this.containerRef) {
      var _this$containerRef$ge = this.containerRef.getBoundingClientRect(),
          width = _this$containerRef$ge.width,
          height = _this$containerRef$ge.height;

      this.setState({
        outerRatio: width / height
      });
    }
  };

  _proto.updateVideoRatio = function updateVideoRatio(width, height) {
    this.setState({
      innerRatio: width / height
    });
  };

  _proto.initEventListeners = function initEventListeners() {
    window.addEventListener("resize", this.updateContainerRatio);
  };

  _proto.removeEventListeners = function removeEventListeners() {
    window.removeEventListener("resize", this.updateContainerRatio);
  }
  /**
   * We can get the width and height of a video after it has started loading.
   * Then we can compare the aspect ratio of the video to that of it's surrounding container.
   * That is all we need to determine if the video fills the container vertically or horizontally.
   * In the other dimension we just have to maintain the original aspect-ratio.
   */
  ;

  _proto.render = function render() {
    var _this2 = this;

    var _this$state = this.state,
        innerRatio = _this$state.innerRatio,
        outerRatio = _this$state.outerRatio;
    var style = {
      width: innerRatio > outerRatio ? "auto" : "100%",
      height: innerRatio > outerRatio ? "100%" : "auto",

      /* the following is for centering the video.
      There has to be some better solution?!
      any help is very much appreciated :) */
      position: "absolute",
      top: -9999,
      bottom: -9999,
      left: -9999,
      right: -9999,
      margin: "auto"
    };

    var outerStyle = _extends({
      width: "100%",
      height: "100%"
    }, this.props.style, {
      position: "relative",
      overflow: "hidden"
    });

    return React.createElement("div", {
      style: outerStyle,
      ref: function ref(element) {
        _this2.containerRef = element;
      },
      className: this.props.className
    }, React.createElement("video", Object.assign({
      onLoadedData: function onLoadedData(event) {
        _this2.updateVideoRatio(event.currentTarget.videoWidth, event.currentTarget.videoHeight);
      },
      style: style
    }, this.props.videoOptions)));
  };

  return VideoCoverFallback;
}(Component);

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

var VideoCover = /*#__PURE__*/function (_Component) {
  _inheritsLoose(VideoCover, _Component);

  function VideoCover() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = VideoCover.prototype;

  _proto.render = function render() {
    var style = _extends({
      width: "100%",
      height: "100%"
    }, this.props.style, {
      objectFit: "cover"
    });

    if (this.props.forceFallback || typeof window !== "undefined" && /MSIE|Trident|Edge/.test(window.navigator.userAgent)) {
      return React.createElement(VideoCoverFallback, Object.assign({}, this.props));
    }

    return React.createElement("video", Object.assign({
      className: this.props.className,
      style: style
    }, this.props.videoOptions));
  };

  return VideoCover;
}(Component);

VideoCover.defaultProps = {
  forceFallback: false,
  remeasureOnWindowResize: false
};

export default VideoCover;
//# sourceMappingURL=react-video-cover.esm.js.map
