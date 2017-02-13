import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as deckActions from '../redux/modules/decks';
import DeckGrid from '../components/DeckGrid';

const propTypes = {
  decks: React.PropTypes.array.isRequired
};

const defaultProps = {};

const DeckGridContainer = (props) => {
  if(!Array.isArray(props.decks)) {
    return <span>Error loading decks</span>;
  }
  else {
    return (
      <DeckGrid {...props} />
    );
  }
};

DeckGridContainer.propTypes = propTypes;
DeckGridContainer.defaultProps = defaultProps;

const mapStateToProps = ({decks}) => ({decks});
const mapDispatchToProps = dispatch => bindActionCreators(deckActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckGridContainer);
