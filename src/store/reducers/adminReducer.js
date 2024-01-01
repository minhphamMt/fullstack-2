import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  allUsers: [],
  Doctor: [],
  Time: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      state.isLoadingGender = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.isLoadingGender = false;
      state.genders = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILD:
      state.isLoadingGender = false;
      state.genders = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.isLoadingGender = false;
      state.roles = action.data;

      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILD:
      state.isLoadingGender = false;
      state.roles = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.isLoadingGender = false;
      state.positions = action.data;

      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILD:
      state.isLoadingGender = false;
      state.positions = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_GET_USER_SUCCESS:
      state.isLoadingGender = false;
      state.allUsers = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_DOCTOR_SUCCESS:
      state.isLoadingGender = false;
      if (action.data.errCode === 0) {
        state.Doctor = action.data.data;
      } else {
        alert("Err in sever");
      }

      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.isLoadingGender = false;
      if (action.data && action.data.length > 0) {
        state.Doctor = action.data;
      }
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_FAILD:
      state.Doctor = [];
      return {
        ...state,
      };
    case actionTypes.GET_ALLCODE_HOUR_SUCCESS:
      if (action && action.dataTime) {
        state.Time = action.dataTime;
      }
      return {
        ...state,
      };
    case actionTypes.GET_ALLCODE_HOUR_FAILD:
      state.Time = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
