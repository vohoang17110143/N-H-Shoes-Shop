import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { actFetchOrder } from "./../../../actions/orderAction";
import { Link, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import orderApi from "./../../../api/orderApi";
import SidebarMenu from "./../Menu/Sidebar/SidebarMenu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./OrderInfo.css";
import { CButton, CDataTable, CCol, CRow } from "@coreui/react";
import { useHistory } from "react-router-dom";
import { axios } from "axios";
import { faCommentsDollar } from "@fortawesome/free-solid-svg-icons";
import { formatMoney } from "./../../../functions/formatMoney";
import { HubConnectionBuilder } from "@microsoft/signalr";

const OrderInfo = (props) => {
  const { orders, AuthToken } = props;
  // console.log(AuthToken);
  var history = useHistory();
  // console.log(orders);
  const loadData = async () => {
    if (AuthToken.isLoggedIn === true) {
      var orderList = await orderApi.getUserOrder(AuthToken.cusID);
      props.fetchOrder(orderList);
    }
  };
  const connection = new HubConnectionBuilder()
    .withUrl("https://localhost:5001/hubs/shopshoe")
    .withAutomaticReconnect()
    .build();
  useEffect(() => {
    loadData();
    connection
      .start()
      .then((res) => {
        console.log("result");
        connection.on("Receiving_Order", () => {
          loadData();
        });
      })
      .catch((e) => console.log("Connection failed: ", e));
  }, []);

  const updateUserInfo = async () => {
    var orderList = await orderApi.getUserOrder(AuthToken.cusID);
    props.fetchOrder(orderList);
  };

  const onCancelOrder = (id) => {
    orderApi
      .cancelOrder(id, { status: "Cancelled" })
      .then((res) => {
        toast.success("Hủy đơn hàng thành công !");
        updateUserInfo();
      })
      .catch((err) => toast.error("Hủy đơn hàng thất bại !"));
  };

  const fields = [
    { key: "orderId", label: "STT", _style: { width: "1%" } },
    { key: "dateOrder", label: "Ngày đặt hàng", _style: { width: "15%" } },
    { key: "totalCost", label: "Tổng giá", _style: { width: "11%" } },
    {
      key: "typePayment",
      label: "Hình thức thanh toán",
      _style: { width: "15%" },
    },
    { key: "status", label: "Trạng thái đơn hàng", _style: { width: "18%" } },
    {
      key: "action",
      label: "",
      _style: { width: "12%" },
      sorter: false,
      filter: false,
    },

    {
      key: "show_details",
      label: "",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
  ];
  // payment
  const handlePayment = (orderId) => {
    orderApi
      .PaypalCheckout(orderId)
      .then((res) => {
        window.open(res).focus();
      })
      .catch((err) => alert(err));
  };

  return (
    <div style={{ textAlign: "center", marginRight: "3em" }}>
      <strong style={{ fontSize: "30px" }}>Đơn đặt hàng của bạn</strong>

      <CDataTable
        items={orders}
        fields={fields}
        columnFilter
        tableFilter
        footer
        itemsPerPageSelect
        itemsPerPage={5}
        hover
        sorter
        pagination
        scopedSlots={{
          action: (item, index) => (
            <td key={item.orderId}>
              {item.status == "Wait_For_Confirmation" ? (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => onCancelOrder(item.orderId)}
                >
                  Hủy đơn
                </button>
              ) : item.status == "Delivering" &&
                item.typePayment == "Online" ? (
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => handlePayment(item.orderId)}
                >
                  Thanh toán
                </button>
              ) : null}
            </td>
          ),
          orderId: (item, index) => <td>{index + 1}</td>,

          totalCost: (item) => (
            <td style={{ textAlign: "left" }}>
              {formatMoney(item.totalCost)} đ
            </td>
          ),
          show_details: (item, index) => {
            return (
              <td key={item.orderId}>
                <Link
                  to={{
                    pathname: `/userinfo/detail/${item.orderId}`,
                    state: {
                      orderItems: item.orderDetailDTOs,
                      totalCost: item.totalCost,
                      status: item.status,
                      orderId: item.orderId,
                    },
                  }}
                >
                  <button type="button" className="btn btn-success">
                    Chi tiết
                  </button>
                </Link>
              </td>
            );
          },
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.OrderList,
    AuthToken: state.AuthToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrder: (orders) => {
      dispatch(actFetchOrder(orders));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderInfo);
