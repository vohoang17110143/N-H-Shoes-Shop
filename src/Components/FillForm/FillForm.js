import React, { useState, useEffect } from "react";
import "./FillForm.css";
import { connect } from "react-redux";
import { actFetchUser } from "./../../actions/loginAction";
// import Autocomplete from "react-google-autocomplete";

const FillForm = (props) => {
  const { userInfo } = props;
  // const API_KEY = "AIzaSyAV235BA8lubinIemH740hNBT3Xj687iEk";
  // const [place, setPlace] = useState([]);
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     setPlace(position.coords.latitude);
  //   });
  // }, []);
  return (
    <div>
      <h4>Thông tin người mua/nhận hàng</h4>
      <div className="form-group">
        <input
          placeholder="Họ và tên"
          className="form-control "
          size={30}
          maxLength={150}
          type="text"
          value={userInfo.name}
          readOnly
        />
      </div>
      <div className="form-group">
        <input
          placeholder="Số điện thoại"
          className="form-control"
          size={30}
          maxLength={11}
          type="text"
          value={userInfo.phoneNumber}
          readOnly
        />
      </div>
      <div className="form-group">
        <textarea
          rows={5}
          cols={20}
          placeholder="Ghi chú"
          className="form-control"
          maxLength={500}
          type="text"
          name="Notes"
          value={userInfo.address}
          readOnly
        />
      </div>
      {/* <Autocomplete
        apiKey={API_KEY}
        onPlaceSelected={(place) => {
          console.log(place)
        }}
      />
       */}
    </div>
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
export default connect(mapStateToProps, mapDispatchToPro)(FillForm);
