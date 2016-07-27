import React, { Component } from 'react';
import Cover from '../lib/VideoCover';
import css from './styles.css';
import { RefreshIcon } from './Icons';
import SVGButtonStyles from './SVGButton.css';

const style = {
  width: 100,
  height: 100,
  background: '#247BA0',
  padding: 10,
  resize: 'both',
  overflow: 'hidden',
};
class CoverExample extends Component {

  state = {
    forceFallback: false,
    remeasureOnWindowResize: false,
  };

  resizeNotifier = () => {};

  render() {
    const videoOptions = {
      src: 'http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4',
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
      <div className={css.ResizableExample}>
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
          <div
            className={`${SVGButtonStyles.SVGButton} ${css.RefreshIcon}`}
            onClick={() => this.resizeNotifier()}
          >
            <RefreshIcon />
          </div>
          <span>
            When using the IE-Fallback click this button to notify that a resize has happened.
            Without the IE Fallback this is not necessary and will do nothing.
          </span>
        </div>
        <div>
          The box below should be resizable on the bottom right corner.
          However, this does not work in IE unfortunately.
          If you are looking at this page in IE I you could check out the second example,
          which allows you to see the same effect by resizing your browser window.
        </div>
        <div style={style} >
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

        </div>
      </div>
    );
  }
}

export default CoverExample;
