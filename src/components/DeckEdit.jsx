import React from 'react';
import CardEdit from './CardEdit';
import DeckNavigator from './DeckNavigator';

const propTypes = {};

const defaultProps = {};

class DeckEdit extends React.Component {
  render() {
    return (
      <section className="single">
        <CardEdit {...this.props} />
      </section>
    )
  }
}

DeckEdit.propTypes = propTypes;
DeckEdit.defaultProps = defaultProps;

export default DeckEdit;
