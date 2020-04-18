import React, { Component, CSSProperties } from "react";

import CoverFallback from "./VideoCoverFallback";

export type Props = {
  /**
   * This component will use object-fit: cover if available,
   * that is in all modern browsers except IE.
   * This prop forces use of the fallback. This is helpful during troubleshooting,
   * but apart from that you should not use it.
   * default: false
   */
  forceFallback: boolean;
  /**
   * Additional styles which will be merged with those defined by this component.
   * Please note that some styles are not possible to override, in particular:
   *   - object-fit: cover (when the fallback is not used)
   *   - position: relative and overflow: hidden (when the fallback is used)
   */
  style: CSSProperties;
  /**
   * Use this to set a custom className.
   */
  className: string;
  /**
   * videoOptions will be passed as props to the <video/>.
   */
  videoOptions: object;
  /**
   * If set, an event listener on window-resize is added when the Fallback is used.
   * It will re-evaluate the aspect-ratio and update the styles if necessary.
   * This has no effect if the fallback is not used.
   * The classic example where it makes sense to use this is when using a background video.
   * If you need to react to different events to re-measure the aspect-ratio
   * please see the onFallbackDidMount prop.
   * default: false
   */
  remeasureOnWindowResize: boolean;
  /**
   * Will be executed when the Fallback is mounted.
   * The only parameter is a function, which can be used to force a re-measuring,
   * for example after the size of the surrounding container has changed.
   * Please note that this will only be invoked if the fallback is used, that is in IE.
   * See ResizableCoverExample for an example implementation.
   */
  onFallbackDidMount: (updateContainerRatio: () => void) => void;
  /**
   * Will be executed before the Fallback unmounts.
   * You probably want to use this to clear any event-listeners added in onFallbackDidMount.
   */
  onFallbackWillUnmount: () => void;
};

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
class VideoCover extends Component<Props> {
  static defaultProps = {
    forceFallback: false,
    remeasureOnWindowResize: false,
  };

  render() {
    const style: CSSProperties = {
      width: "100%",
      height: "100%",
      ...this.props.style,
      objectFit: "cover",
    };
    if (
      this.props.forceFallback ||
      (typeof window !== "undefined" &&
        /MSIE|Trident|Edge/.test(window.navigator.userAgent))
    ) {
      return <CoverFallback {...this.props} />;
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
