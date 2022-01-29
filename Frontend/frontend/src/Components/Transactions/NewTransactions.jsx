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
margin:0;
font-size:5px;
padding:0;
`;

const Container1 = styled.div`
background:white;
font-size:12px;
padding: 1px 1rem;
border-radius: 15px;
`;

const PWrapper = styled.p`
color:#1E2F97;
font-weight:bold;
font-size:11px;
margin:0;
padding: 0;
`;

export default function NewTransactions(){
    return(
        <React.Fragment>
         {/* ---------------------- New Transaction Forms ----------- */}
             <FormWrapper>
            <Container fluid style={{marginTop:'0'}}>
                <Form action='' method=''> 
                <PWrapper>
                <p>New Transaction</p>
                </PWrapper>
                   
        {/* ---------------New Transaction Form------------------- */}
                <Container1>
                <Form.Group className="mb-0 mt-1 pt-1 pb-1" controlId="exampleForm.ControlInput1">
                        <Form.Label>Client Name</Form.Label>
                        <Form.Control size="sm" type="text" placeholder=""  id='client'/>
                    </Form.Group>
                    <Row>
                        <Col sm={6}>
                        <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
                        <Form.Label>Originator</Form.Label>
                        <Form.Control size="sm" type="text" placeholder=""  id='originator'/>
                    </Form.Group>

                        </Col>
                        <Col sm={6}>
                        <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
                        <Form.Label>Transactor</Form.Label>
                        <Form.Control size="sm" type="text" placeholder=""  id='transactor'/>
                    </Form.Group>
                        </Col>
                    </Row>

                    {/*----------- Deal Profile Fess and Reimbursement ---------------- */}

                    <div className=''>
                        <PWrapper>
                        <p className="pt-1">Deal Profile Fees & Reimbursement</p>
                        </PWrapper>
                        
                        <Row>
                        <Col sm={6} className='my-0 py-0'>
                        <Form.Group className="" controlId="exampleForm.ControlInput1">
                        <Form.Label>Industry </Form.Label>
                        <Form.Control size="sm" type="text" placeholder=""  id='industry'/>
                    </Form.Group>

                        </Col>
                        <Col sm={6}>
                        <Form.Group className="" controlId="exampleForm.ControlInput1">
                        <Form.Label>Products</Form.Label>
                        <Form.Control size="sm" type="text" placeholder=""  id='products'/>
                    </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6}>
                        <Form.Group className="pt-1" controlId="exampleForm.ControlInput1">
                        <Form.Label>Region</Form.Label>
                        <Form.Control size="sm" type="text" placeholder=""  id='region'/>
                    </Form.Group>

                        </Col>
                        <Col sm={6}>
                        <Form.Group className="pt-1" controlId="exampleForm.ControlInput1">
                        <Form.Label>Region</Form.Label>
                        <Form.Control size="sm" type="text" placeholder=""  id='region'/>
                    </Form.Group>
                        </Col>
                    </Row>
                    </div>

                    {/*-------------------- Structuring Fees -------------------------- */}

                    <div className=''>
                        <PWrapper>
                        <p className="pt-1">Structuring Fees</p>
                        </PWrapper>
                        <Row>
                        <Col sm={6} className='my-0 py-0'>
                        <Form.Group className="" controlId="exampleForm.ControlInput1">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control size="sm" type="text" placeholder=""  id='amount'/>
                    </Form.Group>

                        </Col>
                        <Col sm={6} className='my-0 py-0'>
                        <Form.Group className="" controlId="exampleForm.ControlInput1">
                        <Form.Label>Advance</Form.Label>
                        <Form.Control size="sm" type="text" placeholder=""  id='advance'/>
                    </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6} className='my-0 py-0'>
                        <Form.Group className="pt-1" controlId="exampleForm.ControlInput1">
                        <Form.Label>Guarantee %</Form.Label>
                        <Form.Control size="sm" type="text" placeholder=""  id='guarantee'/>
                    </Form.Group>

                        </Col>
                        <Col sm={6} className='my-0 py-0'>
                        <Form.Group className="pt-1" controlId="exampleForm.ControlInput1">
                        <Form.Label>Monitoring (NGN)</Form.Label>
                        <Form.Control size="sm" type="text" placeholder=""  id='monitoring'/>
                    </Form.Group>
                        </Col>
                    </Row>
                    </div>

                    {/*-------------------- Radio Buttons ------------------------------ */}

                    <div className='radioButtons mt-1 pt-2'>
                        <Row>
                            <Col sm={6} className='my-0 py-0'>
                                <Stack>
                                    <div>Lorem ipsum dolor sit amet.</div>
                                    <div>Lorem ipsum dolor sit amet.</div>
                                    <div>Lorem ipsum dolor sit amet.</div>
                                    <div>Lorem ipsum dolor sit amet.</div>
                                    <div>Lorem ipsum dolor sit amet.</div>

                                </Stack>
                            </Col>
                            <Col sm={6} style={{display:'grid', justifyContent:'right',paddingRight:'1rem'}}>
                                <Stack>
                                    <div className='radioBtn'>
                                       <span style={{paddingRight:'1em'}}><input type='radio' className='text-success'/></span>
                                        <input type='radio'/>
                                    </div>
                                    <div>
                                    <span style={{paddingRight:'1em'}}><input type='radio'/></span>
                                        <input type='radio'/>
                                    </div>
                                    <div>
                                    <span style={{paddingRight:'1em'}}><input type='radio'/></span>
                                        <input type='radio'/>
                                    </div>
                                    <div>
                                    <span style={{paddingRight:'1em'}}><input type='radio'/></span>
                                        <input type='radio'/>
                                    </div>
                                    <div className='mb-1'>
                                    <span style={{paddingRight:'1em'}}><input type='radio'/></span>
                                        <input type='radio'/>
                                    </div>
                                </Stack>
                            </Col>
                        </Row>
                    </div>
                </Container1>
              
              {/* ------------------  Submit Form Button--------------------  */}
                <ButtonWrapper>
                    Submit
                </ButtonWrapper>

                </Form>
            </Container>
            </FormWrapper>
        </React.Fragment>
    )
}