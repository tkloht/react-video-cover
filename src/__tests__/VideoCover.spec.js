/* eslint-env mocha*/
import VideoCover from '../index';
import VideoCoverFallback from '../VideoCoverFallback';

import React from 'react';
import { shallow } from 'enzyme';

function setUserAgent(userAgent) {
  const originalNavigator = window.navigator;
  /* eslint-disable no-native-reassign, no-proto, no-underscore-dangle */
  navigator = {};
  navigator.__proto__ = originalNavigator;
  navigator.__defineGetter__('userAgent', () => userAgent);
  /* eslint-enable no-native-reassign, no-proto, no-underscore-dangle */
}

describe('VideoCover', () => {
  it('should render a video tag', () => {
    const wrapper = shallow(<VideoCover />);
    const video = wrapper.find('video');
    expect(video).toExist();
  });

  it('should not render Fallback component by default', () => {
    const wrapper = shallow(<VideoCover />);
    expect(wrapper.find(VideoCoverFallback)).not.toExist();
  });

  it('should set classname of <video/> according prop', () => {
    const className = 'WhateverClassNameYouWant EvenMultipleClassNames';
    const wrapper = shallow(<VideoCover className={className} />);
    expect(wrapper).toHaveClassName('WhateverClassNameYouWant');
    expect(wrapper).toHaveClassName('EvenMultipleClassNames');
  });

  it('should render Fallback component if forceFallback prop is set', () => {
    const wrapper = shallow(<VideoCover forceFallback />);
    expect(wrapper.find(VideoCoverFallback)).toExist();
  });

  describe('styles without fallback', () => {
    it('should have width and height 100% by default', () => {
      const wrapper = shallow(<VideoCover />);
      expect(wrapper).toHaveStyle('height', '100%');
      expect(wrapper).toHaveStyle('width', '100%');
    });
    it('should have any additional styles passed in via style-prop', () => {
      const wrapper = shallow(<VideoCover />);
      expect(wrapper).not.toHaveStyle('background-color');
      expect(wrapper).not.toHaveStyle('color');
      expect(wrapper).not.toHaveStyle('line-height');
      wrapper.setProps({
        style: {
          backgroundColor: 'red',
          color: 'teal',
          lineHeight: 10,
        },
      });
      expect(wrapper).toHaveStyle({
        backgroundColor: 'red',
        color: 'teal',
        lineHeight: 10,
      });
    });
    it('should be possible to override width and height props', () => {
      const wrapper = shallow(
        <VideoCover style={{ width: '50%', height: '50%' }} />
      );
      expect(wrapper).toHaveStyle('height', '50%');
      expect(wrapper).toHaveStyle('width', '50%');
    });
    it('should have object-fit set to cover', () => {
      const wrapper = shallow(<VideoCover />);
      expect(wrapper).toHaveStyle('objectFit', 'cover');
    });
    it('should not be possible to override object-fit', () => {
      const wrapper = shallow(<VideoCover style={{ objectFit: 'contain' }} />);
      expect(wrapper).toHaveStyle('objectFit', 'cover');
    });
  });

  // TODO: couldn't figure out how to mock the useragent with jest/jsdom
  // re-enable these tests when fixed (see setUserAgent())
  describe.skip('UserAgent', () => {
    /* eslint-disable max-len */
    const originalNavigator = window.navigator;
    const userAgents = [
      {
        name: 'Trident',
        needsFallback: true,
        value: `Mozilla/5.0(compatible; MSIE 10.0;
          WindowsNT 6.2; Win64; x64; Trident/6.0)`,
      },
      {
        name: 'Edge',
        needsFallback: true,
        value: `Mozilla/5.0 (Windows NT 6.4; WOW64) AppleWebKit/537.36
          (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36 Edge/12.0`,
      },
      {
        name: 'Safari',
        needsFallback: false,
        value: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4)
          AppleWebKit/601.5.17 (KHTML, like Gecko) Version/9.1 Safari/601.5.17`,
      },
      {
        name: 'Chrome',
        needsFallback: false,
        value: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4)
          AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.86 Safari/537.36`,
      },
      {
        name: 'Firefox',
        needsFallback: false,
        value:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:44.0) Gecko/20100101 Firefox/44.0',
      },
    ];

    afterEach(() => {
      // reset to original navigator after each test
      window.navigator = originalNavigator;
    });

    /* generate tests for some known userAgents */
    userAgents.forEach(({ needsFallback, name, value }) => {
      it(`should ${
        needsFallback ? '' : 'NOT'
      } render Fallback if ${name} userAgent is used`, () => {
        setUserAgent(value);
        const wrapper = shallow(<VideoCover />);
        if (needsFallback) {
          expect(wrapper.find(VideoCoverFallback)).toExist();
        } else {
          expect(wrapper.find(VideoCoverFallback)).not.toExist();
        }
      });
    });
  });
});
