import React from 'react';

const ExportDeckButton = React.createClass({

  propTypes: {
    filename: React.PropTypes.string,
    label: React.PropTypes.string,
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    // exportFile: React.PropTypes.function,
  },

  getDefaultProps() {
    return {
      filename: 'file.txt',
      label: 'Save',
      style: { margin: '5px 5px 0px 0px', textDecoration: 'underline', color: 'blue', cursor: 'pointer' },
      exportFile: () => {}
    }
  },

  handleDownloadClick: function(event) {

    function magicDownload(text, fileName){
      var blob = new Blob([text], {
        type: 'text/csv;charset=utf8;'
      });

      // create hidden link
      var element = document.createElement('a');
      document.body.appendChild(element);
      element.setAttribute('href', window.URL.createObjectURL(blob));
      element.setAttribute('download', fileName);
      element.style.display = '';

      element.click();

      document.body.removeChild(element);
      event.stopPropagation();
    }

    var fileType = event.target.innerText,
    text = this.props.exportFile(fileType)

    if (text instanceof Promise) {
      text.then(
        result => magicDownload(result, this.props.filename)
      )
    } else {
      magicDownload(text, this.props.filename)
    }

  },

  render: function() {
    return (
      <button style={ this.props.style }
        className={ this.props.className }
        onClick={ this.handleDownloadClick }>
        {this.props.label}
      </button>
    );
  }
})


export default ExportDeckButton
