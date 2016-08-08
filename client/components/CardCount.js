import React from 'react';
import styles from '../styles/components/CardCount';

const CardCount = React.createClass({
  render() {
    const { current, max } = this.props;
    console.log(styles);
    return (
      <div>
        <span className={styles.current}>{current}</span>
        <span className={styles.separator}>of</span>
        <span className={styles.max}>{max}</span>
      </div>
    );
  }
});

export default CardCount;
