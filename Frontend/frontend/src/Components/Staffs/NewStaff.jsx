import React, { useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import Services from '../../Services/Service';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';



const ButtonWrapper = styled.button`
  color:white;
  background: green;
  border:1px solid  white;
  font-weight:normal;
  font-size:12px;
  margin:10px 15px,
  borderRadius:'8px'
`;
const FormWrapper = styled.div`
padding:0;
font-size:2px;
margin:0;
`;

const Container1 = styled.div`
background:white;
font-size:10px;
padding: 3px 10px;
border-radius: 15px;
width:50vw;
margin:0;
`;
const CancelWrapper = styled.button`
  color:green;
  background: #eff1f1;
  border: 1px solid grey;
  box-shadow : 5px #eff1f1;
  font-weight:normal;
  font-size:12px;
  margin:10px,
  borderRadius:'8px'
  `;
const PWrapper = styled.p`
color:black;
font-weight:bold;
margin:0;
padding: 0;
font-size:13px;
`;

export default function NewStaff() {
    const initialStaffState = {
        email: "john3.doe@infracredit.com",
        password: "password",
        firstName: "John2",
        lastName: "Doe2",
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
        handlePrevChange();
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

    }

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
                            <p style={{ fontWeight: 'bold', fontSize: '16px', color: 'darkblue' }}>You submitted successfully!</p>
                            <ButtonWrapper onClick={newStaff}>Add New Staff</ButtonWrapper>
                        </Container1>

                    ) : (
                        <Form>

                            {/*----------------------------- Title -------------------------------------------------- */}
                            <PWrapper>
                                <p>NEW STAFFS</p>
                            </PWrapper>
                            <br />
                            <div>
                                <Tabs activeKey={activeTab} onSelect={(k) => handleTabChange} style={{ fontSize: '13px' }}>
                                    <Tab eventKey="first" title="STAFFS">
                                        <br />
                                        <br />
                                        <Container1 style={{ marginBottom: '3px', paddingBottom: '10px' }}>
                                            <Form.Group className="py-2 mt-2">
                                                <Form.Label style={{ fontWeight: 'bold',fontSize:'11px' }} className="pt-1">Name:</Form.Label>
                                                <Form.Control size="sm" type="" placeholder="John Doe" value={staff.name} name='Name' onChange={handleInputChange} />
                                            </Form.Group>

                                            <Form.Group className="py-2 mt-2">
                                                <Form.Label style={{ fontWeight: 'bold',fontSize:'11px' }} className="pt-2">Level:</Form.Label>
                                                <Form.Control size="sm" type="text" placeholder="level" value={staff.level} name='Level' onChange={handleInputChange} />
                                            </Form.Group>
                                            <Form.Group className="py-2 mt-2">
                                                <Form.Label style={{ fontWeight: 'bold',fontSize:'11px' }} className="pt-2">Has Orignation Target?</Form.Label>
                                                <br />
                                                <div size="sm" style={{ border: '1px solid grey', width: '130px', padding: '5px 10px', lineHeight: '20px', borderRadius: '5px' }}>
                                                    <input type='radio' value={true} name="hasOriginationTarget" onChange={handleInputChange} /> <span style={{ fontWeight: 'bold', paddingRight: '20px', paddingLeft: '10px' }}> Yes </span>
                                                    <input type='radio' value={false} name='hasOriginationTarget' onChange={handleInputChange} /> <span style={{ fontWeight: 'bold' }}> No </span>
                                                </div>
                                            </Form.Group>
                                            <br />
                                            <button onClick={e => toNextTab(e)} style={{ display: 'inlineBlock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>Next </button>
                                        </Container1>
                                        <br />
                                    </Tab>
                                    <Tab eventKey="second" title="TARGETS">
                                        <Container1 style={{ marginBottom: '3px', paddingBottom: '10px' }}>
                                            <p style={{ fontWeight: 'bold', fontSize: '13px' }} className='pt-2 my-2'>Targets</p>
                                            <Row>
                                                <Col sm={6}>
                                                    <div className='pt-3 mt-1'>
                                                        <p style={{ fontWeight: 'normal', fontSize: '12px' }}>Origination (NGN) </p>
                                                        <p style={{ fontWeight: 'normal', fontSize: '12px' }}>Guarantee Pipeline (NGN) </p>
                                                        <p style={{ fontWeight: 'normal', fontSize: '12px' }}>Green Transaction (NGN) </p>
                                                        <p style={{ fontWeight: 'normal', fontSize: '12px' }}>Amber Transaction (NGN) </p>
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
                                                        <div className='py-1 mb-3'>
                                                            <Form.Control type="number" placeholder="0" size='sm' value={staff.amberTransaction} name='amberTransaction' onChange={handleInputChange} />
                                                        </div>

                                                    </div>
                                                </Col>
                                            </Row>
                                            <button onClick={e => toPrevTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}> Prev</button>
                                            <button onClick={e => toNextTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>Next</button>
                                        </Container1>

                                        <br />
                                    </Tab>
                                    <Tab eventKey="third" title="PERFORMANCE PAY">
                                        <Container1 style={{ marginBottom: '2px', paddingBottom: '6px' }}>
                                            <p style={{ fontWeight: 'bold', fontSize: '13px' }} className='pt-2 my-2'>Performance Pay</p>
                                            <Row>
                                                <Col sm={4}>
                                                    <p style={{ fontWeight: 'bold', fontSize: '13px' }}>% per milestone</p>
                                                </Col>

                                                <Col sm={8}>
                                                    <Form.Group as={Row} className="mb-1">
                                                        <Form.Label column sm="5">
                                                            <p style={{ fontWeight: 'normal', fontSize: '11px' }}>Mandate Letter (NGN)</p>
                                                        </Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control type="number" placeholder="0" size='sm' id='mandateLetter' value={staff.mandateLetter} name='mandateLetter' onChange={handleInputChange} />
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row} className="mb-1">
                                                        <Form.Label column sm="5">
                                                            <p style={{ fontWeight: 'normal', fontSize: '11px' }}>Credit Committee Approval(NGN)</p>
                                                        </Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control type="number" placeholder="0" size='sm' id='creditCommiteeApproval' value={staff.creditCommiteeApproval} name='creditCommiteeApproval' onChange={handleInputChange} />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} className="mb-1">
                                                        <Form.Label column sm="5">
                                                            <p style={{ fontWeight: 'normal', fontSize: '11px' }}>Fee Letter (%)</p>
                                                        </Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control type="number" placeholder="0" size='sm' id='feeLetter' value={staff.feeLetter} name='feeLetter' onChange={handleInputChange} />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} className="">
                                                        <Form.Label column sm="5">
                                                            <p style={{ fontWeight: 'normal', fontSize: '11px' }}>Financial Close (%)</p>
                                                        </Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control type="number" placeholder="0" size='sm' id='financialClose' value={staff.financialClose} name='financialClose' onChange={handleInputChange} />
                                                        </Col>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <br />
                                            <br />
                                            <button onClick={e => toPrevTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>
                                                Prev
                                            </button>
                                        </Container1>
                                        <br />
                                        <br />
                                        <ButtonWrapper onClick={saveStaff} style={{ padding: '6px 15px' }}>
                                            Submit
                                        </ButtonWrapper>

                                        <CancelWrapper style={{ padding: '6px 15px' }}>
                                            Cancel
                                        </CancelWrapper>
                                    </Tab>
                                </Tabs>
                            </div>
                        </Form>
                    )};
                </Container>
            </FormWrapper>

            {/*------------------------------------------ Close Form ----------------------------------------- */}
        </React.Fragment >
    )
}






