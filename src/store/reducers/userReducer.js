import * as types from "../../actions/types";

const initialState = {};


var userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_INFO:
      state = action.info;
      return state;
    default:
      return state;
      
  }
};
export default userReducer;
  