import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import OverlayRow from './OverlayRow'

const defaultProps = {
  className: '',
  children: null,
}

function setup(props = defaultProps) {
  const wrapper = shallow(<OverlayRow {...props} />)

  return {
    props,
    wrapper,
  }
}

describe('OverlayRow', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup()
    expect(wrapper.find('div').hasClass('hover-actions')).toBe(true)

    const tree = renderer.create(<OverlayRow {...defaultProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should append a class to the parent div', () => {
    const className = 'test-class'
    const { wrapper } = setup({
      ...defaultProps,
      className,
    })

    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.find('div').hasClass(className)).toBe(true)
  })

  it('should inject a class to all its children (when no class is provided)', () => {
    const children = [
      <a key="1" name="test">
        Test
      </a>,
      <b key="2" name="test">
        Test
      </b>,
      <span key="3" name="test">
        Test
      </span>,
    ]
    const { wrapper } = setup({
      ...defaultProps,
      children,
    })

    expect(wrapper.find('a[name="test"]').exists()).toBe(true)
    expect(wrapper.find('b[name="test"]').exists()).toBe(true)
    expect(wrapper.find('span[name="test"]').exists()).toBe(true)
    expect(wrapper.find('a[name="test"]').hasClass('hover-button')).toBe(true)
    expect(wrapper.find('b[name="test"]').hasClass('hover-button')).toBe(true)
    expect(wrapper.find('span[name="test"]').hasClass('hover-button')).toBe(
      true
    )
  })

  it('should append a class to all its children when a class exists', () => {
    const children = <a className="test">Test</a>
    const { wrapper } = setup({
      ...defaultProps,
      children,
    })

    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.find('a').hasClass('test')).toBe(true)
    expect(wrapper.find('a').hasClass('hover-button')).toBe(true)
  })
})
