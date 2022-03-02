import axios from '../http-common';

const LoginStaff = data => {
    return axios.post("app/login", data)
}

const PasswordReset = (id, data) => {
    return axios.put(`staff/update/${id}`, data);
}  

const registerStaff = data => { // register new staff
    return axios.post("staff/onboard", data);
};

const updateStaff = (email, data) => { // update staff information
    return axios.put(`staff/update/${email}`, data);
};

const createDeal = data => { // create new deal/transaction
    return axios.post("transaction/createdeal", data);
};

const updateDeal = (id, data) => { // update deal information
    console.log("data is", data)
    console.log("data is", typeof(data.greenA))
    return axios.put(`transaction/update/${id}`, data);
};

const getDealById = id => { // get deal by id, for privileged users 
    return axios.get(`transaction/item/${id}`);
};

const getMyDeals = () => { // get current users deals
    return axios.get("transaction/my_deals");
    // console.log("header is" + axios.)
};

const getAllDeals = () => { // get all deals, for privileged users only
    return axios.get("transaction/all_deals");
};

export default {
    LoginStaff,
    registerStaff,
    updateStaff,
    createDeal,
    updateDeal,
    getDealById,
    getMyDeals,
    getAllDeals
};