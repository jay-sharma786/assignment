import React, { Component } from "react";

import { Provider } from "react-redux";
import { Router } from "react-router-dom";

import store, { history } from "./store";

import Home from "./screens/Home";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          {/* <Route exact path="/" component={Home} /> */}
          <Home />
        </Router>
      </Provider>
    );
  }
}
