import React, { useState, useRef, useEffect} from "react";
import { useLocation,Redirect } from "react-router-dom";
import { isEmail } from "validator";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../Services/auth.Service";
import styled from 'styled-components';
import axios from 'axios'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {Container,Row,Col,Stack, Form as ReactForm, Spinner, Button} from 'react-bootstrap';
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

  const UserLogin = (props) => {
    //destructure props and use the user variable
    const {user} = props;
    const history = useHistory()
    const form = useRef();
    const checkBtn = useRef()
    const email = user;
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const [message, setMessage] = useState("");
    const location = useLocation();
    


    useEffect(() => {
      localStorage.setItem("user", JSON.stringify(email));
    },[email]);
    //console.log(email)
  
    const onChangeEmail = (e) => {
      //const email = e.target.value;
      //setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
      };

      const handleLogin = (e) => {
        e.preventDefault();
        console.log(email)
       setMessage("");
        setLoading(true);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
          AuthService.login(email, password).then(
            () => {
              console.log('good')
              history.push('/landing')
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
              setMessage('Ooops! User Not Found');
            }
          );
        } else {
            setLoading(false);
           
            
          

    }
  };
    return (
        <Container className=''>
          <BorderDiv>
        {/* ----------------- Test the header by passing props ------------- */}
            <input value={user}/>
           
                {/*<Form onSubmit={handleLogin} ref={form}>

                    

                        <Col sm={12}>
                        <label className=''>Email Address</label>
                        <br/>
                        <Input size="md" 
                        //type="email" 
                       // name="email"
                        value={user}
                        //onChange={onChangeEmail}
                        //validations={[required]}
                        style={{width:'100%'}}
                        />
                        </Col>
    <br/>*/}
                        <Form onSubmit={handleLogin} ref={form}>
                        <Row className='py-2 mt-2'>
                    <Stack className='py-2 mt-1'>
                            <article style={{fontSize:'18px',fontWeight:'bold'}} className='pt-3 pb-1 mb-1'>Sign In</article>
                        </Stack>

                        <ReactForm group>

                        </ReactForm>
                        <Col sm={12}>
                        <label className=''>Email Address</label>
                        <br/>
                        <input value={user} style={{width:'100%'}}/>
            </Col>
                        <Col sm ={12}>
                        <ReactForm.Group className="mb-2 pt-3 mt-1" controlId="exampleForm.ControlInput1">
                        <Row>
                                <Col sm={6}>
                                <ReactForm.Label >Password</ReactForm.Label>
                                </Col>
                                <Col sm={6}>
                                <small className='d-flex justify-content-end'>Forgot Your Password?</small>
                                </Col>
                            </Row>
                            <Input size="sm" 
                         type="password" 
                         name='password'
                         value={password}
                         onChange={onChangePassword}
                         validations={[required]}
                         style={{width:'100%'}}

                         />
                           {/*<Input
                          size="sm" 
                         type="password" 
                         name='password'
                         value={password}
                         onChange={onChangePassword}
                         validations={[required]}
                           />*/}
                         </ReactForm.Group>
                        </Col>
                      


            {/*--------------------------------------------------------------*/}
                        <Col sm={12} className=''>
                        <ReactForm.Group>
                            <br></br>
                           <input type='checkbox'  onChange={(e) => setChecked(e.target.checked)}/>
                           {" "}
                           <p className='' style={{display:'inline'}}> Remember Me</p>
                       </ReactForm.Group>
                        </Col>
                    </Row>
                        


                {/*-----------------------------------------*/}

                               
                         <div className="">
                             <br/>
                           {loading && (
                <div>
                  <Spinner animation="border" variant="success" />
                  <Spinner animation="border" variant="success" />

                </div>
                           )}

            <ReactForm.Group className=''>
            <ReactForm.Control size="sm" type='submit' disabled={loading} style={{background:'#4cab48', color:'white', fontWeight:'light'}}/>
            
              <br/>

            {message && (
            <div className="form-group">
              <div className="secondary alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
         {/*<button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
              </button>*/}
            </ReactForm.Group>
            
          </div>
          <br/>
          {/*{message && (
            <div className="form-group">
              <div className="alert alert-dark" role="alert">
                {message}
              </div>
            </div>
          )}*/}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>    
              </BorderDiv>
    </Container>
    )}

    export default UserLogin;