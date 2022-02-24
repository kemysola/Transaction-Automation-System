import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  color:white;
  background: green;
  margin-right:14px;
  border:1px solid white;
  padding:2px 35px;
  margin-top: 2px;
  margin-bottom: 2px;
  font-weight:bold;
  font-size:10px;
  border-radius:10px;
`;

const FormWrapper = styled.div`
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

export default function UpdateStaffs() {
    const [firstName, setFirstName] = ('');
    const [lastName, setLastName] = ('');
    const [level, setLevel] = ('');
    const [originationTarget, setOriginationTarget] = useState('');
    const [origination, setOrigination] = useState('');
    const [guaranteePipeline, setGuaranteePipeline] = useState('');
    const [amberTransaction, setAmberTransaction] = useState('');
    const [greenTransaction, setGreenTransaction] = useState('')
    const [originator, setOriginator] = useState('')
    const [originationAmount, setOriginationAmount] = useState('')
    const [cca, setCca] = useState('')
    const [mandate, setMandate] = useState('')
    const [feeLetter, SetFeeLetter] = useState('')
    const [financialClose, setFinancialClose] = useState('')



    const handleSubmit = (e) => {
        e.preventDefault();

        if (firstName === '') {
            return false;

        }
        if (lastName === '') {
            return false;
        }
    };

    useEffect(() => {


    },
        []);
    return (
        <React.Fragment>
            <FormWrapper>
                <Container fluid>
                    <Form action='/update/:user_email' method='Post' onSubmit={handleSubmit}>
                        <p style={{ fontWeight: 'bold', fontSize: '12px', color: 'darkblue' }}>Update Staff</p>

                        {/*------------------------------------- Container Div ------------------------ */}

                        <Container1 style={{ marginBottom: '3px', paddingBottom: '10px', fontSize: '8px' }}>

                            {/*----------------------------------- Form ----------------------------------- */}
                            <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
                                <Form.Label style={{ fontWeight: 'bold' }} className="pt-1">First Name</Form.Label>
                                <Form.Control size="sm"
                                    type="text"
                                    placeholder="John Doe"
                                    id='firstName'
                                    onChange={firstName} />
                            </Form.Group>
                            {/*----------------------------------  Form ------------------------------------ */}
                            <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
                                <Form.Label style={{ fontWeight: 'bold' }} className="pt-1">Last Name</Form.Label>
                                <Form.Control size="sm"
                                    type="text"
                                    placeholder="John Doe"
                                    id='lastName'
                                    onChange={lastName} />
                            </Form.Group>

                            {/*--------------------------------- Form ----------------------------------------- */}
                            <Form.Group className="" controlId="exampleForm.ControlInput1">
                                <Form.Label style={{ fontWeight: 'bold' }} className="pt-2">Level</Form.Label>
                                <Form.Control size="sm"
                                    type="text"
                                    placeholder="level"
                                    id='level'
                                    onChange={level} />
                            </Form.Group>
                            {
                                !level && <p>Please enter your level</p>
                            }

                            {/*------------------------------- Form -------------------------------------------- */}

                            <Form.Group className="" controlId="exampleForm.ControlInput1">
                                <Form.Label style={{ fontWeight: 'bold' }} className="pt-2">Has Origination Target?</Form.Label>
                                <br />
                                <div size="sm" style={{ border: '1px solid grey', width: '130px', padding: '5px 10px', lineHeight: '20px', borderRadius: '5px' }}>
                                    <input type='radio'
                                        value="Yes"
                                        name="target"
                                        id='hasOriginationTarget'
                                        onChange={originationTarget}
                                    />
                                    <span style={{ fontWeight: 'bold', paddingRight: '20px', paddingLeft: '10px' }}> Yes </span>
                                    <input type='radio'
                                        value="No"
                                        name="target"
                                        id='hasOriginationTarget'
                                        onChange={originationTarget}
                                    />
                                    <span style={{ fontWeight: 'bold' }}> No </span>
                                </div>
                            </Form.Group>
                        </Container1>
                        <br />
                        {/*---------------------------------- Container Div ----------------------------- */}

                        <Container1 style={{ marginBottom: '3px', paddingBottom: '10px', fontSize: '8px' }}>
                            <p style={{ fontWeight: 'bold', fontSize: '10px' }}>Targets</p>
                            <Row>
                                <Col sm={6}>
                                    <div className='pt-3 mt-1'>
                                        <p style={{ fontWeight: 'bold' }}>Origination (NGN) </p>
                                        <p style={{ fontWeight: 'bold' }}>Guarantee Pipeline (NGN) </p>
                                        <p style={{ fontWeight: 'bold' }}>Green Transaction (NGN) </p>
                                        <p style={{ fontWeight: 'bold' }}>Amber Transaction (NGN) </p>
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <div>
                                        <div className='py-1'>
                                            <Form.Control type="text"
                                                placeholder="0"
                                                size='sm'
                                                id='originationAmount'
                                                onChange={originationAmount}
                                            />
                                            {
                                                !originationAmount && <p>
                                                    Kindly enter an amount
                                                </p>
                                            }
                                        </div>
                                        <div className='py-1'>
                                            <Form.Control type=""
                                                placeholder="0"
                                                size='sm'
                                                id='guaranteePipeline'
                                                onChange={guaranteePipeline} />
                                            {
                                                !guaranteePipeline && <p>Kindly fill</p>
                                            }
                                        </div>
                                        <div className='py-1'>
                                            <Form.Control type=""
                                                placeholder="0"
                                                size='sm'
                                                id='greenTransaction'
                                                onChange={greenTransaction}
                                            />
                                            {!greenTransaction && <p>Kindly fill</p>}
                                        </div>

                                        <div className='py-1'>
                                            <Form.Control type=""
                                                placeholder="0"
                                                size='sm'
                                                id='amberTransaction'
                                                onChange={amberTransaction}
                                            />
                                        </div>

                                    </div>
                                </Col>
                            </Row>
                        </Container1>
                        <br />

                        {/* ----------------------------- Close Div ------------------------ */}

                        <Container1 style={{ marginBottom: '2px', paddingBottom: '6px', fontSize: '8px' }}>
                            <p style={{ fontWeight: 'bold', fontSize: '10px' }}>Performance Pay</p>
                            <Row>
                                <Col sm={4}>
                                    <p style={{ fontWeight: 'bold' }}>% per milestone</p>
                                </Col>

                                <Col sm={8}>

                                    {/*----------------------------- Form ------------------------------- */}
                                    <Form.Group as={Row} className="mb-1" controlId="">
                                        <Form.Label column sm="5">
                                            <small style={{ fontWeight: 'bold' }}>Originator</small>
                                        </Form.Label>
                                        <Col sm="6">
                                            <Form.Control type="text" placeholder="0" size='sm' id='originator' />
                                        </Col>
                                    </Form.Group>

                                    {/*----------------------- Form ------------------------------------------*/}
                                    <Form.Group as={Row} className="mb-1" controlId="">
                                        <Form.Label column sm="5">
                                            <small style={{ fontWeight: 'bold' }}>Mandate Letter (NGN)</small>
                                        </Form.Label>
                                        <Col sm="6">
                                            <Form.Control
                                                type="text"
                                                placeholder="0"
                                                size='sm'
                                                id='mandateLetter'
                                                onChange={mandate} />
                                        </Col>
                                        {
                                            !mandate && <p>Kindly fill </p>
                                        }
                                    </Form.Group>

                                    {/*-------------------------- Form -------------------------------------- */}
                                    <Form.Group as={Row} className="mb-1" controlId="">
                                        <Form.Label column sm="5">
                                            <small style={{ fontWeight: 'bold' }}>Credit Committee Approval(NGN)</small>
                                        </Form.Label>
                                        <Col sm="6">
                                            <Form.Control
                                                type=""
                                                placeholder="0"
                                                size='sm'
                                                id='creditCommiteeApproval'
                                                onChange={cca} />
                                        </Col>
                                        {
                                            !cca && <p>Kindly fill </p>
                                        }
                                    </Form.Group>

                                    {/*--------------------------- Form --------------------------------------- */}
                                    <Form.Group as={Row} className="mb-1" controlId="">
                                        <Form.Label column sm="5">
                                            <small style={{ fontWeight: 'bold' }}>Fee Letter (%)</small>
                                        </Form.Label>
                                        <Col sm="6">
                                            <Form.Control
                                                type=""
                                                placeholder="0"
                                                size='sm'
                                                id='feeLetter'
                                                onChange={feeLetter} />
                                        </Col>
                                    </Form.Group>

                                    {/*--------------------------  Form ---------------------------------------- */}
                                    <Form.Group as={Row} className="" controlId="">
                                        <Form.Label column sm="5">
                                            <small style={{ fontWeight: 'bold' }}>Financial Close (%)</small>
                                        </Form.Label>
                                        <Col sm="6">
                                            <Form.Control type=""
                                                placeholder="0"
                                                size='sm'
                                                id='financialClose'
                                                onChange={financialClose} />
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