import * as types from "../../actions/types";

const initialState={
  cates:[]
};

var productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CATEGORY:
      return{
        ...state,
        cates:action.cates
      }
    default:
      return {...state};
  }
};

export default productReducer;
