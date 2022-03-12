import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import Service from '../../Services/Service';
import { useHistory } from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

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

    const initialDataState = {
        firstName: "",
        lastName: "",
        level: "",
        originator: "",
        hasOriginationTarget: "",
        originationAmount: "",
        guaranteePipeline: "",
        greenTransaction: "",
        amberTransaction: "",
        mandateLetter: "",
        creditCommitteApproval: "",
        feeLetter: "",
    }

    const [data, setData] = useState(initialDataState)
    const history = useHistory();

    useEffect(() => {

    },[])
    
    const handleInputChange = event => {
         // function to save user data to data state
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
      }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (data.firstName === '') {
            return false;

        }
        if (data.lastName === '') {
            return false;
        }
        if(data.level === ""){
            console.log('no data')
            return false;

        }

        let user_email = window.location.search.split("?")[1]


        let reqData = {
            firstName: data.firstName,
            lastName: data.lastName,
            level: data.level,
            // originator: +data.originator,
            hasOriginationTarget: 1,
            originationAmount: +data.originationAmount,
            guaranteePipeline: +data.guaranteePipeline,
            greenTransaction: +data.greenTransaction,
            amberTransaction: +data.amberTransaction,
            // mandateLetter: +data.mandateLetter,
            creditCommitteApproval: +data.creditCommitteApproval,
            // feeLetter: +data.feeLetter
        }

        Service.updateStaff(user_email, reqData)
            .then((response) => {
                console.log(response)
                alert(response.data.message)
                history.push({
                    pathname: "/staffs",
                  });
            })
            .catch(error => {
                alert("Failed to Update Deal")
              }) 
    };

    const [activeTab, setActiveTab] = useState('first')

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

    useEffect(() => {


    },
        []);
    return (
        <React.Fragment>
            <FormWrapper>
                
                <Container fluid>
                    <Form onSubmit={handleSubmit}>
                        <p style={{ fontWeight: 'bold', fontSize: '15px', color: 'black',padding:'20px 10px' }}>UPDATE STAFF</p>

                        {/*------------------------------------- Container Div ------------------------ */}
                        <Tabs activeKey={activeTab} onSelect={(k) => handleTabChange} style={{ fontSize: '13px' }}>
                            <Tab eventKey="first" title="STAFF">
                                <br />
                                <br />
                        <Container1 style={{ marginBottom: '3px', padding: '2px 20px', fontSize: '11px'  }}>

                            {/*----------------------------------- Form ----------------------------------- */}
                            <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
                                <Form.Label style={{ fontWeight: 'bold' }} className="pt-1">First Name</Form.Label>
                                <Form.Control size="sm"
                                    type="text"
                                    placeholder=""
                                    id='firstName'
                                    value={data.firstName}
                                    onChange={handleInputChange}
                                    name="firstName"
                                />
                            </Form.Group>
                            {/*----------------------------------  Form ------------------------------------ */}
                            <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
                                <Form.Label style={{ fontWeight: 'bold' }} className="pt-1">Last Name</Form.Label>
                                <Form.Control size="sm"
                                    type="text"
                                    placeholder=""
                                    id='lastName'
                                    value={data.lastName}
                                    onChange={handleInputChange}
                                    name="lastName"/>
                            </Form.Group>

                            {/*--------------------------------- Form ----------------------------------------- */}
                            <Form.Group className="" controlId="exampleForm.ControlInput1">
                                <Form.Label style={{ fontWeight: 'bold' }} className="pt-2">Level</Form.Label>
                                <Form.Control size="sm"
                                    type="text"
                                    placeholder=""
                                    id='level'
                                    value={data.level}
                                    onChange={handleInputChange}
                                    name="level" />
                                    
                            </Form.Group>
                            {
                                !data.level && <p className='text-danger mt-1'>Please enter your level</p>
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
                                        onChange={data.hasOriginationTarget}
                                    />
                                    <span style={{ fontWeight: 'bold', paddingRight: '20px', paddingLeft: '10px' }}> Yes </span>
                                    <input type='radio'
                                        value="No"
                                        name="target"
                                        id='hasOriginationTarget'
                                        onChange={data.hasOriginationTarget}
                                    />
                                    <span style={{ fontWeight: 'bold' }}> No </span>
                                </div>
                            </Form.Group>
                                <button onClick={e => toNextTab(e)} style={{ display: 'inlineBlock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>Next</button>
                            </Container1>
                            <br />
                        </Tab>
                        <br />
                        {/*---------------------------------- Container Div ----------------------------- */}
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
                                            <Form.Control type="text"
                                                placeholder="0"
                                                size='sm'
                                                id='originationAmount'
                                                value={data.originationAmount}
                                                onChange={handleInputChange}
                                                name="originationAmount"
                                            />
                                            {
                                                !data.originationAmount && <p>
                                                    Kindly enter an amount
                                                </p>
                                            }
                                        </div>
                                        <div className='py-1'>
                                            <Form.Control type=""
                                                placeholder="0"
                                                size='sm'
                                                id='guaranteePipeline'
                                                value={data.guaranteePipeline}
                                                onChange={handleInputChange}
                                                name="guaranteePipeline"
                                            />
                                            {
                                                !data.guaranteePipeline && <p>Kindly fill</p>
                                            }
                                        </div>
                                        <div className='py-1'>
                                            <Form.Control type=""
                                                placeholder="0"
                                                size='sm'
                                                id='greenTransaction'
                                                value={data.greenTransaction}
                                                onChange={handleInputChange}
                                                name="greenTransaction"
                                            />
                                            {!data.greenTransaction && <p>Kindly fill</p>}
                                        </div>

                                        <div className='py-1'>
                                            <Form.Control type=""
                                                placeholder="0"
                                                size='sm'
                                                id='amberTransaction'
                                                value={data.amberTransaction}
                                                onChange={handleInputChange}
                                                name="amberTransaction"
                                            />
                                        </div>

                                    </div>
                                </Col>
                            </Row>
                        
                            <br />
                            <button onClick={e => toPrevTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>Prev</button>
                            <button onClick={e => toNextTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>Next</button>
                        </Container1>

                        <br />
                    </Tab>

                        {/* ----------------------------- Close Div ------------------------ */}
                    <Tab eventKey="third" title="PERFORMANCE PAY">
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
                                            <Form.Control
                                                type="text"
                                                placeholder="0"
                                                size='sm'
                                                id='originator'
                                                value={data.originator}
                                                onChange={handleInputChange}
                                                name="originator"
                                            />
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
                                                value={data.mandateLetter}
                                                onChange={handleInputChange}
                                                name="mandateLetter"
                                            />
                                        </Col>
                                        {
                                            !data.mandateLetter && <p>Kindly fill </p>
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
                                                value={data.creditCommitteApproval}
                                                onChange={handleInputChange}
                                                name="creditCommitteApproval"
                                            />
                                        </Col>
                                        {
                                            !data.creditCommitteApproval && <p>Kindly fill </p>
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
                                                value={data.feeLetter}
                                                onChange={handleInputChange}
                                                name="feeLetter"
                                            />
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
                                                value={data.financialClose}
                                                onChange={handleInputChange}
                                                name="financialClose"
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <button onClick={e => toPrevTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>Prev</button>
                            <button onClick={e => toNextTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>Next</button>
                            </Row>
                        </Container1>
                        <ButtonWrapper>
                            Submit
                        </ButtonWrapper>

                        <CancelWrapper>
                            Cancel
                        </CancelWrapper>
                     </Tab>
                    </Tabs>
                    </Form>
                </Container>
            </FormWrapper>
        </React.Fragment>
    )
}