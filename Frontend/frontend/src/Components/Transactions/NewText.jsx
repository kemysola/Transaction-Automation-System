import React, { useState, useEffect } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Form, Container, Row, Col } from 'react-bootstrap';
import Forms from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from 'react-validation/build/select';
import { isEmpty } from 'validator';
import styled from 'styled-components';
import Services from '../../Services/Service';

const ButtonWrapper = styled.button`
  background: green;
  border:1px solid  white;
  padding:12px 21px;
  margin-top: 3px;
  margin-right:3px;
  font-size:11px;
  border-radius:2px;
  color:white;
`;
const FormWrapper = styled.div`
margin:0;
font-size:5px;
padding:0;
`;

const Container1 = styled.div`
font-size:12px;
padding: 1px 1rem;
border-radius: 15px;
`;

const PWrapper = styled.p`
color:#1E2F97;
font-weight:bold;
font-size:11px;
margin:0;
padding: 0;
`;

const AddDeal = () => {
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
    creditApproval: null,
    feeLetter: null,
    expectedClose: null,
    actualClose: null,
    greenA: "",
    greenB: "",
    greenC: "",
    greenD: "",
    greenE: "",
    greenF: "",
    amberA: "",
    amberB: "",
    amberC: "",
    amberD: "",
    amberE: "",
    redA: "",
    redB: "",
    redC: "",
    structuringFeeAmount: 0,
    structuringFeeAdvance: 0,
    guaranteeFee: 0,
    monitoringFee: 0,
    reimbursible: 0,
    notes: "",
    closed: false
  };

  const [activeTab, setActiveTab] = useState('first');
  const [dealActiveTab, setDealActiveTab] = useState('deal');
  const [deal, setDeal] = useState(initialDealState);
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState(false);
  const [noteList, setNoteList] = useState([{ note: "" }])
  const [industry, setIndustry] = useState([]);
  const [product, setProduct] = useState([]);
  const [region, setRegion] = useState([]);
  const [frequency, setFrequency] = useState([]);
  const [style, setStyle] = useState([]);
  const [staffList, setStaffList] = useState([]);
 
  useEffect(() => {
    retrieveIndustry();
  }, [])

  useEffect(() => {
    retrieveProduct();
  }, [])

  useEffect(() => {
    retrieveRegion();
  }, [])

  useEffect(() => {
    retrieveRepaymentFreq();
  }, [])

  useEffect(() => {
    retrieveAmortizationStyle();
  }, [])

  useEffect(() => {
    retrieveStaffList();
  }, [])

  const retrieveIndustry = () => {
    Services.getIndustry()
    .then((response) => {
        setIndustry(response.data.industry);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveProduct = () => {
    Services.getProduct()
    .then((response) => {
        setProduct(response.data.product);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveRegion = () => {
    Services.getRegion()
    .then((response) => {
        setRegion(response.data.region);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveRepaymentFreq = () => {
    Services.getRepaymentFreq()
    .then((response) => {
        setFrequency(response.data.frequency);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveAmortizationStyle = () => {
    Services.getAmortizationSty()
    .then((response) => {
        setStyle(response.data.amortization);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveStaffList = () => {
    Services.getStaffList()
    .then((response) => {
      setStaffList(response.data.staffList);
    })
    .catch((e) => {
      console.log(e);
    });
  };

  function toNextTab(e) {
    e.preventDefault();
    handleTabChange();
  }

  function toPrevTab(e) {
    e.preventDefault();
    handlePrevChange();
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

  const handleInputChange = event => { // function to save user data to deal state
    const { name, value } = event.target;
    setDeal({ ...deal, [name]: value });
  }

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

  const required = (value) => {
    if (isEmpty(value)) {
        return <small className="form-text text-danger">This field is required</small>;
    }
  }

  const saveDeal = (e) => { // function to save users data and post to db
    e.preventDefault()

    let allNotes = noteList.map(({ note }) => note)
    let note = allNotes.join("|")

    let data = { // store user's inpt in a variable called data
      "clientName": deal.clientName,
      "originator": deal.originator,
      "transactor": deal.transactor,
      "transactionLegalLead": deal.transactionLegalLead,
      "industry": deal.industry,
      "product": deal.product,
      "region": deal.region,
      "dealSize": +deal.dealSize,
      "coupon": +deal.coupon,
      "tenor": +deal.tenor,
      "moratorium": +deal.moratorium,
      "repaymentFrequency": deal.repaymentFrequency,
      "amortizationStyle": deal.amortizationStyle,
      "mandateLetter": deal.mandateLetter,
      "creditApproval": deal.creditApproval,
      "feeLetter": deal.feeLetter,
      "expectedClose": deal.expectedClose,
      "actualClose": deal.actualClose,
      "greenA": JSON.parse(deal.greenA),
      "greenB": JSON.parse(deal.greenB),
      "greenC": JSON.parse(deal.greenC),
      "greenD": JSON.parse(deal.greenD),
      "greenE": JSON.parse(deal.greenE),
      "greenF": JSON.parse(deal.greenF),
      "amberA": JSON.parse(deal.amberA),
      "amberB": JSON.parse(deal.amberB),
      "amberC": JSON.parse(deal.amberC),
      "amberD": JSON.parse(deal.amberD),
      "amberE": JSON.parse(deal.amberE),
      "redA": JSON.parse(deal.redA),
      "redB": JSON.parse(deal.redB),
      "redC": JSON.parse(deal.redC),
      "structuringFeeAmount": +deal.structuringFeeAmount,
      "structuringFeeAdvance": +deal.structuringFeeAdvance,
      "guaranteeFee": +deal.guaranteeFee,
      "monitoringFee": +deal.monitoringFee,
      "reimbursible": +deal.reimbursible,
      "notes": note,
      "closed": false
    };

    Services.createDeal(data)
      .then(res => {
        setResponse(res.data.message)
        setSubmitted(true)
      })
      .catch(error => {
        setResponse("Failed to Create Deal. Please Try Again")
        setSubmitted(true)
      });
  };

  const newDeal = () => {
    setDeal(initialDealState);
    setNoteList([{ note: "" }])
    setSubmitted(false);
  };

  return (
    <React.Fragment>
      {/* ---------------------- New Transaction Forms ----------- */}
      <FormWrapper>
        <Container fluid style={{ marginTop: '0' }}>

          {submitted ? (
            <div>
              <p style={{ fontWeight: 'bold', fontSize: '12px', color: 'darkblue', marginTop: '1rem' }}>{response}</p>
              <ButtonWrapper onClick={newDeal}>New Deal</ButtonWrapper>
            </div>

          ) : (
            <Form>
              <PWrapper>
                <h5 className='py-3 text-dark'>New Transaction</h5>
              </PWrapper>
              <br />
              <div>
                <Tabs activeKey={activeTab} onSelect={(k) => handleTabChange} style={{ fontSize: '12px' }}>
                  <Tab eventKey="first" title="CLIENT">
                    <Container1>
                      <br />
                      <Row>
                        <Col sm={12}>
                          <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Form.Label>Client Name</Form.Label>
                            <Form.Control size="sm" type="text" value={deal.clientName} onChange={handleInputChange} name='clientName' />
                          </Form.Group>
                        </Col>

                        {/* <Col sm={12}>
                          <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                            <label htmlFor=""> Client</label>
                            <Input size="sm" type="text" value={deal.clientName} onChange={handleInputChange} name='clientName' />
                            <Form.Control size="sm" type="text" value={deal.clientName} onChange={handleInputChange} name='clientName' />
                          </Form.Group>
                        </Col> */}

                        <Col sm={12}>
                          <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Form.Label>Originator</Form.Label>
                            <Form.Select size="sm" type="text" value={deal.originator} onChange={handleInputChange} name='originator'>
                              <option></option>
                              {staffList.map((opt, i) => (
                                <option key={staffList[i].staffid} value={staffList[i].stafflist}>{staffList[i].stafflist}</option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>

                        <Col sm={12}>
                          <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Form.Label>Transactor</Form.Label>
                            <Form.Select size="sm" type="text" value={deal.transactor} onChange={handleInputChange} name='transactor'>
                              <option></option>
                              {staffList.map((opt, i) => (
                                <option key={staffList[i].staffid} value={staffList[i].stafflist}>{staffList[i].stafflist}</option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>

                        <Col sm={12}>
                          <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Form.Label>Transactor Legal Lead</Form.Label>
                            <Form.Select size="sm" type="text" value={deal.transactionLegalLead} onChange={handleInputChange} name='transactionLegalLead'>
                              <option></option>
                              {staffList.map((opt, i) => (
                                <option key={staffList[i].staffid} value={staffList[i].stafflist}>{staffList[i].stafflist}</option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>

                        <Col sm={12}>
                          <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Form.Label>Note</Form.Label> <button type="button" onClick={handleNoteAdd} style={{fontSize: '10px', padding: '2px 10px', margin: '8px', background: 'steelblue', color: 'white', borderRadius: '3px'}}>Add</button>
                            {noteList.map((singleNote, index) => (
                              <div class="input-group">
                                <Form.Control
                                  as='textarea'
                                  style={{ margin: '0.8em', width: '60%' }}
                                  size="sm" value={singleNote.note}
                                  name='note'
                                  onChange={(e) => handleNoteChange(e, index)}
                                  required />
                                  <button type = "button" style={{fontSize: '10px', padding: '2px 10px', margin: '8px', background: 'steelblue', color: 'white', borderRadius: '3px'}} onClick={handleNoteRemove}>x</button> 
                                </div>
                            ))}
                          </Form.Group>
                        </Col>
                      </Row>
                      <br />
                      <br />
                      <button onClick={e => toNextTab(e)} style={{ display: 'inlineBlock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>Next </button>
                    </Container1>


                  </Tab>


                  <Tab eventKey="second" title="DEAL PROFILE FEES & REIMBURSEMENTS">
                    <Container1>
                      <div className='mt-2'>
                        <PWrapper>
                          <h6 className="pt-1 mt-1" style={{ fontSize: "13px" }}>Deal Profile Fees & Reimbursement</h6>
                        </PWrapper>

                        <Row>
                          <Col sm={6} className='my-0 py-0'>
                            <Form.Group className="">
                              <Form.Label>Industry</Form.Label>
                              <Form.Select size="sm" name='industry' value={deal.industry} onChange={handleInputChange} required>
                                <option>Select</option>
                                {industry.map((opt, i) => (
                                    <option key={industry[i].industryid} value={industry[i].industry}>{industry[i].industry}</option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>

                          <Col sm={6}>
                            <Form.Group className="">
                              <Form.Label>Products</Form.Label>
                              <Form.Select size="sm" name='product' value={deal.product} onChange={handleInputChange} required>
                                <option>Select</option>
                                {product.map((opt, i) => (
                                    <option key={product[i].productid} value={product[i].product}>{product[i].product}</option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>

                          <Col sm={6}>
                            <Form.Group className="">
                              <Form.Label>Region</Form.Label>
                              <Form.Select size="sm" name='region' value={deal.region} onChange={handleInputChange} required>
                                <option>Select</option>
                                {region.map((opt, i) => (
                                    <option key={region[i].regionid} value={region[i].region}>{region[i].region}</option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row className='mt-1'>
                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>Deal Size (NGN)</Form.Label>
                              <Form.Control size="sm" type="number" value={deal.dealSize} onChange={handleInputChange} name='dealSize' />
                            </Form.Group>
                          </Col>

                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>Coupon(%)</Form.Label>
                              <Form.Control size="sm" type="number" value={deal.coupon} onChange={handleInputChange} name='coupon' />
                            </Form.Group>
                          </Col>

                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>Tenor(yrs)</Form.Label>
                              <Form.Control size="sm" type="number" value={deal.tenor} onChange={handleInputChange} name='tenor' />
                            </Form.Group>
                          </Col>

                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>Moratorium(yrs)</Form.Label>
                              <Form.Control size="sm" type="number" value={deal.moratorium} onChange={handleInputChange} name='moratorium' />
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row className='mt-1 pt-3' >

                          <Col sm={6}>
                            <Form.Group className="">
                              <Form.Label>Repayment Frequency</Form.Label>
                              <Form.Select size="sm" name='repaymentFrequency' value={deal.repaymentFrequency} onChange={handleInputChange} >
                                <option>Select</option>
                                {frequency.map((opt, i) => (
                                    <option key={frequency[i].id} value={frequency[i].frequency}>{frequency[i].frequency}</option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>

                          <Col sm={6}>
                            <Form.Group className="">
                              <Form.Label>Amortization Style</Form.Label>
                              <Form.Select size="sm" name='amortizationStyle' value={deal.amortizationStyle} onChange={handleInputChange} >
                                <option>Select</option>
                                {style.map((opt, i) => (
                                    <option key={style[i].id} value={style[i].amortizationstyle}>{style[i].amortizationstyle}</option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>

                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>Mandate Letter</Form.Label>
                              <Form.Control size="sm" type="date" value={deal.mandateLetter} onChange={handleInputChange} name='mandateLetter' />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row className='mt-1 pt-3' >
                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>Credit Approval</Form.Label>
                              <Form.Control size="sm" type="date" value={deal.creditApproval} onChange={handleInputChange} name='creditApproval' />
                            </Form.Group>
                          </Col>

                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>Fee Letter</Form.Label>
                              <Form.Control size="sm" type="date" value={deal.feeLetter} onChange={handleInputChange} name='feeLetter' />
                            </Form.Group>
                          </Col>

                          <Col sm={6} className='pt-3'>
                            <Form.Group className="pt-1">
                              <Form.Label>Excepted Close</Form.Label>
                              <Form.Control size="sm" type="date" value={deal.expectedClose} onChange={handleInputChange} name='expectedClose' />
                            </Form.Group>
                          </Col>

                          <Col sm={6} className='pt-3'>
                            <Form.Group className="pt-1">
                              <Form.Label>Actual Close</Form.Label>
                              <Form.Control size="sm" type="date" value={deal.actualClose} onChange={handleInputChange} name='actualClose' />
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>
                      <br />
                      <br />
                      <button onClick={e => toPrevTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}> Prev</button>
                      <button onClick={e => toNextTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>Next</button>
                    </Container1>
                    <br />
                    <br />
                  </Tab>



                  <Tab eventKey="third" title="STRUCTURING FEES">
                    <br />
                    <br />
                    <Container1>
                      <div className='mt-2'>
                        

                        <Row>
                          <Col sm={6} className='my-0 py-0'>
                            <Form.Group>
                              <Form.Label>Amount(NGN)</Form.Label>
                              <Form.Control size="sm" type="number" value={deal.structuringFeeAmount} onChange={handleInputChange} name='structuringFeeAmount' />
                            </Form.Group>
                          </Col>

                          <Col sm={6} className='my-0 py-0'>
                            <Form.Group>
                              <Form.Label>Advance(%)</Form.Label>
                              <Form.Control size="sm" type="number" value={deal.structuringFeeAdvance} onChange={handleInputChange} name='structuringFeeAdvance' />
                            </Form.Group>
                          </Col>

                          <Col sm={6} className='my-0 py-0'>
                            <Form.Group>
                              <Form.Label>Final(%)</Form.Label>
                              <Form.Control size="sm" type="number" value={deal.structuringFeeFinal} onChange={handleInputChange} name='structuringFeeFinal' disabled />
                            </Form.Group>
                          </Col>
                       
                          <Col sm={6} className='my-0 py-0'>
                            <Form.Group className="pt-1">
                              <Form.Label>Guarantee (%)</Form.Label>
                              <Form.Control size="sm" type="number" value={deal.guaranteeFee} onChange={handleInputChange} name='guaranteeFee' />
                            </Form.Group>
                          </Col>

                          <Col sm={6} className='my-0 py-0'>
                            <Form.Group className="pt-1">
                              <Form.Label>Monitoring(NGN)</Form.Label>
                              <Form.Control size="sm" type="number" value={deal.monitoringFee} onChange={handleInputChange} name='monitoringFee' />
                            </Form.Group>
                          </Col>

                          <Col sm={6} className='my-0 py-0'>
                            <Form.Group className="pt-1">
                              <Form.Label>Reimbursible(NGN)</Form.Label>
                              <Form.Control size="sm" type="number" value={deal.reimbursible} onChange={handleInputChange} name='reimbursible' />
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>
                      <br />
                      <br />
                      <button onClick={e => toPrevTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}> Prev</button>
                      <button onClick={e => toNextTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>Next</button>
                    </Container1>

                  </Tab>

                  <Tab eventKey="fourth" title="DEAL CATEGORY" style={{ fontSize: '12px' }}>
                        <Container1>
                          <div name='redCategory' className='py-3'>
                            <PWrapper>
                              <h6 className="pt-1" style={{ fontSize: "10px", color: "red" }}>RED CATEGORY</h6>
                            </PWrapper>
                          </div>
                          <div className='pb-2'>
                            <Row>

                              <Col sm={12}  >
                                <Col className='mb-3'>
                                  <Form.Group>
                                    <Row>

                                      <Col sm={6}>
                                        <Form.Label style={{ paddingRight: "1rem" }}>Mandate Letter signed:</Form.Label>
                                      </Col>
                                      <Col sm={6}>
                                        <Form.Check inline label="Yes" type="radio" name="redA" value={true} onChange={handleInputChange} />
                                        <Form.Check inline label="No" type="radio" name="redA" value={false} onChange={handleInputChange} />
                                      </Col>
                                    </Row>
                                  </Form.Group>
                                </Col>

                                <Col className='mb-3'>
                                  <Form.Group>
                                    <Row>
                                      <Col sm={6}>
                                        <Form.Label style={{ paddingRight: "1rem" }}>Due dilligence ongoing:</Form.Label>

                                      </Col>
                                      <Col sm={6}>
                                        <Form.Check inline label="Yes" type="radio" name="redB" value={true} onChange={handleInputChange}  />
                                        <Form.Check inline label="No" type="radio" name="redB" value={false} onChange={handleInputChange} />
                                      </Col>
                                    </Row>
                                  </Form.Group>
                                </Col>



                                <Col>
                                  <Form.Group>
                                    <Row>
                                      <Col sm={6}>
                                        <Form.Label style={{ paddingRight: "1rem" }}>Pending Credit Committee approval:</Form.Label>
                                      </Col>

                                      <Col sm={6}>
                                        <Form.Check inline label="Yes" type="radio" name="redC" value={true} onChange={handleInputChange}  />
                                        <Form.Check inline label="No" type="radio" name="redC" value={false} onChange={handleInputChange} />
                                      </Col>
                                    </Row>
                                  </Form.Group>
                                </Col>
                              </Col>
                            </Row>
                          </div>
                          <br />
                        </Container1>
                     

                      
                        <Container1 className='mt-2 pt-3'>

                          <div name='amberCategory'>
                            <PWrapper>
                            
                              <h6 className="pt-1" style={{ fontSize: "10px", color: "#FFC200" }}>AMBER CATEGORY</h6>
                            </PWrapper>
                            <div>
                              <Row>
                                <Col sm={12}>
                                  <Col className='pb-3'>
                                    <Form.Group>
                                      <Row>
                                        <Col sm={6}>
                                          <Form.Label style={{ paddingRight: "1rem" }}>Mandate Letter signed:</Form.Label>
                                        </Col>
                                        <Col sm={6}>
                                          <Form.Check inline label="Yes" type="radio" name="amberA" value={true} onChange={handleInputChange} />
                                          <Form.Check inline label="No" type="radio" name="amberA" value={false} onChange={handleInputChange}  />
                                        </Col>
                                      </Row>
                                    </Form.Group>
                                  </Col>

                                  <Col className='pb-3'>
                                    <Form.Group>
                                      <Row>
                                        <Col sm={6}>
                                          <Form.Label style={{ paddingRight: "1rem" }}>Transaction has obtained Credit Committe approval:</Form.Label>
                                        </Col>
                                        <Col sm={6}>
                                          <Form.Check inline label="Yes" type="radio" name="amberB" value={true} onChange={handleInputChange} />
                                          <Form.Check inline label="No" type="radio" name="amberB" value={false} onChange={handleInputChange}  />

                                        </Col>
                                      </Row>
                                    </Form.Group>
                                  </Col>

                                  <Col className='pb-3'>
                                    <Form.Group>
                                      <Row>
                                        <Col sm={6}>
                                          <Form.Label style={{ paddingRight: "1rem" }}>Professional Parties to the Bond issue appointed or selected:</Form.Label>
                                        </Col>
                                        <Col sm={6}>
                                          <Form.Check inline label="Yes" type="radio" name="amberC" value={true} onChange={handleInputChange} />
                                          <Form.Check inline label="No" type="radio" name="amberC" value={false} onChange={handleInputChange}  />
                                        </Col>
                                      </Row>
                                    </Form.Group>
                                  </Col>
                                </Col>
                              </Row>
                            </div>

                            <Col className='pb-3'>
                              <Form.Group>
                                <Row>
                                  <Col sm={6}>
                                    <Form.Label style={{ paddingRight: "1rem" }}>Fee Letter and/or Guarantee Documentation expected to be negotiated and/or signed within 8 weeks:</Form.Label>
                                  </Col>

                                  <Col sm={6}>
                                    <Form.Check inline label="Yes" type="radio" name="amberD" value={true} onChange={handleInputChange} />
                                    <Form.Check inline label="No" type="radio" name="amberD" value={false} onChange={handleInputChange} />
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>

                            <Col className='pb-2'>
                              <Form.Group>
                                <Row>
                                  <Col sm={6}>
                                    <Form.Label style={{ paddingRight: "1rem" }}>All Materials CPs with timelines for completion agreed with the client:</Form.Label>
                                  </Col>
                                  <Col sm={6}>
                                    <Form.Check inline label="Yes" type="radio" name="amberE" value={true} onChange={handleInputChange} />
                                    <Form.Check inline label="No" type="radio" name="amberE" value={false} onChange={handleInputChange}/>
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>

                          </div>
                        </Container1>
                      



                      
                        <Container1 className='mt-2 pt-3'>
                          <div name='greenCategory'>

                            <PWrapper>
                              <br />
                              <h6 className="pt-1" style={{ fontSize: "10px", color: "green" }}>
                                GREEN CATEGORY
                              </h6>
                            </PWrapper>
                            <div>
                              <Row>
                                <Col sm={12}>
                                  <Col className='pb-2'>
                                    <Form.Group>
                                      <Row>
                                        <Col sm={6}>
                                          <Form.Label style={{ paddingRight: "1rem" }}>Transaction has obtained Credit Committee approval:</Form.Label>

                                        </Col >
                                        <Col sm={6}>
                                          <Form.Check inline label="Yes" type="radio" name="greenA" value={true} onChange={handleInputChange}  />
                                          <Form.Check inline label="No" type="radio" name="greenA" value={false} onChange={handleInputChange} />
                                        
                                        </Col>
                                      </Row>
                                    </Form.Group>
                                  </Col>

                                  <Col className='pb-2'>
                                    <Form.Group>
                                      <Row>
                                        <Col sm={6}>
                                          <Form.Label style={{ paddingRight: "1rem" }}>Guarantee Document in agreed form:</Form.Label>
                                        </Col>
                                        <Col sm={6}>
                                          <Form.Check inline label="Yes" type="radio" name="greenB" value={true} onChange={handleInputChange} />
                                          <Form.Check inline label="No" type="radio" name="greenB" value={false} onChange={handleInputChange}  />
                                        </Col>
                                      </Row>
                                    </Form.Group>
                                  </Col>

                                  <Col className='pb-2'>
                                    <Form.Group>
                                      <Row>
                                        <Col sm={6}>
                                          <Form.Label style={{ paddingRight: "1rem" }}>Professional Parties to the Bond Issue appointed or selected:</Form.Label>
                                        </Col>
                                        <Col sm={6}>
                                          <Form.Check inline label="Yes" type="radio" name="greenC" value={true} onChange={handleInputChange} />
                                          <Form.Check inline label="No" type="radio" name="greenC" value={false} onChange={handleInputChange} />
                                        </Col>
                                      </Row>
                                    </Form.Group>
                                  </Col>

                                  <Col className='pb-2'>
                                    <Form.Group>
                                      <Row>
                                        <Col sm={6}>
                                          <Form.Label style={{ paddingRight: "1rem" }}>Already filed or expected filing with SEC (or equivalent Exchange) within 6 weeks:</Form.Label>
                                        </Col>

                                        <Col sm={6}>
                                          <Form.Check inline label="Yes" type="radio" name="greenD" value={true} onChange={handleInputChange} />
                                          <Form.Check inline label="No" type="radio" name="greenD" value={false} onChange={handleInputChange} />
                                        </Col>
                                      </Row>
                                    </Form.Group>
                                  </Col>


                                  <Col className='pb-2'>
                                    <Form.Group>
                                      <Row>
                                        <Col sm={6}>
                                          <Form.Label style={{ paddingRight: "1rem" }}>All Materials CPs to Financial Close have been satisfactorily met or committed by the Client for completion on or before Financial Close:</Form.Label>
                                        </Col>

                                        <Col sm={6}>
                                          <Form.Check inline label="Yes" type="radio" name="greenE" value={true} onChange={handleInputChange} />
                                          <Form.Check inline label="No" type="radio" name="greenE" value={false} onChange={handleInputChange}  />
                                        </Col>
                                      </Row>
                                    </Form.Group>
                                  </Col>


                                  <Col className='pb-2'>
                                    <Form.Group>
                                      <Row>
                                        <Col sm={6}>
                                          <Form.Label style={{ paddingRight: "1rem" }}>Financial Close expected within 3-6 months:</Form.Label>
                                        </Col>
                                        <Col sm={6}>
                                          <Form.Check inline label="Yes" type="radio" name="greenF" value={true} onChange={handleInputChange} />
                                          <Form.Check inline label="No" type="radio" name="greenF" value={false} onChange={handleInputChange} />
                                        </Col>
                                      </Row>
                                    </Form.Group>
                                  </Col>
                                </Col>
                              </Row>
                            </div>
                          </div>
                          <br />
                          <br />
                        </Container1>
                  
                    <button onClick={e => toPrevTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}> Prev</button>
                  </Tab>
                  


                </Tabs>
                <div className='d-flex justify-content-end'>
                <ButtonWrapper onClick={saveDeal} >
                    Submit
                  </ButtonWrapper>

                  <ButtonWrapper style={{ backgroundColor: "grey", color:'white'}} >
                    Cancel
                  </ButtonWrapper>
                  </div>
              </div>
            </Form>
          )}

        </Container>

      </FormWrapper>
    </React.Fragment>
  )
};
export default AddDeal;
