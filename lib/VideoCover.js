import React, { Component, PropTypes } from 'react';
import CoverFallback from './VideoCoverFallback';
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
     * pass a function. when when the fallback is mounted, this function will be called
     * with another function (resizeNotifyer) as parameter
     * you can call resizeNotifyer to force re-measuring,
     * for example after the size of the surrounding container has changed.
     * please note that this will only be invoked if the fallback is used, that is in IE.
     * if object-fit is used it is not necessary to measure anything.
     * long story short, this will only be called in IE and you should keep that in mind.
     */
    getResizeNotifyer: PropTypes.func,
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
  };

  render() {
    const style = {
      ...this.props.style,
      objectFit: 'cover',
      width: '100%',
      height: '100%',
    };
    switch (this.props.forceFallback) {
      case true:
        return (
          <CoverFallback {...this.props} />
        );
      case false:
      default:
        return (
          <video
            style={style}
            {...this.props.videoOptions}
          />
        );
    }
  }
}

export default VideoCover;
