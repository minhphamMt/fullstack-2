import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      roleArr: [],
      positionArr: [],
      imgUrl: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderstart();
    this.props.getRolestart();
    this.props.getPositionstart();

    // try {
    //   let res = await getAllCode("gender");
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       genderArr: res.data,
    //     });
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.state.genderArr) {
      this.props.getGenderstart();
      this.setState({
        genderArr: this.props.genderRedux,
      });
    }
    if (prevProps.roleRedux !== this.state.roleArr) {
      this.setState({
        roleArr: this.props.roleRedux,
      });
    }
    if (prevProps.positionRedux !== this.state.positionArr) {
      this.setState({
        positionArr: this.props.positionRedux,
      });
    }
  }
  handleOnChangeImg = (event) => {
    // let file = event.refs.file.files[0];
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        imgUrl: objectUrl,
      });
    }
    // let reader = new FileReader();
    // let url = reader.readAsDataURL(file);
  };
  render() {
    let language = this.props.language;
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let isLoading = this.props.isLoading;
    let positions = this.state.positionArr;
    return (
      <>
        {isLoading === true ? (
          <span className="col-12 mx-3">Loading.....</span>
        ) : (
          <div className="user-redux-container">
            <div className="title"> user redux with minh pham</div>
            <div className="user-redux-body">
              <div className="container">
                <div className="row">
                  <div className="col-12 my-3">
                    <FormattedMessage id="manage-user.add" />
                  </div>
                  <form class="row g-3">
                    <div class="col-md-6">
                      <label for="inputEmail4" class="form-label">
                        <FormattedMessage id="manage-user.email" />
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="inputEmail4"
                      />
                    </div>
                    <div class="col-md-6">
                      <label for="inputPassword4" class="form-label">
                        <FormattedMessage id="manage-user.password" />
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        id="inputPassword4"
                      />
                    </div>
                    <div class="col-md-6">
                      <label for="inputfn" class="form-label">
                        <FormattedMessage id="manage-user.first-name" />
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputEmail4"
                      />
                    </div>
                    <div class="col-md-6">
                      <label for="inputln" class="form-label">
                        <FormattedMessage id="manage-user.last-name" />
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputPassword4"
                      />
                    </div>
                    <div class="col-6">
                      <label for="inputAddress" class="form-label">
                        <FormattedMessage id="manage-user.address" />
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputAddress"
                        placeholder="1234 Main St"
                      />
                    </div>
                    <div class="col-6">
                      <label for="inputAddress" class="form-label">
                        <FormattedMessage id="manage-user.phone" />
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputAddress"
                        placeholder="1234 "
                      />
                    </div>
                    <div class="col-md-3">
                      <label for="inputState" class="form-label">
                        <FormattedMessage id="manage-user.gender" />
                      </label>
                      <select id="inputState" class="form-select">
                        <option disabled selected>
                          Choose .......
                        </option>
                        {genders.length > 0 &&
                          genders.map((item, index) => {
                            return (
                              <>
                                {language === LANGUAGES.VI ? (
                                  <option key={item.key}>{item.valueVI}</option>
                                ) : (
                                  <option key={item.key}>{item.valueEN}</option>
                                )}
                              </>
                            );
                          })}
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label for="inputState" class="form-label">
                        <FormattedMessage id="manage-user.position" />
                      </label>
                      <select id="inputState" class="form-select">
                        <option disabled selected>
                          Choose .......
                        </option>
                        {positions.length > 0 &&
                          positions.map((item, index) => {
                            return (
                              <>
                                {language === LANGUAGES.VI ? (
                                  <option key={item.key}>{item.valueVI}</option>
                                ) : (
                                  <option key={item.key}>{item.valueEN}</option>
                                )}
                              </>
                            );
                          })}
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label for="inputState" class="form-label">
                        <FormattedMessage id="manage-user.roleid" />
                      </label>
                      <select id="inputState" class="form-select">
                        <option disabled selected>
                          Choose .......
                        </option>
                        {roles.length > 0 &&
                          roles.map((item, index) => {
                            return (
                              <>
                                {language === LANGUAGES.VI ? (
                                  <option key={item.key}>{item.valueVI}</option>
                                ) : (
                                  <option key={item.key}>{item.valueEN}</option>
                                )}
                              </>
                            );
                          })}
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label for="inputZip" class="form-label">
                        <FormattedMessage id="manage-user.img" />
                      </label>
                      <div className="preview-container">
                        <input
                          id="previewImg"
                          type="file"
                          hidden
                          onChange={(event) => {
                            this.handleOnChangeImg(event);
                          }}
                        />
                        <label
                          htmlFor="previewImg"
                          className="btn btn-secondary px-3"
                        >
                          Tải ảnh <i class="fas fa-upload"></i>
                        </label>
                        <div
                          className="preview-img"
                          style={{
                            backgroundImage: `url(${this.state.imgUrl})`,
                          }}
                        >
                          <a
                            className="preview-next"
                            href={this.state.imgUrl}
                            target="_blank"
                          ></a>
                        </div>
                      </div>
                    </div>
                    <div class="col-12">
                      <button type="submit " class="btn btn-primary col-3">
                        <FormattedMessage id="manage-user.button" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderstart: () => dispatch(actions.fetchGenderStart()),
    getRolestart: () => dispatch(actions.fetchRoleSuccess()),
    getPositionstart: () => dispatch(actions.fetchPositionSuccess()),
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) =>
    //   dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
