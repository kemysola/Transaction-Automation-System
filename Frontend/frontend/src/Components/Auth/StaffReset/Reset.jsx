import React, { useState, useRef } from "react";
import axios from "../../../http-common";
import AuthService from "../../../Services/auth.Service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useHistory } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user"));
//const email = 'testdevelopment033@gmail.com'
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">This field is required!</div>
    );
  }
};
export default function Reset() {
  const history = useHistory();

  const form = useRef();
  const [error, setError] = useState();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const onChangePassword = (e) => {
    const oldPassword = e.target.value;
    setOldPassword(oldPassword);
    console.log(oldPassword);
  };

  const onChangeNewPassword = (e) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);
    console.log(newPassword);
  };
  const onConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    console.log(confirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    form.current.validateAll();

    await AuthService.updatePassword(oldPassword, newPassword, user).then(
      () => {
        history.push("/login");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
      }
    );
  };
  return (
    <React.Fragment>
      <h1>Hi {user}</h1>
      <p>Kindly change your password</p>
      <Form onSubmit={handleSubmit} ref={form}>
        <label htmlFor="email">Email:</label>
        <Input type="email" name="name" value={user} />
        <label htmlFor="Password">Password:</label>
        <Input
          type="password"
          value={oldPassword}
          name="oldPassword"
          onChange={onChangePassword}
          validations={[required]}
        />

        <br />

        <label htmlFor="newPassword">New Password:</label>

        <Input
          type="password"
          value={newPassword}
          name="newPassword"
          onChange={onChangeNewPassword}
          validations={[required]}
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>

        <Input
          type="password"
          value={confirmPassword}
          name="confirmPassword"
          onChange={onConfirmPassword}
          validations={[required]}
        />
        <button>Submit</button>
      </Form>
      <div style={{display:'inline-block', color:'red'}}>{message}</div>
    </React.Fragment>
  );
}
