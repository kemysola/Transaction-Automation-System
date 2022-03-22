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
  const greenA = useRef("");
  const greenB = useRef("");
  const greenC = useRef("");
  const greenD = useRef("");
  const greenE = useRef("");
  const greenF = useRef("");
  const amberA = useRef("");
  const amberB = useRef("");
  const amberC = useRef("");
  const amberD = useRef("");
  const amberE = useRef("");
  const redA = useRef("");
  const redB = useRef("");
  const redC = useRef("");
  
  let id = window.location.search.split("?")[1]

  const [deal, setDeal] = useState([]);
  const [status, setStatus] = useState(false);
  const [noteList, setNoteList] = useState([{ note: "" }])
  const [activeTab, setActiveTab] = useState('first');
  const [dealActiveTab, setDealActiveTab] = useState('deal');
  const history = useHistory();

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

  const retrieveDeal = async () => {
    // function to get deal by id from the database
    const data = await axios.get(
      `http://localhost:5000/api/v1/transaction/item/${id}`,
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
  } ;

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

  let str2bool = (value) => {
    if (value && typeof value === "string") {
         if (value.toLowerCase() === "true") return true;
         if (value.toLowerCase() === "false") return false;
    }
    return value;
 }

 function handleRadioChange(e) {
  str2bool(e.target.value)
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
      structuringFeeAmount: +amount.current.value,
      structuringFeeAdvance: +advance.current.value,
      structuringFeeFinal: +final.current.value,
      guaranteeFee: +guarantee.current.value,
      monitoringFee: +monitoring.current.value,
      reimbursible: +reimbursible.current.value,
      greenA: JSON.parse(greenA.current.value),
      greenB: JSON.parse(greenB.current.value),
      greenC: JSON.parse(greenC.current.value),
      greenD: JSON.parse(greenD.current.value),
      greenE: JSON.parse(greenE.current.value),
      greenF: JSON.parse(greenF.current.value),
      amberA: JSON.parse(amberA.current.value),
      amberB: JSON.parse(amberB.current.value),
      amberC: JSON.parse(amberC.current.value),
      amberD: JSON.parse(amberD.current.value),
      amberE: JSON.parse(amberE.current.value),
      redA: JSON.parse(redA.current.value),
      redB: JSON.parse(redB.current.value),
      redC: JSON.parse(redC.current.value),
      notes: note
    }
      Service.updateDeal(id, data)
        .then((response) => {
          alert(response.data.message)
          history.push({
            pathname: "/transaction",
          });
        })
        .catch(error => {
          alert("Failed to Update Deal")
        })      
    }

    console.log('red value', redA.current.value)
    console.log('red checked', redA.current.checked)

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
                  <Col sm={12}>
                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                      <Form.Label>Client Name</Form.Label>
                    <Form.Control size="sm" type="text" defaultValue={deal[0].clientname} id='client' ref={clientName} required disabled/>
                    </Form.Group>
                  </Col>

                  <Col sm={12}>
                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                      <Form.Label>Originator</Form.Label>
                    <Form.Control size="sm" type="text" defaultValue={deal[0].originator} id='originator' ref={originator}/>
                    </Form.Group>
                  </Col>

                  <Col sm={12}>
                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                      <Form.Label>Transactor</Form.Label>
                      <Form.Control size="sm" type="text" defaultValue={deal[0].transactor}  id='transactor' ref={transactor}/>
                    </Form.Group>
                  </Col>
                  <Col sm={12}>
                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                      <Form.Label>Transaction Legal Lead</Form.Label>
                      <Form.Control size="sm" type="text" defaultValue={deal[0].transactionlegallead} id='transactionLegalLead' ref={transactionLegalLead}/>
                    </Form.Group>
                  </Col>
                  
                  {/* <div className="d-flex"> */}
                  
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
		<Tab eventKey="second" title="DEAL PROFILE FEES & REIMBURSEMENT">
            <br/>
            <Container1>
                <br/>
                <div className='mt-2'>
                  <PWrapper>
                    <h6 className="pt-1 mt-1" style={{fontSize: "13px"}}>Deal Profile Fees & Reimbursement</h6>
                  </PWrapper>
                    
                  <Row>
                    <Col sm={4} className='my-0 py-0'>
                      <Form.Group className="">
                        <Form.Label>Industry</Form.Label>
                        <Form.Select size="sm" id='industry' ref={industry}>
                          <option value={deal[0].industry}>{deal[0].industry}</option>
                          <option value="On-grid Power">On-grid Power</option>
                          <option value="Off-grid Power">Off-grid Power</option>
                          <option value="Agric Infra.">Agric Infra.</option>
                          <option value="Gas">Gas</option>
                          <option value="Transportation">Transportation</option>
                          <option value="Inputs to Infra.">Inputs to Infra.</option>
                          <option value="Affordable Housing">Affordable Housing</option>
                          <option value="Education Infra.">Education Infra.</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Water/Waste">Water/Waste</option>
                          <option value="ICT/Telecoms">ICT/Telecoms</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col sm={4}>
                      <Form.Group className="">
                        <Form.Label>Products</Form.Label>
                        <Form.Select size="sm" id='products' ref={product}>
                          <option value={deal[0].product}>{deal[0].product}</option>
                          <option value="Public Bond">Public Bond</option>
                          <option value="Private Bond (Clean Energy)">Private Bond (Clean Energy)</option>
                          <option value="Contingent Refi. Gte.">Contingent Refi. Gte.</option>
                          <option value="Annuity PPP">Annuity PPP</option>
                          <option value="Blended Finance">Blended Finance</option>
                          <option value="Private Bond (Other)">Private Bond (Other)</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col sm={4}>
                      <Form.Group className="">
                        <Form.Label>Region</Form.Label>
                        <Form.Select size="sm" id='region' ref={region}>
                          <option value={deal[0].region}>{deal[0].region}</option>
                          <option value="SW">SW</option>
                          <option value="SE">SE</option>
                          <option value="SS">SS</option>
                          <option value="NW">NW</option>
                          <option value="NE">NE</option>
                          <option value="NC">NC</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className='mt-1'>
                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Deal Size (NGN)</Form.Label>
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
                      <Form.Control size="sm" type="text" defaultValue={deal[0].tenor} id='tenor' ref={tenor}/>
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
                    <Col sm={4}>
                      <Form.Group className="">
                        <Form.Label>Repayment Frequency</Form.Label>
                        <Form.Select size="sm" id='frequency' ref={repaymentFreq}>
                          <option value={deal[0].repaymentfrequency}>{deal[0].repaymentfrequency}</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Quarterly">Quarterly</option>
                          <option value="Semi-Annually">Semi-Annually</option>
                          <option value="Annually">Annually</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col sm={4}>
                      <Form.Group className="">
                        <Form.Label>Amortisation Style</Form.Label>
                        <Form.Select size="sm" id='amortizationStyle' ref={amortizationStyle}>
                          <option value={deal[0].amortizationstyle}>{deal[0].amortizationstyle}</option>
                          <option value="Annuity">Annuity</option>
                          <option value="Straight-Line">Straight-Line</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col sm={4}>
                      <Form.Group className="pt-1">
                        <Form.Label>Mandate Letter</Form.Label>
                      <Form.Control size="sm" type="date" defaultValue={new Date(deal[0].mandateletter).toISOString().split('T')[0] || null} id='mandateLetter' ref={mandateLetter} required/>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className='mt-1 pt-3' >
                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Credit Approval</Form.Label>
                        {/* defaultValue={new Date(deal[0].creditApproval).toISOString().split('T')[0] || null} */}
                      <Form.Control size="sm" type="date" id='creditApproval' ref={creditApproval}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Fee Letter</Form.Label>
                        {/* defaultValue={new Date(deal[0].feeLetter).toISOString().split('T')[0] || null}  */}
                      <Form.Control size="sm" type="date" id='feeLetter' ref={feeLetter}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Excepted Close</Form.Label>
                        {/* defaultValue={new Date(deal[0].expectedClose).toISOString().split('T')[0] || null} */}
                      <Form.Control size="sm" type="date"  id='expectedClose' ref={exceptedClose}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Actual Close</Form.Label>
                        {/* defaultValue={new Date(deal[0].actualClose).toISOString().split('T')[0] || null} */}
                      <Form.Control size="sm" type="date"  id='actualClose' ref={actualClose}/>
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

		<Tab eventKey="third" title="STRUCTURING FEES">
        <div className='mt-2'>

                
                  <Container1>

                    <br/>
                  <Row>
                    <Col sm={6} className='my-0 py-0'>
                      <Form.Group>
                        <Form.Label>Amount(NGN)</Form.Label>
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
                        <Form.Label>Monitoring(NGN)</Form.Label>
                      <Form.Control size="sm" type="text" defaultValue={deal[0].monitoringfee} id='monitoring' ref={monitoring}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6} className='my-0 pb-2'>
                      <Form.Group className="pt-1">
                        <Form.Label>Reimbursible(NGN)</Form.Label>
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
            <br/>
          
        <Tabs defaultActiveKey="first1" className='text-secondary'>
        <Tab eventKey="first1" title="RED TRANSACTION CATEGORY" >
            <br/>
        <Container1>
        <div id='redCategory' className='pt-2 mt-1 mb-3 pb-3'>
            <br/>
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
                            <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].reda === true} name="redA" ref={redA}/>
                            <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].reda === false} name="redA" ref={redA}/>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Col>

                    <Col sm={12}>
                      <Form.Group>
                        <Row>
                          <Col>
                            <Form.Label style={{paddingRight: "1rem"}}>Due dilligence ongoing:</Form.Label>
                          </Col>
                          <Col>
                            <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].redb === true} name="redB" ref={redB}/>
                            <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].redb === false} name="redB" ref={redB}/>
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
                            <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].redc === true} name="redC" ref={redC}/>
                            <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].redc === false} name="redC" ref={redC}/>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Col>

                  </div>
                  </Container1>
        </Tab>

