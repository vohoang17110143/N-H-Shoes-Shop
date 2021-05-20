import api from "./api";

const getAllCategory=()=>api.get(api.url.categories).then(res=>res.data);

const categoryApi={
    getAllCategory
}

export default categoryApi;