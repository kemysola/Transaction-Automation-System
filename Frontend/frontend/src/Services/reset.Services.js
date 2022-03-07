import axios from '../http-common';

const resetPassword = (email, data) => { // update staff password
    return axios.put(`password_reset/${email}`, data);
};
const ResetService = {
    resetPassword
    
  };
  export default ResetService;