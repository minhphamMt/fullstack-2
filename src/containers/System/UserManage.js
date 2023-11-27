import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  handleGetUser,
  handleCreateNewService,
} from "../../services/userService";
import "./userManage.scss";
import ModalCreateUser from "./ModalCreateUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isOpenModal: false,
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
  render() {
    // let users = this.state.users;
    // console.log(">>>check state:", users);

    return (
      <>
        <div className="user-container col-12">
          <ModalCreateUser
            isOpenModal={this.state.isOpenModal}
            toggle={this.toggleOpen}
            users={this.state.users}
            CreateNewUser={this.CreateNewUser}
          />
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
                          <i class="far fa-edit mx-3 edit"></i>
                          <i class="far fa-trash-alt mx-3 delete"></i>
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
