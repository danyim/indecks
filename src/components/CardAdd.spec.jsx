import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import CardAdd from './CardAdd'

const defaultProps = {
  deckId: 'ABCDEFG',
  handleSubmit: () => {},
  push: () => {}
  // history: {
  //   goBack: () => {}
  // }
}

function setup(props = defaultProps) {
  const wrapper = shallow(<CardAdd {...props} />)

  return {
    props,
    wrapper
  }
}

describe('CardAdd', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup()
    expect(wrapper.find('figure.grid-figure').exists()).toBe(true)

    const tree = renderer.create(<CardAdd {...defaultProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should call the handleSubmit prop when submitting the form', () => {
    const handler = jest.fn()
    const { wrapper } = setup({
      ...defaultProps,
      handleSubmit: handler
    })

    const title = wrapper.find('input[name="title"]')
    const answer = wrapper.find('textarea[name="answer"]')
    title.simulate('change', { target: { value: 'Test title' } })
    answer.simulate('change', { target: { value: 'Test description' } })

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    })

    expect(handler.mock.calls.length).toBe(1)
  })

  it('should not allow a blank title', () => {
    const handler = jest.fn()
    const { wrapper } = setup({
      ...defaultProps,
      handleSubmit: handler
    })

    const title = wrapper.find('input[name="title"]')
    const answer = wrapper.find('textarea[name="answer"]')
    title.simulate('change', { target: { value: '' } })
    answer.simulate('change', { target: { value: 'Test' } })

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    })

    expect(handler.mock.calls.length).toBe(0)
  })

  it('should allow a blank answer', () => {
    const handler = jest.fn()
    const { wrapper } = setup({
      ...defaultProps,
      handleSubmit: handler
    })

    const title = wrapper.find('input[name="title"]')
    const answer = wrapper.find('textarea[name="answer"]')
    title.simulate('change', { target: { value: 'Test' } })
    answer.simulate('change', { target: { value: '' } })

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    })

    expect(handler.mock.calls.length).toBe(1)
  })

  xit('should NOT allow a blank answer', () => {
    const handler = jest.fn()
    const { wrapper } = setup({
      ...defaultProps,
      handleSubmit: handler
    })

    const title = wrapper.find('input[name="title"]')
    const answer = wrapper.find('textarea[name="answer"]')
    title.simulate('change', { target: { value: 'Test' } })
    answer.simulate('change', { target: { value: '' } })

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    })

    expect(handler.mock.calls.length).toBe(0)
  })

  it('should navigate to the deck view when cancel is clicked without a confirm', () => {
    spyOn(window, 'confirm').and.returnValue(true)
    const handler = jest.fn()
    const { wrapper } = setup({
      ...defaultProps,
      push: handler
    })

    const input = wrapper.find('input.large-input')
    const cancel = wrapper.find('button[children="Cancel"]')

    input.simulate('change', {
      target: { value: 'Test' }
    })
    cancel.simulate('click')
    expect(window.confirm).toHaveBeenCalled()
    expect(handler.mock.calls.length).toBe(1)
  })

  it('should NOT navigate to the deck view when changes are made, cancel is clicked, and the user does not accept the confirmation dialog', () => {
    spyOn(window, 'confirm').and.returnValue(false)
    const handler = jest.fn()
    const { wrapper } = setup({
      ...defaultProps,
      push: handler
    })

    const input = wrapper.find('input.large-input')
    const cancel = wrapper.find('button[children="Cancel"]')

    input.simulate('change', {
      target: { value: 'Test' }
    })
    cancel.simulate('click')
    expect(window.confirm).toHaveBeenCalled()
    expect(handler.mock.calls.length).toBe(0)
  })

  it('should display a confirmation if changes are made', () => {
    spyOn(window, 'confirm').and.returnValue(false)
    const handler = jest.fn()
    const { wrapper } = setup({
      ...defaultProps,
      push: handler
    })

    const inputTitle = wrapper.find('input.large-input')
    const inputAnswer = wrapper.find('textarea[name="answer"]')
    const cancel = wrapper.find('button[children="Cancel"]')

    inputTitle.simulate('change', {
      target: { value: 'Test' }
    })
    cancel.simulate('click')
    expect(window.confirm).toHaveBeenCalled()

    inputAnswer.simulate('change', {
      target: { value: 'Test' }
    })
    cancel.simulate('click')
    expect(window.confirm).toHaveBeenCalled()
  })

  it('should not display a confirmation if changes have not been made', () => {
    spyOn(window, 'confirm').and.returnValue(false)
    const handler = jest.fn()
    const { wrapper } = setup({
      ...defaultProps,
      push: handler
    })
    const cancel = wrapper.find('button[children="Cancel"]')
    cancel.simulate('click')
    expect(window.confirm).not.toHaveBeenCalled()
  })
})
