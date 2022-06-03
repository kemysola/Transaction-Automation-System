import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export default function GuaranteePortGrowthVsTar() {
  return (
      <React.Fragment>
          <Container>
              <div>Guarantee Portfolio Growth Vs. Target</div>
              <div>Infracredit projected guarantee portfolio growth (indicative) is based on the assumption that initial operations were expected to commence at a conservative level, with the Company
                  able to underwrite an initial transaction with NGN10 Billion face value,then progresssively ramp up scale to over N500 Billion over a 5 year period. Throughout the past 3 years, manageement built a sizeable pipeline of manadated transactions, providing a base to achieve future growth targets.
              </div>
              <div>
                  {/* graph projection from 2018-2025:
                  2018: 10
                  2019: 31.5
                  2020: 43.5
                  2021:77.6
                  2022:181
                  2023:301
                  2024:440
                  2025: 585
                   */}
              </div>
              <div>
                  <p>Progress on Guarantee Target through 31 December 2021 and Near-Term Forecast:</p>
                  <p>Of seven (7) advanced transactions, up to five (5) totaling of N38.1 Billion may reach financial
                      close in Q1 2022 , including a minimum of N14.1 Billion:
                  </p>
              </div>
              <div>
                  <Row>
                      <Col sm={6}>
                          {/* table :s/n infrasture entity infrastructure activity/industry, size , expecte closing */}
                      </Col>
                      <Col sm={6}>
                          <p>Expected Financcial Close by Quarter (Cumm) </p>
                          {/* graph : q1 2022, q2 2022 q3 2022 q4 2022 */}
                      </Col>

                  </Row>
              </div>
          </Container>
      </React.Fragment>
  )
}
