import axios from "axios";
import store from "./../store/index";

const url = {
  baseUrl: "https://localhost:5001/api/v1/",
  products:"products",
  categories:"categories",
  login:"accounts/login",
  cart:"cartproducts/",
  orders:"orders/",
  customers:"customers",
  confirmCode: "accounts/confirmMail/",
  accounts:"accounts/",
  customerChange:"customers",
  favoriteProducts:"favoriteProducts/",
  customerChange:"/customers",
  register:"accounts/register",
  ratings:"ratings/",
  comments:"comments/",
  brands: "brands/",
  colors:"colors/",
};
const instance = axios.create({
  baseURL: url.baseUrl,
  headers: {
    "Content-Type": "application/json",
    'Accept': "application/json",
  },
});
// instance.interceptors.request.use((request) => {
//   const state = store.getState();
//   if (state.auth.token) {
//     request.headers.authorization = `Bearer ${state.auth.token}`;
//   }
//   return request;
// });
const api = {
  url, //url:url
  instance,
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
};
export default api;
