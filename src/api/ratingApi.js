import api from './api';

const createRate = (rate) => api.post(api.url.ratings , rate).then(res =>res.data)
const getRating = (productId) => api.get(api.url.ratings + productId).then(res => res.data)
const GetRatingByCustomerId = (productId,customerId) => api.get(api.url.ratings + productId+"/"+customerId).then(res => res.data)
const ratingApi={
    createRate,
    getRating,
    GetRatingByCustomerId
}
export default ratingApi