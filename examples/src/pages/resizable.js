import React, { Component } from 'react';
import cx from 'classnames';
import Resize from 'react-simple-resize';
import Page from '../components/Page';

import Cover from 'react-video-cover';
// import Cover from '../../../dist/lib';
import css from './styles.module.css';
import { RefreshIcon } from '../components/Icons';

class CoverExample extends Component {

  state = {
    forceFallback: false,
    remeasureOnWindowResize: false,
    isResizing: false,
  };

  resizeNotifier = () => {};

  render() {
    const videoOptions = {
      src: 'http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4#t=5',
      ref: videoRef => {
        this.videoRef = videoRef;
      },
      onClick: () => {
        if (this.videoRef && this.videoRef.paused) {
          this.videoRef.play();
        } else if (this.videoRef) {
          this.videoRef.pause();
        }
      },
      title: 'click to play/pause',
    };

    return (
      <Page>
        <div className={css.ResizableExample}>
          <div className={css.Input}>
            <input
              type="checkbox"
              checked={this.state.forceFallback}
              onClick={() => {
                this.setState({
                  forceFallback: !this.state.forceFallback,
                });
              }}
            />
            <span>Force IE-Fallback in non-IE Browsers</span>
          </div>
          <div className={css.Input}>
            <input
              type="checkbox"
              checked={this.state.remeasureOnWindowResize}
              onClick={() => {
                this.setState({
                  remeasureOnWindowResize: !this.state.remeasureOnWindowResize,
                });
              }}
            />
            <span>Remeasure on window resize</span>
          </div>
          <div className={css.Input}>
            <div
              className={cx(css.RefreshIcon, {
                [css.active]: this.state.isResizing,
              })}
              onClick={() => {
                // isResizing will set 'active' classname, which starts rotate-animation
                this.setState({ isResizing: true });
                // then reset classname after animation has ended
                // i know, this is not great but it works pretty good
                // TODO: use animationend event
                setTimeout(() => this.setState({ isResizing: false }), 400);
                this.resizeNotifier();
              }}
            >
              <RefreshIcon />
            </div>
            <span>
              When using the IE-Fallback click this button to notify that a resize has happened.
              Without the IE Fallback this is not necessary and will do nothing.
            </span>
          </div>
          <div>
            The box below is resizable on the bottom right corner.
          </div>
          <Resize className={css.ResizableBox} handleColor="#50514F">
            <div
              style={{
                overflow: 'hidden',
                width: '100%',
                height: '100%',
              }}
            >
              <Cover
                videoOptions={videoOptions}
                forceFallback={this.state.forceFallback}
                remeasureOnWindowResize={this.state.remeasureOnWindowResize}
                onFallbackDidMount={resizeNotifier => {
                  this.resizeNotifier = resizeNotifier;
                }}
                onFallbackWillUnmount={() => {
                  this.resizeNotifier = () => {};
                }}
              />
            </div>

          </Resize>
        </div>
      </Page>
    );
  }
}

export default CoverExample;
