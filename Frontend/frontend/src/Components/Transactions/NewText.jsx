import React, { useState, useEffect, useRef} from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {Form as Fm, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import Services from '../../Services/Service';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import Button from "react-validation/build/button";

//import Checkbox from "react-validation/build/checkbox";


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

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block text-danger" >This field is required!</div>
    );
  }
};


const AddDeal = () => {
  //form.current.validateAll();

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
  const form = useRef();

 
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
    if (activeTab === 'sixth') {
      setActiveTab('seventh');
    }
    if (activeTab === 'seventh') {
      setActiveTab('eigth');
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
    if (activeTab === 'sixth') {
      setActiveTab('fourth');
    }
    if (activeTab === 'seventh') {
      setActiveTab('sixth');
    }
    if (activeTab === 'eigth') {
      setActiveTab('seventh');
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

  const saveDeal = (e) => { // function to save users data and post to db
    e.preventDefault()
    form.current.validateAll();

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
      "NBC_approval_date": deal.nbc_approval_date,
      "NBC_submitted_date": deal.nbc_submitted_date,
      "notes": note,
      "closed": false
    };

    Services.createDeal(data)
      .then(res => {
        setResponse(res.data.message)
        setSubmitted(true)
      })
      .catch(error => {
        setResponse("Failed to Create Deal. Please Fill all required fields")
        setSubmitted(false)
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
              <p style={{ fontWeight: 'bold', fontSize: '12px', color: 'steelblue', marginTop: '1rem' }}>{response}</p>
              <ButtonWrapper onClick={newDeal}>Add New Transaction</ButtonWrapper>
            </div>

          ) : (
            <Form ref={form}>
              <PWrapper>
                <h5 className='py-3 text-secondary'>New Transaction</h5>
              </PWrapper>
              <br />

              <div>
                <Tabs activeKey={activeTab} onSelect={(k) => handleTabChange} style={{ fontSize: '12px' }}>
                  <Tab eventKey="first" title="CLIENT">
                    <Container1>
                      <br />
                      <Row>
                        <Col sm={6}>
                          <Fm.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Fm.Label>Client Name <span style={{color: "red"}}>*</span></Fm.Label>
                            <Input type="text" value={deal.clientName} onChange={handleInputChange} name='clientName' validations={[required]} style={{width:'100%', padding:'4px 2px', focus:'none'}}/>
                          </Fm.Group>
                        </Col>

                        <Col sm={6}>
                          <Fm.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Fm.Label>Originator <span style={{color: "red"}}>*</span></Fm.Label>
                            <Select size="sm" type="text" value={deal.originator} onChange={handleInputChange} name='originator' style={{width:'100%', padding:'4px 2px', focus:'none'}} validations={[required]}>
                              <option></option>
                              {staffList.map((opt, i) => (
                                <option key={staffList[i].email} value={staffList[i].stafflist}>{staffList[i].stafflist}</option>
                              ))}
                            </Select>
                          </Fm.Group>
                        </Col>

                        <Col sm={6}>
                          <Fm.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Fm.Label>Transactor <span style={{color: "red"}}>*</span></Fm.Label>
                            <Select size="sm" type="text" value={deal.transactor} onChange={handleInputChange} name='transactor' style={{width:'100%', padding:'4px 2px', focus:'none'}} validations={[required]}>
                              <option></option>
                              {staffList.map((opt, i) => (
                                <option key={staffList[i].email} value={staffList[i].stafflist}>{staffList[i].stafflist}</option>
                              ))}
                            </Select>
                          </Fm.Group>
                        </Col>

                        <Col sm={6}>
                          <Fm.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Fm.Label>Transactor Legal Lead <span style={{color: "red"}}>*</span></Fm.Label>
                            <Select size="sm" type="text" value={deal.transactionLegalLead} onChange={handleInputChange} name='transactionLegalLead' style={{width:'100%', padding:'4px 2px', focus:'none'}} validations={[required]}>
                              <option></option>
                              {staffList.map((opt, i) => (
                                <option key={staffList[i].email} value={staffList[i].stafflist}>{staffList[i].stafflist}</option>
                              ))}
                            </Select>
                          </Fm.Group>
                        </Col>

                        <Col sm={12}>
                          <Fm.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Fm.Label>Note</Fm.Label> <button type="button" onClick={handleNoteAdd} style={{fontSize: '10px', padding: '2px 10px', margin: '8px', background: 'steelblue', color: 'white', borderRadius: '3px'}}>Add</button>
                            {noteList.map((singleNote, index) => (
                              <div class="input-group">
                                <Fm.Control
                                  as='textarea'
                                  style={{ margin: '0.8em', width: '60%' }}
                                  size="sm" value={singleNote.note}
                                  name='note'
                                  onChange={(e) => handleNoteChange(e, index)}
                                  />
                                  <button type = "button" style={{fontSize: '10px', padding: '2px 10px', margin: '8px', background: 'steelblue', color: 'white', borderRadius: '3px'}} onClick={handleNoteRemove}>x</button> 
                                </div>
                            ))}
                          </Fm.Group>
                        </Col>
                      </Row>
                      <br />
                      <br />
                      <button onClick={e => toNextTab(e)} style={{ display: 'inlineBlock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>Next </button>
                    </Container1>


                  </Tab>


                  <Tab eventKey="second" title="DEAL PROFILE ">
                    <Container1>
                      <div className='mt-2'>

                        <Row>
                          <Col sm={6} className='my-0 py-0'>
                            <Fm.Group className="">
                              <Fm.Label>Industry <span style={{color: "red"}}>*</span></Fm.Label>
                              <Select size="sm" name='industry' value={deal.industry} onChange={handleInputChange} validations={[required]} style={{width:'100%', padding:'6px 1px', focus:'none'}}>
                                <option>Select</option>
                                {industry.map((opt, i) => (
                                    <option key={industry[i].industryid} value={industry[i].industry}>{industry[i].industry}</option>
                                ))}
                              </Select>
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="">
                              <Fm.Label>Products <span style={{color: "red"}}>*</span></Fm.Label>
                              <Select size="sm" name='product' value={deal.product} onChange={handleInputChange} validations={[required]} style={{width:'100%', padding:'6px 1px', focus:'none'}}>
                                <option>Select</option>
                                {product.map((opt, i) => (
                                    <option key={product[i].productid} value={product[i].product}>{product[i].product}</option>
                                ))}
                              </Select>
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="">
                              <Fm.Label>Region <span style={{color: "red"}}>*</span></Fm.Label>
                              <Select size="sm" name='region' value={deal.region} onChange={handleInputChange} validations={[required]} style={{width:'100%', padding:'6px 1px', focus:'none'}}>
                                <option>Select</option>
                                {region.map((opt, i) => (
                                    <option key={region[i].regionid} value={region[i].region}>{region[i].region}</option>
                                ))}
                              </Select>
                            </Fm.Group>
                          </Col>
                        </Row>

                        <Row className='mt-1'>
                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>Deal Size (₦'BN) <span style={{color: "red"}}>*</span></Fm.Label>
                              <Input size="sm" type="number" value={deal.dealSize} onChange={handleInputChange} name='dealSize' style={{width:'100%', padding:'4px 1px', focus:'none'}} validations={[required]} />
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>Coupon(%)</Fm.Label>
                              <Input size="sm" type="number" value={deal.coupon} onChange={handleInputChange} name='coupon'  style={{width:'100%', padding:'4px 1px', focus:'none'}} />
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>Tenor(yrs)</Fm.Label>
                              <Input size="sm" type="number" value={deal.tenor} onChange={handleInputChange} name='tenor' style={{width:'100%', padding:'4px 1px', focus:'none'}}  />
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>Moratorium(yrs)</Fm.Label>
                              <Input size="sm" type="number" value={deal.moratorium} onChange={handleInputChange} name='moratorium'  style={{width:'100%', padding:'4px 1px', focus:'none'}}/>
                            </Fm.Group>
                          </Col>
                        </Row>

                        <Row className='mt-1 pt-3' >

                          <Col sm={6}>
                            <Fm.Group className="">
                              <Fm.Label>Repayment Frequency</Fm.Label>
                              <Select size="sm" name='repaymentFrequency' value={deal.repaymentFrequency} onChange={handleInputChange} style={{width:'100%', padding:'6px 1px', focus:'none'}} >
                                <option>Select</option>
                                {frequency.map((opt, i) => (
                                    <option key={frequency[i].id} value={frequency[i].frequency}>{frequency[i].frequency}</option>
                                ))}
                              </Select>
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="">
                              <Fm.Label>Amortization Style</Fm.Label>
                              <Select size="sm" name='amortizationStyle' value={deal.amortizationStyle} onChange={handleInputChange}  style={{width:'100%', padding:'6px 1px', focus:'none'}}>
                                <option>Select</option>
                                {style.map((opt, i) => (
                                    <option key={style[i].id} value={style[i].amortizationstyle}>{style[i].amortizationstyle}</option>
                                ))}
                              </Select>
                            </Fm.Group>
                          </Col>
                        </Row>

                        <Row className='mt-1 pt-3' >
                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>Mandate Letter <span style={{color: "red"}}>*</span></Fm.Label>
                              <Input size="sm" type="date" value={deal.mandateLetter} onChange={handleInputChange} name='mandateLetter' style={{width:'100%', padding:'6px 1px', focus:'none'}} validations={[required]}/>
                            </Fm.Group>
                          </Col>
                        
                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>Credit Approval <span style={{color: "red"}}>*</span></Fm.Label>
                              <Input size="sm" type="date" value={deal.creditApproval} onChange={handleInputChange} name='creditApproval' style={{width:'100%', padding:'6px 1px', focus:'none'}} validations={[required]} />
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>Fee Letter</Fm.Label>
                              <Input size="sm" type="date" value={deal.feeLetter} onChange={handleInputChange} name='feeLetter' style={{width:'100%', padding:'6px 1px', focus:'none'}} />
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>Expected Close</Fm.Label>
                              <Input size="sm" type="date" value={deal.expectedClose} onChange={handleInputChange} name='expectedClose'  style={{width:'100%', padding:'6px 1px', focus:'none'}}/>
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>Actual Close</Fm.Label>
                              <Input size="sm" type="date" value={deal.actualClose} onChange={handleInputChange} name='actualClose' style={{width:'100%', padding:'6px 1px', focus:'none'}} />
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>NBC Approval</Fm.Label>
                              <Input size="sm" type="date" value={deal.nbc_approval_date} onChange={handleInputChange}  name='nbc_approval_date'  style={{width:'100%', padding:'6px 1px', focus:'none'}} />
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>NBC Submission</Fm.Label>
                              <Input size="sm" type="date" value={deal.nbc_submitted_date} onChange={handleInputChange}  name='nbc_submitted_date'  style={{width:'100%', padding:'6px 1px', focus:'none'}} />
                            </Fm.Group>
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



                  <Tab eventKey="third" title="FEES">
                    <br />
                    <br />
                    <Container1>
                      <div className='mt-2'>
                        

                        <Row>
                          <Col sm={6} className='my-0 py-0'>
                            <Fm.Group>
                              <Fm.Label>Amount (₦)</Fm.Label>
                              <Input size="sm" type="number" value={deal.structuringFeeAmount} onChange={handleInputChange} name='structuringFeeAmount'  style={{width:'100%', padding:'4px 1px', focus:'none'}}/>
                            </Fm.Group>
                          </Col>

                          <Col sm={6} className='my-0 py-0'>
                            <Fm.Group>
                              <Fm.Label>Advance(%)</Fm.Label>
                              <Input size="sm" type="number" value={deal.structuringFeeAdvance} onChange={handleInputChange} name='structuringFeeAdvance'  style={{width:'100%', padding:'4px 1px', focus:'none'}}/>
                            </Fm.Group>
                          </Col>

                          <Col sm={6} className='my-0 py-0'>
                            <Fm.Group className="pt-1">
                              <Fm.Label>Final(%)</Fm.Label>
                              <Input size="sm" type="number" value={deal.structuringFeeFinal} onChange={handleInputChange} name='structuringFeeFinal' disabled style={{width:'100%', padding:'4px 1px', focus:'none'}} />
                            </Fm.Group>
                          </Col>
                       
                          <Col sm={6} className='my-0 py-0'>
                            <Fm.Group className="pt-1">
                              <Fm.Label>Guarantee (%)</Fm.Label>
                              <Input size="sm" type="number" value={deal.guaranteeFee} onChange={handleInputChange} name='guaranteeFee'  style={{width:'100%', padding:'4px 2px', focus:'none'}}/>
                            </Fm.Group>
                          </Col>

                          <Col sm={6} className='my-0 py-0'>
                            <Fm.Group className="pt-1">
                              <Fm.Label>Monitoring(₦)</Fm.Label>
                              <Input size="sm" type="number" value={deal.monitoringFee} onChange={handleInputChange} name='monitoringFee'  style={{width:'100%', padding:'4px 2px', focus:'none'}}/>
                            </Fm.Group>
                          </Col>

                          <Col sm={6} className='my-0 py-0'>
                            <Fm.Group className="pt-1">
                              <Fm.Label>Reimbursible(₦)</Fm.Label>
                              <Input size="sm" type="number" value={deal.reimbursible} onChange={handleInputChange} name='reimbursible'  style={{width:'100%', padding:'4px 2px', focus:'none'}}/>
                            </Fm.Group>
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
                                  <Fm.Group>
                                    <Row>

                                      <Col sm={6}>
                                        <Fm.Label style={{ paddingRight: "1rem" }}>Mandate Letter signed:</Fm.Label>
                                      </Col>
                                      <Col sm={6}>
                                        <Fm.Check inline label="Yes" type="radio" name="redA" value={true} onChange={handleInputChange} />
                                        <Fm.Check inline label="No" type="radio" name="redA" value={false} onChange={handleInputChange} defaultChecked />
                                      </Col>
                                    </Row>
                                  </Fm.Group>
                                </Col>

                                <Col className='mb-3'>
                                  <Fm.Group>
                                    <Row>
                                      <Col sm={6}>
                                        <Fm.Label style={{ paddingRight: "1rem" }}>Due dilligence ongoing:</Fm.Label>

                                      </Col>
                                      <Col sm={6}>
                                        <Fm.Check inline label="Yes" type="radio" name="redB" value={true} onChange={handleInputChange}  />
                                        <Fm.Check inline label="No" type="radio" name="redB" value={false} onChange={handleInputChange} defaultChecked />
                                      </Col>
                                    </Row>
                                  </Fm.Group>
                                </Col>



                                <Col>
                                  <Fm.Group>
                                    <Row>
                                      <Col sm={6}>
                                        <Fm.Label style={{ paddingRight: "1rem" }}>Pending Credit Committee approval:</Fm.Label>
                                      </Col>

                                      <Col sm={6}>
                                        <Fm.Check inline label="Yes" type="radio" name="redC" value={true} onChange={handleInputChange}  />
                                        <Fm.Check inline label="No" type="radio" name="redC" value={false} onChange={handleInputChange} defaultChecked />
                                      </Col>
                                    </Row>
                                  </Fm.Group>
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
                                    <Fm.Group>
                                      <Row>
                                        <Col sm={6}>
                                          <Fm.Label style={{ paddingRight: "1rem" }}>Mandate Letter signed:</Fm.Label>
                                        </Col>
                                        <Col sm={6}>
                                          <Fm.Check inline label="Yes" type="radio" name="amberA" value={true} onChange={handleInputChange} />
                                          <Fm.Check inline label="No" type="radio" name="amberA" value={false} onChange={handleInputChange} defaultChecked />
                                        </Col>
                                      </Row>
                                    </Fm.Group>
                                  </Col>

                                  <Col className='pb-3'>
                                    <Fm.Group>
                                      <Row>
                                        <Col sm={6}>
                                          <Fm.Label style={{ paddingRight: "1rem" }}>Transaction has obtained Credit Committe approval:</Fm.Label>
                                        </Col>
                                        <Col sm={6}>
                                          <Fm.Check inline label="Yes" type="radio" name="amberB" value={true} onChange={handleInputChange} />
                                          <Fm.Check inline label="No" type="radio" name="amberB" value={false} onChange={handleInputChange} defaultChecked />

                                        </Col>
                                      </Row>
                                    </Fm.Group>
                                  </Col>

                                  <Col className='pb-3'>
                                    <Fm.Group>
                                      <Row>
                                        <Col sm={6}>
                                          <Fm.Label style={{ paddingRight: "1rem" }}>Professional Parties to the Bond issue appointed or selected:</Fm.Label>
                                        </Col>
                                        <Col sm={6}>
                                          <Fm.Check inline label="Yes" type="radio" name="amberC" value={true} onChange={handleInputChange} />
                                          <Fm.Check inline label="No" type="radio" name="amberC" value={false} onChange={handleInputChange} defaultChecked />
                                        </Col>
                                      </Row>
                                    </Fm.Group>
                                  </Col>
                                </Col>
                              </Row>
                            </div>

                            <Col className='pb-3'>
                              <Fm.Group>
                                <Row>
                                  <Col sm={6}>
                                    <Fm.Label style={{ paddingRight: "1rem" }}>Fee Letter and/or Guarantee Documentation expected to be negotiated and/or signed within 8 weeks:</Fm.Label>
                                  </Col>

                                  <Col sm={6}>
                                    <Fm.Check inline label="Yes" type="radio" name="amberD" value={true} onChange={handleInputChange} />
                                    <Fm.Check inline label="No" type="radio" name="amberD" value={false} onChange={handleInputChange} defaultChecked  />
                                  </Col>
                                </Row>
                              </Fm.Group>
                            </Col>

                            <Col className='pb-2'>
                              <Fm.Group>
                                <Row>
                                  <Col sm={6}>
                                    <Fm.Label style={{ paddingRight: "1rem" }}>All Materials CPs with timelines for completion agreed with the client:</Fm.Label>
                                  </Col>
                                  <Col sm={6}>
                                    <Fm.Check inline label="Yes" type="radio" name="amberE" value={true} onChange={handleInputChange} />
                                    <Fm.Check inline label="No" type="radio" name="amberE" value={false} onChange={handleInputChange} defaultChecked />
                                  </Col>
                                </Row>
                              </Fm.Group>
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
                                    <Fm.Group>
                                      <Row>
                                        <Col sm={6}>
                                          <Fm.Label style={{ paddingRight: "1rem" }}>Transaction has obtained Credit Committee approval:</Fm.Label>

                                        </Col >
                                        <Col sm={6}>
                                          <Fm.Check inline label="Yes" type="radio" name="greenA" value={true} onChange={handleInputChange}  />
                                          <Fm.Check inline label="No" type="radio" name="greenA" value={false} onChange={handleInputChange} defaultChecked  />
                                        
                                        </Col>
                                      </Row>
                                    </Fm.Group>
                                  </Col>

                                  <Col className='pb-2'>
                                    <Fm.Group>
                                      <Row>
                                        <Col sm={6}>
                                          <Fm.Label style={{ paddingRight: "1rem" }}>Guarantee Document in agreed form:</Fm.Label>
                                        </Col>
                                        <Col sm={6}>
                                          <Fm.Check inline label="Yes" type="radio" name="greenB" value={true} onChange={handleInputChange} />
                                          <Fm.Check inline label="No" type="radio" name="greenB" value={false} onChange={handleInputChange} defaultChecked  />
                                        </Col>
                                      </Row>
                                    </Fm.Group>
                                  </Col>

                                  <Col className='pb-2'>
                                    <Fm.Group>
                                      <Row>
                                        <Col sm={6}>
                                          <Fm.Label style={{ paddingRight: "1rem" }}>Professional Parties to the Bond Issue appointed or selected:</Fm.Label>
                                        </Col>
                                        <Col sm={6}>
                                          <Fm.Check inline label="Yes" type="radio" name="greenC" value={true} onChange={handleInputChange} />
                                          <Fm.Check inline label="No" type="radio" name="greenC" value={false} onChange={handleInputChange} defaultChecked  />
                                        </Col>
                                      </Row>
                                    </Fm.Group>
                                  </Col>

                                  <Col className='pb-2'>
                                    <Fm.Group>
                                      <Row>
                                        <Col sm={6}>
                                          <Fm.Label style={{ paddingRight: "1rem" }}>Already filed or expected filing with SEC (or equivalent Exchange) within 6 weeks:</Fm.Label>
                                        </Col>

                                        <Col sm={6}>
                                          <Fm.Check inline label="Yes" type="radio" name="greenD" value={true} onChange={handleInputChange} />
                                          <Fm.Check inline label="No" type="radio" name="greenD" value={false} onChange={handleInputChange} defaultChecked />
                                        </Col>
                                      </Row>
                                    </Fm.Group>
                                  </Col>


                                  <Col className='pb-2'>
                                    <Fm.Group>
                                      <Row>
                                        <Col sm={6}>
                                          <Fm.Label style={{ paddingRight: "1rem" }}>All Materials CPs to Financial Close have been satisfactorily met or committed by the Client for completion on or before Financial Close:</Fm.Label>
                                        </Col>

                                        <Col sm={6}>
                                          <Fm.Check inline label="Yes" type="radio" name="greenE" value={true} onChange={handleInputChange} />
                                          <Fm.Check inline label="No" type="radio" name="greenE" value={false} onChange={handleInputChange} defaultChecked />
                                        </Col>
                                      </Row>
                                    </Fm.Group>
                                  </Col>


                                  <Col className='pb-2'>
                                    <Fm.Group>
                                      <Row>
                                        <Col sm={6}>
                                          <Fm.Label style={{ paddingRight: "1rem" }}>Financial Close expected within 3-6 months:</Fm.Label>
                                        </Col>
                                        <Col sm={6}>
                                          <Fm.Check inline label="Yes" type="radio" name="greenF" value={true} onChange={handleInputChange} />
                                          <Fm.Check inline label="No" type="radio" name="greenF" value={false} onChange={handleInputChange} defaultChecked />
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
                        <button onClick={e => toPrevTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}> Prev</button>
                      <button onClick={e => toNextTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>Next</button>
                  </Tab>
                  <Tab eventKey="sixth" title="NBC FOCUS AREAS" style={{ fontSize: '12px' }}>
                    <Container1>
                      <br/>
                    <Row className='py-1'>
                    <Col sm={12}>
                      <Row>
                        <Col>
                        <PWrapper>ORIGINAL NBC DD FOCUS</PWrapper>
                        <br/>
                        </Col>
                        <Col>
                        <PWrapper>YES/NO</PWrapper>
                        </Col>
                        <Col>
                        <PWrapper>DATE</PWrapper>
                        </Col>
                        <Col>
                        <PWrapper>METHODOLOGY</PWrapper>
                        </Col>

                      </Row>
                    </Col>

                                <Col sm={12}>
                                  <Col className='pb-2'>
                                    <Fm.Group>
                                      <Row>
                                        <Col sm={3}>
                                          <Fm.Label style={{ paddingRight: "1rem" }}>Strength of Contracts:</Fm.Label>

                                        </Col >
                                        <Col sm={3}>
                                          <Fm.Check inline label="Yes" type="radio" name="strength" value={true}  />
                                          <Fm.Check inline label="No" type="radio" name="strength" value={false} defaultChecked  />
                                        
                                        </Col>
                                        <Col sm={3}>
                                        <Input size="sm" type="date" value='' onChange=''name=''  style={{width:'80%', padding:'2px 1px', focus:'none'}}/>
                                          </Col>
                                          <Col sm={3}>
                                            <Fm.Control as ='textarea' placeholder=' ' style={{height:'30px'}}>
                                            </Fm.Control>
                                          </Col>

                                      </Row>
                                    </Fm.Group>
                                  </Col>
                                  </Col>

                                  <Col sm={12}>
                                  <Col className='pb-2'>
                                    <Fm.Group>
                                      <Row>
                                        <Col sm={3}>
                                          <Fm.Label style={{ paddingRight: "1rem" }}>Sponsor Equity:</Fm.Label>

                                        </Col >
                                        <Col sm={3}>
                                          <Fm.Check inline label="Yes" type="radio" name="sponsor" value={true}  />
                                          <Fm.Check inline label="No" type="radio" name="sponsor" value={false}  defaultChecked  />
                                        
                                        </Col>
                                        <Col sm={3}>
                                        <Input size="sm" type="date" value='' onChange=''name=''  style={{width:'80%', padding:'2px 1px', focus:'none'}}/>
                                          </Col>
                                          <Col sm={3}>
                                          <Fm.Control as ='textarea' placeholder='' style={{height:'30px'}}>
                                            </Fm.Control>                                          
                                            </Col>

                                      </Row>
                                    </Fm.Group>
                                  </Col>
                                  <Col sm={12}>
                                  <Col className='pb-2'>
                                    <Fm.Group>
                                      <Row>
                                        <Col sm={3}>
                                          <Fm.Label style={{ paddingRight: "1rem" }}>Regulatory Approval:</Fm.Label>

                                        </Col >
                                        <Col sm={3}>
                                          <Fm.Check inline label="Yes" type="radio" name="regulatory" value={true}   />
                                         <Fm.Check inline label="No" type="radio" name="regulatory" value={false} defaultChecked  />
                                        
                                        </Col>
                                        <Col sm={3}>
                                        <Input size="sm" type="date" value='' onChange=''name=''  style={{width:'80%', padding:'2px 1px', focus:'none'}}/>
                                          </Col>
                                          <Col sm={3}>
                                          <Fm.Control as ='textarea' placeholder='' style={{height:'30px'}}>
                                            </Fm.Control>                                          
                                            </Col>

                                      </Row>
                                    </Fm.Group>
                                  </Col>
                                  </Col>
                                  <Col sm={12}>
                                  <Col className='pb-2'>
                                    <Fm.Group>
                                      <Row>
                                        <Col sm={3}>
                                          <Fm.Label style={{ paddingRight: "1rem" }}>Technical Validation:</Fm.Label>

                                        </Col >
                                        <Col sm={3}>
                                          <Fm.Check inline label="Yes" type="radio" name="technical" value={true}   />
                                          <Fm.Check inline label="No" type="radio" name="technical" value={false}  defaultChecked  />
                                        
                                        </Col>
                                        <Col sm={3}>
                                        <Input size="sm" type="date" value='' onChange=''name=''  style={{width:'80%', padding:'2px 1px', focus:'none'}}/>
                                          </Col>
                                          <Col sm={3}>
                                          <Fm.Control as ='textarea' placeholder=' ' style={{height:'30px'}}>
                                            </Fm.Control>                                          
                                            </Col>

                                      </Row>
                                    </Fm.Group>
                                  </Col>
                                  </Col>
                                  <Col sm={12}>
                                  <Col className='pb-2'>
                                    <Fm.Group>
                                      <Row>
                                        <Col sm={3}>
                                          <Fm.Label style={{ paddingRight: "1rem" }}>Competitive Landscape:</Fm.Label>

                                        </Col >
                                        <Col sm={3}>
                                          <Fm.Check inline label="Yes" type="radio" name="competitive" value={true}   />
                                          <Fm.Check inline label="No" type="radio" name="competitive" value={false} defaultChecked  />
                                        
                                        </Col>
                                        <Col sm={3}>
                                        <Input size="sm" type="date" value='' onChange=''name=''  style={{width:'80%', padding:'2px 1px', focus:'none'}}/>
                                          </Col>
                                          <Col sm={3}>
                                          <Fm.Control as ='textarea' placeholder='' style={{height:'30px'}}>
                                            </Fm.Control>                                          
                                            </Col>

                                      </Row>
                                    </Fm.Group>
                                  </Col>
                                  </Col>
                                  <Col sm={12}>
                                    <p style={{fontWeight:'bold'}}>NBC Paper (Link to Doc)</p>
                                  </Col>
                                  <Col sm={12}>
                                    <p style={{fontWeight:'bold'}}>NBC Approvals and Minutes</p>
                                  </Col>


                                  <Col sm={12}>
                                  <Col className='pb-2'>
                                    <Fm.Group>
                                      <Row>
                                        <Col sm={5}>
                                          <Fm.Label style={{ paddingRight: "1rem" }}>MROC Pre_NBC Approval ( Link to Doc)</Fm.Label>

                                        </Col >
                                        <Col sm={3}>
                                          <Fm.Check inline label="Yes" type="radio" name="pre_nbc" value={true}   />
                                          <Fm.Check inline label="No" type="radio" name="pre_nbc" value={false}  defaultChecked  />
                                        
                                        </Col>
                                        <Col sm={3}>
                                        <Input size="sm" type="date" value='' onChange=''name=''  style={{width:'80%', padding:'2px 1px', focus:'none'}}/>
                                          </Col>
                                          </Row>
                                    </Fm.Group>
                                  </Col>
                                  </Col>
                                  <Col sm={12}>
                                  <Col className='pb-2'>
                                    <Fm.Group>
                                      <Row>
                                        <Col sm={5}>
                                          <Fm.Label style={{ paddingRight: "1rem" }}>MROC Pre_NBC Minutes. ( Link to Doc)</Fm.Label>

                                        </Col >
                                        <Col sm={3}>
                                          <Fm.Check inline label="Yes" type="radio" name="minutes" value={true}   />
                                          <Fm.Check inline label="No" type="radio" name="minutes" value={false}  defaultChecked  />
                                        
                                        </Col>
                                        <Col sm={3}>
                                        <Input size="sm" type="date" value='' onChange=''name=''  style={{width:'80%', padding:'2px 1px', focus:'none'}}/>
                                          </Col>
                                          </Row>
                                    </Fm.Group>
                                  </Col>
                                  </Col>
                                  <Col sm={12}>
                                  <Col className='pb-2'>
                                    <Fm.Group>
                                      <Row>
                                        <Col sm={5}>
                                          <Fm.Label style={{ paddingRight: "1rem" }}>NBC Approval ( Link to Doc)</Fm.Label>

                                        </Col >
                                        <Col sm={3}>
                                          <Fm.Check inline label="Yes" type="radio" name="nbc_app" value={true}  />
                                          <Fm.Check inline label="No" type="radio" name="nbc_app" value={false}  defaultChecked  />
                                        
                                        </Col>
                                        <Col sm={3}>
                                        <Input size="sm" type="date" value='' onChange=''name=''  style={{width:'80%', padding:'2px 1px', focus:'none'}}/>
                                          </Col>
                                          </Row>
                                    </Fm.Group>
                                  </Col>
                                  </Col>
                                  <Col sm={12}>
                                  <Col className='pb-2'>
                                    <Fm.Group>
                                      <Row>
                                        <Col sm={5}>
                                          <Fm.Label style={{ paddingRight: "1rem" }}>NBC Minutes ( Link to Doc)</Fm.Label>

                                        </Col >
                                        <Col sm={3}>
                                          <Fm.Check inline label="Yes" type="radio" name="nbc_min" value={true}  />
                                          <Fm.Check inline label="No" type="radio" name="nbc_min" value={false} defaultChecked  />
                                        
                                        </Col>
                                        <Col sm={3}>
                                        <Input size="sm" type="date" value='' onChange=''name=''  style={{width:'80%', padding:'2px 1px', focus:'none'}}/>
                                          </Col>
                                          </Row>
                                    </Fm.Group>
                                  </Col>
                                  <Col sm={12}>
                                  <Col className='pb-2'>
                                    <Fm.Group>
                                      <Row>
                                        <Col sm={5}>
                                          <Fm.Label style={{ paddingRight: "1rem" }}>Mandate Letter with Indicative Term Sheet On-Boarding Documents ( Link to Doc)</Fm.Label>

                                        </Col >
                                        <Col sm={3}>
                                          <Fm.Check inline label="Yes" type="radio" name="mandlet" value={true}  />
                                          <Fm.Check inline label="No" type="radio" name="mandlet" value={false}  defaultChecked  />
                                        
                                        </Col>
                                        <Col sm={3}>
                                          <Input size="sm" type="date" value='' onChange=''name=''  style={{width:'80%', padding:'2px 1px', focus:'none'}}/>
                                          </Col>
                                          </Row>
                                    </Fm.Group>
                                  </Col>
                                  </Col>
                                  </Col>
                                  </Col>
                          </Row>
                          <button onClick={e => toPrevTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}> Prev</button>
                      {/* <button onClick={e => toNextTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>Next</button> */}
                    </Container1>
                  </Tab>

                  
                </Tabs>
                <div className='d-flex justify-content-end' style={{fontSize: "13px", color: "red"}}>
                  <p class="animate__animated animate__pulse pt-2">
                    {response}
                  </p>
                </div>

                <div className='d-flex justify-content-end'>
                <ButtonWrapper onClick={saveDeal}  ref={form} >
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
