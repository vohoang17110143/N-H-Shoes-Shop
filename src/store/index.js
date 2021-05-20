import {createStore, combineReducers } from "redux";
import productReducer from '../store/reducers/productReducer';
import basketReducer from './reducers/cartReducer'
import categoryReducer from '../store/reducers/categoryReducer'
import cartReducer from '../store/reducers/cartReducer'
import orderReducer from './reducers/orderReducer';
import userReducer from './reducers/userReducer';
import authReducer from './reducers/authReducer';
import getProName from './reducers/getProName';
import brandReducer from './reducers/brandReducer';
import favoriteReducer from "./reducers/favoriteReducer";



const myReducer =combineReducers({
    ProductList:productReducer,
    basketState: basketReducer,
    CategoryList: categoryReducer,
    CartList: cartReducer,
    OrderList: orderReducer,
    UserInfo: userReducer,
    AuthToken: authReducer,
    ProName: getProName,
    BrandList: brandReducer,
    FavoriteList: favoriteReducer,

})
const store=createStore(myReducer);
export default store;
