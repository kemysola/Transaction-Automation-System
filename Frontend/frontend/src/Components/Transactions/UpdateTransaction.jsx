import React, { useRef, useState, useEffect } from 'react';
import { Form, Container, Row, Col, Alert } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import styled from 'styled-components';
import Service from "../../Services/Service"
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const ButtonWrapper = styled.button`
  color:white;
  background: green;
  margin-right:14px;
  border:1px solid  white;
  padding:6px 35px;
  margin-top: 8px;
  margin-bottom: 8px;
  font-weight:bold;
  font-size:10px;
  border-radius:10px;
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

export default function UpdateTransactions() {
  const clientName = useRef("");
  const originator = useRef("");
  const transactor = useRef("");
  const transactionLegalLead = useRef("");
  const industry = useRef("");
  const product = useRef("");
  const region = useRef("")
  const dealSize = useRef("");
  const coupon = useRef("");
  const tenor = useRef("");
  const moratorium = useRef("");
  const repaymentFreq = useRef("");
  const amortizationStyle = useRef("");
  const mandateLetter = useRef("");
  const creditApproval = useRef("");
  const feeLetter = useRef("");
  const exceptedClose = useRef("");
  const actualClose = useRef("");
  const amount = useRef("");
  const advance = useRef("");
  const final = useRef("");
  const guarantee = useRef("");
  const monitoring = useRef("");
  const reimbursible = useRef("");
  const nbcApprovalDate = useRef("");
  const nbcSubmittedDate = useRef("");

  let id = window.location.search.split("?")[1]

  const history = useHistory();
  const [deal, setDeal] = useState([]);
  const [message, setMessage] = useState()
  const [status, setStatus] = useState(false);
  const [noteList, setNoteList] = useState([{ note: "" }])
  const [activeTab, setActiveTab] = useState('first');
  const [dealActiveTab, setDealActiveTab] = useState('deal');
  const [industries, setIndustries] = useState([]);
  const [products, setProducts] = useState([]);
  const [regions, setRegions] = useState([]);
  const [frequency, setFrequency] = useState([]);
  const [style, setStyle] = useState([]);
  const [greenA, setGreenA] = useState("");
  const [greenB, setGreenB] = useState("");
  const [greenC, setGreenC] = useState("");
  const [greenD, setGreenD] = useState("");
  const [greenE, setGreenE] = useState("");
  const [greenF, setGreenF] = useState("");
  const [amberA, setAmberA] = useState("");
  const [amberB, setAmberB] = useState("");
  const [amberC, setAmberC] = useState("");
  const [amberD, setAmberD] = useState("");
  const [amberE, setAmberE] = useState("");
  const [redA, setRedA] = useState("");
  const [redB, setRedB] = useState("");
  const [redC, setRedC] = useState("");
  const [staffList, setStaffList] = useState([]);
  

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

  useEffect(() => {
    retrieveDeal();
  }, []);

  useEffect(() => {
    retrieveStaffList();
  }, [])

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

  const retrieveDeal = async () => {
    // function to get deal by id from the database
    const data = await axios.get(
     `https://trms01-server.azurewebsites.net/api/v1/transaction/item/${id}`,
     //`http://localhost:5001/api/v1/transaction/item/${id}`,
      {headers: {
        token: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json; charset=utf-8',
      }}
    ).catch((e) => {
      console.log(e);
    });

    // set the deal and status state
    setNoteList(data.data.dealInfo[0].notes)
    setDeal(data.data.dealInfo);
    setStatus(true)
    setGreenA(data.data.dealInfo[0].greena)
    setGreenB(data.data.dealInfo[0].greenb)
    setGreenC(data.data.dealInfo[0].greenc)
    setGreenD(data.data.dealInfo[0].greend)
    setGreenE(data.data.dealInfo[0].greene)
    setGreenF(data.data.dealInfo[0].greenf)
    setAmberA(data.data.dealInfo[0].ambera)
    setAmberB(data.data.dealInfo[0].amberb)
    setAmberC(data.data.dealInfo[0].amberc)
    setAmberD(data.data.dealInfo[0].amberd)
    setAmberE(data.data.dealInfo[0].ambere)
    setRedA(data.data.dealInfo[0].reda)
    setRedB(data.data.dealInfo[0].redb)
    setRedC(data.data.dealInfo[0].redc)
  } ;

  const retrieveStaffList = () => {
    Service.getStaffList()
    .then((response) => {
      setStaffList(response.data.staffList);
    })
    .catch((e) => {
      console.log(e);
    });
  };

  const retrieveIndustry = () => {
    Service.getIndustry()
    .then((response) => {
        setIndustries(response.data.industry);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveProduct = () => {
    Service.getProduct()
    .then((response) => {
        setProducts(response.data.product);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveRegion = () => {
    Service.getRegion()
    .then((response) => {
        setRegions(response.data.region);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveRepaymentFreq = () => {
    Service.getRepaymentFreq()
    .then((response) => {
        setFrequency(response.data.frequency);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveAmortizationStyle = () => {
    Service.getAmortizationSty()
    .then((response) => {
        setStyle(response.data.amortization);
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

  function handleBack() {
    history.push({
      pathname: "/transaction",
    });
  }

  function postData(e) {
    e.preventDefault()
    let allNotes = noteList.map(({ note }) => note)
    let note = allNotes.join("|")

    const data = {
      clientName: clientName.current.value,
      originator: originator.current.value,
      transactor: transactor.current.value,
      transactionLegalLead: transactionLegalLead.current.value,
      industry: industry.current.value, 
      product: product.current.value,
      region: region.current.value,
      dealSize: +dealSize.current.value,
      coupon: +coupon.current.value,
      tenor: +tenor.current.value,
      moratorium: +moratorium.current.value,
      repaymentFrequency: repaymentFreq.current.value,
      amortizationStyle: amortizationStyle.current.value,
      mandateLetter: new Date(mandateLetter.current.value),
      creditApproval: new Date(creditApproval.current.value),
      feeLetter: new Date(feeLetter.current.value),
      expectedClose: new Date(exceptedClose.current.value),
      actualClose: new Date(actualClose.current.value),
      NBC_approval_date: new Date(nbcApprovalDate.current.value),
      NBC_submitted_date: new Date(nbcSubmittedDate.current.value),
      structuringFeeAmount: +amount.current.value,
      structuringFeeAdvance: +advance.current.value,
      structuringFeeFinal: +final.current.value,
      guaranteeFee: +guarantee.current.value,
      monitoringFee: +monitoring.current.value,
      reimbursible: +reimbursible.current.value,
      greenA: JSON.parse(greenA),
      greenB: JSON.parse(greenB),
      greenC: JSON.parse(greenC),
      greenD: JSON.parse(greenD),
      greenE: JSON.parse(greenE),
      greenF: JSON.parse(greenF),
      amberA: JSON.parse(amberA),
      amberB: JSON.parse(amberB),
      amberC: JSON.parse(amberC),
      amberD: JSON.parse(amberD),
      amberE: JSON.parse(amberE),
      redA: JSON.parse(redA),
      redB: JSON.parse(redB),
      redC: JSON.parse(redC),
      notes: note
    }
      Service.updateDeal(id, data)
        .then((response) => {
          //alert(response.data.message)
          history.push({
            pathname: "/transaction",
          });
        })
        .catch(error => {
          setMessage('Failed to update deal')
        })      
    }

  return (
    <React.Fragment>
      {/* ---------------------- Update Transaction Forms ----------- */}
        <FormWrapper>
          <Container fluid style={{marginTop:'0'}}>
            {status ? (
            <Form> 
              <PWrapper>
                <h5>Update Transaction</h5>
              </PWrapper>

              <div> 

       
      <Tabs activeKey={activeTab} onSelect={(k) => handleTabChange} style={{fontSize:'12px'}}>

{/* ----------------------------------------- Client Data ------------------------------------ */}
		<Tab eventKey="first" title="TRANSACTION">
        <br/>
        <Container1>
            <Container>
                <Row className='mt-3 pt-3'>
                  <Col sm={6}>
                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                      <Form.Label>Client Name</Form.Label>
                    <Form.Control size="sm" type="text" defaultValue={deal[0].clientname} id='client' ref={clientName} required disabled/>
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                      <Form.Label>Originator</Form.Label>
                      <Form.Select size="sm" id='originator' ref={originator}>
                        {staffList.map((opt, i) => (
                          <option key={staffList[i].email} value={staffList[i].stafflist} selected={staffList[i].stafflist === deal[0].originator}>
                            {staffList[i].stafflist}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                      <Form.Label>Transactor</Form.Label>
                      <Form.Select size="sm" id='transactor' ref={transactor}>
                        {staffList.map((opt, i) => (
                          <option key={staffList[i].email} value={staffList[i].stafflist} selected={staffList[i].stafflist === deal[0].transactor}>
                            {staffList[i].stafflist}
                          </option>
                        ))}
                      </Form.Select>                      
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                      <Form.Label>Transaction Legal Lead</Form.Label>
                      <Form.Select size="sm" id='transactionLegalLead' ref={transactionLegalLead}>
                        {staffList.map((opt, i) => (
                          <option key={staffList[i].email} value={staffList[i].stafflist} selected={staffList[i].stafflist === deal[0].transactionlegallead}>
                            {staffList[i].stafflist}
                          </option>
                        ))}
                      </Form.Select>  
                    </Form.Group>
                  </Col>
                                    
                  <Col sm={12}>
                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                      <Form.Label>Note</Form.Label> <button type = "button" style={{fontSize: '10px', padding: '2px 10px', margin: '8px', background: 'steelblue', color: 'white', borderRadius: '3px'}} onClick={handleNoteAdd}>+</button> 
                          {noteList.map((singleNote, index) => (
                                <div class="input-group">
                                <Form.Control style={{ margin: '0.8em', width: '60%' }} size="sm" type="text" defaultValue={singleNote} value={singleNote.note} name='note'  onChange={(e) => handleNoteChange(e, index)}
                                required /> 
                                <button type = "button" style={{fontSize: '10px', padding: '2px 10px', margin: '8px', background: 'steelblue', color: 'white', borderRadius: '3px'}} onClick={handleNoteRemove}>x</button> 
                              </div>
                          ))} 
                    </Form.Group>  

                                   
                  </Col>

                </Row>
                <br />
                <button onClick={e => toNextTab(e)} style={{ display: 'inlineBlock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>Next </button>
                </Container>
                </Container1> 
		</Tab>
        
{/*------------------------------------------ End Tab -------------------------------------- */}

{/*--------------------------------------- Deal Profile Fees and Reimbursement -------------- */}
		<Tab eventKey="second" title="DEAL PROFILE ">
            <br/>
            <Container1>
                <br/>
                <div className='mt-2'>
                  
                    
                  <Row>
                    <Col sm={6} className='my-0 py-0'>
                      <Form.Group className="">
                        <Form.Label>Industry</Form.Label>
                        <Form.Select size="sm" id='industry' ref={industry}>
                          {industries.map((opt, i) => (
                            <option key={industries[i].industryid} value={industries[i].industry} selected={industries[i].industry === deal[0].industry}>
                              {industries[i].industry}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="">
                        <Form.Label>Products</Form.Label>
                        <Form.Select size="sm" id='products' ref={product}>
                          {products.map((opt, i) => (
                            <option key={products[i].productid} value={products[i].product} selected={products[i].product === deal[0].product}>
                              {products[i].product}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="">
                        <Form.Label>Region</Form.Label>
                        <Form.Select size="sm" id='region' ref={region}>
                          {regions.map((opt, i) => (
                            <option key={regions[i].regionid} value={regions[i].region} selected={regions[i].region === deal[0].region}>
                              {regions[i].region}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className='mt-1'>
                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Deal Size (₦'BN)</Form.Label>
                      <Form.Control size="sm" type="text" defaultValue={deal[0].dealsize} id='dealSize' ref={dealSize} required/>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Coupon(%)</Form.Label>
                        <Form.Control size="sm" type="text" defaultValue={deal[0].coupon}  id='coupon' ref={coupon}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Tenor(yrs)</Form.Label>
                      <Form.Control size="sm" type="numeric" defaultValue={deal[0].tenor} id='tenor' ref={tenor}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Moratorium(yrs)</Form.Label>
                        <Form.Control size="sm" type="text" defaultValue={deal[0].moratorium}  id='moratorium' ref={moratorium}/>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className='mt-1' >
                    <Col sm={6}>
                      <Form.Group className="">
                        <Form.Label>Repayment Frequency</Form.Label>
                        <Form.Select size="sm" id='frequency' ref={repaymentFreq}>
                          {frequency.map((opt, i) => (
                              <option key={frequency[i].id} value={frequency[i].frequency} selected={frequency[i].frequency === deal[0].repaymentfrequency}>
                                {frequency[i].frequency}
                              </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="">
                        <Form.Label>Amortisation Style</Form.Label>
                        <Form.Select size="sm" id='amortizationStyle' ref={amortizationStyle}>
                         {style.map((opt, i) => (
                            <option key={style[i].id} value={style[i].amortizationstyle} selected={style[i].amortizationstyle === deal[0].amortizationstyle}>
                              {style[i].amortizationstyle}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className='mt-1 pt-3' >
                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Mandate Letter</Form.Label>
                      <Form.Control size="sm" type="date" defaultValue={deal[0].mandateletter ? new Date(deal[0].mandateletter).toISOString().split('T')[0] : null} id='mandateLetter' ref={mandateLetter} required/>
                      </Form.Group>
                    </Col>
                  
                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Credit Approval</Form.Label>
                        <Form.Control size="sm" type="date" defaultValue={deal[0].creditapproval ? new Date(deal[0].creditapproval).toISOString().split('T')[0] : null} id='creditApproval' ref={creditApproval}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Fee Letter</Form.Label>
                        <Form.Control size="sm" type="date" defaultValue={deal[0].feeletter ? new Date(deal[0].feeletter).toISOString().split('T')[0] : null} id='feeLetter' ref={feeLetter}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Expected Close</Form.Label>
                        <Form.Control size="sm" type="date" defaultValue={deal[0].expectedclose ? new Date(deal[0].expectedclose).toISOString().split('T')[0] : null} id='expectedClose' ref={exceptedClose}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Actual Close</Form.Label>
                        <Form.Control size="sm" type="date" defaultValue={deal[0].actualclose ? new Date(deal[0].actualclose).toISOString().split('T')[0] : null} id='actualClose' ref={actualClose}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>NBC Approval</Form.Label>
                        <Form.Control size="sm" type="date" defaultValue={deal[0].nbc_approval_date ? new Date(deal[0].nbc_approval_date).toISOString().split('T')[0] : null} id='nbcApprovalDate' ref={nbcApprovalDate}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>NBC Submission</Form.Label>
                        <Form.Control size="sm" type="date" defaultValue={deal[0].nbc_submitted_date ? new Date(deal[0].nbc_submitted_date).toISOString().split('T')[0] : null} id='nbcSubmittedDate' ref={nbcSubmittedDate}/>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <br/>
                <button onClick={e => toPrevTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}> Prev</button>
                <button onClick={e => toNextTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>Next</button>
                </Container1>
	
		</Tab>
{/*---------------------------------------------- End Tab ----------------------------------- */}

{/*------------------------------------------------ Structuring Fees ------------------------- */}

		<Tab eventKey="third" title="FEES">
        <div className='mt-2'>

                
                  <Container1>

                    <br/>
                  <Row>
                    <Col sm={6} className='my-0 py-0'>
                      <Form.Group>
                        <Form.Label>Amount(₦'BN)</Form.Label>
                      <Form.Control size="sm" type="text" defaultValue={deal[0].structuringfeeamount} id='amount' ref={amount}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6} className='my-0 py-0'>
                      <Form.Group>
                        <Form.Label>Advance(%)</Form.Label>
                      <Form.Control size="sm" type="text" defaultValue={deal[0].structuringfeeadvance} id='advance' ref={advance}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6} className='my-0 py-0'>
                      <Form.Group>
                        <Form.Label>Final(%)</Form.Label>
                      <Form.Control size="sm" type="text" defaultValue={deal[0].structuringfeefinal} id='final' disabled ref={final}/>
                      </Form.Group>
                    </Col>
                 
                    <Col sm={6} className='my-0 py-0'>
                      <Form.Group className="pt-1">
                        <Form.Label>Guarantee (%)</Form.Label>
                      <Form.Control size="sm" type="text" defaultValue={deal[0].guaranteefee} id='guarantee' ref={guarantee}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6} className='my-0 py-0'>
                      <Form.Group className="pt-1">
                        <Form.Label>Monitoring(₦'BN)</Form.Label>
                      <Form.Control size="sm" type="text" defaultValue={deal[0].monitoringfee} id='monitoring' ref={monitoring}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6} className='my-0 pb-2'>
                      <Form.Group className="pt-1">
                        <Form.Label>Reimbursible(₦'BN)</Form.Label>
                      <Form.Control size="sm" type="text" defaultValue={deal[0].reimbursible} id='reimbursible' ref={reimbursible}/>
                      </Form.Group>
                    </Col>
                  </Row>
                  <br/>
                  <button onClick={e => toPrevTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}> Prev</button>
                  <button onClick={e => toNextTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>Next</button>
                  </Container1>
                </div>
		</Tab>

{/*--------------------------------------------- End Tab --------------------------------- */}
           
{/*----------------------------------------------     ----------------------- --------------- */}

        <Tab eventKey="fourth" title="DEAL CATEGORY"  style={{fontSize:'12px'}}>
            {/* <br/>
          
        <Tabs defaultActiveKey="first1" className='text-secondary'>
        <Tab eventKey="first1" title="RED TRANSACTION CATEGORY" >
            <br/> */}
        <Container1>
        <div id='redCategory' className='pt-2 mt-1 mb-3 pb-3'>
            {/* <br/> */}
                    <PWrapper>
                      <h6 className="pt-1" style={{fontSize: "10px", color: "red"}}>Red Category</h6>
                    </PWrapper>

                    <Col sm={12}>
                      <Form.Group>
                        <Row>
                          <Col>
                            <Form.Label style={{paddingRight: "1rem"}}>Mandate Letter signed:</Form.Label>
                          </Col>
                          <Col>
                            <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].reda === true} name="redA" onChange={e => setRedA(e.target.value)}/>
                            <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].reda === false} name="redA" onChange={e => setRedA(e.target.value)}/>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Col>

                    <Col sm={12}>
                      <Form.Group>
                        <Row>
                          <Col>
                            <Form.Label style={{paddingRight: "1rem"}}>Due diligence ongoing:</Form.Label>
                          </Col>
                          <Col>
                              <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].redb === true} name="redB" onChange={e => setRedB(e.target.value)}/>
                              <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].redb === false} name="redB" onChange={e => setRedB(e.target.value)}/>
                            </Col>
                        </Row>
                      </Form.Group>
                    </Col>

                    <Col sm={12}>
                      <Form.Group>
                        <Row>
                          <Col>
                            <Form.Label style={{paddingRight: "1rem"}}>Pending Credit Committee approval:</Form.Label>
                          </Col>
                          <Col>
                            <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].redc === true} name="redC" onChange={e => setRedC(e.target.value)}/>
                            <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].redc === false} name="redC" onChange={e => setRedC(e.target.value)}/>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Col>

                  </div>
                  </Container1>
        {/* </Tab> */}

{/*------------------------------------- ------------------------- ------------------------- */}
        {/* <Tab  eventKey="second1" title="AMBER TRANSACTION CATEGORY"> */}
        <Container1>
        <div id='amberCategory' className='pt-2 mt-1 mb-3 pb-3'>
                    <PWrapper>
                      <h6 className="pt-1" style={{fontSize: "10px", color: "#FFC200"}}>Amber Category</h6>
                    </PWrapper>

                    <Col sm={12}>
                      <Form.Group>
                        <Row>
                          <Col>
                            <Form.Label style={{paddingRight: "1rem"}}>Mandate Letter signed:</Form.Label>
                          </Col>
                          <Col>
                            <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].ambera === true} name="amberA" onChange={e => setAmberA(e.target.value)}/>
                            <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].ambera === false} name="amberA" onChange={e => setAmberA(e.target.value)}/>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Col>

                    <Col sm={12}>
                      <Form.Group>
                        <Row>
                          <Col>
                            <Form.Label style={{paddingRight: "1rem"}}>Transaction has obtained Credit Committe approval:</Form.Label>
                          </Col>
                          <Col>
                            <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].amberb === true} name="amberB" onChange={e => setAmberB(e.target.value)}/>
                            <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].amberb === false} name="amberB" onChange={e => setAmberB(e.target.value)}/>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Col>

                    <Col sm={12}>
                      <Form.Group>
                        <Row>
                          <Col>
                            <Form.Label style={{paddingRight: "1rem"}}>Professional Parties to the Bond issue appointed or selected:</Form.Label>
                          </Col>
                          <Col>
                            <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].amberc === true} name="amberC" onChange={e => setAmberC(e.target.value)}/>
                            <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].amberc === false} name="amberC" onChange={e => setAmberC(e.target.value)}/>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Col>

                    <Col sm={12}>
                      <Form.Group>
                        <Row>
                          <Col>
                            <Form.Label style={{paddingRight: "1rem"}}>Fee Letter and/or Guarantee Documentation expected to be negotiated and/or signed within 8 weeks:</Form.Label>
                          </Col>
                          <Col>
                            <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].amberd === true} name="amberD" onChange={e => setAmberD(e.target.value)}/>
                            <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].amberd === false} name="amberD" onChange={e => setAmberD(e.target.value)}/>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Col>

                    <Col sm={12}>
                      <Form.Group>
                        <Row>
                          <Col>
                            <Form.Label style={{paddingRight: "1rem"}}>All Materials CPs with timelines for completion agreed with the client:</Form.Label>
                          </Col>
                          <Col>
                            <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].ambere === true} name="amberE" onChange={e => setAmberE(e.target.value)}/>
                            <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].ambere === false} name="amberE" onChange={e => setAmberE(e.target.value)}/>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Col>
                  </div>
                  </Container1>
        {/* </Tab> */}
{/*-------------------------------------- --------------------------------------------------- */}
        {/* <Tab eventKey="green" title="GREEN TRANSACTION CATEGORY"> */}
        <Container1>
          <div id='greenCategory' className='pt-2 mt-1 mb-2 pb-2'>
            <PWrapper>
              <h6 className="pt-1" style={{fontSize: "10px", color: "green"}}>Green Category</h6>
            </PWrapper>

            <Form.Group>
            <Row>
              <Col sm={12}>
              <Form.Group>
              <Row>
                <Col>
                  <Form.Label style={{paddingRight: "1rem"}}>Transaction has obtained Credit Committee approval:</Form.Label>
                </Col>  
                <Col>    
                  <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].greena === true} name="greenA" onChange={e => setGreenA(e.target.value)}/>
                  <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].greena === false} name="greenA" onChange={e => setGreenA(e.target.value)}/> 
                </Col>
                </Row>  
                </Form.Group>  
              </Col>

  {/*--------------------------------------------- -------------------------- --------------- */}
              <Col sm={12}>
              <Form.Group>
              <Row>
                <Col>
                <Form.Label style={{paddingRight: "1rem"}}>Guarantee Document in agreed form:</Form.Label>
                </Col>  
                <Col>    
                  <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].greenb === true} name="greenB" onChange={e => setGreenB(e.target.value)}/>
                  <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].greenb === false} name="greenB" onChange={e => setGreenB(e.target.value)} />         
                </Col>
                </Row>  
                      </Form.Group>
                    
              </Col>


  {/**---------------------------------------------------------------------------------------- */}
              <Col sm={12}>
              <Form.Group>
              <Row>
                <Col>
                <Form.Label style={{paddingRight: "1rem"}}>Professional Parties to the Bond Issue appointed or selected:</Form.Label>
                </Col>  
                <Col>    
                      <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].greenc === true} name="greenC" onChange={e => setGreenC(e.target.value)}/>
                        <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].greenc === false} name="greenC" onChange={e => setGreenC(e.target.value)}/>  
                </Col>
                </Row> 
                      </Form.Group>
                    
              </Col>

  {/*--------------------------------------------------------------------------------------- */}
              <Col sm={12}>
              <Form.Group>
              <Row>
                <Col>
                <Form.Label style={{paddingRight: "1rem"}}>Already filed or expected filing with SEC (or equivalent Exchange) within 6 weeks:</Form.Label>
                </Col>  
                <Col>    
                      <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].greend === true} name="greenD" onChange={e => setGreenD(e.target.value)}/>
                        <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].greend === false} name="greenD" onChange={e => setGreenD(e.target.value)}/>
                      
                </Col>
                </Row>    
                      </Form.Group>
                    
              </Col>
  {/*---------------------------------------------------------------------------------------- */}
              <Col sm={12}>
              <Form.Group>
              <Row>
                <Col>
                <Form.Label style={{paddingRight: "1rem"}}>All Materials CPs to Financial Close have been satisfactorily met or committed by the Client for completion on or before Financial Close:</Form.Label>
                </Col>  
                <Col>    
                      <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].greene === true} name="greenE" onChange={e => setGreenE(e.target.value)}/>
                        <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].greene === false} name="greenE" onChange={e => setGreenE(e.target.value)}/>  
                </Col>
                </Row>
                      </Form.Group>

                    
              </Col>
  {/*-------------------------------------------------------------------------------------- */}
              <Col sm={12}>
              <Form.Group>
              <Row>
                <Col>
            <Form.Label style={{paddingRight: "1rem"}}>Financial Close expected within 3-6 months:</Form.Label>            
                </Col>  
                <Col>    
                      <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].greenf === true} name="greenF" onChange={e => setGreenF(e.target.value)}/>
                      <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].greenf === false} name="greenF" onChange={e => setGreenF(e.target.value)}/>
                </Col>
                </Row>      
              </Form.Group>
                    
              </Col>
  {/*-------------------------------------------------------------------------------------------- */}   
            </Row>
            </Form.Group>
          </div>
        </Container1>
        {/* </Tab> */}
        {/* </Tabs> */}
        <button onClick={e => toPrevTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}> Prev</button>
        </Tab>   
	    </Tabs> 
	    </div>

      
    <div className='d-flex justify-content-end'>
      <ButtonWrapper style={{ backgroundColor: "grey", color:'white'}}  onClick={handleBack}>
          Back
      </ButtonWrapper>

      <p class='text-danger'>{message}</p>

      <ButtonWrapper type="submit" className='d-flex justify-content-end' onClick={postData}>
          Update
      </ButtonWrapper>

      </div>
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
