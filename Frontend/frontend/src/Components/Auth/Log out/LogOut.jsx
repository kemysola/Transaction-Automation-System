import React from 'react';
import axios from 'axios';

const API_URL = ""
const LogOut = async (user) => {
  localStorage.removeItem("user");
  return await axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });

}

export default LogOut;