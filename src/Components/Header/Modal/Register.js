import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authApi from './../../../api/authApi';

const Register = (props) => {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});

    const {handleLoginShow} =props;
    const {handleRegisterClose} =props;
    const {registerShow} = props;

    const closeNotify = ()=>{
      setFormErrors({});
    }

    const onchangeName = (e) => {
        setName(e.target.value);
      };
    
    
      const onchangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
      };
    
      const onchangeEmail = (e) => {
        setEmail(e.target.value);
      };
      const onchangePass = (e) => {
        setPass(e.target.value);
      };
    
      const onchangeConfirmPass = (e) => {
        setConfirmPassword(e.target.value);
      };

      const onRegisterForm = async (event) => {
        event.preventDefault();
        let errors = {};

    
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (email === "") {
          errors.email = "*Không được để trống";
        } else if (!regex.test(email)) {
          errors.email = "*Email không phù hợp";
        }
        if (pass === "") {
          errors.password = "*Mật khẩu không thể trống";
        } else if (pass.length < 4) {
          errors.password = "*Mật khẩu không thể ít hơn 4 ký tự";
        } else if (pass.length > 20) {
          errors.password = "*Mật khẩu không thể nhiều hơn 20 ký tự";
        }
        if (name === "") {
          errors.username = "*Không được để trống";
        } else if (name.length < 4) {
          errors.username = "*Tên người dùng không thể ít hơn 4 ký tự";
        } else if (name.length > 20) {
          errors.username = "*Tên người dùng không thể nhiều hơn 20 ký tự";
        }
    
        if (phoneNumber === "") {
          errors.phoneNumber = "*Không được để trống";
        } else if (phoneNumber.length < 9) {
          errors.phoneNumber = "*Số điện thoại không thể ít hơn 9 số";
        } else if (phoneNumber.length > 11) {
          errors.phoneNumber = "*Số điện thoại không thể nhiều hơn 11 số";
        }
    
        if (confirmPassword === "") {
          errors.confirmPass = "*Không được để trống";
        } else if (confirmPassword != pass) {
          errors.confirmPass = "*Xác thực mật khẩu không đúng !";
        }
    
        setFormErrors(errors);
     
        if (Object.keys(errors).length == 0) {
          var bodyFormData = new FormData();
          bodyFormData.append("name", name);
          bodyFormData.append("phonenumber", phoneNumber);
          bodyFormData.append("email", email);
          bodyFormData.append("password", pass);
          await authApi.Register(bodyFormData).then(res => {   
          toast.success("Đăng ký thành công !");
          handleRegisterClose();} ).catch(err => {toast.error("Tài khoản đã tồn tại !");});
  
        } else {
          console.log("error");
        }
      };
    

    return (
        <Modal
        show={registerShow}
        onHide={() => {
          handleRegisterClose();
          closeNotify();
        }}
     
        backdrop="static"
        keyboard={false}
      >
        <div className="card bg-light" style={{ marginBottom: "0" }}>
          <Modal.Header closeButton style={{ textAlign: "center" }}>
            {" "}
            <h4 className="text-center">Create Account</h4>
          </Modal.Header>
          <article className="card-body  mx-auto" style={{ width: "400px" }}>
            <p>
              <a
                href="#"
                className="btn btn-block btn-twitter"
                style={{ color: "white" }}
              >
                {" "}
                <i className="fab fa-twitter" /> &nbsp; Login via Twitter
              </a>
              <a
                href="#"
                className="btn btn-block btn-facebook"
                style={{ color: "white" }}
              >
                {" "}
                <i className="fab fa-facebook-f" /> &nbsp; Login via facebook
              </a>
            </p>
            <p className="divider-text">
              <span className="bg-light" style={{ color: "black" }}>
                OR
              </span>
            </p>
            <form>
              <span className="errMessage">{formErrors.username}</span>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-user" />{" "}
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Tên người dùng"
                  type="text"
                  onChange={onchangeName}
                />
              </div>
              <span className="errMessage">{formErrors.email}</span>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-envelope" />{" "}
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Địa chỉ Email"
                  type="email"
                  onChange={onchangeEmail}
                />
              </div>
              <span className="errMessage">{formErrors.phoneNumber}</span>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-phone" />{" "}
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Số điện thoại"
                  type="text"
                  onChange={onchangePhoneNumber}
                />
              </div>
            

            
              <span className="errMessage">{formErrors.password}</span>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-lock" />{" "}
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Tạo mật khẩu"
                  type="password"
                  onChange={onchangePass}
                />
              </div>
              <span className="errMessage">{formErrors.confirmPass}</span>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-lock" />{" "}
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Nhập lại mật khẩu"
                  type="password"
                  onChange={onchangeConfirmPass}
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={onRegisterForm}
                >
                  Đăng ký
                </button>
              </div>
              <p className="text-center">
                Bạn đã có tài khoản?{" "}
                <a href="#" onClick={() => {handleLoginShow(null, 0);closeNotify();}}>
  
                  Đăng nhập ngay
                </a>
              </p>
            </form>
          </article>
        </div>
      </Modal>

    )
}

export default Register
