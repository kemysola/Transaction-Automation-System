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

const ViewWrapper = styled.div`
  margin:0;
  padding: 0px 10px;
`;

export default function Settings () {
    return (
      <>
        <Navbar />
        <ViewWrapper>
          <Row>
            <Col sm={2} style={{padding:'10px 10px 10px 0px'}}>
              <SideNav2/>
            </Col>

            <Col sm={5}>
              <Container style={{ marginLeft: "1rem ", background:'white', borderRadius: "15px" }}>
                    <AddForecast />
                    <AddIndustry />
                    <AddProduct />
                    <AddLevel />
                    {/* <AddPerformancePay /> */}
              </Container>
            </Col>

            <Col sm={5}>
              <Container style={{ marginLeft: "1rem ", background:'white', borderRadius: "15px" }}>
                    <AddForecast />
                    <UpdateIndustry />
                    <UpdateProduct />
                    <UpdateLevel />
                    {/* <PerformanceSettings /> */}
              </Container>
            </Col>
          </Row>
        </ViewWrapper>
      </>
    )
}
