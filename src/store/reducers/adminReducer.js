import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  positions: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      let coppyState = { ...state };
      coppyState.genders = action.data;
      console.log(">>>check:", coppyState);
      return {
        ...coppyState,
      };
    case actionTypes.FETCH_GENDER_FAILD:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
