import axios from './api/http-common'

const getDealByClientName = () => {
    return await axios.get(`report/:start_date/:end_date/:client_name`);
};

const getDealByDate = () => {
    return await axios.get(`report/:start_date/:end_date/''`)
};

const getDealByName= async () => {
    return await axios.get(`report/report_by_name/:name`);
};



