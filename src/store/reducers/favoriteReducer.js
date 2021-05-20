import * as types from "../../actions/types";
const initialState = [];

var favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_FAVORITE:
      state=action.favorites;
      return [...state];
   
    default:
      return [...state];
  }
};
export default favoriteReducer;
