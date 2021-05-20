import * as types from "../../actions/types";

const initialState = [];

var cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCT_BASKET:
      state = action.productIncart;
      return [...state];
    default:
      return [...state];
  }
};
export default cartReducer;
  