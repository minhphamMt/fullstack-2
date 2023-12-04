import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Medicalfacility.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class MedicalFacility extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };

    return (
      <>
        <div className="section-medical">
          <div className="medical-content">
            <button className="see-more">see more</button>
            <h2 className="title-medical">cơ sở y tế nổi bật</h2>
            <Slider {...settings}>
              <div className="medical-child">
                <div className="medical-img"></div>
                <span>medical-content</span>
              </div>
              <div className="medical-child">
                <div className="medical-img"></div>
                <span>medical-content</span>
              </div>
              <div className="medical-child">
                <div className="medical-img"></div>
                <span>medical-content</span>
              </div>
              <div className="medical-child">
                <div className="medical-img"></div>
                <span>medical-content</span>
              </div>
              <div className="medical-child">
                <div className="medical-img"></div>
                <span>medical-content</span>
              </div>
              <div className="medical-child">
                <div className="medical-img"></div>
                <span>medical-content</span>
              </div>
              <div className="medical-child">
                <div className="medical-img"></div>
                <span>medical-content</span>
              </div>
              <div className="medical-child">
                <div className="medical-img"></div>
                <span>medical-content</span>
              </div>
            </Slider>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
