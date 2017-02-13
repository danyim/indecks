import React from 'react';
import styles from '../styles/components/CardCount';

const propTypes = {
  current: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired
};

const defaultProps = {};

const CardCount = (props) => {
  const { current, max } = props;
  return (
    <div className={styles.cardCount}>
      <span className={styles.current}>{current}</span>
      <span className={styles.separator} />
      <span className={styles.max}>{max}</span>
    </div>
  );
};

CardCount.propTypes = propTypes;
CardCount.defaultProps = defaultProps;

export default CardCount;
