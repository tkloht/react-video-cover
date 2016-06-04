import React, { Component } from 'react';
import Cover from './Cover';

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
  }

  render() {
    const videoOptions = {
      src: 'http://trailers.divx.com/divx_prod/profiles/WiegelesHeliSki_DivXPlus_19Mbps.mkv',
    };

    return (
      <div>
        <input type="button" value="resize" onClick={this.state.resizeNotifyer} />
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
              forceFallback
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
