import React from 'react';
import { Form,Container,Row,Col, Stack } from 'react-bootstrap';
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


export default function NewStaff(){
    return(
        <React.Fragment>
             <FormWrapper>
            <Container fluid>
                <Form action='' method=''> 
                    <p className='text-info' style={{fontWeight:'bold'}}>New Staff</p>


                <Container1>
                <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
                        <Form.Label>Client</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="name@example.com"  id='client'/>
                    </Form.Group>
                    <Row>
                        <Col sm={6}>
                        <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
                        <Form.Label>Originator</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="name@example.com"  id='originator'/>
                    </Form.Group>

                        </Col>
                        <Col sm={6}>
                        <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
                        <Form.Label>Transactor</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="name@example.com"  id='transactor'/>
                    </Form.Group>
                        </Col>
                    </Row>

                    <div className='mt-3'>
                        <p className='text-info'>Deal Profile Fees & Reimbursement</p>
                        <Row>
                        <Col sm={6}>
                        <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
                        <Form.Label>Amount (NGN)</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="name@example.com"  id='amount'/>
                    </Form.Group>

                        </Col>
                        <Col sm={6}>
                        <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
                        <Form.Label>Advance(%)</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="name@example.com"  id='advance'/>
                    </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6}>
                        <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
                        <Form.Label>Guarantee</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="name@example.com"  id='guarantee'/>
                    </Form.Group>

                        </Col>
                        <Col sm={6}>
                        <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
                        <Form.Label>Monitoring</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="name@example.com"  id='monitoring'/>
                    </Form.Group>
                        </Col>
                    </Row>

                    </div>

                    <div className='mt-3'>
                        <p className='text-info'>Structuring Fees</p>
                        <Row>
                        <Col sm={6}>
                        <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
                        <Form.Label>Client</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="name@example.com"  id='client'/>
                    </Form.Group>

                        </Col>
                        <Col sm={6}>
                        <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
                        <Form.Label>Client</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="name@example.com"  id='client'/>
                    </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                        <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
                        <Form.Label>Client</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="name@example.com"  id='client'/>
                    </Form.Group>

                        </Col>
                        <Col sm={6}>
                        <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
                        <Form.Label>Client</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="name@example.com"  id='client'/>
                    </Form.Group>
                        </Col>
                    </Row>
                    </div>

                    <div className='radioButtons mt-3 pt-3'>
                        <Row>
                            <Col sm={6}>
                                <Stack>
                                    <div>Lorem ipsum dolor sit amet.</div>
                                    <div>Lorem ipsum dolor sit amet.</div>
                                    <div>Lorem ipsum dolor sit amet.</div>
                                    <div>Lorem ipsum dolor sit amet.</div>
                                    <div>Lorem ipsum dolor sit amet.</div>

                                </Stack>
                            </Col>
                            <Col sm={6}>
                                <Stack>
                                    <div className='radioBtn'>
                                        <input type='radio'/>
                                        <input type='radio'/>
                                    </div>
                                    <div>
                                        <input type='radio'/>
                                        <input type='radio'/>
                                    </div>
                                    <div>
                                        <input type='radio'/>
                                        <input type='radio'/>
                                    </div>
                                    <div>
                                        <input type='radio'/>
                                        <input type='radio'/>
                                    </div>
                                    <div>
                                        <input type='radio'/>
                                        <input type='radio'/>
                                    </div>
                                </Stack>
                            </Col>
                        </Row>
                    </div>

                </Container1>
                <br/>


                

                


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