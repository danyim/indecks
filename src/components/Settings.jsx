import React from 'react';
import Rebase from 're-base';
import ExportDeckButton from './ExportDeckButton';
import firebase from '../../firebase';
import styles from '../styles/components/Settings.styl';

const base = Rebase.createClass(firebase);

const propTypes = {
  decks: React.PropTypes.array.isRequired,
  deckCount: React.PropTypes.number.isRequired,
  removeAllDecks: React.PropTypes.func.isRequired
};

const defaultProps = {};

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.removeAllDecks = this.removeAllDecks.bind(this);
    this.renderAuthButton = this.renderAuthButton.bind(this);
    this.renderAuthButtons = this.renderAuthButtons.bind(this);
    this.authHandler = this.authHandler.bind(this);

    this.state = {
      auth: false,
      name: null,
      email: null,
      photoURL: null,
      provider: null,
      username: null
    };
  }

  removeAllDecks(count) {
    if (confirm(`Are you sure you want to delete all ${count} decks? ` +
      'This action is permanent.')) {
      this.props.removeAllDecks();
    }
  }

  authHandler(error, data) {
    if(error) {
      // console.error(error);
      return;
    }
    this.setState({
      ...this.state,
      auth: true,
      name: data.user.displayName,
      email: data.user.email,
      photoURL: data.user.photoURL,
      provider: data.credential.provider,
      username: data.user.uid
    });
    // console.log(data);
  }

  renderAuthButtons() {
    if(!this.state.auth) {
      return (
        <div>
          { this.renderAuthButton('github') }
          { this.renderAuthButton('twitter') }
          { this.renderAuthButton('facebook') }
          { this.renderAuthButton('google') }
        </div>
      );
    }

    return (
      <div>
        <img src={this.state.photoURL} alt={`${this.state.name}`} style={{ height: 50, width: 50 }} />
        <p>Signed in as <strong>{this.state.email}</strong> using {this.state.provider}</p>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }

  renderAuthButton(provider) {
    if(!['facebook', 'twitter', 'github', 'google'].includes(provider)) {
      throw new Error('Invalid auth provider supplied');
    }
    return (
      <button
        className="button"
        onClick={() => base.authWithOAuthPopup(provider, this.authHandler)}
      >
        Sign in with <i className={`fa fa-${provider}`} />
      </button>
    );
  }

  render() {
    const { deckCount } = this.props;

    const renderDeleteAll = deckCount === 0 ?
      (
        <button
          className="btn-delete"
          disabled="disabled"
        >
          Delete all decks from local storage
        </button>
      )
      :
      (
        <button
          className="btn-delete"
          onClick={() => this.removeAllDecks(deckCount)}
        >
          Delete all {deckCount} deck(s) from local storage
        </button>
      );

    return (
      <section className={`${styles.settings}`}>
        <h2 className={`${styles.header}`}>Settings</h2>
        <div className={`${styles['settings-content']}`}>
          <button
            className="button"
            onClick={() => base.authWithOAuthToken('github', 'xxx', this.authHandler)}
          >
            Sign in with a hardcoded <i className="fa fa-github" /> token
          </button>
          { this.renderAuthButtons() }

          <p>
            The decks you create are automatically saved to your browser&apos;s
            local storage.
          </p>
          <ExportDeckButton
            filename="indecks.json"
            label="Download all decks as JSON"
            className="button"
            disabled={deckCount === 0}
            style={{}}
            exportFile={() => JSON.stringify(this.props.decks, null, 2)}
          />
          {renderDeleteAll}
        </div>
      </section>
    );
  }
}

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;

export default Settings;
