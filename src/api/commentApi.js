import api from './api';

const CreateComment = (comment) => api.post(api.url.comments , comment).then(res =>res.data)
const getComment = (productId) => api.get(api.url.comments+productId).then(res =>res.data)


const commentApi={
    CreateComment,
    getComment
}
export default commentApi