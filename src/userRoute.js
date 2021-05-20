import React from "react";


const userDetail = React.lazy(() => import("./Components/UserInfo/DetailInfo/UserDetail"))
const OrderList = React.lazy(() => import("./Components/UserInfo/OrderInfo/OrderInfo"))

const ChangePassword = React.lazy(() => import("./Components/UserInfo/ChangePassWord/ChangePassword"))
const OrderDetail = React.lazy(() => import("./Components/UserInfo/OrderInfo/Detail/Orderdetail"))
// const Main = React.lazy(() => import("./Components/UserInfo/Main"))


const userRoute = [
    {path:"/userinfo/userUpdate",exact: true,name:"UserInfo",component: userDetail},
    {path:"/userinfo/orders",name:"Order",component: OrderList},
    {path:"/userinfo/changepassword",name:"ChangePassword",component: ChangePassword},
    {path:"/userinfo/detail",name:"Detail",component: OrderDetail},
  
  ];


  export default userRoute