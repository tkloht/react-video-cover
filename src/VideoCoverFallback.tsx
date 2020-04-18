import React, { Component, CSSProperties, SyntheticEvent } from "react";

import { Props } from "./index";

type State = {
  innerRatio: number;
  outerRatio: number;
};

export default class VideoCoverFallback extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      innerRatio: 0,
      outerRatio: 0,
    };
    this.updateContainerRatio = this.updateContainerRatio.bind(this);
    this.updateVideoRatio = this.updateVideoRatio.bind(this);
    this.initEventListeners = this.initEventListeners.bind(this);
    this.removeEventListeners = this.removeEventListeners.bind(this);
  }

  componentDidMount() {
    this.updateContainerRatio();
    if (typeof this.props.onFallbackDidMount === "function") {
      this.props.onFallbackDidMount(this.updateContainerRatio);
    }
    if (this.props.remeasureOnWindowResize) {
      this.initEventListeners();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps.remeasureOnWindowResize !== this.props.remeasureOnWindowResize
    ) {
      if (nextProps.remeasureOnWindowResize) {
        this.initEventListeners();
      } else {
        this.removeEventListeners();
      }
    }
  }

  componentWillUnmount() {
    this.removeEventListeners();
    if (typeof this.props.onFallbackWillUnmount === "function") {
      this.props.onFallbackWillUnmount();
    }
  }

  updateContainerRatio() {
    if (this.containerRef) {
      const { width, height } = this.containerRef.getBoundingClientRect();
      this.setState({
        outerRatio: width / height,
      });
    }
  }

  updateVideoRatio(width: number, height: number) {
    this.setState({
      innerRatio: width / height,
    });
  }

  initEventListeners() {
    window.addEventListener("resize", this.updateContainerRatio);
  }

  removeEventListeners() {
    window.removeEventListener("resize", this.updateContainerRatio);
  }

  private containerRef: HTMLElement | null = null;

  /**
   * We can get the width and height of a video after it has started loading.
   * Then we can compare the aspect ratio of the video to that of it's surrounding container.
   * That is all we need to determine if the video fills the container vertically or horizontally.
   * In the other dimension we just have to maintain the original aspect-ratio.
   */
  render() {
    const { innerRatio, outerRatio } = this.state;
    const style: CSSProperties = {
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
      margin: "auto",
    };

    const outerStyle: CSSProperties = {
      width: "100%",
      height: "100%",
      ...this.props.style,
      position: "relative",
      overflow: "hidden",
    };

    return (
      <div
        style={outerStyle}
        ref={(element) => {
          this.containerRef = element;
        }}
        className={this.props.className}
      >
        <video
          onLoadedData={(event: SyntheticEvent<HTMLVideoElement>) => {
            this.updateVideoRatio(
              event.currentTarget.videoWidth,
              event.currentTarget.videoHeight
            );
          }}
          style={style}
          {...this.props.videoOptions}
        />
      </div>
    );
  }
}

