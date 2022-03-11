import React from 'react'
import { Container,Row,Col, ProgressBar, Card } from 'react-bootstrap';
import styled from 'styled-components';

const ProgressBarDiv = styled.div`
display:grid;
grid-template-columns: 1fr 2fr;
justify-content:center;
font-size:10px;
padding:4px 15px;
border-radius:20px;

`;

export default function Progress() {
    return(
        <>
            <Container>
                <Row>
                    <Col sm={12} className="my-3">
                        <div style={{background:'white',padding:'10px',marginTop:'3px', borderRadius:'10px'}}>
                            <p style={{fontSize:'12px', paddingLeft:'12px'}}>Origination Incentive Earned</p>

                            <ProgressBarDiv>
                                <div>
                                    <p>100%</p>
                                    <p>50%</p>
                                </div>
                                <ProgressBar striped variant='success' now={10}/>
                            </ProgressBarDiv>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}