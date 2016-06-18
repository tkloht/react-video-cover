/* eslint-env mocha*/
import VideoCover from '../lib/VideoCover';

import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());

describe('VideoCover', () => {
  it('should just render for now', () => {
    const wrapper = shallow(<VideoCover />);
    expect(wrapper).to.have.descendants('video');
  });
});
