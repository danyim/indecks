import React from 'react';
import classNames from 'classnames';
import styles from '../styles/components/FrontBack';

class FrontBack extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { flipped } = this.props;
    const front = {};
    front[`${styles['front']}`] = true;
    front[`${styles['active']}`] = !flipped;
    const back = {};
    back[`${styles['back']}`] = true;
    back[`${styles['active']}`] = flipped;

    return (
      <div className={styles.frontBack}>
        <span className={classNames(front)} onClick={() => this.props.handleFlip(false)}>FRONT</span>
        <span className={styles.separator}>|</span>
        <span className={classNames(back)} onClick={() => this.props.handleFlip()}>BACK</span>
      </div>
    );
  }
}

export default FrontBack;
