import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import Overlay from './Overlay'

const defaultProps = {
  className: '',
  children: null
}

function setup(props = defaultProps) {
  const wrapper = shallow(<Overlay {...props} />)

  return {
    props,
    wrapper
  }
}

describe('Overlay', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup()
    expect(wrapper.find('div.overlay').exists()).toBe(true)
    expect(wrapper.find('div.hover-actions-container').exists()).toBe(true)

    const tree = renderer.create(<Overlay {...defaultProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
