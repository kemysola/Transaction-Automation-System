import React from 'react'
import styled from 'styled-components';
import {Row, Col, Container} from 'react-bootstrap';
import SideNav2 from '../LandingPage/SideNav2';
import Navbar from '../LandingPage/Navbar';
import ForecastSettings from './ForecastSettings';
import IndustrySettings from './IndustrySettings';
import ProductSettings from './ProductSettings';
import LevelSettings from './LevelSettings';
import PerformanceSettings from './PerformanceSettings';

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

            <Col sm={10}>
              <Container style={{ marginLeft: "1rem ", background:'white', borderRadius: "15px" }}>
                    <ForecastSettings />
                    <IndustrySettings />
                    <ProductSettings />
                    <LevelSettings />
                    <PerformanceSettings />
              </Container>
            </Col>
          </Row>
        </ViewWrapper>
      </>
    )
  
}
