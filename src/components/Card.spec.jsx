import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card';

const defaultProps = {
  card: {
    title: 'Title',
    answer: 'Answer'
  },
  className: '',
  flipped: false,
  handleOnClick: jest.fn(),
  trimOverflow: false,
  trimOverflowLength: 125,
  children: null
};

function setup(props = defaultProps) {
  const wrapper = shallow(<Card {...props} />)

  return {
    props,
    wrapper
  }
}

describe('Card', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup();
    expect(wrapper.find('figure').hasClass('grid-figure')).toBe(true);
    expect(wrapper.find('div').hasClass('card-contents')).toBe(true);
  });

  it('should call the handleOnClick once when card is clicked', () => {
    const handler = jest.fn();
    const { wrapper } = setup({
      ...defaultProps,
      handleOnClick: handler
    });

    wrapper.find('figure').simulate('click');
    expect(handler.mock.calls.length).toBe(1);
  });

  it('should render the title if flipped is FALSE', () => {
    const { wrapper } = setup({
      ...defaultProps,
      flipped: false
    });

    expect(wrapper.find('Markdown.card-title').exists()).toEqual(true);
  });

  it('should render the answer if flipped is TRUE', () => {
    const { wrapper } = setup({
      ...defaultProps,
      flipped: true
    });

    expect(wrapper.find('figcaption Markdown').exists()).toEqual(true);
  });

  it('should render the no answer indicator on the title if a null or blank answer is provided', () => {
    const { wrapper } = setup({
      ...defaultProps,
      card: {
        ...defaultProps.card,
        answer: null
      }
    });

    expect(wrapper.find('div.no-answer > div').text()).toBe('No answer');
  });

  it('should render an empty answer notice if the card is flipped', () => {
    const { wrapper } = setup({
      ...defaultProps,
      card: {
        ...defaultProps.card,
        answer: null
      },
      flipped: true
    });

    expect(wrapper.find('figcaption Markdown').exists()).toEqual(false);
    expect(wrapper.find('div.center p.grey').text()).toEqual('This card does not have an answer yet');
  });

  it('should trim the title if it exceeds n chars', () => {
    const title = 'Testing long title';
    const trimOverflowLength = 5;

    const { wrapper } = setup({
      ...defaultProps,
      card: {
        ...defaultProps.card,
        title
      },
      flipped: false,
      trimOverflow: true,
      trimOverflowLength
    });

    expect(wrapper.find(`Markdown[text="${title.substr(0, trimOverflowLength)}..."]`).exists()).toEqual(true);
  });
});
