import * as types from "../../actions/types";

var initialState = [];

var productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCT:
      state = action.products;
      return [...state];
    // case GET_PRODUCT_ID:
    //   return {
    //     ...state,
    //     product: {
    //       productId: action.productByID.productId,
    //       name: action.productByID.name,
    //       price: action.productByID.price,
    //       image: action.productByID.image,
    //       sex: action.productByID.sex,
    //       description: action.productByID.description,
    //       colorDTOs: action.colorById,
    //     },
    //   };

    default:
      return [...state];
  }
};

export default productReducer;
