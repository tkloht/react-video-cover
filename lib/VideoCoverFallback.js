import React, { Component, PropTypes } from 'react';

class VideoCoverFallback extends Component {

  static propTypes = {
    style: PropTypes.object,
    onFallbackDidMount: PropTypes.func,
    onFallbackWillUnmount: PropTypes.func,
    videoOptions: PropTypes.object,
    forceFallback: PropTypes.bool,
    remeasureOnWindowResize: PropTypes.bool,
    className: PropTypes.string,
  }

  state = {
    innerRatio: undefined,
    outerRatio: undefined,
  }

  componentDidMount() {
    this.updateContainerRatio();
    if (typeof this.props.onFallbackDidMount === 'function') {
      this.props.onFallbackDidMount(this.updateContainerRatio);
    }
    if (this.props.remeasureOnWindowResize) {
      this.initEventListeners();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.remeasureOnWindowResize !== this.props.remeasureOnWindowResize) {
      if (nextProps.remeasureOnWindowResize) {
        this.initEventListeners();
      } else {
        this.removeEventListeners();
      }
    }
  }

  componentWillUnmount() {
    this.removeEventListeners();
    if (typeof this.props.onFallbackWillUnmount === 'function') {
      this.props.onFallbackWillUnmount();
    }
  }

  updateContainerRatio = () => {
    if (this.containerRef) {
      const { width, height } = this.containerRef.getBoundingClientRect();
      this.setState({
        outerRatio: width / height,
      });
    }
  }

  updateVideoRatio = (width, height) => {
    this.setState({
      innerRatio: width / height,
    });
  };

  initEventListeners = () => {
    window.addEventListener('resize', this.updateContainerRatio);
  }

  removeEventListeners = () => {
    window.removeEventListener('resize', this.updateContainerRatio);
  }

  render() {
    const { innerRatio, outerRatio } = this.state;
    const style = {
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
      margin: 'auto',
    };

    const outerStyle = {
      width: '100%',
      height: '100%',
      ...this.props.style,
      position: 'relative',
      overflow: 'hidden',
    };

    return (
      <div
        style={outerStyle}
        ref={ref => { this.containerRef = ref; }}
        className={this.props.className}
      >
        <video
          onLoadedData={event => {
            this.updateVideoRatio(event.target.videoWidth, event.target.videoHeight);
          }}
          style={style}
          {...this.props.videoOptions}
        />
      </div>
    );
  }
}

export default VideoCoverFallback;
