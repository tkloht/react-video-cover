import React, { Component } from 'react';
import Cover from '../lib/VideoCover';

const style = {
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  zIndex: -1,
};
class CoverExample extends Component {

  state = {
    resizeNotifyer: () => {},
  }

  render() {
    const videoOptions = {
      src: 'http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4',
      autoPlay: true,
      loop: true,
    };

    return (
      <div style={style} >
        <Cover
          videoOptions={videoOptions}
          remeasureOnWindowResize
          getResizeNotifyer={resizeNotifyer => {
            this.setState({
              resizeNotifyer,
            });
          }}
        />
      </div>
    );
  }
}

export default CoverExample;
