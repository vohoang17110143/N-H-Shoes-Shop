import React, { useState, useEffect } from "react";
import "./UserComment.css";

import jwt_decode from "jwt-decode";
import ImageAvatar from "../../../../assets/image/avatar-default.png";
import ratingApi from "./../../../../api/ratingApi";
import commentApi from "./../../../../api/commentApi";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { ConsoleLogger } from "@microsoft/signalr/dist/esm/Utils";
import StarRatingComponent from "react-star-rating-component";
import { connect } from 'react-redux';

const UserComment = (props) => {
  const {userInfo,AuthToken}=props;
  console.log(userInfo)
  const [star, setStar] = useState();
  const [content, setContent] = useState("");
  const ratingChanged = (nextValue) => {
    if(localStorage.getItem("isLoggedIn") === 'true'){
    ratingApi
      .createRate({
        ProductId: props.productId,
        CustomerId: localStorage.getItem("cusID") ,
        star: nextValue,
      })
      .then((res) => {})
      .catch((err) => alert(err));
    }
    setStar(nextValue);
  };
  const loadRateUser = () => {
    if(localStorage.getItem("isLoggedIn") === 'true'){
    ratingApi
      .GetRatingByCustomerId(
        props.productId,
        localStorage.getItem("cusID") 
      )
      .then((res) => {
        setStar(res.star);
      })
      .catch((err) => alert(err));
    }
  };

  useEffect(() => {
    loadRateUser();
  }, [star]);
  const handleSubmit = (event) => {
    event.preventDefault(); // prevents page from reloading on submit
    commentApi
      .CreateComment({
        content,
        ProductId: props.productId,
        CustomerId: localStorage.getItem("cusID") ,
        parentid: 0,
      })
      .then((res) => {})
      .catch((err) => alert(err));
  };
  return (
    <div className="comment-box">
      <form onSubmit={handleSubmit}>
        <div className="comment-form-fields">
          <img
            src={userInfo.image}
            style={{ width: "45px", height: "45px", marginRight: "10px"}}
          />

          <input
            value={jwt_decode(AuthToken.token).sub[0]}
            readOnly
          ></input>
          <div className="star-user-rating">
            <StarRatingComponent
              name="rate"
              starCount={5}
              value={star}
              onStarClick={ratingChanged}
            />
          </div>
          <br />
          <textarea
            placeholder="Bình luận của bạn ..."
            rows="3"
            required
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="comment-form-actions">
          <button style={{ backgroundColor: "greenyellow" }} type="submit">
            Đăng bình luận
          </button>
        </div>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userInfo: state.UserInfo,
    AuthToken: state.AuthToken
  };
};

export default connect(mapStateToProps)(UserComment);

