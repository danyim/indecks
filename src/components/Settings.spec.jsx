import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Settings from './Settings';

const defaultProps = {
  decks: [],
  deckCount: 0,
  removeAllDecks: () => {}
};

function setup(props = defaultProps) {
  const wrapper = shallow(<Settings {...props} />)

  return {
    props,
    wrapper
  }
}

describe('Settings', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup();
    expect(wrapper.find('section').hasClass('settings')).toBe(true);
    expect(wrapper.find('h2').hasClass('header')).toBe(true);
    expect(wrapper.find('div').hasClass('settings-content')).toBe(true);

    const tree = renderer.create(
      <Settings {...defaultProps}>Hello</Settings>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
