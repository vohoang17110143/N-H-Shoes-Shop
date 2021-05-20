import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button } from "react-bootstrap";
import authApi from "./../../../../api/authApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import { CButton, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import "./Login.css";
import { LOGINLOG } from "../../../../actions/loginAction";
import { connect } from "react-redux";
import { getNumberInCart } from './../../../../actions/cartAction';
import cartApi from './../../../../api/cartApi';

const Login = (props) => {
  const { modalShow } = props;
  const { handleLoginClose } = props;
  const { handleForgotPass } = props;
  const { setModalShow } = props;
  const { updateHeader } = props;
  const { setIsLogin } = props;
  const { setShowUser } = props;
  const { setShowName } = props;
  const { setUsername } = props;
  const { setPassword } = props;
  const { userName } = props;
  const { passWord } = props;
  const { handleRegisterShow } = props;
  const [formErrors, setFormErrors] = useState({});
  const [socialAccountInfo, setSocialAccountInfo] = useState({});

  const onchangeUserName = (e) => {
    setUsername(e.target.value);
  };
  const onchangePassWord = (e) => {
    setPassword(e.target.value);
  };
  const closeNotify = () => {
    setFormErrors({});
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    let errors = {};

    if (passWord === "") {
      errors.password = "*Mật khẩu không thể trống";
    } else if (passWord.length < 4) {
      errors.password = "*Mật khẩu không thể ít hơn 4 ký tự";
    }
    if (userName === "") {
      errors.username = "*Tài khoản không thể trống";
    } else if (userName.length < 4) {
      errors.username = "*Tài khoản không thể ít hơn 4 ký tự";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length == 0) {
      await authApi
        .Login(userName, passWord)
        // .Login("thanhnhan", "12345678")
        .then((res) => {
          props.fetchLogin(res.value.token)
          updateHeader();
          setModalShow(false);
          setIsLogin("none");
          setShowUser("inline-flex");
          setShowName(jwt_decode(res.value.token).sub[0]);
          // store cartList on localStorage
          cartApi.getItemCart(jwt_decode(res.value.token).sub[1])
          .then(res=>{
            localStorage.setItem("cartList",JSON.stringify(res));
          })
          //
          
          
        })
        .catch((err) => {
          toast.error("Đăng nhập thất bại!");
          setModalShow(true);
          setShowName("");
          setFormErrors({ error: "Tài khoản hoặc mật khẩu không đúng !" });
        });
    } else {
      toast.error("Đăng nhập thất bại!");
      setModalShow(true);
    }
  };
  const responseFacebook = (response) => {
    socialAccountInfo.UserId = response.userID;
    socialAccountInfo.Name = response.name;
    socialAccountInfo.Image = response.picture.data.url;
    socialAccountInfo.Email = response.email;
    socialAccountInfo.TypeAuthen = response.graphDomain;
    setSocialAccountInfo(socialAccountInfo);
    // console.log(socialAccountInfo);
    authApi
      .loginSocialAccount(socialAccountInfo)
      .then((res) => {
        localStorage.setItem("usertoken", res.token);
        toast.success("Đăng nhập thành công!");
        updateHeader();
        setModalShow(false);
        setIsLogin("none");
        setShowUser("inline-flex");
        setShowName(response.name);
        localStorage.setItem("isLoggedIn", "true");
      })
      .catch((res) => alert("login:103"+res));
  };

  return (
    <Fragment>
      <Modal
        show={modalShow}
        onHide={() => {
          handleLoginClose();
          closeNotify();
        }}
        backdrop="static"
        keyboard={false}
      >
        <div className="login-form-1">
          <Modal.Header closeButton>
            <h3>
              Đăng nhập với trải nghiệm <span>Mới</span>
            </h3>
          </Modal.Header>
          <form>
            <div className="form-group">
              <span className="errMessage">{formErrors.username}</span>
              <span className="errMessage">{formErrors.error}</span>
              <input
                type="text"
                className="form-control"
                placeholder="Tài khoản *"
                onChange={onchangeUserName}
              />
            </div>
            <span className="errMessage">{formErrors.password}</span>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Mật khẩu *"
                onChange={onchangePassWord}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit"
                onClick={onFormSubmit}
              />
              <input
                type="button"
                className="btnCancel"
                value="Cancel"
                onClick={() => {
                  handleLoginClose();
                  closeNotify();
                }}
              />
            </div>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <FacebookLogin
                appId="799747224283062"
                fields="name,email,picture"
                callback={responseFacebook}
                icon="fa-facebook"
                redirectUri="/"
              />
              {/* <GoogleLogin
                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
                className="btnGoogle"
                buttonText="Login with google"
              /> */}
            </div>
            <div className="form-group ">
              <a
                href="#"
                className="ForgetPwd"
                onClick={() => {
                  handleForgotPass(null, 0);
                  closeNotify();
                }}
              >
                Quên mật khẩu?
              </a>
              <a
                href="#"
                className="Register"
                onClick={() => {
                  handleRegisterShow(null, 0);
                  closeNotify();
                }}
              >
                Đăng ký?
              </a>
            </div>
          </form>
        </div>
      </Modal>
    </Fragment>
  );
};

const mapDispatchToPro = (dispatch) => {
  return {
    fetchLogin: (token) => {
      dispatch(LOGINLOG(token))
    },
    // fetchCart: (carts) => {
    //   dispatch(getNumberInCart(carts));
    // }
  };
};
export default connect(null,mapDispatchToPro) (Login);
