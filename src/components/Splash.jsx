import React from 'react'
import styles from '../styles/components/Splash.styl'

const propTypes = {}
const defaultProps = {}

const Splash = () => (
  <section className={`${styles['splash']}`}>
    <h2 className={`${styles.header}`}>Welcome to Indecks</h2>
    <div className={`${styles['shortcut-helper-content']}`}>
      Hey there! Welcome to the Indecks app. Indecks is an interactive flipcard
      study aid, just like how you've used index cards in the past.
    </div>
  </section>
)

Splash.propTypes = propTypes
Splash.defaultProps = defaultProps

export default Splash
