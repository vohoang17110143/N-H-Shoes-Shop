import api from "./api";

const createFavorite=(customerId,favorite)=>api.post(api.url.favoriteProducts+customerId,favorite).then(res=>res.data);
const getFavoriteByCustomerId=(customerId)=>api.get(api.url.favoriteProducts+customerId).then(res=>res.data);

const favoriteApi={
    createFavorite,
    getFavoriteByCustomerId
}

export default favoriteApi;