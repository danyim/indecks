import React from 'react'
import PropTypes from 'prop-types'
import StylePropType from 'react-style-proptype'
import styled from 'styled-components'

class BinarySelector extends React.Component {
  static propTypes = {
    leftLabel: PropTypes.string,
    rightLabel: PropTypes.string,
    selection: PropTypes.oneOf([1, 2, null]).isRequired,
    containerStyle: StylePropType,
    buttonStyle: StylePropType,
    handleClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    leftLabel: 'Option 1',
    rightLabel: 'Option 2',
    containerStyle: {},
    buttonStyle: {},
    selection: null,
  }

  static container = styled.div`
    margin: 0.5rem;
    display: flex;
    flex-flow: row nowrap;
    overflow: none;
  `

  static button = styled.button`
    flex: 1 1 50%;
    margin: 0;
    transition: .2s all;
    padding: .2rem 1rem;
    border-radius: ${props => (props.left ? '.5rem 0 0 .5rem' : '0 .5rem .5rem 0')};
    border-right-width: ${props => (props.left ? '0' : '2px')};
    border-left-width: ${props => (props.left ? '2px' : '0')};
    border-color: #125688;
    // border-color: ${props => (props.selected ? '#125688' : '#edeeed')};
    background-color: ${props => (props.selected ? '#125688' : 'none')};
    color: ${props => (props.selected ? 'white' : '#edeeed')};
    &:hover {
      color: ${props => (props.selected ? 'white' : '#125688')};
      // border-right-width: 2px;
      // border-left-width: 2px;
    }
  `

  render() {
    return (
      <BinarySelector.container style={this.props.containerStyle}>
        <BinarySelector.button
          selected={this.props.selection === 1}
          left
          onClick={() => this.props.handleClick(1)}
          style={this.props.buttonStyle}
        >
          {this.props.leftLabel}
        </BinarySelector.button>
        <BinarySelector.button
          selected={this.props.selection === 2}
          right
          onClick={() => this.props.handleClick(2)}
          style={this.props.buttonStyle}
        >
          {this.props.rightLabel}
        </BinarySelector.button>
      </BinarySelector.container>
    )
  }
}

export default BinarySelector
