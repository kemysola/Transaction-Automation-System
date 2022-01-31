import React from 'react';
import { Form,Container,Row,Col } from 'react-bootstrap';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  color:white;
  background: green;
  margin-right:14px;
  border:1px solid  white;
  padding:2px 35px;
  margin-top: 2px;
  margin-bottom: 2px;
  font-weight:bold;
  font-size:10px;
  border-radius:10px;

`;
const   FormWrapper = styled.div`
padding:0;
font-size:2px;
margin:0;
`;

const Container1 = styled.div`
background:white;
font-size:12px;
padding: 3px 10px;
border-radius: 15px;
width:50vw;
margin:0;
`;
const CancelWrapper = styled.button`
  color:green;
  background: #eff1f1;
  border-radius:10px;
  padding:2px 35px;
  border: 1px solid grey;
  margin-top: 2px;
  margin-bottom: 2px;
  font-size:8px;
  box-shadow : 5px #eff1f1;
  font-weight:bold;
  `;




export default function NewStaffs(){
    return(
        <React.Fragment>
             <FormWrapper>
            <Container fluid>
                <Form action='' method='post'> 

            {/*----------------------------- Title -------------------------------------------------- */}
                    <p style={{fontWeight:'bold',fontSize:'12px', color:'darkblue'}}>New Staff</p>

            {/*--------------------------  End Title ------------------------------------------------ */}

            {/*--------------------------- Form Container -------------------------------------------*/}
                    <Container1 style={{marginBottom:'3px',paddingBottom:'10px', fontSize:'8px'}}>
                        <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
                            <Form.Label style={{fontWeight:'bold'}} className="pt-1">Name</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="John Doe" />
                        </Form.Group>

                        <Form.Group className="" controlId="exampleForm.ControlInput1">
                            <Form.Label style={{fontWeight:'bold'}} className="pt-2">Level</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="level" />
                        </Form.Group>
                        <Form.Group className="" controlId="exampleForm.ControlInput1">
                            <Form.Label style={{fontWeight:'bold'}} className="pt-2">Has Origination Target?</Form.Label>
                            <br/>
                            <div style={{border:'1px solid grey', width:'160px', padding:'5px 10px', lineHeight:'20px', borderRadius:'5px'}}>
                                <input type='checkbox' /> <span style={{fontWeight:'bold', paddingRight:'20px', paddingLeft:'10px'}}> Yes </span>
                                <input type='checkbox' /> <span style={{fontWeight:'bold'}}> No </span>
                            </div>
                        </Form.Group>
                    </Container1>
                    <br/>
            {/*------------------------------------- End Div ---------------------------------------------------- */}

            {/*------------------------------------ Div --------------------------------------------------------- */}
                    <Container1 style={{marginBottom:'3px',paddingBottom:'10px', fontSize:'8px'}}>
                        <p style={{fontWeight:'bold', fontSize:'10px'}}>Targets</p>
                        <Row>
                            <Col sm={6}>
                                <div className='pt-3 mt-1'>
                                    <p style={{fontWeight:'bold'}}>Origination (NGN) </p>
                                    <p style={{fontWeight:'bold'}}>Guarantee Pipeline (NGN) </p>
                                    <p style={{fontWeight:'bold'}}>Green Transaction (NGN) </p>
                                    <p style={{fontWeight:'bold'}}>Amber Transaction (NGN) </p>
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

                {/* ----------------------------------- Close Div --------------------------------------------- */}
                {/*------------------------------------- Div -------------------------------------------------- */}

                    <Container1 style={{marginBottom:'2px',paddingBottom:'6px', fontSize:'8px'}}>
                        <p style={{fontWeight:'bold', fontSize:'10px'}}>Performance Pay</p>
                        <Row>
                            <Col sm={4}>
                                <p style={{fontWeight:'bold'}}>% per milestone</p> 
                            </Col>

                            <Col sm={8}>
                            <Form.Group as={Row} className="mb-1" controlId="">
                                <Form.Label column sm="5">
                                    <small style={{fontWeight:'bold'}}>Mandate Letter (NGN)</small>
                                    </Form.Label>
                            <Col sm="6">
                                <Form.Control type="text" placeholder="0"  size='sm' id='mandateLetter'/>
                            </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-1" controlId="">
                                <Form.Label column sm="5">
                                    <small style={{fontWeight:'bold'}}>Credit Committee Approval(NGN)</small>
                                </Form.Label>
                            <Col sm="6">
                                <Form.Control type="" placeholder="0"  size='sm' id='creditCommiteeApproval'/>
                            </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-1" controlId="">
                                <Form.Label column sm="5">
                                <small style={{fontWeight:'bold'}}>Fee Letter (%)</small>
                                </Form.Label>
                            <Col sm="6">
                                <Form.Control type="" placeholder="0"  size='sm' id='feeLetter'/>
                            </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="" controlId="">
                                <Form.Label column sm="5">
                                <small style={{fontWeight:'bold'}}>Financial Close (%)</small>
                                </Form.Label>
                            <Col sm="6">
                                <Form.Control type="" placeholder="0" size='sm' id='financialClose'/>
                            </Col>
                            </Form.Group>
                            </Col>
                        </Row>   
                    </Container1>
                    {/*-------------------------------- End Div ------------------------------------------- */}

                    {/*-------------------------------- Button --------------------------------------------- */}
                    <ButtonWrapper>
                        Submit
                    </ButtonWrapper>

                    <CancelWrapper>
                        Cancel
                    </CancelWrapper>
                    {/*-------------------------------- End Div --------------------------------------------- */}
                </Form>
            </Container>
            </FormWrapper>
            {/*------------------------------------------ Close Form ----------------------------------------- */}
        </React.Fragment>
    )
}