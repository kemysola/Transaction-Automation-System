import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  headers: {
    token: `Bearer ${localStorage.getItem('token')}`,
    'Content-type': 'application/json; charset=utf-8',
  }
});