import React from 'react'
import {  Row, Col } from "react-bootstrap";
import Navbar from '../../LandingPage/Navbar';
import Sidenav from '../../LandingPage/SideNav2';
import TopReimbursible from './pages/TopReimbursible';


export default function ComponentView() {
  return (
    <>
    <Navbar/>
    <Row>
      <Col sm={3} lg={2}>
        <Sidenav/>
      </Col>
      <Col sm={8} lg={9}>
        <TopReimbursible/>
      </Col>
    </Row>
    </>
  )
}
