import toJSON from 'enzyme-to-json'
import { shallow, mount, setup, setupFull } from '../test/utils' // eslint-disable-line no-unused-vars
import { createStartTouchEventObject, createMoveTouchEventObject } from '../test/eventHelpers.js'
import CardView from './CardView'

describe('CardView', () => {
  let props

  beforeEach(() => {
    props = {
      card: {
        index: 1,
        title: 'Card',
        answer: 'Card description',
      },
      deck: {
        id: 'ABCDEFG',
        title: 'Deck title',
        description: 'Deck description',
        cards: [
          {
            index: 1,
            title: 'Card',
            answer: 'Card description',
          },
        ],
      },
      config: {
        shuffle: false,
      },
      cardIndex: 1,
      shuffleOff: () => {},
      shuffleOn: () => {},
      push: () => {},
    }
  })
  it('should render self and subcomponents', () => {
    const tree = shallow(CardView, props)
    expect(toJSON(tree)).toMatchSnapshot()
  })

  it('should display a card', () => {
    const { wrapper } = setupFull(CardView, props)
    const subject = wrapper.find('Card')
    expect(subject.exists()).toBe(true)
  })

  it('should flip the card when clicked', () => {
    const { wrapper } = setupFull(CardView, props)
    wrapper.find('Card').simulate('click')
    expect(wrapper.state('flipped')).toBe(true)
  })

  // TODO: Capturing swipe events still needs some work
  xit('should advance to the next card when swiped left', () => {
    const handler = jest.fn()
    const { wrapper } = setupFull(CardView, {
      ...props,
      push: handler,
    })
    const subject = wrapper.find('Swipeable')
    expect(subject.exists()).toBe(true)
    subject.simulate('touchStart', createStartTouchEventObject({ x: 200, y: 0 }))
    subject.simulate('touchMove', createMoveTouchEventObject({ x: 150, y: 0 }))
    subject.simulate('touchEnd', createMoveTouchEventObject({ x: 100, y: 0 }))
    expect(handler).toHaveBeenCalled()
  })

  xit('should go to the previous card when swiped right', () => {
    const handler = jest.fn()
    const { wrapper } = setupFull(CardView, {
      ...props,
      push: handler,
    })
    const subject = wrapper.find('Swipeable')
    expect(subject.exists()).toBe(true)
    subject.simulate('touchStart', createStartTouchEventObject({ x: 100, y: 0 }))
    subject.simulate('touchMove', createMoveTouchEventObject({ x: 150, y: 0 }))
    subject.simulate('touchEnd', createMoveTouchEventObject({ x: 200, y: 0 }))
    expect(handler).toHaveBeenCalled()
  })
})
