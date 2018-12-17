import VideoCoverFallback from '../VideoCoverFallback';

import React from 'react';
import { shallow, mount } from 'enzyme';

describe('VideoCoverFallback', () => {
  it('should update container ratio when mounted', () => {
    const spy = jest.fn();
    class WithSpy extends VideoCoverFallback {
      constructor(props) {
        super(props);
        this.updateContainerRatio = spy;
      }
    }
    mount(<WithSpy />);
    expect(spy).toBeCalled();
  });

  it('should call onFallbackDidMount prop when mounted', () => {
    const spy = jest.fn();
    mount(<VideoCoverFallback onFallbackDidMount={spy} />);
    expect(spy).toBeCalled();
  });

  it('should pass this.updateContainerRatio as parameter in onFallbackWillUnmount', () => {
    let resizeNotifier;
    const wrapper = mount(<VideoCoverFallback
      onFallbackDidMount={result => {
        resizeNotifier = result;
      }}
    />);
    expect(resizeNotifier).toEqual(wrapper.instance().updateContainerRatio);
  });

  it('should initialize window-resize eventlisteners if props.remeasureOnWindowResize is set', () => {
    const spy = jest.fn();
    class WithSpy extends VideoCoverFallback {
      constructor(props) {
        super(props);
        this.initEventListeners = spy;
      }
    }
    mount(<WithSpy remeasureOnWindowResize />);
    expect(spy).toBeCalled();
  });

  it('should NOT initialize window-resize eventlisteners if props.remeasureOnWindowResize is not set', () => {
    const spy = jest.fn();
    class WithSpy extends VideoCoverFallback {
      constructor(props) {
        super(props);
        this.initEventListeners = spy;
      }
    }
    mount(<WithSpy />);
    expect(spy).not.toBeCalled();
  });

  it('should remove eventlisteners before unmount', () => {
    const spy = jest.fn();
    class WithSpy extends VideoCoverFallback {
      constructor(props) {
        super(props);
        this.removeEventListeners = spy;
      }
    }
    const wrapper = mount(<WithSpy />);
    wrapper.unmount();
    expect(spy).toBeCalled();
  });

  it('should add/remove eventlisteners if props.remeasureOnWindowResize changes', () => {
    const addSpy = jest.fn();
    const removeSpy = jest.fn();
    class WithSpy extends VideoCoverFallback {
      constructor(props) {
        super(props);
        this.initEventListeners = addSpy;
        this.removeEventListeners = removeSpy;
      }
    }

    const wrapper = mount(<WithSpy />);
    expect(addSpy).not.toBeCalled();
    expect(removeSpy).not.toBeCalled();
    wrapper.setProps({ remeasureOnWindowResize: true });
    expect(addSpy).toBeCalled();
    expect(removeSpy).not.toBeCalled();
    wrapper.setProps({ remeasureOnWindowResize: false });
    expect(addSpy).toBeCalled();
    expect(removeSpy).toBeCalled();
  });

  it('should render a video tag inside a container-div', () => {
    const wrapper = shallow(<VideoCoverFallback />);
    expect(wrapper.find('div')).toExist();
    expect(wrapper.find('div video')).toExist();
  });

  it('should pass props.className to the container-div', () => {
    const wrapper = shallow(<VideoCoverFallback className="some-classname" />);
    expect(wrapper).toHaveClassName('some-classname');
  });

  it('should invoke updateVideoRatio on loadedData media event', () => {
    const spy = jest.fn();
    class WithSpy extends VideoCoverFallback {
      constructor(props) {
        super(props);
        this.updateVideoRatio = spy;
      }
    }
    const wrapper = shallow(<WithSpy />);
    const video = wrapper.find('video');
    video.simulate('loadedData', {
      target: {
        videoWidth: 50,
        videoHeight: 50,
      },
    });
    expect(spy).toBeCalledWith(50, 50);
  });

  it('should apply all props.videoOptions to the video tag', () => {
    const wrapper = shallow(<VideoCoverFallback
      videoOptions={{
        src: 'http://some-video-url.mp4',
      }}
    />);
    expect(wrapper.find('video')).toHaveProp('src', 'http://some-video-url.mp4');
  });

  describe('container-styles', () => {
    it('should apply props.style to the container-div', () => {
      const wrapper = shallow(<VideoCoverFallback
        style={{
          backgroundColor: 'teal',
          lineHeight: '100px',
        }}
      />);
      expect(wrapper).toHaveStyle('backgroundColor', 'teal');
      expect(wrapper).toHaveStyle('lineHeight', '100px');
    });

    it('should set width and height to 100% by default', () => {
      const wrapper = shallow(<VideoCoverFallback />);
      expect(wrapper).toHaveStyle('height', '100%');
      expect(wrapper).toHaveStyle('width', '100%');
    });

    it('should be possible to override width and height via props.style', () => {
      const wrapper = shallow(<VideoCoverFallback style={{ width: '50%', height: '50%' }} />);
      expect(wrapper).toHaveStyle('height', '50%');
      expect(wrapper).toHaveStyle('width', '50%');
    });

    it('should set position relative and overflow: hidden', () => {
      const wrapper = shallow(<VideoCoverFallback />);
      expect(wrapper).toHaveStyle('position', 'relative');
      expect(wrapper).toHaveStyle('overflow', 'hidden');
    });

    it('should not be possible to override position and overflow', () => {
      const wrapper = shallow(<VideoCoverFallback
        style={{
          position: 'fixed',
          overflow: 'scroll',
        }}
      />);
      expect(wrapper).toHaveStyle('position', 'relative');
      expect(wrapper).toHaveStyle('overflow', 'hidden');
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
      expect(wrapper.find('video')).toHaveStyle('width', 'auto');
      expect(wrapper.find('video')).toHaveStyle('height', '100%');
    });
    it('should have width 100%, height auto if innerRatio <= outerRatio', () => {
      const wrapper = shallow(<VideoCoverFallback />);
      wrapper.setState({
        innerRatio: 3,
        outerRatio: 5,
      });
      expect(wrapper.find('video')).toHaveStyle('width', '100%');
      expect(wrapper.find('video')).toHaveStyle('height', 'auto');
    });
  });

  describe('updateContainerRatio()', () => {
    it('should set state.outerRatio to ratio of container width/height', () => {
      const mockRef = {
        getBoundingClientRect: () => {
          const result = {
            width: 4,
            height: 5,
          };
          return result;
        },
      };
      class WithRef extends VideoCoverFallback {
        constructor(props) {
          super(props);
          this.containerRef = mockRef;
        }
      }
      const wrapper = shallow(<WithRef />);
      wrapper.instance().updateContainerRatio();
      expect(wrapper).toHaveState('outerRatio', 4 / 5);
    });
  });

  describe('updateVideoRatio()', () => {
    it('should set state.innerRatio to ratio of video width/height', () => {
      const wrapper = shallow(<VideoCoverFallback />);
      expect(wrapper).toHaveState('innerRatio', undefined);
      wrapper.instance().updateVideoRatio(4, 5);
      expect(wrapper).toHaveState('innerRatio', 4 / 5);
    });
  });
});
