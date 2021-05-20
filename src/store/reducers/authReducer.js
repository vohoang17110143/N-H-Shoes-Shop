import * as types from "../../actions/types";
import jwt_decode from "jwt-decode";
const initialState = {
  isLoggedIn: (localStorage.getItem("isLoggedIn")==="true")?true:false || false, 
  token: localStorage.getItem("usertoken"),
  cusID: localStorage.getItem("cusID") || "",
  // customerName: JSON.parse(localStorage.getItem("customerName")) || {},
  // cartsList:localStorage.getItem("cartsList") || []?
};

var authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_TOKEN:
      localStorage.setItem("usertoken", action.token);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("cusID",action.cusID);
      // localStorage.setItem("customerName", jwt_decode(action.token).sub[0]);
     
      return {
        ...state,
        token: action.token,
        isLoggedIn: true,
        cusID: jwt_decode(action.token).sub[1],
        // customerName: jwt_decode(action.token).sub[0],
        
      };
    case types.LOG_OUT:
       localStorage.removeItem("usertoken");
       localStorage.setItem("isLoggedIn", "false");
       localStorage.removeItem("cusID");
      // localStorage.removeItem("customerName");

      return {
        ...state,
        isLoggedIn: false,
        token: null,
         cusID: "",
        // customerName: {},
      };

    default:
      return { ...state };
  }
};
export default authReducer;
