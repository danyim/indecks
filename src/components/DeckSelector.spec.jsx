import toJson from 'enzyme-to-json'
import { shallow, mount, setup, setupFull } from '../test/utils' // eslint-disable-line no-unused-vars
import DeckSelector from './DeckSelector'

const defaultProps = {
  decks: [
    {
      id: 'ABCDEFG',
      title: 'Deck title',
      description: 'Deck description',
      cards: [],
    },
    {
      id: '123455',
      title: 'Deck title',
      description: 'Deck description',
      cards: [],
    },
    {
      id: '121451',
      title: 'Deck title',
      description: 'Deck description',
      cards: [],
    },
  ],
  push: () => {},
  handleOnSelected: () => {},
}

describe('DeckSelector', () => {
  it('should render self and subcomponents', () => {
    const wrapper = mount(DeckSelector, defaultProps)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should list all decks available', () => {
    const { wrapper } = setup(DeckSelector, defaultProps)

    const listItem = wrapper.find('li')
    expect(listItem.length).toBe(defaultProps.decks.length)
  })
})
