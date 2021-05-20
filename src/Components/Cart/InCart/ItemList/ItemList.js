// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import CartItem from "../CartItem/CartItem";
// import orderApi from "./../../../../api/orderApi";
// import cartApi from "./../../../../api/cartApi";
// import { getNumberInCart } from "./../../../../actions/cartAction";
// import { connect } from "react-redux";
// import { Collapse, CardBody, Card, Col, Button, Row } from "reactstrap";
// // import logo_Paypal from "../../../../assets/icons/paypal.jpg";
// // import logo_Momo from "../../../../assets/icons/logo_momo.png";
// import { formatMoney } from "./../../../../functions/formatMoney";

// const ItemList = (props) => {
//   const { total } = props;
//   // const [color_Size_ProductId, setColor_Size_ProductId] = useState();
//   // const [quantity, setQuantity] = useState();
//   // const [orderDetailVMs,setOrderDetailVMs]=useState();
//   // const [listProduct, setListProduct]= useState();
//   // const [typePayment, setTypePayment] = useState();
//   const [checkOnline, setCheckOnline] = useState(false);
//   const [checkOffline, setCheckOffline] = useState(true);
//   const [typePayment,setTypePayment]=useState("Tiền mặt");
// const {AuthToken} = props;
//   const handleCheck = (e,Online, Offline) => {
//     setCheckOnline(Online);
//     setCheckOffline(Offline);
//     setTypePayment(e.target.value);
//   };

//   const updateCartInRedux = async () => {
//     if(AuthToken.isLoggedIn === true){
//     const itemInCarts = await cartApi.getItemCart(
//       localStorage.getItem("cusID")
//     );
//     props.fetchCart(itemInCarts);
//     }
//   };

//   const handleOrder = () => {
//     if(AuthToken.isLoggedIn  === true){
//     const data = {
//       customerId: "",
//       typePayment,
//       orderDetailVMs: [],
//     };

//     data.customerId = AuthToken.cusID;
//     props.children.forEach((element) => {
//       const item2 = JSON.parse(localStorage.getItem("cartList")).map(order => [{Size_ProductId: order.color_Size_ProductId ,quantity: order.quantity}])
//       const item = {
//         color_Size_ProductId: 0,
//         quantity: 0,
//       };
//       item.color_Size_ProductId = element.props.itemCart.colorSizeProductId;
//       item.quantity = element.props.itemCart.quantity;
//       data.orderDetailVMs = [...data.orderDetailVMs, item2];
//     });
//     orderApi
//       .createOrder(data)
//       .then((res) => {
//         alert("Đặt hàng " + res.message);
//         //update cart in redux
//         updateCartInRedux();
//       })
//       .catch((error) => alert(error.response.data));
//     }
//   };
//   return (
//     <div>
//       <h4>Chi tiết sản phẩm trong giỏ hàng</h4>
//       <table className="table table-cart">
//         {props.children}
//         <tbody>
//           <tr>
//             <td colSpan={2} className="text-right">
//               Phí vận chuyển:
//             </td>
//             <td colSpan={2}>
//               <span className="error-desc" style={{ display: "none" }} />
//               <input type="hidden" name="ShippingFee" defaultValue={0} />
//               <b>0</b> <span>đ</span>
//             </td>
//           </tr>
//           <tr>
//             <td colSpan={2} className="text-right">
//               Tổng cộng:
//             </td>
//             <td colSpan={2}>
//               <b>{formatMoney(total)}</b> <span>đ</span>
//             </td>
//           </tr>
//         </tbody>
//       </table>

//       <hr />

//       <Row>
//         <Col lg="6">
//           <h5 style={{fontWeight: "bold"}}>Chọn hình thức thanh toán:</h5>
//         </Col>
//         <Col lg="3">
//           <input checked={checkOnline} type="radio" value="Online" onChange={e=>handleCheck(e,true,false)}/>
//           Online
//         </Col>
//         <Col lg="3">
//           <input checked={checkOffline}  type="radio" value="Tiền mặt" onChange={e=>handleCheck(e,false,true)}/>
//           Tiền mặt
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <a className="btn btn-cart-continue">
//             <Link to="/" style={{ textDecoration: "none", color: "black" }}>
//               Tiếp tục mua sắm
//             </Link>
//           </a>
//         </Col>
//         <Col>
//           <a
//             className="btn btn-cart-payment"
//             type="button"
//             onClick={handleOrder}
//           >
//             Đặt hàng
//           </a>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchCart: (carts) => {
//       dispatch(getNumberInCart(carts));
//     },
//   };
// };
// export default connect(null, mapDispatchToProps)(ItemList);

