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
      src: 'http://ia800502.us.archive.org/10/items/WebmVp8Vorbis/webmvp8.webm',
      autoPlay: true,
      loop: true,
    };

    return (
      <div style={style} >
        <Cover
          videoOptions={videoOptions}
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
