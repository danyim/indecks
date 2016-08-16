import React from 'react';
import Remarkable from 'remarkable';

class Markdown extends React.Component {
  convertToMarkdown(plaintext = '', removeParaTags = false) {
    const md = new Remarkable();
    let rawMarkup = md.render(plaintext);
    if(removeParaTags === true) {
      rawMarkup = rawMarkup.replace('<p>', '');
      rawMarkup = rawMarkup.replace('</p>', '');
    }
    return { __html: rawMarkup };
  }

  render() {
    return (
      <span className={this.props.className} onClick={this.props.handleOnClick}
        dangerouslySetInnerHTML={this.convertToMarkdown(this.props.text, this.props.removeParaTags)} />
    );
  }
}

Markdown.defaultProps = {
  className: '',
  removeParaTags: false,
  handleOnClick: null,
};
Markdown.propTypes = {
  className: React.PropTypes.string,
  removeParaTags: React.PropTypes.bool,
  text: React.PropTypes.string.isRequired,
  handleOnClick: React.PropTypes.func
};

export default Markdown;
