import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as deckActions from '../action-creators/deck';
import DeckGrid from '../components/DeckGrid';

const propTypes = {
  decks: React.PropTypes.array.isRequired,
  removeDeck: React.PropTypes.func.isRequired,
};

const defaultProps = {};

class DeckGridContainer extends React.Component {
  render() {
    if(!Array.isArray(this.props.decks)) {
      return <span>Error loading decks</span>;
    }
    else {
      return (
        <DeckGrid {...this.props} />
      );
    }
  }
}

DeckGridContainer.propTypes = propTypes;
DeckGridContainer.defaultProps = defaultProps;

const mapStateToProps = ({decks}) => ({decks});
const mapDispatchToProps = (dispatch) => bindActionCreators(deckActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckGridContainer);
