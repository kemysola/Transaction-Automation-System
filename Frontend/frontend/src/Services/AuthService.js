import axios from '../http-common';

const LoginStaff = data => {
    return axios.post("app/login", data)
}

const PasswordReset = (email, data) => {
    return axios.put(`staff/update/${email}`, data);
}  

export default{
    LoginStaff,
    PasswordReset,

}