import { createSelector } from 'reselect'

const getCards = (state, props) => state.decks[props.deckId].cards
const cardWithAnswerSelector = createSelector([getCards], cards => {
  switch (cards) {
    case 'SHOW_WITH_ANSWERS':
      return cards.filter(card => card.answer.trim() !== '')
    case 'SHOW_WITHOUT_ANSWERS':
      return cards.filter(card => card.answer.trim() === '')
    default:
      return cards
  }
})

export default cardWithAnswerSelector
