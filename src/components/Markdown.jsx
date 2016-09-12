import React from 'react';
import Remarkable from 'remarkable';

const propTypes = {
  className: React.PropTypes.string,
  removeParaTags: React.PropTypes.bool,
  text: React.PropTypes.string,
  handleOnClick: React.PropTypes.func
};

const defaultProps = {
  className: '',
  text: '',
  removeParaTags: false,
  handleOnClick: null,
};

class Markdown extends React.Component {
  convertToMarkdown(plaintext = '', removeParaTags = false) {
    const md = new Remarkable();
    let rawMarkup = md.render(plaintext);
    if (removeParaTags === true) {
      rawMarkup = rawMarkup.replace('<p>', '');
      rawMarkup = rawMarkup.replace('</p>', '');
    }
    return { __html: rawMarkup };
  }

  render() {
    return (
      <span
        className={this.props.className}
        onClick={this.props.handleOnClick}
        dangerouslySetInnerHTML={
          this.convertToMarkdown(this.props.text, this.props.removeParaTags)
        }
      />
    );
  }
}

Markdown.propTypes = propTypes;
Markdown.defaultProps = defaultProps;

export default Markdown;
