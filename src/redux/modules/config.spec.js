import reducer, * as actions from './config'

describe('config actions', () => {
  it('should create an action to turn ON card shuffling', () => {
    const expectedAction = {
      type: 'config/SHUFFLE_ON',
    }
    expect(actions.shuffleOn()).toEqual(expectedAction)
  })

  it('should create an action to turn OFF card shuffling', () => {
    const expectedAction = {
      type: 'config/SHUFFLE_OFF',
    }
    expect(actions.shuffleOff()).toEqual(expectedAction)
  })
})

describe('config reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  it('should handle SHUFFLE_ON', () => {
    expect(
      reducer(
        {},
        {
          type: 'config/SHUFFLE_ON',
        }
      )
    ).toEqual({
      shuffle: true,
    })

    expect(
      reducer(
        {
          shuffle: false,
        },
        {
          type: 'config/SHUFFLE_ON',
        }
      )
    ).toEqual({
      shuffle: true,
    })

    expect(
      reducer(
        {
          shuffle: true,
        },
        {
          type: 'config/SHUFFLE_OFF',
        }
      )
    ).toEqual({
      shuffle: false,
    })
  })
})
