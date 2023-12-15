import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCode } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
    };
  }
  async componentDidMount() {
    this.props.getGenderstart();
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
  }
  render() {
    let language = this.props.language;
    let genders = this.state.genderArr;
    console.log(">>>check gender:", genders);

    return (
      <>
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
                    <input type="email" class="form-control" id="inputEmail4" />
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
                    <input type="text" class="form-control" id="inputEmail4" />
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
                      <FormattedMessage id="manage-user.roleid" />
                    </label>
                    <select id="inputState" class="form-select">
                      <option selected disabled>
                        {" "}
                        Choose...
                      </option>
                      <option>...</option>
                      <option>...</option>
                      <option>...</option>
                    </select>
                  </div>
                  <div class="col-md-3">
                    <label for="inputZip" class="form-label">
                      <FormattedMessage id="manage-user.img" />
                    </label>
                    <input type="text" class="form-control" id="inputZip" />
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderstart: () => dispatch(actions.fetchGenderStart()),
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) =>
    //   dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
