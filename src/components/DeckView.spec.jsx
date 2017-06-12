import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { browserHistory } from 'react-router'
import DeckView from './DeckView'

const defaultProps = {
  deck: {
    id: 'ABCDEFG',
    title: 'Deck title',
    description: 'Deck description',
    cards: [
      {
        index: 1,
        title: 'Card',
        answer: 'Card description'
      }
    ]
  },
  maxDeckTitleLength: 160,
  maxDeckDescLength: 300,
  handleDuplicateCard: jest.fn(),
  handleEditDeck: jest.fn(),
  handleRemoveCard: jest.fn(),
  handleRemoveDeck: jest.fn()
}

function setup (props = defaultProps) {
  const wrapper = shallow(<DeckView {...props} />)

  return {
    props,
    wrapper
  }
}

function setupFull (props = defaultProps) {
  const wrapper = mount(<DeckView {...props} />)

  return {
    props,
    wrapper
  }
}

describe('DeckView', () => {
  it('should render self and subcomponents', () => {
    // const { wrapper } = setup();

    const tree = renderer.create(
      <DeckView {...defaultProps} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
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
        cards: []
      }
    })
    expect(wrapper.find('p.center').text()).toEqual('Click the + button on the top left to add a card')
  })

  it('should navigate to the VIEW card route when the "View" card overlay button is clicked', () => {
    spyOn(browserHistory, 'push')
    const { props, wrapper } = setupFull()

    wrapper.find('Overlay button[children="View"]').first().simulate('click')
    expect(browserHistory.push).toHaveBeenCalledWith(`/view/${props.deck.id}/1`)
  })

  it('should navigate to the EDIT card route when the "Edit" card overlay button is clicked', () => {
    spyOn(browserHistory, 'push')
    const { props, wrapper } = setupFull()

    wrapper.find('Overlay button[children="Edit"]').first().simulate('click')
    expect(browserHistory.push).toHaveBeenCalledWith(`/edit/${props.deck.id}/1`)
  })

  it('should call the handleRemoveCard prop when the "Delete" card overlay button is clicked', () => {
    const handler = jest.fn()
    spyOn(window, 'confirm').and.returnValue(true)
    spyOn(browserHistory, 'push')
    const { props, wrapper } = setup({
      ...defaultProps,
      handleRemoveCard: handler
    })

    wrapper.find('Overlay button[children="Delete"]').first().simulate('click')
    expect(handler.mock.calls.length).toBe(1)
    expect(browserHistory.push).toHaveBeenCalledWith(`/view/${props.deck.id}`)
  })

  it('should call the handleDuplicateCard prop when the "Duplicate" card overlay button is clicked', () => {
    const handler = jest.fn()
    const { wrapper } = setup({
      ...defaultProps,
      handleDuplicateCard: handler
    })

    wrapper.find('button[children="Duplicate"]').first().simulate('click')
    wrapper.find('button[children="Duplicate"]').last().simulate('click')
    expect(handler.mock.calls.length).toBe(2)
  })

  it('should call the handleRemoveDeck prop when the "Delete Deck" button is clicked', () => {
    const handler = jest.fn()
    const { wrapper } = setup({
      ...defaultProps,
      handleRemoveDeck: handler
    })

    wrapper.find('button[children="Delete Deck"]').first().simulate('click')
    expect(handler.mock.calls.length).toBe(1)
  })

  it('should call the handleEditDeck prop when the title changes', () => {
    const handler = jest.fn()
    const { wrapper } = setupFull({
      ...defaultProps,
      handleEditDeck: handler
    })

    const rieInput = wrapper.find('RIEInput')
    rieInput.simulate('click') // Go into editing mode
    const input = wrapper.find('input.large') // Find the <input> DOM
    input.simulate('input', { target: { value: 'Test' } }) // Trigger the onInput
    input.node.value = 'Test' // Explicitly set the value to the test value
    input.simulate('blur') // Get out of editing mode
    expect(handler.mock.calls.length).toBe(1)
  })

  it('should call the handleEditDeck prop when the description changes', () => {
    const handler = jest.fn()
    const { wrapper } = setupFull({
      ...defaultProps,
      handleEditDeck: handler
    })

    const rieInput = wrapper.find('RIETextArea')
    rieInput.simulate('click') // Go into editing mode
    const input = wrapper.find('textarea.paragraph') // Find the <input> DOM
    input.simulate('input', { target: { value: 'Test' } }) // Trigger the onInput
    input.node.value = 'Test' // Explicitly set the value to the test value
    input.simulate('blur') // Get out of editing mode
    expect(handler.mock.calls.length).toBe(1)
  })

  it('should show an invalidation when a 0-char deck title is entered', () => {
    const { wrapper } = setupFull()
    const rieInput = wrapper.find('RIEInput').first()

    rieInput.simulate('click')
    const input = wrapper.find('input.large')
    input.simulate('input', {target: {value: ''}})
    expect(input.hasClass('invalid')).toEqual(true)
  })

  it('should show an invalidation when large deck title is entered', () => {
    const { wrapper } = setupFull({
      ...defaultProps,
      maxDeckTitleLength: 4
    })
    const rieInput = wrapper.find('RIEInput')
    rieInput.simulate('click')
    const input = wrapper.find('input.large')
    input.simulate('input', {target: {value: '12345'}})
    expect(input.hasClass('invalid')).toEqual(true)
  })

  it('should show an invalidation when a 0-char deck description is entered', () => {
    const { wrapper } = setupFull()
    const rieTextArea = wrapper.find('RIETextArea')

    rieTextArea.simulate('click')
    const input = wrapper.find('textarea.paragraph textarea.editable')
    input.simulate('input', {target: {value: ''}})
    expect(input.hasClass('invalid')).toEqual(true)
  })

  it('should show an invalidation when a large deck description is entered', () => {
    const { wrapper } = setupFull({
      ...defaultProps,
      maxDeckDescLength: 4
    })
    const rieTextArea = wrapper.find('RIETextArea')

    rieTextArea.simulate('click')
    const input = wrapper.find('textarea.paragraph textarea.editable')
    input.simulate('input', {target: {value: '12345'}})
    expect(input.hasClass('invalid')).toEqual(true)
  })

  it('should convert the deck into JSON when the export button is clicked', () => {
    const { props, wrapper } = setupFull()

    const exportButton = wrapper.find('ExportDeckButton')
    expect(exportButton.prop('exportFile')()).toEqual(JSON.stringify(props.deck, null, 2))
  })
})
