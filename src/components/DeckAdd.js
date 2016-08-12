import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as deckActions from '../action-creators/deck';
import { Link, browserHistory } from 'react-router';
import CardAdd from './CardAdd';

class DeckAdd extends React.Component {
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
    browserHistory.push(`/view/${deckId}`);
  }

  render() {
    return (
      <section className="single">
        <CardAdd deckId={this.props.deckId} handleSubmit={this.handleSubmit} />
      </section>
    );
  }
}

const mapStateToProps = ({}, ownProps) => {
  return {
    deckId: ownProps.params.deckId
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(deckActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckAdd);
