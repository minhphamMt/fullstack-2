import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

class ManageSchedule extends Component {
  render() {
    return (
      <>
        <div>hello with doctorr</div>
        <div>hello with doctorr</div>
        <div>hello with doctorr</div>
        <div>hello with doctorr</div>
        <div>hello with doctorr</div>
        <div>hello with doctorr</div>
        <div>hello with doctorr</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
