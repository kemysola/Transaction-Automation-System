import React from 'react'
import { Container,Row,Col, ProgressBar, Card } from 'react-bootstrap';
import styled from 'styled-components';
import GuarPipe from './GuarPipe';
import Stats from './Stats';

const ProgressBarDiv = styled.div`
display:grid;
grid-template-columns: 1fr 2fr;
justify-content:center;
font-size:10px;
padding:4px 15px;
border-radius:20px;

`;
export default function Progress(){
    

    return(
        <React.Fragment>
            <Stats/>
            <Container>
                <Row style={{marginTop:'13px '}}>
                    <Col sm={12} lg={6} className="my-3">
                        <div style={{background:'white',padding:'10px',marginTop:'3px', borderRadius:'10px'}} > 
                        <p style={{fontSize:'12px', paddingLeft:'12px'}}>PRODUCT</p>

                        <ProgressBarDiv>

                            <div>
                                <p>Public Bond</p>
                                <p>Blended Finance</p>
                                <p>Contigent Refi. Gte</p>
                                <p>Private Bond (Clean Energy)</p>
                            </div>
                            <div>
                            <ProgressBar variant="success" now={60}  className='mb-3'/>
                            <ProgressBar variant="success" now={50} className='mb-3'/>
                            <ProgressBar variant="success" now={40} style={{marginBottom:'15px'}}/>
                            <ProgressBar variant="success" now={20} className='mb-1'/>
                            </div>

                        </ProgressBarDiv>
                        </div>
                    

                    </Col>
                {/*------------------------ Column ------------------------------- */}
                <Col sm={12} lg={6} className="my-3">
                        <div style={{background:'white', padding:'10px',marginTop:'3px',borderRadius:'10px'}} > 
                        <p style={{fontSize:'12px', paddingLeft:'12px'}}>INDUSTRY</p>

                        <ProgressBarDiv>

                            <div>
                                <p>Gas</p>
                                <p>Transportation</p>
                                <p>ICT/Telecoms</p>
                                <p>Inputs to Infra</p>
                                <p>Affordable Housing</p>
                                <p>Water/Waste</p>
                                <p>Off-grid Power</p>
                                <p>Healthcare</p>
                                <p>Education Infra</p>
                                <p>Agric Infra</p>
                                <p>On-grid Power</p>
                            </div>
                            <div>
                            <ProgressBar variant="success" now={60}  className='mb-3'/>
                            <ProgressBar variant="success" now={50} className='mb-3'/>
                            <ProgressBar variant="success" now={40} style={{marginBottom:'15px'}}/>
                            <ProgressBar variant="success" now={20} className='mb-1' />
                            <ProgressBar variant="success" now={60}  className='mb-3'/>
                            <ProgressBar variant="success" now={50} className='mb-3'/>
                            <ProgressBar variant="success" now={40} style={{marginBottom:'15px'}}/>
                            <ProgressBar variant="success" now={20} className='mb-1' />
                            <ProgressBar variant="success" now={60}  className='mb-3'/>
                            <ProgressBar variant="success" now={50} className='mb-3'/>
                            <ProgressBar variant="success" now={40} style={{marginBottom:'15px'}}/>
                            
                            </div>

                        </ProgressBarDiv>
                        </div>
                    

                    </Col>
                {/*------------------------ Column ------------------------------- */}

                </Row>
            </Container>
            <br/>
            <GuarPipe/>
            
        </React.Fragment>
    )
}