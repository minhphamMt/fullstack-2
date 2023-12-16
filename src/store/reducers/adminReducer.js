import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
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
    default:
      return state;
  }
};

export default adminReducer;
