import React from 'react';
import classNames from 'classnames';
import styles from '../styles/components/FrontBack';

const propTypes = {
  handleFlip: React.PropTypes.func.isRequired,
  flipped: React.PropTypes.bool.isRequired
};

const defaultProps = {};

const FrontBack = (props) => {
  const { flipped } = props;
  const front = {};
  front[`${styles.front}`] = true;
  front[`${styles.active}`] = !flipped;
  const back = {};
  back[`${styles.back}`] = true;
  back[`${styles.active}`] = flipped;

  return (
    <div className={styles.frontBack}>
      <span
        className={classNames(front)}
        onClick={() => this.props.handleFlip(false)}
      >
        FRONT
      </span>
      <span className={styles.separator}>|</span>
      <span className={classNames(back)} onClick={() => this.props.handleFlip(true)}>BACK</span>
      {/*
      <span className={styles.separator}>|</span>
      <span className={classNames(back)} onClick={() => this.props.handleFlip()}>FLIP</span>
      */}
    </div>
  );
};

FrontBack.propTypes = propTypes;
FrontBack.defaultProps = defaultProps;

export default FrontBack;
