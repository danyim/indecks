import toJson from 'enzyme-to-json'
import { shallow, mount, setup, setupFull } from '../test/utils' // eslint-disable-line no-unused-vars
import Deck from './Deck'

const defaultProps = {
  deck: {
    id: 'ABCDEFG',
    title: 'Deck title',
    description: 'Deck description',
    cards: []
  },
  handleOnClick: () => {},
  style: null,
  children: null
}

describe('Deck', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = shallow(Deck, defaultProps)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should invoke the handleOnClick when the title is clicked', () => {
    const handler = jest.fn()
    const { wrapper } = setup(Deck, {
      ...defaultProps,
      handleOnClick: handler
    })

    const title = wrapper.find('figure.grid-figure h1')
    expect(title.exists()).toBe(true)

    title.simulate('click')
    expect(handler.mock.calls.length).toBe(1)
  })

  it('should apply the correct styles if provided', () => {
    const testStyle = { color: 'red' }
    const { wrapper } = setup(Deck, {
      ...defaultProps,
      style: testStyle
    })

    const figure = wrapper.find('figure')
    expect(figure.get(0).props.style).toBe(testStyle)
  })
})
