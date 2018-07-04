import React from "react";
import PropTypes from "prop-types";
import CardPreview from "./CardPreview";
import styles from "../styles/components/CardAdd.styl";

class CardAdd extends React.Component {
  static propTypes = {
    deckId: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    // history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
    push: PropTypes.func.isRequired,
    placeholderGenerator: PropTypes.func
  };

  static defaultProps = {
    placeholderGenerator: () => ({
      title: "Card title here...",
      answer: "Card answer here (supports Markdown)..."
    })
  };

  constructor(props) {
    super(props);

    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // Default values for the edit fields
    this.state = {
      title: "",
      answer: ""
    };

    this.focusInput = null;
  }

  componentDidMount() {
    // This happens a little too fast. If you get to this view via keyboard
    // shortcut, the focus event fires before the keyup and writes the value
    // into the field. Adding a 100ms delay prevents this from happening.
    setTimeout(() => {
      this.focusInput.focus();
    }, 100);
  }

  handleSubmit(e, deckId) {
    e.preventDefault();
    if (!this.state.title || this.state.title.trim() === "") {
      return;
    }

    const card = {
      title: this.state.title,
      answer: this.state.answer || ""
    };
    this.props.handleSubmit(deckId, card);
  }

  checkIfDirty = () => this.state.title !== "" || this.state.answer !== "";

  handleCancel() {
    if (this.checkIfDirty()) {
      if (
        window.confirm(
          "Are you sure you want to cancel? You have unsaved changes that will be lost."
        )
      ) {
        this.props.push(`/view/${this.props.deckId}`);
      }
    } else {
      this.props.push(`/view/${this.props.deckId}`);
    }
    // We can't simply do the below because users get confused.
    // this.props.history.goBack()
  }

  handleChange(event, key) {
    const state = { ...this.state };
    state[key] = event.target.value;
    this.setState(state);
  }

  render() {
    const { deckId } = this.props;
    const { title, answer } = this.props.placeholderGenerator();

    return (
      <figure className={`grid-figure ${styles["grid-figure"]}`}>
        <form
          className="edit-form"
          onSubmit={e => this.handleSubmit(e, deckId)}
        >
          <label htmlFor="title">
            <span>Card Title</span>
            <input
              type="text"
              className="large-input"
              name="title"
              tabIndex={0}
              placeholder={title}
              ref={input => (this.focusInput = input)}
              onChange={e => this.handleChange(e, "title")}
            />
          </label>

          <label htmlFor="answer">
            <span>
              Card Answer&nbsp;&nbsp;(
              <a
                href="//guides.github.com/features/mastering-markdown/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Markdown
              </a>)
            </span>
            <textarea
              type="text"
              className="mono"
              name="answer"
              tabIndex={-1}
              placeholder={answer}
              rows="4"
              onChange={e => this.handleChange(e, "answer")}
            />
          </label>

          <CardPreview title={this.state.title} answer={this.state.answer} />

          <div className={`${styles["control-buttons"]}`}>
            <button type="submit" className="button outline">
              Save
            </button>
            <button
              type="button"
              className="button"
              onClick={this.handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </figure>
    );
  }
}

export default CardAdd;
