import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as deckActions from '../redux/modules/decks';
import CardAdd from '../components/CardAdd';

const propTypes = {
  deck: React.PropTypes.object.isRequired,
  addCard: React.PropTypes.func.isRequired
};

const defaultProps = {};

class DeckAddContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(deckId, card) {
    this.props.addCard(
      card.title,
      card.answer,
      deckId
    );
    // View the card immediately after saving
    browserHistory.push(`/view/${deckId}/${this.props.deck.cards.length + 1}`);
  }

  render() {
    return (
      <section className="single">
        <CardAdd {...this.props} handleSubmit={this.handleSubmit} />
      </section>
    );
  }
}

DeckAddContainer.propTypes = propTypes;
DeckAddContainer.defaultProps = defaultProps;

const mapStateToProps = ({ decks }, ownProps) => {
  const deckIndex = decks.findIndex(d => d.id === ownProps.params.deckId);
  return {
    deck: decks[deckIndex],
    deckId: ownProps.params.deckId
  };
};
const mapDispatchToProps = dispatch => bindActionCreators(deckActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckAddContainer);
