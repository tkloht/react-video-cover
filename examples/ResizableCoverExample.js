import React, { Component } from 'react';
import Cover from '../lib/VideoCover';
import css from './styles.css';

const style = {
  width: 100,
  height: 100,
  background: 'teal',
  padding: 10,
  resize: 'both',
  overflow: 'hidden',
};
class CoverExample extends Component {

  state = {
    resizeNotifyer: () => {},
    forceFallback: false,
    remeasureOnWindowResize: false,
  };

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
          <input type="button" value="resize" onClick={this.state.resizeNotifyer} />
          <span>
            When using the IE-Fallback click this button to notify that a resize has happened.
            Without the IE Fallback this is not necessary and will do nothing.
          </span>
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
              getResizeNotifyer={resizeNotifyer => {
                this.setState({
                  resizeNotifyer,
                });
              }}
            />
          </div>

        </div>
      </div>
    );
  }
}

export default CoverExample;
