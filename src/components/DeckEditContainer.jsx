import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as deckActions from '../action-creators/deck';
import DeckEdit from './DeckEdit';
import DeckNavigator from './DeckNavigator';

class DeckEditContainer extends React.Component {
  render() {
    const { deckId, cardIndex, card } = this.props;

    return (
      <DeckEdit {...this.props} />
    )
  }
}

DeckEditContainer.defaultProps = {};
DeckEditContainer.propTypes = {};

const mapStateToProps = ({decks}, ownProps) => {
  const { deckId, cardIndex } = ownProps.params;
  // Find the deck based on the property
  const deckIndex = decks.findIndex(d => d.id === deckId);
  return {
    card: decks[deckIndex].cards[cardIndex - 1],
    deckId: deckId,
    cardIndex: parseInt(cardIndex)
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(deckActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckEditContainer);
