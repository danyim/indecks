import React from 'react';
import Markdown from './Markdown';
import styles from '../styles/components/CardPreview';

const propTypes = {
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

    this.togglePreview.bind(this, this.togglePreview);

    this.state = {
      display: false
    };
  }

  togglePreview() {
    const currState = this.state;
    currState.display = !currState.display;
    this.setState(currState);
  }

  renderPreview(title, answer) {
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

  render() {
    const { title, answer } = this.props;

    return (
      <div className={styles.preview}>
        <button
          type="button" className="btn pointer m-t"
          onClick={() => this.togglePreview()}
        >
          Preview [{this.state.display ? '-' : '+'}]
        </button>
        { this.state.display ? this.renderPreview(title, answer) : '' }
      </div>
    );
  }
}

CardPreview.propTypes = propTypes;
CardPreview.defaultProps = defaultProps;

export default CardPreview;
