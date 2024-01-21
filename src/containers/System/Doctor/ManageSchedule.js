import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import "./ManageSchedule.scss";
import * as actions from "../../../store/actions";
import { LANGUAGES, dateFormat } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import FormattedDate from "../../../components/Formating/FormattedDate";
import _ from "lodash";
import { CreateBulkSchedule } from "../../../services/userService";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: null,
      allDoctor: [],
      currentDate: new Date(),
      TimeLog: [],
      active: [],
    };
  }
  async componentDidMount() {
    await this.props.getAllDoctor();
    await this.props.getAllTime();
  }
  componentDidUpdate(preProps, preState) {
    if (preProps.allDoctor !== this.props.allDoctor) {
      let dataSelect = this.buildDataInput(this.props.allDoctor);
      this.setState({
        allDoctor: dataSelect,
      });
    }
    if (preProps.language !== this.props.language) {
      let dataSelect = this.buildDataInput(this.props.allDoctor);
      this.setState({
        allDoctor: dataSelect,
      });
    }
    if (preProps.Time !== this.props.Time) {
      let data = this.props.Time;
      if (data && data.length > 0) {
        data = data.map((item) => {
          item.active = false;
          return item;
        });
      }
      this.setState({
        TimeLog: this.props.Time,
      });
    }
  }
  handleChangeSelected = (event) => {
    this.setState({
      selectedDoctor: event,
      // doctorId: event.value,
    });
  };
  handleOnChangeDate = (event) => {
    this.setState({
      currentDate: event[0],
    });
  };
  buildDataInput(inputData) {
    let result = [];
    let language = this.props.language;

    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let obj = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
        obj.value = item.id;
        result.push(obj);
      });
    }
    return result;
  }
  chooseTime = (id) => {
    let { allDoctor, TimeLog, active } = this.state;
    if (active[id] === true) {
      active[id] = false;
    } else {
      active[id] = true;
    }
    this.setState({
      active: [...active],
    });
    console.log(">>>check state:", this.state.active);
  };
  handleSave = async () => {
    let { selectedDoctor, allDoctor, TimeLog, active, currentDate } =
      this.state;
    if (!selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("🦄 plz selected doctor!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (!currentDate) {
      toast.warn("🦄 plz Choose date doctor!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    let formated = currentDate.toLocaleDateString();
    let formatedDate = new Date(formated).getTime();
    let selected = [];
    for (let i = 0; i < active.length; i++) {
      let obj = {};
      if (active[i]) {
        obj.timeType = TimeLog[i].keyMap;
        obj.date = formatedDate;
        obj.doctorId = selectedDoctor.value;
        selected.push(obj);
      }
    }
    console.log(">>>check selected:", selected);
    await CreateBulkSchedule({
      arrSchedule: selected,
      doctorId: selectedDoctor.value,
      date: formatedDate,
    });
    // toast.info("🦄 Save is done!", {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    // });
  };
  render() {
    let { selectedDoctor, allDoctor, TimeLog, active } = this.state;
    let { language } = this.props;
    let d = new Date();
    let x = d.getDate();
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <div className="manage-container">
          <div className="manage-title title">
            <FormattedMessage id="manage-schedule.title" />
          </div>
          <div className="mb-5"></div>
          <div className="container">
            <div className="row">
              <div className="col-4">
                <label>
                  {" "}
                  <FormattedMessage id="manage-schedule.choose-doctor" />:
                </label>
                <Select
                  className=""
                  value={selectedDoctor}
                  onChange={(event) => this.handleChangeSelected(event)}
                  options={this.state.allDoctor}
                />
              </div>
              <div className="col-3"></div>
              <div className="col-4">
                <label>
                  {" "}
                  <FormattedMessage id="manage-schedule.choose-date" />:
                </label>
                <DatePicker
                  className="form-control"
                  onChange={(event) => this.handleOnChangeDate(event)}
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12 pick-hour-container my-5">
                {TimeLog &&
                  TimeLog.length > 0 &&
                  TimeLog.map((item, index) => {
                    return (
                      <>
                        <button
                          onClick={() => this.chooseTime(index)}
                          key={index}
                          className={
                            active[index] === true
                              ? "btn time active"
                              : "btn time"
                          }
                        >
                          {language === LANGUAGES.VI
                            ? item.valueVI
                            : item.valueEN}
                        </button>
                      </>
                    );
                  })}
              </div>
              <button
                className="btn btn-primary save col-3"
                onClick={() => this.handleSave()}
              >
                {" "}
                <FormattedMessage id="manage-schedule.Save-option" />
              </button>
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
    allDoctor: state.admin.Doctor,
    language: state.app.language,
    Time: state.admin.Time,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    getAllTime: () => dispatch(actions.fetcHourSuccess()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
