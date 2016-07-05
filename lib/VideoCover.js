import React, { Component, PropTypes } from 'react';
import CoverFallback from './VideoCoverFallback';
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
class VideoCover extends Component {

  static propTypes = {
    /**
     * this component will use object-fit: cover if available.
     * this should be the case in all modern browsers except IE.
     * it is possible to force using the fallback for example during troubleshooting,
     * but apart from that it you should not use it.
     */
    forceFallback: PropTypes.bool,
    /**
     * default: false
     * if set an event listener on window-resize is added when the Fallback is used
     * it will re-evaluate the aspect-ratio and update if necessary
     * (basically the same as using the function from getResizeNotifier in window resize)
     * will only affect the Fallback component
     */
    remeasureOnWindowResize: PropTypes.bool,
    /**
     * callback, will be executed when the Fallback is mounted
     * parameter (resizeNotifier): function which forces a re-measuring
     * for example after the size of the surrounding container has changed.
     * please note that this will only be invoked if the fallback is used, that is in IE.
     * if object-fit is used it is not necessary to measure anything.
     * see ResizableCoverExample for an example implementation
     */
    onFallbackDidMount: PropTypes.func,
    /**
     * callback, will be executed before the Fallback unmounts
     */
    onFallbackWillUnmount: PropTypes.func,
    /**
     * all of these will be passed to the <video/>
     */
    videoOptions: PropTypes.object,
    /**
     * additional styles, will be merged with those defined by this component
     */
    style: PropTypes.object,
    /**
     * set a custom classname
     */
    className: PropTypes.string,
  };

  static defaultProps = {
    forceFallback: false,
    remeasureOnWindowResize: false,
  };

  render() {
    const style = {
      width: '100%',
      height: '100%',
      ...this.props.style,
      objectFit: 'cover',
    };
    if (this.props.forceFallback || /MSIE|Trident|Edge/.test(window.navigator.userAgent)) {
      return (
        <CoverFallback {...this.props} />
      );
    }
    return (
      <video
        className={this.props.className}
        style={style}
        {...this.props.videoOptions}
      />
    );
  }
}

export default VideoCover;
