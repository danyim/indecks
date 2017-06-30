import PropTypes from 'prop-types'
import React from 'react'
import { Motion, spring } from 'react-motion'
import Markdown from './Markdown'
import styles from '../styles/components/CardPreview.styl'

const propTypes = {
  title: PropTypes.string,
  answer: PropTypes.string
}

const defaultProps = {
  title: '',
  answer: ''
}

class CardPreview extends React.Component {
  constructor(props) {
    super(props)

    this.togglePreview.bind(this, this.togglePreview)

    this.state = {
      display: false
    }
  }

  togglePreview() {
    const currState = this.state
    currState.display = !currState.display
    this.setState(currState)
  }

  renderPreview(title, answer) {
    return (
      <Motion style={{ y: spring(this.state.display ? 400 : 0) }}>
        {({ y }) =>
          <div
            className={`${styles['preview-pane']}`}
            style={{
              height: y,
              display: y / 400 > 0.05 ? 'block' : 'none'
            }}
          >
            <Markdown className={`${styles['card-title']}`} text={title} />
            <hr />
            <Markdown className={`${styles['card-answer']}`} text={answer} />
          </div>}
      </Motion>
    )
  }

  render() {
    const { title, answer } = this.props

    return (
      <div className={styles.preview}>
        <button
          type="button"
          className="btn pointer m-t"
          onClick={() => this.togglePreview()}
        >
          Preview [{this.state.display ? '-' : '+'}]
        </button>
        {this.renderPreview(title, answer)}
      </div>
    )
  }
}

CardPreview.propTypes = propTypes
CardPreview.defaultProps = defaultProps

export default CardPreview
