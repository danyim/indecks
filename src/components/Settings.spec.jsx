import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import Settings from './Settings'

const defaultProps = {
  decks: [
    {
      id: 'ABCDEFG',
      title: 'Sample Deck',
      description: 'Deck description',
      cards: []
    }
  ],
  deckCount: 1,
  removeAllDecks: () => {}
}

function setup(props = defaultProps) {
  const wrapper = shallow(<Settings {...props} />)

  return {
    props,
    wrapper
  }
}

describe('Settings', () => {
  it('should render self and subcomponents', () => {
    const wrapper = shallow(<Settings {...defaultProps} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should render the "delete all from local storage" button with the correct number', () => {
    const deckCount = 5
    const { wrapper } = setup({
      ...defaultProps,
      deckCount
    })

    const button = wrapper.findWhere(
      n => n.text() === `Delete all ${deckCount} deck(s) from local storage`
    )
    expect(button.length).toBe(1)
  })

  it('should render a disabled "delete all from local storage" button if no decks are found', () => {
    const deckCount = 0
    const { wrapper } = setup({
      ...defaultProps,
      deckCount
    })

    const button = wrapper.find(
      'button.btn-delete[children="Delete all decks from local storage"]'
    )
    expect(button.exists()).toBe(true)
    expect(button.prop('disabled')).toBe('disabled')
  })

  it('should call the removeAllDecks prop when button is clicked', () => {
    spyOn(window, 'confirm').and.returnValue(true)
    const handler = jest.fn()
    const { wrapper } = setup({
      ...defaultProps,
      removeAllDecks: handler
    })

    const button = wrapper.find('button.btn-delete[name="delete-all-decks"]')
    button.simulate('click')
    expect(handler.mock.calls.length).toBe(1)
  })
})
