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
import { getScheduleDoctorByDate } from "../../../services/userService";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Date: [],
      date: new Date(),
      schedule: [],
    };
  }
  async componentDidMount() {
    let language = this.props.language;
    this.changeTime(language);
  }
  async componentDidUpdate(preProps, preState) {
    if (preProps.id !== this.props.id) {
      let formated = this.state.date.toLocaleDateString();
      let formatedDate = new Date(formated).getTime();
      let res = await getScheduleDoctorByDate(this.props.id, formatedDate);
      console.log(">>>check res:", res);
      console.log(">>>Check date:", formatedDate);
    }
    if (preState.date !== this.state.date) {
      console.log(">>>Check date:", this.state.date);
      let res = await getScheduleDoctorByDate(this.props.id, this.state.date);
      console.log(">>>check res:", res);
    }
    if (preProps.language !== this.props.language) {
      this.changeTime(this.props.language);
    }
  }
  changeTime = async (language) => {
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
  };
  handleOnChangeSelect = async (event) => {
    this.setState({
      date: event.target.value,
    });
  };
  render() {
    let language = this.props.language;
    let allDate = this.state.Date;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select
              class="form-select"
              aria-label="Default select example"
              onChange={(event) => this.handleOnChangeSelect(event)}
            >
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
