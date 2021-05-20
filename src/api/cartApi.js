import api from './api';



const pushItem = (body) => api.post(api.url.cart , body).then(res =>res.data)
const getItemCart = (id) => api.get(api.url.cart + "?customerId=" +id).then(res => res.data)
const updateItem = (id,body) => api.put(api.url.cart + id , body).then(res =>res.data)
const removeItem = (id) => api.delete(api.url.cart+id).then(res =>res.data)

const cartApi={
    pushItem,getItemCart,updateItem,removeItem
}
export default cartApi