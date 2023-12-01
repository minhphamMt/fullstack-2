import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Home_Header.scss";

class HomeHeader extends Component {
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
  render() {
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars bars"></i>
              <div className="logo">BookingCare</div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <p>
                  chuyên khoa <br /> <span> tìm bác sĩ chuyên khoa</span>
                </p>
              </div>
              <div className="child-content">
                <p>
                  cơ sở y tế <br /> <span> chọn bệnh viện phòng khám </span>
                </p>
              </div>
              <div className="child-content">
                <p>
                  bác sĩ <br /> <span> chọn bác sĩ giỏi</span>
                </p>
              </div>
              <div className="child-content">
                <p>
                  gói khám <br /> <span> khám sức khỏe tổng quát</span>
                </p>
              </div>
            </div>
            <div className="right-content">
              <i className="far fa-question-circle">Hỗ Trợ</i>
              <p>Language</p>
            </div>
          </div>
        </div>
        <div className="home-header-banner">
          <div className="content-up">
            <div className="title-1">nền tảng y tế </div>
            <div className="title-2">chăm sóc sức khỏe toàn diện</div>
            <div className="search">
              <i className="fas fa-search icon"></i>
              <input
                type="text"
                placeholder=" Tìm Bệnh Viện"
                className="search-bar"
              />
            </div>
          </div>
          <div className="content-down">
            {" "}
            <div className="option">
              <div className="option-child">
                <div className="logo">
                  <i className="fas fa-hospital"></i>
                </div>
                <span>khám chuyên khoa</span>
              </div>
              <div className="option-child">
                <div className="logo">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <span>khám chuyên khoa</span>
              </div>
              <div className="option-child">
                <div className="logo">
                  <i className="fas fa-hospital"></i>
                </div>
                <span>khám chuyên khoa</span>
              </div>
              <div className="option-child">
                <div className="logo">
                  <i className="fas fa-vial"></i>
                </div>
                <span>khám chuyên khoa</span>
              </div>
              <div className="option-child">
                <div className="logo">
                  <i className="fas fa-user-circle"></i>
                </div>
                <span>khám chuyên khoa</span>
              </div>
              <div className="option-child">
                <div className="logo">
                  <i className="fas fa-chalkboard-teacher"></i>
                </div>
                <span>khám chuyên khoa</span>
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
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
