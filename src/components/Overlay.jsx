import PropTypes from 'prop-types'
import React from 'react'
import styles from '../styles/components/Overlay.styl'

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

const defaultProps = {
  className: '',
  children: null,
}

const Overlay = props => (
  <div className={`${styles.overlay} ${props.className}`}>
    <div className={`${styles['hover-actions-container']}`}>
      {props.children}
    </div>
  </div>
)

Overlay.propTypes = propTypes
Overlay.defaultProps = defaultProps

export default Overlay
