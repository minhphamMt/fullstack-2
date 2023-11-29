import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { handleCreateNew, handleEditUser } from "../../services/userService";
import "./MOdal.scss";
import { invalid } from "moment/moment";
import _, { isEmpty } from "lodash";
class ModalCreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        // password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        gender: "",
        roleId: "",
        id: "",
      },
    };
  }
  componentDidMount() {
    let userchange = this.props.userbyid;
    // let user = { ...this.state.data };
    // if (user) {
    // }
    // console.log("check user:", user);
    if (userchange && !isEmpty(userchange)) {
      this.setState((prevstate) => ({
        ...prevstate,
        data: {
          id: userchange.id,
          email: userchange.email,
          firstName: userchange.firstName,
          lastName: userchange.lastName,
          address: userchange.address,
          phoneNumber: userchange.phoneNumber,
          gender: userchange.gender,
          roleId: userchange.roleId,
        },
      }));
    }
  }
  toggle = async () => {
    this.props.toggleOpenEdit();
  };
  handleOnChangeValue = (event, id) => {
    let coppystate = this.state.data;
    coppystate[id] = event.target.value;
    this.setState({
      data: coppystate,
    });

    // console.log(">>check state:", this.state.data);
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrinput = [
      "email",
      "firstName",
      "lastName",
      "address",
      "phoneNumber",
      "gender",
      "roleId",
    ];
    let datacheck = this.state.data;
    for (let i = 0; i < arrinput.length; i++) {
      if (!datacheck[arrinput[i]]) {
        isValid = false;
        this.setState({
          err: `Missing Data Input ${arrinput[i]}`,
        });
        break;
      } else {
        this.setState({
          err: "",
        });
      }
    }

    return isValid;
  };
  UpdateUser = async () => {
    let data = this.state.data;
    console.log(">>>check data input:", data);
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.EditUser(data);
      this.toggle();
    } else {
      alert("something wrong !");
    }
  };

  render() {
    let boolean = true;
    console.log(">>>check type:", typeof boolean);
    let roleId = this.state.data.id;
    let gender = this.state.data.gender;
    let sex = "";
    if (gender === 1) {
      sex = "Male";
    } else {
      sex = "Female";
    }
    let role = "";
    if (roleId === 1) {
      role = "Admin";
    } else if (roleId === 2) {
      role = "Doctor";
    } else {
      role = "Patient";
    }
    return (
      <>
        <Modal
          isOpen={this.props.OpenModal}
          toggle={() => this.toggle()}
          className="abcclassname"
          size="lg"
          centered
        >
          <ModalHeader toggle={() => this.toggle()}>
            Edit a New User
          </ModalHeader>
          <ModalBody>
            <>
              {" "}
              <div className="container">
                <div className="row">
                  <div className="col-12 text-center">
                    <h3 style={{ textTransform: "capitalize" }}>
                      Edit a new user
                    </h3>
                    <h5 style={{ color: "red" }}>{this.state.err}</h5>
                  </div>

                  <div className="col-12">
                    <div className="row">
                      <div className="col-12 mb-3 mt-3">
                        <label className="form-label">Email:</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter email"
                          name="email"
                          value={this.state.data.email}
                          onChange={(event) =>
                            this.handleOnChangeValue(event, "email")
                          }
                          disabled
                        />
                      </div>
                      {/* <div className="col-6 mt-3 mb-3">
                        <label className="form-label">Password:</label>
                        <input
                          type="password"
                          value={this.state.password}
                          className="form-control"
                          placeholder="Enter password"
                          name="password"
                          suggested="current-password"
                          onChange={(event) =>
                            this.handleOnChangeValue(event, "password")
                          }
                        />
                      </div> */}
                    </div>
                    <div className="row">
                      <div className="col-6 mb-3 mt-3">
                        <label className="form-label">First name:</label>
                        <input
                          value={this.state.data.firstName}
                          type="text"
                          className="form-control"
                          placeholder="your firstName"
                          name="firstName"
                          onChange={(event) =>
                            this.handleOnChangeValue(event, "firstName")
                          }
                        />
                      </div>
                      <div className="col-6 mt-3 mb-3">
                        <label className="form-label">Last Name:</label>
                        <input
                          value={this.state.data.lastName}
                          type="text"
                          className="form-control"
                          placeholder="your lastName"
                          name="lastName"
                          onChange={(event) =>
                            this.handleOnChangeValue(event, "lastName")
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <div className="col-12 mb-3 mt-3">
                        <label className="form-label">Adress:</label>
                        <input
                          value={this.state.data.address}
                          type="text"
                          className="form-control"
                          placeholder="Adress:"
                          name="address"
                          onChange={(event) =>
                            this.handleOnChangeValue(event, "address")
                          }
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 mb-3 mt-3">
                        <label className="form-label">phone number</label>
                        <input
                          value={this.state.data.phoneNumber}
                          type="text"
                          className="form-control"
                          placeholder="Your phone number:"
                          name="phoneNumber"
                          onChange={(event) =>
                            this.handleOnChangeValue(event, "phoneNumber")
                          }
                        />
                      </div>
                      <div className="col-4 mt-3 mb-3">
                        <label className="form-label">sex</label>
                        <select
                          className="form-select"
                          name="gender"
                          onChange={(event) =>
                            this.handleOnChangeValue(event, "gender")
                          }
                        >
                          <option value={String(gender)} disabled selected>
                            {sex}
                          </option>
                          <option value="1">Male</option>
                          <option value="0">Female</option>
                        </select>
                      </div>
                      <div className="col-4 mt-3 mb-3">
                        <label className="form-label">Role</label>
                        <select
                          className="form-select"
                          name="roleId"
                          onChange={(event) =>
                            this.handleOnChangeValue(event, "roleId")
                          }
                        >
                          <option value={String(roleId)} disabled selected>
                            {""}
                            {role}
                          </option>
                          <option value="1">Admin</option>
                          <option value="2">Doctor</option>
                          <option value="3">Patient</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-primary col-4"
              onClick={() => this.UpdateUser()}
            >
              Update
            </button>{" "}
            <button
              className="btn btn-warning col-3"
              onClick={() => this.toggle()}
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>
        ;
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateUser);
