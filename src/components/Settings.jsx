import React from 'react';
import Card from './Card';
import DeckNavigator from './DeckNavigator';
import { Link, browserHistory } from 'react-router';
import ExportDeckButton from './ExportDeckButton'
import slug from 'slug';
import styles from '../styles/components/Settings';

const propTypes = {};

const defaultProps = {};

class Settings extends React.Component {

  render() {
    return (
      <section className={`${styles['deck-view']}`}>
        Settings page
      </section>
    )
  }
}

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;

export default Settings;
