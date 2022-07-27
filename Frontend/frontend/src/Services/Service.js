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

const createDeal = (data) => { // create new deal/transaction
    return axios.post("transaction/createdeal", data);
};

const updateDeal = (id, data) => { // update deal information
    return axios.put(`transaction/update/${id}`, data);
};

const updateNBCFocus = (id, data) => { // update NBC Focus table per deal
    return axios.put(`transaction/update/nbcfocus/${id}`, data);
}

const getDealById = async (id) => { // get deal by id, for privileged users 
    return await axios.get(`transaction/item/${id}`);
};

const getMyDeals = async() => { // get current users deals
    return await axios.get("transaction/my_deals");
};

const getMyDealsByEmail = async(user_email) => { // get current users deals
    return  await axios.get(`transaction/get_staff_deals/${user_email}`);
    
};
const downloadMyDealsByEmail = async(user_email) => { // get current users deals
    return  await axios.get(`transaction/download_staff_deals/${user_email}`);
    
};
const getAllDeals = async() => { // get all deals, for privileged users only
    return await  axios.get("transaction/all_deals");
};

const getPortfolioAllDeals = async() => { // get all deals, for privileged users only
    return await  axios.get("/transaction/all_deals/portfolio");
};

const downloadAllDeals = async() => { // get all deals, for privileged users only
    return await  axios.get("transaction/download_all_deals");
};

const getAllStaff = async() => { // get all staff, for privileged users only
    return await axios.get("staff/all_staff");
};

const getDealStaff = async() => { // get all o and s team, for privileged users only
    return await axios.get("staff/origination_structuring_users/all")
}

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

const getForecast = () => { // get all forecast
    return axios.get("configuration/forecast");
}

// admin module endpoints
const addIndustry = (data) => { // add new industry, for privileged users only
    return axios.post("admin/industry", data)
}

const updateIndustry = (id, data) => { // update industry, for privileged users only
    return axios.put(`admin/industry/update/${id}`, data)
}

const addProduct = (data) => { // add new product, for privileged users only
    return axios.post("admin/product", data)
}

const updateProduct = (id, data) => { // update product, for privileged users only
    return axios.put(`admin/product/update/${id}`, data)
}

const addLevel = (data) => { // add new level, for privileged users only
    return axios.post("admin/level", data)
}

const updateLevel = (id, data) => { // update level, for privileged users only
    return axios.put(`admin/level/update/${id}`, data)
}

const addForecast = (data) => { // add new forecast values, for privileged users only
    return axios.post("admin/forecast", data)
}

const updateForecast = (id, data) => { // update new forecast values, for privileged users only
    return axios.put(`admin/forecast/update/${id}`, data)
}

const Services = {
    LoginStaff,
    registerStaff,
    updateStaff,
    createDeal,
    updateDeal,
    getDealById,
    getMyDealsByEmail,
    getMyDeals,
    getAllDeals,
    getPortfolioAllDeals,
    getAllStaff,
    getDealStaff,
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
    getForecast,
    downloadMyDealsByEmail,
    downloadAllDeals,
    addIndustry,
    updateIndustry,
    addProduct,
    updateProduct,
    addLevel,
    updateLevel,
    addForecast,
    updateForecast,
    updateNBCFocus
}
export default Services
