import React, { useState, useRef} from "react";
// import { useHistory } from "react-router-dom";
import { isEmail } from "validator";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../Services/auth.Service";
import styled from 'styled-components';
import axios from 'axios'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {Container,Row,Col} from 'react-bootstrap';
import { useHistory } from "react-router-dom";




const BorderDiv = styled.div`
border-radius:12px;
background:white;
margin:6.5rem 0.22rem;
font-size:12px;
padding: 0.11rem 1.5rem;

`;




const required = (value) => {
    if (!value) {
      return (
        <div className="invalid-feedback d-block">
          This field is required!
        </div>
      );
    }
  };

  const UserLogin = () => {
    const form = useRef();
    const checkBtn = useRef()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const history = useHistory();

    const onChangeEmail = (e) => {
      const email = e.target.value;
      setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
      };

      const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
          AuthService.login(email, password).then(
            () => {
              history('/landing');
              window.location.reload();
            },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              setLoading(false);
              setMessage(resMessage);
            }
          );
        } else {
            setLoading(false);
    }
  };
    return (
        <Container>
                <Form onSubmit={handleLogin} ref={form}>
                    <Row>
                        <Col sm={12}>
                        <label className=''>Email Address</label>
                        <Input size="sm" 
                        type="email" 
                        name="email"
                        value={email}
                        onChange={onChangeEmail}
                        validations={[required]}
                        />
                        </Col>
                        <Col sm ={12}>
                        <label >Password</label>
                        <small className='d-flex justify-content-end'>Forgot Your Password?</small>
                         <Input
                          size="sm" 
                         type="password" 
                         name='password'
                         value={password}
                         onChange={onChangePassword}
                         validations={[required]}
                         />
                        </Col>
                    </Row>
                        

                               
                         <div className="form-group">
                             <br/>
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>
    </Container>
    )}

    export default UserLogin;