import React, { useState, useEffect, useRef } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import Service from "../../Services/Service";
import { useHistory } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import axios from "axios";

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

export default function UpdateStaffs() {
  const firstName = useRef("");
  const lastName = useRef("");
  const level = useRef("");
  const originationAmount = useRef("");
  const guaranteePipeline = useRef("");
  const mandateLetter = useRef("");
  const creditCommitteApproval = useRef("");
  const feeLetter = useRef("");
  const status = useRef("");

  let user_email = window.location.search.split("?")[1];

  const [staff, setStaff] = useState([]);
  const [saved, setSaved] = useState(false);
  const [levels, setLevels] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState(false);
  const [isadmin, setisAdmin] = useState("");
  const [isoriginator, setIsOriginator] = useState("");
  const [istransactor, setIsTransactor] = useState("");
  const [istransactionlegallead, setIsTransactionLegalLead] = useState("");
  const [targs, setTargs] = useState("");
  const [officeType, setOfficeType] = useState("")
  const [showOffice, setShowOffice] = useState(false)
  // const [mands, setMands] = useState(0);



  // ************************************************** Display Office Type **************************************
//  console.log(staff)
 
  // if (staff.length > 0 && staff[0].isadmin === true) {
  //   setShowOffice(true)
  // }

const displayOfficeType = () => {
  setShowOffice(true)
}

const offDisplayOfficeType = () => {
  setShowOffice(false)
}


useEffect(() => {
  if (staff.length > 0 && staff[0].isadmin === true) {
    setShowOffice(true)
  } else
  setShowOffice(false)
}, [staff]);

// *********************************************

  const history = useHistory();

  useEffect(() => {
    retrieveLevel();
  }, []);

  const retrieveLevel = () => {
    Service.getLevel()
      .then((response) => {
        setLevels(response.data.levels);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveStaff();
  }, []);

  const statusOption = [
    {
      id: 1,
      option: "Active",
    },
    {
      id: 2,
      option: "Inactive",
    },
  ];

  const retrieveStaff = async () => {
    const staff_data = await axios
      .get(
        `https://trms01-server.azurewebsites.net/api/v1/staff/${user_email}`,
        // `http://localhost:5001/api/v1/staff/${user_email}`,

        {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
            "Content-type": "application/json; charset=utf-8",
          },
        }
      )
      .catch((e) => {
        console.log(e);
      });
    setStaff(staff_data.data.staffInfo);
    setisAdmin(staff_data.data.staffInfo[0].isadmin);
    setIsOriginator(staff_data.data.staffInfo[0].isoriginator);
    setIsTransactor(staff_data.data.staffInfo[0].istransactor);
    setIsTransactionLegalLead(
      staff_data.data.staffInfo[0].istransactionlegallead
    );
    setTargs(staff_data.data.staffInfo[0].hasoriginationtarget);
    setSaved(true);
    setOfficeType(staff_data.data.staffInfo[0].office_type)
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (firstName === "") {
      return false;
    }
    if (lastName === "") {
      return false;
    }
    if (level === "") {
      return false;
    }

    let reqData = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      isadmin: JSON.parse(isadmin),
      level: level.current.value,
      hasOriginationTarget: JSON.parse(targs),
      originationAmount: +originationAmount.current.value,
      guaranteePipeline: +guaranteePipeline.current.value,
      mandateLetter: +mandateLetter.current.value,
      creditCommiteeApproval: +creditCommitteApproval.current.value,
      feeLetter: +feeLetter.current.value,
      status: status.current.value,
      isOriginator: JSON.parse(isoriginator),
      isTransactor: JSON.parse(istransactor),
      isTransactionLegalLead: JSON.parse(istransactionlegallead),
      office_type: officeType
    };
    Service.updateStaff(user_email, reqData)
      .then((response) => {
        alert(response.data.message);
        setResponse(response.data.message);
        history.push({
          pathname: "/deal_team",
        });
      })
      .catch((error) => {
        setResponse("Failed to Update staff");
      });
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
          {saved ? (
            <Form onSubmit={handleSubmit}>
              <h5 className="text-secondary mb-2 py-2 mt-1">Update User</h5>
              <br />

              {/*------------------------------------- Container Div ------------------------ */}
              <div></div>
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
                      fontSize: "13px",
                    }}
                  >
                    <Row>
                      {/*----------------------------------- Form ----------------------------------- */}
                      <Col sm={6} className="mt-1 pt-1">
                        <Form.Group className="mb-0 mt-2 pt-2 pb-1">
                          <Form.Label className="pt-1">* First Name</Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            placeholder=""
                            id="firstName"
                            ref={firstName}
                            defaultValue={staff[0].firstname}
                            name="firstName"
                          />
                        </Form.Group>
                      </Col>

                      <Col sm={6} className="mt-1 pt-1">
                        <Form.Group className="mb-0 mt-2 pt-2 pb-1">
                          <Form.Label className="pt-1">* Last Name</Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            placeholder=""
                            id="lastName"
                            ref={lastName}
                            defaultValue={staff[0].lastname}
                            name="lastName"
                          />
                        </Form.Group>
                      </Col>

                      {/*--------------------------------- Form ----------------------------------------- */}
                      <Col sm={6} className="mt-1 pt-1">
                        <Form.Group>
                          <Form.Label className="pt-1">* Level</Form.Label>
                          <Form.Select
                            size="sm"
                            value={staff.level}
                            name="level"
                            ref={level}
                            required
                          >
                            <option defaultValue={staff[0].level}>
                              {staff[0].level}
                            </option>
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
                        {!level && (
                          <p className="text-danger mt-1">
                            Please enter your level
                          </p>
                        )}
                      </Col>

                      <Col sm={6} className="mt-1 pt-1">
                        <Form.Group>
                          <Form.Label className="pt-1">* Status</Form.Label>
                          <Form.Select
                            size="sm"
                            value={staff.status}
                            name="status"
                            ref={status}
                            required
                          >
                            {statusOption.map((item, i) => (
                              <option
                                key={statusOption[i].id}
                                value={statusOption[i].option}
                                selected={
                                  statusOption[i].option === staff[0].status
                                }
                              >
                                {statusOption[i].option}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                        {!status && (
                          <p className="text-danger mt-1">
                            Please select status
                          </p>
                        )}
                      </Col>

                      <Col sm={6} className="mt-1 pt-1">
                        <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                          <Row>
                            {/* <Col sm={2}  className='mt-3 pt-2'> */}
                            <Form.Label className="pt-1">Admin</Form.Label>
                            {/* </Col> */}
                            <Col sm={6}>
                              <Form.Check
                                inline
                                label="Yes"
                                type="radio"
                                value={true}
                                defaultChecked={staff[0].isadmin === true}
                                name="isadmin"
                                onChange={(e) => setisAdmin(e.target.value)}
                                onClick={displayOfficeType}
                              />
                              <Form.Check
                                inline
                                label="No"
                                type="radio"
                                value={false}
                                defaultChecked={staff[0].isadmin === false}
                                name="isadmin"
                                onChange={(e) => setisAdmin(e.target.value)}
                                onClick={offDisplayOfficeType}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Col>

                      <Col sm={6} className="mt-1 pt-1">
                        <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                          <Row>
                            {/* <Col sm={2}  className='mt-3 pt-2'> */}
                            <Form.Label className="pt-1">
                              isTransactor
                            </Form.Label>
                            {/* </Col> */}
                            <Col sm={6}>
                              <Form.Check
                                inline
                                label="Yes"
                                type="radio"
                                value={true}
                                defaultChecked={staff[0].istransactor === true}
                                name="istransactor"
                                onChange={(e) =>
                                  setIsTransactor(e.target.value)
                                }
                              />
                              <Form.Check
                                inline
                                label="No"
                                type="radio"
                                value={false}
                                defaultChecked={staff[0].istransactor === false}
                                name="istransactor"
                                onChange={(e) =>
                                  setIsTransactor(e.target.value)
                                }
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Col>
                      {showOffice ?
                      <Row>
                      <Col sm={6} className="mt-1 pt-1">
                          <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Row>
                              {/* <Col className="pt-1"> */}
                                <Form.Label>Office Type</Form.Label>
                              {/* </Col> */}
                              <Col sm={12}>
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="Front Office"
                                  value="Front Office"
                                  name="office_type"
                                  onChange={(e) => setOfficeType(e.target.value)}
                                  defaultChecked={staff[0].office_type === 'Front Office'}
                                />
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="Back Office"
                                  value="Back Office"
                                  name="office_type"
                                  onChange={(e) => setOfficeType(e.target.value)}
                                  defaultChecked={staff[0].office_type === 'Back Office'}
                                />
                              </Col>
                            </Row>
                          </Form.Group>
                        </Col>
                      </Row>
                      :
                      null
                      }
                      <Col sm={6} className="mt-1 pt-1">
                        <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                          <Row>
                            {/* <Col sm={2}  className='mt-3 pt-2'> */}
                            <Form.Label className="pt-1">
                              isOriginator:
                            </Form.Label>
                            {/* </Col> */}
                            <Col sm={6}>
                              <Form.Check
                                inline
                                label="Yes"
                                type="radio"
                                value={true}
                                defaultChecked={staff[0].isoriginator === true}
                                name="isOriginator"
                                onChange={(e) =>
                                  setIsOriginator(e.target.value)
                                }
                              />
                              <Form.Check
                                inline
                                label="No"
                                type="radio"
                                value={false}
                                defaultChecked={staff[0].isoriginator === false}
                                name="isOriginator"
                                onChange={(e) =>
                                  setIsOriginator(e.target.value)
                                }
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Col>
                      <Col sm={6} className="mt-1 pt-1">
                        <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                          <Row>
                            {/* <Col sm={2}  className='mt-3 pt-2'> */}
                            <Form.Label className="pt-1">
                              isTransactionLegalLead:
                            </Form.Label>
                            {/* </Col> */}
                            <Col sm={6}>
                              <Form.Check
                                inline
                                label="Yes"
                                type="radio"
                                value={true}
                                defaultChecked={
                                  staff[0].istransactionlegallead === true
                                }
                                name="isTransactionLegalLead"
                                onChange={(e) =>
                                  setIsTransactionLegalLead(e.target.value)
                                }
                              />
                              <Form.Check
                                inline
                                label="No"
                                type="radio"
                                value={false}
                                defaultChecked={
                                  staff[0].istransactionlegallead === false
                                }
                                name="isTransactionLegalLead"
                                onChange={(e) =>
                                  setIsTransactionLegalLead(e.target.value)
                                }
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Col>

                      {/*------------------------------- Form -------------------------------------------- */}
                    </Row>
                    <br />
                    <br />
                  </Container1>
                  <br />
                </Tab>
                <br />
                {/*---------------------------------- Container Div ----------------------------- */}
                <Tab eventKey="second" title="TARGETS">
                  <Container1
                    style={{
                      marginBottom: "3px",
                      padding: "2px 20px",
                      fontSize: "13px",
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
                            value={true}
                            defaultChecked={
                              staff[0].hasoriginationtarget === true
                            }
                            name="hasOriginationTarget"
                            onChange={(e) => setTargs(e.target.value)}
                          />
                          <Form.Check
                            inline
                            label="No"
                            type="radio"
                            value={false}
                            defaultChecked={
                              staff[0].hasoriginationtarget === false
                            }
                            name="hasOriginationTarget"
                            onChange={(e) => setTargs(e.target.value)}
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
                            type="text"
                            placeholder="0"
                            size="sm"
                            id="originationAmount"
                            defaultValue={staff[0].originationamount}
                            ref={originationAmount}
                            name="originationAmount"
                            disabled={
                              targs === "false" ||
                              staff[0].hasoriginationtarget === false
                            }
                          />{" "}
                        </Form.Group>

                        {!originationAmount && <p>Kindly enter an amount</p>}
                      </Col>
                      <Col sm={6}>
                        <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                          <Form.Label>Guarantee Pipeline (₦'BN)</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="0"
                            size="sm"
                            id="guaranteePipeline"
                            ref={guaranteePipeline}
                            //onChange={handleInputChange}
                            defaultValue={staff[0].guaranteepipeline}
                            name="guaranteePipeline"
                          />{" "}
                        </Form.Group>

                        {!guaranteePipeline && <p>Kindly fill</p>}
                      </Col>
                    </Row>

                    <br />
                    <br />
                  </Container1>
                  <br />
                </Tab>

                {/* ----------------------------- Close Div ------------------------ */}
                <Tab eventKey="third" title="PERFORMANCE PAY">
                  <Container1
                    style={{
                      marginBottom: "2px",
                      paddingBottom: "6px",
                      fontSize: "13px",

                    }}
                  >
                    <Row className='mt-3 pt-3'>
                      <Col sm={4}>
                        <p style={{ fontWeight: "bold", fontSize: "11px" }}>
                          % per milestone
                        </p>
                      </Col>

                      <Col sm={8}>
                        {/*----------------------------- Form ------------------------------- */}
                        {/* <Form.Group as={Row} className='mt-2  pb-1 mb-1 pt-2'>
                                                    <Form.Label column sm="5">
                                                        <p style={{ fontWeight: 'normal', fontSize: '11px'  }}>Originator</p>
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
                                                </Form.Group> */}

                        {/*----------------------- Form ------------------------------------------*/}
                        <Form.Group as={Row} className="mb-1" controlId="">
                          <Form.Label column sm="5">
                            <p
                              style={{ fontWeight: "normal", fontSize: "11px" }}
                            >
                              Mandates Originated
                            </p>
                          </Form.Label>
                          <Col sm="6">
                            <Form.Control
                              type="number"
                              placeholder="0"
                              size="sm"
                              id="mandateLetter"
                              ref={mandateLetter}
                              name="mandateLetter"
                              defaultValue={staff[0].mandateletter}
                              // value={mands}
                              // onChange={e => setMands(e.target.value)}
                            />
                            {/* <Form.Control type="" placeholder="0" size='sm' id='mandateLetter' value={mands} name='mandateLetter' onChange={e => setMands(e.target.value)} /> */}
                          </Col>
                          {/* {
                                                        !mandateLetter && <p>Kindly fill </p>
                                                    } */}
                        </Form.Group>

                        {/*-------------------------- Form -------------------------------------- */}
                        <Form.Group as={Row} className="mt-2  pb-1 mb-1 pt-2">
                          <Form.Label column sm="5">
                            <p
                              style={{ fontWeight: "normal", fontSize: "11px" }}
                            >
                              Credit Committee Approval
                            </p>
                          </Form.Label>
                          <Col sm="6">
                            <Form.Control
                              type=""
                              placeholder="0"
                              size="sm"
                              id="creditCommiteeApproval"
                              ref={creditCommitteApproval}
                              defaultValue={staff[0].creditcommiteeapproval}
                            />
                          </Col>
                          {!creditCommitteApproval && <p>Kindly fill </p>}
                        </Form.Group>

                        {/*--------------------------- Form --------------------------------------- */}
                        <Form.Group as={Row} className="mb-1" controlId="">
                          <Form.Label column sm="5">
                            <p
                              style={{ fontWeight: "normal", fontSize: "11px" }}
                            >
                              Fee Letter
                            </p>
                          </Form.Label>
                          <Col sm="6">
                            <Form.Control
                              type=""
                              placeholder="0"
                              size="sm"
                              id="feeLetter"
                              ref={feeLetter}
                              name="feeLetter"
                              defaultValue={staff[0].feeletter}
                            />
                          </Col>
                        </Form.Group>

                        {/*--------------------------  Form ---------------------------------------- */}
                        <Form.Group as={Row} className="" controlId="">
                          <Form.Label column sm="5">
                            <p
                              style={{ fontWeight: "normal", fontSize: "11px" }}
                            >
                              Financial Close
                            </p>
                          </Form.Label>
                          <Col sm="6">
                            <Form.Control
                              type=""
                              placeholder="0"
                              size="sm"
                              id="financialClose"
                              name="financialClose"
                              disabled
                            />
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>
                    <br />
                    <br />
                    {/* <button onClick={e => toPrevTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>Prev</button> */}
                  </Container1>
                </Tab>
              </Tabs>
              <div className="d-flex justify-content-end">
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    color: "red",
                    marginTop: "1rem",
                  }}
                >
                  {response}
                </p>
                <ButtonWrapper>Submit</ButtonWrapper>
              </div>
            </Form>
          ) : (
            <div>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  color: "darkblue",
                  marginTop: "1rem",
                }}
              >
                Loading
              </p>
            </div>
          )}
          ;
        </Container>
      </FormWrapper>
    </React.Fragment>
  );
}
