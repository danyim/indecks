// import React from 'react';
// import DeckEditCardForm from './DeckEditCardForm';
// import DeckEditDeckForm from './DeckEditDeckForm';
// import styles from '../styles/components/DeckEdit';

// const propTypes = {
//   cards: React.PropTypes.array.isRequired,
//   deck: React.PropTypes.object.isRequired,
//   deckId: React.PropTypes.string.isRequired,
//   editCard: React.PropTypes.func.isRequired,
//   removeCard: React.PropTypes.func.isRequired,
//   editDeck: React.PropTypes.func.isRequired,
//   form: React.PropTypes.object.isRequired
// };

// const defaultProps = {};

// class DeckEdit extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleDeleteCard = this.handleDeleteCard.bind(this);
//     this.handleUpdateCard = this.handleUpdateCard.bind(this);
//     this.handleCardDetailSubmit = this.handleCardDetailSubmit.bind(this);
//     this.handleDeckDetailSubmit = this.handleDeckDetailSubmit.bind(this);
//   }

//   handleDeleteCard(cardIndex, deckId) {
//     this.props.removeCard(cardIndex, deckId);
//   }

//   handleUpdateCard(index, deckId, card) {
//     // console.log(`updating card with "${card.title}" and "${card.description}"`);
//     this.props.editCard(card.title, card.description, index + 1, deckId);
//   }

//   handleCardDetailSubmit(e, cardIndex) {
//     e.preventDefault();
//     this.props.editCard(
//       this.props.form.deckEditCard.values.title,
//       this.props.form.deckEditCard.values.answer,
//       cardIndex,
//       this.props.deckId);
//   }

//   handleDeckDetailSubmit(e) {
//     e.preventDefault();
//     this.props.editDeck(
//       this.props.deckId,
//       this.props.form.deckEditDeck.values.title,
//       this.props.form.deckEditDeck.values.description);
//   }

//   render() {
//     const { cards, deck, deckId } = this.props;
//     const deckFormInitialValues = {
//       title: deck.title,
//       description: deck.description
//     };

//     return (
//       <section className={`${styles['deck-edit']}`}>
//         <div className={`${styles.card}`}>
//           <section className={`${styles['title-section']}`}>
//             <DeckEditDeckForm
//               initialValues={deckFormInitialValues}
//               handleDetailSubmit={this.handleDeckDetailSubmit}
//             />
//           </section>
//           <section className={`${styles['card-section']}`}>
//             {cards.map((card, i) =>
//               <DeckEditCardForm
//                 key={`deck_${deckId}-${i + 1}`}
//                 cardIndex={i + 1}
//                 deckId={deckId}
//                 initialValues={{ title: card.title, answer: card.answer }}
//                 handleCardSubmit={this.handleCardDetailSubmit}
//                 handleDeleteCard={this.handleDeleteCard}
//               />
//             )}
//           </section>
//         </div>
//       </section>
//     );
//   }
// }

// DeckEdit.propTypes = propTypes;
// DeckEdit.defaultProps = defaultProps;

// export default DeckEdit;
