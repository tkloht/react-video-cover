/* eslint-env mocha*/
import VideoCoverFallback from '../lib/VideoCoverFallback';

import React from 'react';
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
chai.use(sinonChai);
chai.use(dirtyChai);
chai.use(chaiEnzyme());
import sinon from 'sinon';

describe('VideoCoverFallback', () => {
  it('should update container ratio when mounted', () => {
    const spy = sinon.spy();
    class WithSpy extends VideoCoverFallback {
      updateContainerRatio = spy;
    }
    mount(<WithSpy />);
    expect(spy).to.have.been.calledOnce();
  });

  it('should call onFallbackDidMount prop when mounted', () => {
    const spy = sinon.spy();
    mount(<VideoCoverFallback onFallbackDidMount={spy} />);
    expect(spy).to.have.been.calledOnce();
  });

  it('should pass this.updateContainerRatio as parameter in onFallbackWillUnmount', () => {
    let resizeNotifier;
    const wrapper = mount(<VideoCoverFallback
      onFallbackDidMount={result => {
        resizeNotifier = result;
      }}
    />);
    expect(resizeNotifier).to.equal(wrapper.instance().updateContainerRatio);
  });

  it('should initialize window-resize eventlisteners if props.remeasureOnWindowResize is set', () => {
    const spy = sinon.spy();
    class WithSpy extends VideoCoverFallback {
      initEventListeners = spy;
    }
    mount(<WithSpy remeasureOnWindowResize />);
    expect(spy).to.have.been.calledOnce();
  });

  it('should NOT initialize window-resize eventlisteners if props.remeasureOnWindowResize is not set', () => {
    const spy = sinon.spy();
    class WithSpy extends VideoCoverFallback {
      initEventListeners = spy;
    }
    mount(<WithSpy />);
    expect(spy).not.to.have.been.called();
  });

  it('should remove eventlisteners before unmount', () => {
    const spy = sinon.spy();
    class WithSpy extends VideoCoverFallback {
      removeEventListeners = spy;
    }
    const wrapper = mount(<WithSpy />);
    wrapper.unmount();
    expect(spy).to.have.been.calledOnce();
  });

  it('should add/remove eventlisteners if props.remeasureOnWindowResize changes', () => {
    const addSpy = sinon.spy();
    const removeSpy = sinon.spy();
    class WithSpy extends VideoCoverFallback {
      initEventListeners = addSpy;
      removeEventListeners = removeSpy;
    }
    const wrapper = mount(<WithSpy />);
    expect(addSpy).not.to.have.been.called();
    expect(removeSpy).not.to.have.been.called();
    wrapper.setProps({ remeasureOnWindowResize: true });
    expect(addSpy).to.have.been.calledOnce();
    expect(removeSpy).not.to.have.been.called();
    wrapper.setProps({ remeasureOnWindowResize: false });
    expect(addSpy).to.have.been.calledOnce();
    expect(removeSpy).to.have.been.calledOnce();
  });

  it('should render a video tag inside a container-div', () => {
    const wrapper = shallow(<VideoCoverFallback />);
    expect(wrapper).to.have.descendants('div');
    expect(wrapper.find('div')).to.have.descendants('video');
  });

  it('should pass props.className to the container-div', () => {
    const wrapper = shallow(<VideoCoverFallback className="some-classname" />);
    expect(wrapper).to.have.className('some-classname');
  });

  it('should invoke updateVideoRatio on loadedData media event', () => {
    const spy = sinon.spy();
    class WithSpy extends VideoCoverFallback {
      updateVideoRatio = spy;
    }
    const wrapper = shallow(<WithSpy />);
    const video = wrapper.find('video');
    video.simulate('loadedData', {
      target: {
        videoWidth: 50,
        videoHeight: 50,
      },
    });
    expect(spy).to.have.been.calledOnce();
    expect(spy.calledWith(50, 50)).to.be.true();
  });

  it('should apply all props.videoOptions to the video tag', () => {
    const wrapper = shallow(<VideoCoverFallback
      videoOptions={{
        src: 'http://some-video-url.mp4',
      }}
    />);
    expect(wrapper.find('video')).to.have.prop('src', 'http://some-video-url.mp4');
  });

  describe('container-styles', () => {
    it('should apply props.style to the container-div', () => {
      const wrapper = shallow(<VideoCoverFallback
        style={{
          backgroundColor: 'teal',
          lineHeight: '100px',
        }}
      />);
      expect(wrapper).to.have.style('background-color', 'teal');
      expect(wrapper).to.have.style('line-height', '100px');
    });

    it('should set width and height to 100% by default', () => {
      const wrapper = shallow(<VideoCoverFallback />);
      expect(wrapper).to.have.style('height', '100%');
      expect(wrapper).to.have.style('width', '100%');
    });

    it('should be possible to override width and height via props.style', () => {
      const wrapper = shallow(<VideoCoverFallback style={{ width: '50%', height: '50%' }} />);
      expect(wrapper).to.have.style('height', '50%');
      expect(wrapper).to.have.style('width', '50%');
    });

    it('should set position relative and overflow: hidden', () => {
      const wrapper = shallow(<VideoCoverFallback />);
      expect(wrapper).to.have.style('position', 'relative');
      expect(wrapper).to.have.style('overflow', 'hidden');
    });

    it('should not be possible to override position and overflow', () => {
      const wrapper = shallow(<VideoCoverFallback
        style={{
          position: 'fixed',
          overflow: 'scroll',
        }}
      />);
      expect(wrapper).to.have.style('position', 'relative');
      expect(wrapper).to.have.style('overflow', 'hidden');
    });
  });

  // todo: maybe use generated test-data for this?
  describe('video-styles', () => {
    it('should have width auto, height 100% if innerRatio > outerRatio', () => {
      const wrapper = shallow(<VideoCoverFallback />);
      wrapper.setState({
        innerRatio: 5,
        outerRatio: 3,
      });
      expect(wrapper.find('video')).to.have.style('width', 'auto');
      expect(wrapper.find('video')).to.have.style('height', '100%');
    });
    it('should have width 100%, height auto if innerRatio <= outerRatio', () => {
      const wrapper = shallow(<VideoCoverFallback />);
      wrapper.setState({
        innerRatio: 3,
        outerRatio: 5,
      });
      expect(wrapper.find('video')).to.have.style('width', '100%');
      expect(wrapper.find('video')).to.have.style('height', 'auto');
    });
  });

  describe('updateContainerRatio()', () => {
    it('should set state.outerRatio to ratio of container width/height', () => {
      const wrapper = shallow(<VideoCoverFallback />);
      const mockRef = {
        getBoundingClientRect: () => {
          const result = {
            width: 4,
            height: 5,
          };
          return result;
        },
      };
      wrapper.instance().updateContainerRatio(mockRef);
      expect(wrapper).to.have.state('outerRatio', 4 / 5);
    });
  });

  describe('updateVideoRatio()', () => {
    it('should set state.innerRatio to ratio of video width/height', () => {
      const wrapper = shallow(<VideoCoverFallback />);
      expect(wrapper).not.to.have.state('innerRatio');
      wrapper.instance().updateVideoRatio(4, 5);
      expect(wrapper).to.have.state('innerRatio', 4 / 5);
    });
  });
});
