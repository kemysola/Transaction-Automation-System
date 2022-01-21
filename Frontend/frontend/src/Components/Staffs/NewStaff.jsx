import React from 'react';
import { Form,Container,Row,Col } from 'react-bootstrap';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  color:white;
  background: green;
  margin-right:14px;
  border:1px solid  white;
  padding:6px 35px;
  margin-top: 8px;
  margin-bottom: 8px;
  font-weight:bold;
  font-size:10px;
  border-radius:10px;

`;
const   FormWrapper = styled.div`
padding:0;
`;

const Container1 = styled.div`
background:white;
font-size:12px;
padding: 1rem 1rem;
border-radius: 15px;
`;


export default function NewTransactions(){
    return(
        <React.Fragment>
             <FormWrapper>
            <Container fluid>
                <Form action='' method=''> 
                    <p className='text-info' style={{fontWeight:'bold'}}>New Staff</p>


                <Container1>
                <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control size="sm" type="email" placeholder="name@example.com" />
                    </Form.Group>

                    <Form.Group className="" controlId="exampleForm.ControlInput1">
                        <Form.Label>Level</Form.Label>
                        <Form.Control size="sm" type="email" placeholder="name@example.com" />
                    </Form.Group>
                    
                    <Form.Group className="" controlId="exampleForm.ControlInput1">
                        <Form.Label>Has Origination Target?</Form.Label>
                        <Form.Control size="sm" type="email" placeholder="name@example.com" />
                    </Form.Group>
                </Container1>
                <br/>


                <Container1>
                    <p style={{fontWeight:'bold'}}>Targets</p>

                    <Form.Group as={Row} className="mb-1" controlId="formPlaintextEmail">
                        <Form.Label column sm="3">
                        <small>Origination (NGN)</small> 
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="password" placeholder="Password" size='sm' />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-1" controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            <small>Guarantee Pipeline (NGN)</small>
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="password" placeholder="Password" size='sm' />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1" controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            <small>Green Transaction (NGN)</small>
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="password" placeholder="Password" size='sm' />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="" controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            <small>Amber Transaction (NGN)</small>
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="password" placeholder="Password" size='sm' />
                        </Col>
                    </Form.Group>
                </Container1>
                <br/>

                <Container1>
                    <p style={{fontWeight:'bold'}}>Performance Pay</p>
                        <Row>
                            <Col sm={4}>
                                <p>% per milestone</p> 
                            </Col>
                            <Col sm={8}>
                            <Form.Group as={Row} className="mb-1" controlId="formPlaintextEmail">
                        <Form.Label column sm="5">
                            <small>Mandate Letter (NGN)</small>
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="password" placeholder="Password"  size='sm'/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-1" controlId="formPlaintextPassword">
                        <Form.Label column sm="5">
                        <small>Credit Committee Approval(NGN)</small>
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="password" placeholder="Password"  size='sm'/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1" controlId="formPlaintextPassword">
                        <Form.Label column sm="5">
                        <small>Fee Letter (%)</small>
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="password" placeholder="Password"  size='sm'/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="" controlId="formPlaintextPassword">
                        <Form.Label column sm="5">
                        <small>Financial Close (%)</small>
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="password" placeholder="Password" size='sm' />
                        </Col>
                    </Form.Group>
                    </Col>
                    </Row>   
                </Container1>


                <ButtonWrapper>
                    Submit
                </ButtonWrapper>

                <ButtonWrapper>
                    Cancel
                </ButtonWrapper>

                </Form>

            </Container>

            </FormWrapper>
        </React.Fragment>
    )
}