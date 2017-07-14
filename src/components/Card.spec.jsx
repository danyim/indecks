import toJSON from 'enzyme-to-json'
import { shallow, mount, setup, setupFull } from '../testUtils' // eslint-disable-line no-unused-vars
import Card from './Card'

const defaultProps = {
  card: {
    title: 'Title',
    answer: 'Answer',
    index: 0
  },
  className: '',
  flipped: false,
  handleOnClick: jest.fn(),
  trimOverflow: false,
  trimOverflowLength: 125,
  children: null
}

describe('Card', () => {
  it('should render self and subcomponents', () => {
    const wrapper = mount(Card, defaultProps)
    expect(toJSON(wrapper)).toMatchSnapshot()
  })

  it('should call the handleOnClick once when card is clicked', () => {
    const handler = jest.fn()
    const { wrapper } = setup(Card, {
      ...defaultProps,
      handleOnClick: handler
    })

    wrapper.find('figure').simulate('click')
    expect(handler.mock.calls.length).toBe(1)
  })

  it('should render the title if flipped is FALSE', () => {
    const { wrapper } = setup(Card, {
      ...defaultProps,
      flipped: false
    })

    expect(wrapper.find('Markdown.card-title').exists()).toEqual(true)
  })

  it('should render the answer if flipped is TRUE', () => {
    const { wrapper } = setup(Card, {
      ...defaultProps,
      flipped: true
    })

    expect(wrapper.find('figcaption Markdown').exists()).toEqual(true)
  })

  it('should render the no answer indicator on the title if a null or blank answer is provided', () => {
    const { wrapper } = setup(Card, {
      ...defaultProps,
      card: {
        ...defaultProps.card,
        answer: ''
      }
    })

    expect(wrapper.find('div.no-answer > div').text()).toBe('No answer')
  })

  it('should render an empty answer notice if the card is flipped', () => {
    const { wrapper } = setup(Card, {
      ...defaultProps,
      card: {
        ...defaultProps.card,
        answer: ''
      },
      flipped: true
    })

    expect(wrapper.find('figcaption Markdown').exists()).toEqual(false)
    expect(wrapper.find('div.center p.grey').text()).toEqual(
      'This card does not have an answer yet'
    )
  })

  it('should trim the title if it exceeds n chars', () => {
    const title = 'Testing long title'
    const trimOverflowLength = 5

    const { wrapper } = setup(Card, {
      ...defaultProps,
      card: {
        ...defaultProps.card,
        title
      },
      flipped: false,
      trimOverflow: true,
      trimOverflowLength
    })

    expect(
      wrapper
        .find(`Markdown[text="${title.substr(0, trimOverflowLength)}..."]`)
        .exists()
    ).toEqual(true)
  })

  it('should trim the title not including markdown image tags', () => {
    const extra = '![Image title](http://image.url)'
    const title = 'Testing long title with an image'
    const trimOverflowLength = 5

    const { wrapper } = setup(Card, {
      ...defaultProps,
      card: {
        ...defaultProps.card,
        title: extra + title
      },
      flipped: false,
      trimOverflow: true,
      trimOverflowLength
    })

    expect(
      wrapper
        .find(`Markdown[text="${title.substr(0, trimOverflowLength)}..."]`)
        .exists()
    ).toEqual(true)
  })
})
