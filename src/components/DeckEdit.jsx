import React from 'react';
import CardEdit from './CardEdit';
import DeckNavigator from './DeckNavigator';

class DeckEdit extends React.Component {
  render() {
    return (
      <section className="single">
        <CardEdit {...this.props} />
      </section>
    )
  }
}

DeckEdit.defaultProps = {};
DeckEdit.propTypes = {};

export default DeckEdit;
