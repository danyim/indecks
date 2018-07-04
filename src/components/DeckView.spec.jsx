/* globals: spyOn */
import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { MemoryRouter } from 'react-router'
// import renderer from 'react-test-renderer'
import DeckView from './DeckView'

const defaultProps = {
  deck: {
    id: 'ABCDEFG',
    title: 'Deck title',
    description: 'Deck description',
    cards: [
      {
        index: 1,
        title: 'My test card',
        answer: 'Card description',
      },
      {
        index: 2,
        title: 'Another test card',
        answer: 'Card description number 2',
      },
    ],
  },
  maxDeckTitleLength: 160,
  maxDeckDescLength: 300,
  handleDuplicateCard: jest.fn(),
  handleEditDeck: jest.fn(),
  handleRemoveCard: jest.fn(),
  handleRemoveDeck: jest.fn(),
  push: () => {},
}

function setup(props = defaultProps) {
  const wrapper = shallow(<DeckView {...props} />)

  return {
    props,
    wrapper,
  }
}

function setupFull(props = defaultProps) {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/view/ABCDEFG']}>
      <DeckView {...props} />
    </MemoryRouter>,
  )

  return {
    props,
    wrapper,
  }
}

describe('DeckView', () => {
  it('should render self and subcomponents', () => {
    // const { wrapper } = setup();
    const wrapper = shallow(<DeckView {...defaultProps} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should render subcomponents when there are cards in the deck', () => {
    const { props, wrapper } = setup()

    expect(wrapper.find('Card').length).toEqual(props.deck.cards.length)
    expect(wrapper.find('Overlay').length).toEqual(props.deck.cards.length)
  })

  it('should render a notice if no cards are found', () => {
    const { wrapper } = setup({
      ...defaultProps,
      deck: {
        ...defaultProps.deck,
        cards: [],
      },
    })
    expect(wrapper.find('p.center').text()).toEqual(
      'Click the + button on the top left to add a card',
    )
  })

  it('should navigate to the VIEW card route when the "View" card overlay button is clicked', () => {
    const push = jest.fn()
    const { props, wrapper } = setup({
      ...defaultProps,
      push,
    })

    wrapper
      .find('Overlay button[children="View"]')
      .first()
      .simulate('click')
    expect(push.mock.calls.length).toBe(1)
    expect(push.mock.calls[0][0]).toBe(`/view/${props.deck.id}/1`)
  })

  it('should navigate to the EDIT card route when the "Edit" card overlay button is clicked', () => {
    const push = jest.fn()
    const { props, wrapper } = setup({
      ...defaultProps,
      push,
    })

    wrapper
      .find('Overlay button[children="Edit"]')
      .first()
      .simulate('click')
    expect(push.mock.calls.length).toBe(1)
    expect(push.mock.calls[0][0]).toBe(`/edit/${props.deck.id}/1`)
  })

  it('should call the handleRemoveCard prop when the "Delete" card overlay button is clicked', () => {
    const handler = jest.fn()
    const push = jest.fn()
    const { props, wrapper } = setup({
      ...defaultProps,
      push,
      handleRemoveCard: handler,
    })

    spyOn(window, 'confirm').and.returnValue(true)

    wrapper
      .find('Overlay button[children="Delete"]')
      .first()
      .simulate('click')
    expect(handler.mock.calls.length).toBe(1)
    expect(push.mock.calls.length).toBe(1)
    expect(push.mock.calls[0][0]).toBe(`/view/${props.deck.id}`)
  })

  it('should call the handleDuplicateCard prop when the "Duplicate" card overlay button is clicked', () => {
    const handler = jest.fn()
    const { wrapper } = setup({
      ...defaultProps,
      handleDuplicateCard: handler,
    })

    wrapper
      .find('button[children="Duplicate"]')
      .first()
      .simulate('click')
    wrapper
      .find('button[children="Duplicate"]')
      .last()
      .simulate('click')
    expect(handler.mock.calls.length).toBe(2)
  })

  it('should call the handleRemoveDeck prop when the "Delete Deck" button is clicked', () => {
    const handler = jest.fn()
    const { wrapper } = setup({
      ...defaultProps,
      handleRemoveDeck: handler,
    })

    wrapper
      .find('button[children="Delete Deck"]')
      .first()
      .simulate('click')
    expect(handler.mock.calls.length).toBe(1)
  })

  it('should call the handleEditDeck prop when the title changes', () => {
    const handler = jest.fn()
    const { wrapper } = setupFull({
      ...defaultProps,
      handleEditDeck: handler,
    })

    const rieInput = wrapper.find('RIEInput')
    rieInput.simulate('click') // Go into editing mode
    const input = wrapper.find('input.large') // Find the <input> DOM
    input.simulate('input', { target: { value: 'Test' } }) // Trigger the onInput
    input.instance().value = 'Test' // Explicitly set the value to the test value
    input.simulate('blur') // Get out of editing mode
    expect(handler.mock.calls.length).toBe(1)
  })

  it('should call the handleEditDeck prop when the description changes', () => {
    const handler = jest.fn()
    const { wrapper } = setupFull({
      ...defaultProps,
      handleEditDeck: handler,
    })

    const rieInput = wrapper.find('RIETextArea')
    rieInput.simulate('click') // Go into editing mode
    const input = wrapper.find('textarea.paragraph') // Find the <input> DOM
    input.simulate('input', { target: { value: 'Test' } }) // Trigger the onInput
    input.instance().value = 'Test' // Explicitly set the value to the test value
    input.simulate('blur') // Get out of editing mode
    expect(handler.mock.calls.length).toBe(1)
  })

  xit('should show an invalidation when a 0-char deck title is entered', () => {
    const { wrapper } = setupFull()
    const rieInput = wrapper.find('RIEInput').first()

    rieInput.simulate('click')
    const input = wrapper.find('input.large')
    input.simulate('input', { target: { value: '' } })
    expect(input.hasClass('invalid')).toEqual(true)
  })

  xit('should show an invalidation when large deck title is entered', () => {
    const { wrapper } = setupFull({
      ...defaultProps,
      maxDeckTitleLength: 4,
    })
    const rieInput = wrapper.find('RIEInput')
    rieInput.simulate('click')
    const input = wrapper.find('input.large')
    input.simulate('input', { target: { value: '12345' } })
    expect(input.hasClass('invalid')).toEqual(true)
  })

  xit('should show an invalidation when a 0-char deck description is entered', () => {
    const { wrapper } = setupFull()
    const rieTextArea = wrapper.find('RIETextArea')

    rieTextArea.simulate('click')
    const input = wrapper.find('textarea.paragraph textarea.editable')
    input.simulate('input', { target: { value: '' } })
    expect(input.hasClass('invalid')).toEqual(true)
  })

  xit('should show an invalidation when a large deck description is entered', () => {
    const { wrapper } = setupFull({
      ...defaultProps,
      maxDeckDescLength: 4,
    })
    const rieTextArea = wrapper.find('RIETextArea')

    rieTextArea.simulate('click')
    const input = wrapper.find('textarea.paragraph textarea.editable')
    input.simulate('input', { target: { value: '12345' } })
    expect(input.hasClass('invalid')).toEqual(true)
  })

  it('should convert the deck into JSON when the export button is clicked', () => {
    const { props, wrapper } = setupFull()

    const exportButton = wrapper.find('ExportDeckButton')
    expect(exportButton.prop('exportFile')()).toEqual(
      JSON.stringify(props.deck, null, 2),
    )
  })

  xit('should search the cards for a string and return the right cards', () => {
    const { wrapper } = setup()

    const searchInput = wrapper.find('input[name="search-cards"]')
    expect(searchInput.exists()).toEqual(true)
    searchInput.simulate('change', { target: { value: 'test' } })
    // For some reason we still get 2...
    expect(wrapper.find('Card').length).toEqual(1)
  })

  xit("should search return nothing if there's a search criteria with no hits", () => {
    const { wrapper } = setupFull()

    const searchInput = wrapper.find('input[name="search-cards"]')
    searchInput.simulate('input', { target: { value: 'find nothing' } })
    console.log(wrapper.find('Card'))
    // For some reason we still get 2...
    expect(wrapper.find('Card').length).toEqual(0)
  })
})
