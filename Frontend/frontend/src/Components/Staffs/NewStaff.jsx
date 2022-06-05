import React, { useState, useEffect } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import Services from "../../Services/Service";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

const ButtonWrapper = styled.button`
  color: white;
  background: green;
  border: 1px solid white;
  padding: 2px 20px;
  font-size: 13px;
  margin: 10px;
  border-radius: 3px;
`;

const FormWrapper = styled.div`
  padding: 0;
  font-size: 2px;
  margin: 0;
  background: white;
  border-radius: 10px;
`;

const Container1 = styled.div`
  font-size: 10px;
  padding: 3px 10px;
  border-radius: 10px;
  width: 52vw;
  margin: 0;
`;

const CancelWrapper = styled.button`
  color: white;
  background: grey;
  border: 1px solid grey;
  padding: 2px 20px;
  font-size: 13px;
  margin: 10px;
  border-radius: 3px;
`;

const PWrapper = styled.p`
  color: #1e2f97;
  font-weight: bold;
  margin: 1rem 0;
  padding: 0;
  font-size: 11px;
`;

export default function NewStaff() {
  const initialStaffState = {
    email: "",
    firstName: "",
    lastName: "",
    level: "",
    amount: 0,
    guarantee: 0,
    mandateLetter: 2.0,
    creditCommiteeApproval: 8.0,
    feeLetter: 10.0,
    financialClose: 80.0,
    isadmin: "false",
  };

  const [staff, setStaff] = useState(initialStaffState);
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState(false);
  const [target, setTarget] = useState();
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    retrieveLevel();
  }, []);

  const retrieveLevel = () => {
    Services.getLevel()
      .then((response) => {
        setLevels(response.data.levels);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputChange = (event) => {
    // function to assign user's input to staff state
    const { name, value } = event.target;
    setStaff({ ...staff, [name]: value });
  };

  const handleRadioChange = (event) => {
    setTarget(event.target.value);
  };

  const saveStaff = (e) => {
    // function to save user data and post to db
    e.preventDefault();

    let data = {
      // store user's input in a variable called data
      email: staff.email,
      firstName: staff.firstName,
      lastName: staff.lastName,
      level: staff.level,
      originator: 1,
      hasOriginationTarget: JSON.parse(target),
      originationAmount: +staff.amount,
      guaranteePipeline: +staff.guarantee,
      mandateLetter: +staff.mandateLetter,
      creditCommiteeApproval: +staff.creditCommiteeApproval,
      feeLetter: +staff.feeLetter,
      status: "Inactive",
      isadmin: JSON.parse(staff.isadmin),
    };

    Services.registerStaff(data)
      .then((response) => {
        setResponse(response.data.message);
        setSubmitted(true);
      })
      .catch((error) => {
        setResponse("Failed to Create User. Kindly fill required fields");
        setSubmitted(false);
      });
  };

  const newStaff = () => {
    setStaff(initialStaffState);
    setTarget(null);
    setSubmitted(false);
  };

  const [activeTab, setActiveTab] = useState("first");
  function toNextTab(e) {
    e.preventDefault();
    handleTabChange();
  }

  function toPrevTab(e) {
    e.preventDefault();
    handlePrevChange();
  }

  function handleTabChange() {
    if (activeTab === "first") {
      setActiveTab("second");
    }
    if (activeTab === "second") {
      setActiveTab("third");
    }
    if (activeTab === "third") {
      setActiveTab("fourth");
    }
    if (activeTab === "fourth") {
      setActiveTab("sixth");
    }
  }

  function handlePrevChange() {
    if (activeTab === "second") {
      setActiveTab("first");
    }
    if (activeTab === "third") {
      setActiveTab("second");
    }
    if (activeTab === "fourth") {
      setActiveTab("third");
    }
  }

    return (
        <React.Fragment>
            <FormWrapper>
                <Container fluid>
                    {submitted ? (
                        <Container1>
                            <p style={{ fontWeight: 'bold', fontSize: '12px', color: 'black', marginTop: '1rem' }}>{response}</p>
                            <ButtonWrapper onClick={newStaff}>Add New Staff</ButtonWrapper>
                        </Container1>

                    ) : (
                        <Form>

                            {/*----------------------------- Title -------------------------------------------------- */}
                            <h5 className='text-secondary py-2 mb-2 mt-1'>New Staff</h5>

                            {/* <PWrapper> */}
                            {/* </PWrapper> */}
                            <br />
                            <div>
                                <Tabs activeKey={activeTab} onSelect={(k) => handleTabChange} style={{ fontSize: '13px' }}>
                                    <Tab eventKey="first" title="STAFF">
                                        <br />
                                        <br />
                                        <Container1 style={{ marginBottom: '3px', padding: '2px 20px', fontSize: '11px' }}>
                                            <Row>
                                                <Col sm={6} className='mt-1 pt-1'>
                                                <Form.Group className="mb-0 mt-2 pt-2 pb-1">
                                                    <Form.Label>First Name</Form.Label>
                                                    <Form.Control size="sm" type="text" value={staff.firstName} onChange={handleInputChange} name='firstName' required/>
                                                </Form.Group>
                                                </Col>

                                                <Col sm={6} className='mt-1 pt-1'>
                                                <Form.Group className="mb-0 mt-2 pt-2 pb-1">
                                                    <Form.Label>Last Name</Form.Label>
                                                    <Form.Control size="sm" type="text" value={staff.lastName} onChange={handleInputChange} name='lastName' required/>
                                                </Form.Group>
                                                </Col>

                                                <Col sm={6}  className='mt-1 pt-1'>
                                                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                                                        <Form.Label>Email</Form.Label>
                                                        <Form.Control size="sm" type="email" value={staff.email} name='email' onChange={handleInputChange} required/>
                                                    </Form.Group>
                                                </Col>
                                                <Col sm={6}  className='mt-2 pt-2'>
                                                    <Form.Group>
                                                        <Form.Label>Level</Form.Label>
                                                        <Form.Select size="sm" value={staff.level}  name='level' onChange={handleInputChange} required>
                                                            <option value="">Select</option>
                                                            {levels.map((level, i) => (
                                                                <option key={levels[i].levelid} value={levels[i].stafflevel}>{levels[i].stafflevel}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>



                                                <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                                                <Row>       
                                                <Col sm={4}  className='mt-3 pt-2'>
                                                        <Form.Label>Admin</Form.Label>
                                                </Col>
                                                <Col sm={4}  className='mt-3 pt-2'>
                                                            <Form.Check inline type="radio" label="Yes"  value={true} name='isadmin' onChange={handleInputChange} />
                                                            <Form.Check inline type="radio" label="No"  value={false} name='isadmin' onChange={handleInputChange} defaultChecked/>
                
                                                        </Col>
                                                </Row> 
                                            </Form.Group>

                            
                                            </Row>

                                            <button onClick={e => toNextTab(e)} style={{ display: 'inlineBlock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>Next</button>
                                        </Container1>
                                        <br />
                                    </Tab>
                                    <Tab eventKey="second" title="TARGETS">
                                        <Container1 style={{ marginBottom: '3px', padding: '2px 20px', fontSize: '11px'}}>
                                            <Form.Group className="mb-0 mt-3 pt-1 pb-1">
                                                <Row>
                                                    <Col sm={4}  className='mt-3 pt-2'>
                                                        <Form.Label>Has Orignation Target?</Form.Label>
                                                    </Col>
                                                
                                                    <Col sm={4}  className='mt-3 pt-2'>
                                                        <Form.Check inline label="Yes" type="radio" name='target' value={true} onChange={handleRadioChange} />
                                                        <Form.Check inline label="No" type="radio" name='target' value={false} onChange={handleRadioChange}/>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                       
                                            <p style={{ fontWeight: 'bold', fontSize: '11px' }} className='mb-0 mt-1 pt-1 pb-1'>Targets</p>
                                            <Row>
                                                <Col sm={6}>
                                                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                                                        <Form.Label>Origination (₦'BN)</Form.Label>
                                                        <Form.Control size="sm" type="number" value={staff.amount} name='amount' onChange={handleInputChange} disabled={target === "false"}/>
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={6}>
                                                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                                                        <Form.Label>Guarantee Pipeline (₦'BN)</Form.Label>
                                                        <Form.Control size="sm" type="number" value={staff.guarantee} name='guarantee' onChange={handleInputChange}/>
                                                    </Form.Group>
                                                </Col>

                            
                                            </Row>

                                            <br />
                                            <button onClick={e => toPrevTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>Prev</button>
                                            <button onClick={e => toNextTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>Next</button>
                                        </Container1>

                                        <br />
                                    </Tab>
                                    <Tab eventKey="third" title="PERFORMANCE PAY">
                                        <Container1 style={{ marginBottom: '2px', padding: '2px 20px', fontSize: '11px' }}>
                                            <p style={{ fontWeight: 'bold', fontSize: '12px' }} className='pt-2 my-2'>Performance Pay</p>
                                            <Row>
                                                <Col sm={4}>
                                                    <p style={{ fontWeight: 'bold', fontSize: '11px' }}>% per milestone</p>
                                                </Col>

                                                <Col sm={8}  >
                                                    <Form.Group as={Row} className='mt-2  pb-1 mb-1 pt-2'>
                                                        <Form.Label column sm="5">
                                                            <p style={{ fontWeight: 'normal', fontSize: '11px' }}>Mandates Originated </p>
                                                        </Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control type="number" placeholder="0" size='sm' id='mandateLetter' value={staff.mandateLetter} name='mandateLetter' onChange={handleInputChange} />
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row} className='mt-2  pb-1 mb-1 pt-2'>
                                                        <Form.Label column sm="5">
                                                            <p style={{ fontWeight: 'normal', fontSize: '11px' }}>Credit Committee Approval</p>
                                                        </Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control type="number" placeholder="0" size='sm' id='creditCommiteeApproval' value={staff.creditCommiteeApproval} name='creditCommiteeApproval' onChange={handleInputChange} />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} className='pb-1 mb-1 pt-2'>
                                                        <Form.Label column sm="5">
                                                            <p style={{ fontWeight: 'normal', fontSize: '11px' }}>Fee Letter</p>
                                                        </Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control type="number" placeholder="0" size='sm' id='feeLetter' value={staff.feeLetter} name='feeLetter' onChange={handleInputChange} />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} className="">
                                                        <Form.Label column sm="5">
                                                            <p style={{ fontWeight: 'normal', fontSize: '11px' }}>Financial Close</p>
                                                        </Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control type="number" placeholder="0" size='sm' id='financialClose' value={staff.financialClose} name='financialClose' onChange={handleInputChange} disabled/>
                                                        </Col>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <button onClick={e => toPrevTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>
                                                Prev
                                            </button>
                                        </Container1>
                                        <br />
                                        <br />

                                        <div className='d-flex justify-content-end'>
                                            <ButtonWrapper onClick={saveStaff} >
                                                Submit
                                            </ButtonWrapper>

                                            <CancelWrapper>
                                                Cancel
                                            </CancelWrapper>
                                        </div>
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
