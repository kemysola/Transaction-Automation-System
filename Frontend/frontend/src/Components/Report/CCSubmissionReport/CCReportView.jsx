import React , {useState,useEffect} from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import styled from 'styled-components';
import Navbar from '../../LandingPage/Navbar'
import SideNav from '../../LandingPage/SideNav2'
import CCReport from './CCReport';

const ViewWrapper = styled.div`
  margin:0;
  padding: 0 10px;
`;

export default function CCReportView() {
  return (
    <React.Fragment>
      <Navbar/>
      <ViewWrapper>
        <Row>
          <Col sm={3} style={{padding:'10px 10px 10px 0px'}}>
            <SideNav/>
          </Col>

          <Col sm={9}>
            <Container>
              <CCReport />
            </Container>
          </Col>
        </Row>
      </ViewWrapper>

    </React.Fragment>
  )
}
