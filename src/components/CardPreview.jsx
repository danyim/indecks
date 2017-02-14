import React from 'react';
import Markdown from './Markdown';
import styles from '../styles/components/CardPreview';

const propTypes = {
  show: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string,
  answer: React.PropTypes.string
};

const defaultProps = {
  title: '',
  answer: ''
};

class CardPreview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { show, title, answer } = this.props;
    if(!show) {
      return null;
    }
    return (
      <div className={`${styles['preview-pane']}`}>
        <Markdown
          className={`${styles['card-title']}`}
          text={title}
        />
        <hr />
        <Markdown
          className={`${styles['card-answer']}`}
          text={answer}
        />
      </div>
    );
  }
}

CardPreview.propTypes = propTypes;
CardPreview.defaultProps = defaultProps;

export default CardPreview;