import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import orderApi from "./../../../../api/orderApi";
import jwt_decode from "jwt-decode";
import cartApi from "./../../../../api/cartApi";
import { getNumberInCart } from "./../../../../actions/cartAction";
import { connect } from "react-redux";
import { Collapse, CardBody, Card, Col, Button, Row } from "reactstrap";
// import logo_Paypal from "../../../../assets/icons/paypal.jpg";
// import logo_Momo from "../../../../assets/icons/logo_momo.png";
import { formatMoney } from "./../../../../functions/formatMoney";

const ItemList = (props) => {
  const { total,AuthToken } = props;
  console.log(AuthToken)
  // const [color_Size_ProductId, setColor_Size_ProductId] = useState();
  // const [quantity, setQuantity] = useState();
  // const [orderDetailVMs,setOrderDetailVMs]=useState();
  // const [listProduct, setListProduct]= useState();
  // const [typePayment, setTypePayment] = useState();
  const [checkOnline, setCheckOnline] = useState(false);
  const [checkOffline, setCheckOffline] = useState(true);
  const [typePayment,setTypePayment]=useState("Tiền mặt");

  const handleCheck = (e,Online, Offline) => {
    setCheckOnline(Online);
    setCheckOffline(Offline);
    setTypePayment(e.target.value);
  };

  const updateCartInRedux = async () => {
    const itemInCarts = await cartApi.getItemCart(
      // jwt_decode(localStorage.getItem("usertoken")).sub[1]
      AuthToken.cusID
    );
    props.fetchCart(itemInCarts);
  };

  const handleOrder = () => {
    // const user = jwt_decode(localStorage.getItem("usertoken"));
    const data = {
      customerId: "",
      typePayment,
      orderDetailVMs: [],
    };

    // data.customerId = user.sub[1];
    data.customerId = AuthToken.cusID;
    props.children.forEach((element) => {
      const item = {
        color_Size_ProductId: 0,
        quantity: 0,
      };
      item.color_Size_ProductId = element.props.itemCart.colorSizeProductId;
      item.quantity = element.props.itemCart.quantity;
      data.orderDetailVMs = [...data.orderDetailVMs, item];
    });
    orderApi
      .createOrder(data)
      .then((res) => {
        alert("Đặt hàng " + res.message);
        //update cart in redux
        updateCartInRedux();
      })
      .catch((error) => alert(error.response.data));
  };
console.log(typePayment)
  return (
    <div>
      <h4>Chi tiết sản phẩm trong giỏ hàng</h4>
      <table className="table table-cart">
        {props.children}
        <tbody>
          <tr>
            <td colSpan={2} className="text-right">
              Phí vận chuyển:
            </td>
            <td colSpan={2}>
              <span className="error-desc" style={{ display: "none" }} />
              <input type="hidden" name="ShippingFee" defaultValue={0} />
              <b>0</b> <span>đ</span>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="text-right">
              Tổng cộng:
            </td>
            <td colSpan={2}>
              <b>{formatMoney(total)}</b> <span>đ</span>
            </td>
          </tr>
        </tbody>
      </table>

      <hr />

      <Row>
        <Col lg="6">
          <h5 style={{fontWeight: "bold"}}>Chọn hình thức thanh toán:</h5>
        </Col>
        <Col lg="3">
          <input checked={checkOnline} type="radio" value="Online" onChange={e=>handleCheck(e,true,false)}/>
          Online
        </Col>
        <Col lg="3">
          <input checked={checkOffline}  type="radio" value="Tiền mặt" onChange={e=>handleCheck(e,false,true)}/>
          Tiền mặt
        </Col>
      </Row>
      <Row>
        <Col>
          <a className="btn btn-cart-continue">
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              Tiếp tục mua sắm
            </Link>
          </a>
        </Col>
        <Col>
          <a
            className="btn btn-cart-payment"
            type="button"
            onClick={handleOrder}
          >
            Đặt hàng
          </a>
        </Col>
      </Row>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
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
export default connect(mapStateToProps, mapDispatchToPro)(ItemList);
