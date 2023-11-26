import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { handleCreateNew } from "../../services/userService";
import "./MOdal.scss";
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
    };
  }
  async componentDidMount() {}
  toggle = async () => {
    this.props.toggle();
    let data = await handleCreateNew(this.state.data);
    console.log(".>>Check data:", data);
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
                        />
                      </div>
                      <div className="col-6 mt-3 mb-3">
                        <label className="form-label">Password:</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter password"
                          name="password"
                          suggested="current-password"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6 mb-3 mt-3">
                        <label className="form-label">First name:</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="your firstName"
                          name="firstname"
                        />
                      </div>
                      <div className="col-6 mt-3 mb-3">
                        <label className="form-label">Last Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="your lastname"
                          name="lastName"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="col-12 mb-3 mt-3">
                        <label className="form-label">Adress:</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Adress:"
                          name="address"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 mb-3 mt-3">
                        <label className="form-label">phone number</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Your phone number:"
                          name="phoneNumber"
                        />
                      </div>
                      <div className="col-4 mt-3 mb-3">
                        <label className="form-label">sex</label>
                        <select className="form-select" name="gender">
                          <option value="1">Male</option>
                          <option value="0">Female</option>
                        </select>
                      </div>
                      <div className="col-4 mt-3 mb-3">
                        <label className="form-label">Role</label>
                        <select className="form-select" name="role">
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
              onClick={() => this.toggle()}
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
