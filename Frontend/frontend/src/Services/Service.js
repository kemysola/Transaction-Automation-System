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

const getAllStaff = () => { // get all staff, for privileged users only
    return axios.get("staff/all_staff");
};

const getClient = (start_date, end_date, clientname) => { // get client name when not specified, for privileged users only
    return axios.get(`report/${start_date}/${end_date}/${clientname}`);
};

const getDealByDate = (start_date, end_date, client_name) => { // get report by start and end date
    return axios.get(`report/${start_date}/${end_date}/${client_name}`);
};


export default {
    LoginStaff,
    registerStaff,
    updateStaff,
    createDeal,
    updateDeal,
    getDealById,
    getMyDeals,
    getAllDeals,
    getAllStaff,
    getClient,
    getDealByDate
};
