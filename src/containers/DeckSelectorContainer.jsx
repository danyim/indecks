import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DeckShape } from '../components/__commonShapes'
import DeckSelector from '../components/DeckSelector'

const propTypes = {
  decks: PropTypes.arrayOf(DeckShape.isRequired).isRequired
}

const defaultProps = {}

const DeckSelectorContainer = props =>
  <DeckSelector decks={props.decks} {...props} />

DeckSelectorContainer.propTypes = propTypes
DeckSelectorContainer.defaultProps = defaultProps

const mapStateToProps = ({ decks }) => ({
  decks
})

export default connect(mapStateToProps)(DeckSelectorContainer)
