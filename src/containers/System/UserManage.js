import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  handleGetUser,
  handleCreateNewService,
  handleDeleteUser,
  handleEditUser,
} from "../../services/userService";
import "./userManage.scss";
import ModalCreateUser from "./ModalCreateUser";
import ModdalEditUser from "./ModdalEditUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isOpenModal: false,
      OpenModal: false,
      userbyid: {},
    };
  }
  getAllUser = async () => {
    let usersDidmout = this.state.users;
    let response = await handleGetUser("all");
    if (response) {
      usersDidmout = response.users;
    }
    this.setState({
      users: usersDidmout,
    });
  };
  async componentDidMount() {
    this.getAllUser();
  }
  handleAddNew = () => {
    this.setState({
      isOpenModal: true,
    });
  };
  toggleOpen = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };
  toggleOpenEdit = () => {
    this.setState({
      OpenModal: !this.state.OpenModal,
    });
  };
  CreateNewUser = async (data) => {
    try {
      let response = await handleCreateNewService(data);
      if (response && response.message.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUser();
      }
      console.log(">>>check response:", response);
    } catch (err) {
      console.log(err);
    }
  };
  DeleteUser = async (id) => {
    try {
      let response = await handleDeleteUser(id);
      if (response && response.message.errCode === 0) {
        await this.getAllUser();
      } else {
        alert(response.message.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  EditUser = async (data) => {
    try {
      let message = await handleEditUser(data);
      console.log(">>>check data output:", data);
      if (message && message.message.errCode !== 0) {
        alert(message.message.message);
      } else {
        await this.getAllUser();
      }
    } catch (err) {
      console.log(err);
    }
  };
  getUserById = (id) => {
    let user = {};
    let Alluser = this.state.users;
    this.setState({
      OpenModal: true,
    });
    for (let i = 0; i < Alluser.length; i++) {
      if (Alluser[i].id === id) {
        user = Alluser[i];
        break;
      }
    }
    this.setState({
      userbyid: user,
    });
  };
  render() {
    return (
      <>
        <div className="user-container col-12">
          <ModalCreateUser
            isOpenModal={this.state.isOpenModal}
            toggle={this.toggleOpen}
            users={this.state.users}
            CreateNewUser={this.CreateNewUser}
          />
          {this.state.OpenModal && (
            <ModdalEditUser
              OpenModal={this.state.OpenModal}
              toggleOpenEdit={this.toggleOpenEdit}
              users={this.state.users}
              userbyid={this.state.userbyid}
              EditUser={this.EditUser}
            />
          )}
          <div className="title text-center"> Manage users with minh</div>

          <div className="container-fluid mt-3 col-11">
            <div className=" my-2">
              <button
                className="btn btn-primary col-3 "
                onClick={() => this.handleAddNew()}
              >
                Add New <i classsName="fas fa-plus"></i>
              </button>
            </div>
            <table className="table table-hover table-bordered ">
              <thead>
                <tr className="table-primary">
                  <th>Email</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>address</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users &&
                  this.state.users.length > 0 &&
                  this.state.users.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td className="text-center">
                          <i
                            className="far fa-edit mx-3 edit"
                            onClick={() => this.getUserById(item.id)}
                          ></i>
                          <i
                            className="far fa-trash-alt mx-3 delete"
                            onClick={() => this.DeleteUser(item.id)}
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot></tfoot>
            </table>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
