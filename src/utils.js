export const createReducer = (initialState, handlers) => {
  return function reducer (state = initialState, action = {}) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    }
    return state
  }
}

/**
 * Given an array of consecutive numbers from 1 to n, find the missing value.
 * Returns null if no missing value found
 * @param  {Array}  a   Array of numbers
 * @param  {Number} min Minimum value (0 or 1)
 * @return {Number}     Missing value
 */
export const findMissing = (a, min = 1) => {
  let expected = min
  for (let k of a) {
    if (k !== expected) {
      return expected
    }
    expected++
  }
  return null
}

/**
 * Given an array of objects, check the value of the key and return the
 * best 1-based index to insert the next value
 * @param  {Array}  a   An array of objects
 * @param  {String} key Key to look for
 * @return {Number}     Index of the best next value
 */
export const findBestNextIndex = (a, key) => {
  return findMissing(a.map(x => x[key])) || Math.max(0, Math.max.apply(null, a.map(x => x[key])) + 1)
}
