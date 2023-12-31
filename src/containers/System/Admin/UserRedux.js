import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import { ToastContainer, toast } from "react-toastify";
import CommonUtils from "../../../utils/CommonUtils";
import MarkDown from "./MarkDown";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      edit: false,
      preimg: false,
      roleArr: [],
      positionArr: [],
      imgUrl: "",
      infomation: {
        id: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: "",
        positionId: "",
        roleId: "",
        image: "",
        imgPreview: "",
      },
      allusers: [],
    };
  }

  async componentDidMount() {
    this.props.getGenderstart();
    this.props.getRolestart();
    this.props.getPositionstart();
    this.props.getAllUser();
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
      this.setState({
        genderArr: this.props.genderRedux,
      });
    }
    if (prevProps.roleRedux !== this.state.roleArr) {
      this.setState({
        roleArr: this.props.roleRedux,
      });
    }
    if (this.props.positionRedux !== this.state.positionArr) {
      this.setState({
        positionArr: this.props.positionRedux,
      });
    }
    if (this.props.alluser !== this.state.allusers) {
      let info = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: "",
        positionId: "",
        roleId: "",
        image: "",
      };
      this.setState({
        infomation: { ...info },
        allusers: this.props.alluser,
        imgUrl: "",
      });
    }
    // if (prevState.infomation !== this.state.infomation) {
    // }
  }
  handleOnChangeImg = async (event) => {
    // let file = event.refs.file.files[0];
    let data = event.target.files;
    let file = data[0];
    let coppyState = { ...this.state.infomation };
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      coppyState["image"] = base64;
      console.log(">>>check coppy img", coppyState["image"]);
      let objectUrl = URL.createObjectURL(file);
      coppyState["imgPreview"] = objectUrl;
      this.setState({
        imgUrl: objectUrl,
        infomation: { ...coppyState },
      });
    }
    console.log("check information:", this.state.infomation);
    // let reader = new FileReader();
    // let url = reader.readAsDataURL(file);
  };
  handleOnChange = (event, text) => {
    let coppyState = { ...this.state.infomation };
    coppyState[text] = event.target.value;
    this.setState({
      infomation: { ...coppyState },
    });
  };
  validate = () => {
    let isValid = true;
    let info = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
      "gender",
      "positionId",
      "roleId",
    ];
    let copyInfo = { ...this.state.infomation };
    for (let i = 0; i < info.length; i++) {
      if (!copyInfo[info[i]]) {
        isValid = false;
        alert("missing data " + info[i]);
        break;
      }
    }
    return isValid;
  };
  saveUser = async (e) => {
    let isValid = this.validate();
    if (isValid === false) {
      return;
    }
    this.props.createNewUser({
      email: this.state.infomation.email,
      password: this.state.infomation.password,
      firstName: this.state.infomation.firstName,
      lastName: this.state.infomation.lastName,
      address: this.state.infomation.address,
      phoneNumber: this.state.infomation.phoneNumber,
      gender: this.state.infomation.gender,
      roleId: this.state.infomation.roleId,
      positionId: this.state.infomation.positionId,
      img: this.state.infomation.image,
    });

    setTimeout(() => {
      toast.info("🦄 Create is done!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      this.props.getAllUser();
    }, 500);
    // this.props.getAllUser();
    // e.preventDefault();
  };
  DeleteUser = async (id) => {
    this.props.DeleteUserRedux(id);

    setTimeout(() => {
      toast.warn("🦄 Delete is done!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      this.props.getAllUser();
    }, 50);
  };
  handleEditUser = () => {
    let data = { ...this.state.infomation };
    console.log(">>>check data:", data);
    this.props.EditUser({
      id: this.state.infomation.id,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      roleId: data.roleId,
      positionId: data.positionId,
      image: data.image,
    });
    setTimeout(() => {
      toast.warn("🦄 Edit is done!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      this.props.getAllUser();
    }, 50);
    this.setState({
      edit: false,
    });
  };
  getUserById = (id) => {
    let arrCoppy = this.state.allusers;
    let userChoose = { ...this.state.infomation };
    for (let i = 0; i < arrCoppy.length; i++) {
      if (arrCoppy[i].id === id) {
        userChoose = arrCoppy[i];
        console.log(">>>check user choose:", userChoose);
        let imgbase64 = "";
        if (userChoose.image) {
          imgbase64 = new Buffer(userChoose.image, `base64`).toString("binary");
        }
        userChoose["imgPreview"] = imgbase64;
        this.setState({
          infomation: { ...userChoose },
          edit: true,
        });
      }
    }
  };
  previewImg = () => {
    this.setState({
      preimg: !this.state.preimg,
    });
  };
  render() {
    let language = this.props.language;
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let isLoading = this.props.isLoading;
    let positions = this.state.positionArr;
    let allUsers = this.state.allusers;
    let edit = this.state.edit;
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      positionId,
      roleId,
    } = this.state.infomation;
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
        {isLoading === true ? (
          <span className="col-12 mx-3">Loading.....</span>
        ) : (
          <div className="modal-parent">
            {" "}
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
                          value={email}
                          onChange={(event) => {
                            this.handleOnChange(event, "email");
                          }}
                          disabled={edit === true ? "disabled" : ""}
                        />
                      </div>
                      <div class="col-md-6">
                        <label for="inputPassword4" class="form-label">
                          <FormattedMessage id="manage-user.password" />
                        </label>
                        <input
                          disabled={edit === true ? "disabled" : ""}
                          type="password"
                          class="form-control"
                          id="inputPassword4"
                          value={password}
                          onChange={(event) => {
                            this.handleOnChange(event, "password");
                          }}
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
                          value={firstName}
                          onChange={(event) => {
                            this.handleOnChange(event, "firstName");
                          }}
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
                          value={lastName}
                          onChange={(event) => {
                            this.handleOnChange(event, "lastName");
                          }}
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
                          value={address}
                          onChange={(event) => {
                            this.handleOnChange(event, "address");
                          }}
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
                          value={phoneNumber}
                          onChange={(event) => {
                            this.handleOnChange(event, "phoneNumber");
                          }}
                        />
                      </div>
                      <div class="col-md-3">
                        <label for="inputState" class="form-label">
                          <FormattedMessage id="manage-user.gender" />
                        </label>
                        <select
                          id="inputState"
                          class="form-select"
                          value={gender}
                          onChange={(event) => {
                            this.handleOnChange(event, "gender");
                          }}
                        >
                          <option>Choose .......</option>
                          {genders.length > 0 &&
                            genders.map((item, index) => {
                              return (
                                <>
                                  {language === LANGUAGES.VI ? (
                                    <>
                                      <option
                                        key={item.keyMap}
                                        value={item.keyMap}
                                      >
                                        {item.valueVI}
                                      </option>
                                    </>
                                  ) : (
                                    <>
                                      <option
                                        key={item.keyMap}
                                        value={item.keyMap}
                                      >
                                        {item.valueEN}{" "}
                                      </option>
                                    </>
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
                        <select
                          id="inputState"
                          class="form-select"
                          value={positionId}
                          onChange={(event) => {
                            this.handleOnChange(event, "positionId");
                          }}
                        >
                          {" "}
                          <option>Choose .......</option>
                          {positions.length > 0 &&
                            positions.map((item, index) => {
                              return (
                                <>
                                  {language === LANGUAGES.VI ? (
                                    <>
                                      <option
                                        key={item.keyMap}
                                        value={item.keyMap}
                                      >
                                        {item.valueVI}
                                      </option>
                                    </>
                                  ) : (
                                    <>
                                      <option
                                        key={item.keyMap}
                                        value={item.keyMap}
                                      >
                                        {item.valueEN}{" "}
                                      </option>
                                    </>
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
                        <select
                          id="inputState"
                          class="form-select"
                          value={roleId}
                          onChange={(event) => {
                            this.handleOnChange(event, "roleId");
                          }}
                        >
                          {" "}
                          <option>Choose .......</option>
                          {roles.length > 0 &&
                            roles.map((item, index) => {
                              return (
                                <>
                                  {" "}
                                  {language === LANGUAGES.VI ? (
                                    <>
                                      <option
                                        key={item.keyMap}
                                        value={item.keyMap}
                                      >
                                        {item.valueVI}
                                      </option>
                                    </>
                                  ) : (
                                    <>
                                      <option
                                        key={item.keyMap}
                                        value={item.keyMap}
                                      >
                                        {item.valueEN}{" "}
                                      </option>
                                    </>
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
                              this.handleOnChangeImg(event, "img");
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
                              backgroundImage: `url(${this.state.infomation.imgPreview})`,
                            }}
                            onClick={() => this.previewImg()}
                          >
                            {this.state.preimg === true && (
                              <>
                                {" "}
                                <div className="backgr"></div>
                                <div
                                  className="preimg-container"
                                  style={{
                                    backgroundImage: `url(${this.state.infomation.imgPreview})`,
                                  }}
                                ></div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="col-12">
                        {edit === false ? (
                          <button
                            type="button"
                            class="btn btn-primary col-3"
                            onClick={(e) => this.saveUser(e)}
                          >
                            <FormattedMessage id="manage-user.button" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            class="btn btn-primary col-3"
                            onClick={() => this.handleEditUser()}
                          >
                            Save Edit
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="user-container">
              <div class="container mt-3">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Firstname</th>
                      <th>Lastname</th>
                      <th>phonenumber</th>
                      <th>address</th>
                      <th>gender</th>
                      <th>roleId</th>
                      <th>position</th>
                      <th>action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers &&
                      allUsers.length > 0 &&
                      allUsers.map((item, index) => {
                        return (
                          <>
                            <tr key={index}>
                              <td>{item.email}</td>
                              <td>{item.firstName}</td>
                              <td>{item.lastName}</td>
                              <td>{item.phoneNumber}</td>
                              <td>{item.address}</td>
                              <td>{item.gender}</td>
                              <td>{item.positionId}</td>
                              <td>{item.roleId}</td>
                              <td>
                                <button
                                  className="btn btn-primary col-4 mx-3"
                                  onClick={() => this.getUserById(item.id)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-danger col-4"
                                  onClick={() => this.DeleteUser(item.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                  </tbody>
                </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
