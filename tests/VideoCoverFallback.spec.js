/* eslint-env mocha*/
import VideoCoverFallback from '../lib/VideoCoverFallback';

import React from 'react';
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
import sinon from 'sinon';

describe('VideoCoverFallback', function () {
  it('should update container ratio when mounted', function () {
    const spy = sinon.spy();
    class WithSpy extends VideoCoverFallback {
      updateContainerRatio = spy;
    }
    const wrapper = mount(<WithSpy />);
    expect(spy.calledOnce).to.be.true;
  });

  it('should call getResizeNotifier prop when mounted', function () {
    const spy = sinon.spy();
    const wrapper = mount(<VideoCoverFallback getResizeNotifyer={spy} />)
    expect(spy.calledOnce).to.be.true;
  });

  it('should pass this.updateContainerRatio as parameter in getResizeNotifier', function () {
    let resizeNotifyer;
    const wrapper = mount(<VideoCoverFallback getResizeNotifyer={result => {
      resizeNotifyer = result;
    }} />)
    expect(resizeNotifyer).to.equal(wrapper.instance().updateContainerRatio);
  });

  it('should initialize window-resize eventlisteners if props.remeasureOnWindowResize is set', function () {
    const spy = sinon.spy();
    class WithSpy extends VideoCoverFallback {
      initEventListeners = spy;
    }
    const wrapper = mount(<WithSpy remeasureOnWindowResize />);
    expect(spy.calledOnce).to.be.true;
  });

  it('should NOT initialize window-resize eventlisteners if props.remeasureOnWindowResize is not set', function () {
    const spy = sinon.spy();
    class WithSpy extends VideoCoverFallback {
      initEventListeners = spy;
    }
    const wrapper = mount(<WithSpy />);
    expect(spy.calledOnce).to.be.false;
  });

  it('should remove eventlisteners before unmount', function () {
    const spy = sinon.spy();
    class WithSpy extends VideoCoverFallback {
      removeEventListeners = spy;
    }
    const wrapper = mount(<WithSpy />);
    wrapper.unmount();
    expect(spy.calledOnce).to.be.true;
  });

  it('should add/remove eventlisteners if props.remeasureOnWindowResize changes', function () {
    const addSpy = sinon.spy();
    const removeSpy = sinon.spy();
    class WithSpy extends VideoCoverFallback {
      initEventListeners = addSpy;
      removeEventListeners = removeSpy;
    }
    const wrapper = mount(<WithSpy />);
    expect(addSpy.called).to.be.false;
    expect(removeSpy.called).to.be.false;
    wrapper.setProps({remeasureOnWindowResize: true});
    expect(addSpy.calledOnce).to.be.true;
    expect(removeSpy.called).to.be.false;
    wrapper.setProps({remeasureOnWindowResize: false});
    expect(addSpy.calledOnce).to.be.true;
    expect(removeSpy.calledOnce).to.be.true;
  }) 

  it('should render a video tag inside a container-div', function() {
    const wrapper = shallow(<VideoCoverFallback />);
    expect(wrapper).to.have.descendants('div');
    expect(wrapper.find('div')).to.have.descendants('video');
  });

  it('should pass props.className to the container-div', function() {
    const wrapper = shallow(<VideoCoverFallback className='some-classname' />);
    expect(wrapper).to.have.className('some-classname');
  })

  it('should invoke updateVideoRatio on loadedData media event', function () {
    const spy = sinon.spy();
    class WithSpy extends VideoCoverFallback {
      updateVideoRatio = spy;
    }
    const wrapper = shallow(<WithSpy />);
    const video = wrapper.find('video');
    video.simulate('loadedData', {target: {
      videoWidth: 50,
      videoHeight: 50,
    }});
    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWith(50, 50)).to.be.true;
  });

  it('should apply all props.videoOptions to the video tag', function () {
    const wrapper = shallow(<VideoCoverFallback videoOptions={{
      src: 'http://some-video-url.mp4',
    }} />);
    expect(wrapper.find('video')).to.have.prop('src', 'http://some-video-url.mp4');
  });

  describe('container-styles', function () {

    it('should apply props.style to the container-div', function() {
      const wrapper = shallow(<VideoCoverFallback style={{
        backgroundColor: 'teal',
        lineHeight: '100px',
      }} />);
      expect(wrapper).to.have.style('background-color', 'teal');
      expect(wrapper).to.have.style('line-height', '100px');
    });
    
    it('should set width and height to 100% by default', function () {
      const wrapper = shallow(<VideoCoverFallback />);
      expect(wrapper).to.have.style('height', '100%');
      expect(wrapper).to.have.style('width', '100%');
    });

    it('should be possible to override width and height via props.style', function (){
      const wrapper = shallow(<VideoCoverFallback style={{ width: '50%', height: '50%' }} />);
      expect(wrapper).to.have.style('height', '50%');
      expect(wrapper).to.have.style('width', '50%');
    });

    it('should set position relative and overflow: hidden', function (){
      const wrapper = shallow(<VideoCoverFallback />);
      expect(wrapper).to.have.style('position', 'relative');
      expect(wrapper).to.have.style('overflow', 'hidden');
    });

    it('should not be possible to override position and overflow', function () {
      const wrapper = shallow(<VideoCoverFallback style={{
        position: 'fixed',
        overflow: 'scroll',
      }} />);
      expect(wrapper).to.have.style('position', 'relative');
      expect(wrapper).to.have.style('overflow', 'hidden');
    });
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