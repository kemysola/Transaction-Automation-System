import React, { useState, useEffect, useRef } from "react";
import { Form as Fm, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../../../Services/auth.Service";
import CheckButton from "react-validation/build/button";


//*****************************************************Create Validation Function****************************************

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">This field is required!</div>
    );
  }
};

//   ****************************************************** End Validation ***************************************


function ForgotPassword() {
  const history = useHistory();
  const form = useRef();
  const checkBtn = useRef();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  //   ************************************************* Event Trigger *****************************************


  const onChangePassword = (e) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);
  };

//   ****************************************************** Event Trigger ***************************************
  const onChangePasswordConfirm = (e) => {
    const newPasswordConfirm = e.target.value;
    setNewPasswordConfirm(newPasswordConfirm);
  };

  //   ****************************************************** Event Trigger ***************************************

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  //   ************************************* Store Users Input and send with Rest api *******************************

  const saveUser = (e) => {
    e.preventDefault();
    let data={
        email:email,
        newPassword:newPassword,
        newPasswordConfirm:newPasswordConfirm
      }
        
    //   ******************************************  Validate the form data ***************************************

    form.current.validateAll();

    //   ***************************************   Call Axios Post Request Method  ***********************************

    AuthService.forgotPassword(data).then((res) =>{
        alert(res.data.message)
        history.push('/')

    }).catch((err) =>{
        console.log(err)
    })


  };

  return (
    <React.Fragment>
      <div>
        <Form ref={form} onSubmit={saveUser}>
          <div>
            <Fm.Label>Email:</Fm.Label>
            <Input
              type="email"
              name="email"
              value={email}
              validations={[required]}
              onChange={onChangeEmail}
            />
          </div>
          <div>
            <Fm.Label>New Password:</Fm.Label>
            <Input
              type="password"
              name="newPassword"
              value={newPassword}
              validations={[required]}
              onChange={onChangePassword}
            />
          </div>
          <div>
            <Fm.Label>Confirm Password:</Fm.Label>
            <Input
              type="password"
              name="newPasswordConfirm"
              value={newPasswordConfirm}
              validations={[required]}
              onChange={onChangePasswordConfirm}
            />
          </div>
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
          <Fm.Control
            size="sm"
            type="submit"
            style={{
              background: "#4cab48",
              color: "white",
              fontWeight: "light",
              width: "190px",
            }}
          />
        </Form>
      </div>
    </React.Fragment>
  );
}

export default ForgotPassword;
