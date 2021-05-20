import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { actFetchOrder } from "./../../../actions/orderAction";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import orderApi from "./../../../api/orderApi";
import SidebarMenu from "./../Menu/Sidebar/SidebarMenu";
import { actFetchUser } from './../../../actions/loginAction';
import {

  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
} from "@coreui/react";
import authApi from './../../../api/authApi';
import decode from "jwt-decode";

const ChangePassword = (props) => {
  const {userInfo} = props;
  const [message,setMessage] =useState();
  const [stateReadonly,setStateReadonly]=useState(true);
  const [passwordNew,setPasswordNew]=useState("");
  const [hiddenButton,setHiddenButton]=useState(true);
  // comfirm old password
  const confirmPassword=(e)=>{
    authApi.confirmPassword(userInfo.customerId,{password:e.target.value})
      .then(res=>{
        if(!res){
          setMessage("Password cũ không đúng!");
          setStateReadonly(true);
          setHiddenButton(true);
        }else{
          setMessage("");
          setStateReadonly(false);
        }
      });  
  };
  // set new password
  const handlePassword=(e)=>{
    if(e.target.value!=="" && e.target.value.length>=8){
      setHiddenButton(false);
      setPasswordNew(e.target.value);
    }else{
      setHiddenButton(true);
      setPasswordNew("");
    }

  };
  // change password
  const changePassword =()=>{
    var accountId = decode(localStorage.getItem("usertoken")).sub[3];
    authApi.updateAccount(accountId,{password:passwordNew})
    .then(res=>{
      toast.success("Đổi mật khẩu thành công !")
    })
    .catch(err=>
      {
        toast.error("Đổi mật khẩu thất bại vui lòng kiểm tra lại !")
      })
  };

  console.log(userInfo)
  return (
    <CCard style={{width: "90%"}}>
        <CCardHeader>
          <h5>Đổi mật khẩu</h5>
        </CCardHeader>

        <CCardBody>
          <CForm className="form-horizontal">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="phase1 ">
                <CFormGroup row>
                  <CLabel sm="5" col htmlFor="input-normal">
                    Mật khẩu cũ:{" "}
                  </CLabel>
                  <CCol sm="6">
                    <CInput
                      style={{ width: "250px" }}
                      maxLength={30}
                      type="password"
                      id="input-normal"
                      name="input-normal"
                      className="input-lg"
                      placeholder="Mật khẩu cũ"
                      onChange={confirmPassword}
                    />
                     <span style={{color: "red" }}>{message}</span>
                  </CCol>
                 
                </CFormGroup>

                <CFormGroup row>
                  <CLabel sm="5" col htmlFor="input-normal">
                    Mật khẩu mới:{" "}
                  </CLabel>
                  <CCol sm="6">
                    <CInput
                      style={{ width: "250px" }}
                      maxLength={30}
                      type="password"
                      id="input-normal"
                      name="input-normal"
                      className="input-lg"
                      placeholder="Mật khẩu mới"
                      readOnly={stateReadonly}
                      onChange={handlePassword}
                    />
                  </CCol>
                </CFormGroup>
              </div>
            </div>
          </CForm>
        </CCardBody>
        <CButton type="button" color="warning" onClick={changePassword} hidden={hiddenButton}>
          Đổi mật khẩu
        </CButton>
      </CCard>

  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.UserInfo,
  };
};

const mapDispatchToPro = (dispatch) => {
  return {
    fetchUserInfo: (user) => {
      dispatch(actFetchUser(user));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToPro) (ChangePassword);

