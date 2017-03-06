/*
  Not sure if we want to use this yet in our tests...
  TODO: Find a definitive structure for Jest tests and follow it.
 */
import React from 'react';
import { shallow, mount } from 'enzyme';

export const setup = (Component, props) => {
  const wrapper = shallow(<Component {...props} />)

  return {
    props,
    wrapper
  }
};

export const setupFull = (Component, props) => {
  const wrapper = mount(<Component {...props} />)

  return {
    props,
    wrapper
  }
};
