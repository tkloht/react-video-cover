import React, { Component, PropTypes } from 'react';

class CoverFallback extends Component {

  static propTypes = {
    style: PropTypes.object,
    getResizeNotifyer: PropTypes.func,
    videoOptions: PropTypes.object,
  }

  state = {
    innerRatio: undefined,
    outerRatio: undefined,
  }

  componentDidMount() {
    this.updateContainerRatio();
    if (typeof this.props.getResizeNotifyer === 'function') {
      this.props.getResizeNotifyer(this.updateContainerRatio);
    }
  }

  updateContainerRatio = () => {
    const { width, height } = this.refs.container.getBoundingClientRect();
    this.setState({
      outerRatio: width / height,
    });
  }

  updateVideoRatio = (width, height) => {
    this.setState({
      innerRatio: width / height,
    });
  }

  render() {
    const { innerRatio, outerRatio } = this.state;
    const style = {
      ...this.props.style,
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
      position: 'relative',
      overflow: 'hidden',
    };

    return (
      <div style={outerStyle} ref="container">
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

export default CoverFallback;
