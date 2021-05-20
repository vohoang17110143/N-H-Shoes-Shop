import * as types from "../../actions/types";

var initialState = [];

var orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_ORDER:
      state = action.order;
      return [...state];
    default:
      return [...state];
  }
};

export default orderReducer;
