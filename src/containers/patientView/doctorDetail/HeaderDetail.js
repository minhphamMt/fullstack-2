import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "../../HomePage/Home_Header.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions/appActions";
class HeaderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boolean: true,
    };
  }
  handleShowhide = () => {
    this.setState({
      boolean: !this.state.boolean,
    });
  };
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    let language = this.props.language;

    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars bars"></i>
              <div className="logo"></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <p>
                  <FormattedMessage id="home-header.speciality" /> <br />{" "}
                  <span>
                    <FormattedMessage id="home-header.search-doctor" />
                  </span>
                </p>
              </div>
              <div className="child-content">
                <p>
                  <FormattedMessage id="home-header.health-facility" />
                  <br />{" "}
                  <span>
                    {" "}
                    <FormattedMessage id="home-header.select-room" />{" "}
                  </span>
                </p>
              </div>
              <div className="child-content">
                <p>
                  <FormattedMessage id="home-header.doctor" />
                  <br />{" "}
                  <span>
                    {" "}
                    <FormattedMessage id="home-header.select-doctor" />
                  </span>
                </p>
              </div>
              <div className="child-content">
                <p>
                  <FormattedMessage id="home-header.package" /> <br />{" "}
                  <span>
                    <FormattedMessage id="home-header.health-check" />{" "}
                  </span>
                </p>
              </div>
            </div>
            <div className="right-content">
              <i className="far fa-question-circle">
                {" "}
                <FormattedMessage id="home-header.support" />
              </i>
              <p
                className={
                  language === LANGUAGES.VI
                    ? "vietnamese action "
                    : "vietnamese"
                }
                onClick={() => this.changeLanguage(LANGUAGES.VI)}
              >
                VN
              </p>
              <p
                className={
                  language === LANGUAGES.EN ? "english action " : "english"
                }
                onClick={() => this.changeLanguage(LANGUAGES.EN)}
              >
                EN
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderDetail);
