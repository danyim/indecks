import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as deckActions from '../redux/modules/decks';
import Settings from '../components/Settings';

const propTypes = {
  deckCount: React.PropTypes.number.isRequired,
  removeAllDecks: React.PropTypes.func.isRequired
};

const defaultProps = {};

const SettingsContainer = (props) => {
  return (
    <Settings
      deckCount={props.deckCount}
      removeAllDecks={props.removeAllDecks}
      {...props}
    />
  );
};

SettingsContainer.propTypes = propTypes;
SettingsContainer.defaultProps = defaultProps;

const mapStateToProps = ({ decks }) => {
  return {
    decks,
    deckCount: decks.length
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(deckActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsContainer);
