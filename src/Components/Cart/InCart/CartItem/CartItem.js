// import React from "react";
// import "./CartItem.css";
// import cartApi from "./../../../../api/cartApi";
// import jwt_decode from "jwt-decode";
// import { getNumberInCart } from "./../../../../actions/cartAction";
// import { connect } from "react-redux";
// import { formatMoney } from "./../../../../functions/formatMoney";

// const CartItem = (props) => {
//   const { itemCart } = props;
//   const { index } = props;
//   const updateCartInRedux = async () => {
//     if(localStorage.getItem("isLoggedIn") === 'true'){
//     const itemInCarts = await cartApi.getItemCart(
//       localStorage.getItem("cusID") 
//     );
//     props.fetchCart(itemInCarts);
//     }
//   };

//   const changeQuantity = async (e,id, productName,colorName,price,size,Nimage ,colosizeID) => {
//     const cartList = JSON.parse(localStorage.getItem("cartList")) || [];
//     cartList.splice(index,1, {
//       id: id,
//       product_Name: productName,
//       size_Number: size,
//       price: price,
//       quantity: e.target.value,
//       color_Name: colorName,
//       image: Nimage,
//       color_Size_ProductId :colosizeID
//     });
//     localStorage.setItem("cartList", JSON.stringify(cartList))
//     // await cartApi.updateItem(id, { quantity: e.target.value });
//     updateCartInRedux();
//   };

//   const deleteProduct = async (e, id) => {
//     e.preventDefault();
//     const cartList = JSON.parse(localStorage.getItem("cartList")) || [];
//     if (index !== -1) {
//       cartList.splice(index, 1);
//     }
//     //remove item from cart
//     localStorage.setItem("cartList", JSON.stringify(cartList))
//     // await cartApi.removeItem(id);
//     updateCartInRedux();
//   };
//   return (
//     <tbody>
//       <tr key={itemCart.id}>
//         <td>
//           <img
//             src={itemCart.image}
//             width={80}
//             height={80}
//             style={{ objectFit: "contain" }}
//             alt="Product"
//           />
//         </td>
//         <td>
//           <p>{itemCart.product_Name}</p>
//           <span>{itemCart.color_Name}</span>,<span>{itemCart.size_Number}</span>
//         </td>
//         <td style={{ width: "220px" }}>
//           <div>
//             <span>{formatMoney(itemCart.price)} (đ)</span> *
//           </div>
//           <div>
//             <table>
//               <tbody>
//                 <tr>
//                   <td>
//                     <input
//                       type="number"
//                       className="form-control input-text-cart"
//                       defaultValue={itemCart.quantity}
//                       onChange={(e) =>
//                         changeQuantity(
//                           e,
//                           itemCart.id,
//                           itemCart.product_Name,
//                           itemCart.color_Name,
//                           itemCart.price,
//                           itemCart.size_Number,
//                           itemCart.image,
//                           itemCart.color_Size_ProductId
//                         )
//                       }
//                       min={1}
//                     />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//           = <b>{formatMoney(itemCart.price * itemCart.quantity)}</b>{" "}
//           <span>đ</span>
//         </td>
//         <td style={{ paddingTop: "50px" }} className="icon-delete">
//           <a href="#">
//             <i
//               className="fa fa-close "
//               onClick={(e) => deleteProduct(e, itemCart.id)}
//             />
//           </a>
//         </td>
//       </tr>
//     </tbody>
//   );
// };

// const mapDispatchToPro = (dispatch) => {
//   return {
//     fetchCart: (carts) => {
//       dispatch(getNumberInCart(carts));
//     },
//   };
// };

// export default connect(null, mapDispatchToPro)(CartItem);
import React from "react";
import "./CartItem.css";
import cartApi from "./../../../../api/cartApi";
import jwt_decode from "jwt-decode";
import { getNumberInCart } from "./../../../../actions/cartAction";
import { connect } from "react-redux";
import { formatMoney } from './../../../../functions/formatMoney';

const CartItem = (props) => {
  const { itemCart } = props;
  const updateCartInRedux = async () => {
    const itemInCarts = await cartApi.getItemCart(
      jwt_decode(localStorage.getItem("usertoken")).sub[1]
    );
    props.fetchCart(itemInCarts);
  };

  const changeQuantity = async (e, id) => {
    await cartApi.updateItem(id, { quantity: e.target.value });
    updateCartInRedux();
  };

  const deleteProduct = async (e, id) => {
    //remove item from cart
    e.preventDefault();
    await cartApi.removeItem(id);
    updateCartInRedux();
  };
  return (
    <tbody>
      <tr key={itemCart.id}>
        <td>
          <img src={itemCart.image} width={80} height={80} style={{objectFit: "contain"}} alt="Product" />
        </td>
        <td>
          <p>{itemCart.product_Name}</p>
          <span>{itemCart.color_Name}</span>,<span>{itemCart.size_Number}</span>
        </td>
        <td style={{ width: "220px" }}>
          <div>
            <span>{formatMoney(itemCart.price)} (đ)</span> *
          </div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="number"
                      className="form-control input-text-cart"
                      defaultValue={itemCart.quantity}
                      onChange={(e) => changeQuantity(e, itemCart.id)}
                      min={1}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          = <b>{formatMoney(itemCart.price * itemCart.quantity)}</b> <span>đ</span>
        </td>
        <td style={{ paddingTop: "50px" }} className="icon-delete">
          <a href="#">
            <i
              className="fa fa-close "
              onClick={(e) => deleteProduct(e, itemCart.id)}
            />
          </a>
        </td>
      </tr>
    </tbody>
  );
};

const mapDispatchToPro = (dispatch) => {
  return {
    fetchCart: (carts) => {
      dispatch(getNumberInCart(carts));
    },
  };
};

export default connect(null, mapDispatchToPro)(CartItem);
