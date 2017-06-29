import PropTypes from 'prop-types'
import React from 'react'
import { Link, browserHistory } from 'react-router'
import styles from '../styles/components/Deck.styl'

const propTypes = {
  deck: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired
    }).isRequired).isRequired
  }).isRequired,
  style: PropTypes.object,
  children: PropTypes.node
}

const defaultProps = {
  style: {},
  children: null
}

class Deck extends React.Component {
  navigateToDeck (deckId) {
    browserHistory.push(`/view/${deckId}`)
  }

  render () {
    const { deck, style } = this.props
    const { id: deckId } = deck

    return (
      <figure className={`grid-figure ${styles['grid-figure']}`} style={style}>
        <div>
          <h1
            className={`${styles['deck-title']}`}
          >
            <a onClick={() => this.navigateToDeck(deckId)}>
              {deck.title}
            </a>
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
          <Link className='button' to={`/view/${deckId}/1`}>
            Play Deck
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

Deck.propTypes = propTypes
Deck.defaultProps = defaultProps

export default Deck
