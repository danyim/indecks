/**
 * Listener Middleware
 *
 * This Redux middleware will listen for actions and will dispatch another
 * action
 *
 * Adapted from
 * https://medium.com/@alexandereardon/the-middleware-listener-pattern-better-asynchronous-actions-in-redux-16164fb6186f
 */
export const combineListeners = listeners =>
  listeners.map(listener => middleware(listener))

const middleware = (...listeners) => store => next => (action) => {
  // listeners are provided with a picture
  // of the world before the action is applied
  const preActionState = store.getState()

  // release the action to reducers before
  // firing additional actions
  next(action)

  // always async
  setTimeout(() => {
    // can have multiple listeners listening
    // against the same action.type
    listeners.forEach((listener) => {
      if (listener[action.type]) {
        listener[action.type](action, store.dispatch, preActionState)
      }
    })
  })
}

export default middleware
