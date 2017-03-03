import React from 'react';
// import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import FrontBack from './FrontBack';

function setup() {
  const props = {
    handleFlip: jest.fn(),
    flipped: true
  };

  const enzymeWrapper = shallow(<FrontBack {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('Header', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find('div').hasClass('frontBack')).toBe(true);
      // expect(enzymeWrapper.find('a[tabIndex=0]').text()).toBe('FRONT');
      // expect(enzymeWrapper.find('a[tabIndex=-1]').text()).toBe('BACK');
      // expect(true).toBe(true);
    });
  });
});
