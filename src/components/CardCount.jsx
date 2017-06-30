import PropTypes from 'prop-types'
import React from 'react'
import styles from '../styles/components/CardCount.styl'

const propTypes = {
  current: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired
}

const defaultProps = {}

const CardCount = props => {
  const { current, max } = props
  return (
    <div className={styles.cardCount}>
      <span className={styles.current}>
        {current}
      </span>
      <span className={styles.separator} />
      <span className={styles.max}>
        {max}
      </span>
    </div>
  )
}

CardCount.propTypes = propTypes
CardCount.defaultProps = defaultProps

export default CardCount
