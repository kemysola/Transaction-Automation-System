import React, { useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import Services from '../../Services/Service';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {Form, Container, Row, Col } from 'react-bootstrap';
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
  const PWrapper = styled.p`
color:#1E2F97;
font-weight:bold;
font-size:11px;
margin:0;
padding: 0;
`;

export default function NewStaff(){
    const initialStaffState = {
        email: "john3.doe@infracredit.com",
        password: "password",
        // id: "",
        firstName: "John2",
        lastName: "Doe2",
        // name: "",
        level: "",
        hasOriginationTarget: false,
        originationAmount: 0,
        guaranteePipeline: 0,
        greenTransaction: 0,
        amberTransaction: 0,
        mandateLetter: 2,
        creditCommiteeApproval: 10,
        feeLetter: 80,
        financialClose: 0,
    };

    const [staff, setStaff] = useState(initialStaffState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => { // function to assign user's input to staff state
        const { name, value } = event.target;
        setStaff({ ...staff, [name]: value });
    };

    const saveStaff = (e) => { // function to save user data and post to db
        e.preventDefault()

        let data = { // store user's input in a variable called data
            "email": "johnnnyddd.doe@infracredit.com",
            "password": "password",
            "firstName": "John2",
            "lastName": "Doe2",
            // name: staff.name,
            "level": "CEO",
            "hasOriginationTarget": staff.hasOriginationTarget,
            "originationAmount": +staff.originationAmount,
            "guaranteePipeline": +staff.guaranteePipeline,
            "greenTransaction": +staff.greenTransaction,
            "amberTransaction": +staff.amberTransaction,
            "mandateLetter": +staff.mandateLetter,
            "creditCommiteeApproval": +staff.creditCommiteeApproval,
            "feeLetter": +staff.feeLetter,
            // financialClose: staff.financialClose,
        };

        console.log(data);
        setSubmitted(true)

        Services.registerStaff(data)
            .then(response => {
                console.log(response.message)
                setSubmitted(true)
            })
            .catch(error => {
                console.log(error)
            });
    };

    const newStaff = () => {
        setStaff(initialStaffState);
        setSubmitted(false);
    };

    const [activeTab, setActiveTab] = useState('first');


    function toNextTab(e) {
        e.preventDefault();
        handleTabChange();
    }

    function toPrevTab(e) {
        e.preventDefault();
        handleTabChange();
    }

    function toNextTabs(e) {
        e.preventDefault();
        changeTabs();
    }

    function changeTabs() {
        if (dealActiveTab === 'sixth') {
            setDealActiveTab('seventh');
        }
    }

    function handleTabChange() {
        if (activeTab === 'first') {
            setActiveTab('second');
        }
        if (activeTab === 'second') {
            setActiveTab('third');
        }
        if (activeTab === 'third') {
            setActiveTab('fourth');
        }
        if (activeTab === 'fourth') {
            setActiveTab('sixth');
        }
    };

    function handlePrevChange() {
        if (activeTab === 'second') {
            setActiveTab('first');
        }
        if (activeTab === 'third') {
            setActiveTab('second');
        }
        if (activeTab === 'fourth') {
            setActiveTab('third');
        }

    }

    return (
        <React.Fragment>
            <FormWrapper>
                <Container fluid>
                    {submitted ? (
                        <Container1>
                            <p style={{ fontWeight: 'bold', fontSize: '12px', color: 'darkblue' }}>You submitted successfully!</p>
                            <ButtonWrapper onClick={newStaff}>Add New Staff</ButtonWrapper>
                        </Container1>

                    ) : (
                        <Form>

                            {/*----------------------------- Title -------------------------------------------------- */}
                            <PWrapper>
                                <h5>New Transaction</h5>
                            </PWrapper>
                            <br />
                            <div>
                                <Tabs activeKey={activeTab} onSelect={(k) => handleTabChange} style={{ fontSize: '12px' }}>
                                    <Tab eventKey="first" title="CLIENT">
                                        <br />
                                        <br />
                                        <Container1 style={{ marginBottom: '3px', paddingBottom: '10px', fontSize: '8px' }}>
                                            <Form.Group className="mb-0">
                                                <Form.Label style={{ fontWeight: 'bold' }} className="pt-1">Name</Form.Label>
                                                <Form.Control size="sm" type="" placeholder="John Doe" value={staff.name} name='Name' onChange={handleInputChange} />
                                            </Form.Group>

                                            <Form.Group className="">
                                                <Form.Label style={{ fontWeight: 'bold' }} className="pt-2">Level</Form.Label>
                                                <Form.Control size="sm" type="text" placeholder="level" value={staff.level} name='Level' onChange={handleInputChange} />
                                            </Form.Group>
                                            <Form.Group className="">
                                                <Form.Label style={{ fontWeight: 'bold' }} className="pt-2">Has Origination Target?</Form.Label>
                                                <br />
                                                <div size="sm" style={{ border: '1px solid grey', width: '130px', padding: '5px 10px', lineHeight: '20px', borderRadius: '5px' }}>
                                                    <input type='radio' value={true} name="hasOriginationTarget" onChange={handleInputChange} /> <span style={{ fontWeight: 'bold', paddingRight: '20px', paddingLeft: '10px' }}> Yes </span>
                                                    <input type='radio' value={false} name='hasOriginationTarget' onChange={handleInputChange} /> <span style={{ fontWeight: 'bold' }}> No </span>
                                                </div>
                                            </Form.Group>
                                            <br />
                                            <button onClick={e => toNextTab(e)} style={{ display: 'inlineBlock' }}>Next </button>
                                        </Container1>
                                        <br />
                                    </Tab>
                                    <Tab eventKey="second" title="TARGETS">
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
                                                            <Form.Control type="number" placeholder="0" size='sm' value={staff.originationAmount} name='originationAmount' onChange={handleInputChange} />
                                                        </div>
                                                        <div className='py-1'>
                                                            <Form.Control type="number" placeholder="0" size='sm' value={staff.guaranteePipeline} name='guaranteePipeline' onChange={handleInputChange} />
                                                        </div>
                                                        <div className='py-1'>
                                                            <Form.Control type="number" placeholder="0" size='sm' value={staff.greenTransaction} name='greenTransaction' onChange={handleInputChange} />
                                                        </div>
                                                        <div className='py-1'>
                                                            <Form.Control type="number" placeholder="0" size='sm' value={staff.amberTransaction} name='amberTransaction' onChange={handleInputChange} />
                                                        </div>

                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container1>
                                        <br />
                                    </Tab>
                                    <Tab eventKey="third" title="PERFORMANCE PAY">
                                        <Container1 style={{ marginBottom: '2px', paddingBottom: '6px', fontSize: '8px' }}>
                                            <p style={{ fontWeight: 'bold', fontSize: '10px' }}>PERFORMANCE PAY</p>
                                            <Row>
                                                <Col sm={4}>
                                                    <p style={{ fontWeight: 'bold' }}>% per milestone</p>
                                                </Col>

                                                <Col sm={8}>
                                                    <Form.Group as={Row} className="mb-1">
                                                        <Form.Label column sm="5">
                                                            <small style={{ fontWeight: 'bold' }}>Mandate Letter (NGN)</small>
                                                        </Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control type="number" placeholder="0" size='sm' id='mandateLetter' value={staff.mandateLetter} name='mandateLetter' onChange={handleInputChange} />
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row} className="mb-1">
                                                        <Form.Label column sm="5">
                                                            <small style={{ fontWeight: 'bold' }}>Credit Committee Approval(NGN)</small>
                                                        </Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control type="number" placeholder="0" size='sm' id='creditCommiteeApproval' value={staff.creditCommiteeApproval} name='creditCommiteeApproval' onChange={handleInputChange} />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} className="mb-1">
                                                        <Form.Label column sm="5">
                                                            <small style={{ fontWeight: 'bold' }}>Fee Letter (%)</small>
                                                        </Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control type="number" placeholder="0" size='sm' id='feeLetter' value={staff.feeLetter} name='feeLetter' onChange={handleInputChange} />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} className="">
                                                        <Form.Label column sm="5">
                                                            <small style={{ fontWeight: 'bold' }}>Financial Close (%)</small>
                                                        </Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control type="number" placeholder="0" size='sm' id='financialClose' value={staff.financialClose} name='financialClose' onChange={handleInputChange} />
                                                        </Col>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <ButtonWrapper onClick={saveStaff} >
                                                Submit
                                            </ButtonWrapper>

                                            <CancelWrapper>
                                                Cancel
                                            </CancelWrapper>
                                        </Container1>
                                    </Tab>
                                </Tabs>
                            </div>
                        </Form>
                    )};
                </Container>
            </FormWrapper>

            {/*------------------------------------------ Close Form ----------------------------------------- */}
        </React.Fragment>
    )
}






