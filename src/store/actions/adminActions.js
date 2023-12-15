import actionTypes from "./actionTypes";
import { getAllCode } from "../../services/userService";
// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,

// });
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
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
