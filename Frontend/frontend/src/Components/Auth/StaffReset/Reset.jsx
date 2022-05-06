import React, { useState, useRef, useEffect } from "react";
import axios from "../../../http-common";
import AuthService from "../../../Services/auth.Service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import logo1 from "../../../Images/Infra.png";

const user = JSON.parse(localStorage.getItem("user"));
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
  const [validPassword, setValidPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  //Use effect to handle the useRef hook
  useEffect(() => {
    handleSubmit()
  },[user.name])

  const onChangePassword = (e) => {
    const oldPassword = e.target.value;
    setOldPassword(oldPassword);
  };

  const onChangeNewPassword = (e) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);
  };
  const onConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    form.current.validateAll();
    if(oldPassword === newPassword){
      setMessage('New Password must be different from old password')
      return false;
    }
    if (newPassword === "" && confirmPassword === "") {
      setMessage("Password fields connot be empty");
      return;
    }
    else if (newPassword !== confirmPassword){
      setMessage('Password do not match')
      return false;
    }
    else{
      await AuthService.updatePassword(oldPassword, newPassword, user.name).then(
        () => {
          history.push("/");
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
      )
      return true;

    }
    
    
    /*await AuthService.updatePassword(oldPassword, newPassword, user.name).then(
      () => {
        history.push("/");
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
    );*/
  };
  return (
    <React.Fragment>
      <Container style={{ minHeight: "100vh", background: "white" }}>
        <img src={logo1} alt="logo" height="60" />
        <Container tyle={{ background: "white" }}>
          <Container style={{ background: "white" }}>
            <Container className="py-3 my-3" tyle={{ background: "white" }}>
              <div
                style={{
                  textAlign: "center",
                  paddingTop: "1rem",
                  background: "#237cbf",
                  margin: "19px",
                }}
              >
                <header style={{ color: "white" }}>
                  <h4>Reset Password</h4>
                </header>

                <Form onSubmit={handleSubmit} ref={form}>
                  <Row>
                    <Col>
                      <label htmlFor="email" style={{ display: "block" }}>
                        Email:
                      </label>

                      <input
                        type="email"
                        name="name"
                        value={user.name}
                        style={{ width: "30%" }}
                      />
                    </Col>
                    <br />
                    <Col sm={12} className="py-1">
                      <label htmlFor="Password">Password:</label>
                      <Input
                        type="password"
                        value={oldPassword}
                        name="oldPassword"
                        onChange={onChangePassword}
                        validations={[required]}
                        style={{ width: "30%" }}
                      />
                    </Col>
                    <Col sm={12} className="py-1 ">
                      <label htmlFor="newPassword">New Password:</label>
                      <br />

                      <Input
                        type="password"
                        value={newPassword}
                        name="newPassword"
                        onChange={onChangeNewPassword}
                        validations={[required]}
                        style={{ width: "30%" }}
                      />
                    </Col>
                    <Col sm={12} className="py-1 ">
                      <label htmlFor="confirmPassword">Confirm Password:</label>
                      <br />

                      <Input
                        type="password"
                        value={confirmPassword}
                        name="confirmPassword"
                        onChange={onConfirmPassword}
                        validations={[required]}
                        style={{ width: "30%" }}
                      />
                    </Col>

                    <Col sm={12} className=" my-2 pb-2 pt-2">
                      <button
                        style={{
                          width: "30%",
                          background: "green",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        Submit
                      </button>
                      <br />
                    </Col>

                    <div style={{ display: "inline-block", color: "red" }}>
                      {message}
                    </div>
                  </Row>
                </Form>
              </div>
            </Container>
          </Container>
        </Container>
      </Container>
    </React.Fragment>
  );
}
