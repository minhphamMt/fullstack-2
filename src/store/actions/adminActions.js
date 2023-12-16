import actionTypes from "./actionTypes";
import { getAllCode } from "../../services/userService";
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
