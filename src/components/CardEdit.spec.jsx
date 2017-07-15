// import toJson from 'enzyme-to-json'
import { shallow, mount, setup, setupFull } from '../test/utils' // eslint-disable-line no-unused-vars
import CardEdit from './CardEdit'
// import { CardEditForm } from './CardEditForm';

const defaultProps = {
  card: {
    title: '',
    answer: '',
    index: 0
  },
  cardIndex: 1,
  deckId: 'ABCDEFG',
  editCard: () => {},
  removeCard: () => {},
  form: {},
  push: () => {}
}

describe('CardEdit', () => {
  it('should render self and subcomponents', () => {
    const wrapper = shallow(CardEdit, defaultProps)
    expect(wrapper.find('section.single').exists()).toBe(true)
    // const wrapper = shallow(CardEdit, defaultProps)
    // expect(toJson(wrapper)).toMatchSnapshot()
  })

  // Requires a full mount for the keybinding components to render; this is
  // incompatible because we're using Redux-forms, which might require mocking
  // out the store
  xit('should navigate to the deck when escape is pressed', () => {
    const handler = jest.fn()
    const { wrapper } = setup(CardEdit, {
      ...defaultProps,
      push: handler
    })

    const element = wrapper.find('figure')
    element.simulate('keyDown', { key: 'Escape', keyCode: 27, which: 27 })

    expect(handler).toHaveBeenCalled()
  })
})
