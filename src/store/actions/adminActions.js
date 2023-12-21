import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  getAllCode,
  handleCreateNewService,
  handleGetUser,
  handleDeleteUser,
  handleEditUser,
  getDoctor,
} from "../../services/userService";
// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,

// });
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCode("gender");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderfaild());
      }
    } catch (err) {
      dispatch(fetchGenderfaild());
      console.log(" ", err);
    }
  };
};
export const fetchGenderSuccess = (genderdata) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderdata,
});
export const fetchGenderfaild = () => ({
  type: actionTypes.FETCH_GENDER_FAILD,
});
export const fetchRoleSuccess = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCode("role");
      if (res && res.errCode === 0) {
        dispatch({ type: actionTypes.FETCH_ROLE_SUCCESS, data: res.data });
      } else {
        dispatch(fetchRolefaild());
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchRolefaild = () => ({
  type: actionTypes.FETCH_ROLE_FAILD,
});
export const fetchPositionSuccess = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCode("POSITION");
      if (res && res.errCode == 0) {
        dispatch({ type: actionTypes.FETCH_POSITION_SUCCESS, data: res.data });
      } else {
        dispatch(fetchPositionfaild());
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchPositionfaild = () => ({
  type: actionTypes.FETCH_POSITION_FAILD,
});
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleCreateNewService(data);
      if (res && res.errCode === 0) {
        toast.success("Create is done!");
        toast.error("toast is err");
        dispatch(createUserSuccess());
      } else {
        dispatch(createUserFaild());
      }
    } catch (err) {
      console.log(err);
      toast.warn("sever err!");
      dispatch(createUserFaild());
    }
  };
};
export const createUserSuccess = () => ({
  type: "CREATE_USER_SUCCESS",
});
export const createUserFaild = () => ({
  type: "CREATE_USER_FAILD",
});
export const getUserRedux = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetUser("all");

      // console.log(">>>Check doctorget:", res1);
      if (res && res.errCode === 0) {
        dispatch(getUserSuccess(res.users));
      } else {
        dispatch(getUserFaild());
      }
    } catch (err) {
      console.log(err);
      dispatch(getUserFaild());
    }
  };
};
export const getUserSuccess = (data) => ({
  type: actionTypes.FETCH_GET_USER_SUCCESS,
  data: data,
});
export const getUserFaild = () => ({
  type: actionTypes.FETCH_GET_USER_FAILD,
});
export const deleteUserSuccess = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleDeleteUser(id);
      if (res && res.errCode == 0) {
        toast.success("Delete is done!");
      } else {
        dispatch(fetchPositionfaild());
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const deleteUserFaild = () => ({
  type: actionTypes.DELETE_USER_FAILD,
});
export const EditUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleEditUser(data);
      console.log(">>>check res:", res);
      if (res && res.errCode == 0) {
        dispatch(editUserSuccess());
      } else {
        dispatch(fetchPositionfaild());
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFaild = () => ({
  type: actionTypes.EDIT_USER_FAILD,
});
export const fetchLoadDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getDoctor("");
      if (res && res.response.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_DOCTOR_SUCCESS,
          data: res.response,
        });
      } else {
        dispatch(fetchDoctorFaild());
      }
    } catch (err) {
      console.log(err);
      dispatch(fetchDoctorFaild());
    }
  };
};
export const fetchDoctorFaild = () => ({
  type: actionTypes.FETCH_DOCTOR_FAILD,
});
