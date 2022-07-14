import React from 'react'
import styled from 'styled-components';
import {Row, Col, Container} from 'react-bootstrap';
import SideNav2 from '../LandingPage/SideNav2';
import Navbar from '../LandingPage/Navbar';
import AddForecast from './AddForecast';
import AddIndustry from './AddIndustry';
import AddProduct from './AddProduct';
import AddLevel from './AddLevel';
import AddPerformancePay from './AddPerformancePay';
import UpdateIndustry from './UpdateIndustry';
import UpdateProduct from './UpdateProduct';
import UpdateLevel from './UpdateLevel';
import UpdateForecast from './UpdateForecast';

const ViewWrapper = styled.div`
  margin:0;
  padding: 0px 10px;
`;

const Styling = styled.div`
  margin: 10px;
  padding: 5px;
`

export default function Settings () {
    return (
      <>
        <Navbar />
        <ViewWrapper>
          <Row>
            <Col sm={2} style={{padding:'10px 10px 10px 0px'}}>
              <SideNav2/>
            </Col>
      
            <Row className='mb-2' style={{marginLeft: "16%"}} >
              <Container style={{marginLeft: "1rem", width: "80%", background:'white', borderRadius: "15px" }}>
                <Styling>
                  <Row>
                    <Col sm={5} style={{marginLeft: "10px"}}>
                      <AddProduct />
                      <AddForecast />
                      
                    </Col>

                    <Col sm={5} style={{marginLeft: "10%"}}>
                      <AddIndustry />
                      <AddLevel />
                    </Col>
                  </Row>
                </Styling>
              </Container>
            </Row>

            <Row className='mb-2' style={{marginLeft: "16%"}}>
              <Container style={{marginLeft: "1rem", width: "80%", background:'white', borderRadius: "15px" }}>
                <Styling>
                  <Row>
                    <Col sm={5} style={{marginLeft: "10px"}}>
                      <UpdateForecast />
                      <UpdateIndustry />
                    </Col>
                  
                    <Col sm={5} style={{marginLeft: "10%"}} >
                      <UpdateLevel />
                      <UpdateProduct />
                    </Col>
                  </Row>
                </Styling>
              </Container>
            </Row>
          </Row>
        </ViewWrapper>
      </>
    )
}
