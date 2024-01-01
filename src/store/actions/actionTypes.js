const actionTypes = Object.freeze({
  //app
  APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
  SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",
  CHANGE_LANGUAGE: "CHANGE_LANGUAGE",

  //user
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
  USER_LOGIN_SUCCESS: " USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
  PROCESS_LOGOUT: "PROCESS_LOGOUT",
  CREATE_USER_SUCCESS: "SAVE_USER_SUCCESS",
  CREATE_USER_FAILD: "SAVE_USER_FAILD",
  //admin
  FETCH_GENDER_START: "FETCH_GENDER_START",
  FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
  FETCH_GENDER_FAILD: "FETCH_GENDER_FAILD",
  FETCH_ROLE_SUCCESS: "FETCH_ROLE_SUCCESS",
  FETCH_ROLE_FAILD: "FETCH_ROLE_FAILD",
  FETCH_POSITION_SUCCESS: "FETCH_POSITION_SUCCESS",
  FETCH_POSITION_FAILD: "FETCH_POSITION_FAILD",
  //get user CRUD redux
  FETCH_GET_USER_SUCCESS: "FETCH_GET_USER_SUCCESS",
  FETCH_GET_USER_FAILD: "FETCH_GET_USER_FAILD",
  //delete User Redux
  DELETE_USER_SUCCESS: " DELETE_USER_SUCCESS",
  DELETE_USER_FAILD: "DELETE_USER_FAILD",
  // edit user
  EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
  EDIT_USER_FAILD: "EDIT_USER_FAILD",
  //load doctor
  FETCH_DOCTOR_SUCCESS: "FETCH_DOCTOR_SUCCESS",
  FETCH_DOCTOR_FAILD: "FETCH_DOCTOR_FAILD",
  //get all doctor
  FETCH_ALL_DOCTOR_SUCCESS: "FETCH_ALL_DOCTOR_SUCCESS",
  FETCH_ALL_DOCTOR_FAILD: "FETCH_ALL_DOCTOR_FAILD",
  //create info doctor
  CREATE_DONE: "CREATE_DONE",
  CREATE_FAILD: "CREATE_FAILD",
  //get all code
  GET_ALLCODE_HOUR_SUCCESS: "GET_ALLCODE_HOUR_SUCCESS",
  GET_ALLCODE_HOUR_FAILD: "GET_ALLCODE_HOUR_FAILD",
});

export default actionTypes;
