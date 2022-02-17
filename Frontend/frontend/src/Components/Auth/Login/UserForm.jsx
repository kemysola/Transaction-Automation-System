import React ,{useState} from 'react';
import { Form,Stack, Container, Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios'
import Service from '../../../Services/Service';
import {isEmail} from 'validator'


const BorderDiv = styled.div`
border-radius:12px;
background:white;
margin:6.5rem 0.22rem;
font-size:12px;
padding: 0.11rem 1.5rem;

`;


const UserForm =()=>{

    const required = (value) => {
        if (!value) {
          return (
            <div className="invalid-feedback d-block">
              This field is required!
            </div>
          );
        }
      };


    const[submitted, setSubmitted] = useState(false)
    const [data, setData] = useState({
        email:"",
        password:""
    });


    const handleChange =(e) =>{
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name] : value
        });

    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const Data = {
            email: data.email,
            password:data.password
        };
        console.log(data)
        setSubmitted(true)

        Service.LoginStaff(data)
            .then(response => {
                console.log(response.message)
                setSubmitted(true)
            })
            .catch(error => {
                console.log(error)
            });
    };

    return (
        <Container>
            <BorderDiv>
                <Form  onSubmit={handleSubmit}>
                    <Row>
                        <Col sm={12}>
                        <Stack className='py-2 mt-1'>
                            <article style={{fontSize:'18px',fontWeight:'bold'}} className='pt-3 pb-1 mb-1'>Sign In</article>
                        </Stack>
                        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                        <Form.Label className=''>Email Address</Form.Label>
                        <Form.Control size="sm" 
                        type="email" 
                        name='email'
                        value={data.email}
                        onChange={handleChange}
                        validation={[required]}

                        />
                    </Form.Group>
                        </Col>
                        <Col sm={12} className='pt-2 mt-2'>
                        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                            <Row>
                                <Col sm={6}>
                                <Form.Label >Password</Form.Label>
                                </Col>
                                <Col sm={6}>
                                <small className='d-flex justify-content-end'>Forgot Your Password?</small>
                                </Col>
                            </Row>
                         <Form.Control size="sm" 
                         type="password" 
                         name='password'
                         value={data.password}
                         onChange={handleChange}
                         validation={[required]}
                         />
                    </Form.Group>
                        </Col>
                        <Col sm={12} className=''>
                        <Form.Group>
                            <br></br>
                           <input type='checkbox'/>
                           <p className='' style={{display:'inline'}}> Remember Me</p>
                       </Form.Group>
                        </Col>
                        <Col sm={12} className='py-2 mt-3'>
                        <Form.Group className="mb-3 text-light" controlId="exampleForm.ControlInput1">
                         <Form.Control size="sm" type="submit" placeholder="Login" className=''  value='Login' style={{background:'#4cab48', color:'white', fontWeight:'light'}}/>
                    </Form.Group>
                        </Col>
                   

                    </Row>
                </Form>
                </BorderDiv>
                </Container>
                       
      );
}

export default UserForm;