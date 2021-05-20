import React from "react";

import { Link } from "react-router-dom";
import "./sidebar.css";
import decode from "jwt-decode";
const SidebarMenu = () => {
  const tokentInfo = decode(localStorage.getItem("usertoken"));
  return (
    <div className="container-fluid">
      <div id="admin-sidebar" className=" p-x-0 p-y-3 pl-5">
        <ul className="sidenav admin-sidenav list-unstyled">
          <Link className="side-item" to="/userinfo/userUpdate">
            {" "}
            <li>Thông tin người dùng</li>{" "}
          </Link>
          <Link className="side-item" to="/userinfo/orders">
            {" "}
            <li> Đơn hàng của bạn</li>{" "}
          </Link>
          {tokentInfo.sub[4] !== "facebook" ? (
            <Link className="side-item" to="/userinfo/changepassword">
              {" "}
              <li> Đổi mật khẩu </li>{" "}
            </Link>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default SidebarMenu;
