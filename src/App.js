import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';
import { simpleAction } from './actions/simpleAction';
import Home from './pages/home';
import Detail from './pages/detail';
import Loading from './components/loading';
import './fonts/ionicons.min.css';
import './fonts.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

const api = {
  getCats() {
      return fetch('https://cat-fact.herokuapp.com/facts')
      .then(response => response.json())
      .then(data => {
          console.log(data);
          return data;
      });
  },
  getAvatar(first, last) {
      return fetch(`https://eu.ui-avatars.com/api/?name=${first}+${last}`)
      .then(response => response.json())
      .then(data => data);
  }
};

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  simpleAction: (data) => dispatch(simpleAction(data))
})

class App extends Component {

  componentDidMount() {
    api.getCats().then(d => {
      console.log(d);
      this.props.simpleAction(d.all);
    });
  }

  simpleAction = (event) => {
    this.props.simpleAction();
    api.getCats().then(d => {
      console.log(d);
      this.props.simpleAction(d.all);
    });
  }

  render() {
    return (
      <>
      {
        this.props.simpleReducer.result ? (
          <Router>
            <Switch>
              <Route exact key="1"path="/">
                <Home data={this.props} /> 
              </Route>
              <Route key="2" path="/fact-detail/:slug">
                <Detail data={this.props}  />
              </Route>
            </Switch>
          </Router>
        ) : <Loading key="3" />
      }
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);