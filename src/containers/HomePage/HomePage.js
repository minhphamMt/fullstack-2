import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomeHeader from "./Home_header";
import Specialty from "./section/Specialty";
class HomePage extends Component {
  render() {
    return (
      <>
        <HomeHeader />
        <Specialty />
        <div style={{ height: "300px" }}></div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
