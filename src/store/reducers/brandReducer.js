import * as types from "../../actions/types";

const initialState=[];

var brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_BRAND:
      state = action.brands;
      return [...state];
    default:
      return {...state};
  }
};

export default brandReducer;
