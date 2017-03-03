import React from 'react';
import styles from '../styles/components/Overlay.styl';

const propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node
};

const defaultProps = {
  className: '',
  children: null
};

const Overlay = (props) => {
  return (
    <div className={`${styles.overlay} ${props.className}`}>
      <div className={`${styles['hover-actions-container']}`}>
        {props.children}
      </div>
    </div>
  )
};

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;

export default Overlay;
