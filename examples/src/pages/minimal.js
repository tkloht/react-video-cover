import React, { Component } from 'react';
import VideoCover from 'react-video-cover';
// import VideoCover from '../../../dist/lib';
import Page from '../components/Page';

class MinimalCoverExample extends Component {
  render() {
    const videoOptions = {
      src: '/cat.mp4',
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
      </Page>
    );
  }
}

export default MinimalCoverExample;
