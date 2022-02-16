import React, { useRef, useState } from 'react';
import { Form, Container, Row, Col, Stack } from 'react-bootstrap';
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import Service from "../../Services/Service"

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
  const industry = useRef("");
  const product = useRef("");
  const region = useRef("")

  // const { id } = useParams()
  const id = 3

  console.log(id)
  console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
  
  const data = {
    clientName: clientName.current.value,
    originator: originator.current.value,
    transactor: transactor.current.value,
    industry: industry.current.value, 
    product: product.current.value,
    region: region.current.value,
  }
  
 function postData() {
 // e.preventDefault();
   console.log("ttttttttttttttt")
    Service.updateDeal(id, data)
  }
  
  return (
    <React.Fragment>
      {/* ---------------------- Update Transaction Forms ----------- */}
        <FormWrapper>
          <Container fluid style={{marginTop:'0'}}>
            <Form> 
              <PWrapper>
                <h5>Update Transaction</h5>
              </PWrapper>
                
          {/* --------------- Update Transaction Form ------------- */}
              <Container1>
                <Row>
                  <Col sm={4}>
                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                      <Form.Label>Client Name</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="" id='client' ref={clientName}/>
                    </Form.Group>
                  </Col>

                  <Col sm={4}>
                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                      <Form.Label>Originator</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="" id='originator' ref={originator}/>
                    </Form.Group>
                  </Col>

                  <Col sm={4}>
                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                      <Form.Label>Transactor</Form.Label>
                      <Form.Control size="sm" type="text" placeholder=""  id='transactor' ref={transactor}/>
                    </Form.Group>
                  </Col>
                </Row>

                  {/*----------- Deal Profile Fess and Reimbursement ---------------- */}

                <div className='mt-2'>
                  <PWrapper>
                    <h6 className="pt-1 mt-1" style={{fontSize: "13px"}}>Deal Profile Fees & Reimbursement</h6>
                  </PWrapper>
                    
                  <Row>
                    <Col sm={4} className='my-0 py-0'>
                      <Form.Group className="">
                        <Form.Label>Industry</Form.Label>
                        <Form.Select size="sm" id='industry' required>
                          <option>Select</option>
                          <option value="1">On-grid Power</option>
                          <option value="2">Off-grid Power</option>
                          <option value="3">Agric Infra.</option>
                          <option value="4">Gas</option>
                          <option value="5">Transportation</option>
                          <option value="6">Inputs to Infra.</option>
                          <option value="7">Affordable Housing</option>
                          <option value="8">Education Infra.</option>
                          <option value="9">Healthcare</option>
                          <option value="10">Water/Waste</option>
                          <option value="11">ICT/Telecoms</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col sm={4}>
                      <Form.Group className="">
                        <Form.Label>Products</Form.Label>
                        <Form.Select size="sm" id='products' required>
                          <option>Select</option>
                          <option value="1">Public Bond</option>
                          <option value="2">Private Bond (Clean Energy)</option>
                          <option value="3">Contingent Refi. Gte.</option>
                          <option value="4">Annuity PPP</option>
                          <option value="5">Blended Finance</option>
                          <option value="6">Private Bond (Other)</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col sm={4}>
                      <Form.Group className="">
                        <Form.Label>Region</Form.Label>
                        <Form.Select size="sm" id='region' required>
                          <option>Select</option>
                          <option value="1">SW</option>
                          <option value="2">SE</option>
                          <option value="3">SS</option>
                          <option value="4">NW</option>
                          <option value="5">NE</option>
                          <option value="6">NC</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className='mt-1'>
                    <Col sm={3}>
                      <Form.Group className="pt-1">
                        <Form.Label>Deal Size (NGN)</Form.Label>
                        <Form.Control size="sm" type="text" placeholder=""  id='dealSize'/>
                      </Form.Group>
                    </Col>

                    <Col sm={3}>
                      <Form.Group className="pt-1">
                        <Form.Label>Coupon(%)</Form.Label>
                        <Form.Control size="sm" type="text" placeholder=""  id='coupon'/>
                      </Form.Group>
                    </Col>

                    <Col sm={3}>
                      <Form.Group className="pt-1">
                        <Form.Label>Tenor(yrs)</Form.Label>
                        <Form.Control size="sm" type="text" placeholder=""  id='temor'/>
                      </Form.Group>
                    </Col>

                    <Col sm={3}>
                      <Form.Group className="pt-1">
                        <Form.Label>Moratorium(yrs)</Form.Label>
                        <Form.Control size="sm" type="text" placeholder=""  id='moratorium'/>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className='mt-1' >
                    <Col sm={4}>
                      <Form.Group className="">
                        <Form.Label>Repayment Frequency</Form.Label>
                        <Form.Select size="sm" id='frequency'>
                          <option>Select</option>
                          <option value="1">Monthly</option>
                          <option value="2">Quarterly</option>
                          <option value="3">Semi-Annually</option>
                          <option value="4">Annually</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col sm={4}>
                      <Form.Group className="">
                        <Form.Label>Amortisation Style</Form.Label>
                        <Form.Select size="sm" id='amortisationStyle'>
                          <option>Select</option>
                          <option value="1">Annuity</option>
                          <option value="2">Straight-Line</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col sm={4}>
                      <Form.Group className="pt-1">
                        <Form.Label>Mandate Letter</Form.Label>
                        <Form.Control size="sm" type="date" placeholder=""  id='mandateLetter'/>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className='mt-1' >
                    <Col sm={3}>
                      <Form.Group className="pt-1">
                        <Form.Label>Credit Approval</Form.Label>
                        <Form.Control size="sm" type="date" placeholder=""  id='creditApproval'/>
                      </Form.Group>
                    </Col>

                    <Col sm={3}>
                      <Form.Group className="pt-1">
                        <Form.Label>Fee Letter</Form.Label>
                        <Form.Control size="sm" type="date" placeholder=""  id='feeLetter'/>
                      </Form.Group>
                    </Col>

                    <Col sm={3}>
                      <Form.Group className="pt-1">
                        <Form.Label>Excepted Close</Form.Label>
                        <Form.Control size="sm" type="date" placeholder=""  id='expectedClose'/>
                      </Form.Group>
                    </Col>

                    <Col sm={3}>
                      <Form.Group className="pt-1">
                        <Form.Label>Actual Close</Form.Label>
                        <Form.Control size="sm" type="date" placeholder=""  id='actualClose'/>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>

                  {/*-------------------- Structuring Fees -------------------------- */}
                <div className='mt-2'>
                  <PWrapper>
                    <h6 className="pt-1" style={{fontSize: "13px"}}>Structuring Fees</h6>
                  </PWrapper>

                  <Row>
                    <Col sm={4} className='my-0 py-0'>
                      <Form.Group>
                        <Form.Label>Amount(NGN)</Form.Label>
                        <Form.Control size="sm" type="text" placeholder=""  id='amount'/>
                      </Form.Group>
                    </Col>

                    <Col sm={4} className='my-0 py-0'>
                      <Form.Group>
                        <Form.Label>Advance(%)</Form.Label>
                        <Form.Control size="sm" type="text" placeholder=""  id='advance'/>
                      </Form.Group>
                    </Col>

                    <Col sm={4} className='my-0 py-0'>
                      <Form.Group>
                        <Form.Label>Final(%)</Form.Label>
                        <Form.Control size="sm" type="text" placeholder='30%' id='final' disabled/>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={4} className='my-0 py-0'>
                      <Form.Group className="pt-1">
                        <Form.Label>Guarantee (%)</Form.Label>
                        <Form.Control size="sm" type="text" placeholder=""  id='guarantee'/>
                      </Form.Group>
                    </Col>

                    <Col sm={4} className='my-0 py-0'>
                      <Form.Group className="pt-1">
                        <Form.Label>Monitoring(NGN)</Form.Label>
                        <Form.Control size="sm" type="text" placeholder=""  id='monitoring'/>
                      </Form.Group>
                    </Col>

                    <Col sm={4} className='my-0 py-0'>
                      <Form.Group className="pt-1">
                        <Form.Label>Reimbursible(NGN)</Form.Label>
                        <Form.Control size="sm" type="text" placeholder=""  id='reimbursible'/>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>

                  {/*-------------------- Radio Buttons ------------------------------ */}

                <div className='mt-2' id='dealCategory'>
                  <PWrapper>
                    <h6 className="pt-1" style={{fontSize: "13px"}}>Deal Category</h6>
                  </PWrapper>

                  <div id='greenCategory'>
                    <PWrapper>
                      <h6 className="pt-1" style={{fontSize: "10px", color: "green"}}>Green Category</h6>
                    </PWrapper>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Transaction has obtained Credit Committee approval:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" name="greenA" />
                      <Form.Check inline label="No" type="radio" name="greenA" />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Guarantee Document in agreed form:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" name="greenB" />
                      <Form.Check inline label="No" type="radio" name="greenB" />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Professional Parties to the Bond Issue appointed or selected:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" name="greenC" />
                      <Form.Check inline label="No" type="radio" name="greenC" />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Already filed or expected filing with SEC (or equivalent Exchange) within 6 weeks:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" name="greenD" />
                      <Form.Check inline label="No" type="radio" name="greenD" />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>All Materials CPs to Financial Close have been satisfactorily met or committed by the Client for completion on or before Financial Close:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" name="greenE" />
                      <Form.Check inline label="No" type="radio" name="greenE" />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Financial Close expected within 3-6 months:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" name="greenF" />
                      <Form.Check inline label="No" type="radio" name="greenF" />
                    </Form.Group>
                  </div>

                  <div id='amberCategory'>
                    <PWrapper>
                      <h6 className="pt-1" style={{fontSize: "10px", color: "#FFC200"}}>Amber Category</h6>
                    </PWrapper>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Mandate Letter signed:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" name="amberA" />
                      <Form.Check inline label="No" type="radio" name="amberA" />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Transaction has obtained Credit Committe approval:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" name="amberB" />
                      <Form.Check inline label="No" type="radio" name="amberB" />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Professional Parties to the Bond issue appointed or selected:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" name="amberC" />
                      <Form.Check inline label="No" type="radio" name="amberC" />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Fee Letter and/or Guarantee Documentation expected to be negotiated and/or signed within 8 weeks:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" name="amberD" />
                      <Form.Check inline label="No" type="radio" name="amberD" />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>All Materials CPs with timelines for completion agreed with the client:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" name="amberE" />
                      <Form.Check inline label="No" type="radio" name="amberE" />
                    </Form.Group>
                  </div>

                  <div id='redCategory'>
                    <PWrapper>
                      <h6 className="pt-1" style={{fontSize: "10px", color: "red"}}>Red Category</h6>
                    </PWrapper>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Mandate Letter signed:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" name="redA" />
                      <Form.Check inline label="No" type="radio" name="redA" />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Due dilligence ongoing:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" name="redB" />
                      <Form.Check inline label="No" type="radio" name="redB" />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{paddingRight: "1rem"}}>Pending Credit Committee approval:</Form.Label>
                      <Form.Check inline label="Yes" type="radio" name="redC" />
                      <Form.Check inline label="No" type="radio" name="redC" />
                    </Form.Group>
                  </div>
                </div>
              </Container1>
          
                {/* ------------------  Submit Form Button -----------*/}
              <ButtonWrapper className='d-flex justify-content-end' onClick={postData}>
                Submit
              </ButtonWrapper>

            </Form>
          </Container>
        </FormWrapper>
    </React.Fragment>
  )
}
