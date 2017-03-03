import React from 'react';
import { shallow } from 'enzyme';
import FrontBack from './FrontBack';

const defaultProps = {
  handleFlip: jest.fn(),
  flipped: false
};

function setup(props = defaultProps) {
  const wrapper = shallow(<FrontBack {...props} />)

  return {
    props,
    wrapper
  }
}

describe('FrontBack', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div').hasClass('frontBack')).toBe(true);
    expect(wrapper.find('a.front').text()).toBe('FRONT');
    expect(wrapper.find('a.back').text()).toBe('BACK');
  });

  it('should apply the active class to "BACK" when flipped prop is TRUE', () => {
    const { wrapper } = setup(
      {
        ... defaultProps,
        flipped: true
      }
    );
    expect(wrapper.find('a.active').text()).toBe('BACK');
  });

  it('should apply the active class to "FRONT" when flipped prop is FALSE', () => {
    const { wrapper } = setup(
      {
        ... defaultProps,
        flipped: false
      }
    );
    expect(wrapper.find('a.active').text()).toBe('FRONT');
  });

  it('should call the handleFlip prop when FRONT is clicked', () => {
    const handler = jest.fn();
    const { wrapper } = setup({
      ...defaultProps,
      handleFlip: handler
    });

    wrapper.find('a.front').simulate('click');
    expect(handler.mock.calls.length).toBe(1);
  });

  it('should call the handleFlip prop when BACK is clicked', () => {
    const handler = jest.fn();
    const { wrapper } = setup({
      ...defaultProps,
      handleFlip: handler
    });

    wrapper.find('a.back').simulate('click');
    expect(handler.mock.calls.length).toBe(1);
  });
});
