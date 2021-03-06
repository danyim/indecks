import React from 'react'
import PropTypes from 'prop-types'
import StylePropType from 'react-style-proptype'
import { Link } from 'react-router-dom'
import { DeckShape } from './__commonShapes'
import styles from '../styles/components/Deck.styl'

class Deck extends React.Component {
  static propTypes = {
    deck: DeckShape.isRequired,
    handleOnClick: PropTypes.func.isRequired,
    style: StylePropType,
    children: PropTypes.node,
  }

  static defaultProps = {
    style: {},
    children: null,
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  render() {
    const { deck, style } = this.props
    const { id: deckId } = deck

    return (
      <figure className={`grid-figure ${styles['grid-figure']}`} style={style}>
        <div>
          <h1
            className={`${styles['deck-title']}`}
            onClick={this.props.handleOnClick}
            role="presentation"
          >
            {deck.title}
          </h1>
        </div>

        <figcaption>
          {/*
          <p><code>{deck.id}</code></p>
          <p>URL: <a href={deck.url}>Link</a></p>
          */}
          <p>{deck.cards ? deck.cards.length : 0} cards</p>
          <p>{deck.description}</p>
        </figcaption>

        <div className={`control-buttons ${styles['control-buttons']}`}>
          <Link className="button outline" to={`/view/${deckId}/1`}>
            Play Deck&nbsp;&nbsp;
            <i className="fa fa-play-circle" />
          </Link>
          <Link className="button" to={`/view/${deckId}`}>
            Edit Deck
          </Link>
          {/*
          <a className="button btn-delete" onClick={() => this.props.handleRemoveDeck(deckId)}>
              Delete
          </a>
          */}
        </div>
        {this.props.children}
      </figure>
    )
  }
}

export default Deck
