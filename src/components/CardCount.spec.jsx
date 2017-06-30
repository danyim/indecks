import React from 'react'
import { shallow } from 'enzyme'
import CardCount from './CardCount'

const defaultProps = {
  current: 25,
  max: 100
}

function setup(props = defaultProps) {
  const wrapper = shallow(<CardCount {...props} />)

  return {
    props,
    wrapper
  }
}

describe('CardCount', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup()
    expect(wrapper.find('div').hasClass('cardCount')).toBe(true)
  })

  it('should render the correct card current/max', () => {
    const { wrapper } = setup()
    expect(wrapper.find('span.current').text()).toEqual(
      `${defaultProps.current}`
    )
    expect(wrapper.find('span.max').text()).toEqual(`${defaultProps.max}`)
  })
})
