/* eslint-env mocha*/
import VideoCoverFallback from '../lib/VideoCoverFallback';

import React from 'react';
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());

describe('VideoCoverFallback', function () {
  it('should update container ratio when mounted');

  it('should call getResizeNotifier prop when mounted');

  it('should not call getResizeNotifier if its type is not a function');

  it('should initialize window-resize eventlisteners if props.remeasureOnWindowResize is set');

  it('should remove eventlisteners before unmount');

  it('should add/remove eventlisteners if props.remeasureOnWindowResize changes') 

  it('should render a video tag inside a container-div');


  it('should invoke updateVideoRatio on loadedData media event');

  it('should apply all props.videoOptions to the video tag');

  describe('container-styles', function () {
    it('should apply props.style to the container-div');
    
    it('should set width and height to 100% by default');

    it('should be possible to override width and height via props.style');

    it('should set position relative and overflow: hidden');

    it('should not be possible to override position and overflow');
  });

  // todo: maybe use generated test-data for this?
  describe('video-styles', function () {
    it('should have width auto, height 100% if innerRatio > outerRatio', function () {
      const wrapper = shallow(<VideoCoverFallback />);
      wrapper.setState({
        innerRatio: 5,
        outerRatio: 3,
      });
      expect(wrapper.find('video')).to.have.style('width', 'auto');
      expect(wrapper.find('video')).to.have.style('height', '100%');
    });
    it('should have width 100%, height auto if innerRatio <= outerRatio', function () {
      const wrapper = shallow(<VideoCoverFallback />);
      wrapper.setState({
        innerRatio: 3,
        outerRatio: 5,
      });
      expect(wrapper.find('video')).to.have.style('width', '100%');
      expect(wrapper.find('video')).to.have.style('height', 'auto');
    });
  });

  describe('updateContainerRatio()', function () {
    it('should set state.outerRatio to ratio of container width/height', function () {
      const wrapper = shallow(<VideoCoverFallback />);
      const mockRef = { 
        getBoundingClientRect: () => {
          return {
            width: 4,
            height: 5
          }
        }
      };
      wrapper.instance().updateContainerRatio(mockRef);
      expect(wrapper).to.have.state('outerRatio', 4/5);
    });
  });

  describe('updateVideoRatio()', function () {
    it('should set state.innerRatio to ratio of video width/height', function () {
      const wrapper = shallow(<VideoCoverFallback />);
      expect(wrapper).not.to.have.state('innerRatio');
      wrapper.instance().updateVideoRatio(4, 5);
      expect(wrapper).to.have.state('innerRatio', 4/5);
    });
  });
}); 