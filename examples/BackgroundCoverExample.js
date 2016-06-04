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
      src: 'http://trailers.divx.com/divx_prod/profiles/WiegelesHeliSki_DivXPlus_19Mbps.mkv',
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
