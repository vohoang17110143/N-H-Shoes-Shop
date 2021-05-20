import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./productDetail.css";
import productApi from "../../../api/productApi";
import cartApi from "./../../../api/cartApi";
import jwt_decode from "jwt-decode";
import pic1 from "../../../assets/icons/pd_policies_1.png";
import pic2 from "../../../assets/icons/pd_policies_2.png";
import pic3 from "../../../assets/icons/pd_policies_3.png";
import pic4 from "../../../assets/icons/pd_policies_4.png";
import { getNumberInCart } from "../../../actions/cartAction";
import { connect } from "react-redux";
import Description from "./Description/Description";
import { formatMoney } from "./../../../functions/formatMoney";
import CommentBox from "./Comment/Comment";
import { ProName } from "../../../actions/productAction";
import UserComment from "./UserComment/UserComment";
import TotalRating from "./Rating/TotalRating";

const ProductDetail = (props) => {
  const {carts}=props;
  const [productDetail, setProductDetail] = useState(null);
  const location = useLocation();
  const [getColor, setColor] = useState(null);
  const [imagePreview, setImgaePreview] = useState(null);
  const [borderChange, setBoderchange] = useState("solid");
  const [loginRequire, setLoginRequire] = useState(true);
  const [colorDefault, setColorDefault] = useState(location.state.colorDefault);
  const [cartQuantity, setCartQuantity] = useState(null);
  console.log(carts)
  const loadData = async () => {
    // const cartList = JSON.parse(localStorage.getItem("cartList")) || [];
    await productApi.getProductById(location.state.productId).then((data) => {
      setColor(data.colorDTOs.map((color) => color.colorId)[0]);
      setImgaePreview(location.state.image);
      data.colorDTOs.forEach((colorDTO) => {
        console.log(colorDTO.name)
        colorDTO.sizeDTOs.forEach((sizeDTO) => {
          console.log("sizeDTO.color_Size_ProductId"+sizeDTO.color_Size_ProductId)
          for (let index = 0; index < carts.length; index++) {
            console.log("carts[index].color_Size_ProductId"+carts[index].colorSizeProductId)
            if (
              sizeDTO.color_Size_ProductId ==
              carts[index].colorSizeProductId
            ) {
              sizeDTO.quantity -= carts[index].quantity;
            }
          }
        });
      });
      setProductDetail(data);
    });
    
    // if (localStorage.getItem("isLoggedIn") === "true") {
    //   setLoginRequire(false);
    // } else {
    //   setLoginRequire(true);
    // }
  };

  const updateCartInRedux = async () => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      const itemInCarts = await cartApi.getItemCart(
        localStorage.getItem("cusID")
      );
      props.fetchCart(itemInCarts);
    }
  };

  useEffect(() => {
    loadData();
  }, [carts]);
  const chooseColor = (id, image, colorName) => {
    setColor(id);
    setColorDefault(colorName);
    setImgaePreview(image);
    setBoderchange("red");
  };

  // const quantityCheck = (dbquantity, size) => {
  //   const value =
  //     JSON.parse(localStorage.getItem("cartList"))
  //       .filter(
  //         (pro) =>
  //           pro.id === location.state.productId &&
  //           pro.color_Name === colorDefault &&
  //           pro.size_Number === size
  //       )
  //       .map((q) => q.quantity) || 0;
  //   const currentQuantity = dbquantity - value;

  //   return currentQuantity;
  // };
  // const onClickBuy2 = async (
  //   event,
  //   prodName,
  //   size,
  //   price,
  //   quantity,
  //   cImamge,
  //   colosizeID
  // ) => {
  //   event.preventDefault();
  //   const cartList = JSON.parse(localStorage.getItem("cartList")) || [];
  //   if (quantity > 0) {
  //     if (
  //       cartList.filter(
  //         (pro) =>
  //           pro.id === location.state.productId &&
  //           pro.color_Name == colorDefault &&
  //           pro.size_Number == size
  //       ).length >= 1
  //     ) {
  //       var n = cartList
  //         .filter(
  //           (pro) =>
  //             pro.id === location.state.productId &&
  //             pro.color_Name == colorDefault &&
  //             pro.size_Number == size
  //         )
  //         .map((num) => num.quantity);
  //       const indexfind = cartList.findIndex(
  //         (obj) =>
  //           obj.id === location.state.productId &&
  //           obj.color_Name == colorDefault &&
  //           obj.size_Number == size
  //       );
  //       n++;
  //       cartList[indexfind] = {
  //         id: location.state.productId,
  //         product_Name: prodName,
  //         size_Number: size,
  //         price: price,
  //         quantity: n,
  //         color_Name: colorDefault,
  //         image: cImamge,
  //         color_Size_ProductId: colosizeID,
  //       };

  //       console.log("Update");
  //     } else {
  //       console.log("New");
  //       cartList.push({
  //         id: location.state.productId,
  //         product_Name: prodName,
  //         size_Number: size,
  //         price: price,
  //         quantity: 1,
  //         color_Name: colorDefault,
  //         image: cImamge,
  //         color_Size_ProductId: colosizeID,
  //       });
  //       updateCartInRedux();
  //     }
  //     // // add item into cart
  //     // await cartApi.pushItem({
  //     //   customerid: jwt_decode(localStorage.getItem("usertoken")).sub[1],
  //     //   color_size_productid: id,
  //     //   quantity: 1,
  //     // });
  //     // //update shoppingCart into redux
  //     // var itemInCarts = await cartApi.getItemCart(
  //     //   jwt_decode(localStorage.getItem("usertoken")).sub[1]
  //     // );
  //     // props.fetchCart(itemInCarts);

  //     localStorage.setItem("cartList", JSON.stringify(cartList));
  //   } else {
  //     toast.error("Sản phẩm hết hàng");
  //   }
  // };

  const onClickBuy = async (event, id, quantity) => {
    event.preventDefault();
    if (quantity > 0) {
      // add item into cart
      await cartApi.pushItem({
        customerid: jwt_decode(localStorage.getItem("usertoken")).sub[1],
        color_size_productid: id,
        quantity: 1,
      });
      //update shoppingCart into redux
      var itemInCarts = await cartApi.getItemCart(
        jwt_decode(localStorage.getItem("usertoken")).sub[1]
      );
      props.fetchCart(itemInCarts);
    } else {
      toast.error("Sản phẩm hết hàng");
    }

  };

  return (
    <div>
      <ToastContainer />
      {productDetail !== null ? (
        <div className="card">
          <div
            className="container-fliud "
            style={{ marginLeft: "1.8em", marginRight: "2em" }}
          >
            <div className="wrapper row">
              <div className="preview col-md-5">
                <div className="preview-pic tab-content">
                  <div className="tab-pane active" id="pic-1">
                    <img src={imagePreview} alt="mainProduct" />
                  </div>
                </div>
              </div>

              <div className="details col-md-4">
                <h4 className="product-title">{productDetail.name}</h4>
                <h4 className="price-detail">
                  {formatMoney(productDetail.price)} Đ
                </h4>
                <table className="table table-condensed">
                  <tbody>
                    {productDetail.colorDTOs
                      .filter((color) => color.colorId === getColor)
                      .map((color, index) =>
                        color.sizeDTOs.map((size) => (
                          <tr key={size.sizeId}>
                            <td>
                              <div className="load-variant-product">
                                <div
                                  className="vartiants-product"
                                  style={{ textAlign: "left" }}
                                >
                                  <span>{color.name}</span> /{" "}
                                  <span>{size.sizeNumber}</span>
                                </div>
                              </div>
                            </td>
                            <td
                              className="text-right"
                              data-toggle="tooltip"
                              data-placement="right"
                              title=""
                            >
                              <div
                                className="product-status"
                                title=""
                                style={{ color: "blue" }}
                              >
                                <i className="fa fa-plus-circle"></i> {}
                                {/* <span>
                                  {localStorage.getItem("cartList") !== null
                                    ? quantityCheck(
                                        size.quantity,
                                        size.sizeNumber
                                      )
                                    : size.quantity}{" "}
                                  còn
                                </span> */}
                                <span>{size.quantity} còn</span>
                              </div>
                            </td>
                            <td>
                              <button
                                to={`/products/${productDetail.name}`}
                                className="btn btn-xs btn-purchase"
                                title="Mua ngay"
                                onClick={(event) => {
                                  // onClickBuy2(
                                  //   event,
                                  //   productDetail.name,
                                  //   size.sizeNumber,
                                  //   productDetail.price,
                                  //   size.quantity,
                                  //   imagePreview,
                                  //   size.color_Size_ProductId
                                  // );
                                  onClickBuy(
                                    event,
                                    size.color_Size_ProductId,
                                    size.quantity
                                  );
                                }}
                                disabled={
                                  props.AuthToken.isLoggedIn ? false : true
                                }
                              >
                                Mua ngay
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                  </tbody>
                </table>

                <div className="clear"></div>
                <div className="line"></div>
                <h6>Màu sắc</h6>
                <ul className="preview-thumbnail nav nav-tabs">
                  {productDetail.colorDTOs.map((color) => (
                    <li
                      key={color.colorId}
                      style={{ borderColor: borderChange }}
                      onClick={() =>
                        chooseColor(color.colorId, color.image, color.name)
                      }
                      // style={{height:"90%"}}
                    >
                      <a
                        data-target="#pic-1"
                        value={color.colorId}
                        data-toggle="tab"
                        //onClick={() => chooseColor(color.colorId)}
                      >
                        <img style={{width:"45px",height:"45x"}} src={color.image} alt="color-item" />
                      </a>
                      <p>{color.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-md-3 col-xs-6 pd_policies_wrapper">
                <div className="pd_policies style_2">
                  <div className="pd_policies_title">
                    <h5>SẼ CÓ TẠI NHÀ BẠN</h5>
                    <span>từ 1-5 ngày làm việc</span>
                  </div>
                  <ul className="unstyled">
                    <li className="clearfix">
                      <a href="#" className="PhiVanChuyen">
                        <img src={pic1} />
                        <div className="policies_tit"> PHÍ VẬN CHUYỂN</div>
                        <div className="policies_descrip"> Trên toàn quốc</div>
                      </a>
                      <div
                        className="hinhanhphivanchuyen"
                        id="PhiVanChuyen"
                        style={{ display: "none", marginTop: "10px" }}
                      >
                        <img src={pic2} style={{ marginLeft: "0px" }} />
                      </div>
                    </li>
                    <li
                      className="clearfix"
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Hỗ trợ dổi trả sản phẩm trong vòng 3 đến 5 ngày, nếu không vừa size, sản phẩm bị lỗi (giữ sản phẩm sạch và chưa qua sử dụng) bạn sẽ đổi hoặc trả sản phẩm mà không tốn phí."
                    >
                      <a href="#">
                        <img src={pic2} />
                        <div className="policies_tit"> ĐỔI TRẢ MIỄN PHÍ</div>
                        <div className="policies_descrip">
                          {" "}
                          Đổi size, sản phẩm bị lỗi miễn phí trong 3 dến 5 ngày
                        </div>
                      </a>
                    </li>
                    <li
                      className="clearfix"
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Thanh toán khi nhận hàng, thanh toán online hoặc tại cửa hàng bất kì"
                    >
                      <a href="#">
                        <img src={pic3} />
                        <div className="policies_tit"> THANH TOÁN</div>
                        <div className="policies_descrip">
                          {" "}
                          Thanh toán khi nhận hàng
                        </div>
                      </a>
                    </li>
                    <li
                      className="clearfix"
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Để lại số điện thoại, chúng tôi sẽ gọi lại bạn trong vòng 5 phút"
                    >
                      <a href="#">
                        <img src={pic4} />
                        <div className="policies_tit"> HỖ TRỢ MUA NHANH</div>
                        <br />
                        <div className="policies_descrip">
                          <strong
                            style={{ color: "#d61c1f", fontSize: "18px" }}
                          >
                            1900633349
                          </strong>
                          <br />
                          từ 8:30 - 21:30 mỗi ngày
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Description description={productDetail.description} />
        </div>
      ) : null}

      <TotalRating productId={location.state.productId} />
      {localStorage.getItem("isLoggedIn") == "true" ? (
        <UserComment productId={location.state.productId} />
      ) : null}
      <CommentBox productId={location.state.productId} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    AuthToken: state.AuthToken,
    carts: state.CartList,
  };
};
const mapDispatchToPro = (dispatch) => {
  return {
    fetchCart: (carts) => {
      dispatch(getNumberInCart(carts));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToPro)(ProductDetail);
