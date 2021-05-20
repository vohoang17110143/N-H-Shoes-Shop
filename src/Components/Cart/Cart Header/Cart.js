import React, { Fragment, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Cart.css";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getNumberInCart } from "../../../actions/cartAction";
import cartApi from "./../../../api/cartApi";
import jwt_decode from "jwt-decode";

function Cart(props) {
  const { carts, AuthToken } = props;
  console.log(carts);
  console.log(AuthToken );
  const loadData = async () => {
    // load shopping cart into redux
  if(AuthToken.isLoggedIn === true){
    var ItemList = await cartApi.getItemCart(AuthToken.cusID);
    console.log(ItemList);
    props.fetchCart(ItemList);
  }
  };
  // const numberItemInCart = () => {
  //   var incart = 0;
  //   if (JSON.parse(localStorage.getItem("cartList")) !== null) {
  //     incart = JSON.parse(localStorage.getItem("cartList")).length || 0;
  //   }
  //   return incart;
  // };
  const numberItemInCart = (carts) => {
    var quantityItem = 0;
    carts.forEach((cart) => {
      quantityItem += cart.quantity;
    });
    return quantityItem;
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Fragment>
      <Link className="cart-icon" to="/cart">
        <FontAwesomeIcon
          style={{ fontSize: 25, cursor: "pointer" }}
          icon={faShoppingCart}
        />
      </Link>

      <span className="inCart-number">{AuthToken.isLoggedIn===true?numberItemInCart(carts):0}</span>
    </Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    carts: state.CartList,
    AuthToken: state.AuthToken,
  };
};

const mapDispatchToPro = (dispatch) => {
  return {
    fetchCart: (carts) => {
      dispatch(getNumberInCart(carts));
    },
  };
};
export default connect(mapStateToProps,mapDispatchToPro)(Cart);
