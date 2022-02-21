import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  headers: {
    token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjE4ODJhY2JhLTdkNWYtNDI1ZS04ODFiLTM5Zjk5NDg5NTYyNCIsIkVtYWlsIjoic3VwZXJhZG1pbkBpbmZyYWNyZWRpdC5jb20iLCJTdGF0dXMiOiJBY3RpdmUiLCJBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ1NDM4MDI2LCJleHAiOjE2NDU1MjQ0MjZ9.TARfq9ZupPEmdpohkyrQC7whgAaw4KCdeYk21WEl0BA",
    'Content-type': 'application/json; charset=utf-8',
  }
});