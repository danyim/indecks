import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import CardAdd from './CardAdd';

const defaultProps = {
  deckId: 'ABCDEFG',
  handleSubmit: () => {},
  history: {
    goBack: () => {}
  }
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

  it('should call the handleSubmit prop when submitting the form', () => {
    const handler = jest.fn();
    const { wrapper } = setup({
      ...defaultProps,
      handleSubmit: handler
    });

    const title = wrapper.find('input[name="title"]');
    const answer = wrapper.find('textarea[name="answer"]');
    title.simulate('change', { target: { value: 'Test title' } });
    answer.simulate('change', { target: { value: 'Test description' } });

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });

    expect(handler.mock.calls.length).toBe(1);
  });

  it('should not allow a blank title', () => {
    const handler = jest.fn();
    const { wrapper } = setup({
      ...defaultProps,
      handleSubmit: handler
    });

    const title = wrapper.find('input[name="title"]');
    const answer = wrapper.find('textarea[name="answer"]');
    title.simulate('change', { target: { value: '' } });
    answer.simulate('change', { target: { value: 'Test' } });

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });

    expect(handler.mock.calls.length).toBe(0);
  });

  it('should not allow a blank answer', () => {
    const handler = jest.fn();
    const { wrapper } = setup({
      ...defaultProps,
      handleSubmit: handler
    });

    const title = wrapper.find('input[name="title"]');
    const answer = wrapper.find('textarea[name="answer"]');
    title.simulate('change', { target: { value: 'Test' } });
    answer.simulate('change', { target: { value: '' } });

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });

    expect(handler.mock.calls.length).toBe(0);
  });

  it('should navigate backwards in the browser history when cancel is clicked', () => {
    const handler = jest.fn();
    const { wrapper } = setup({
      ...defaultProps,
      history: {
        goBack: handler
      }
    });

    const cancel = wrapper.find('button[children="Cancel"]');
    cancel.simulate('click');

    expect(handler.mock.calls.length).toBe(1);
  });
});
