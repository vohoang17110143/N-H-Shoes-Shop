import React, { useState, useEffect } from "react";
// import Logo from "../../icons/Shop logo.jpg";
import Logo from "../../assets/icons/Shop logo.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
// // routes config
import routes from "../../routes";
import Cart from "../Cart/Cart Header/Cart";
import SearchBar from "./../Searchbar/SearchBar";
import { Link, useHistory, useLocation, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import productApi from "../../api/productApi";
import { actFetchProducts } from "../../actions/productAction";
import authApi from "../../api/authApi";

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
import "./style.css";
import { actFetchUser, logout } from "./../../actions/loginAction";
import { actFetchCates } from "./../../actions/cateAction";
import categoryApi from "./../../api/categoryApi";
import Register from "./Modal/Register";
import ActivateAccount from "./Modal/ActivateAccount";
import ForgotPassword from "./Modal/ForgotPassword";
import TopHeader from "./TopHeader/TopHeader";
import CateHeader from "./CateHeader/CateHeader";
import Login from "./Modal/Login/Login";
import { HubConnectionBuilder } from "@microsoft/signalr";
const Header = (props) => {
  const location = useLocation();
  const modifyRoutes = (routes) => {
    if (location.pathname.includes("/product")) {
      routes[0].name = location.pathname.split("/")[2].split("+").join(" ");
    }
    if (location.pathname.includes("/collections")) {
      routes[1].name = location.pathname.split("/")[2].split("+").join(" ");
    }
    return routes;
  };
  let history = useHistory();
  const [scrolled, setScrolled] = React.useState(false);
  const { userInfo } = props;
  //#region  Modal state
  const [modalShow, setModalShow] = useState(false);
  const [registerShow, setregisterShow] = useState(false);
  const [accessShow, setAccessShow] = useState(false);
  const [showName, setShowName] = useState("");
  const handleLoginClose = () => setModalShow(false);
  const handleRegisterClose = () => setregisterShow(false);
  const handleAccessClose = () => setAccessShow(false);
  const [isLogin, setIsLogin] = useState("inline-flex");
  const [showUser, setShowUser] = useState("none");
  const [forgotShow, setForgotShow] = useState(false);

  const handleFogotClose = () => setForgotShow(false);
  //#endregion
  //#region  categpry
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  const fetchProduct = async (index, id) => {
    var data = [];
    var sex = "";
    if (id === null) {
      switch (index) {
        case 0:
          sex = "Nữ";
          data = await productApi.getProductBySex(sex);
          break;
        case 1:
          sex = "Nam";
          data = await productApi.getProductBySex(sex);
          break;
        case 2:
          data = await productApi.getProductByPrice(75);
          break;
        case 3:
          data = await productApi.getProductByPrice(100);
          break;
        default:
          data = await productApi.getProducts();
          break;
      }
    } else {
      data = await productApi.getProductByCategory(id);
    }
    props.fetchProducts(data);
  };

  const updateHeader = async () => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      var data = await authApi.getUserInfo(localStorage.getItem("cusID"));
      props.fetchUserInfo(data);
    }
  };
  const loadData = async () => {
    // update cate in redux
    var cateList = await categoryApi.getAllCategory();
    props.fetchCate(cateList);
  };
  const onload = async () => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      setModalShow(false);
      setIsLogin("none");
      setShowUser("inline-flex");
      setShowName(jwt_decode(localStorage.getItem("usertoken")).sub[0]);
      var data = await authApi.getUserInfo(localStorage.getItem("cusID"));
      props.fetchUserInfo(data);
    }
    // update cate in redux
    var cateList = await categoryApi.getAllCategory();
    props.fetchCate(cateList);
  };
  const connection = new HubConnectionBuilder()
    .withUrl("https://localhost:5001/hubs/shopshoe")
    .withAutomaticReconnect()
    .build();
  useEffect(async () => {
    onload();
    loadData();
    window.addEventListener("scroll", handleScroll);

    await connection
      .start()
      .then((res) => {
        console.log("result");
        connection.on("Add_Delete_Category", () => {
          loadData();
        });
      })
      .catch((e) => console.log("Connection failed: ", e));
  }, []);

  let x = ["nav-body"];
  if (scrolled) {
    x.push("scrolled");
  }
  //#endregion
  //#region đăng ký state

  //#endregion

  //#region  xử lý modal
  const handleLoginShow = (e) => {
    if (e) e.preventDefault();
    setModalShow(true);
    setregisterShow(false);
    setForgotShow(false);
    setAccessShow(false);
  };

  const handleRegisterShow = (e) => {
    if (e) e.preventDefault();
    setregisterShow(true);
    setModalShow(false);
    setForgotShow(false);
    setAccessShow(false);
  };
  //#endregion

  //#region //đăng nhập

  const [userName, setUsername] = useState("");
  const [passWord, setPassword] = useState("");

  const handlerLogout = () => {
    setIsLogin("inline-flex");
    setShowUser("none");
    props.fetchLogout();
    localStorage.removeItem("cartList");
    setPassword("");
    setUsername("");
    history.push("/");
  };
  //#endregion

  //#region Kích hoạt tài khoản

  const handleAccessCode = (e) => {
    if (e) e.preventDefault();
    setModalShow(false);
    setregisterShow(false);
    setForgotShow(false);
    setAccessShow(true);
  };

  //#endregion

  //#region region Quên mật khẩu

  const handleForgotPass = (e) => {
    if (e) e.preventDefault();
    setModalShow(false);
    setregisterShow(false);
    setAccessShow(false);
    setForgotShow(true);
  };

  //#endregion

  return (
    <CCard className="header mb-0   border-bottom-0">
      <ToastContainer />
      <CNavbar
        style={{ backgroundColor: "black" }}
        className="navbar  navbar-expand-md text-light pt-0 pb-0 pa"
      >
        <TopHeader
          handleAccessCode={handleAccessCode}
          handleLoginShow={handleLoginShow}
          handleRegisterShow={handleRegisterShow}
          showUser={showUser}
          showName={showName}
          userImage={userInfo.image}
          handlerLogout={handlerLogout}
          isLogin={isLogin}
        />
      </CNavbar>

      <CNavbar className="hide-navbar">
        <img
          className="logo-hide"
          src={Logo}
          alt="Shop logo"
          onClick={(e) => fetchProduct(null, null)}
        ></img>
      </CNavbar>

      <CCardBody className={x.join(" ")} style={{ padding: "0" }}>
        <CateHeader />
      </CCardBody>

      <nav className="NavbarItems">
        <SearchBar />
        <div className="shopping-cart-1">
          <Cart />
        </div>
      </nav>
      <CBreadcrumbRouter
        className="border-0 c-subheader-nav ml-3 px-0 px-md-5"
        routes={modifyRoutes(routes)}
      />

      {/* form đăng nhập */}
      <Login
        modalShow={modalShow}
        handleLoginClose={handleLoginClose}
        handleForgotPass={handleForgotPass}
        setModalShow={setModalShow}
        updateHeader={updateHeader}
        setIsLogin={setIsLogin}
        setShowUser={setShowUser}
        setShowName={setShowName}
        setModalShow={setModalShow}
        setUsername={setUsername}
        setPassword={setPassword}
        userName={userName}
        passWord={passWord}
        handleRegisterShow={handleRegisterShow}
      />

      {/* form đăng ký */}
      <Register
        handleLoginShow={handleLoginShow}
        handleRegisterClose={handleRegisterClose}
        registerShow={registerShow}
        handleLoginShow={handleLoginShow}
      />
      {/* Kích hoạt tài khoản */}
      <ActivateAccount
        accessShow={accessShow}
        handleAccessClose={handleAccessClose}
      />

      {/* 
      Quên mật khẩu */}

      <ForgotPassword
        forgotShow={forgotShow}
        handleFogotClose={handleFogotClose}
      />
    </CCard>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.CategoryList.cates,
    userInfo: state.UserInfo,
  };
};
const mapDispatchToPro = (dispatch) => {
  return {
    fetchProducts: (products) => {
      dispatch(actFetchProducts(products));
    },
    fetchUserInfo: (user) => {
      dispatch(actFetchUser(user));
    },
    fetchCate: (cates) => {
      dispatch(actFetchCates(cates));
    },
    fetchLogout: () => {
      dispatch(logout());
    },
  };
};

const CombineHeader = withRouter(Header);
export default connect(mapStateToProps, mapDispatchToPro)(CombineHeader);
