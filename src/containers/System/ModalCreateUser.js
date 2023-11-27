import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { handleCreateNew } from "../../services/userService";
import "./MOdal.scss";
import { invalid } from "moment/moment";
class ModalCreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        gender: "",
        roleId: "",
      },
      err: "",
    };
  }
  async componentDidMount() {}
  toggle = async () => {
    this.props.toggle();
  };
  handleOnChangeValue = (event, id) => {
    let coppystate = this.state.data;
    coppystate[id] = event.target.value;
    this.setState({
      data: coppystate,
    });
    console.log(">>check state:", this.state.data);
  };

  checkEmail = () => {
    let check = true;
    let user = this.props.users;
    for (let i = 0; i < user.length; i++) {
      if (user[i].email === this.state.data.email) {
        check = false;
        break;
      }
    }
    return check;
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrinput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phoneNumber",
      "gender",
      "roleId",
    ];
    let check = this.checkEmail();
    let datacheck = this.state.data;
    if (check === false) {
      this.setState({
        err: "The Email Is Exist plz try again",
      });
      return;
    }
    for (let i = 0; i < arrinput.length; i++) {
      console.log(datacheck[arrinput[i]]);
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
  createNew = () => {
    let data = this.state.data;
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.CreateNewUser(data);
      this.props.toggle();
    } else {
      console.log("err code");
    }
  };
  render() {
    return (
      <>
        <Modal
          isOpen={this.props.isOpenModal}
          toggle={() => this.toggle()}
          className="abcclassname"
          size="lg"
          centered
        >
          <ModalHeader toggle={() => this.toggle()}>
            Create a New User
          </ModalHeader>
          <ModalBody>
            <>
              {" "}
              <div className="container">
                <div className="row">
                  <div className="col-12 text-center">
                    <h3 style={{ textTransform: "capitalize" }}>
                      Create a new user
                    </h3>
                    <h5 style={{ color: "red" }}>{this.state.err}</h5>
                  </div>

                  <div className="col-12">
                    <div className="row">
                      <div className="col-6 mb-3 mt-3">
                        <label className="form-label">Email:</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter email"
                          name="email"
                          value={this.state.email}
                          onChange={(event) =>
                            this.handleOnChangeValue(event, "email")
                          }
                        />
                      </div>
                      <div className="col-6 mt-3 mb-3">
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
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6 mb-3 mt-3">
                        <label className="form-label">First name:</label>
                        <input
                          value={this.state.firstName}
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
                          value={this.state.lastName}
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
                          value={this.state.address}
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
                          value={this.state.phoneNumber}
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
                          <option value="" disabled selected>
                            Select your option
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
                          <option value="" disabled selected>
                            Select your option
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
              onClick={() => this.createNew()}
            >
              Add new
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
