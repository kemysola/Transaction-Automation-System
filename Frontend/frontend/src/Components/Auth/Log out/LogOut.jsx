import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const API_URL =""
const LogOut = async(user)=>{
  const history = useHistory();
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  return await axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });  
}

export default LogOut;