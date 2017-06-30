import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import Markdown from './Markdown'

const defaultProps = {
  className: 'class',
  text: 'Text',
  handleOnClick: jest.fn()
}

function setup(props = defaultProps) {
  const wrapper = shallow(<Markdown {...props} />)

  return {
    props,
    wrapper
  }
}

describe('Markdown', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup()
    expect(wrapper.find('div').hasClass(defaultProps.className)).toBe(true)

    const tree = renderer
      .create(<Markdown text="Test">Hello</Markdown>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should call the handleOnClick once when Markdown is clicked', () => {
    const handler = jest.fn()
    const { wrapper } = setup({
      ...defaultProps,
      handleOnClick: handler
    })

    wrapper.find('div').simulate('click')
    expect(handler.mock.calls.length).toBe(1)
  })

  // it('should convert text into Markdown', () => {
  //   const remarkable = jest.mock('Remarkable');
  //   const text = 'Test text string';
  //   const { wrapper } = setup({
  //     ...defaultProps,
  //     text: `# ${text}`
  //   });

  //   expect(wrapper.find('h1').text()).toEqual(text);
  // });
})
