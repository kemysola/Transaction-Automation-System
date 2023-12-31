import React, { useState, useRef, useEffect } from "react";
import { useLocation ,Link} from "react-router-dom";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../Services/auth.Service";
import styled from "styled-components";
import Form from "react-validation/build/form";
import {AiOutlineMail} from 'react-icons/ai';
import {RiLockPasswordLine} from 'react-icons/ri'
import Input from "react-validation/build/input";
import {
  Container,
  Row,
  Col,
  Stack,
  Form as ReactForm,
  Spinner,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

const BorderDiv = styled.div`
  border-radius: 12px;
  margin: 1rem 0.12rem;
  font-size: 12px;
  padding: 0.11rem 1.4rem;
  background:white;
  box-shadow: 10px 10px 5px blue;

`;

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">This field is required!</div>
    );
  }
};

const UserLogin = () => {
  // ******************************************  useState Hook to store state data  ***************************************
  // ******************************************  useEffect hook - ComponentDidMount   *************************************
  // ******************************************  useRef hook - Current Index and Data   ***********************************

  const history = useHistory();
  const form = useRef();
  const checkBtn = useRef();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ******************************************  Get Email from URL Params  *********************************************

  const query_ = useLocation().search;
  const name = new URLSearchParams(query_).get("user");
  const email =  { name };

  //**************************************** store state in the localstorage in a useEffect hook   ************************

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(email));
  }, [email]);

  
  //**************************************** Password input   ************************

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

  //**************************************** Validate form inputs  **********************

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(email.name, password).then(
        () => {
          if (localStorage.getItem("admin") === "true") {
            localStorage.setItem("isAuthenticated", "true");
            history.replace("/landing");
          }
          if(localStorage.getItem("admin") !== "true"){
            history.push("/user");
          }
          window.location.reload()    
        },
        (error) => {
          const resMessage = 'Incorrect Email or Password'
          setLoading(false);
          setMessage(resMessage);
        }
        
      );
    } else {
      setLoading(false);
    }
  };
  return (
    <Container className='animate__animated animate__backInRight'>
      <BorderDiv>
        <Form onSubmit={handleLogin} ref={form}>
          <Row className="py-2 mt-1">
            <Stack className="py-2 mt-1">
              <article
                style={{ fontSize: "18px", fontWeight: "bold" }}
                className="pt-1 pb-1 mb-1"
              >
                Sign In
              </article>
            </Stack>

            <ReactForm group></ReactForm>
            <Col sm={12} className="pt-1 mt-1">
            <AiOutlineMail style={{color:'green', marginRight:'6px', fontSize:'1.2rem'}}/>

              <label >  Email Address</label>
              <br />
               <input value={ email.name} style={{ width: "100%", marginTop:'10px' }} />
            </Col>
            <Col sm={12}>
              <ReactForm.Group
                className="mb-2 pt-3 mt-1"
                controlId="exampleForm.ControlInput1"
              >
                <Row>
                  <Col sm={6} className="mt-1">
                  <RiLockPasswordLine style={{color:'green', marginRight:'6px', fontSize:'1.2rem'}}/>
                  <ReactForm.Label>Password</ReactForm.Label>
                  </Col>
                  
                </Row>
                <Input
                  size="sm"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
                  style={{ width: "100%" }}
                />
              </ReactForm.Group>
            </Col>
          </Row>

          {/*-----------------------------------------*/}

          <div className="">
            {loading && (
              <div className="d-flex justify-content-center" >
                <Spinner animation="border" variant="success" />
              </div>
            )}

            <ReactForm.Group className="pt-3">
              <ReactForm.Control
                size="sm"
                type="submit"
                disabled={loading}
                style={{
                  background: "#4cab48",
                  color: "white",
                  fontWeight: "light",
                }}
              />

              {message && (
                <div className="form-group">
                  <div className="secondary alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
            </ReactForm.Group>
          </div>
          <br />
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        <div>
          <p style={{}}>Forgot Password? <Link to='/forgot_password' style={{color:'black'}}>Click here</Link></p>
        </div>
        <div className="alert">{setMessage}</div>
      </BorderDiv>
    </Container>
  );
};

export default UserLogin;
