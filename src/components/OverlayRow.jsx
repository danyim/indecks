import React from 'react';
import styles from '../styles/components/Overlay';

const propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node
};

const defaultProps = {
  className: '',
  children: null
};

const OverlayRow = (props) => {
  // Prepends the hover class to the original class on the child
  const modifiedChildren = React.Children.map(props.children, (c) => {
    return React.cloneElement(c, {
      className: `${styles['hover-button']}${c.props.className ? ' ' + c.props.className : ''}`
    });
  });

  return (
    <div className={`${props.className} ${styles['hover-actions']}`}>
      {modifiedChildren}
    </div>
  )
};

OverlayRow.propTypes = propTypes;
OverlayRow.defaultProps = defaultProps;

export default OverlayRow;
