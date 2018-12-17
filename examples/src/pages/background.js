import React, { Component } from 'react';
import Cover from '../../../../lib';
import Page from '../components/Page'

const style = {
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: -1,
};
class CoverExample extends Component {

  state = {
    resizeNotifier: () => {},
  }

  render() {
    const videoOptions = {
      src: 'http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4',
      autoPlay: true,
      muted: true,
      loop: true,
    };

    return (
      <Page>
        <div style={style} >
          <Cover
            videoOptions={videoOptions}
            remeasureOnWindowResize
            getResizeNotifier={resizeNotifier => {
              this.setState({
                resizeNotifier,
              });
            }}
          />
        </div>
      </Page>
    );
  }
}

export default CoverExample;
