import api from "./api";
const Login = (username, password) =>
  api
    .get(api.url.login + "?username=" + username + "&" + "password=" + password)
    .then((rs) => rs.data);
const ConfirmCode= (accessCode) =>api.post(api.url.confirmCode +accessCode).then(rs=>rs.data)
const Register = (body) =>
  api.post(api.url.register, body).then((rs) => rs.data);
const getUserInfo = (id) =>
  api.get(api.url.customers + "/" + id).then((rs) => rs.data);
const updateUserInfo = (id, body) =>
  api
    .put(api.url.customerChange + "/" + id, body)
    .then((rs) => rs.data);
const confirmPassword = (customerId, password) =>
  api
    .post(api.url.accounts + "confirmPassword/" + customerId, password)
    .then((res) => res.data);
const updateAccount = (accountId, password) =>
  api.put(api.url.accounts + accountId, password).then((res) => res.data);
const forgotPassword = (email) =>
  api
    .get(api.url.accounts + "forgotPassword" + "/?mail=" + email)
    .then((rs) => rs.data);

const loginSocialAccount = (accountInfo) => api.post(api.url.customers+"/loginSocialAccount",accountInfo).then(res=>res.data);
const editCustomerSocial = (customerId,info) => api.put(api.url.customers+"/socialAccount/"+customerId,info).then(res=>res.data);

const authApi = {
  Login,
  Register,
  ConfirmCode,
  getUserInfo,
  updateUserInfo,
  confirmPassword,
  updateAccount,
  forgotPassword,
  loginSocialAccount,
  editCustomerSocial
};
export default authApi;
