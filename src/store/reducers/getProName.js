import * as types from "../../actions/types";

var initialState = {name:""};


var getProName = (state = initialState, action) => {
    switch (action.type) {
      case types.PRODUCT_NAME:
        return{
          ...state,
          name: action.proname
        }
      default:
        return {...state};
    }
  };
  
  export default getProName;
  