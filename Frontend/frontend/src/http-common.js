import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  headers: {
    token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjE4ODJhY2JhLTdkNWYtNDI1ZS04ODFiLTM5Zjk5NDg5NTYyNCIsIkVtYWlsIjoic3VwZXJhZG1pbkBpbmZyYWNyZWRpdC5jb20iLCJTdGF0dXMiOiJBY3RpdmUiLCJBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ1MDk1MzcxLCJleHAiOjE2NDUxODE3NzF9.qOL4DifbpvixxVGQxo1zKvaxrYOC3nSSgKvkmx9S4yg",
    'Content-type': 'application/json; charset=utf-8',
  }
});