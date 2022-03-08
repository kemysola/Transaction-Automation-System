import axios from '../http-common';

const getDealByClientName = () => {
    return await axios.get(`reporting/:start_date/:end_date/:client_name`);
};

const getDealByName= async () => {
    return await axios.get(`reporting/report_by_name/:name`);
};



