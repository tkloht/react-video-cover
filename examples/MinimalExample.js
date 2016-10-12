import React, { Component } from 'react';
import VideoCover from '../lib';

class MinimalCoverExample extends Component {
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
      <div
        style={{
          width: '300px',
          height: '300px',
          overflow: 'hidden',
        }}
      >
        <VideoCover
          videoOptions={videoOptions}
        />
      </div>
    );
  }
}

export default MinimalCoverExample;
