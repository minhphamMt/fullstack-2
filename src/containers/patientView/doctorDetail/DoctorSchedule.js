import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions/appActions";
import Select from "react-select";
import moment from "moment";
import localization from "moment/locale/vi";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Date: [],
    };
  }
  componentDidMount() {
    let language = this.props.language;
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      if (language === LANGUAGES.VI) {
        obj.label = moment(new Date()).add(i, "days").format("dddd -DD/MM");
      } else {
        obj.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("dddd -DD/MM");
      }

      obj.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDate.push(obj);
    }
    this.setState({
      Date: arrDate,
    });
  }
  componentDidUpdate(preProps, preState) {
    if (preProps.language !== this.props.language) {
      let arrDate = [];
      for (let i = 0; i < 7; i++) {
        let obj = {};
        if (this.props.language === LANGUAGES.VI) {
          obj.label = moment(new Date()).add(i, "days").format("dddd -DD/MM");
        } else {
          obj.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("dddd -DD/MM");
        }

        obj.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
        arrDate.push(obj);
      }
      this.setState({
        Date: arrDate,
      });
    }
  }
  render() {
    let language = this.props.language;
    let allDate = this.state.Date;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select class="form-select" aria-label="Default select example">
              {allDate &&
                allDate.length > 0 &&
                allDate.map((item, index) => {
                  return (
                    <>
                      <option value={item.value} key={index}>
                        {item.label}
                      </option>
                    </>
                  );
                })}
            </select>
          </div>
          <div className="all-time-available"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
