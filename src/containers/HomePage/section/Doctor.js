import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Doctor.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
// import slider
import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";
class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    // this.next = this.next.bind(this);
    // this.previous = this.previous.bind(this);
    this.state = {
      Doctor: [],
      imgPreview: [],
      showHide: false,
      showHide1: true,
      i: 0,
    };
  }
  increase = (i) => {
    let b = i + 1;
    return b;
  };

  reduce = (i) => {
    let b = i - 1;
    return b;
  };

  next = () => {
    let b = this.increase(this.state.i);

    let x = this.state.Doctor.length - 5;

    this.setState({
      i: b,
    });
    this.slider.slickNext();
    if (b > 0) {
      this.setState({
        showHide: true,
      });
    }
    if (b === this.state.Doctor.length - 4) {
      this.setState({
        showHide1: false,
      });
    }
  };
  previous = () => {
    let b = this.reduce(this.state.i);
    this.setState({
      i: b,
    });
    this.slider.slickPrev();

    if (b === 0) {
      this.setState({
        showHide: false,
      });
    }
    if (b > 0) {
      this.setState({
        showHide1: true,
      });
    }
  };
  async componentDidMount() {
    this.props.loadDoctor();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.Doctor !== this.state.Doctor) {
      this.setState({
        Doctor: this.props.Doctor,
      });
    }
  }
  changeLanguage = (language) => {
    this.props.changeLanguageDoctor(language);
  };
  render() {
    let Doctor = this.state.Doctor;
    let language = this.props.language;
    let preview = [];
    if (this.state.Doctor) {
      let imgbase64 = "";
      let userChoose = Doctor;
      for (let i = 0; i < userChoose.length; i++) {
        if (userChoose[i].image) {
          imgbase64 = new Buffer(userChoose[i].image, `base64`).toString(
            "binary"
          );
          preview[i] = imgbase64;
        }
      }
    }
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      // slickNext: false,

      // className: "notes-slider",
      // autoplay: true,
      // autoplaySpeed: 1000,
    };
    return (
      <>
        <div className="section-doctor">
          <div className="doctor-content">
            <button className="see-more">
              {" "}
              <FormattedMessage id="Doctor.see-more" />
            </button>
            <h2 className="title-doctor">
              {" "}
              <FormattedMessage id="Doctor.Best-choice" />{" "}
            </h2>
            {this.state.showHide1 === true && (
              <button
                onClick={() => this.next()}
                className="slick-arrow  slick-next"
              >
                Next
              </button>
            )}

            {this.state.showHide === true && (
              <button
                onClick={() => this.previous()}
                className="slick-arrow slick-prev"
              >
                Previous
              </button>
            )}

            <Slider ref={(c) => (this.slider = c)} {...settings}>
              {Doctor &&
                Doctor.length > 0 &&
                Doctor.map((item, index) => {
                  return (
                    <>
                      {" "}
                      <div className="doctor-child">
                        <div
                          className="doctor-img"
                          style={{
                            backgroundImage: `url(${preview[index]})`,
                          }}
                        ></div>

                        <p>
                          {language === LANGUAGES.VI
                            ? item.positionData.valueVi
                            : item.positionData.valueEn}{" "}
                          {item.lastName} {""}
                          {item.firstName} <br /> <span>doctor-content</span>
                        </p>
                      </div>
                    </>
                  );
                })}
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
    Doctor: state.admin.Doctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadDoctor: () => dispatch(actions.fetchLoadDoctor()),
    changeLanguageDoctor: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
