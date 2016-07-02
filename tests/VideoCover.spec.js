/* eslint-env mocha*/
import VideoCover from '../lib/VideoCover';
import VideoCoverFallback from '../lib/VideoCoverFallback';

import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());

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
    expect(wrapper).to.have.descendants('video');
  });

  it('should not render Fallback component by default', () => {
    const wrapper = shallow(<VideoCover />);
    expect(wrapper).not.to.have.descendants(VideoCoverFallback);
  });

  it('should set classname of <video/> according prop', () => {
    const className = 'WhateverClassNameYouWant EvenMultipleClassNames';
    const wrapper = shallow(<VideoCover className={className} />);
    expect(wrapper).to.have.className('WhateverClassNameYouWant');
    expect(wrapper).to.have.className('EvenMultipleClassNames');
  });

  it('should render Fallback component if forceFallback prop is set', () => {
    const wrapper = shallow(<VideoCover forceFallback />);
    expect(wrapper).to.have.descendants(VideoCoverFallback);
  });

  describe('styles without fallback', () => {
    it('should have width and height 100% by default', () => {
      const wrapper = shallow(<VideoCover />);
      expect(wrapper).to.have.style('height', '100%');
      expect(wrapper).to.have.style('width', '100%');
    });
    it('should have any additional styles passed in via style-prop', () => {
      const wrapper = shallow(<VideoCover />);
      expect(wrapper).to.not.have.style('background-color');
      expect(wrapper).to.not.have.style('color');
      expect(wrapper).to.not.have.style('line-height');
      wrapper.setProps({
        style: {
          backgroundColor: 'red',
          color: 'teal',
          lineHeight: 10,
        },
      });
      expect(wrapper).to.have.style('background-color', 'red');
      expect(wrapper).to.have.style('color', 'teal');
      expect(wrapper).to.have.style('line-height', '10');
    });
    it('should be possible to override width and height props', () => {
      const wrapper = shallow(<VideoCover style={{ width: '50%', height: '50%' }} />);
      expect(wrapper).to.have.style('height', '50%');
      expect(wrapper).to.have.style('width', '50%');
    });
    it('should have object-fit set to cover', () => {
      const wrapper = shallow(<VideoCover />);
      expect(wrapper).to.have.style('object-fit', 'cover');
    });
    it('should not be possible to override object-fit', () => {
      const wrapper = shallow(<VideoCover style={{ objectFit: 'contain' }} />);
      expect(wrapper).to.have.style('object-fit', 'cover');
    });
  });

  describe('UserAgent', () => {
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
        value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:44.0) Gecko/20100101 Firefox/44.0',
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
          expect(wrapper).to.have.descendants(VideoCoverFallback);
        } else {
          expect(wrapper).not.to.have.descendants(VideoCoverFallback);
        }
      });
    });
  });
});
