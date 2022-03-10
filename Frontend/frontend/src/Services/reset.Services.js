import axios from '../http-common';

// const resetPassword = (email, data) => { // update staff password
//     return axios.put(`password_reset/${email}`, data);
// };

const passwordReset = async (password, newPassword, email) => { // General password reset
    return await axios.put(`password_reset`, {
        email,
        password,
        newPassword
    })
}

const ResetService = {
    // resetPassword,
    passwordReset
  };
export default ResetService;
  