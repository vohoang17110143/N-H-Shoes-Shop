import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import SidebarMenu from "../Menu/Sidebar/SidebarMenu";
import "./userDetail.css";
import { actFetchUser } from "../../../actions/loginAction";
import authApi from "./../../../api/authApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imageToBase64 from "image-to-base64/browser";
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
  CRow,
  CTextarea,
} from "@coreui/react";
import { string } from "prop-types";

const UserDetail = (props) => {
  const tokentInfo = jwt_decode(localStorage.getItem("usertoken"));
  const { userInfo } = props;
  let nameDefault = userInfo.name;
  let phoneDefault = userInfo.phoneNumber;
  let emailDefault = userInfo.email;
  let birthdayDefault = userInfo.birthDay;
  let imageDefault = userInfo.image;
  let addressDefault = userInfo.address;
  const [PreviewImage, setPreviewImage] = useState(userInfo.image);
  const [formErrors, setFormErrors] = useState({});
  const [UpdateData, setUpdateData] = useState({
    name: "",
    birthday: "",
    phoneNumber: "",
    email: "",
    image: null,
    address: "",
  });
  const updateUserInfo = async () => {
    var data = await authApi.getUserInfo(
      localStorage.getItem("cusID") 
    );
    props.fetchUserInfo(data);
  };

  useEffect(() => {
    updateUserInfo();
  }, []);

  const onChangeName = (e) => {
    if (e.target.value === "") {
      setUpdateData({ ...UpdateData, name: nameDefault });
    }
    setUpdateData({ ...UpdateData, name: e.target.value });
  };
  const onChangPhone = (e) => {
    if (e.target.value === "") {
      setUpdateData({ ...UpdateData, phoneNumber: phoneDefault });
    }
    setUpdateData({ ...UpdateData, phoneNumber: e.target.value });
  };
  const onChangEmail = (e) => {
    if (e.target.value === "") {
      setUpdateData({ ...UpdateData, email: emailDefault });
    }

    setUpdateData({ ...UpdateData, email: e.target.value });
  };
  const onchangeBirthday = (e) => {
    if (e === "") {
      setUpdateData({ ...UpdateData, birthday: birthdayDefault });
    }
    setUpdateData({ ...UpdateData, birthday: e.target.value });
  };
  const onchangeAddress = (e) => {
    if (e === "") {
      setUpdateData({ ...UpdateData, address: addressDefault });
    }
    setUpdateData({ ...UpdateData, address: e.target.value });
  };
  const onChangImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewImage(reader.result);
        setUpdateData({ ...UpdateData, image: reader.result });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
    // setImage(e.target.files[0]);
  };

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  if (
    UpdateData.image === null &&
    imageDefault !== "https://localhost:5001/wwwroot/avatars/avatar-default.png"
  ) {
    imageToBase64(userInfo.image) // Path to the image
      .then((response) => {
        setUpdateData({
          ...UpdateData,
          image: `data:image/jpeg;base64,${response}`,
        });
      })
      .catch((error) => {
        console.log(error); // Logs an error if there was one
      });
  }

  if (UpdateData.email === "") {
    setUpdateData({ ...UpdateData, email: emailDefault });
  }

  if (UpdateData.name === "") {
    setUpdateData({ ...UpdateData, name: nameDefault });
  }

  if (UpdateData.phoneNumber === "") {
    setUpdateData({ ...UpdateData, phoneNumber: phoneDefault });
  }
  if (UpdateData.birthday === "") {
    setUpdateData({ ...UpdateData, birthday: birthdayDefault });
  }

  const onUpdateUser = async (event) => {
    let errors = {};

    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(UpdateData.email)) {
      errors.email = "*Email không phù hợp";
    }
    if (UpdateData.name.length < 4) {
      errors.username = "*Tên người dùng không thể ít hơn 4 ký tự";
    }

    if (UpdateData.phoneNumber.length < 9) {
      errors.phoneNumber = "*Số điện thoại không thể ít hơn 9 số";
    } else if (UpdateData.phoneNumber.length > 11) {
      errors.phoneNumber = "*Số điện thoại không thể nhiều hơn 11 số";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length == 0) {
      await authApi
        .updateUserInfo(userInfo.customerId, UpdateData)
        .then((res) => {
          updateUserInfo();
          toast.success("Cập nhật thành công !");
        })
        .catch((error) => {
          toast.error("Email đã được sử dụng !");
        });
    }
  };
  const onUpdateSocial=()=>{
    authApi.editCustomerSocial(userInfo.customerId,UpdateData)
    .then(res=>alert(res.message))
    .catch(err=>alert(err))
  }
  return (
    <CCard style={{ width: "90%" }}>
      <ToastContainer />
      <CCardHeader>
        <h5>Thông tin tài khoản</h5>
      </CCardHeader>

      <CCardBody>
        <CForm className="form-horizontal">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="phase1 ml-5">
              <span style={{ color: "red", marginLeft: "13em" }}>
                {formErrors.username}
              </span>
              <br />
              <CFormGroup row>
                <CLabel sm="5" col htmlFor="input-normal">
                  Họ và tên:
                </CLabel>
                <CCol sm="6">
                  <CInput
                    style={{ width: "250px" }}
                    maxLength={30}
                    defaultValue={userInfo.name}
                    onChange={onChangeName}
                    type="text"
                    id="input-normal"
                    name="input-normal"
                    placeholder="Tên người dùng"
                    disabled={tokentInfo.sub[4] == "facebook" ? true : false}
                  />
                </CCol>
              </CFormGroup>

              <span style={{ color: "red", marginLeft: "13em" }}>
                {formErrors.phoneNumber}
              </span>
              <CFormGroup row>
                <CLabel sm="5" col htmlFor="input-normal">
                  Số điện thoại:
                </CLabel>
                <CCol sm="6">
                  <CInput
                    style={{ width: "250px" }}
                    maxLength={11}
                    defaultValue={userInfo.phoneNumber}
                    onChange={onChangPhone}
                    type="number"
                    id="input-normal"
                    name="input-normal"
                    placeholder="Số điện thoại"
                  />
                </CCol>
              </CFormGroup>
              <span style={{ color: "red", marginLeft: "13em" }}>
                {formErrors.email}
              </span>
              <CFormGroup row>
                <CLabel sm="5" col htmlFor="input-normal">
                  Email:
                </CLabel>
                <CCol sm="6">
                  <CInput
                    style={{ width: "250px" }}
                    defaultValue={userInfo.email}
                    onChange={onChangEmail}
                    type="email"
                    id="input-normal"
                    name="input-normal"
                    placeholder="Email"
                    disabled={tokentInfo.sub[4] == "facebook" ? true : false}
                  />
                </CCol>
              </CFormGroup>
              {tokentInfo.sub[4] == "facebook" ? null : (
                <CFormGroup row>
                  <CLabel sm="5" col htmlFor="input-normal">
                    Ngày tháng năm sinh:
                  </CLabel>
                  <CCol sm="6">
                    <p>{formatDate(userInfo.birthDay)}</p>

                    <CInput
                      style={{ width: "250px" }}
                      onChange={onchangeBirthday}
                      type="date"
                      id="input-normal"
                      name="input-normal"
                      disabled={tokentInfo.sub[4] == "facebook" ? true : false}
                    />
                  </CCol>
                </CFormGroup>
              )}

              <CFormGroup row>
                <CLabel sm="5" col htmlFor="input-normal">
                  Địa chỉ:
                </CLabel>
                <CCol sm="6">
                  <CTextarea
                    style={{ width: "250px" }}
                    onChange={onchangeAddress}
                    type="text"
                    id="input-normal"
                    name="input-normal"
                    defaultValue={userInfo.address}
                  />
                </CCol>
              </CFormGroup>
            </div>
            <div className="phase2">
              <div className="img-holder">
                <img
                  src={PreviewImage}
                  alt=""
                  id="img"
                  className="img-preview"
                />
              </div>
             
              <CInput
                onChange={onChangImage}
                type="file"
                accept="image/*"
                name="image-upload"
                className="mt-3"
                id="input"
                disabled= {tokentInfo.sub[4] == "facebook" ? true : false}
              />
            </div>
          </div>
        </CForm>
      </CCardBody>
      <CButton type="button" color="warning" onClick={(tokentInfo.sub[4]=="facebook")?onUpdateSocial:onUpdateUser}>
        Cập nhật
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
export default connect(mapStateToProps, mapDispatchToPro)(UserDetail);
