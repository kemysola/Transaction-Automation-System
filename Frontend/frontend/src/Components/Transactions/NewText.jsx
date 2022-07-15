import React, { useState, useEffect, useRef } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Form as Fm, Container, Row, Col, Dropdown } from "react-bootstrap";
import styled from "styled-components";
import Services from "../../Services/Service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import { GrAdd } from "react-icons/gr";
import { FiDelete } from "react-icons/fi";

const ButtonWrapper = styled.button`
  background: green;
  border: 1px solid white;
  padding: 12px 21px;
  margin-top: 3px;
  margin-right: 3px;
  font-size: 11px;
  border-radius: 2px;
  color: white;
`;
const FormWrapper = styled.div`
  margin: 0;
  font-size: 5px;
  padding: 0;
`;

const Container1 = styled.div`
  font-size: 12px;
  padding: 1px 1rem;
  border-radius: 15px;
`;

const PWrapper = styled.p`
  color: #1e2f97;
  font-weight: bold;
  font-size: 11px;
  margin: 0;
  padding: 0;
`;

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block text-danger">
        This field is required!
      </div>
    );
  }
};

const AddDeal = () => {
  // ******************************************  Declare Initial state ****************************************

  const initialDealState = {
    clientName: "",
    originator: "",
    transactor: "",
    transactionLegalLead: "",
    industry: "",
    product: "",
    region: "",
    dealSize: 0,
    coupon: 0,
    tenor: 0,
    moratorium: 0,
    repaymentFrequency: "Semi-Annually",
    amortizationStyle: "Annuity",
    mandateLetter: null,
    nbc_approval_date: null,
    nbc_submitted_date: null,
    creditApproval: null,
    feeLetter: null,
    expectedClose: null,
    actualClose: null,
    greenA: "false",
    greenB: "false",
    greenC: "false",
    greenD: "false",
    greenE: "false",
    greenF: "false",
    amberA: "false",
    amberB: "false",
    amberC: "false",
    amberD: "false",
    amberE: "false",
    redA: "false",
    redB: "false",
    redC: "false",
    structuringFeeAmount: 0,
    structuringFeeAdvance: 0,
    guaranteeFee: 0,
    monitoringFee: 0,
    reimbursible: 0,
    notes: "",
    closed: false,
    nbcFocus: [
      {
        //  label: "", concern: "", date: "", methodology: "",
        nbc_focus_original: "",
        nbc_focus_original_yes_no: 0,
        nbc_focus_original_date: null,
        nbc_focus_original_methodology: "",
        nbc_focus_apprv_1_b: "",
        nbc_focus_apprv_1_c: null,
        nbc_focus_apprv_2_b: "",
        nbc_focus_apprv_2_c: null,
        nbc_focus_apprv_3_b: "",
        nbc_focus_apprv_3_c: null,
        nbc_focus_apprv_4_b: "",
        nbc_focus_apprv_4_c: null,
        nbc_focus_apprv_5_b: "",
        nbc_focus_apprv_5_c: null,
      },
    ],
    kpi: [
      {
        kpi_factors: "",
        kpi_yes_no: 0,
        kpi_concern: "",
        kpi_expected: null,
        kpi_resp_party: "",
        kpi_status: "Pending",
      },
    ],
    // Performance Linked Indicators Columns
    plis: [
      {
        plis_particulars: "",
        plis_concern: "",
        plis_weighting: 10,
        plis_expected:"2022-06-14",
        plis_status: "Active",
      },
    ],

    // Parties Columns
    parties: [
      {
        parties_role: "",
        parties_party: "",
        parties_appointed: 0,
        parties_status: "Pending",
      },
    ],
    ocps: [
      {
        ocps_factors: "",
        ocps_yes_no: 1,
        ocps_concern: "",
        ocps_expected: null,
        ocps_resp_party: "",
        ocps_status: "Active",
      },
    ],
  };

  // ******************************************  use state hook to store state ****************************************

  const [activeTab, setActiveTab] = useState("first");
  const [deal, setDeal] = useState(initialDealState);
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState(false);
  const [noteList, setNoteList] = useState([{ note: "" }]);
  const [ocps, setOcps] = useState([
    {
      ocps_factors: "",
      ocps_yes_no: 1,
      ocps_concern: "",
      ocps_expected: null,
      ocps_resp_party: "",
      ocps_status: "Active",
    },
  ]);
  const [nbcFocus, setNbcFocus] = useState([
    {
      nbc_focus_original: "",
      nbc_focus_original_yes_no: 0,
      nbc_focus_original_date: null,
      nbc_focus_original_methodology: "",
      nbc_focus_apprv_1_b: "",
      nbc_focus_apprv_1_c: null,
      nbc_focus_apprv_2_b: "",
      nbc_focus_apprv_2_c: null,
      nbc_focus_apprv_3_b: "",
      nbc_focus_apprv_3_c: null,
      nbc_focus_apprv_4_b: "",
      nbc_focus_apprv_4_c: null,
      nbc_focus_apprv_5_b: "",
      nbc_focus_apprv_5_c: null,
    }
  ]);

  const [plis, setPlis] = useState([
      {
        plis_particulars: "",
        plis_concern: "",
        plis_weighting: 10,
        plis_expected: null,
        plis_status: "",
      }
  ]);

  const [parties, setParties] = useState([
    {
      parties_role: "",
      parties_party: "",
      parties_appointed: 0,
      parties_status: "Pending",
    },
  ]);
  const [keyPerformanceI, setKeyPerformanceI] = useState([
    {
      factors: "",
      option: "",
      expected: "",
      concern: "",
      date: "",
      party: "",
      status: "",
    },
  ]);

  const [kpi, setKpi] = useState([
    {
      kpi_factors: "",
      kpi_yes_no: 0,
      kpi_concern: "",
      kpi_expected: null,
      kpi_resp_party: "",
      kpi_status: "Pending",
    },
  ]);

  const [dealTracking, setDealTracking] = useState({});
  const [industry, setIndustry] = useState([]);
  const [product, setProduct] = useState([]);
  const [region, setRegion] = useState([]);
  const [frequency, setFrequency] = useState([]);
  const [style, setStyle] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const form = useRef();

  // ************************************ use Effect : ComponentDidMount - ComponentWillReceive **************

  useEffect(() => {
    retrieveIndustry();

    retrieveProduct();

    retrieveRegion();

    retrieveRepaymentFreq();

    retrieveAmortizationStyle();

    retrieveStaffList();
  }, []);

  // ******************************************  Axios :  get industry ****************************************

  const retrieveIndustry = () => {
    Services.getIndustry()
      .then((response) => {
        setIndustry(response.data.industry);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // ******************************************  Axios :  get product ****************************************

  const retrieveProduct = () => {
    Services.getProduct()
      .then((response) => {
        setProduct(response.data.product);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // ******************************************  Axios :  get Region ****************************************

  const retrieveRegion = () => {
    Services.getRegion()
      .then((response) => {
        setRegion(response.data.region);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // ******************************************  Axios :  get repayment Frequency ************************

  const retrieveRepaymentFreq = () => {
    Services.getRepaymentFreq()
      .then((response) => {
        setFrequency(response.data.frequency);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // ******************************************  Axios :  get Amortization ****************************************

  const retrieveAmortizationStyle = () => {
    Services.getAmortizationSty()
      .then((response) => {
        setStyle(response.data.amortization);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // ******************************************  Axios :  get all staff  ****************************************

  const retrieveStaffList = () => {
    Services.getStaffList()
      .then((response) => {
        setStaffList(response.data.staffList);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // ******************************************  Next and Previous function  ****************************************

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
    if (activeTab === "sixth") {
      setActiveTab("seventh");
    }
    if (activeTab === "seventh") {
      setActiveTab("eigth");
    }
    if (activeTab === "eigth") {
      setActiveTab("ninth");
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
    if (activeTab === "sixth") {
      setActiveTab("fourth");
    }
    if (activeTab === "seventh") {
      setActiveTab("sixth");
    }
    if (activeTab === "eigth") {
      setActiveTab("seventh");
    }
    if (activeTab === "ninth") {
      setActiveTab("eigth");
    }
  }

  // ******************************************  req body event ****************************************

  const handleInputChange = (event) => {
    // function to save user data to deal state
    const { name, value } = event.target;
    setDeal({ ...deal, [name]: value });

  };

  const handleInputChanges = (event) => {
    // function to save user data to deal state
    const { name, value } = event.target;
    setDeal({ ...deal, [name]: value });
  };

  // *********************************************** Daniel's features ***********************************/
  const handleNbcChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...nbcFocus];
    list[index][name] = value;
    setNbcFocus(list);
  };

  const handleNbcAdd = () => {
    setNbcFocus([
      ...nbcFocus,
      {nbc_focus_original: "",
    nbc_focus_original_yes_no: 0,
    nbc_focus_original_date: null,
    nbc_focus_original_methodology: "",
    nbc_focus_apprv_1_b: "",
    nbc_focus_apprv_1_c: null,
    nbc_focus_apprv_2_b: "",
    nbc_focus_apprv_2_c: null,
    nbc_focus_apprv_3_b: "",
    nbc_focus_apprv_3_c: null,
    nbc_focus_apprv_4_b: "",
    nbc_focus_apprv_4_c: null,
    nbc_focus_apprv_5_b: "",
    nbc_focus_apprv_5_c: null

     }
    ]);
  };

  const handleNbcRemove = (index) => {
    const list = [...nbcFocus];
    list.splice(index, 1);
    setNbcFocus(list);
  };

  // **************************************************** Key Performance Indicators ************************
  const handleKpiChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...kpi];
    list[index][name] = value;
    setKpi(list);
  };

  const handleKpiAdd = () => {
    setKpi([
      ...kpi,
      {
        kpi_factors: "",
        kpi_yes_no: 0,
        kpi_concern: "",
        kpi_expected: null,
        kpi_resp_party: "",
        kpi_status: "",
      }
    ]);
  };

  const handleKpiRemove = (index) => {
    const list = [...kpi];
    list.splice(index, 1);
    setKpi(list);
  };


  // ***************************************  PLIS *********************************************************
  const handlePlisChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...plis];
    list[index][name] = value;
    setPlis(list);
  };

  const handlePlisAdd = () => {
    setPlis([
      ...plis,
      {
        plis_particulars: "",
        plis_concern: "",
        plis_weighting: 10,
        plis_expected:null,
        plis_status: "",
      }
    ]);
  };

  const handlePlisRemove = (index) => {
    const list = [...plis];
    list.splice(index, 1);
    setPlis(list);
  };

  //***********************************      Other Conditions precedents    ***************** */
  const handleOcpsChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...ocps];
    list[index][name] = value;
    setOcps(list);
  };

  const handleOcpsAdd = () => {
    setOcps([
      ...ocps,
      {
        ocps_factors: "",
        ocps_yes_no: 1,
        ocps_concern: "",
        ocps_expected: null,
        ocps_resp_party: "",
        ocps_status: "Active",
      }
    ]);
  };

  const handleOcpsRemove = (index) => {
    const list = [...ocps];
    list.splice(index, 1);
    setOcps(list);
  };

  //***********************************************PARTIES ********************************************** */
  const handlePartyChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...parties];
    list[index][name] = value;
    setParties(list);
  };

  const handlePartyAdd = () => {
    setParties([
      ...parties,
      {
        parties_role: "",
        parties_party: "",
        parties_appointed: 0,
        parties_status: "Pending",
      }
    ]);
  };

  const handlePartyRemove = (index) => {
    const list = [...parties];
    list.splice(index, 1);
    setParties(list);
  };
  // ******************************** note feature ******************************************************/
  const handleNoteChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...noteList];
    list[index][name] = value;
    setNoteList(list);
  };

  const handleNoteAdd = () => {
    setNoteList([...noteList, { note: "" }]);
  };

  const handleNoteRemove = (index) => {
    const list = [...noteList];
    list.splice(index, 1);
    setNoteList(list);
  };

  // ******************************************* Save Deal and Send to the Backend ***********************************
  const saveDeal = (e) => {
    // function to save users data and post to db
    e.preventDefault();
    form.current.validateAll();

    let allNotes = noteList.map(({ note }) => note);
    let note = allNotes.join("|");

    // ******************************************  End Function  ****************************************

    // ************************************* Request body Payload to be sent to the DB ******************

    let data = {
      // store user's inpt in a variable called data
      clientName: deal.clientName,
      originator: deal.originator,
      transactor: deal.transactor,
      transactionLegalLead: deal.transactionLegalLead,
      industry: deal.industry,
      product: deal.product,
      region: deal.region,
      dealSize: +deal.dealSize,
      coupon: +deal.coupon,
      tenor: +deal.tenor,
      moratorium: +deal.moratorium,
      repaymentFrequency: deal.repaymentFrequency,
      amortizationStyle: deal.amortizationStyle,
      mandateLetter: `${deal.mandateLetter ? deal.mandateLetter : 20221203}`,
      creditApproval: `${deal.creditApproval ? deal.creditApproval : 20221203}`,
      feeLetter: `${deal.feeLetter ? deal.feeLetter : 20221203}`,
      expectedClose: `${deal.expectedClose ? deal.expectedClose : 20221203}`,
      actualClose: `${deal.actualClose ? deal.actualClose : 20221203}`,
      NBC_approval_date: `${
        deal.nbc_approval_date ? deal.nbc_approval_date : 20221203
      }`,
      NBC_submitted_date: `${
        deal.nbc_submitted_date ? deal.nbc_submitted_date : 20221203
      }`,
      greenA: JSON.parse(deal.greenA),
      greenB: JSON.parse(deal.greenB),
      greenC: JSON.parse(deal.greenC),
      greenD: JSON.parse(deal.greenD),
      greenE: JSON.parse(deal.greenE),
      greenF: JSON.parse(deal.greenF),
      amberA: JSON.parse(deal.amberA),
      amberB: JSON.parse(deal.amberB),
      amberC: JSON.parse(deal.amberC),
      amberD: JSON.parse(deal.amberD),
      amberE: JSON.parse(deal.amberE),
      redA: JSON.parse(deal.redA),
      redB: JSON.parse(deal.redB),
      redC: JSON.parse(deal.redC),
      structuringFeeAmount: +deal.structuringFeeAmount,
      structuringFeeAdvance: +deal.structuringFeeAdvance,
      guaranteeFee: +deal.guaranteeFee,
      monitoringFee: +deal.monitoringFee,
      reimbursible: +deal.reimbursible,
      notes: note,
      closed: false,
      nbcFocus: nbcFocus,
      parties: parties,
      plis:plis,
      ocps: ocps,

      kpi: kpi,
    };

    // ******************************************  Axios : Post Request ****************************************

    Services.createDeal(data)
      .then((res) => {
        setResponse(res.data.message);
        setSubmitted(true);
      })
      .catch((error) => {
        setResponse("Failed to Create Deal. Please Fill all required fields");
        setSubmitted(false);
      });
  };

  const newDeal = () => {
    setDeal(initialDealState);
    setNoteList([{ note: "" }]);
    setNbcFocus([{nbc_focus_original: "",
    nbc_focus_original_yes_no: 0,
    nbc_focus_original_date: null,
    nbc_focus_original_methodology: "",
    nbc_focus_apprv_1_b: "",
    nbc_focus_apprv_1_c: null,
    nbc_focus_apprv_2_b: "",
    nbc_focus_apprv_2_c: null,
    nbc_focus_apprv_3_b: "",
    nbc_focus_apprv_3_c: null,
    nbc_focus_apprv_4_b: "",
    nbc_focus_apprv_4_c: null,
    nbc_focus_apprv_5_b: "",
    nbc_focus_apprv_5_c: null

     }]);
    // setKeyPerformanceI([{ label: "", concern: "", date: "", methodology: "" }]);
    // setDealTracking()
    setSubmitted(false);
    setActiveTab("first");
    setResponse("");
  };

  // ******************************************  End Axios Call  ****************************************

  // console.log(nbcFocus)
  return (
    <React.Fragment>
      {/* ---------------------- New Transaction Forms ----------- */}
      <FormWrapper>
        <Container fluid style={{ marginTop: "0" }}>
          {submitted ? (
            <div>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  color: "steelblue",
                  marginTop: "1rem",
                }}
              >
                {response}
              </p>
              <ButtonWrapper onClick={newDeal}>
                Add New Transaction
              </ButtonWrapper>
            </div>
          ) : (
            <Form ref={form}>
              <PWrapper>
                <h5 className="py-3 text-secondary">New Transaction</h5>
              </PWrapper>
              <br />

              <div>
                <Tabs
                  //activeKey={activeTab}
                  onSelect={(k) => handleTabChange}
                  style={{ fontSize: "12px" }}
                >
                  <Tab eventKey="first" title="CLIENT">
                    <Container1>
                      <br />
                      <Row>
                        <Col sm={6}>
                          <Fm.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Fm.Label>
                              Client Name{" "}
                              <span style={{ color: "red" }}>*</span>
                            </Fm.Label>
                            <Input
                              type="text"
                              value={deal.clientName}
                              onChange={handleInputChange}
                              name="clientName"
                              validations={[required]}
                              style={{
                                width: "100%",
                                padding: "4px 2px",
                                focus: "none",
                              }}
                            />
                          </Fm.Group>
                        </Col>

                        <Col sm={6}>
                          <Fm.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Fm.Label>
                              Originator <span style={{ color: "red" }}>*</span>
                            </Fm.Label>
                            <Select
                              size="sm"
                              type="text"
                              value={deal.originator}
                              onChange={handleInputChange}
                              name="originator"
                              style={{
                                width: "100%",
                                padding: "4px 2px",
                                focus: "none",
                              }}
                              validations={[required]}
                            >
                              <option></option>
                              {staffList.map((opt, i) => (
                                <option
                                  key={staffList[i].email}
                                  value={staffList[i].stafflist}
                                >
                                  {staffList[i].stafflist}
                                </option>
                              ))}
                            </Select>
                          </Fm.Group>
                        </Col>

                        <Col sm={6}>
                          <Fm.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Fm.Label>
                              Transactor <span style={{ color: "red" }}>*</span>
                            </Fm.Label>
                            <Select
                              size="sm"
                              type="text"
                              value={deal.transactor}
                              onChange={handleInputChange}
                              name="transactor"
                              style={{
                                width: "100%",
                                padding: "4px 2px",
                                focus: "none",
                              }}
                              validations={[required]}
                            >
                              <option></option>
                              {staffList.map((opt, i) => (
                                <option
                                  key={staffList[i].email}
                                  value={staffList[i].stafflist}
                                >
                                  {staffList[i].stafflist}
                                </option>
                              ))}
                            </Select>
                          </Fm.Group>
                        </Col>

                        <Col sm={6}>
                          <Fm.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Fm.Label>
                              Transactor Legal Lead{" "}
                              <span style={{ color: "red" }}>*</span>
                            </Fm.Label>
                            <Select
                              size="sm"
                              type="text"
                              value={deal.transactionLegalLead}
                              onChange={handleInputChange}
                              name="transactionLegalLead"
                              style={{
                                width: "100%",
                                padding: "4px 2px",
                                focus: "none",
                              }}
                              validations={[required]}
                            >
                              <option></option>
                              {staffList.map((opt, i) => (
                                <option
                                  key={staffList[i].email}
                                  value={staffList[i].stafflist}
                                >
                                  {staffList[i].stafflist}
                                </option>
                              ))}
                            </Select>
                          </Fm.Group>
                        </Col>

                        <Col sm={12}>
                          <Fm.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Fm.Label>Note</Fm.Label>{" "}
                            <button
                              type="button"
                              onClick={handleNoteAdd}
                              style={{
                                fontSize: "10px",
                                padding: "2px 10px",
                                margin: "8px",
                                background: "steelblue",
                                color: "white",
                                borderRadius: "3px",
                              }}
                            >
                              Add
                            </button>
                            {noteList.map((singleNote, index) => (
                              <div class="input-group">
                                <Fm.Control
                                  as="textarea"
                                  style={{ margin: "0.8em", width: "60%" }}
                                  size="sm"
                                  value={singleNote.note}
                                  name="note"
                                  onChange={(e) => handleNoteChange(e, index)}
                                />
                                <button
                                  type="button"
                                  style={{
                                    fontSize: "10px",
                                    padding: "2px 10px",
                                    margin: "8px",
                                    background: "steelblue",
                                    color: "white",
                                    borderRadius: "3px",
                                  }}
                                  onClick={handleNoteRemove}
                                >
                                  x
                                </button>
                              </div>
                            ))}
                          </Fm.Group>
                        </Col>
                      </Row>
                      <br />
                      <br />

                      {/* <button
                        onClick={(e) => toNextTab(e)}
                        style={{
                          display: "inlineBlock",
                          fontSize: "13px",
                          padding: "2px 20px",
                          margin: "10px",
                          background: "green",
                          color: "white",
                          borderRadius: "3px",
                        }}
                      >
                        Next{" "}
                      </button> */}
                    </Container1>
                  </Tab>

                  <Tab eventKey="second" title="DEAL PROFILE ">
                    <Container1>
                      <div className="mt-2">
                        <Row>
                          <Col sm={6} className="my-0 py-0">
                            <Fm.Group className="">
                              <Fm.Label>
                                Industry <span style={{ color: "red" }}>*</span>
                              </Fm.Label>
                              <Select
                                size="sm"
                                name="industry"
                                value={deal.industry}
                                onChange={handleInputChange}
                                validations={[required]}
                                style={{
                                  width: "100%",
                                  padding: "6px 1px",
                                  focus: "none",
                                }}
                              >
                                <option>Select</option>
                                {industry.map((opt, i) => (
                                  <option
                                    key={industry[i].industryid}
                                    value={industry[i].industry}
                                  >
                                    {industry[i].industry}
                                  </option>
                                ))}
                              </Select>
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="">
                              <Fm.Label>
                                Products <span style={{ color: "red" }}>*</span>
                              </Fm.Label>
                              <Select
                                size="sm"
                                name="product"
                                value={deal.product}
                                onChange={handleInputChange}
                                validations={[required]}
                                style={{
                                  width: "100%",
                                  padding: "6px 1px",
                                  focus: "none",
                                }}
                              >
                                <option>Select</option>
                                {product.map((opt, i) => (
                                  <option
                                    key={product[i].productid}
                                    value={product[i].product}
                                  >
                                    {product[i].product}
                                  </option>
                                ))}
                              </Select>
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="">
                              <Fm.Label>
                                Region <span style={{ color: "red" }}>*</span>
                              </Fm.Label>
                              <Select
                                size="sm"
                                name="region"
                                value={deal.region}
                                onChange={handleInputChange}
                                validations={[required]}
                                style={{
                                  width: "100%",
                                  padding: "6px 1px",
                                  focus: "none",
                                }}
                              >
                                <option>Select</option>
                                {region.map((opt, i) => (
                                  <option
                                    key={region[i].regionid}
                                    value={region[i].region}
                                  >
                                    {region[i].region}
                                  </option>
                                ))}
                              </Select>
                            </Fm.Group>
                          </Col>
                        </Row>

                        <Row className="mt-1">
                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>
                                Deal Size (₦'BN){" "}
                                <span style={{ color: "red" }}>*</span>
                              </Fm.Label>
                              <Input
                                size="sm"
                                type="number"
                                value={deal.dealSize}
                                onChange={handleInputChange}
                                name="dealSize"
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                                validations={[required]}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>Coupon(%)</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="number"
                                value={deal.coupon}
                                onChange={handleInputChange}
                                name="coupon"
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>Tenor(yrs)</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="number"
                                value={deal.tenor}
                                onChange={handleInputChange}
                                name="tenor"
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>Moratorium(yrs)</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="number"
                                value={deal.moratorium}
                                onChange={handleInputChange}
                                name="moratorium"
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>
                        </Row>

                        <Row className="mt-1 pt-3">
                          <Col sm={6}>
                            <Fm.Group className="">
                              <Fm.Label>Repayment Frequency</Fm.Label>
                              <Select
                                size="sm"
                                name="repaymentFrequency"
                                value={deal.repaymentFrequency}
                                onChange={handleInputChange}
                                style={{
                                  width: "100%",
                                  padding: "6px 1px",
                                  focus: "none",
                                }}
                              >
                                <option>Select</option>
                                {frequency.map((opt, i) => (
                                  <option
                                    key={frequency[i].id}
                                    value={frequency[i].frequency}
                                  >
                                    {frequency[i].frequency}
                                  </option>
                                ))}
                              </Select>
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="">
                              <Fm.Label>Amortization Style</Fm.Label>
                              <Select
                                size="sm"
                                name="amortizationStyle"
                                value={deal.amortizationStyle}
                                onChange={handleInputChange}
                                style={{
                                  width: "100%",
                                  padding: "6px 1px",
                                  focus: "none",
                                }}
                              >
                                <option>Select</option>
                                {style.map((opt, i) => (
                                  <option
                                    key={style[i].id}
                                    value={style[i].amortizationstyle}
                                  >
                                    {style[i].amortizationstyle}
                                  </option>
                                ))}
                              </Select>
                            </Fm.Group>
                          </Col>
                        </Row>

                        <Row className="mt-1 pt-3">
                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>
                                Mandate Letter{" "}
                                <span style={{ color: "red" }}>*</span>
                              </Fm.Label>
                              <Input
                                size="sm"
                                type="date"
                                value={deal.mandateLetter}
                                onChange={handleInputChange}
                                name="mandateLetter"
                                style={{
                                  width: "100%",
                                  padding: "6px 1px",
                                  focus: "none",
                                }}
                                validations={[required]}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>
                                Credit Approval{" "}
                                <span style={{ color: "red" }}>*</span>
                              </Fm.Label>
                              <Input
                                size="sm"
                                type="date"
                                value={deal.creditApproval}
                                onChange={handleInputChange}
                                name="creditApproval"
                                style={{
                                  width: "100%",
                                  padding: "6px 1px",
                                  focus: "none",
                                }}
                                validations={[required]}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>Fee Letter</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="date"
                                value={deal.feeLetter}
                                onChange={handleInputChange}
                                name="feeLetter"
                                style={{
                                  width: "100%",
                                  padding: "6px 1px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>Expected Close</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="date"
                                value={deal.expectedClose}
                                onChange={handleInputChange}
                                name="expectedClose"
                                style={{
                                  width: "100%",
                                  padding: "6px 1px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>Actual Close</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="date"
                                value={deal.actualClose}
                                onChange={handleInputChange}
                                name="actualClose"
                                style={{
                                  width: "100%",
                                  padding: "6px 1px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>NBC Approval</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="date"
                                value={deal.nbc_approval_date}
                                onChange={handleInputChange}
                                name="nbc_approval_date"
                                style={{
                                  width: "100%",
                                  padding: "6px 1px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>NBC Submission</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="date"
                                value={deal.nbc_submitted_date}
                                onChange={handleInputChange}
                                name="nbc_submitted_date"
                                style={{
                                  width: "100%",
                                  padding: "6px 1px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>
                        </Row>
                      </div>
                      <br />
                      <br />
                      {/* <button
                        onClick={(e) => toPrevTab(e)}
                        style={{
                          display: "inlineblock",
                          fontSize: "13px",
                          padding: "2px 20px",
                          margin: "10px",
                          background: "green",
                          color: "white",
                          borderRadius: "3px",
                        }}
                      >
                        {" "}
                        Prev
                      </button>
                      <button */}
                      {/* onClick={(e) => toNextTab(e)} */}
                      {/* style={{
                          display: "inlineblock",
                          fontSize: "13px",
                          padding: "2px 20px",
                          margin: "10px",
                          background: "green",
                          color: "white",
                          borderRadius: "3px",
                        }}
                      >
                        Next
                      </button> */}
                    </Container1>
                    <br />
                    <br />
                  </Tab>

                  <Tab eventKey="third" title="FEES">
                    <br />
                    <br />
                    <Container1>
                      <div className="mt-2">
                        <Row>
                          <Col sm={6} className="my-0 py-0">
                            <Fm.Group>
                              <Fm.Label>Amount (₦'MN)</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="number"
                                value={deal.structuringFeeAmount}
                                onChange={handleInputChange}
                                name="structuringFeeAmount"
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6} className="my-0 py-0">
                            <Fm.Group>
                              <Fm.Label>Advance(%)</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="number"
                                value={deal.structuringFeeAdvance}
                                onChange={handleInputChange}
                                name="structuringFeeAdvance"
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6} className="my-0 py-0">
                            <Fm.Group className="pt-1">
                              <Fm.Label>Final(%)</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="number"
                                value={deal.structuringFeeFinal}
                                onChange={handleInputChange}
                                name="structuringFeeFinal"
                                placeholder={
                                  deal.structuringFeeAmount &&
                                  deal.structuringFeeAdvance
                                    ? `${(
                                        (deal.structuringFeeAmount /
                                          deal.structuringFeeAdvance) *
                                        100
                                      ).toFixed(1)}`
                                    : 0
                                }
                                disabled
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6} className="my-0 py-0">
                            <Fm.Group className="pt-1">
                              <Fm.Label>Guarantee (%)</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="number"
                                value={deal.guaranteeFee}
                                onChange={handleInputChange}
                                name="guaranteeFee"
                                style={{
                                  width: "100%",
                                  padding: "4px 2px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6} className="my-0 py-0">
                            <Fm.Group className="pt-1">
                              <Fm.Label>Monitoring(₦'MN)</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="number"
                                value={deal.monitoringFee}
                                onChange={handleInputChange}
                                name="monitoringFee"
                                style={{
                                  width: "100%",
                                  padding: "4px 2px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6} className="my-0 py-0">
                            <Fm.Group className="pt-1">
                              <Fm.Label>Reimbursible(₦'MN)</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="number"
                                value={deal.reimbursible}
                                onChange={handleInputChange}
                                name="reimbursible"
                                style={{
                                  width: "100%",
                                  padding: "4px 2px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>
                        </Row>
                      </div>
                      <br />
                      <br />
                      {/* <button
                        onClick={(e) => toPrevTab(e)}
                        style={{
                          display: "inlineblock",
                          fontSize: "13px",
                          padding: "2px 20px",
                          margin: "10px",
                          background: "green",
                          color: "white",
                          borderRadius: "3px",
                        }}
                      >
                        {" "}
                        Prev
                      </button> */}
                      {/* <button
                        onClick={(e) => toNextTab(e)}
                        style={{
                          display: "inlineblock",
                          fontSize: "13px",
                          padding: "2px 20px",
                          margin: "10px",
                          background: "green",
                          color: "white",
                          borderRadius: "3px",
                        }}
                      >
                        Next
                      </button> */}
                    </Container1>
                  </Tab>

                  <Tab
                    eventKey="fourth"
                    title="DEAL CATEGORY"
                    style={{ fontSize: "12px" }}
                  >
                    <Container1>
                      <div name="redCategory" className="py-3">
                        <PWrapper>
                          <h6
                            className="pt-1"
                            style={{ fontSize: "10px", color: "red" }}
                          >
                            RED CATEGORY
                          </h6>
                        </PWrapper>
                      </div>
                      <div className="pb-2">
                        <Row>
                          <Col sm={12}>
                            <Col className="mb-3">
                              <Fm.Group>
                                <Row>
                                  <Col sm={6}>
                                    <Fm.Label style={{ paddingRight: "1rem" }}>
                                      Mandate Letter signed:
                                    </Fm.Label>
                                  </Col>
                                  <Col sm={6}>
                                    <Fm.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      name="redA"
                                      value={true}
                                      onChange={handleInputChange}
                                    />
                                    <Fm.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      name="redA"
                                      value={false}
                                      onChange={handleInputChange}
                                      defaultChecked
                                    />
                                  </Col>
                                </Row>
                              </Fm.Group>
                            </Col>

                            <Col className="mb-3">
                              <Fm.Group>
                                <Row>
                                  <Col sm={6}>
                                    <Fm.Label style={{ paddingRight: "1rem" }}>
                                      Due dilligence ongoing:
                                    </Fm.Label>
                                  </Col>
                                  <Col sm={6}>
                                    <Fm.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      name="redB"
                                      value={true}
                                      onChange={handleInputChange}
                                    />
                                    <Fm.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      name="redB"
                                      value={false}
                                      onChange={handleInputChange}
                                      defaultChecked
                                    />
                                  </Col>
                                </Row>
                              </Fm.Group>
                            </Col>

                            <Col>
                              <Fm.Group>
                                <Row>
                                  <Col sm={6}>
                                    <Fm.Label style={{ paddingRight: "1rem" }}>
                                      Pending Credit Committee approval:
                                    </Fm.Label>
                                  </Col>

                                  <Col sm={6}>
                                    <Fm.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      name="redC"
                                      value={true}
                                      onChange={handleInputChange}
                                    />
                                    <Fm.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      name="redC"
                                      value={false}
                                      onChange={handleInputChange}
                                      defaultChecked
                                    />
                                  </Col>
                                </Row>
                              </Fm.Group>
                            </Col>
                          </Col>
                        </Row>
                      </div>
                      <br />
                    </Container1>

                    <Container1 className="mt-2 pt-3">
                      <div name="amberCategory">
                        <PWrapper>
                          <h6
                            className="pt-1"
                            style={{ fontSize: "10px", color: "#FFC200" }}
                          >
                            AMBER CATEGORY
                          </h6>
                        </PWrapper>
                        <div>
                          <Row>
                            <Col sm={12}>
                              <Col className="pb-3">
                                <Fm.Group>
                                  <Row>
                                    <Col sm={6}>
                                      <Fm.Label
                                        style={{ paddingRight: "1rem" }}
                                      >
                                        Mandate Letter signed:
                                      </Fm.Label>
                                    </Col>
                                    <Col sm={6}>
                                      <Fm.Check
                                        inline
                                        label="Yes"
                                        type="radio"
                                        name="amberA"
                                        value={true}
                                        onChange={handleInputChange}
                                      />
                                      <Fm.Check
                                        inline
                                        label="No"
                                        type="radio"
                                        name="amberA"
                                        value={false}
                                        onChange={handleInputChange}
                                        defaultChecked
                                      />
                                    </Col>
                                  </Row>
                                </Fm.Group>
                              </Col>

                              <Col className="pb-3">
                                <Fm.Group>
                                  <Row>
                                    <Col sm={6}>
                                      <Fm.Label
                                        style={{ paddingRight: "1rem" }}
                                      >
                                        Transaction has obtained Credit Committe
                                        approval:
                                      </Fm.Label>
                                    </Col>
                                    <Col sm={6}>
                                      <Fm.Check
                                        inline
                                        label="Yes"
                                        type="radio"
                                        name="amberB"
                                        value={true}
                                        onChange={handleInputChange}
                                      />
                                      <Fm.Check
                                        inline
                                        label="No"
                                        type="radio"
                                        name="amberB"
                                        value={false}
                                        onChange={handleInputChange}
                                        defaultChecked
                                      />
                                    </Col>
                                  </Row>
                                </Fm.Group>
                              </Col>

                              <Col className="pb-3">
                                <Fm.Group>
                                  <Row>
                                    <Col sm={6}>
                                      <Fm.Label
                                        style={{ paddingRight: "1rem" }}
                                      >
                                        Professional Parties to the Bond issue
                                        appointed or selected:
                                      </Fm.Label>
                                    </Col>
                                    <Col sm={6}>
                                      <Fm.Check
                                        inline
                                        label="Yes"
                                        type="radio"
                                        name="amberC"
                                        value={true}
                                        onChange={handleInputChange}
                                      />
                                      <Fm.Check
                                        inline
                                        label="No"
                                        type="radio"
                                        name="amberC"
                                        value={false}
                                        onChange={handleInputChange}
                                        defaultChecked
                                      />
                                    </Col>
                                  </Row>
                                </Fm.Group>
                              </Col>
                            </Col>
                          </Row>
                        </div>

                        <Col className="pb-3">
                          <Fm.Group>
                            <Row>
                              <Col sm={6}>
                                <Fm.Label style={{ paddingRight: "1rem" }}>
                                  Fee Letter and/or Guarantee Documentation
                                  expected to be negotiated and/or signed within
                                  8 weeks:
                                </Fm.Label>
                              </Col>

                              <Col sm={6}>
                                <Fm.Check
                                  inline
                                  label="Yes"
                                  type="radio"
                                  name="amberD"
                                  value={true}
                                  onChange={handleInputChange}
                                />
                                <Fm.Check
                                  inline
                                  label="No"
                                  type="radio"
                                  name="amberD"
                                  value={false}
                                  onChange={handleInputChange}
                                  defaultChecked
                                />
                              </Col>
                            </Row>
                          </Fm.Group>
                        </Col>

                        <Col className="pb-2">
                          <Fm.Group>
                            <Row>
                              <Col sm={6}>
                                <Fm.Label style={{ paddingRight: "1rem" }}>
                                  All Materials CPs with timelines for
                                  completion agreed with the client:
                                </Fm.Label>
                              </Col>
                              <Col sm={6}>
                                <Fm.Check
                                  inline
                                  label="Yes"
                                  type="radio"
                                  name="amberE"
                                  value={true}
                                  onChange={handleInputChange}
                                />
                                <Fm.Check
                                  inline
                                  label="No"
                                  type="radio"
                                  name="amberE"
                                  value={false}
                                  onChange={handleInputChange}
                                  defaultChecked
                                />
                              </Col>
                            </Row>
                          </Fm.Group>
                        </Col>
                      </div>
                    </Container1>

                    <Container1 className="mt-2 pt-3">
                      <div name="greenCategory">
                        <PWrapper>
                          <br />
                          <h6
                            className="pt-1"
                            style={{ fontSize: "10px", color: "green" }}
                          >
                            GREEN CATEGORY
                          </h6>
                        </PWrapper>
                        <div>
                          <Row>
                            <Col sm={12}>
                              <Col className="pb-2">
                                <Fm.Group>
                                  <Row>
                                    <Col sm={6}>
                                      <Fm.Label
                                        style={{ paddingRight: "1rem" }}
                                      >
                                        Transaction has obtained Credit
                                        Committee approval:
                                      </Fm.Label>
                                    </Col>
                                    <Col sm={6}>
                                      <Fm.Check
                                        inline
                                        label="Yes"
                                        type="radio"
                                        name="greenA"
                                        value={true}
                                        onChange={handleInputChange}
                                      />
                                      <Fm.Check
                                        inline
                                        label="No"
                                        type="radio"
                                        name="greenA"
                                        value={false}
                                        onChange={handleInputChange}
                                        defaultChecked
                                      />
                                    </Col>
                                  </Row>
                                </Fm.Group>
                              </Col>

                              <Col className="pb-2">
                                <Fm.Group>
                                  <Row>
                                    <Col sm={6}>
                                      <Fm.Label
                                        style={{ paddingRight: "1rem" }}
                                      >
                                        Guarantee Document in agreed form:
                                      </Fm.Label>
                                    </Col>
                                    <Col sm={6}>
                                      <Fm.Check
                                        inline
                                        label="Yes"
                                        type="radio"
                                        name="greenB"
                                        value={true}
                                        onChange={handleInputChange}
                                      />
                                      <Fm.Check
                                        inline
                                        label="No"
                                        type="radio"
                                        name="greenB"
                                        value={false}
                                        onChange={handleInputChange}
                                        defaultChecked
                                      />
                                    </Col>
                                  </Row>
                                </Fm.Group>
                              </Col>

                              <Col className="pb-2">
                                <Fm.Group>
                                  <Row>
                                    <Col sm={6}>
                                      <Fm.Label
                                        style={{ paddingRight: "1rem" }}
                                      >
                                        Professional Parties to the Bond Issue
                                        appointed or selected:
                                      </Fm.Label>
                                    </Col>
                                    <Col sm={6}>
                                      <Fm.Check
                                        inline
                                        label="Yes"
                                        type="radio"
                                        name="greenC"
                                        value={true}
                                        onChange={handleInputChange}
                                      />
                                      <Fm.Check
                                        inline
                                        label="No"
                                        type="radio"
                                        name="greenC"
                                        value={false}
                                        onChange={handleInputChange}
                                        defaultChecked
                                      />
                                    </Col>
                                  </Row>
                                </Fm.Group>
                              </Col>

                              <Col className="pb-2">
                                <Fm.Group>
                                  <Row>
                                    <Col sm={6}>
                                      <Fm.Label
                                        style={{ paddingRight: "1rem" }}
                                      >
                                        Already filed or expected filing with
                                        SEC (or equivalent Exchange) within 6
                                        weeks:
                                      </Fm.Label>
                                    </Col>

                                    <Col sm={6}>
                                      <Fm.Check
                                        inline
                                        label="Yes"
                                        type="radio"
                                        name="greenD"
                                        value={true}
                                        onChange={handleInputChange}
                                      />
                                      <Fm.Check
                                        inline
                                        label="No"
                                        type="radio"
                                        name="greenD"
                                        value={false}
                                        onChange={handleInputChange}
                                        defaultChecked
                                      />
                                    </Col>
                                  </Row>
                                </Fm.Group>
                              </Col>

                              <Col className="pb-2">
                                <Fm.Group>
                                  <Row>
                                    <Col sm={6}>
                                      <Fm.Label
                                        style={{ paddingRight: "1rem" }}
                                      >
                                        All Materials CPs to Financial Close
                                        have been satisfactorily met or
                                        committed by the Client for completion
                                        on or before Financial Close:
                                      </Fm.Label>
                                    </Col>

                                    <Col sm={6}>
                                      <Fm.Check
                                        inline
                                        label="Yes"
                                        type="radio"
                                        name="greenE"
                                        value={true}
                                        onChange={handleInputChange}
                                      />
                                      <Fm.Check
                                        inline
                                        label="No"
                                        type="radio"
                                        name="greenE"
                                        value={false}
                                        onChange={handleInputChange}
                                        defaultChecked
                                      />
                                    </Col>
                                  </Row>
                                </Fm.Group>
                              </Col>

                              <Col className="pb-2">
                                <Fm.Group>
                                  <Row>
                                    <Col sm={6}>
                                      <Fm.Label
                                        style={{ paddingRight: "1rem" }}
                                      >
                                        Financial Close expected within 3-6
                                        months:
                                      </Fm.Label>
                                    </Col>
                                    <Col sm={6}>
                                      <Fm.Check
                                        inline
                                        label="Yes"
                                        type="radio"
                                        name="greenF"
                                        value={true}
                                        onChange={handleInputChange}
                                      />
                                      <Fm.Check
                                        inline
                                        label="No"
                                        type="radio"
                                        name="greenF"
                                        value={false}
                                        onChange={handleInputChange}
                                        defaultChecked
                                      />
                                    </Col>
                                  </Row>
                                </Fm.Group>
                              </Col>
                            </Col>
                          </Row>
                        </div>
                      </div>
                      <br />
                      <br />
                    </Container1>
                    {/* <button
                      onClick={(e) => toPrevTab(e)}
                      style={{
                        display: "inlineblock",
                        fontSize: "13px",
                        padding: "2px 20px",
                        margin: "10px",
                        background: "green",
                        color: "white",
                        borderRadius: "3px",
                      }}
                    >
                      {" "}
                      Prev */}
                    {/* </button>
                    <button
                      onClick={(e) => toNextTab(e)}
                      style={{
                        display: "inlineblock",
                        fontSize: "13px",
                        padding: "2px 20px",
                        margin: "10px",
                        background: "green",
                        color: "white",
                        borderRadius: "3px",
                      }}
                    >
                      Next
                    </button> */}
                  </Tab>
                  <Tab
                    eventKey="sixth"
                    title="NBC FOCUS AREAS"
                    style={{ fontSize: "12px" }}
                  >
                    <Container1>
                      <br />
                      <Row className="py-1">
                        <Col sm={12}>
                          <Row>
                            {/* NBC DD FOCUS */}

                            <Col sm={3} className="mt-1 mb-1">
                              <p>ORIGINAL</p>
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Fm.Control
                                    type="text"
                                    // style={{ margin: "0.8em", width: "60%" }}
                                    size="sm"
                                    value={singleNote.nbcFocus}
                                    name="nbc_focus_original"
                                    onChange={(e) => handleNbcChange(e, index)}
                                  />
                                  <br />
                                  {/* <button
                                  type="button"
                                  onClick={handleNoteRemove}
                                >
                                  x
                                </button> */}
                                </div>
                              ))}
                              
                            </Col>
                            <Col sm={2} className="mt-1 mb-1">
                              <p>CONCERNS</p>
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group mt-2 ">
                                 

                                  <Select
                                    className="py-1 mt-1 "
                                    type="text"
                                    size="md"
                                    value={singleNote.nbcFocus}
                                    // onChange={handleInputChange}
                                    onChange={(e) => handleNbcChange(e, index)}
                                    name="nbc_focus_original_yes_no"
                                  >
                                    <option>Yes/No</option>
                                    <option value={1} name="nbc_focus_original_yes_no">Yes</option>
                                    <option value={0} name="nbc_focus_original_yes_no">No</option>
                                  </Select>

                                </div>
                              ))}
                            </Col>
                            <Col sm={3} className=" mb-1">
                              <p>DATE</p>
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Fm.Control
                                    type="date"
                                    size="sm"
                                    value={singleNote.nbcFocus}
                                    name="nbc_focus_original_date"
                                    onChange={(e) => handleNbcChange(e, index)}
                                  />
                                </div>
                              ))}
                             
                            </Col>
                            <Col sm={3} className="">
                              <p>METHODOLOGY</p>
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group  mt-2">
                                  <Fm.Control
                                    type="text"
                                    style={{ width: "30%", height: "10px" }}
                                    size="sm"
                                    value={singleNote.nbcFocus}
                                    name="nbc_focus_original_methodology"
                                    onChange={(e) => handleNbcChange(e, index)}
                                  />

                                  <button
                                    onClick={handleNbcRemove}
                                    className="mt-1"
                                    style={{ height: "25px", border: "none" }}
                                  >
                                    <i className="">
                                      <FiDelete />
                                    </i>
                                  </button>
                                </div>
                              ))}
                            </Col>
                          </Row>
                        </Col>
                        <div className="d-flex justify-content-end ml-2">
                          <p className="">
                            <GrAdd onClick={handleNbcAdd} />
                          </p>
                        </div>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={3}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    {/* Strength of Contracts: */}
                                  </Fm.Label>
                                </Col>
                                <Col sm={3}>
                                 
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>

                        
                        <Col sm={12}>
                          <p style={{ fontWeight: "bold" }}>
                            NBC Paper (Link to Doc)
                          </p>
                        </Col>
                        <Col sm={12}>
                          <p style={{ fontWeight: "bold" }}>
                            NBC Approvals and Minutes
                          </p>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={5}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    MROC Pre_NBC Approval ( Link to Doc)
                                  </Fm.Label>
                                </Col>
                                <Col sm={3}>
                                  <Fm.Check
                                    inline
                                    label="Yes"
                                    type="radio"
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_1_b"
                                    value={"Yes"}
                                  />
                                  <Fm.Check
                                    inline
                                    label="No"
                                    type="radio"
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_1_b"
                                    value={"No"}
                                    defaultChecked
                                  />
                                </Col>
                                <Col sm={3}>
                                  <Input
                                    size="sm"
                                    type="date"
                                    value={deal.nbc_focus_apprv_1_c}
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_1_c"
                                    style={{
                                      width: "80%",
                                      padding: "2px 1px",
                                      focus: "none",
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={5}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    MROC Pre_NBC Minutes. ( Link to Doc)
                                  </Fm.Label>
                                </Col>
                                <Col sm={3}>
                                  <Fm.Check
                                    inline
                                    label="Yes"
                                    type="radio"
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_2_b"
                                    value={true}
                                  />
                                  <Fm.Check
                                    inline
                                    label="No"
                                    type="radio"
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_2_b"
                                    value={false}
                                    defaultChecked
                                  />
                                </Col>
                                <Col sm={3}>
                                  <Input
                                    size="sm"
                                    type="date"
                                    value={deal.nbc_focus_apprv_2_c}
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_2_c"
                                    style={{
                                      width: "80%",
                                      padding: "2px 1px",
                                      focus: "none",
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={5}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    NBC Approval ( Link to Doc)
                                  </Fm.Label>
                                </Col>
                                <Col sm={3}>
                                  <Fm.Check
                                    inline
                                    label="Yes"
                                    type="radio"
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_3_b"
                                    value={true}
                                  />
                                  <Fm.Check
                                    inline
                                    label="No"
                                    type="radio"
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_3_b"
                                    value={false}
                                    defaultChecked
                                  />
                                </Col>
                                <Col sm={3}>
                                  <Input
                                    size="sm"
                                    type="date"
                                    value={deal.nbc_focus_apprv_3_c}
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_3_c"
                                    style={{
                                      width: "80%",
                                      padding: "2px 1px",
                                      focus: "none",
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={5}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    NBC Minutes ( Link to Doc)
                                  </Fm.Label>
                                </Col>
                                <Col sm={3}>
                                  <Fm.Check
                                    inline
                                    label="Yes"
                                    type="radio"
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_4_b"
                                    value={true}
                                  />
                                  <Fm.Check
                                    inline
                                    label="No"
                                    type="radio"
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_4_b"
                                    value={false}
                                    defaultChecked
                                  />
                                </Col>
                                <Col sm={3}>
                                  <Input
                                    size="sm"
                                    type="date"
                                    value={deal.nbc_focus_apprv_4_c}
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_4_c"
                                    style={{
                                      width: "80%",
                                      padding: "2px 1px",
                                      focus: "none",
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                          <Col sm={12}>
                            <Col className="pb-2">
                              <Fm.Group>
                                <Row>
                                  <Col sm={5}>
                                    <Fm.Label style={{ paddingRight: "1rem" }}>
                                      Mandate Letter with Indicative Term Sheet
                                      On-Boarding Documents ( Link to Doc)
                                    </Fm.Label>
                                  </Col>
                                  <Col sm={3}>
                                    <Fm.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      onChange={handleInputChange}
                                      name="nbc_focus_apprv_5_b"
                                      value={true}
                                    />
                                    <Fm.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      onChange={handleInputChange}
                                      name="nbc_focus_apprv_5_b"
                                      value={false}
                                      defaultChecked
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Input
                                      size="sm"
                                      type="date"
                                      value={deal.nbc_focus_apprv_5_c}
                                      onChange={handleInputChange}
                                      name="nbc_focus_apprv_5_c"
                                      style={{
                                        width: "80%",
                                        padding: "2px 1px",
                                        focus: "none",
                                      }}
                                    />
                                  </Col>
                                </Row>
                              </Fm.Group>
                            </Col>
                            {/* </Col> */}
                          </Col>
                        </Col>
                      </Row>
                      {/* <button
                        onClick={(e) => toPrevTab(e)}
                        style={{
                          display: "inlineblock",
                          fontSize: "13px",
                          padding: "2px 20px",
                          margin: "10px",
                          background: "green",
                          color: "white",
                          borderRadius: "3px",
                        }}
                      >
                        {" "}
                        Prev
                      </button> */}
                      {/* <button
                        onClick={(e) => toNextTab(e)}
                        style={{
                          display: "inlineblock",
                          fontSize: "13px",
                          padding: "2px 20px",
                          margin: "10px",
                          background: "green",
                          color: "white",
                          borderRadius: "3px",
                        }}
                      >
                        Next
                      </button> */}
                    </Container1>
                  </Tab>

                  {/* ...................................... Parties .............................................. */}
                  <Tab
                    eventKey="seventh"
                    title="TRANSACTION PARTIES"
                    style={{ fontSize: "12px" }}
                  >
                    <Container1>
                      <br />
                      <Row className="py-1">
                        <Col sm={12}>
                          <Row>
                            <Col sm={3} className="mt-1 mb-1">
                              <p>Role</p>
                              {parties.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Fm.Control
                                    type="text"
                                    size="sm"
                                    value={singleNote.parties}
                                    name="parties_role"
                                    onChange={(e) => handlePartyChange(e, index)}
                                  />
                                  <br />
                                </div>
                              ))}
                            </Col>
                            <Col sm={2} className="mt-1 mb-1">
                              <p>Appointed</p>
                              {parties.map((singleNote, index) => (
                                <div class="input-group mt-2 ">
                                  <Select
                                    className="py-1 mt-1 "
                                    type="text"
                                    size="md"
                                    value={singleNote.parties}
                                    onChange={(e) => handlePartyChange(e, index)}
                                    name="parties_appointed"
                                  >
                                    <option>Yes/No</option>
                                    <option value={1} name="parties_appointed">Yes</option>
                                    <option value={2} name="parties_appointed">No</option>
                                  </Select>
                                </div>
                              ))}
                            </Col>
                            <Col sm={3} className=" mb-1">
                              <p>Party</p>
                              {parties.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Fm.Control
                                    type="text"
                                    size="sm"
                                    value={singleNote.parties}
                                    name="parties_party"
                                    onChange={(e) => handlePartyChange(e, index)}
                                  />
                                </div>
                              ))}
                            </Col>
                            <Col sm={3} className="">
                              <p>Status</p>
                              {parties.map((singleNote, index) => (
                                <div class="input-group  mt-2">
                                  <Fm.Control
                                    type="text"
                                    style={{ width: "30%", height: "10px" }}
                                    size="sm"
                                    value={singleNote.parties}
                                    name="parties_status"
                                    onChange={(e) => handlePartyChange(e, index)}
                                  />
                                  <button
                                    onClick={handlePartyRemove}
                                    className="mt-1"
                                    style={{ height: "25px", border: "none" }}
                                  >
                                    <i className="">
                                      <FiDelete />
                                    </i>
                                  </button>
                                </div>
                              ))}
                            </Col>
                          </Row>
                        </Col>
                        <div className="d-flex justify-content-end ml-2">
                          <p className="">
                            <GrAdd onClick={handlePartyAdd} />
                          </p>
                        </div>
                      </Row>
                    </Container1>
                  </Tab>

                  {/* ...........................eight tab */}
                  <Tab
                    eventKey="eigth"
                    title="PERFORMANCE-LINKED INDICATORS"
                    style={{ fontSize: "12px" }}
                  >
                    <Container1>
                      <br />
                      <Row className="py-1">
                      <Col sm={12}>
                          <Row>
                            <Col sm={2} className="mt-1 mb-1">
                              <p>Particulars</p>
                              {plis.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Fm.Control
                                    type="text"
                                    size="sm"
                                    value={singleNote.plis}
                                    name="plis_particulars"
                                    onChange={(e) => handlePlisChange(e, index)}
                                  />
                                  <br />
                                </div>
                              ))}
                            </Col>
                            <Col sm={2} className="mb-1">
                              <p>Concern</p>
                              {plis.map((singleNote, index) => (
                                <div class="input-group mt-1 mb-1 ">
                                  <Select
                                    className="py-1 mt-1 "
                                    type="text"
                                    size="md"
                                    value={singleNote.plis}
                                    onChange={(e) => handlePlisChange(e, index)}
                                    name="plis_concern"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}  name="plis_concern">High</option>
                                    <option value={"medium"}  name="plis_concern">Medium</option>
                                    <option value={"Low"}  name="plis_concern">Low</option>
                                  </Select>
                                </div>
                              ))}
                            </Col>
                            <Col sm={2} className=" mb-1">
                              <p>Weight (%)</p>
                              {plis.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Fm.Control
                                    type="number"
                                    size="sm"
                                    value={singleNote.plis}
                                    name="plis_weighting"
                                    onChange={(e) => handlePlisChange(e, index)}
                                  />
                                </div>
                              ))}
                            </Col>
                            <Col sm={2} className=" mb-1">
                              <p>Expected</p>
                              {plis.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Fm.Control
                                    type="date"
                                    size="sm"
                                    value={singleNote.plis}
                                    name="plis_expected"
                                    onChange={(e) => handlePlisChange(e, index)}
                                  />
                                </div>
                              ))}
                            </Col>
                            <Col sm={3} className="">
                              <p>Status</p>
                              {plis.map((singleNote, index) => (
                                <div class="input-group  mt-2">
                                  <Fm.Control
                                    type="text"
                                    style={{ width: "30%", height: "10px" }}
                                    size="sm"
                                    value={singleNote.plis}
                                    name="plis_status"
                                    onChange={(e) => handlePlisChange(e, index)}
                                  />
                                  <button
                                    onClick={handlePlisRemove}
                                    className="mt-1"
                                    style={{ height: "25px", border: "none" }}
                                  >
                                    <i className="">
                                      <FiDelete />
                                    </i>
                                  </button>
                                </div>
                              ))}
                            </Col>
                          </Row>
                        </Col>
                        <div className="d-flex justify-content-end ml-2">
                          <p className="">
                            <GrAdd onClick={handlePlisAdd} />
                          </p>
                        </div>
                      </Row>
                    </Container1>
                  </Tab>
                  {/* ninth tab  other cpis */}
                  <Tab
                    eventKey="ninth"
                    title="OTHER CONDITIONS PRECEDENT"
                    style={{ fontSize: "12px" }}
                  >
                    <Row className="py-1">
                      <Col sm={12}>
                        <Row>
                          <Col sm={2} className="mt-1 mb-1">
                            <p>Factors</p>
                            {ocps.map((singleNote, index) => (
                              <div class="input-group mt-2">
                                <Fm.Control
                                  type="text"
                                  size="sm"
                                  value={singleNote.ocps}
                                  name="ocps_factors"
                                  onChange={(e) => handleOcpsChange(e, index)}
                                />
                                <br />
                              </div>
                            ))}
                          </Col>
                          <Col sm={2} className="mb-1">
                            <p>Yes/No</p>
                            {ocps.map((singleNote, index) => (
                              <div class="input-group mt-1 mb-1 ">
                                <Select
                                  className="py-1 mt-1 "
                                  type="text"
                                  size="md"
                                  value={singleNote.ocps}
                                  onChange={(e) => handleOcpsChange(e, index)}
                                  name="ocps_yes_no"
                                >
                                  <option>Select</option>
                                  <option value={1} name="ocps_yes_no">Yes</option>
                                  <option value={0} name="ocps_yes_no">No</option>
                                </Select>
                              </div>
                            ))}
                          </Col>
                          <Col sm={2} className="mb-1">
                            <p>Concern</p>
                            {ocps.map((singleNote, index) => (
                              <div class="input-group mt-1 mb-1 ">
                                <Select
                                  className="py-1 mt-1 "
                                  type="text"
                                  size="md"
                                  value={singleNote.ocps}
                                  onChange={(e) => handleOcpsChange(e, index)}
                                  name="ocps_concern"
                                >
                                  <option>Concern</option>
                                  <option value={"High"}  name="ocps_concern">High</option>
                                  <option value={"Medium"}  name="ocps_concern">Medium</option>
                                  <option value={"Low"}  name="ocps_concern">Low</option>
                                </Select>
                              </div>
                            ))}
                          </Col>
                          <Col sm={2} className=" mb-1">
                            <p>Expected Date</p>
                            {ocps.map((singleNote, index) => (
                              <div class="input-group mt-2">
                                <Fm.Control
                                  type="date"
                                  size="sm"
                                  value={singleNote.ocps}
                                  name="ocps_expected"
                                  onChange={(e) => handleOcpsChange(e, index)}
                                />
                              </div>
                            ))}
                          </Col>
                          <Col sm={2} className=" mb-1">
                            <p>Resp Party</p>
                            {ocps.map((singleNote, index) => (
                              <div class="input-group mt-2">
                                <Fm.Control
                                  type="text"
                                  size="sm"
                                  value={singleNote.ocps}
                                  name="ocps_resp_party"
                                  onChange={(e) => handleOcpsChange(e, index)}
                                />
                              </div>
                            ))}
                          </Col>
                          <Col sm={2} className="">
                            <p>Status</p>
                            {ocps.map((singleNote, index) => (
                              <div class="input-group  mt-2">
                                <Fm.Control
                                  type="text"
                                  size="sm"
                                  value={singleNote.ocps}
                                  name="ocps_status"
                                  onChange={(e) => handleOcpsChange(e, index)}
                                />
                                <button
                                  onClick={handleOcpsRemove}
                                  className="mt-1"
                                  style={{ height: "25px", border: "none" }}
                                >
                                  <i className="">
                                    <FiDelete />
                                  </i>
                                </button>
                              </div>
                            ))}
                          </Col>
                        </Row>
                      </Col>
                      <div className="d-flex justify-content-end ml-2">
                        <p className="">
                          <GrAdd onClick={handleOcpsAdd} />
                        </p>
                      </div>
                    </Row>
                  </Tab>

                  {/* 10th //////////////////////////////////// */}

                  <Tab
                    eventKey="tenth"
                    title="KEY PERFORMANCE INDICATOR"
                    style={{ fontSize: "12px" }}
                  >
                    <br />
                    <Row className="py-1">

                    <Col sm={12}>
                          <Row>
                            <Col sm={2} className="mt-1 mb-1">
                              <p>Factors</p>
                              {kpi.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Fm.Control
                                    type="text"
                                    size="sm"
                                    value={singleNote.kpi}
                                    name="kpi_factors"
                                    onChange={(e) => handleKpiChange(e, index)}
                                  />
                                  <br />
                                </div>
                              ))}
                            </Col>
                            <Col sm={2} className="mb-1">
                              <p>Yes/No</p>
                              {kpi.map((singleNote, index) => (
                                <div class="input-group mt-1 mb-1 ">
                                  <Select
                                    className="py-1 mt-1 "
                                    type="text"
                                    size="md"
                                    value={singleNote.kpi}
                                    onChange={(e) => handleKpiChange(e, index)}
                                    name="kpi_yes_no"
                                  >
                                    <option>Yes/No</option>
                                    <option value={1}  name="kpi_yes_no">Yes</option>
                                    <option value={0}  name="kpi_yes_no">No</option>
                                  </Select>
                                </div>
                              ))}
                            </Col>
                            <Col sm={2} className="mb-1">
                              <p>Concern</p>
                              {kpi.map((singleNote, index) => (
                                <div class="input-group mt-1 mb-1 ">
                                  <Select
                                    className="py-1 mt-1 "
                                    type="text"
                                    size="md"
                                    value={singleNote.kpi}
                                    onChange={(e) => handleKpiChange(e, index)}
                                    name="kpi_concern"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}  name="kpi_concern">High</option>
                                    <option value={"medium"}  name="kpi_concern">Medium</option>
                                    <option value={"Low"}  name="kpi_concern">Low</option>
                                  </Select>
                                </div>
                              ))}
                            </Col>
                           
                            <Col sm={2} className=" mb-1">
                              <p>Expected</p>
                              {kpi.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Fm.Control
                                    type="date"
                                    size="sm"
                                    value={singleNote.kpi}
                                    name="kpi_expected"
                                    onChange={(e) => handleKpiChange(e, index)}
                                  />
                                </div>
                              ))}
                            </Col>
                            <Col sm={2} className=" mb-1">
                              <p>Responsible Party</p>
                              {kpi.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Fm.Control
                                    type="text"
                                    size="sm"
                                    value={singleNote.kpi}
                                    name="kpi_resp_party"
                                    onChange={(e) => handleKpiChange(e, index)}
                                  />
                                </div>
                              ))}
                            </Col>
                            <Col sm={2} className="">
                              <p>Status</p>
                              {kpi.map((singleNote, index) => (
                                <div class="input-group  mt-2">
                                  <Fm.Control
                                    type="text"
                                    style={{ width: "30%", height: "10px" }}
                                    size="sm"
                                    value={singleNote.kpi}
                                    name="kpi_status"
                                    onChange={(e) => handleKpiChange(e, index)}
                                  />
                                  <button
                                    onClick={handleKpiRemove}
                                    className="mt-1"
                                    style={{ height: "25px", border: "none" }}
                                  >
                                    <i className="">
                                      <FiDelete />
                                    </i>
                                  </button>
                                </div>
                              ))}
                            </Col>
                          </Row>
                        </Col>
                        <div className="d-flex justify-content-end ml-2">
                          <p className="">
                            <GrAdd onClick={handleKpiAdd} />
                          </p>
                        </div>



                      <Col sm={12}>
                        {/* <Row>
                          <Col>
                            <PWrapper>FACTORS</PWrapper>
                            <br />
                          </Col>
                          <Col>
                            <PWrapper>YES/NO</PWrapper>
                          </Col>
                          <Col>
                            <PWrapper>CONCERN</PWrapper>
                          </Col>
                          <Col>
                            <PWrapper>EXPECTED</PWrapper>
                          </Col>
                          <Col>
                            <PWrapper>RESPONSIBLE PARTY</PWrapper>
                          </Col>
                          <Col>
                            <PWrapper>STATUS</PWrapper>
                          </Col>
                        </Row> */}








                        
                        {/* <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Transaction Docs
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_1_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_1_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_1_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_1_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_1_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_1_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_1_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_1_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_1_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_1_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col> */}

                        {/* <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Risk CP Sign-Off
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type = "text"
                                    value={deal.key_deal_fac_2_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_2_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type = "text"
                                    value={deal.key_deal_fac_2_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_2_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control 
                                    type="date"
                                    value={deal.key_deal_fac_2_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_2_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_2_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_2_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_2_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_2_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col> */}

                        {/* <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Reporting Acct Report
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_3_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_3_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_3_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_3_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_3_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_3_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_3_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_3_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_3_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_3_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Regulatory Approval
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_4_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_4_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_4_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_4_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_4_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_4_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_4_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_4_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_4_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_4_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col> */}

                        {/* <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Parties Appointed
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_5_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_5_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_5_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_5_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_5_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_5_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_5_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_5_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_5_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_5_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col> */}

                        {/* <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    New Equity Investment
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_6_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_6_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_6_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_6_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_6_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_6_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_6_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_6_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_6_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_6_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Legal Opinions
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_7_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_7_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_7_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_7_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_7_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_7_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_7_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_7_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_7_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_7_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Issue Ratings
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_8_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_8_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_8_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_8_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_8_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_8_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_8_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_8_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_8_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_8_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col> */}
                        {/* <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Guarantee Docs
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_9_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_9_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_9_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_9_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_9_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_9_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_9_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_9_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_9_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_9_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Filed with SEC
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_10_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_10_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_10_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_10_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_10_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_10_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_10_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_10_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_10_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_10_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col> */}

                        {/* <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Fees
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_11_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_11_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_11_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_11_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_11_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_11_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_11_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_11_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_11_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_11_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    CP Letter / Risk Sign-Off
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_12_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_12_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_12_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_12_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_12_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_12_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_12_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_12_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_12_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_12_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Consent of Legacy Lenders
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_13_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_13_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_13_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_13_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_13_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_13_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_13_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_13_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_13_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_13_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col> */}

                        {/* <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Board Resolutions
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_14_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_14_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_14_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_14_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_14_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_14_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_14_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_14_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_14_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_14_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Asset Valuation
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_15_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_15_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_15_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_15_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_15_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_15_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_15_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_15_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_15_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_15_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    MROC pre-CC Approval
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_16_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_16_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>

                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_16_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_16_c"
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    MROC pre-CC Approval
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_17_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_17_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_17_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_17_c"
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    MROC pre-CC Minutes
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_18_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_18_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>

                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_18_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_18_c"
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    CC Approval
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_19_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_19_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>

                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_19_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_19_c"
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col> */}
                        {/* <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    CC Minutes
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_20_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_20_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>

                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_20_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_20_c"
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>
                      </Col>

                      <Col sm={12}>
                        <Col className="pb-2">
                          <Fm.Group>
                            <Row>
                              <Col sm={2}>
                                <Fm.Label style={{ paddingRight: "1rem" }}>
                                  CC Approval Terms
                                </Fm.Label>
                              </Col>
                              <Col sm={2}>
                                <Select
                                  type="text"
                                  value={deal.key_deal_fac_21_b}
                                  onChange={handleInputChange}
                                  name="key_deal_fac_21_b"
                                >
                                  <option>Yes/No</option>
                                  <option value={true}>Yes</option>
                                  <option value={false}>No</option>
                                </Select>{" "}
                              </Col>

                              <Col sm={2}>
                                <Fm.Control
                                  type="date"
                                  value={deal.key_deal_fac_21_c}
                                  onChange={handleInputChange}
                                  name="key_deal_fac_21_c"
                                />
                              </Col>
                            </Row>
                          </Fm.Group>
                        </Col>
                      </Col>

                      <Col sm={12}>
                        <Col className="pb-2">
                          <Fm.Group>
                            <Row>
                              <Col sm={2}>
                                <Fm.Label style={{ paddingRight: "1rem" }}>
                                  Updated Indicative Term Sheet
                                </Fm.Label>
                              </Col>
                              <Col sm={2}>
                                <Select
                                  type="text"
                                  value={deal.key_deal_fac_22_b}
                                  onChange={handleInputChange}
                                  name="key_deal_fac_22_b"
                                >
                                  <option>Yes/No</option>
                                  <option value={true}>Yes</option>
                                  <option value={false}>No</option>
                                </Select>{" "}
                              </Col>

                              <Col sm={2}>
                                <Fm.Control
                                  type="date"
                                  value={deal.key_deal_fac_22_c}
                                  onChange={handleInputChange}
                                  name="key_deal_fac_22_c"
                                />
                              </Col>
                            </Row>
                          </Fm.Group>
                        </Col>
                      </Col>

                      <Col sm={12}>
                        <Col className="pb-2">
                          <Fm.Group>
                            <Row>
                              <Col sm={2}>
                                <Fm.Label style={{ paddingRight: "1rem" }}>
                                  Fee Letter
                                </Fm.Label>
                              </Col>
                              <Col sm={2}>
                                <Select
                                  type="text"
                                  value={deal.key_deal_fac_23_b}
                                  onChange={handleInputChange}
                                  name="key_deal_fac_23_b"
                                >
                                  <option>Yes/No</option>
                                  <option value={true}>Yes</option>
                                  <option value={false}>No</option>
                                </Select>{" "}
                              </Col>

                              <Col sm={2}>
                                <Fm.Control
                                  type="date"
                                  value={deal.key_deal_fac_23_c}
                                  onChange={handleInputChange}
                                  name="key_deal_fac_23_c"
                                />
                              </Col>
                            </Row>
                          </Fm.Group>
                        </Col> */}
                      </Col>
                    </Row>
                    {/* <button
                      onClick={(e) => toPrevTab(e)}
                      style={{
                        display: "inlineblock",
                        fontSize: "13px",
                        padding: "2px 20px",
                        margin: "10px",
                        background: "green",
                        color: "white",
                        borderRadius: "3px",
                      }}
                    >
                      {" "}
                      Prev
                    </button> */}
                    {/* <button
                        onClick={(e) => toNextTab(e)}
                        style={{
                          display: "inlineblock",
                          fontSize: "13px",
                          padding: "2px 20px",
                          margin: "10px",
                          background: "green",
                          color: "white",
                          borderRadius: "3px",
                        }}
                      >
                        Next
                      </button> */}
                  </Tab>

                  {/* ............10............................................................................... */}
                </Tabs>
                <div
                  className="d-flex justify-content-end"
                  style={{ fontSize: "13px", color: "red" }}
                >
                  <p class="animate__animated animate__pulse pt-2">
                    {response}
                  </p>
                </div>

                <div className="d-flex justify-content-end">
                  <ButtonWrapper onClick={saveDeal} ref={form}>
                    Submit
                  </ButtonWrapper>

                  <ButtonWrapper
                    style={{ backgroundColor: "grey", color: "white" }}
                  >
                    Cancel
                  </ButtonWrapper>
                </div>
              </div>
            </Form>
          )}
        </Container>
      </FormWrapper>
    </React.Fragment>
  );
};
export default AddDeal;
