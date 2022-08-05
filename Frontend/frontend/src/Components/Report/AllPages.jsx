import React , {useState,useEffect} from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import Navbar from '../LandingPage/Navbar'
import Sidenav from '../LandingPage/SideNav2'
import CurrentGuarantee from './CurrentGuarantee'
// import GuaranteePortGrowthVsTar from './GuaranteePortGrowthVsTar';
import Services from '../../Services/Service'
import GeneralPie from './GeneralPie'
import FinancialYearGPipeline from './FinancialYearGPipeline'
import GuaranteePortGrowthVsTar from './GuaranteePortGrowthVsTar'
import OriginationActivity from './OriginationActivity'
import StructuringExecution from './StructuringExecution'
import { Divider } from '@mui/material'
import KeyStats from './KeyStats'

export default function AllPages() {
 

  return (
    <React.Fragment>
      <Navbar/>
      <Row>
        <Col sm='2'>
          <Sidenav/>
        </Col>
        <Col sm ='9'>
          <CurrentGuarantee/>

        </Col>
        <Divider></Divider>
        <Container>
        <KeyStats/>
        </Container>

      </Row>
      <Container>
        <GuaranteePortGrowthVsTar/>
      <FinancialYearGPipeline/>
      <OriginationActivity/>
      <StructuringExecution/>
      </Container>
      
    </React.Fragment>
  )
}
