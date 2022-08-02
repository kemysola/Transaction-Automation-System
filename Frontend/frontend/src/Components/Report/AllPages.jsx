import React , {useState,useEffect} from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import Navbar from '../LandingPage/Navbar'
import Sidenav from '../LandingPage/SideNav2'
import CurrentGuarantee from './CurrentGuarantee'
// import GuaranteePortGrowthVsTar from './GuaranteePortGrowthVsTar';
import Services from '../../Services/Service'
import GeneralPie from './GeneralPie'

export default function AllPages() {
 

  return (
    <React.Fragment>
      <Navbar/>
      <Row>
        <Col sm='3'>
          <Sidenav/>
        </Col>
        <Col sm ='8'>
          <CurrentGuarantee/>
        </Col>
      </Row>
    </React.Fragment>
  )
}
