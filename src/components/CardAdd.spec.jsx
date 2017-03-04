import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import CardAdd from './CardAdd';

const defaultProps = {
  deckId: 'ABCDEFG',
  handleSubmit: () => {},
  history: {}
};

function setup(props = defaultProps) {
  const wrapper = shallow(<CardAdd {...props} />)

  return {
    props,
    wrapper
  }
}

describe('CardAdd', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup();
    expect(wrapper.find('figure.grid-figure').exists()).toBe(true);

    const tree = renderer.create(
      <CardAdd {...defaultProps} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
