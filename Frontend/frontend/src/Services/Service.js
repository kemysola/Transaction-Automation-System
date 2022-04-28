import axios from '../http-common';

const LoginStaff = data => {
    return axios.post("app/login", data)
}

const PasswordReset = async (id, data) => {
    return await axios.put(`staff/update/${id}`, data);
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

const getDealById = async (id) => { // get deal by id, for privileged users 
    return await axios.get(`transaction/item/${id}`);
};

const getMyDeals = async() => { // get current users deals
    return await axios.get("transaction/my_deals");
};

const getMyDealsByEmail = async(user_email) => { // get current users deals
    return  await axios.get(`transaction/get_staff_deals/${user_email}`);
    
};
const getAllDeals = async() => { // get all deals, for privileged users only
    return await  axios.get("transaction/all_deals");
};

const getAllStaff = async() => { // get all staff, for privileged users only
    return await axios.get("staff/all_staff");
};

const getOneStaff = async(user_email) => { // get all staff, for privileged users only
    return await axios.get(`staff/${user_email}`);
};

const getStaffList = () => { // get all staff
    return axios.get("configuration/staff_list");
}

const getClient = (start_date, end_date, clientname) => { // get client name when not specified, for privileged users only
    return axios.get(`report/${start_date}/${end_date}/${clientname}`);
};

const getDealByDate = (start_date, end_date, client_name) => { // get report by start and end date
    return axios.get(`report/${start_date}/${end_date}/${client_name}`);
};

const getLevel = () => { // get all levels
    return axios.get("configuration/level");
}

const getIndustry = () => { // get all industry
    return axios.get("configuration/industry");
}

const getProduct = () => { // get all product
    return axios.get("configuration/product");
}

const getRegion = () => { // get all region
    return axios.get("configuration/region");
}

const getRepaymentFreq = () => { // get all repayment frequency
    return axios.get("configuration/repay_freq");
}

const getAmortizationSty = () => { // get all amortization style
    return axios.get("configuration/amortiz_sty");
}

const getDealCategory = () => { // get all deal category
    return axios.get("configuration/category");
}

const getForecast = () => { // get all staff
    return axios.get("configuration/forecast");
}

export default {
    LoginStaff,
    registerStaff,
    updateStaff,
    createDeal,
    updateDeal,
    getDealById,
    getMyDealsByEmail,
    getMyDeals,
    getAllDeals,
    getAllStaff,
    getOneStaff,
    getClient,
    getDealByDate,
    getLevel,
    getIndustry,
    getProduct,
    getRegion,
    getRepaymentFreq,
    getAmortizationSty,
    getDealCategory,
    getStaffList,
    getForecast
};
