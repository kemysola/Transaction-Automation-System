import React, { useState, useRef, useEffect } from "react";
import axios from "../../../http-common";
import AuthService from "../../../Services/auth.Service";
import ResetService from "../../../Services/reset.Services";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import logo1 from "../../../Images/Infra.png";
import SideNav2 from "../../LandingPage/SideNav2";
import Navbar from "../../LandingPage/Navbar";

const user = JSON.parse(localStorage.getItem("user"));
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">This field is required!</div>
    );
  }
};

export default function PasswordReset() {
  const history = useHistory();
  const form = useRef();
  const [error, setError] = useState();
  const [password, setpassword] = useState("");
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [data, setData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
    email: ""
  });

  const [message, setMessage] = useState("");

  //Use effect to handle the useRef hook
    
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setpassword(password);
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
    if (newPassword !== confirmPassword) {
      setMessage("password do not match");
      return;
    }

    if (newPassword === "" && confirmPassword === "") {
      setMessage("password fields connot be empty");
      return;
    }

    await ResetService.passwordReset(password, newPassword, email).then(
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
    );
  };
  return (
    <React.Fragment>
      <Navbar/>
      <Row>
        <Col sm={3}>
          <SideNav2/>
        </Col>
        <Col sm={8}>
        <Container style={{ minHeight: "100vh", width:'auto'}}>
            <Container className="py-3 my-3 bg-light">
            <p style={{color:'black', marginLeft:'15px'}}>Reset Password</p>

              <div
                style={{
                  textAlign: "center",
                  background: "white",
                  boxShadow:'10px 10px  3px green',
                  margin: "19px",
                }}
              >
                <Form onSubmit={handleSubmit} ref={form}>
                  <Row className='py-3'>
                    <Col>
                      <label htmlFor="email" style={{ display: "block" }}>
                        Email:
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChangeEmail}
                        style={{ width: "30%" }}
                      />
                    </Col>
                    <br />
                    <Col sm={12} className="py-1">
                      <label htmlFor="Password">Password:</label>
                      <Input
                        type="password"
                        value={password}
                        name="password"
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
                          width: "20%",
                          background: "green",
                          color: "white",
                          //fontWeight: "bold",
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

        </Col>
      </Row>

    </React.Fragment>
  );
}
