import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import DeckGrid from './DeckGrid'

const defaultProps = {
  decks: [{
    id: 'ABCDEFG',
    title: 'Deck title',
    description: 'Deck description',
    cards: []
  }],
  removeDeck: jest.fn()
}

function setup (props = defaultProps) {
  const wrapper = shallow(<DeckGrid {...props} />)

  return {
    props,
    wrapper
  }
}

function setupFull (props = defaultProps) {
  const wrapper = mount(<DeckGrid {...props} />)

  return {
    props,
    wrapper
  }
}

describe('DeckGrid', () => {
  it('should render self and subcomponents', () => {
    const tree = renderer.create(
      <DeckGrid {...defaultProps} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  // This method is implemented but not used anywhere
  it.skip('should call the removeDeck prop when the "Delete" deck overlay button is clicked', () => {
    const handler = jest.fn()
    spyOn(window, 'confirm').and.returnValue(true)
    const { wrapper } = setup({
      ...defaultProps,
      removeDeck: handler
    })

    wrapper.find('Overlay button[children="Delete"]').first().simulate('click')
    expect(handler.mock.calls.length).toBe(1)
  })

  it('should display the correct amount of decks', () => {
    const { props, wrapper } = setupFull()

    expect(wrapper.find('Deck').length).toBe(props.decks.length)
  })

  it('should display a message if no decks are found', () => {
    const { wrapper } = setupFull({
      ...defaultProps,
      decks: []
    })
    expect(wrapper.find('p.center').exists()).toBe(true)
  })
})
