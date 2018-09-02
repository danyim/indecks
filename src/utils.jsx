/* @flow */
import * as React from 'react'
import { Route } from 'react-router-dom'
import _ from 'lodash'

export const createReducer = (initialState: *, handlers: *) =>
  function reducer(state: * = initialState, action: * = {}) {
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
export const findMissing = (a: Array<number>, min: number = 1): ?number => {
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
export const findBestNextIndex = (a: Array<Object>, key: string): number =>
  findMissing(a.map(x => x[key]), 0) || Math.max(0, Math.max.apply(null, a.map(x => x[key])) + 1)

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
export const routeWithSubRoutes = ({
  Component,
  path,
  exact = false,
}: {
  Component: *,
  path: string,
  exact: boolean,
}): * => (
  <Route key={_.uniqueId()} exact={exact} path={path} render={props => <Component {...props} />} />
)

/**
 * Generates a random string
 * @param  {Number} length Length of string
 * @return {String}        Random string
 */
export const generateRandomString = (length?: number = 8) => {
  const chars = '0123456789abcdefABCDEFGHIJKLMNPQRSTUVWXYZ'
  let result = ''
  for (let i = length; i > 0; i -= 1) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

const cahDirectives = [
  ['___________: good til the last drop', '[noun]'],
  ['Why am I sticky?', '[noun]'],
  ['What helps Obama unwind?', '[any]'],
  ['Daddy, why is mommy crying?', '[noun]'],
  ['I get by with a little help from ___________', '[any]'],
  ['I drink to forget ___________', '[any]'],
  ['But before I kill you, Mr. Bond, I must show you ___________.', '[noun]'],
  ['What never fails to liven up the party?', '[any]'],
  ["Why can't I sleep at night?", '[noun]'],
  ["___________. It's a trap!", '[noun]'],
  ['___________. High five, bro.', '[noun]'],
  ['And the Academy Award for ___________ goes to ___________', '[verb] [noun]'],
  ["I'm sorry Professor, but I couldn't complete my homework because of ___________", '[noun]'],
  ["What's that smell?", '[any]'],
  ["What's a girl's best friend?", '[any]'],
  ["What's there a ton of in heaven?", '[noun]'],
]
const verbs = [
  'Prancing',
  'Pooping back and forth. Forever.',
  'Being fabulous',
  'A gentle caress of the inner thigh',
  'Being marginalized',
  'Throwing a virgin into a volcano',
  'Destroying the evidence',
  'Teaching a robot to love',
  'Making a pouty face',
  'Doing the right thing',
]
const nouns = [
  'Racism',
  'Old-people smell',
  'Classist undertones',
  'An oversized lollipop',
  'Boogers',
  'A tiny horse',
  'Barack Obama',
  'Elderly Japanese men',
  'A really cool hat',
  'Fear itself',
  'Science',
  'Elderly Japanese men',
  'Stranger danger',
  'The terrorists',
  'Same-sex ice dancing',
  'Cheating in the Special Olympics',
  'Bingeing and purging',
  'William Shatner',
  'Heteronormativity',
  'Nickelback',
  'Tom Cruise',
  'The profoundly handicapped',
  'The placenta',
  'Chainsaws for hands',
  'Arnold Schwarzenegger',
  'An icepick lobotomy',
  'Goblins',
  'Object permanence',
  'Dying',
  'A falcon with a cap on its head',
  'Hormone injections',
  'Dying of dysentery',
  'Sexy pillow fights',
  'Famine',
  'Estrogen',
  'Scientology',
  'Italians',
  'Children on leashes',
  'The chinese gymnastics team',
  'A disappointing birthday party',
]

/**
 * Generates a Cards Against Humanity card
 * @return {Object} Title and answer
 */
export const generateCAHCard = () => {
  let title = ''
  let answer = ''
  const directive = cahDirectives[Math.floor(Math.random() * cahDirectives.length)]

  title = directive[0]
  directive[1].split(' ').forEach(w => {
    let word = w
    if (w === '[any]') {
      word = Math.random() >= 0.5 ? '[verb]' : '[noun]'
    }

    if (word === '[verb]') {
      answer += verbs[Math.floor(Math.random() * verbs.length)]
    } else if (word === '[noun]') {
      answer += nouns[Math.floor(Math.random() * nouns.length)]
    } else {
      answer += word
    }

    answer += '\n\n'
  })

  return {
    title,
    answer,
  }
}
