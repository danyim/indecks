import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import * as deckActions from '../redux/modules/decks'
import { DeckShape } from '../components/__commonShapes'
import CardAdd from '../components/CardAdd'

const propTypes = {
  deck: DeckShape.isRequired,
  addCard: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired
}

const defaultProps = {}

class DeckAddContainer extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(deckId, card) {
    this.props.addCard(card.title, card.answer, deckId)
    // View the card immediately after saving
    this.props.push(`/view/${deckId}/${this.props.deck.cards.length + 1}`)
  }

  render() {
    return (
      <section className="single">
        <CardAdd {...this.props} handleSubmit={this.handleSubmit} />
      </section>
    )
  }
}

DeckAddContainer.propTypes = propTypes
DeckAddContainer.defaultProps = defaultProps

const mapStateToProps = ({ decks }, ownProps) => {
  const deckIndex = decks.findIndex(d => d.id === ownProps.match.params.deckId)
  return {
    deck: decks[deckIndex],
    deckId: ownProps.match.params.deckId
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...deckActions, push }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DeckAddContainer)
