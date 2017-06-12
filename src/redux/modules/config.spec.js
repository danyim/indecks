import reducer, * as actions from './config'

describe('config actions', () => {
  it('should create an action to toggle card shuffling', () => {
    const expectedAction = {
      type: 'TOGGLE_SHUFFLE'
    }
    expect(actions.toggleShuffle()).toEqual(expectedAction)
  })
})

describe('config reducers', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({})
  })

  it('should handle TOGGLE_SHUFFLE', () => {
    expect(
      reducer({}, {
        type: 'TOGGLE_SHUFFLE'
      })
    ).toEqual({
      shuffle: true
    })

    expect(
      reducer(
        {
          shuffle: false
        },
        {
          type: 'TOGGLE_SHUFFLE'
        }
      )
    ).toEqual({
      shuffle: true
    })

    expect(
      reducer(
        {
          shuffle: true
        },
        {
          type: 'TOGGLE_SHUFFLE'
        }
      )
    ).toEqual({
      shuffle: false
    })
  })
})
