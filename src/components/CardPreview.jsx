import PropTypes from 'prop-types'
import React from 'react'
import { Motion, spring } from 'react-motion'
import Markdown from './Markdown'
import styles from '../styles/components/CardPreview.styl'

const propTypes = {
  title: PropTypes.string,
  answer: PropTypes.string,
}

const defaultProps = {
  title: '',
  answer: '',
}

class CardPreview extends React.Component {
  state = {
    display: false,
  }

  constructor(props) {
    super(props)

    this.togglePreview.bind(this, this.togglePreview)
  }

  togglePreview() {
    const currState = this.state
    currState.display = !currState.display
    this.setState(currState)
  }

  renderPreview(title, answer) {
    return (
      <Motion style={{ y: spring(this.state.display ? 400 : 0) }}>
        {({ y }) => (
          <div
            className={`${styles['preview-pane']}`}
            style={{
              height: y,
              display: y / 400 > 0.05 ? 'block' : 'none',
            }}
          >
            <label htmlFor="title" className="no-pad">
              <span>Title</span>
              <Markdown name="title" className={`${styles['card-title']}`} text={title} />
            </label>
            <hr />
            <label htmlFor="answer" className="no-pad">
              <span>Answer</span>
              <Markdown name="answer" className={`${styles['card-answer']}`} text={answer} />
            </label>
          </div>
        )}
      </Motion>
    )
  }

  render() {
    const { title, answer } = this.props

    return (
      <div className={styles.preview}>
        <button
          name="preview-toggle"
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
