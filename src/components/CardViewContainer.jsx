import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as deckActions from '../action-creators/deck';
import * as configActions from '../action-creators/config';
import CardView from './CardView';
import styles from '../styles/components/CardView';

class CardViewContainer extends React.Component {
  render() {
    const { card } = this.props;
    if(!card) return <span>Invalid card index</span>;

    return <CardView {...this.props} />;
  }
}

const mapStateToProps = ({decks, config}, ownProps) => {
  const { deckId, cardIndex } = ownProps.params;
  // Find the deck based on the property
  const deckIndex = decks.findIndex(d => d.id === deckId);
  return {
    card: decks[deckIndex].cards[cardIndex - 1],
    deck: decks[deckIndex],
    config,
    cardIndex: parseInt(cardIndex)
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(Object.assign({}, deckActions, configActions), dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardViewContainer);
