import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as deckActions from '../action-creators/deck';
import ImportDeck from '../components/ImportDeck';

const propTypes = {
  addDeck: React.PropTypes.func.isRequired,
  handleClose: React.PropTypes.func
};

const defaultProps = {};

class ImportDeckContainer extends React.Component {
  render() {
    return (
      <ImportDeck
        {...this.props}
      />
    );
  }
}

ImportDeckContainer.propTypes = propTypes;
ImportDeckContainer.defaultProps = defaultProps;

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => bindActionCreators(deckActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportDeckContainer);

