import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import HeaderDetail from "./HeaderDetail";
import "./DetailDoctor.scss";
import { getDetailInfoDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: {},
      image: "",
      position: {},
      description: "",
      contentDoctor: "",
    };
  }
  async componentDidMount() {
    let res = await getDetailInfoDoctor(this.props.match.params.id);
    this.setState({
      doctor: res.data,
      position: res.data.positionData,
      description: res.data.MarkDown.description,
      contentDoctor: res.data.MarkDown.contentHTML,
    });

    console.log(">>>check doctor:", this.state.doctor);
  }
  componentDidUpdate(preProps, prevState, snapshot) {}
  handleBackHome = () => {
    this.props.history.push("/home");
  };
  render() {
    let { doctor, position, description, contentDoctor } = this.state;
    console.log(">>>check desc:", description);
    if (position.valueEn === "None") {
      position.valueEn = "Doctor";
    }
    let nameVi = `${position.valueVi} ${doctor.lastName} ${doctor.firstName}`;
    let nameEn = `${position.valueEn} ${doctor.firstName} ${doctor.lastName}`;

    let imgbase64 = "";
    if (doctor.image) {
      imgbase64 = new Buffer(doctor.image, `base64`).toString("binary");
    }
    return (
      <>
        <HeaderDetail />
        <div className="doctor-container">
          <div className="header-detail">
            <i
              className="fas fa-home home-icon"
              onClick={() => this.handleBackHome()}
            ></i>
            <div className="doctor-intro">
              <div
                className="doctor-img"
                style={{
                  backgroundImage: `url(${imgbase64})`,
                }}
              ></div>
              <div className="doctor-first-info">
                <h3 className="name-doctor">
                  {this.props.language === LANGUAGES.VI ? nameVi : nameEn}
                </h3>
                <p className="doctor-desc">{description}</p>
              </div>
            </div>
          </div>
          <div className="footer-detail">
            <div className="content-doctor">
              <div className="container">
                <div
                  className="row"
                  dangerouslySetInnerHTML={{ __html: contentDoctor }}
                ></div>
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
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailDoctor)
);
