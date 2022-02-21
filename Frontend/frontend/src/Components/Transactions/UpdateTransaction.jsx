import React, { useRef, useState } from 'react';
import { Form, Container, Row, Col, Stack } from 'react-bootstrap';
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import Service from "../../Services/Service"
import { useEffect } from 'react';
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
const   FormWrapper = styled.div`
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

  //const { id } = useParams()
  
  let id = window.location.search.split("?")[1]

  console.log(id)

  const [deal, setDeal] = useState([]);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    retrieveDeal();
  }, []);

  const retrieveDeal = async () => {
    // function to get deal by id from the database
    const data = await axios.get(
      `http://localhost:5000/api/v1/transaction/item/${id}`,
      {headers: {
        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjE4ODJhY2JhLTdkNWYtNDI1ZS04ODFiLTM5Zjk5NDg5NTYyNCIsIkVtYWlsIjoic3VwZXJhZG1pbkBpbmZyYWNyZWRpdC5jb20iLCJTdGF0dXMiOiJBY3RpdmUiLCJBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ1NDM4MDI2LCJleHAiOjE2NDU1MjQ0MjZ9.TARfq9ZupPEmdpohkyrQC7whgAaw4KCdeYk21WEl0BA",
        'Content-type': 'application/json; charset=utf-8',
      }}
    ).catch((e) => {
      console.log(e);
    });

    // set the deal and status state
    setDeal(data.data.dealInfo);
    setStatus(true)
  } ;

  console.log("data ohhh:", deal)

  function postData(e) {
    e.preventDefault()
  
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
      greenA: greenA.current.value,
      greenB: greenB.current.value,
      greenC: greenC.current.value,
      greenD: greenD.current.value,
      greenE: greenE.current.value,
      amberA: amberA.current.value,
      amberB: amberB.current.value,
      amberC: amberC.current.value,
      amberD: amberD.current.value,
      amberE: amberE.current.value,
      redA: redA.current.value,
      redB: redB.current.value,
      redC: redC.current.value,
      notes: []
    }
      Service.updateDeal(id, data)
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

              {}
                
          {/* --------------- Update Transaction Form ------------- */}
              <Container1>
                <Row className='mt-1'>
                  <Col sm={4}>
                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                      <Form.Label>Client Name</Form.Label>
                    <Form.Control size="sm" type="text" defaultValue={deal[0].clientname} id='client' ref={clientName} disabled/>
                    </Form.Group>
                  </Col>

                  <Col sm={4}>
                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                      <Form.Label>Originator</Form.Label>
                    <Form.Control size="sm" type="text" defaultValue={deal[0].originator} id='originator' ref={originator}/>
                    </Form.Group>
                  </Col>

                  <Col sm={4}>
                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                      <Form.Label>Transactor</Form.Label>
                      <Form.Control size="sm" type="text" defaultValue={deal[0].transactor}  id='transactor' ref={transactor}/>
                    </Form.Group>
                  </Col>

                  <Col sm={4}>
                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                      <Form.Label>Transaction Legal Lead</Form.Label>
                      <Form.Control size="sm" type="text" defaultValue={deal[0].transactionlegallead}  id='transactionLegalLead' ref={transactionLegalLead}/>
                    </Form.Group>
                  </Col>
                </Row>
                <br/>
                <br/>
                </Container1>
                <br/>
                <br/>

                  {/*----------- Deal Profile Fess and Reimbursement ---------------- */}
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
                      <Form.Control size="sm" type="text" defaultValue={deal[0].dealsize} id='dealSize' ref={dealSize}/>
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
                      <Form.Control size="sm" type="text" defaultValue={deal[0].tenor} id='temor' ref={tenor}/>
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
                        <Form.Label>Amortization Style</Form.Label>
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
                      <Form.Control size="sm" type="date" defaultValue={deal[0].mandateletter} id='mandateLetter' ref={mandateLetter}/>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className='mt-1 pt-3' >
                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Credit Approval</Form.Label>
                      <Form.Control size="sm" type="date" defaultValue={deal[0].creditapproval} id='creditApproval' ref={creditApproval}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Fee Letter</Form.Label>
                      <Form.Control size="sm" type="date" defaultValue={deal[0].feeletter} id='feeLetter' ref={feeLetter}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Excepted Close</Form.Label>
                      <Form.Control size="sm" type="date" defaultValue={deal[0].exceptedclose} id='expectedClose' ref={exceptedClose}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Actual Close</Form.Label>
                      <Form.Control size="sm" type="date" defaultValue={deal[0].actualclose} id='actualClose' ref={actualClose}/>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <br/>
                </Container1>

                  {/*-------------------- Structuring Fees -------------------------- */}
              
                <div className='mt-2'>
                  <PWrapper>
                    <h6 className="pt-1" style={{fontSize: "13px"}}>Structuring Fees</h6>
                  </PWrapper>

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
                  </Container1>
                </div>

                  {/*-------------------- Radio Buttons ------------------------------ */}

                <div className='mt-2' id='dealCategory'>
                  <PWrapper>
                    <h6 className="pt-1" style={{fontSize: "13px"}}>Deal Category</h6>
                  </PWrapper>
{/*<Container1>
  <br/>

                  <div id='greenCategory'>
                    <PWrapper>
                      <h6 className="pt-1" style={{fontSize: "10px", color: "green"}}>Green Category</h6>
                    </PWrapper>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Transaction has obtained Credit Committee approval:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" checked={deal[0].greena === true} name="greenA" ref={greenA}/>
                      <Form.Check inline label="No" type="radio" checked={deal[0].greena === false} name="greenA" ref={greenA}/>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Guarantee Document in agreed form:</Form.Label>
                    <Form.Check inline label="Yes" type="radio" checked={deal[0].greenb === true} name="greenB" ref={greenB}/>
                      <Form.Check inline label="No" type="radio" checked={deal[0].greenb === false} name="greenB" ref={greenB} />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Professional Parties to the Bond Issue appointed or selected:</Form.Label>
                    <Form.Check inline label="Yes" type="radio" checked={deal[0].greenc === true} name="greenC" ref={greenC}/>
                    <Form.Check inline label="No" type="radio" checked={deal[0].greenc === false} name="greenC" ref={greenC}/>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Already filed or expected filing with SEC (or equivalent Exchange) within 6 weeks:</Form.Label>
                    <Form.Check inline label="Yes" type="radio" checked={deal[0].greend === true} name="greenD" ref={greenD}/>
                    <Form.Check inline label="No" type="radio" checked={deal[0].greend === false} name="greenD" ref={greenD}/>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>All Materials CPs to Financial Close have been satisfactorily met or committed by the Client for completion on or before Financial Close:</Form.Label>
                    <Form.Check inline label="Yes" type="radio" checked={deal[0].greene === true} name="greenE" ref={greenE}/>
                      <Form.Check inline label="No" type="radio" checked={deal[0].greene === false} name="greenE" ref={greenE}/>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Financial Close expected within 3-6 months:</Form.Label>
                    <Form.Check inline label="Yes" type="radio" checked={deal[0].greenf === true} name="greenF" ref={greenF}/>
                    <Form.Check inline label="No" type="radio" checked={deal[0].greenf === false} name="greenF" ref={greenF}/>
                    </Form.Group>
                  </div>
                  <br/>
</Container1>*/}

          <br/>
        <Container1>
        <div id='greenCategory'>
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
                    <Form.Check inline label="Yes" type="radio" name="greenA" ref={greenA}/>
                      <Form.Check inline label="No" type="radio" name="greenA" ref={greenA}/>
                     
              </Col>
              </Row>  
                    </Form.Group>  
            </Col>

            {/*--------------------------------------------- b --------------- */}
            <Col sm={12}>
            <Form.Group>
            <Row>
              <Col>
              <Form.Label style={{paddingRight: "1rem"}}>Guarantee Document in agreed form:</Form.Label>
               </Col>  
               <Col>    
               <Form.Check inline label="Yes" type="radio" name="greenB" ref={greenB}/>
                      <Form.Check inline label="No" type="radio" name="greenB" ref={greenB} />         
              </Col>
              </Row>  
                    </Form.Group>
                  
            </Col>


            {/**------------------------------------------------- */}
            <Col sm={12}>
            <Form.Group>
            <Row>
              <Col>
              <Form.Label style={{paddingRight: "1rem"}}>Professional Parties to the Bond Issue appointed or selected:</Form.Label>
               </Col>  
               <Col>    
                    <Form.Check inline label="Yes" type="radio" name="greenC" ref={greenC}/>
                      <Form.Check inline label="No" type="radio" name="greenC" ref={greenC}/>  
              </Col>
              </Row> 
                    </Form.Group>
                  
            </Col>

            {/*------------------------------------------ */}
            <Col sm={12}>
            <Form.Group>
            <Row>
              <Col>
              <Form.Label style={{paddingRight: "1rem"}}>Already filed or expected filing with SEC (or equivalent Exchange) within 6 weeks:</Form.Label>
               </Col>  
               <Col>    
                    <Form.Check inline label="Yes" type="radio" name="greenD" ref={greenD}/>
                      <Form.Check inline label="No" type="radio" name="greenD" ref={greenD}/>
                     
              </Col>
              </Row>    
                    </Form.Group>
                  
            </Col>


            {/*-------------------------------------------------------- */}
            <Col sm={12}>
            <Form.Group>
            <Row>
              <Col>
              <Form.Label style={{paddingRight: "1rem"}}>All Materials CPs to Financial Close have been satisfactorily met or committed by the Client for completion on or before Financial Close:</Form.Label>
               </Col>  
               <Col>    
                    <Form.Check inline label="Yes" type="radio" name="greenE" ref={greenE}/>
                      <Form.Check inline label="No" type="radio" name="greenE" ref={greenE}/>  
              </Col>
              </Row>
                    </Form.Group>
                  
            </Col>
            {/*-------------------------------------------------- */}
            <Col sm={12}>
            <Form.Group>
            <Row>
              <Col>
          <Form.Label style={{paddingRight: "1rem"}}>Financial Close expected within 3-6 months:</Form.Label>            
               </Col>  
               <Col>    
                    <Form.Check inline label="Yes" type="radio" name="greenF" ref={greenF}/>
                      <Form.Check inline label="No" type="radio" name="greenF" ref={greenF}/>
              </Col>
              </Row>      
                    </Form.Group>
                  
            </Col>
         {/*------------------------------------e  */}   
          </Row>
          </Form.Group>
          </div>
        </Container1>
















                  <div id='amberCategory'>
                    <PWrapper>
                      <h6 className="pt-1" style={{fontSize: "10px", color: "#FFC200"}}>Amber Category</h6>
                    </PWrapper>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Mandate Letter signed:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" checked={deal[0].ambera === true} name="amberA" />
                      <Form.Check inline label="No" type="radio" checked={deal[0].ambera === false} name="amberA" />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Transaction has obtained Credit Committe approval:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" checked={deal[0].amberb === true} name="amberB" />
                      <Form.Check inline label="No" type="radio" checked={deal[0].amberb === false} name="amberB" />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Professional Parties to the Bond issue appointed or selected:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" checked={deal[0].amberc === true} name="amberC" />
                      <Form.Check inline label="No" type="radio" checked={deal[0].amberc === false} name="amberC" />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Fee Letter and/or Guarantee Documentation expected to be negotiated and/or signed within 8 weeks:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" checked={deal[0].amberd === true} name="amberD" />
                      <Form.Check inline label="No" type="radio" checked={deal[0].amberd === false} name="amberD" />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>All Materials CPs with timelines for completion agreed with the client:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" checked={deal[0].ambere === true} name="amberE" />
                      <Form.Check inline label="No" type="radio" checked={deal[0].ambere === false} name="amberE" />
                    </Form.Group>
                  </div>

                  <div id='redCategory'>
                    <PWrapper>
                      <h6 className="pt-1" style={{fontSize: "10px", color: "red"}}>Red Category</h6>
                    </PWrapper>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Mandate Letter signed:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" checked={deal[0].reda === true} name="redA" />
                      <Form.Check inline label="No" type="radio" checked={deal[0].reda === false} name="redA" />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Due dilligence ongoing:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" checked={deal[0].redb === true} name="redB" />
                      <Form.Check inline label="No" type="radio" checked={deal[0].redb === false} name="redB" />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Pending Credit Committee approval:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" checked={deal[0].redc === true} name="redC" />
                      <Form.Check inline label="No" type="radio" checked={deal[0].redc === false} name="redC" />
                    </Form.Group>
                  </div>
                </div>
          
                {/* ------------------  Submit Form Button -----------*/}
              <ButtonWrapper type="submit" className='d-flex justify-content-end' onClick={postData}>
                Submit
              </ButtonWrapper>

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
