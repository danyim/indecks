import toJson from 'enzyme-to-json'
import { shallow, mount, setup, setupFull } from '../test/utils' // eslint-disable-line no-unused-vars
import CardPreview from './CardPreview'

const defaultProps = {
  title: 'Test',
  answer: 'test'
}

describe('CardPreview', () => {
  it('should render self and subcomponents', () => {
    const wrapper = mount(CardPreview, defaultProps)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should display the preview pane when the button is pressed', () => {
    const { wrapper } = setupFull(CardPreview, {
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
