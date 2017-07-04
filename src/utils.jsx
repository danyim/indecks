import React from 'react'
import { Route } from 'react-router-dom'
import _ from 'lodash'

export const createReducer = (initialState, handlers) =>
  function reducer(state = initialState, action = {}) {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action)
    }
    return state
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
  for (let k = 0; k < a.length; k++) {
    if (a[k] !== expected) {
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
export const findBestNextIndex = (a, key) =>
  findMissing(a.map(x => x[key])) ||
  Math.max(0, Math.max.apply(null, a.map(x => x[key])) + 1)

/**
 * Helper function to generate routes
 * @param  {Object} route) Route object that takes the form
 *                         {
 *                           exact: boolean,
 *                           path: string,
 *                           component: Component,
 *                           routes: Routes
 *                         }
 * @return {Component}        Returns a <Route> component to plug into a <Switch>
 */
export const routeWithSubRoutes = route =>
  <Route
    key={_.uniqueId()}
    exact={route.exact || false}
    path={route.path}
    render={props =>
      // Pass the sub-routes down to keep nesting
      // <route.component {...props}>
      //   { route.children ? route.children.map(child => routeWithSubRoutes(child)) : null }
      // </route.component>
      <route.component {...props} routes={route.routes} />}
  />
