import React from 'react'
import { /* mount, */ shallow } from 'enzyme'
// import toJSON from 'enzyme-to-json'
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

function setup(props = defaultProps) {
  const wrapper = shallow(<CardEdit {...props} />)

  return {
    props,
    wrapper
  }
}

describe('CardEdit', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup()
    expect(wrapper.find('section.single').exists()).toBe(true)

    // const tree = toJSON(wrapper)
    // expect(tree).toMatchSnapshot()
  })

  // Requires a full mount for the keybinding components to render
  xit('should navigate to the deck when escape is pressed', () => {
    const handler = jest.fn()
    const { wrapper } = setup({
      ...defaultProps,
      push: handler
    })

    const element = wrapper.find('figure')
    element.simulate('keyDown', { key: 'Escape', keyCode: 27, which: 27 })

    expect(handler.mock.calls.length).toEqual(1)
  })
})
