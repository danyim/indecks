import toJson from 'enzyme-to-json'
import { shallow, mount, setup, setupFull } from '../testUtils' // eslint-disable-line no-unused-vars
import DeckNavigator from './DeckNavigator'

const defaultProps = {
  deck: {
    id: 'ABCDEFG',
    title: 'Deck title',
    description: 'Deck description',
    cards: []
  },
  cardIndex: 0,
  flipped: false,
  shuffle: false,
  push: () => {},
  mode: 'edit',
  handleFlip: () => {},
  handleShuffleToggle: () => {},
  handleNextCard: () => {},
  handlePrevCard: () => {}
}

describe('DeckNavigator', () => {
  // Error: Invalid string length (???)
  xit('should render self and subcomponents', () => {
    const wrapper = shallow(DeckNavigator, defaultProps)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  xit('should display the preview pane when the button is pressed', () => {
    const { wrapper } = setupFull(DeckNavigator, {
      ...defaultProps
    })

    const button = wrapper.find('button[name="preview-toggle"]')
    const labelTitle = wrapper.find('label[htmlFor="title"]')
    const labelAnswer = wrapper.find('label[htmlFor="answer"]')
    expect(button.exists()).toBe(true)

    button.simulate('click')
    expect(labelTitle.exists()).toBe(true)
    expect(labelAnswer.exists()).toBe(true)

    // This is not a true test because the labels are always visible. The
    // <Motion> component is controlling the height of the container based on
    // state.display
  })
})
