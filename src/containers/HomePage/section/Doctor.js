import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Doctor.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";
class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Doctor: [],
      imgPreview: [],
    };
  }
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

  render() {
    let Doctor = this.state.Doctor;
    console.log(">>>Check state:", this.state.Doctor);
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
      slidesToScroll: 2,
    };

    return (
      <>
        <div className="section-doctor">
          <div className="doctor-content">
            <button className="see-more">see more</button>
            <h2 className="title-doctor">Bác sĩ nổi bật tuần qua </h2>
            <Slider {...settings}>
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
                          {item.positionData.valueVi} {item.lastName} {""}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
