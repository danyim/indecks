import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import ImportDeck from './ImportDeck'
// import samples from '../data/samples';

const defaultProps = {
  addDeck: () => {},
  push: () => {},
  loadSampleDecks: () => {},
  maxDeckTitleLength: 160,
  maxDeckDescLength: 300,
}

function setup(props = defaultProps) {
  const wrapper = shallow(<ImportDeck {...props} />)

  return {
    props,
    wrapper,
  }
}

function setupFull(props = defaultProps) {
  const wrapper = mount(<ImportDeck {...props} />)

  return {
    props,
    wrapper,
  }
}

describe('ImportDeck', () => {
  it('should render self and subcomponents', () => {
    const wrapper = shallow(<ImportDeck {...defaultProps} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it.only('should render a dropzone', () => {
    const { wrapper } = setupFull({
      ...defaultProps,
    })

    expect(wrapper.find('[onDrop]').exists()).toBe(true)
  })

  xit('should process the JSON when a file is provided in the Dropzone', () => {
    jest.spyOn(window, 'URL').and.returnValue({
      createObjectURL: () => {},
    })
    // spyOn(window, 'URL').and.returnValue(() => {});

    const push = jest.fn()
    const handlerAdd = jest.fn()
    const { wrapper } = setupFull({
      ...defaultProps,
      addDeck: handlerAdd,
      push,
    })

    const dropzone = wrapper.find('Dropzone')
    const files = [
      {
        name: 'test.json',
        size: 1111,
        type: 'application/json',
      },
    ]

    dropzone.simulate('drop', { dataTransfer: { files } })

    expect(handlerAdd.mock.calls.length).toBe(1)
    expect(push.mock.calls.length).toBe(1)
    expect(push.mock.calls[0][0]).toBe('/')
  })

  it('should load 4 sample decks and then navigate home', () => {
    const push = jest.fn()
    const handlerSample = jest.fn()
    const { wrapper } = setup({
      ...defaultProps,
      loadSampleDecks: handlerSample,
      push,
    })

    wrapper.find('button.button[children="Load Sample Decks"]').simulate('click')
    expect(handlerSample.mock.calls.length).toBe(1)
    expect(push.mock.calls.length).toBe(1)
    expect(push.mock.calls[0][0]).toBe('/')
  })

  it('should take a title and description and call the addDeck prop', () => {
    const handlerAdd = jest.fn()
    const { wrapper } = setup({
      ...defaultProps,
      addDeck: handlerAdd,
    })

    const title = wrapper.find('input[name="title"]')
    const description = wrapper.find('textarea[name="description"]')
    title.simulate('change', { target: { value: 'Test title' } })
    description.simulate('change', { target: { value: 'Test description' } })
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    })
    expect(handlerAdd.mock.calls.length).toBe(1)
  })

  it('should reject an empty title', () => {
    const handlerAdd = jest.fn()
    const { wrapper } = setup({
      ...defaultProps,
      addDeck: handlerAdd,
    })

    const title = wrapper.find('input[name="title"]')
    title.simulate('change', { target: { value: '' } })

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    })
    expect(handlerAdd.mock.calls.length).toBe(0)
  })

  it('should reject a title greater than maxDeckTitleLength', () => {
    const handlerAdd = jest.fn()
    const { props, wrapper } = setup({
      ...defaultProps,
      addDeck: handlerAdd,
    })

    const longTitle = 'a'.repeat(props.maxDeckTitleLength + 1)

    const title = wrapper.find('input[name="title"]')
    const description = wrapper.find('textarea[name="description"]')
    title.simulate('change', { target: { value: longTitle } })
    description.simulate('change', { target: { value: '' } })

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    })

    expect(handlerAdd.mock.calls.length).toBe(0)
  })

  it('should reject a description greater than maxDeckDescLength', () => {
    const handlerAdd = jest.fn()
    const { props, wrapper } = setup({
      ...defaultProps,
      addDeck: handlerAdd,
    })

    const longDesc = 'a'.repeat(props.maxDeckDescLength + 1)

    const title = wrapper.find('input[name="title"]')
    const description = wrapper.find('textarea[name="description"]')
    title.simulate('change', { target: { value: 'Test' } })
    description.simulate('change', { target: { value: longDesc } })

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    })

    expect(handlerAdd.mock.calls.length).toBe(0)
  })
})
