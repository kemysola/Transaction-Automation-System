import React from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import SideNav2 from "../../Components/LandingPage/SideNav2";
import Navbar from "../../Components/LandingPage/Navbar";
import StaffTable from "../../Components/Staffs/StaffTable";


const ViewWrapper = styled.div`
  background: #eff1f1;
  margin:0 2rem 2rem 0;
  padding: 0 10px;
  @media screen and (max-width: 768px) {
      overflow: auto;
      height: 100vh;
      margin-left: 2em;
}
`;

export default function AllStaff() {
  return (
    <React.Fragment>
      <Navbar />
      <ViewWrapper>
        <Row>
          <Col sm={3} style={{padding:'10px 10px 10px 0px'}}>
            <SideNav2 />
          </Col>
          <Col sm={9} className='bg-light my-3'>
            <StaffTable />
          </Col>
        </Row>
      </ViewWrapper>
    </React.Fragment>
  );
}
