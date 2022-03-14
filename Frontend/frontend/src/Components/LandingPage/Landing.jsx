import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MainCards from "./MainCards";
import SideNav2 from "./SideNav2";
import styled from "styled-components";
import Navbar from "./Navbar";

const LandingWrapper = styled.div`
  margin: 0;
  padding: 0 10px;
`;

const Landing = () => {
  return (
    <React.Fragment>
      <Navbar />
      <LandingWrapper>
        <Row>
          <Col sm={3} style={{ padding: "10px" }}>
            <SideNav2 />
          </Col>
          <Col sm={9}>
            <MainCards />
          </Col>
        </Row>
      </LandingWrapper>
    </React.Fragment>
  );
};

export default Landing;
