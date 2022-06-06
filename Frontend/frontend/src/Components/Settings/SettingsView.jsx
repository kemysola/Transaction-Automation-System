import React from 'react'
import styled from 'styled-components';
import {Row, Col, Container} from 'react-bootstrap';
import SideNav2 from '../LandingPage/SideNav2';
import Navbar from '../LandingPage/Navbar';
import Setting from './Settings'
import ForecastSettings from './ForecastSettings';
import IndustrySettings from './IndustrySettings';
import PerformanceSettings from './PerformanceSettings';
import SettingsNav from './SettingsNav';


const ViewWrapper = styled.div`
  margin:0;
  padding: 0 10px;
`;

export default function Settings () {
    return (
      <>
        <Navbar />
        {/* <ViewWrapper> */}
          <Row>
            <Col sm={2} style={{padding:'10px 10px 10px 0px'}}>
              <SideNav2/>
            </Col>

            <Col sm={10}>
              <Container style={{ marginLeft: "1rem ", background:'white', borderRadius: "15px" }}>
                <Row>
                  <Col sm={2}>
                    {/* <SettingsNav /> */}
                  </Col>

                  <Col sm={9}>
                    <Setting />
                    <ForecastSettings />
                    <IndustrySettings />
                    <PerformanceSettings />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        {/* </ViewWrapper> */}
      </>
    )
  
}
