import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Orderdetail.css";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import orderApi from "./../../../../api/orderApi";
import { ToastContainer, toast } from "react-toastify";
import { actFetchOrder } from "./../../../../actions/orderAction";
import { formatMoney } from "./../../../../functions/formatMoney";
import { CRow, CCol } from "@coreui/react";
import FillForm from "./../../../FillForm/FillForm";

const Orderdetail = (props) => {
  const { orders } = props;
  let location = useLocation();
  console.log(location.state);

  const updateUserInfo = async () => {
    var orderList = await orderApi.getUserOrder(localStorage.getItem("cusID"));
    props.fetchOrder(orderList);
  };
  const onCancelOrder = async (id,Cancelled) => {
    await orderApi
      .cancelOrder(id,{status:Cancelled})
      .then((res) => {
        toast.success("Hủy đơn hàng thành công !");
        updateUserInfo();
      })
      .catch((err) => {
        toast.error("Hủy đơn hàng thất bại !");
      });
  };
  const [showButton, setShowButton] = useState("none");

  const checkStatus = (status) => {
    if (status === "Wait_For_Confirmation") {
      setShowButton("flex");
    } else {
      setShowButton("none");
    }
  };
  useEffect(() => {
    checkStatus(location.state.status);
  }, []);
  return (
    <CRow>
      <CCol lg="4">
        <FillForm />
      </CCol>
      <CCol lg="8">
        <section style={{ background: "white", width: "90%" }}>
          <div className="clearfix mt-0 pb-5">
            <form>
              <div>
                <div style={{ display: "inline-flex" }}>
                  <h4 className="flex-start">Chi tiết sản phẩm của đơn hàng</h4>
                  <h4
                    style={{ color: "blue", marginLeft: "15rem" }}
                    className="flex-end"
                  >
                    {location.state.status}
                  </h4>
                </div>

                <table className="table table-cart">
                  {location.state.orderItems.map((item) => (
                    <tbody key={item.orderDetailId}>
                      <tr>
                        <td>
                          <img src={item.image} width={150} alt="Product" />
                        </td>
                        <td>
                          <p>{item.product_Name}</p>
                        </td>
                        <td>
                          <span>{item.color_Name}</span>,
                          <span>{item.size_Number}</span>
                        </td>
                        <td style={{ width: "220px" }}>
                          <div>
                            <span>{formatMoney(item.price)} (đ)</span> *
                          </div>
                          <div>
                            <table>
                              <tbody>
                                <tr>
                                  <td>
                                    <input
                                      type="number"
                                      className="form-control input-text-cart"
                                      min={1}
                                      value={item.quantity}
                                      readOnly
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          = <b>{formatMoney(item.price * item.quantity)}</b>{" "}
                          <span>đ</span>
                        </td>
                      </tr>
                    </tbody>
                  ))}

                  <tbody>
                    <tr className="text-center">
                      <td colSpan={2}>Phí vận chuyển:</td>
                      <td colSpan={2}>
                        <span
                          className="error-desc"
                          style={{ display: "none" }}
                        />
                        <input
                          type="hidden"
                          name="ShippingFee"
                          defaultValue={0}
                        />
                        <b>0</b> <span>đ</span>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="text-center">
                        Tổng cộng:
                      </td>
                      <td colSpan={2} className="text-center">
                        <b>{formatMoney(location.state.totalCost)}</b>{" "}
                        <span>đ</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <hr />
                {location.state.status === "Wait_For_Confirmation" ? (
                  <Link
                    to="/userinfo/orders"
                    className="btn btn-cancle-order btn-danger "
                    style={{ color: "white", display: { showButton } }}
                    type="button"
                    onClick={(e) => onCancelOrder(location.state.orderId,"Cancelled")}
                  >
                    Hủy đơn hàng
                  </Link>
                ) : null}
              </div>
            </form>
          </div>
        </section>
      </CCol>
    </CRow>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.OrderList,
  };
};

const mapDispatchToPro = (dispatch) => {
  return {
    fetchOrder: (orders) => {
      dispatch(actFetchOrder(orders));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToPro)(Orderdetail);
