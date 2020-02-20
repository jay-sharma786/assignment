import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../Login/index";
import Search from "../Search/index";
import { getUsersSaga } from "../../actions";

class Home extends Component {
  constructor() {
    super();
    this.handleBtnOnClick = this.handleBtnOnClick.bind(this);
  }

  handleBtnOnClick() {
    // this.props.getUsersSaga();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/search" component={Search} />
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  users: state.usersReducer.users
});

const mapDispatchToProps = dispatch => ({
  getUsersSaga: () => dispatch(getUsersSaga())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
