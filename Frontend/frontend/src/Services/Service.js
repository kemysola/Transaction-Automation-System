import axios from './api/http-common'

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

const reportDeal = async(data) => {
    return axios.get("reporting/report_data/all")
}
const updateDeal = (id, data) => { // update deal information
    return axios.put(`transaction/update/${id}`, data);
};

const updateNBCFocus = (id, data) => { // update NBC Focus table per deal
    return axios.put(`transaction/update/nbcfocus/${id}`, data);
}

const updateParties = (id, data) => { // update Parties table per deal
    return axios.put(`transaction/update/parties/${id}`, data);
}

const updatePlis = (id, data) => { // update Plis table per deal
    return axios.put(`transaction/update/plis/${id}`, data);
}

const updateKpis = (id, data) => { // update Kpi table per deal
    return axios.put(`transaction/update/kpis/${id}`, data);
}

const updateOcps = (id, data) => { // update Ocps table per deal
    return axios.put(`transaction/update/ocps/${id}`, data);
}

const deleteFeatures = (id, data) => { // delete daniel's features from the db
    return axios.delete(`transaction/delete/${id}`, {data: data});
}

const getDealById = async (id, year) => { // get deal by id, for privileged users 
    return await axios.get(`transaction/item/${id}/year`);
};

const getMyDeals = async(year) => { // get current users deals
    return await axios.get(`transaction/my_deals/${year}`);
};

const getMyPipelineDeals = async(year) => {
    return await axios.get(`transaction/pipeline/${year}`)
};

const getMyPortfolioDeals = async(year) => {
    return await axios.get(`transaction/portfolio/${year}`)
}

const getBudgetDeals = async() => {
    return await axios.get(`budget/get_all_deals`)

}

const getMyDealsByEmail = async(user_email,year) => { // get current users deals
    return  await axios.get(`transaction/get_staff_deals/${user_email}/${year}`);
    
};
const downloadMyDealsByEmail = async(user_email, year) => { // get current users deals
    return  await axios.get(`transaction/download_staff_deals/${user_email}/${year}`);
    
};
const getAllDeals = async(year) => { // get all deals, for privileged users only
    return await  axios.get(`transaction/all_deals/${year}`);
};

const getPortfolioAllDeals = async(year) => { // get all deals, for privileged users only
    
    return await  axios.get(`transaction/all_deals/portfolio/${year}`);
};

const downloadAllDeals = async() => { // get all deals, for privileged users only
    return await  axios.get("transaction/download_all_deals");
};

const getActualGuarantee = (year) => { // Actual Guarantee: for only closed deals within the current FY
    return axios.get(`transaction/guarantee/actual/${year}`)
}
const postAccruals = (startDate,endDate,data) => {
    return axios.post(`budget/compute_amortization/${startDate}/${endDate}`,data)
}


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

const getCCReport = (startDate, endDate) => { // get Monthly Credit Committee(CC) Submission Report
    return axios.get(`report/ccsubmission/monthly/${startDate}/${endDate}`);
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

const getForecast = (fy) => { // get all forecast
    return axios.get(`configuration/forecast/${fy}`);
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

const getFY = (target_fy) => { // get all fy values
    return axios.get(`admin/fy/${target_fy}`)
}

const addFY = (data) => { // create a new financial year, for privileged users only
    return axios.post("admin/fy", data)
}

const updateFY = (id, data) => { // update new financial year, for privileged users only
    return axios.put(`admin/fy/update/${id}`, data)
}
const getReimbursibles= (topn, start, end) =>{
    return  axios.get(`transaction/reimbursible/${topn}`)
}
const getClosedDeals= async() =>{
    return await axios.get(`report/all/closed_deals`)
}
const getAllClosedDeals= async(financial_year) =>{
    return await axios.get(`report/closed_deals/${financial_year}`)
}
const getAllReport= async(fy_quarter, fin_year) =>{
    return await axios.get(`report/quarterly/oands/${fy_quarter}/${fin_year}`)
}
const postReport = (data) => {
    return axios.post(`report/quarterly/oands`,data)
}

const getAmortization = async(id) => {
    return await axios.get(`budget/amortization_schedule/${id}`)
}

const deleteTransactions = async(id, password) => {
    return await axios.delete(`transaction/delete/deal/${id}`, {data: {password: password}})
}


const postGuarantee = async(data) => {
    return await axios.post(`report/quarterly/oands/CurrentGuaranteePortfolio/`, data)
}


const postPortfolioGrowth = async(data) => {
    return await axios.post(`report/quarterly/oands/GuaranteePortfolioGrowth/`, data)
}

const postGuaranteePortfolioGrowth_Table = async(data) => {
    return await axios.post(`report/quarterly/oands/GuaranteePortfolioGrowth_Table/`, data)
}

const postoriginationActivity = async(data) => {
    return await axios.post(`report/quarterly/oands/ORIGINATIONACTIVITY/`, data)
}
const postguaranteePipelines = async(data) => {
    return await axios.post(`report/quarterly/oands/guaranteePipeline/`, data)
}
const poststructuringandExecution = async(data) => {
    return await axios.post(`report/quarterly/oands/STRUCTURINGANDEXECUTIONACTIVITIES/`, data)
}

const Services = {
    poststructuringandExecution,
    postoriginationActivity,
    postguaranteePipelines,
    postPortfolioGrowth,
    postGuaranteePortfolioGrowth_Table,
    postReport,
    postGuarantee,
    LoginStaff,
    registerStaff,
    updateStaff,
    createDeal,
    getAllReport,
    updateDeal,
    getDealById,
    postAccruals,
    getReimbursibles,
    getMyDealsByEmail,
    getMyDeals,
    getAllDeals,
    getPortfolioAllDeals,
    getAllStaff,
    getDealStaff,
    getOneStaff,
    getAllClosedDeals,
    getClient,
    getDealByDate,
    getLevel,
    getIndustry,
    getProduct,
    getRegion,
    getClosedDeals,
    getBudgetDeals,
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
    updateNBCFocus,
    reportDeal,
    updateParties,
    updatePlis,
    updateKpis,
    updateOcps,
    deleteFeatures,
    getMyPortfolioDeals,
    getMyPipelineDeals,
    getActualGuarantee,
    getFY,
    addFY,
    updateFY,
    getCCReport,
    getAmortization,
    deleteTransactions
}


export default Services



