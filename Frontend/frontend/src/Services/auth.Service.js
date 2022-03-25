import { useHistory } from "react-router-dom";
import axios from "../http-common";

const register = (username, email, password) => {
  return axios.post("auth/app/login" + "signup", {
    username,
    email,
    password,
  });
};
const login = async (email, password) => {
  // console.log(email)
  return await axios
    .post("auth/app/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        // localStorage.setItem("users", JSON.stringify(response.data.email));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("admin", response.data.Admin);
        //userHasAuthenticated(true)
      }
      return response.data.email;
    });
};
const logout = () => {
  localStorage.clear();
  //return axios.post(API_URL + "signout").then((response) => {
  //   return response.data;
  // });
  window.location.reload();
  window.location.href = "/";
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const updatePassword = async(oldPassword,newPassword,email) => {
  return await  axios.put('staff/oneTimePasswordReset/',{
    email,
    oldPassword,
    newPassword
  }).then((response) => {
    if (response.data.token) {
      //localStorage.setItem("token", response.data.token);
      console.log(response)
    }
    return response.data.email;
  });
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  updatePassword,
};
export default AuthService;
