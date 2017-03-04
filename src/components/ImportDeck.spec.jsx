import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ImportDeck from './ImportDeck';
import samples from '../data/samples';

const defaultProps = {
  addDeck: () => {},
  handleClose: () => {}
};

function setup(props = defaultProps) {
  const wrapper = shallow(<ImportDeck {...props} />)

  return {
    props,
    wrapper
  }
}

describe('ImportDeck', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup();
    expect(wrapper.find('section.deck-import').exists()).toBe(true);
    expect(wrapper.find('div.grid-figure').exists()).toBe(true);
    expect(wrapper.find('h2.header').exists()).toBe(true);

    const tree = renderer.create(
      <ImportDeck {...defaultProps} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('should load sample decks', () => {
  //   const handler = jest.fn();
  //   const { wrapper } = setup({
  //     addDeck: handler
  //   });

  //   // wrapper.find('.load-sample').simulate('click');
  //   expect(handler.mock.calls.length).toBe(samples.length);
  //   expect(samples.length).toBe(3);
  // });

  // it('should call the addDeck prop', () => {
  //   const handler = jest.fn();
  //   const { wrapper } = setup({
  //     addDeck: handler
  //   });

  //   // TODO: How do you simulate text input?
  //   // wrapper.find('button.create-deck').simulate('type?');
  //   // expect(handler.mock.calls.length).toBe(1);
  // });
});
