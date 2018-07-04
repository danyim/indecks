import PropTypes from 'prop-types'

export const CardShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
})

export const DeckShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(CardShape.isRequired).isRequired,
})
