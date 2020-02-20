import React, { Component } from "react";
import { connect } from "react-redux";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getUsers } from "./action";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      list: []
    };
    this.handleBtnOnClick = this.handleBtnOnClick.bind(this);
  }

  componentDidMount() {
    const auth = localStorage.getItem("auth");
    if (auth) {
      this.props.history.push("/search");
    } else {
      this.props.getUsers();
    }
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps && nextProps.users) var userList = nextProps.users;
    if (userList) {
      return {
        list: userList
      };
    }
  }

  handleBtnOnClick() {
    if (this.state.list.results) {
      const exists = this.state.list.results.some(
        v =>
          v.name === this.state.username && v.birth_year === this.state.password
      );
      if (exists) {
        localStorage.setItem("auth", true);
        this.props.history.push("/search");
      } else {
        ToastsStore.error(
          "The username or password you have entered is invalid"
        );
      }
    } else {
      ToastsStore.error("Data is not there");
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="bg">
        <div className="container ">
          <div
            id="login-row"
            className="row justify-content-center align-items-center"
          >
            <ToastsContainer
              store={ToastsStore}
              position={ToastsContainerPosition.TOP_CENTER}
              lightBackground
            />
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <h3 className="text-center text-info">Login</h3>
                <div className="form-group">
                  <label for="username" className="text-info">
                    Username:
                  </label>
                  <br />
                  <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    className="form-control"
                    onChange={e => this.onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label for="password" className="text-info">
                    Password:
                  </label>
                  <br />
                  <input
                    type="text"
                    name="password"
                    value={this.state.password}
                    className="form-control"
                    onChange={e => this.onChange(e)}
                  />
                </div>
                <div className="form-group text-center">
                  <br />
                  <input
                    onClick={() => this.handleBtnOnClick()}
                    className="btn btn-info btn-md"
                    value="submit"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.usersReducer.users
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
