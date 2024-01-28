import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import { ToastContainer, toast } from "react-toastify";
import CommonUtils from "../../../utils/CommonUtils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { getDetailInfoDoctor } from "../../../services/userService";
import { EditDetailDoctor } from "../../../services/userService";
import { getAllCode } from "../../../services/userService";
const mdParser = new MarkdownIt(/* Markdown-it options */);
class MarkDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: "",
      contentMarkdown: "",
      selectedDoctor: null,
      description: "",
      allDoctor: [],
      doctorId: "",
      boolean: false,
      listprice: [],
      listpayment: [],
      listprovince: [],
      price: [],
      payment: [],
      province: [],
      infomation: {
        selectedPrice: "",
        selectedPayment: "",
        selectedProvince: "",
      },
      infoPrice: "",
      infoPayment: "",
      infoProvince: "",
      info: {
        nameClinic: "",
        addressClinic: "",
        note: "",
      },
    };
  }
  async componentDidMount() {
    this.props.getAllDoctor();
    let province = await getAllCode("PROVINCE");
    let price = await getAllCode("PRICE");
    let payment = await getAllCode("PAYMENT");
    console.log(">>>Check :", price);
    this.setState({
      listprice: price.data,
      listpayment: payment.data,
      listprovince: province.data,
    });

    let price1 = this.buildDataSelect(this.state.listprice);
    let province1 = this.buildDataSelect(this.state.listprovince);
    let payment1 = this.buildDataSelect(this.state.listpayment);
    this.setState({
      price: price1,
      payment: payment1,
      province: province1,
    });
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
      let price = this.buildDataSelect(this.state.listprice);
      let province = this.buildDataSelect(this.state.listprovince);
      let payment = this.buildDataSelect(this.state.listpayment);
      this.setState({
        allDoctor: dataSelect,
        price: price,
        payment: payment,
        province: province,
      });
    }
  }
  buildDataSelect = (inputdata) => {
    let result = [];
    let language = this.props.language;
    if (inputdata && inputdata.length > 0) {
      inputdata.map((item, index) => {
        let obj = {};
        let labelVi = item.valueVI;
        let labelEn = item.valueEN;
        obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
        obj.value = item.id;
        result.push(obj);
      });
    }
    return result;
  };
  handleSaveMarkDown = async () => {
    await this.props.createInfoDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.doctorId,
      priceId: this.state.infoPrice,
      provinceId: this.state.infoProvince,
      paymentId: this.state.infoPayment,
      addressClinic: this.state.info.addressClinic,
      nameClinic: this.state.info.nameClinic,
      note: this.state.info.note,
    });
    this.setState({
      contentHTML: "",
      contentMarkdown: "",
      description: "",
      doctorId: "",
      selectedDoctor: null,
    });
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };
  handleChangeSelected = async (selectedDoctor) => {
    let res = await getDetailInfoDoctor(selectedDoctor.value);
    console.log(">>>check res : ", res);
    let content = {};
    let info = {};
    if (res && res.data && res.data.MarkDown) {
      content = res.data.MarkDown;
      let info = res.data.DoctorInfo;
      this.setState({
        contentHTML: content.contentHTML,
        contentMarkdown: content.contentMarkdown,
        description: content.description,
        boolean: true,
        info: { ...info },
      });
      if (!content.description) {
        this.setState({
          description: "",
        });
      }
      if (!content.contentMarkdown) {
        this.setState({
          contentHTML: "",
          contentMarkdown: " ",
        });
      }
      if (!content.description && !content.contentMarkdown) {
        this.setState({
          boolean: false,
        });
      }
    }

    this.setState({
      selectedDoctor: selectedDoctor,
      doctorId: selectedDoctor.value,
    });
    console.log(">>>Check state:", this.state.info);
  };
  handleChangeSelectedInfo = (selected, id) => {
    let coppyState = { ...this.state.infomation };
    let { listpayment, listprice, listprovince } = this.state;
    coppyState[id] = selected;

    if (id === "selectedPrice") {
      for (let i = 0; i < listprice.length; i++) {
        if (listprice[i].id === selected.value) {
          this.setState({
            infoPrice: listprice[i].keyMap,
          });
          break;
        }
      }
    }
    if (id === "selectedPayment") {
      for (let i = 0; i < listpayment.length; i++) {
        if (listpayment[i].id === selected.value) {
          this.setState({
            infoPayment: listpayment[i].keyMap,
          });
          break;
        }
      }
    }
    if (id === "selectedProvince") {
      for (let i = 0; i < listprovince.length; i++) {
        if (listprovince[i].id === selected.value) {
          this.setState({
            infoProvince: listprovince[i].keyMap,
          });
          break;
        }
      }
    }
    this.setState({
      infomation: coppyState,
    });
  };
  handleOnChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
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
  handleEditDetail = async () => {
    await EditDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.doctorId,
      priceId: this.state.infoPrice,
      provinceId: this.state.infoProvince,
      paymentId: this.state.infoPayment,
      addressClinic: this.state.info.addressClinic,
      nameClinic: this.state.info.nameClinic,
      note: this.state.info.note,
    });
    let info = {};
    this.setState({
      contentHTML: "",
      contentMarkdown: "",
      description: "",
      infomation: "",
      info: "",
      selectedDoctor: null,
    });
    console.log(">>>check info:", this.state.info);
    console.log(">>>check info:", this.state.infomation);
  };
  handleOnChangeInfo = (event, id) => {
    let coppyinfo = { ...this.state.info };
    coppyinfo[id] = event.target.value;
    this.setState({
      info: coppyinfo,
    });
  };
  render() {
    let { selectedDoctor, allDoctor, infomation } = this.state;
    let { selectedPrice, selectedPayment, selectedProvince } =
      this.state.infomation;
    return (
      <>
        <div className="manage-doctor-container px-3">
          <div>
            {" "}
            <h2 className="title">
              <FormattedMessage id={"admin.manage-doctor.update-info"} />
            </h2>
          </div>
          <div className="row col-12">
            <div className="content-left col-6">
              <label className="form-label mt-3">
                {" "}
                <FormattedMessage id={"admin.manage-doctor.select-doctor"} />
              </label>
              <Select
                className=""
                value={selectedDoctor}
                onChange={(event) => this.handleChangeSelected(event)}
                options={this.state.allDoctor}
              />
            </div>
            <div className="more-info col-6">
              {" "}
              <label for="text-about" className="form-label">
                <FormattedMessage id={"admin.manage-doctor.intro-info"} />
              </label>
              <textarea
                onChange={(event) => this.handleOnChangeDesc(event)}
                value={this.state.description}
                className="form-control my-3"
                id="text-about"
                rows="4"
              ></textarea>
            </div>
          </div>
          <div
            className="more-info row col-12 my-2"
            style={{
              display: "flex",
              gap: "20px",
              textTransform: "capitalize",
            }}
          >
            <div className="form-group col-4">
              {" "}
              <label>chọn giá</label>
              <Select
                className=""
                value={selectedPrice}
                onChange={(event) =>
                  this.handleChangeSelectedInfo(event, "selectedPrice")
                }
                options={this.state.price}
              />
            </div>
            <div className="form-group col-4">
              {" "}
              <label>chọn phương thức thanh toán </label>
              <Select
                className=""
                value={selectedPayment}
                onChange={(event) =>
                  this.handleChangeSelectedInfo(event, "selectedPayment")
                }
                options={this.state.payment}
              />
            </div>
            <div className="form-group col-3">
              {" "}
              <label>chọn tỉnh thành </label>
              <Select
                className=""
                value={selectedProvince}
                onChange={(event) =>
                  this.handleChangeSelectedInfo(event, "selectedProvince")
                }
                options={this.state.province}
              />
            </div>
          </div>
          <div
            className="more-info row col-12 my-2"
            style={{
              display: "flex",
              gap: "20px",
              textTransform: "capitalize",
            }}
          >
            <div className="form-group col-4">
              {" "}
              <label>tên phòng khám </label>
              <input
                className="form-control"
                value={this.state.info.nameClinic}
                onChange={(event) =>
                  this.handleOnChangeInfo(event, "nameClinic")
                }
              ></input>{" "}
            </div>
            <div className="form-group col-4">
              {" "}
              <label>địa chỉ phòng khám </label>
              <input
                value={this.state.info.addressClinic}
                className="form-control"
                onChange={(event) =>
                  this.handleOnChangeInfo(event, "addressClinic")
                }
              ></input>{" "}
            </div>
            <div className="form-group col-3">
              {" "}
              <label>note </label>
              <input
                value={this.state.info.note}
                className="form-control"
                onChange={(event) => this.handleOnChangeInfo(event, "note")}
              ></input>{" "}
            </div>
          </div>
          <div className="manage-doctor-edit">
            {" "}
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={(event) => this.handleEditorChange(event)}
              value={this.state.contentMarkdown}
            />
          </div>
          {this.state.boolean === false ? (
            <button
              className="btn btn-primary mx-3 my-3 col-3 "
              onClick={() => this.handleSaveMarkDown()}
            >
              <FormattedMessage id={"admin.manage-doctor.create"} />
            </button>
          ) : (
            <button
              className="btn btn-primary mx-3 my-3 col-3 "
              onClick={() => this.handleEditDetail()}
            >
              <FormattedMessage id={"admin.manage-doctor.fix"} />
            </button>
          )}
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    isLoading: state.admin.isLoadingGender,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    alluser: state.admin.allUsers,
    allDoctor: state.admin.Doctor,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getGenderstart: () => dispatch(actions.fetchGenderStart()),
    getRolestart: () => dispatch(actions.fetchRoleSuccess()),
    getPositionstart: () => dispatch(actions.fetchPositionSuccess()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    getAllUser: () => dispatch(actions.getUserRedux()),
    DeleteUserRedux: (id) => dispatch(actions.deleteUserSuccess(id)),
    EditUser: (data) => dispatch(actions.EditUser(data)),
    getAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    createInfoDoctor: (data) => dispatch(actions.createInfoDoctor(data)),
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) =>
    //   dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MarkDown);
