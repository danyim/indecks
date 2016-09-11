import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as deckActions from '../action-creators/deck';
import Settings from '../components/Settings';

const propTypes = {
  deckCount: React.PropTypes.number.isRequired,
  removeAllDecks: React.PropTypes.func.isRequired
};

const defaultProps = {};

class SettingsContainer extends React.Component {
  render() {
    return (
      <Settings
        deckCount={this.props.deckCount}
        removeAllDecks={this.props.removeAllDecks}
        {...this.props} />
    );
  }
}

SettingsContainer.propTypes = propTypes;
SettingsContainer.defaultProps = defaultProps;

const mapStateToProps = ({ decks }) => {
  return {
    decks,
    deckCount: decks.length
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(deckActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsContainer);
