import React, { useEffect } from "react";
import FillForm from "./../../FillForm/FillForm";
import ItemList from "./ItemList/ItemList";
import { getNumberInCart } from "./../../../actions/cartAction";
import cartApi from "./../../../api/cartApi";
import jwt_decode from "jwt-decode";
import CardItem from "./CartItem/CartItem";
import { connect } from "react-redux";
import "./InCart.css";
const InCart = (props) => {
  const { carts } = props;
  console.log(carts)
  // const { carts,AuthToken } = props;
  // const cartGet = JSON.parse(localStorage.getItem("cartList"));
  // const loadData = async () => {
  //   if(localStorage.getItem("isLoggedIn") === 'true'){
  //     var resultList = await cartApi.getItemCart(
  //       localStorage.getItem("cusID")
  //     );
  //     props.fetchCart(resultList);
  //   }
  
  // };

  // useEffect(() => {
  //   loadData();
  // }, []);

  const showItem = (items) => {
    var result = null;
    if (items.length > 0) {
      result = items.map((item, index) => {
        return <CardItem itemCart={item} key={index} index={index} />;
      });
    }
    return result;
  };

  var quantity = 0;
  var price = 0;
  var myTotal = 0;
  for (var i = 0, len = carts.length; i < len; i++) {
    quantity = carts.map((quantity) => quantity.quantity)[i];
    price = carts.map((price) => price.price)[i];
    myTotal += quantity * price;
  }
  return (
    <section style={{ background: "white" }}>
      <div className="container-fuid clearfix mt-0 pb-5">
        <form>
          <div className="row">
            <div className="col-md-5">
              <FillForm />
            </div>
            <div className="col-md-7">
              <ItemList total={myTotal}>{showItem(carts)}</ItemList>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  // return {
  //   carts: state.CartList,
  //   AuthToken: state.AuthToken,
  // };
};

const mapDispatchToPro = (dispatch) => {
  // return {
  //   fetchCart: (carts) => {
  //     dispatch(getNumberInCart(carts));
  //   },
  // };
};

// export default connect(mapStateToProps, mapDispatchToPro)(InCart);
export default InCart;