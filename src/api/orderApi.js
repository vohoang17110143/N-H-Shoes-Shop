import api from "./api";

const createOrder = (data) =>api.post(api.url.orders,data).then((rs) => rs.data);
const getUserOrder = (id) => api.get(api.url.orders+"?customerId="+ id).then(res => res.data );
const cancelOrder = (id,status) => api.put(api.url.orders+'confirmOrder'+'/'+id,status).then(res => res.data);
const PaypalCheckout= (id) => api.get(api.url.orders+'checkout'+'/'+id).then(res => res.data);

const orderApi={
    createOrder,getUserOrder,cancelOrder,PaypalCheckout
}
export default orderApi;