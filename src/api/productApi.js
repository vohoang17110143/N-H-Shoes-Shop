import api from "./api";

const getProducts = () =>api.get(api.url.products + "/all").then((rs) => rs.data);
const getProductById = (productId) =>api.get(api.url.products + "/" + productId).then((rs) => rs.data);
const getProductByCategory = (categoryId) =>api.get(api.url.products + "/category/" + categoryId).then((rs) => rs.data);
const getProductBySex = (sex) =>api.get(api.url.products + "/sex/" + sex).then((rs) => rs.data);
const getProductByPrice = (price) =>api.get(api.url.products + "/price/" + price).then((rs) => rs.data);
const searchProduct=(key)=>api.get(api.url.products+"/search/?key="+key).then((rs) => rs.data);


const productApi = {
  getProducts,
  getProductById,
  getProductByCategory,
  getProductBySex,
  getProductByPrice,
  searchProduct
};

export default productApi;
