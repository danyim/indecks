import React from 'react';
import styles from '../styles/components/CardCount';

class CardCount extends React.Component {
  render() {
    const { current, max } = this.props;
    return (
      <div className={styles.cardCount}>
        <span className={styles.current}>{current}</span>
        <span className={styles.separator}>/</span>
        <span className={styles.max}>{max}</span>
      </div>
    );
  }
}

CardCount.defaultProps = {
  current: 0,
  max: 0
};
CardCount.propTypes = {
  current: React.PropTypes.number,
  max: React.PropTypes.number
};

export default CardCount;
