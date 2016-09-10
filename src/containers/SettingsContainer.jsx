import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as deckActions from '../action-creators/deck';
import Settings from '../components/Settings';

class SettingsContainer extends React.Component {
  render() {
    return (
      <Settings {...this.props} />
    );
  }
}

const mapStateToProps = ({decks}) => ({decks});
const mapDispatchToProps = (dispatch) => bindActionCreators(deckActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsContainer);
