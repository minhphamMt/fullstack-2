import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomeHeader from "./Home_header";
import Specialty from "./section/Specialty";
import MedicalFacility from "./section/MedicalFacility";
import Doctor from "./section/Doctor";
import Handbook from "./section/Handbook";
import About from "./section/About";
import HomeFooter from "./HomeFooter";
class HomePage extends Component {
  render() {
    return (
      <>
        <HomeHeader />
        <Specialty />
        <MedicalFacility />
        <Doctor />
        <Handbook />
        <About />
        <HomeFooter />
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
