import api from "./api";

const getBrand = () =>api.get(api.url.brands).then((rs) => rs.data);

const brandApi = {
    getBrand
};

export default brandApi;
