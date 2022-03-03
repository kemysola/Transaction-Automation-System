import {useHistory} from 'react-router-dom';
import axios from '../http-common';
//const API_URL = "http://localhost:3000/api/test/";



const register = (username, email, password) => {
    return axios.post('auth/app/login' + "signup", {
        username,
        email,
        password,
    });
};
const login = async(email, password) => {
    // console.log(email)
    return await axios   
        .post("auth/app/login", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                // localStorage.setItem("users", JSON.stringify(response.data.email));
                localStorage.setItem("token", response.data.token)
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
    window.location.reload()
    window.location.href='/';
    
};
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};
const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
}
export default AuthService;