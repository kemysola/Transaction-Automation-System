import React, { useState } from 'react';
import { Form,Container,Row,Col, Stack } from 'react-bootstrap';
import styled from 'styled-components';
import Services from '../../Services/Service';
import StaffDatabase from '../Staffs/StaffDatabase';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const ButtonWrapper = styled.button`
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
background:white;
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
        greenA: false, 
        greenB: false,
        greenC: false,
        greenD: false,
        greenE: false,
        greenF: false,
        amberA: false, 
        amberB: false, 
        amberC: false, 
        amberD: false, 
        amberE: false, 
        redA: true, 
        redB: true, 
        redC: true, 
        redD: false, 
        redE: false, 
        structuringFeeAmount: 0,
        structuringFeeAdvance: 0,
        guaranteeFee: 0,
        monitoringFee: 0,
        reimbursible: 0,
        notes: "",
        closed: false
    };

    const [deal, setDeal] = useState(initialDealState);
    const [submitted, setSubmitted] = useState(false);
    const [response, setResponse] = useState(false);

    const handleInputChange = event => { // function to save user data to deal state
        const { name, value } = event.target;
        setDeal({ ...deal, [name]: value });
    }

    const saveDeal = (e) => { // function to save users data and post to db
      e.preventDefault()

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
        "greenA": deal.greenA, 
        "greenB": deal.greenB,
        "greenC": deal.greenC,
        "greenD": deal.greenD,
        "greenE": deal.greenE,
        "greenF": deal.greenF,
        "amberA": deal.amberA, 
        "amberB": deal.amberB, 
        "amberC": deal.amberC, 
        "amberD": deal.amberD, 
        "amberE": deal.amberE, 
        "redA": deal.redA, 
        "redB": deal.redB, 
        "redC": deal.redC, 
        "redD": deal.redD, 
        "redE": deal.redE, 
        "structuringFeeAmount": +deal.structuringFeeAmount,
        "structuringFeeAdvance": +deal.structuringFeeAdvance,
        "guaranteeFee": +deal.guaranteeFee,
        "monitoringFee": +deal.monitoringFee,
        "reimbursible": +deal.reimbursible,
        "notes": "",
        "closed": false
      };

      console.log(data);
      setSubmitted(true)

      Services.createDeal(data)
        .then(res => {
          console.log(res.data.message)
          setResponse(res.data.message)
          setSubmitted(true)
        })
        .catch(error => {
          console.log(error)
          setResponse("Failed to Create Deal. Please Try Again")
        });
    };

    const newDeal = () => {
      setDeal(initialDealState);
      setSubmitted(false);
    };
    
    return(
        <React.Fragment>
      {/* ---------------------- Update Transaction Forms ----------- */}
        <FormWrapper>
          <Container fluid style={{marginTop:'0'}}>
          
            {submitted ? (
                        <div>
                          <p style={{fontWeight:'bold',fontSize:'12px', color:'darkblue', marginTop:'1rem'}}>{response}</p>
                        <ButtonWrapper onClick={newDeal}>Add New Deal</ButtonWrapper>
                        </div>
                   

                ) : (
                    <Form> 
                    <PWrapper>
                        <h5>Add New Transaction</h5>
                    </PWrapper>
                    
            {/* ---------------New Transaction Form------------------- */}
            
<br/>
<div>
<Tabs defaultActiveKey="first" style={{fontSize:'12px'}}>
<Tab eventKey="first" title="CLIENT">
    <br/>
    <br/>
<Container1>
<br/>
                <Row>
                  <Col sm={12}>
                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                      <Form.Label>Client Name</Form.Label>
                      <Form.Control size="sm" type="text" value={deal.clientName} onChange={handleInputChange} name='clientName'/>
                    </Form.Group>
                  </Col>

                  <Col sm={12}>
                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                      <Form.Label>Originator</Form.Label>
                      <Form.Control size="sm" type="text" value={deal.originator} onChange={handleInputChange} name='originator'/>
                    </Form.Group>
                  </Col>

                  <Col sm={12}>
                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                      <Form.Label>Transactor</Form.Label>
                      <Form.Control size="sm" type="text" value={deal.transactor} onChange={handleInputChange} name='transactor'/>
                    </Form.Group>
                  </Col>

                  <Col sm={12}>
                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                      <Form.Label>Transactor Legal Lead</Form.Label>
                      <Form.Control size="sm" type="text" value={deal.transactionLegalLead} onChange={handleInputChange} name='transactionLegalLead'/>
                    </Form.Group>
                  </Col>
                </Row>
                <br/>
                <br/>
                </Container1>
</Tab>




<Tab eventKey="second" title="DEAL PROFILE FESS & REIMBURSEMENTS">
    <br/>
    <br/>
<Container1>
                <div className='mt-2'>
                  <PWrapper>
                    <h6 className="pt-1 mt-1" style={{fontSize: "13px"}}>Deal Profile Fees & Reimbursement</h6>
                  </PWrapper>
                    
                  <Row>
                    <Col sm={4} className='my-0 py-0'>
                      <Form.Group className="">
                        <Form.Label>Industry</Form.Label>
                        <Form.Select size="sm" name='industry' value={deal.industry} onChange={handleInputChange} required>
                          <option>Select</option>
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
                        <Form.Select size="sm" name='product' value={deal.product} onChange={handleInputChange} required>
                          <option>Select</option>
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
                        <Form.Select size="sm" name='region' value={deal.region} onChange={handleInputChange} required>
                          <option>Select</option>
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
                        <Form.Control size="sm" type="number" value={deal.dealSize} onChange={handleInputChange} name='dealSize'/>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Coupon(%)</Form.Label>
                        <Form.Control size="sm" type="number" value={deal.coupon} onChange={handleInputChange} name='coupon'/>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Tenor(yrs)</Form.Label>
                        <Form.Control size="sm" type="number" value={deal.tenor} onChange={handleInputChange}  name='tenor'/>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Moratorium(yrs)</Form.Label>
                        <Form.Control size="sm" type="number" value={deal.moratorium} onChange={handleInputChange} name='moratorium'/>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className='mt-1 pt-3' >

                    <Col sm={4}>
                      <Form.Group className="">
                        <Form.Label>Repayment Frequency</Form.Label>
                        <Form.Select size="sm" name='repaymentFrequency' value={deal.repaymentFrequency} onChange={handleInputChange} >
                          <option>Select</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Quarterly">Quarterly</option>
                          <option value="Semi-Annually">Semi-Annually</option>
                          <option value="Annually">Annually</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col sm={4}>
                      <Form.Group className="">
                        <Form.Label>Amortization Style</Form.Label>
                        <Form.Select size="sm" name='amortizationStyle' value={deal.amortizationStyle} onChange={handleInputChange} >
                          <option>Select</option>
                          <option value="Annuity">Annuity</option>
                          <option value="Straight-Line">Straight-Line</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col sm={4}>
                      <Form.Group className="pt-1">
                        <Form.Label>Mandate Letter</Form.Label>
                        <Form.Control size="sm" type="date" value={deal.mandateLetter} onChange={handleInputChange} name='mandateLetter'/>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className='mt-1 pt-3' >
                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Credit Approval</Form.Label>
                        <Form.Control size="sm" type="date" value={deal.creditApproval} onChange={handleInputChange} name='creditApproval'/>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Fee Letter</Form.Label>
                        <Form.Control size="sm" type="date" value={deal.feeLetter} onChange={handleInputChange} name='feeLetter'/>
                      </Form.Group>
                    </Col>

                    <Col sm={6} className='pt-3'>
                      <Form.Group className="pt-1">
                        <Form.Label>Excepted Close</Form.Label>
                        <Form.Control size="sm" type="date" value={deal.expectedClose} onChange={handleInputChange} name='expectedClose'/>
                      </Form.Group>
                    </Col>

                    <Col sm={6} className='pt-3'>
                      <Form.Group className="pt-1">
                        <Form.Label>Actual Close</Form.Label>
                        <Form.Control size="sm" type="date" value={deal.actualClose} onChange={handleInputChange} name='actualClose'/>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <br/>
                <br/>
                </Container1>
                <br/>
                <br/>




</Tab>




<Tab eventKey="third" title="STRUCTURING FEES">
    <br/>
    <br/>
<Container1>
                <div className='mt-2'>
                  <PWrapper>
                    <h6 className="pt-1" style={{fontSize: "13px"}}>Structuring Fees</h6>
                  </PWrapper>

                  <Row>
                    <Col sm={4} className='my-0 py-0'>
                      <Form.Group>
                        <Form.Label>Amount(NGN)</Form.Label>
                        <Form.Control size="sm" type="number" value={deal.structuringFeeAmount} onChange={handleInputChange} name='structuringFeeAmount'/>
                      </Form.Group>
                    </Col>

                    <Col sm={4} className='my-0 py-0'>
                      <Form.Group>
                        <Form.Label>Advance(%)</Form.Label>
                        <Form.Control size="sm" type="number" value={deal.structuringFeeAdvance} onChange={handleInputChange} name='structuringFeeAdvance'/>
                      </Form.Group>
                    </Col>

                    <Col sm={4} className='my-0 py-0'>
                      <Form.Group>
                        <Form.Label>Final(%)</Form.Label>
                        <Form.Control size="sm" type="number" value={deal.structuringFeeFinal} onChange={handleInputChange} name='structuringFeeFinal' disabled/>
                      </Form.Group>
                    </Col>
                  </Row>







                  <Row>
                    <Col sm={4} className='my-0 py-0'>
                      <Form.Group className="pt-1">
                        <Form.Label>Guarantee (%)</Form.Label>
                        <Form.Control size="sm" type="number" value={deal.guaranteeFee} onChange={handleInputChange} name='guaranteeFee'/>
                      </Form.Group>
                    </Col>

                    <Col sm={4} className='my-0 py-0'>
                      <Form.Group className="pt-1">
                        <Form.Label>Monitoring(NGN)</Form.Label>
                        <Form.Control size="sm" type="number" value={deal.monitoringFee} onChange={handleInputChange} name='monitoringFee'/>
                      </Form.Group>
                    </Col>

                    <Col sm={4} className='my-0 py-0'>
                      <Form.Group className="pt-1">
                        <Form.Label>Reimbursible(NGN)</Form.Label>
                        <Form.Control size="sm" type="number" value={deal.reimbursible} onChange={handleInputChange} name='reimbursible'/>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <br/>
                <br/>
                </Container1>

</Tab>




<Tab eventKey="seventh" title="DEAL CATEGORY"  style={{fontSize:'12px'}}>
    <br/>
    <Tabs defaultActiveKey="first" className='text-secondary'>
    <Tab eventKey="first" title="RED TRANSACTION CATEGORY" >
    <Container1>
                  <div name='redCategory'>
                    <PWrapper>
                      <h6 className="pt-1" style={{fontSize: "10px", color: "red"}}>Red Category</h6>
                    </PWrapper>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Mandate Letter signed:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" name="redA" value={deal.redA} onChange={handleInputChange} defaultChecked/>
                      <Form.Check inline label="No" type="radio" name="redA" value={deal.redA} onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Due dilligence ongoing:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" name="redB" value={deal.redB} onChange={handleInputChange} defaultChecked/>
                      <Form.Check inline label="No" type="radio" name="redB" value={deal.redB} onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Pending Credit Committee approval:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" name="redC" value={deal.redC} onChange={handleInputChange} defaultChecked/>
                      <Form.Check inline label="No" type="radio" name="redC" value={deal.redC} onChange={handleInputChange} />
                    </Form.Group>
                  </div>
                  </Container1>

    </Tab>

    <Tab eventKey="eigth" title="AMBER TRANSACTION CATEGORY">
    <Container1>

<div name='amberCategory'>
  <PWrapper>
    <h6 className="pt-1" style={{fontSize: "10px", color: "#FFC200"}}>Amber Category</h6>
  </PWrapper>

  <Form.Group>
    <Form.Label style={{paddingRight: "1rem"}}>Mandate Letter signed:</Form.Label>
    <Form.Check inline label="Yes" type="radio" name="amberA" value={deal.amberA} onChange={handleInputChange} />
    <Form.Check inline label="No" type="radio" name="amberA" value={deal.amberA} onChange={handleInputChange} defaultChecked />
  </Form.Group>

  <Form.Group>
    <Form.Label style={{paddingRight: "1rem"}}>Transaction has obtained Credit Committe approval:</Form.Label>
    <Form.Check inline label="Yes" type="radio" name="amberB" value={deal.amberB} onChange={handleInputChange} />
    <Form.Check inline label="No" type="radio" name="amberB" value={deal.amberB} onChange={handleInputChange} defaultChecked />
  </Form.Group>

  <Form.Group>
    <Form.Label style={{paddingRight: "1rem"}}>Professional Parties to the Bond issue appointed or selected:</Form.Label>
    <Form.Check inline label="Yes" type="radio" name="amberC" value={deal.amberC} onChange={handleInputChange} />
    <Form.Check inline label="No" type="radio" name="amberC" value={deal.amberC} onChange={handleInputChange} defaultChecked />
  </Form.Group>

  <Form.Group>
    <Form.Label style={{paddingRight: "1rem"}}>Fee Letter and/or Guarantee Documentation expected to be negotiated and/or signed within 8 weeks:</Form.Label>
    <Form.Check inline label="Yes" type="radio" name="amberD" value={deal.amberD} onChange={handleInputChange} />
    <Form.Check inline label="No" type="radio" name="amberD" value={deal.amberD} onChange={handleInputChange} defaultChecked />
  </Form.Group>

  <Form.Group>
    <Form.Label style={{paddingRight: "1rem"}}>All Materials CPs with timelines for completion agreed with the client:</Form.Label>
    <Form.Check inline label="Yes" type="radio" name="amberE" value={deal.amberE} onChange={handleInputChange} />
    <Form.Check inline label="No" type="radio" name="amberE" value={deal.amberE} onChange={handleInputChange} defaultChecked />
  </Form.Group>
</div>
</Container1>
    </Tab>

    <Tab eventKey="ninthth" title="GREEN TRANSACTION CATEGORY">
    <Container1>
    <div name='greenCategory'>
        
                    <PWrapper>
                      <h6 className="pt-1" style={{fontSize: "10px", color: "green"}}>Green Category</h6>
                    </PWrapper>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Transaction has obtained Credit Committee approval:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" name="greenA" value={deal.greenA} onChange={handleInputChange} />
                      <Form.Check inline label="No" type="radio" name="greenA" value={deal.greenA} onChange={handleInputChange} defaultChecked />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Guarantee Document in agreed form:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" name="greenB" value={deal.greenB} onChange={handleInputChange} />
                      <Form.Check inline label="No" type="radio" name="greenB" value={deal.greenB} onChange={handleInputChange} defaultChecked />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Professional Parties to the Bond Issue appointed or selected:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" name="greenC" value={deal.greenC} onChange={handleInputChange} />
                      <Form.Check inline label="No" type="radio" name="greenC" value={deal.greenC} onChange={handleInputChange} defaultChecked />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Already filed or expected filing with SEC (or equivalent Exchange) within 6 weeks:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" name="greenD" value={deal.greenD} onChange={handleInputChange} />
                      <Form.Check inline label="No" type="radio" name="greenD" value={deal.greenD} onChange={handleInputChange} defaultChecked />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>All Materials CPs to Financial Close have been satisfactorily met or committed by the Client for completion on or before Financial Close:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" name="greenE" value={deal.greenE} onChange={handleInputChange} />
                      <Form.Check inline label="No" type="radio" name="greenE" value={deal.greenE} onChange={handleInputChange} defaultChecked />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Financial Close expected within 3-6 months:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" name="greenF" value={deal.greenF} onChange={handleInputChange} />
                      <Form.Check inline label="No" type="radio" name="greenF" value={deal.greenF} onChange={handleInputChange} defaultChecked />
                    </Form.Group>
                  </div>
                  <br/>
                  <br/>
                  <ButtonWrapper onClick={saveDeal}>
                        Submit
                    </ButtonWrapper>

                    <ButtonWrapper style={{backgroundColor:"grey"}} >
                        Cancel
                    </ButtonWrapper>
                  </Container1>
    </Tab>
    </Tabs>
</Tab>
</Tabs>
</div>
</Form>
)}
              
    </Container>  
    </FormWrapper>  
    </React.Fragment>
    )
}

export default AddDeal;
