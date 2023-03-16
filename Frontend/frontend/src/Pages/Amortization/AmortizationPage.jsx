import React from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import SideNav2 from "../../Components/LandingPage/SideNav2";
import Navbar from "../../Components/LandingPage/Navbar";
import StaffTable from "../../Components/Staffs/StaffTable";
import Amortization from "../../Components/Budget/pages/Amortization";


const ViewWrapper = styled.div`
  background: #eff1f1;
  padding: 0 10px;
  margin:0 2rem 2rem 0;
  @media screen and (max-width: 768px) {
      overflow-y: auto;
      height: 100vh;
}
`;

export default function AmortizationPage() {
  return (
    <React.Fragment>
      <Navbar />
      <ViewWrapper>
        <Row>
          <Col sm={3} style={{padding:'10px 10px 10px 0px'}}>
            <SideNav2 />
          </Col>
          <Col sm={9} className='my-1'>
          <h2 style={{color: "steelblue",fontSize:'15px', marginLeft:'13px'}} >Amortization</h2>
            <Amortization />
          </Col>
        </Row>
      </ViewWrapper>
    </React.Fragment>
  );
}
