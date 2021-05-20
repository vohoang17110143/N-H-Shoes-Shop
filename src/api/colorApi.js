import api from "./api";

const getColors = () =>api.get(api.url.colors).then((rs) => rs.data);


const colorApi = {
    getColors,
};

export default colorApi;
