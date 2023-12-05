import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeFooter.scss";
class HomeFooter extends Component {
  render() {
    let year = new Date();
    return (
      <>
        {/* <div className="home-footer"></div> */}
        <p className="info">
          &copy; {year.getFullYear()} học fullstack với minh .
          <a
            target="_blank"
            href="https://www.facebook.com/profile.php?id=100012507877390&locale=vi_VN"
          >
            more information,please visit my facebook.click here
          </a>
        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
