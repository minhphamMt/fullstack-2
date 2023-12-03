import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class Specialty extends Component {
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
        <div className="section-specialty">
          <div className="speialty-content">
            <button className="see-more">
              <FormattedMessage id="specialty.see-more" />
            </button>
            <h2 className="title-specialty">
              {" "}
              <FormattedMessage id="specialty.title" />
            </h2>
            <Slider {...settings}>
              <div className="specialty-child">
                <div className="img one"></div>
                <span>
                  {" "}
                  <FormattedMessage id="specialty.bone" />
                </span>
              </div>
              <div className="specialty-child">
                <div className="img two"></div>
                <span>
                  {" "}
                  <FormattedMessage id="specialty.heart" />
                </span>
              </div>
              <div className="specialty-child">
                <div className="img three"></div>
                <span>
                  {" "}
                  <FormattedMessage id="specialty.polyclinic" />{" "}
                </span>
              </div>
              <div className="specialty-child">
                <div className="img four"></div>
                <span>
                  <FormattedMessage id="specialty.child" />
                </span>
              </div>
              <div className="specialty-child">
                <div className="img five"></div>
                <span>
                  <FormattedMessage id="specialty.Supersonic" />{" "}
                </span>
              </div>
              <div className="specialty-child">
                <div className="img six"></div>
                <span>
                  <FormattedMessage id="specialty.Spine" />{" "}
                </span>
              </div>
              <div className="specialty-child">
                <div className="img seven"></div>
                <span>
                  <FormattedMessage id="specialty.Nerve" />{" "}
                </span>
              </div>
              <div className="specialty-child">
                <div className="img eight"></div>
                <span>
                  {" "}
                  <FormattedMessage id="specialty.Hepatitis" />
                </span>
              </div>
              <div className="specialty-child">
                <div className="img nine"></div>
                <span>
                  {" "}
                  <FormattedMessage id="specialty.Obstetrics" />
                </span>
              </div>
              <div className="specialty-child">
                <div className="img ten"></div>
                <span>
                  {" "}
                  <FormattedMessage id="specialty.Dermatology" />
                </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
