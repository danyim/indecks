import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import OverlayRow from './OverlayRow'

const defaultProps = {
  className: '',
  children: null
}

function setup(props = defaultProps) {
  const wrapper = shallow(<OverlayRow {...props} />)

  return {
    props,
    wrapper
  }
}

describe('OverlayRow', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup()
    expect(wrapper.find('div').hasClass('hover-actions')).toBe(true)

    const tree = renderer.create(<OverlayRow {...defaultProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should apply a class to all its children', () => {
    const children = <a className="test">Test</a>
    const { wrapper } = setup({
      ...defaultProps,
      children
    })

    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.find('a').hasClass('test')).toBe(true)
    expect(wrapper.find('a').hasClass('hover-button')).toBe(true)
  })
})
