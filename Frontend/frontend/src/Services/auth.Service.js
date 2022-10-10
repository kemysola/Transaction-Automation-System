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
  return await axios
    .post("auth/app/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("admin", response.data.Admin);
        //userHasAuthenticated(true)
      }
      return response.data.email;
    });
};
const logout = () => {
  localStorage.clear();

  window.location.reload();
  window.location.href = "/";
};
const getCurrentUser = async() => {
  return await JSON.parse(localStorage.getItem("user"));
};

const forgotPassword = data => { 
  return axios.post("staff/forgotPassword", data);
};

const updatePassword = async(oldPassword,newPassword,email) => {
  return await  axios.put('staff/oneTimePasswordReset/',{
    email,
    oldPassword,
    newPassword
  }).then((response) => {
    if (response.data.token) {
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
  forgotPassword,
};
export default AuthService;
