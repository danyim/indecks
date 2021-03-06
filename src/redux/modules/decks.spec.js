import moment from 'moment'
import reducer, * as actions from './decks'

describe('decks redux module', () => {
  describe('decks actions', () => {
    let initialState
    const deck = {
      cards: [
        {
          title: 'Card 1 from Deck 1',
          index: 1,
          answer: 'Answer 1 from Deck 1',
        },
        {
          title: 'Card 2 from Deck 1',
          index: 2,
          answer: 'Answer 2 from Deck 1',
        },
      ],
      id: 'ADBCEF',
      title: 'Test Deck',
      description: 'Test deck description.',
    }
    const deck2 = {
      cards: [
        {
          title: 'Card 1 from Deck 2',
          index: 1,
          answer: 'Answer 1 from Deck 2',
        },
        {
          title: 'Card 2 from Deck 2',
          index: 2,
          answer: 'Answer 2 from Deck 2',
        },
      ],
      id: 'UVWXYZ',
      title: 'Test Deck 2',
      description: 'Test deck 2 description.',
    }
    const deck3 = {
      cards: [
        {
          title: 'Card 1 from Deck 3',
          index: 1,
          answer: 'Answer 1 from Deck 3',
        },
        {
          title: 'Card 2 from Deck 3',
          index: 2,
          answer: 'Answer 2 from Deck 3',
        },
      ],
      id: 'HIJKLM',
      title: 'Test Deck 3',
      description: 'Test deck 3 description.',
    }

    beforeEach(() => {
      initialState = []
    })

    it('should return the initial state', () => {
      expect(reducer(initialState, {})).toEqual(initialState)
    })

    describe('ADD_DECK', () => {
      it('should create an action to add a deck', () => {
        const expectedAction = {
          type: 'decks/ADD_DECK',
          deck,
          preventSave: false,
        }
        expect(actions.addDeck(deck)).toEqual(expectedAction)
      })

      it('should handle adding to an empty array of decks', () => {
        expect(
          reducer([], {
            type: 'decks/ADD_DECK',
            deck,
          })
        ).toEqual([deck])
      })

      it('should handle adding to a populated array of decks', () => {
        expect(
          reducer([deck2], {
            type: 'decks/ADD_DECK',
            deck,
          })
        ).toEqual([deck2, deck])
      })
    })

    describe('EDIT_DECK', () => {
      it('should create an action to edit a deck', () => {
        const deckId = 'ABCDEFG'
        const title = 'Deck title'
        const description = 'Deck description'
        const expectedAction = {
          type: 'decks/EDIT_DECK',
          deckId,
          title,
          description,
        }
        expect(actions.editDeck(deckId, title, description)).toEqual(expectedAction)
      })

      it('should handle editing a non-existent deck', () => {
        expect(
          reducer([], {
            type: 'decks/EDIT_DECK',
            deckId: 1234,
            title: 'Test 1',
            description: 'Test 2',
          })
        ).toEqual([])
      })

      it('should handle editing an existing deck', () => {
        expect(
          reducer([deck], {
            type: 'decks/EDIT_DECK',
            deckId: deck.id,
            title: 'Edited Title',
            description: deck.description,
          })
        ).toEqual([
          {
            ...deck,
            title: 'Edited Title',
          },
        ])
      })
    })

    describe('REMOVE_DECK', () => {
      it('should create an action to remove a deck', () => {
        const deckId = 'ABCDEFG'
        const expectedAction = {
          type: 'decks/REMOVE_DECK',
          deckId,
        }
        expect(actions.removeDeck(deckId)).toEqual(expectedAction)
      })

      it('should handle removing a non-existent deck', () => {
        expect(
          reducer([], {
            type: 'decks/REMOVE_DECK',
            deckId: 1234,
          })
        ).toEqual([])
      })

      it('should handle removing an existing deck', () => {
        expect(
          reducer([deck, deck2, deck3], {
            type: 'decks/REMOVE_DECK',
            deckId: deck2.id,
          })
        ).toEqual([deck, deck3])
      })
    })

    describe('SHUFFLE_DECK', () => {
      it('should create an action to shuffle cards in a deck', () => {
        const deckId = 'ABCDEFG'
        const expectedAction = {
          type: 'decks/SHUFFLE_DECK',
          deckId,
        }
        expect(actions.shuffleDeck(deckId)).toEqual(expectedAction)
      })

      // it('should handle shuffling a deck', () => {
      //   expect(
      //     reducer([
      //       deck
      //     ],
      //     {
      //       type: 'decks/SHUFFLE_DECK',
      //       deckId: deck.id
      //     })
      //   ).toEqual([

      //   ]);
      // });
    })

    describe('ADD_CARD', () => {
      it('should create an action to add a card to a deck', () => {
        const title = 'Title'
        const answer = 'Answer'
        const deckId = 'ABCDEFG'
        const createdOn = moment().format()
        const expectedAction = {
          type: 'decks/ADD_CARD',
          title,
          answer,
          deckId,
          createdOn,
        }
        expect(actions.addCard(title, answer, deckId, createdOn)).toEqual(expectedAction)
      })

      it('should handle adding a card to a non-existent deck', () => {
        expect(
          reducer([], {
            type: 'decks/ADD_CARD',
            title: 'Title',
            answer: 'Answer',
            deckId: '???',
          })
        ).toEqual([])
      })

      it('should handle adding a card to an existing deck', () => {
        // spyOn(moment, 'confirm').and.returnValue(true)
        const newCard = {
          title: 'Title',
          answer: 'Answer',
          createdOn: moment().format(),
        }

        expect(
          reducer([deck, deck2, deck3], {
            type: 'decks/ADD_CARD',
            title: newCard.title,
            answer: newCard.answer,
            deckId: deck2.id,
            createdOn: newCard.createdOn,
          })
        ).toEqual([
          deck,
          {
            ...deck2,
            cards: [
              ...deck2.cards,
              {
                ...newCard,
                editedOn: null,
                index: 3, // 3 because deck2 already has two cards
              },
            ],
          },
          deck3,
        ])
      })
    })

    describe('DUPLICATE_CARD', () => {
      it('should create an action to add a card to a deck', () => {
        const cardIndex = 4
        const deckId = 'ABCDEFG'
        const createdOn = moment().format()

        const expectedAction = {
          type: 'decks/DUPLICATE_CARD',
          cardIndex,
          deckId,
          createdOn,
        }
        expect(actions.duplicateCard(cardIndex, deckId, createdOn)).toEqual(expectedAction)
      })

      it('should handle duplicating a card', () => {
        const createdOn = moment().format()
        expect(
          reducer([deck, deck2, deck3], {
            type: 'decks/DUPLICATE_CARD',
            cardIndex: 2,
            deckId: deck2.id,
            createdOn,
          })
        ).toEqual([
          deck,
          {
            ...deck2,
            cards: [
              ...deck2.cards,
              {
                ...deck2.cards[1],
                createdOn,
                editedOn: null,
                index: 3, // 3 because deck2 already has two cards
              },
            ],
          },
          deck3,
        ])
      })
    })

    describe('EDIT_CARD', () => {
      it('should create an action to edit a card in a deck', () => {
        const title = 'Title'
        const answer = 'Answer'
        const cardIndex = 1
        const deckId = 'ABCDEFG'
        const editedOn = moment().format()
        const expectedAction = {
          type: 'decks/EDIT_CARD',
          title,
          answer,
          cardIndex,
          deckId,
          editedOn,
        }
        expect(actions.editCard(title, answer, cardIndex, deckId, editedOn)).toEqual(expectedAction)
      })

      it('should handle editing a card in a deck', () => {
        const newCard = {
          title: 'Title',
          answer: 'Answer',
          editedOn: moment().format(),
        }

        expect(
          reducer([deck, deck2, deck3], {
            type: 'decks/EDIT_CARD',
            title: newCard.title,
            answer: newCard.answer,
            cardIndex: 1,
            deckId: deck2.id,
            editedOn: newCard.editedOn,
          })
        ).toEqual([
          deck,
          {
            ...deck2,
            cards: [
              {
                title: newCard.title,
                answer: newCard.answer,
                editedOn: newCard.editedOn,
                index: 1,
              },
              { ...deck2.cards[1] },
            ],
          },
          deck3,
        ])
      })
    })

    describe('MOVE_CARD', () => {
      it('should create an action to move a card in a deck', () => {
        const cardIndex = 4
        const srcDeckId = 'ABCDEFG'
        const destDeckId = 'LMNOPQ'
        const expectedAction = {
          type: 'decks/MOVE_CARD',
          cardIndex,
          srcDeckId,
          destDeckId,
        }
        expect(actions.moveCard(cardIndex, srcDeckId, destDeckId)).toEqual(expectedAction)
      })

      it('should handle moving a card between decks', () => {
        expect(
          reducer([deck, deck2], {
            type: 'decks/MOVE_CARD',
            cardIndex: 2,
            srcDeckId: deck.id,
            destDeckId: deck2.id,
          })
        ).toEqual([
          {
            ...deck,
            cards: [deck.cards[0]],
          },
          {
            ...deck2,
            cards: [...deck2.cards, deck.cards[1]],
          },
        ])
      })

      it('should handle moving a card between decks even when the source is after the destination', () => {
        expect(
          reducer([deck, deck2], {
            type: 'decks/MOVE_CARD',
            cardIndex: 2,
            srcDeckId: deck2.id,
            destDeckId: deck.id,
          })
        ).toEqual([
          {
            ...deck,
            cards: [...deck.cards, deck2.cards[1]],
          },
          {
            ...deck2,
            cards: [deck2.cards[0]],
          },
        ])
      })
    })

    describe('REMOVE_CARD', () => {
      it('should create an action to remove a card from a deck', () => {
        const cardIndex = 4
        const deckId = 'ABCDEFG'
        const expectedAction = {
          type: 'decks/REMOVE_CARD',
          cardIndex,
          deckId,
        }
        expect(actions.removeCard(cardIndex, deckId)).toEqual(expectedAction)
      })

      it('should handle removing a card', () => {
        expect(
          reducer([deck, deck2], {
            type: 'decks/REMOVE_CARD',
            cardIndex: 2,
            deckId: deck2.id,
          })
        ).toEqual([
          deck,
          {
            ...deck2,
            cards: [deck2.cards[0]],
          },
        ])
      })
    })

    describe('REMOVE_ALL_DECKS', () => {
      it('should create an action to remove all decks', () => {
        const expectedAction = {
          type: 'decks/REMOVE_ALL_DECKS',
        }
        expect(actions.removeAllDecks()).toEqual(expectedAction)
      })

      it('should handle removing all decks', () => {
        expect(
          reducer([deck, deck2, deck3], {
            type: 'decks/REMOVE_ALL_DECKS',
          })
        ).toEqual([])
      })
    })
  })
})
