import axios from "axios";

export default axios.create({
  baseURL: "https://trms01-server.azurewebsites.net/api/v1/",
    // baseURL: "http://localhost:5001/api/v1/",
  headers: {
    token: `Bearer ${localStorage.getItem('token')}`,
    'Content-type': 'application/json; charset=utf-8',
  }
});