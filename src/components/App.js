import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as configActions from '../action-creators/config';
import * as deckActions from '../action-creators/deck';
import Navbar from './Navbar'

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <main className="main-container">
          {/* React.cloneElement(this.props.children, this.props) */}
          {this.props.children}
        </main>
        <footer>
          <p>dyim_2016</p>
        </footer>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    config: state.config,
    decks: state.decks
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, configActions, deckActions), dispatch);
}

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);
export default App;
