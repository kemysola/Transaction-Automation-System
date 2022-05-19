import React, {useEffect, useMemo, useState, useCallback} from 'react'
import {Container, Crad, Row , Col} from 'react-bootstrap'
import GuaranteePipeline from './managementCards/GuaranteePipeline'
import GreenAndAnberCard from './managementCards/GreenAndAnberCard'
import GreenDealCard from './managementCards/GreenDealCard'
import NewDeals from './managementCards/NewDeals'
import Scope from './managementCards/Scope';





export default function Matrics() {
  return (
      <React.Fragment>
        <Container fluid className='bg-light py-3 my-1'>
        <Row >
          <Col lg={6} className='mt-3'>
            <GuaranteePipeline/>
          </Col>
          <Col lg={6} className='mt-3'>
            <GreenAndAnberCard/>
          </Col>
          <Col lg={6} className='mt-3'>
            <GreenDealCard/>

          </Col>
          <Col lg={6} className='mt-3'>
            <NewDeals/>
          </Col>
        </Row>
        
        </Container>
        
      </React.Fragment>
  )
}
