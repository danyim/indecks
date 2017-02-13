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
  front[styles.front] = true;
  front[styles.active] = !flipped;
  const back = {};
  back[styles.back] = true;
  back[styles.active] = flipped;

  return (
    <div className={styles.frontBack}>
      <a
        tabIndex="0"
        className={classNames(front)}
        onClick={() => props.handleFlip(false)}
      >
        FRONT
      </a>
      <span className={styles.separator}>|</span>
      <a
        tabIndex="-1"
        className={classNames(back)}
        onClick={() => props.handleFlip(true)}
      >
        BACK
      </a>
    </div>
  );
};

FrontBack.propTypes = propTypes;
FrontBack.defaultProps = defaultProps;

export default FrontBack;
