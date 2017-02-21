export const createReducer = (initialState, handlers) => {
  return function reducer(state = initialState, action = {}) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
};

/**
 * Given an array of consecutive numbers, find the missing value.
 * Returns null if no missing value found
 * @param  {Array}  a Array of numbers
 * @return {Number}   Missing value
 */
export const findMissing = (a) => {
  let expectedNextValue;
  for(let k of a)
  {
    expectedNextValue = a[k] + 1;
    if(k <= a.length - 1 && expectedNextValue !== a[k + 1]) {
      return expectedNextValue;
    }
  }
  return null;
};

/**
 * Given an array with potentially missing values at parameter key, find the
 * next best 0-based index to insert the next value
 * @param  {Array}  a   An array of objects
 * @param  {String} key Key to look for
 * @return {Number}     Index of the best next value
 */
export const findBestNextIndex = (a, key) => {
  return findMissing(a.map(x => x[key])) || Math.max(0, Math.max.apply(null, a.map(x => x[key])) + 1);
};

