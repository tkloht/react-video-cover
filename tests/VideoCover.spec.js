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
  it('should just render for now', () => {
    const wrapper = shallow(<VideoCover />);
    expect(wrapper).to.have.descendants('video');
  });

  it('should render Fallback component if forceFallback prop is set', () => {
    const wrapper = shallow(<VideoCover forceFallback />);
    expect(wrapper).to.have.descendants(VideoCoverFallback);
  });

  describe('UserAgent', () => {
    /* eslint-disable max-len */
    const originalNavigator = window.navigator;
    const userAgents = [
      {
        name: 'Trident',
        needsFallback: true,
        value: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Win64; x64; Trident/6.0)',
      },
      {
        name: 'Edge',
        needsFallback: true,
        value: 'Mozilla/5.0 (Windows NT 6.4; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36 Edge/12.0',
      },
      {
        name: 'Safari',
        needsFallback: false,
        value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/601.5.17 (KHTML, like Gecko) Version/9.1 Safari/601.5.17',
      },
      {
        name: 'Chrome',
        needsFallback: false,
        value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.86 Safari/537.36',
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
      it(`should ${needsFallback ? '' : 'NOT'} render Fallback if ${name} userAgent is used`, () => {
        setUserAgent(value);
        const wrapper = shallow(<VideoCover />);
        if (needsFallback) {
          expect(wrapper).to.have.descendants(VideoCoverFallback);
        } else {
          expect(wrapper).not.to.have.descendants(VideoCoverFallback);
        }
      });
    });
    /* eslint-enable max-len */
  });
});
