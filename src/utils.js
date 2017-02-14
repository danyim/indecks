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
