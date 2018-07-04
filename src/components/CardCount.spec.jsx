import toJson from 'enzyme-to-json'
import { shallow, mount, setup, setupFull } from '../test/utils' // eslint-disable-line no-unused-vars
import CardCount from './CardCount'

const defaultProps = {
  current: 25,
  max: 100,
}

describe('CardCount', () => {
  it('should render self and subcomponents', () => {
    const wrapper = mount(CardCount, defaultProps)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should render the correct card current/max', () => {
    const { wrapper } = setup(CardCount, defaultProps)
    expect(wrapper.find('span.current').text()).toEqual(
      `${defaultProps.current}`
    )
    expect(wrapper.find('span.max').text()).toEqual(`${defaultProps.max}`)
  })
})
