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
const CancelWrapper = styled.button`
  color:green;
  background: #eff1f1;
  border-radius:10px;
  padding:6px 35px;
  border: 1px solid grey;
  margin-top: 8px;
  margin-bottom: 8px;
  font-size:8px;
  box-shadow : 5px #eff1f1;
  font-weight:bold;
  `;


export default function UpdateStaffs(){
    return(
        <React.Fragment>
             <FormWrapper>
            <Container fluid>
                <Form action='' method=''> 
                    <p className='text-info' style={{fontWeight:'bold'}}>New Staff</p>
                    <Container1>
                        <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="John Doe" />
                        </Form.Group>

                        <Form.Group className="" controlId="exampleForm.ControlInput1">
                            <Form.Label>Level</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="level" />
                        </Form.Group>
                        <Form.Group className="" controlId="exampleForm.ControlInput1">
                            <Form.Label>Has Origination Target?</Form.Label>
                            <br/>
                            <div style={{border:'1px solid grey', width:'160px', padding:'5px 10px', lineHeight:'20px', borderRadius:'5px'}}>
                                <input type='checkbox' /> <span style={{fontWeight:'bold', paddingRight:'20px', paddingLeft:'10px'}}> Yes </span>
                                <input type='checkbox' /> <span style={{fontWeight:'bold'}}> No </span>
                            </div>
                        </Form.Group>
                    </Container1>
                    <br/>


                    <Container1>
                        <p style={{fontWeight:'bold'}}>Targets</p>
                        <Row>
                            <Col sm={6}>
                                <div className='pt-3 mt-1'>
                                    <p>Origination (NGN) </p>
                                    <p>Guarantee Pipeline (NGN) </p>
                                    <p>Green Transaction (NGN) </p>
                                    <p>Amber Transaction (NGN) </p>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div>
                                    <div className='py-1'>
                                        <Form.Control type="" placeholder="0" size='sm' />
                                        </div>
                                    <div className='py-1'>
                                        <Form.Control type="" placeholder="0" size='sm' />
                                    </div>
                                    <div className='py-1'>
                                        <Form.Control type="" placeholder="0" size='sm' />
                                    </div>
                                    <div className='py-1'>
                                        <Form.Control type="" placeholder="0" size='sm' />
                                    </div>

                                </div>
                            </Col>
                        </Row>    
                    </Container1>
                    <br/>

                {/* ----------------------------- Close Div ------------------------ */}

                    <Container1>
                        <p style={{fontWeight:'bold'}}>Performance Pay</p>
                        <Row>
                            <Col sm={4}>
                                <p>% per milestone</p> 
                            </Col>

                            <Col sm={8}>
                            <Form.Group as={Row} className="mb-1" controlId="">
                                <Form.Label column sm="5">
                                    <small>Mandate Letter (NGN)</small>
                                    </Form.Label>
                            <Col sm="6">
                                <Form.Control type="text" placeholder="0"  size='sm' id='mandateLetter'/>
                            </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-1" controlId="">
                                <Form.Label column sm="5">
                                    <small>Credit Committee Approval(NGN)</small>
                                </Form.Label>
                            <Col sm="6">
                                <Form.Control type="" placeholder="0"  size='sm' id='creditCommiteeApproval'/>
                            </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-1" controlId="">
                                <Form.Label column sm="5">
                                <small>Fee Letter (%)</small>
                                </Form.Label>
                            <Col sm="6">
                                <Form.Control type="" placeholder="0"  size='sm' id='feeLetter'/>
                            </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="" controlId="">
                                <Form.Label column sm="5">
                                <small>Financial Close (%)</small>
                                </Form.Label>
                            <Col sm="6">
                                <Form.Control type="" placeholder="0" size='sm' id='financialClose'/>
                            </Col>
                            </Form.Group>
                            </Col>
                        </Row>   
                    </Container1>
                    <ButtonWrapper>
                        Submit
                    </ButtonWrapper>

                    <CancelWrapper>
                        Cancel
                    </CancelWrapper>
                </Form>
            </Container>
            </FormWrapper>
        </React.Fragment>
    )
}