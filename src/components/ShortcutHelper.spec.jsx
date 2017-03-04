import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ShortcutHelper from './ShortcutHelper';

const defaultProps = {};

function setup(props = defaultProps) {
  const wrapper = shallow(<ShortcutHelper {...props} />)

  return {
    props,
    wrapper
  }
}

describe('ShortcutHelper', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup();
    expect(wrapper.find('section').hasClass('shortcut-helper')).toBe(true);
    expect(wrapper.find('h2').hasClass('header')).toBe(true);
    expect(wrapper.find('div').hasClass('shortcut-helper-content')).toBe(true);

    const tree = renderer.create(
      <ShortcutHelper />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
