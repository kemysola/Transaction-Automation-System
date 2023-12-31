import React, { useState, useEffect } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import Services from "../../Services/Service";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

const ButtonWrapper = styled.button`
color: white;
background: black;
margin-right: 14px;
border: 1px solid white;
padding: 13px 23px;
margin-top: 8px;
margin-bottom: 8px;
font-weight: bold;
font-size: 10px;
border-radius: 5px;
`;

const FormWrapper = styled.div`
  padding: 0;
  font-size: 2px;
  margin: 0;
  border-radius: 5px;
  border: 1.2px dashed #e2e2e2;
`;

const Container1 = styled.div`
  font-size: 10px;
  padding: 3px 2px;
  border-radius: 5px;
  margin: 0;
  border: 1.2px dashed #e2e2e2;
`;

const CancelWrapper = styled.button`
color: black;
background: white;
margin-right: 14px;
border: 1px solid white;
padding: 13px 23px;
margin-top: 8px;
margin-bottom: 8px;
font-weight: bold;
font-size: 10px;
border-radius: 5px;
`;

const PWrapper = styled.p`
  // color: #1e2f97;
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
    isOriginator: "false",
    isTransactor: "false",
    isTransactionLegalLead: "false",
    office_type: "Front Office"
  };

  // ******************************************  use state hook to store state ****************************************

  const [staff, setStaff] = useState(initialStaffState);
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState(false);
  const [target, setTarget] = useState();
  const [levels, setLevels] = useState([]);
  const [showOffice, setShowOffice] = useState(false)

  // ******************************************  useEffect hook: componentDidMount and Receive - level ****************

  useEffect(() => {
    retrieveLevel();
  }, []);

  // ******************************************  Axios call : get level ****************************************

  const retrieveLevel = () => {
    Services.getLevel()
      .then((response) => {
        setLevels(response.data.levels);
      })
      .catch((e) => {});
  };

  const handleInputChange = (event) => {
    // function to assign user's input to staff state
    const { name, value } = event.target;
    setStaff({ ...staff, [name]: value });
  };

  const handleRadioChange = (event) => {
    setTarget(event.target.value);
  };

// ************************************************** Display Office Type **************************************

const displayOfficeType = () => {
  setShowOffice(true)
}

const offDisplayOfficeType = () => {
  setShowOffice(false)
}

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
      isOriginator: JSON.parse(staff.isOriginator),
      isTransactor: JSON.parse(staff.isTransactor),
      isTransactionLegalLead: JSON.parse(staff.isTransactionLegalLead),
      office_type: staff.office_type
    };
    /// ******************************************  Axios post request  ****************************************

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

  // ****************************************** Next and Previous Button ****************************************

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
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  color: "black",
                  marginTop: "1rem",
                }}
              >
                {response}
              </p>
              <ButtonWrapper onClick={newStaff}>
                Create a New User
              </ButtonWrapper>
            </Container1>
          ) : (
            <Form>
              {/*----------------------------- Title -------------------------------------------------- */}
              <h5 className="text-secondary py-2 mb-2 mt-1">
                Create a New User
              </h5>
              <br />
              <div>
                <Tabs
                  onSelect={(k) => handleTabChange}
                  style={{ fontSize: "13px",background:'#E2E2E2',padding:'10px' }}
                >
                  <Tab eventKey="first" title="USER">
                    <br />
                    <br />
                    <Container1
                      style={{
                        marginBottom: "3px",
                        padding: "2px 20px",
                        fontSize: "11px",
                      }}
                    >
                      <Row>
                        <Col sm={6} className="mt-1 pt-1">
                          <Form.Group className="mb-0 mt-2 pt-2 pb-1">
                            <Form.Label>* First Name</Form.Label>
                            <Form.Control
                              size="sm"
                              type="text"
                              value={staff.firstName}
                              onChange={handleInputChange}
                              name="firstName"
                              required
                            />
                          </Form.Group>
                        </Col>

                        <Col sm={6} className="mt-1 pt-1">
                          <Form.Group className="mb-0 mt-2 pt-2 pb-1">
                            <Form.Label>* Last Name</Form.Label>
                            <Form.Control
                              size="sm"
                              type="text"
                              value={staff.lastName}
                              onChange={handleInputChange}
                              name="lastName"
                              required
                            />
                          </Form.Group>
                        </Col>

                        <Col sm={6} className="mt-1 pt-1">
                          <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Form.Label>* Email</Form.Label>
                            <Form.Control
                              size="sm"
                              type="email"
                              value={staff.email}
                              name="email"
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col sm={6} className="mt-2 pt-2">
                          <Form.Group>
                            <Form.Label>* Level</Form.Label>
                            <Form.Select
                              size="sm"
                              value={staff.level}
                              name="level"
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Select</option>
                              {levels.map((level, i) => (
                                <option
                                  key={levels[i].levelid}
                                  value={levels[i].stafflevel}
                                >
                                  {levels[i].stafflevel}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>

                      </Row>
                      <Row>
                        <Col sm={6}>
                          <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Row>
                              <Col className="mt-3 pt-2">
                                <Form.Label>Admin</Form.Label>
                              </Col>
                              <Col className="mt-3 pt-2">
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="Yes"
                                  value={true}
                                  name="isadmin"
                                  onChange={handleInputChange}
                                  onClick={displayOfficeType}
                                />
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="No"
                                  value={false}
                                  name="isadmin"
                                  onChange={handleInputChange}
                                  onClick={offDisplayOfficeType}
                                  defaultChecked
                                />
                              </Col>
                            </Row>
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Row>
                              <Col className="mt-3 pt-2">
                                <Form.Label>Originator </Form.Label>
                              </Col>
                              <Col className="mt-3 pt-2">
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="Yes"
                                  value={true}
                                  name="isOriginator"
                                  onChange={handleInputChange}
                                />
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="No"
                                  value={false}
                                  name="isOriginator"
                                  onChange={handleInputChange}
                                  defaultChecked
                                />
                              </Col>
                            </Row>
                          </Form.Group>
                        </Col>
                      </Row>
                      {showOffice && 
                      <Row>
                      <Col sm={6}>
                          <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Row>
                              <Col className="mt-3 pt-2">
                                <Form.Label>Office Type</Form.Label>
                              </Col>
                              <Col className="mt-3 pt-2">
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="Front Office"
                                  value="Front Office"
                                  name="office_type"
                                  onChange={handleInputChange}
                                  defaultChecked
                                />
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="Back Office"
                                  value="Back Office"
                                  name="office_type"
                                  onChange={handleInputChange}
                                />
                              </Col>
                            </Row>
                          </Form.Group>
                        </Col>
                      </Row>
                      }
                      <Row>
                        <Col sm={6}>
                          <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Row>
                              <Col className="mt-3 pt-2">
                                <Form.Label>Transactor </Form.Label>
                              </Col>
                              <Col className="mt-3 pt-2">
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="Yes"
                                  value={true}
                                  name="isTransactor"
                                  onChange={handleInputChange}
                                  defaultChecked
                                />
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="No"
                                  value={false}
                                  name="isTransactor"
                                  onChange={handleInputChange}
                                />
                              </Col>
                            </Row>
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Row>
                              <Col className="mt-3 pt-2">
                                <Form.Label>Transactor Legal Lead </Form.Label>
                              </Col>
                              <Col className="mt-3 pt-2">
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="Yes"
                                  value={true}
                                  name="isTransactionLegalLead"
                                  onChange={handleInputChange}
                                />
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="No"
                                  value={false}
                                  name="isTransactionLegalLead"
                                  onChange={handleInputChange}
                                  defaultChecked
                                />
                              </Col>
                            </Row>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Container1>
                    <br />
                  </Tab>
                  <Tab eventKey="second" title="TARGETS">
                    <Container1
                      style={{
                        marginBottom: "3px",
                        padding: "2px 20px",
                        fontSize: "11px",
                      }}
                    >
                      <Form.Group className="mb-0 mt-3 pt-1 pb-1">
                        <Row>
                          <Col sm={4} className="mt-3 pt-2">
                            <Form.Label>* Has Orignation Target?</Form.Label>
                          </Col>

                          <Col sm={4} className="mt-3 pt-2">
                            <Form.Check
                              inline
                              label="Yes"
                              type="radio"
                              name="target"
                              value={true}
                              onChange={handleRadioChange}
                            />
                            <Form.Check
                              inline
                              label="No"
                              type="radio"
                              name="target"
                              value={false}
                              onChange={handleRadioChange}
                            />
                          </Col>
                        </Row>
                      </Form.Group>

                      <p
                        style={{ fontWeight: "bold", fontSize: "11px" }}
                        className="mb-0 mt-1 pt-1 pb-1"
                      >
                        Targets
                      </p>
                      <Row>
                        <Col sm={6}>
                          <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Form.Label>Origination (₦'BN)</Form.Label>
                            <Form.Control
                              size="sm"
                              type="text"
                              value={staff.amount}
                              name="amount"
                              onChange={handleInputChange}
                              disabled={target === "false"}
                            />
                          </Form.Group>
                        </Col>

                        <Col sm={6}>
                          <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Form.Label>Guarantee Pipeline (₦'BN)</Form.Label>
                            <Form.Control
                              size="sm"
                              type="text"
                              value={staff.guarantee}
                              name="guarantee"
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <br />
                    </Container1>

                    <br />
                  </Tab>
                  <Tab eventKey="third" title="PERFORMANCE PAY">
                    <Container1
                      style={{
                        marginBottom: "2px",
                        padding: "2px 20px",
                        fontSize: "11px",
                      }}
                    >
                      <p
                        style={{ fontWeight: "bold", fontSize: "12px" }}
                        className="pt-2 my-2"
                      >
                        Performance Pay
                      </p>
                      <Row>
                        <Col sm={4}>
                          <p style={{ fontWeight: "bold", fontSize: "11px" }}>
                            % per milestone
                          </p>
                        </Col>

                        <Col sm={8}>
                          <Form.Group as={Row} className="mt-2  pb-1 mb-1 pt-2">
                            <Form.Label column sm="5">
                              <p
                                style={{
                                  fontWeight: "normal",
                                  fontSize: "11px",
                                }}
                              >
                                Mandates Originated{" "}
                              </p>
                            </Form.Label>
                            <Col sm="6">
                              <Form.Control
                                type="number"
                                placeholder="0"
                                size="sm"
                                id="mandateLetter"
                                value={staff.mandateLetter}
                                name="mandateLetter"
                                onChange={handleInputChange}
                              />
                            </Col>
                          </Form.Group>

                          <Form.Group as={Row} className="mt-2  pb-1 mb-1 pt-2">
                            <Form.Label column sm="5">
                              <p
                                style={{
                                  fontWeight: "normal",
                                  fontSize: "11px",
                                }}
                              >
                                Credit Committee Approval
                              </p>
                            </Form.Label>
                            <Col sm="6">
                              <Form.Control
                                type="number"
                                placeholder="0"
                                size="sm"
                                id="creditCommiteeApproval"
                                value={staff.creditCommiteeApproval}
                                name="creditCommiteeApproval"
                                onChange={handleInputChange}
                              />
                            </Col>
                          </Form.Group>
                          <Form.Group as={Row} className="pb-1 mb-1 pt-2">
                            <Form.Label column sm="5">
                              <p
                                style={{
                                  fontWeight: "normal",
                                  fontSize: "11px",
                                }}
                              >
                                Fee Letter
                              </p>
                            </Form.Label>
                            <Col sm="6">
                              <Form.Control
                                type="number"
                                placeholder="0"
                                size="sm"
                                id="feeLetter"
                                value={staff.feeLetter}
                                name="feeLetter"
                                onChange={handleInputChange}
                              />
                            </Col>
                          </Form.Group>
                          <Form.Group as={Row} className="">
                            <Form.Label column sm="5">
                              <p
                                style={{
                                  fontWeight: "normal",
                                  fontSize: "11px",
                                }}
                              >
                                Financial Close
                              </p>
                            </Form.Label>
                            <Col sm="6">
                              <Form.Control
                                type="number"
                                placeholder="0"
                                size="sm"
                                id="financialClose"
                                value={staff.financialClose}
                                name="financialClose"
                                onChange={handleInputChange}
                                disabled
                              />
                            </Col>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Container1>
                    <br />
                  </Tab>
                </Tabs>
                <div className="d-flex justify-content-end">
                  <ButtonWrapper onClick={saveStaff}>Submit</ButtonWrapper>
                  {/* <CancelWrapper>Cancel</CancelWrapper> */}
                </div>
              </div>
            </Form>
          )}
          ;
        </Container>
      </FormWrapper>

      {/*------------------------------------------ Close Form ----------------------------------------- */}
    </React.Fragment>
  );
}
