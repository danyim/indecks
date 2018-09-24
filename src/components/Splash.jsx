import React from 'react'
import PropTypes from 'prop-types'
// import ModalHelpButton from './ModalHelpButton'
import AuthContainer from '../containers/AuthContainer'
import styles from '../styles/components/Splash.styl'

const propTypes = {
  loadSampleDecks: PropTypes.func.isRequired,
}
const defaultProps = {}

const Splash = props => (
  <div className={styles.container}>
    <article className={`splash ${styles.splash}`}>
      <h2 className={styles.header}>Dive into Indecks</h2>
      <div className={`${styles['shortcut-helper-content']}`}>
        <p>
          indecks is an interactive study aid modeled after index cards for studying materials that
          require repetition and memorization. Just like the physical object, indecks features
          collections of decks (or topics), which contain a stack of flippable cards.
        </p>
        <br />
        <p>
          <strong>
            To get started, click on the
            {'  '}
            <i className="fa fa-plus-square-o" />
            {'  '}
            on the top left to start creating a new deck.
          </strong>
          <br />
          Too much work?{' '}
          <a className="pointer" onClick={props.loadSampleDecks} role="presentation">
            Click here to play with sample decks
          </a>
          .
        </p>
        <br />
        <p>
          <strong>Power users:</strong> Press <kbd>/</kbd> to open the keyboard shortcuts panel.
        </p>
        <br />
        <p>
          <strong>Signing up is quick and pain-free (no email verification required).</strong>
          <br />
          Once you create your account, you will log in once and all your data will be{' '}
          <strong>
            synchronized and available on any signed-in device <em>in real-time</em>
          </strong>
          .
        </p>
        <div className={styles.auth}>
          <AuthContainer />
        </div>
      </div>
    </article>
  </div>
)

Splash.propTypes = propTypes
Splash.defaultProps = defaultProps

export default Splash
