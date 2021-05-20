import React,{Fragment} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPhone,
    faEnvelope,
    faPowerOff,
    faUser,
    faMoneyBill,
    faKey,
  } from "@fortawesome/free-solid-svg-icons";
  import Cart from './../../Cart/Cart Header/Cart';
  import Dropdown from "../Dropdown/Dropdown";
  import { Link, useHistory, withRouter } from "react-router-dom";
  import {
    CCard,
    CCardBody,
    CCollapse,
    CBreadcrumbRouter,
    CNavbarNav,
    CNavbarBrand,
    CToggler,
    CNavbar,
    CImg,
  } from "@coreui/react";
const TopHeader = (props) => {

    const {handleAccessCode} = props;
    const {handleLoginShow} = props;
    const {handleRegisterShow} = props;
    const {showUser} = props;
    const {showName} = props;
    const {userImage} = props;//userInfo.image
    const {handlerLogout} = props;
    const {isLogin} = props;
  return (
    <Fragment>
      <div className="contract-info ml-5">
        <div className="contract-info-item">
          <strong>
            <FontAwesomeIcon icon={faPhone} />
            +00 (123) 456 7890
          </strong>
        </div>
        <div className="contract-info-item">
          <strong>
            <FontAwesomeIcon icon={faEnvelope} /> info@domain.com
          </strong>
        </div>
      </div>

      <div className="menu-icon-top">
        <Cart />
        <Dropdown />
      </div>

      <div className="nav-header ">
        <div className="navbar-nav menu ">
          <div className="menu-item">
            <Link className="menu-item-link" to="/">
              GIỚI THIỆU
            </Link>
          </div>
          <div className="menu-item">
            <Link className="menu-item-link" to="/">
              CHÍNH SÁCH BẢO HÀNH
            </Link>
          </div>
          <div className="LoginGroup mr-5" style={{ display: `${isLogin}` }}>
            <div
              className="menu-item"
              onClick={() => handleAccessCode(null, 0)}
            >
              <p className="menu-item-link mb-0">KÍCH HOẠT TÀI KHOẢN</p>
            </div>

            <div className="menu-item" onClick={() => handleLoginShow(null, 0)}>
              <p className="menu-item-link mb-0">ĐĂNG NHẬP</p>
            </div>
            <div
              className="menu-item"
              onClick={() => handleRegisterShow(null, 0)}
            >
              <p className="menu-item-link mb-0">ĐĂNG KÝ</p>
            </div>
          </div>
          <div className="userLogin mr-5" style={{ display: `${showUser}` }}>
            <div className="menu-item  nav-item dropdown">
              <p className="menu-item-link mb-0">
                {" "}
                <CImg
                  src={userImage}
                  width="32px"
                  height="28px"
                  alt="Image user"
                />{" "}
                Welcome {showName}
              </p>
              <ul className=" cate dropdown-menu " >
                <li>
                  <a className="dropdown-item">
                    <FontAwesomeIcon icon={faUser} className="mr-2" />{" "}
                    <Link style={{textDecoration:"none",color:"black"}} to="/userinfo/userUpdate"> Thông tin người dùng</Link>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item">
                    <FontAwesomeIcon icon={faMoneyBill} className="mr-2" />{" "}
                    <Link style={{textDecoration:"none",color:"black"}}  to="/userinfo/orders">Đơn hàng của bạn</Link>
                  </a>
                </li>

                <li>
                  <a className="dropdown-item">
                    <FontAwesomeIcon icon={faKey} className="mr-2" />{" "}
                    <Link style={{textDecoration:"none",color:"black"}}  to="/userinfo/changepassword">Đổi mật khẩu</Link>
                  </a>
                </li>

                <li onClick={handlerLogout}>
                  <a className="dropdown-item">
                    <FontAwesomeIcon icon={faPowerOff} className="mr-2" />
                    <i className="icon-off"></i>Đăng xuất
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Dropdown />
        </div>
      </div>
    </Fragment>
  );
};

export default TopHeader;
