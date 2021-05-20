import React from "react";
import InCart from "./InCart/InCart";
import { Fragment } from "react";
import { connect } from "react-redux";
import EmtyCart from "../../assets/icons/empty-bags.jpg";
import "./ShowCart.css";
import { Link } from "react-router-dom";

const ShowCart = (props) => {
  // function ShowCart(props){
  const { carts, AuthToken } = props;
  console.log(carts.length);
  console.log(AuthToken);
  // const count = JSON.parse(localStorage.getItem('cartList')) !== null ? JSON.parse(localStorage.getItem('cartList')).length : 0;
  // if (count > 0 && localStorage.getItem("isLoggedIn") === 'true') {
  //   return (
  //     <Fragment>
  //       <InCart />
  //     </Fragment>
  //   );
  // }

  return (
    <Fragment>
      {carts.length > 0 && AuthToken.isLoggedIn === true ? (
        <InCart carts={carts}/>
      ) : (
        <div>
          <div className="empty-cart">
            <img className="empty-img" alt="empty-bags" src={EmtyCart}></img>
            <Link to="/" className="btn btn-continue">
              {" "}
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      )}
    </Fragment>
    //  {(carts.length>0 && )}
    //   <div>
    //     <div className="empty-cart">
    //       <img className="empty-img" alt="empty-bags" src={EmtyCart}></img>
    //       <Link to="/" className="btn btn-continue">
    //         {" "}
    //         Tiếp tục mua sắm
    //       </Link>
    //     </div>
    //   </div>
  );
};

const mapStateToProps = (state) => {
  return {
    carts: state.CartList,
    AuthToken: state.AuthToken,
  };
};

export default connect(mapStateToProps)(ShowCart);
// export default ShowCart;
