import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  headers: {
    // "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjE4ODJhY2JhLTdkNWYtNDI1ZS04ODFiLTM5Zjk5NDg5NTYyNCIsIkVtYWlsIjoic3VwZXJhZG1pbkBpbmZyYWNyZWRpdC5jb20iLCJTdGF0dXMiOiJBY3RpdmUiLCJBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ0ODI4MzQ1LCJleHAiOjE2NDQ5MTQ3NDV9.CxpvXg9_0IH16A-3AbY2H5gU8Y5oo94oPvqko7aFc1k"
    token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjE4ODJhY2JhLTdkNWYtNDI1ZS04ODFiLTM5Zjk5NDg5NTYyNCIsIkVtYWlsIjoic3VwZXJhZG1pbkBpbmZyYWNyZWRpdC5jb20iLCJTdGF0dXMiOiJBY3RpdmUiLCJBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ0ODI4MzQ1LCJleHAiOjE2NDQ5MTQ3NDV9.CxpvXg9_0IH16A-3AbY2H5gU8Y5oo94oPvqko7aFc1k",
    'Content-type': 'application/json; charset=utf-8',
  }
});