{/*------------------------------------- ------------------------- ------------------------- */}
        <Tab  eventKey="second1" title="AMBER TRANSACTION CATEGORY">
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
                            <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].ambera === true} name="amberA" ref={amberA}/>
                            <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].ambera === false} name="amberA" ref={amberA}/>
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
                            <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].amberb === true} name="amberB" ref={amberB}/>
                            <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].amberb === false} name="amberB" ref={amberB}/>
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
                            <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].amberc === true} name="amberC" ref={amberC}/>
                            <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].amberc === false} name="amberC" ref={amberC}/>
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
                            <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].amberd === true} name="amberD" ref={amberD}/>
                            <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].amberd === false} name="amberD" ref={amberD}/>
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
                            <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].ambere === true} name="amberE" ref={amberE}/>
                            <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].ambere === false} name="amberE" ref={amberE}/>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Col>
                  </div>
                  </Container1>
        </Tab>
{/*-------------------------------------- --------------------------------------------------- */}
        <Tab eventKey="green" title="GREEN TRANSACTION CATEGORY">
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
                  <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].greena === true} name="greenA" ref={greenA}/>
                  <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].greena === false} name="greenA" ref={greenA}/> 
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
                  <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].greenb === true} name="greenB" ref={greenB}/>
                  <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].greenb === false} name="greenB" ref={greenB} />         
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
                      <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].greenc === true} name="greenC" ref={greenC}/>
                        <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].greenc === false} name="greenC" ref={greenC}/>  
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
                      <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].greend === true} name="greenD" ref={greenD}/>
                        <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].greend === false} name="greenD" ref={greenD}/>
                      
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
                      <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].greene === true} name="greenE" ref={greenE}/>
                        <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].greene === false} name="greenE" ref={greenE}/>  
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
                      <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].greenf === true} name="greenF" ref={greenF}/>
                      <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].greenf === false} name="greenF" ref={greenF}/>
                </Col>
                </Row>      
              </Form.Group>
                    
              </Col>
  {/*-------------------------------------------------------------------------------------------- */}   
            </Row>
            </Form.Group>
          </div>
        </Container1>
        </Tab>
        </Tabs>
        <button onClick={e => toPrevTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}> Prev</button>
        </Tab>   
	    </Tabs>
	    </div>

      
    <div style={{ display: 'inlineblock'}}>
      <ButtonWrapper type="submit" className='d-flex justify-content-end'  onClick={handleBack}>
          Back
      </ButtonWrapper>

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
