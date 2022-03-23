import React, { useState, useEffect, useRef } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import Service from '../../Services/Service';
import { useHistory } from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import axios from 'axios'

const ButtonWrapper = styled.button`
color:white;
background: green;
border: 1px solid white;
padding: 2px 20px;
font-size:13px;
margin: 10px;
border-radius: 3px
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
color:white;
background: grey;
border: 1px solid grey;
padding: 2px 20px;
font-size:13px;
margin: 10px;
border-radius: 3px
  `;

export default function UpdateStaffs() {

  const firstName = useRef("");
  const lastName = useRef("");
  const level = useRef("");
  const originator = useRef("");
  const hasOriginationTarget = useRef("");
  const originationAmount = useRef("");
  const guaranteePipeline = useRef("")
  const greenTransaction = useRef("");
  const amberTransaction = useRef("");
  const mandateLetter = useRef("");
  const creditCommitteApproval = useRef("");
  const feeLetter = useRef("");
  

    let user_email = window.location.search.split("?")[1]

    const [staff, setStaff] = useState([]);
    const [status, setStatus] = useState(false);
    const history = useHistory();

    
    // const handleInputChange = event => {
    //      // function to save user data to data state
    //     const { name, value } = event.target;
    //     setData({ ...data, [name]: value });
    // }
    
   

 useEffect(() => {
    retrieveStaff();
  }, []);

  const retrieveStaff = async () => {
    const staff_data = await axios.get(
      `http://localhost:5000/api/v1/staff/${user_email}`,
      {headers: {
        token: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json; charset=utf-8',
      }}
    ).catch((e) => {
      console.log(e);
    });
      setStaff(staff_data.data.staffInfo); 
      setStatus(true)
  } ;

  

    const handleSubmit = (e) => {
        e.preventDefault();

        if (firstName === '') {
            return false;

        }
        if (lastName === '') {
            return false;
        }
        if(level === ""){
            console.log('no data')
            return false;

        }

        

        let reqData = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            level: level.current.value,
            // originator: +originator,
            hasOriginationTarget: 1,
            originationAmount: +originationAmount.current.value,
            guaranteePipeline: +guaranteePipeline.current.value,
            greenTransaction: +greenTransaction.current.value,
            amberTransaction: +amberTransaction.current.value,
            // mandateLetter: +data.mandateLetter,
            creditCommitteApproval: +creditCommitteApproval.current.value,
            // feeLetter: +feeLetter
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

    console.log("#####", staff)

    return (
        <React.Fragment>
            <FormWrapper>
                
                <Container fluid>
                    {status ? (
                        <Form onSubmit={handleSubmit}>
                            <p style={{ fontWeight: 'bold', fontSize: '15px', color: 'black', padding: '20px 10px' }}>UPDATE STAFF</p>

                            {/*------------------------------------- Container Div ------------------------ */}
                            <Tabs activeKey={activeTab} onSelect={(k) => handleTabChange} style={{ fontSize: '13px' }}>
                                <Tab eventKey="first" title="STAFF">
                                    <br />
                                    <br />
                                    <Container1 style={{ marginBottom: '3px', padding: '2px 20px', fontSize: '11px' }}>

                                        {/*----------------------------------- Form ----------------------------------- */}
                                        <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
                                            <Form.Label style={{ fontWeight: 'bold' }} className="pt-1">First Name</Form.Label>
                                            <Form.Control size="sm"
                                                type="text"
                                                placeholder=""
                                                id='firstName'
                                                ref={firstName}
                                                defaultValue={staff[0].firstname}
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
                                                ref={lastName}
                                                defaultValue={staff[0].lastname}
                                                name="lastName" />
                                        </Form.Group>

                                        {/*--------------------------------- Form ----------------------------------------- */}
                                        <Form.Group className="" controlId="exampleForm.ControlInput1">
                                            <Form.Label style={{ fontWeight: 'bold' }} className="pt-2">Level</Form.Label>
                                            <Form.Control size="sm"
                                                type="text"
                                                placeholder=""
                                                id='level'
                                                ref={level}
                                                //onChange={handleInputChange}
                                                defaultValue={staff[0].level}
                                                name="level" />
                                    
                                        </Form.Group>
                                        {
                                            !level && <p className='text-danger mt-1'>Please enter your level</p>
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
                                                    // onChange={data.hasOriginationTarget}
                                                //defaultValue={staff[0].}
                                                    
                                                />
                                                <span style={{ fontWeight: 'bold', paddingRight: '20px', paddingLeft: '10px' }}> Yes </span>
                                                <input type='radio'
                                                    value="No"
                                                    name="target"
                                                    id='hasOriginationTarget'
                                                    // onChange={data.hasOriginationTarget}
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
                                                            // value={data.originationAmount}
                                                            // onChange={handleInputChange}
                                                            defaultValue={staff[0].origanationamount}
                                                            ref={originationAmount}
                                                            name="originationAmount"
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
                                                            ref={guaranteePipeline}
                                                            //onChange={handleInputChange}
                                                            defaultValue={staff[0].guaranteepipeline}
                                                            name="guaranteePipeline"
                                                        />
                                                        {
                                                            !guaranteePipeline && <p>Kindly fill</p>
                                                        }
                                                    </div>
                                                    <div className='py-1'>
                                                        <Form.Control type=""
                                                            placeholder="0"
                                                            size='sm'
                                                            id='greenTransaction'
                                                            ref={greenTransaction}
                                                            defaultValue={staff[0].greentransaction}
                                                            // onChange={handleInputChange}
                                                            name="greenTransaction"
                                                        />
                                                        {!greenTransaction && <p>Kindly fill</p>}
                                                    </div>

                                                    <div className='py-1'>
                                                        <Form.Control type=""
                                                            placeholder="0"
                                                            size='sm'
                                                            id='amberTransaction'
                                                            // value={data.amberTransaction}
                                                            // onChange={handleInputChange}
                                                            defaultValue={staff[0].ambertransaction}
                                                            ref={amberTransaction}
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
                                                            ref={originator}
                                                            // onChange={handleInputChange}
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
                                                            ref={mandateLetter}
                                                            // onChange={handleInputChange}
                                                            name="mandateLetter"
                                                        />
                                                    </Col>
                                                    {
                                                        !mandateLetter && <p>Kindly fill </p>
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
                                                            ref={creditCommitteApproval}
                                                            // onChange={handleInputChange}
                                                            // name="creditCommitteApproval"
                                                        />
                                                    </Col>
                                                    {
                                                        !creditCommitteApproval && <p>Kindly fill </p>
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
                                                            ref={feeLetter}
                                                            //onChange={handleInputChange}
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
                                                            //ref={financialClose}
                                                            //onChange={handleInputChange}
                                                            name="financialClose"
                                                        />

                                                    </Col>

                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <button onClick={e => toPrevTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>Prev</button>

                                    </Container1>
                                    <div className='d-flex justify-content-end'>
                                        <ButtonWrapper>
                                            Submit
                                        </ButtonWrapper>

                                        <CancelWrapper>
                                            Cancel
                                        </CancelWrapper>
                                    </div>
                        
                                </Tab>
                            </Tabs>
                        </Form>
                    ) : (
                        <div>
                            <p style={{fontWeight:'bold',fontSize:'12px', color:'darkblue', marginTop:'1rem'}}>Loading</p>
                      </div>
                    )};
                </Container>
            </FormWrapper>
        </React.Fragment>
    )
}