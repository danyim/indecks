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

export default CardCount;
