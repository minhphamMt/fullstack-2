import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { handleLogin } from "../../services/userService";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import * as actions from "../../store/actions";
// import { userLoginSuccess } from "../../store/actions";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      boolean: true,
      errMessage: "",
    };
  }
  handleOnChange = (event) => {
    let username = this.state.username;
    username = event.target.value;
    this.setState({
      username: username,
    });
  };
  handleOnChangePassword = (event) => {
    let password = this.state.password;
    password = event.target.value;
    this.setState({
      password: password,
    });
  };
  handleLogin = async () => {
    let username = this.state.username;
    let password = this.state.password;
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLogin(username, password);
      if (data && data.errcode !== 0) {
        this.setState({
          errMessage: data.messenger,
        });
      }
      if (data && data.errcode === 0) {
        this.props.userLoginSuccess(data.user);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.data) {
          this.setState({
            errMessage: err.response.data.messenger,
          });
        }
      }
      console.log("check response:", err.response);
    }
  };
  showHide = () => {
    let boolean = !this.state.boolean;
    console.log(">>>chekc boolen:", boolean);
    this.setState({
      boolean: boolean,
    });
  };
  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleLogin();
    }
  };
  render() {
    return (
      <>
        <div className="login-background">
          <div className="login-container">
            <div className="login-content row">
              <div className="col-12 text-login">LOGIN</div>
              <div className="col-12 form-group login-input">
                <label className="form-label" for="email">
                  Username:
                </label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="Enter your Username"
                  value={this.state.username}
                  onChange={(event) => {
                    this.handleOnChange(event);
                  }}
                />
              </div>
              <div className="col-12 form-group login-input">
                <label className="form-label">Password:</label>
                <div className="hidden-exist-password">
                  <input
                    className="form-control"
                    type={this.state.boolean === true ? "password" : "text"}
                    placeholder="Enter your password"
                    value={this.state.password}
                    onChange={(event) => {
                      this.handleOnChangePassword(event);
                    }}
                    onKeyDown={(event) => this.handleKeyDown(event)}
                  />
                  {this.state.boolean === true ? (
                    // <i
                    //   onClick={() => this.showHide()}
                    //   classsName="far fa-eye"
                    // ></i>
                    <i class="far fa-eye" onClick={() => this.showHide()}></i>
                  ) : (
                    // <i
                    //   onClick={() => this.showHide()}
                    //   classsName="fas fa-eye-slash"
                    // ></i>
                    <i
                      class="fas fa-eye-slash"
                      onClick={() => this.showHide()}
                    ></i>
                  )}
                </div>
              </div>
              <div className="col-12 mt-2" style={{ color: "red" }}>
                {this.state.errMessage}
              </div>
              <div className="col-12 button-login">
                <button
                  type="button"
                  className="btn btn-primary col-12 button"
                  onClick={() => this.handleLogin()}
                >
                  log In
                </button>
              </div>
              <div className="col-12 forgot">
                <span className="forgot-password">Forgot password?</span>
              </div>
              <div className="col-12 text-center mt-3">
                <span className="mt-3">Or login with</span>
              </div>
              <div className="col-12 social-login mt-4">
                <i className="fab fa-google-plus-g google"></i>
                <i className="fab fa-facebook-f facebook"></i>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginSuccess: (adminInfo) =>
    //   dispatch(actions.adminLoginSuccess(adminInfo)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
