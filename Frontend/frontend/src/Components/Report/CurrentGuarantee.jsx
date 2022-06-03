import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default function CurrentGuarantee() {
  return (
      <React.Fragment>
          <div>Current Guarantee Portfolio</div>
          <Container>
              <div>Gross guarantee fee income is based on total guarantees issued sinced inception of 77.6 Billion through
                  31 December 2021. In FY2021, a total of N34.1 in guarantee transactions have reached financial close. The pipleine
                  of active mandates comprises 35 transactions totaling N311.5 billion, of which N103.4 billion isprojected to close
                  in FY2022.
              </div>
          </Container>
          <Container>
              <Row>
                  <Col sm={6}>
                      <p className='text-success text-center'>
                          Analysis of Guarantee Transactions Since Inception of NGN77.6 Billion as at 31 December 2021.
                      </p>
                      <br/>
                      {/* pie chart */}
                  </Col>
                  <Col sm={6}>
                      <p className='text-success text-center'>
                          Categorisation of NGN311.5 Billion of Mandate Transactions at 31 December 2021.
                      </p>
                      <br/>
                      {/* pie chart ---- Red, green and amber : red 89%, NGN278.9B ..... green: 7% - NGN21.0B
                      Red: 4% -- NGN11.6B
                       */}
                  </Col>

              </Row>
              <Container>
                  <div>Key Statistics on O & S Activity - Inception to Date</div>
                  {/* Table..... Summary of Key Activity  .... 2017-19, 2020, 2021, 2022 
                  Period Ending Statistics:
                  Size of Guaranteed Transactions Since Inception N31.5 billion , N43.5 billion , N77.6 billion
                  Size of Mandated Deal Pipeline(period-end) N123.9 billion N203.5 billion N 311.5 billion
                  Advanced Mandates (to close in < 6months) N62.5 billion , N70.6 billion, N63.6 billion
                  Longer Mnadates ( to close in > 6 months) N43.9 billion,N93.0 billion,N191.4 billion
                  Contingent Refs (long -led GreenField)  N17.5 billion,N39.9 billion, N56.5 billion
                  



                  */}

              </Container>
          </Container>
      </React.Fragment>
  )
}
