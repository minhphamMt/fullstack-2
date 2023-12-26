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
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const mdParser = new MarkdownIt(/* Markdown-it options */);
class MarkDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: "",
      contentmarkDowwn: "",
      selectedDoctor: null,
      description: "",
    };
  }
  handleSaveMarkDown = () => {
    console.log("check state:", this.state);
  };
  handleEditorChange = ({ html, text }) => {
    console.log("handleEditorChange", html, text);
    this.setState({
      contentHTML: html,
      contentmarkDowwn: text,
    });
  };
  handleChange = (selectedDoctor) => {
    this.setState({ selectedDoctor }, () =>
      console.log(`Option selected:`, this.state.selectedDoctor)
    );
  };
  handleOnChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  render() {
    let { selectedDoctor } = this.state;
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
                onChange={(event) => this.handleChange(event)}
                options={options}
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
            />
          </div>
          <button
            className="btn btn-primary mx-3 my-3 col-3 "
            onClick={() => this.handleSaveMarkDown()}
          >
            Lưu thông tin
          </button>
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
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) =>
    //   dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MarkDown);
