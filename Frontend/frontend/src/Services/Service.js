import axios from '../http-common';

const registerStaff = data => { // register new staff
    return axios.post("staff/onboard", data);
};

const updateStaff = (id, data) => { // update staff information
    return axios.put(`staff/update/${id}`, data);
};

const createDeal = data => { // create new deal/transaction
    return axios.post("transaction/createdeal", data);
};

const updateDeal = (id, data) => { // update deal information
    console.log('wwwwwwwww', data)
    console.log("yyyyyyyyyyyyyyy", id)
    return axios.put(`transaction/update/${id}`, data);
};

const getDealById = id => { // get deal by id, for privileged users 
    return axios.get(`transaction/item/${id}`);
};

const getMyDeals = () => { // get current users deals
    return axios.get("transaction/my_deals");
};

const getAllDeals = () => { // get all deals, for privileged users only
    return axios.get("transaction/all_deals");
};

export default {
    registerStaff,
    updateStaff,
    createDeal,
    updateDeal,
    getDealById,
    getMyDeals,
    getAllDeals
};