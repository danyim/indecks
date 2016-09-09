import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as deckActions from '../action-creators/deck';
import DeckGrid from './DeckGrid';

class DeckGridContainer extends React.Component {
  render() {
    return <DeckGrid {...this.props} />
  }
}

const mapStateToProps = ({decks}) => ({decks});
const mapDispatchToProps = (dispatch) => bindActionCreators(deckActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckGridContainer);
