import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MainCards from "./MainCards";
import SideNav2 from "./SideNav2";
import styled from "styled-components";
import Navbar from "./Navbar";
import Services from "../../Services/Service";

const LandingWrapper = styled.div`
  margin: 0;
  padding: 0 10px;
  @media only screen and (max-width: 720px) {
}
`;

const Landing = () => {

  useEffect(() => {
    retrieveFY();
  }, []);
  
  const retrieveFY = () => {
    Services.getFY("''")
    .then((response) => {
        response.data.financial_years.map(fy => {
          if(fy.fy_status == 'Active') {
            localStorage.setItem("fy", JSON.stringify(fy.fy))
          }
        })
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
  return (
    <React.Fragment>
      <Navbar />
      <LandingWrapper>
        <Row>
          <Col sm={3} style={{ padding: "10px" }}>
            <SideNav2 />
          </Col>
          <Col sm={8}>
            <MainCards />
          </Col>
        </Row>
      </LandingWrapper>
    </React.Fragment>
  );
};

export default Landing;
