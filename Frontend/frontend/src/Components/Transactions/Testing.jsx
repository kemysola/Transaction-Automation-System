import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import React, { useRef, useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
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

export default function UpdateTransactions() {
    const [activeTab, setActiveTab] = useState('first');
    const [dealActiveTab, setDealActiveTab] = useState('deal');


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
    const clientName = useRef("");
    const originator = useRef("");
    const transactor = useRef("");
    const industry = useRef("");
    const product = useRef("");
    const region = useRef("")
    const dealSize = useRef("");
    const coupon = useRef("");
    const tenor = useRef("");
    const moratorium = useRef("");
    const repaymentFreq = useRef("");
    const amortisationStyle = useRef("");
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

    function postData(e) {
        e.preventDefault()

        const data = {
            clientName: clientName.current.value,
            originator: originator.current.value,
            transactor: transactor.current.value,
            industry: industry.current.value,
            product: product.current.value,
            region: region.current.value,
            dealSize: +dealSize.current.value,
            coupon: +coupon.current.value,
            tenor: +tenor.current.value,
            moratorium: +moratorium.current.value,
            repaymentFrequency: repaymentFreq.current.value,
            amortisationStyle: amortisationStyle.current.value,
            mandateLetter: new Date(mandateLetter.current.value),
            creditApproval: new Date(creditApproval.current.value),
            feeLetter: new Date(feeLetter.current.value),
            expectedClose: new Date(exceptedClose.current.value),
            actualClose: new Date(actualClose.current.value),
            structuringFeeAmount: +amount.current.value,
            structuringFeeAdvance: +advance.current.value,
            structuringFeeFinal: +final.current.value,
            guarantee: +guarantee.current.value,
            monitoring: +monitoring.current.value,
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
                <Container fluid style={{ marginTop: '0' }}>
                    <Form>
                        <PWrapper>
                            <h5>Update Transaction</h5>
                        </PWrapper>
                        <div>
                            <Tabs activeKey={activeTab} onSelect={(k) => handleTabChange} style={{ fontSize: '12px' }}>
                                {/* ----------------------------------------- Client Data ------------------------------------ */}
                                <Tab eventKey="first" title="TRANSACTION">
                                    <br />
                                    <Container1>
                                        <Container>
                                            <Row className='mt-3 pt-3'>
                                                <Col sm={12}>
                                                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                                                        <Form.Label>Client Name</Form.Label>
                                                        <Form.Control size="sm" type="text" placeholder="" id='client' ref={clientName} />
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={12}>
                                                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                                                        <Form.Label>Originator</Form.Label>
                                                        <Form.Control size="sm" type="text" placeholder="" id='originator' ref={originator} />
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={12}>
                                                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                                                        <Form.Label>Transactor</Form.Label>
                                                        <Form.Control size="sm" type="text" placeholder="" id='transactor' ref={transactor} />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm={12}>
                                                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                                                        <Form.Label>Transaction Legal Lead</Form.Label>
                                                        <Form.Control size="sm" type="text" placeholder="" id='transactionLegalLead' ref={transactor} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <br />
                                            <button onClick={e => toNextTab(e)} style={{ display: 'inlineBlock' }}>Next </button>
                                            <br />
                                        </Container>
                                    </Container1>
                                </Tab>

                                <Tab eventKey="second" title="DEAL PROFILE FEES & REIMBURSEMENTS">
                                    <Container1>
                                        <br />
                                        <div className='mt-2'>
                                            <PWrapper>
                                                <h6 className="pt-1 mt-1" style={{ fontSize: "13px" }}>Deal Profile Fees & Reimbursement</h6>
                                            </PWrapper>

                                            <Row>
                                                <Col sm={4} className='my-0 py-0'>
                                                    <Form.Group className="">
                                                        <Form.Label>Industry</Form.Label>
                                                        <Form.Select size="sm" id='industry' required ref={industry}>
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
                                                        <Form.Select size="sm" id='products' required ref={product}>
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
                                                        <Form.Select size="sm" id='region' required ref={region}>
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
                                                <Col sm={6}>
                                                    <Form.Group className="pt-1">
                                                        <Form.Label>Deal Size (NGN)</Form.Label>
                                                        <Form.Control size="sm" type="text" placeholder="" id='dealSize' ref={dealSize} />
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={6}>
                                                    <Form.Group className="pt-1">
                                                        <Form.Label>Coupon(%)</Form.Label>
                                                        <Form.Control size="sm" type="text" placeholder="" id='coupon' ref={coupon} />
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={6}>
                                                    <Form.Group className="pt-1">
                                                        <Form.Label>Tenor(yrs)</Form.Label>
                                                        <Form.Control size="sm" type="text" placeholder="" id='temor' ref={tenor} />
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={6}>
                                                    <Form.Group className="pt-1">
                                                        <Form.Label>Moratorium(yrs)</Form.Label>
                                                        <Form.Control size="sm" type="text" placeholder="" id='moratorium' ref={moratorium} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row className='mt-1' >
                                                <Col sm={4}>
                                                    <Form.Group className="">
                                                        <Form.Label>Repayment Frequency</Form.Label>
                                                        <Form.Select size="sm" id='frequency' ref={repaymentFreq}>
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
                                                        <Form.Select size="sm" id='amortisationStyle' ref={amortisationStyle}>
                                                            <option>Select</option>
                                                            <option value="1">Annuity</option>
                                                            <option value="2">Straight-Line</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={4}>
                                                    <Form.Group className="pt-1">
                                                        <Form.Label>Mandate Letter</Form.Label>
                                                        <Form.Control size="sm" type="date" placeholder="" id='mandateLetter' ref={mandateLetter} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row className='mt-1 pt-3' >
                                                <Col sm={6}>
                                                    <Form.Group className="pt-1">
                                                        <Form.Label>Credit Approval</Form.Label>
                                                        <Form.Control size="sm" type="date" placeholder="" id='creditApproval' ref={creditApproval} />
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={6}>
                                                    <Form.Group className="pt-1">
                                                        <Form.Label>Fee Letter</Form.Label>
                                                        <Form.Control size="sm" type="date" placeholder="" id='feeLetter' ref={feeLetter} />
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={6}>
                                                    <Form.Group className="pt-1">
                                                        <Form.Label>Excepted Close</Form.Label>
                                                        <Form.Control size="sm" type="date" placeholder="" id='expectedClose' ref={exceptedClose} />
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={6}>
                                                    <Form.Group className="pt-1">
                                                        <Form.Label>Actual Close</Form.Label>
                                                        <Form.Control size="sm" type="date" placeholder="" id='actualClose' ref={actualClose} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                        <br />
                                        <button onClick={e => toPrevTab(e)} style={{ display: 'inlineblock' }}> Prev</button>
                                        <button onClick={e => toNextTab(e)} style={{ display: 'inlineblock' }}>Next</button>
                                    </Container1>
                                </Tab>
                                <Tab eventKey="third" title="STRUCTURING FEES">
                                    <div className='mt-2'>


                                        <Container1>

                                            <br />
                                            <Row>
                                                <Col sm={6} className='my-0 py-0'>
                                                    <Form.Group>
                                                        <Form.Label>Amount(NGN)</Form.Label>
                                                        <Form.Control size="sm" type="text" placeholder="" id='amount' ref={amount} />
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={6} className='my-0 py-0'>
                                                    <Form.Group>
                                                        <Form.Label>Advance(%)</Form.Label>
                                                        <Form.Control size="sm" type="text" placeholder="" id='advance' ref={advance} />
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={6} className='my-0 py-0'>
                                                    <Form.Group>
                                                        <Form.Label>Final(%)</Form.Label>
                                                        <Form.Control size="sm" type="text" placeholder='30%' id='final' disabled ref={final} />
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={6} className='my-0 py-0'>
                                                    <Form.Group className="pt-1">
                                                        <Form.Label>Guarantee (%)</Form.Label>
                                                        <Form.Control size="sm" type="text" placeholder="" id='guarantee' ref={guarantee} />
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={6} className='my-0 py-0'>
                                                    <Form.Group className="pt-1">
                                                        <Form.Label>Monitoring(NGN)</Form.Label>
                                                        <Form.Control size="sm" type="text" placeholder="" id='monitoring' ref={monitoring} />
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={6} className='my-0 pb-2'>
                                                    <Form.Group className="pt-1">
                                                        <Form.Label>Reimbursible(NGN)</Form.Label>
                                                        <Form.Control size="sm" type="text" placeholder="" id='reimbursible' ref={reimbursible} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <br />
                                            <button onClick={e => toPrevTab(e)} style={{ display: 'inlineblock' }}> Prev</button>
                                            <button onClick={e => toNextTab(e)} style={{ display: 'inlineblock' }}>Next</button>
                                        </Container1>
                                    </div>
                                </Tab>

                                <Tab eventKey="fourth" title="DEAL CATEGORY" style={{ fontSize: '12px' }}>
                                    <br />
                                    <Tabs defaultActiveKey="first1" className='text-secondary'>
                                        <Tab eventKey="first1" title="RED TRANSACTION CATEGORY" >
                                            <Container1>
                                                <div id='redCategory' className='pt-2 mt-1 mb-3 pb-3'>
                                                    <PWrapper>
                                                        <br />
                                                        <h6 className="pt-1" style={{ fontSize: "10px", color: "red" }}>RED CATEGORY</h6>
                                                    </PWrapper>
                                                    <Row>
                                                        <Col sm={12}>
                                                            <Col>
                                                                <Form.Group>
                                                                    <Row>
                                                                        <Col sm={6}>
                                                                            <Form.Label style={{ paddingRight: "1rem" }}>Mandate Letter signed:</Form.Label>
                                                                        </Col>
                                                                        <Col sm={6}>
                                                                            <Form.Check inline label="Yes" type="radio" name="redA" />
                                                                            <Form.Check inline label="No" type="radio" name="redA" />
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>

                                                            <Col>
                                                                <Form.Group>
                                                                    <Row>
                                                                        <Col sm={6}>
                                                                            <Form.Label style={{ paddingRight: "1rem" }}>Due dilligence ongoing:</Form.Label>
                                                                        </Col>
                                                                        <Col sm={6}>
                                                                            <Form.Check inline label="Yes" type="radio" name="redB" />
                                                                            <Form.Check inline label="No" type="radio" name="redB" />
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
                                                                            <Form.Check inline label="Yes" type="radio" name="redC" />
                                                                            <Form.Check inline label="No" type="radio" name="redC" />
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Container1>
                                        </Tab>


                                        <Tab eventKey="second1" title="AMBER TRANSACTION CATEGORY">
                                            <Container1>
                                                <div id='amberCategory'>
                                                    <PWrapper>
                                                        <br />
                                                        <h6 className="pt-1" style={{ fontSize: "10px", color: "#FFC200" }}>AMBER CATEGORY</h6>
                                                    </PWrapper>

                                                    <div>
                                                        <Row>
                                                            <Col>
                                                                <Col>
                                                                    <Form.Group>
                                                                        <Row>
                                                                            <Col sm={6}>
                                                                                <Form.Label style={{ paddingRight: "1rem" }}>Mandate Letter signed:</Form.Label>
                                                                            </Col>
                                                                            <Col sm={6}>
                                                                                <Form.Check inline label="Yes" type="radio" name="amberA" />
                                                                                <Form.Check inline label="No" type="radio" name="amberA" />
                                                                            </Col>
                                                                        </Row>
                                                                    </Form.Group>
                                                                </Col>

                                                                <Col>
                                                                    <Form.Group>
                                                                        <Row>
                                                                            <Col sm={6}>
                                                                                <Form.Label style={{ paddingRight: "1rem" }}>Transaction has obtained Credit Committe approval:</Form.Label>
                                                                            </Col>
                                                                            <Col sm={6}>
                                                                                <Form.Check inline label="Yes" type="radio" name="amberB" />
                                                                                <Form.Check inline label="No" type="radio" name="amberB" />
                                                                            </Col>
                                                                        </Row>
                                                                    </Form.Group>
                                                                </Col>

                                                                <Col>
                                                                    <Form.Group>
                                                                        <Row>
                                                                            <Col sm={6}>
                                                                                <Form.Label style={{ paddingRight: "1rem" }}>Professional Parties to the Bond issue appointed or selected:</Form.Label>

                                                                            </Col>
                                                                            <Col sm={6}>
                                                                                <Form.Check inline label="Yes" type="radio" name="amberC" />
                                                                                <Form.Check inline label="No" type="radio" name="amberC" />
                                                                            </Col>
                                                                        </Row>
                                                                    </Form.Group>
                                                                </Col>

                                                                <Col>
                                                                    <Form.Group>
                                                                        <Row>
                                                                            <Col sm={6}></Col>
                                                                            <Col sm={6}></Col>
                                                                        </Row>
                                                                    </Form.Group>
                                                                </Col>

                                                                <Col>
                                                                    <Form.Group>
                                                                        <Row>
                                                                            <Col sm={6}>
                                                                                <Form.Label style={{ paddingRight: "1rem" }}>Fee Letter and/or Guarantee Documentation expected to be negotiated and/or signed within 8 weeks:</Form.Label>
                                                                            </Col>
                                                                            <Col sm={6}>
                                                                                <Form.Check inline label="Yes" type="radio" name="amberD" />
                                                                                <Form.Check inline label="No" type="radio" name="amberD" />
                                                                            </Col>
                                                                        </Row>
                                                                    </Form.Group>
                                                                </Col>

                                                                <Col>
                                                                    <Form.Group>
                                                                        <Row>
                                                                            <Col sm={6}>
                                                                                <Form.Label style={{ paddingRight: "1rem" }}>All Materials CPs with timelines for completion agreed with the client:</Form.Label>
                                                                            </Col>
                                                                            <Col sm={6}>
                                                                                <Form.Check inline label="Yes" type="radio" name="amberE" />
                                                                                <Form.Check inline label="No" type="radio" name="amberE" />
                                                                            </Col>
                                                                        </Row>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </Container1>
                                        </Tab>

                                        <Tab eventKey="green" title="GREEN TRANSACTION CATEGORY">
                                            <Container1>
                                                <div id='greenCategory'>
                                                    <PWrapper>
                                                        <br />
                                                        <h6 className="pt-1" style={{ fontSize: "10px", color: "green" }}>GREEN CATEGORY</h6>
                                                    </PWrapper>
                                                    <Form.Group>
                                                        <Row>
                                                            <Col sm={12}>
                                                                <Form.Group>
                                                                    <Row>
                                                                        <Col>
                                                                            <Form.Label style={{ paddingRight: "1rem" }}>Transaction has obtained Credit Committee approval:</Form.Label>
                                                                        </Col>
                                                                        <Col>
                                                                            <Form.Check inline label="Yes" type="radio" name="greenA" ref={greenA} />
                                                                            <Form.Check inline label="No" type="radio" name="greenA" ref={greenA} />
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>
                                                            </Col>

                                                            {/*--------------------------------------------- -------------------------- --------------- */}
                                                            <Col sm={12}>
                                                                <Form.Group>
                                                                    <Row>
                                                                        <Col>
                                                                            <Form.Label style={{ paddingRight: "1rem" }}>Guarantee Document in agreed form:</Form.Label>
                                                                        </Col>
                                                                        <Col>
                                                                            <Form.Check inline label="Yes" type="radio" name="greenB" ref={greenB} />
                                                                            <Form.Check inline label="No" type="radio" name="greenB" ref={greenB} />
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>

                                                            </Col>


                                                            {/**---------------------------------------------------------------------------------------- */}
                                                            <Col sm={12}>
                                                                <Form.Group>
                                                                    <Row>
                                                                        <Col>
                                                                            <Form.Label style={{ paddingRight: "1rem" }}>Professional Parties to the Bond Issue appointed or selected:</Form.Label>
                                                                        </Col>
                                                                        <Col>
                                                                            <Form.Check inline label="Yes" type="radio" name="greenC" ref={greenC} />
                                                                            <Form.Check inline label="No" type="radio" name="greenC" ref={greenC} />
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>

                                                            </Col>

                                                            {/*--------------------------------------------------------------------------------------- */}
                                                            <Col sm={12}>
                                                                <Form.Group>
                                                                    <Row>
                                                                        <Col>
                                                                            <Form.Label style={{ paddingRight: "1rem" }}>Already filed or expected filing with SEC (or equivalent Exchange) within 6 weeks:</Form.Label>
                                                                        </Col>
                                                                        <Col>
                                                                            <Form.Check inline label="Yes" type="radio" name="greenD" ref={greenD} />
                                                                            <Form.Check inline label="No" type="radio" name="greenD" ref={greenD} />

                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>

                                                            </Col>
                                                            {/*---------------------------------------------------------------------------------------- */}
                                                            <Col sm={12}>
                                                                <Form.Group>
                                                                    <Row>
                                                                        <Col>
                                                                            <Form.Label style={{ paddingRight: "1rem" }}>All Materials CPs to Financial Close have been satisfactorily met or committed by the Client for completion on or before Financial Close:</Form.Label>
                                                                        </Col>
                                                                        <Col>
                                                                            <Form.Check inline label="Yes" type="radio" name="greenE" ref={greenE} />
                                                                            <Form.Check inline label="No" type="radio" name="greenE" ref={greenE} />
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Group>


                                                            </Col>
                                                            {/*-------------------------------------------------------------------------------------- */}
                                                            <Col sm={12}>
                                                                <Form.Group>
                                                                    <Row>
                                                                        <Col>
                                                                            <Form.Label style={{ paddingRight: "1rem" }}>Financial Close expected within 3-6 months:</Form.Label>
                                                                        </Col>
                                                                        <Col>
                                                                            <Form.Check inline label="Yes" type="radio" name="greenF" ref={greenF} />
                                                                            <Form.Check inline label="No" type="radio" name="greenF" ref={greenF} />

                                                                            <ButtonWrapper type="submit" className='d-flex justify-content-end' onClick={postData}>
                                                                                Submit
                                                                            </ButtonWrapper>

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
                                    <button onClick={e => toPrevTab(e)} style={{ display: 'block' }}> Prev</button>
                                </Tab>
                            </Tabs>
                            {/*------------------------------------------ End Tab -------------------------------------- */}
                        </div>

                    </Form>
                </Container>
            </FormWrapper>
        </React.Fragment>
    )
}