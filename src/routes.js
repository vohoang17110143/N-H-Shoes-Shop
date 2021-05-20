import React from "react";
import { ProName } from "./actions/productAction";

const ProductPage = React.lazy(() => import("./pages/Product/ProductPage"));
const InCart = React.lazy(() => import("./Components/Cart/showCart"));
const ProductDetail = React.lazy(() =>
  import("./Components/Product/ProductDetail/ProductDetail")
);

const Main = React.lazy(() => import("./Components/UserInfo/Main"));
// function nameDetail() {
//   return localStorage.getItem("currentProduct");
// }

const routes = [
  {
    path: "/product/:name",
    name:"",
    component: ProductDetail,
  },
  {
    path: "/collections/:name",
    exact: true,
    name:"",
    component: ProductPage,
  },
  { path: "/", exact: true, name: "Home", component: ProductPage },

  { path: "/cart", name: "Cart", component: InCart },

  { path: "/userinfo/:name", name: "User Info", component: Main },
];
export default routes;
