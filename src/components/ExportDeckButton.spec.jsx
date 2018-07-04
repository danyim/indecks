import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import ExportDeckButton from './ExportDeckButton'

const defaultProps = {
  filename: 'file.txt',
  label: 'Save',
  className: '',
  disabled: false,
  style: {
    margin: '5px 5px 0px 0px',
    textDecoration: 'underline',
    color: 'blue',
    cursor: 'pointer',
  },
  exportFile: () => {},
}

function setup(props = defaultProps) {
  const wrapper = shallow(<ExportDeckButton {...props} />)

  return {
    props,
    wrapper,
  }
}

describe('ExportDeckButton', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup()
    expect(wrapper.find('button').hasClass(defaultProps.className)).toBe(true)

    const tree = renderer
      .create(<ExportDeckButton {...defaultProps} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  // it('should call the exportFile once when ExportDeckButton is clicked', () => {
  //   const handler = jest.fn();
  //   const { wrapper } = setup({
  //     ...defaultProps,
  //     exportFile: handler
  //   });

  //   wrapper.find('button').simulate('click');
  //   expect(handler.mock.calls.length).toBe(1);
  // });
})
