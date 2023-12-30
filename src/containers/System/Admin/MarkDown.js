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
    };
  }
  componentDidMount() {
    this.props.getAllDoctor();
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
  }
  handleSaveMarkDown = async () => {
    await this.props.createInfoDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.doctorId,
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
    let content = {};
    if (res && res.data && res.data.MarkDown) {
      content = res.data.MarkDown;
      this.setState({
        contentHTML: content.contentHTML,
        contentMarkdown: content.contentMarkdown,
        description: content.description,
        boolean: true,
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
    });
    this.setState({
      contentHTML: "",
      contentMarkdown: "",
      description: "",
      doctorId: "",
      selectedDoctor: null,
    });
  };
  render() {
    let { selectedDoctor, allDoctor } = this.state;

    return (
      <>
        <div className="manage-doctor-container px-3">
          <div>
            {" "}
            <h2 className="title">cập nhật thông tin bác sĩ </h2>
          </div>
          <div className="row col-12">
            <div className="content-left col-6">
              <label className="form-label mt-3">Chọn bác sĩ:</label>
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
                Thông tin giói thiệu:
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
              Tạo Bài Đăng
            </button>
          ) : (
            <button
              className="btn btn-primary mx-3 my-3 col-3 "
              onClick={() => this.handleEditDetail()}
            >
              Sửa Bài Đăng
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
