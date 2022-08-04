import React from 'react';
import { Container, Row, Col,Table } from "react-bootstrap";


export default function KeyStats() {
  return (
    <>
    <Container className="my-3 py-1">
          <p style={{ fontWeight: "bold", fontSize: "16px" }} className='text-center mt-2'>
            Key Statistics on O & S Activity - Inception till Date
          </p>

          <Table striped bordered hover>
            <thead style={{ fontSize: "12px" }}>
              <tr>
                <th>SUMMARY OF KEY ACTIVITY</th>
                <th>2017-19 </th>
                <th>2020</th>
                <th>2021</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>New Guarantees Executed </td>
                <td>3 </td>
                <td>1 </td>
                <td>4</td>
              </tr>
              <tr>
                <td>Size of New Guarantees Executed </td>
                <td>N 31.5 billion</td>
                <td>N 12.0 billion </td>
                <td>N 34.1 billion</td>
              </tr>
              <tr>
                <td>New Mandates Signed (excl. Follow-On Mandates) </td>
                <td>14 </td>
                <td>10 </td>
                <td>22</td>
              </tr>
              <tr>
                <td>Size of New Mandates Signed</td>
                <td>N160.3 billion</td>
                <td> N132.9 billion </td>
                <td> N284.5 billion</td>
              </tr>
              <tr>
                <td>Size of Follow-On Mandates</td>
                <td>N3.6 billion</td>
                <td> N/A</td>
                <td> N/A</td>
              </tr>
              <tr>
                <td>New Business Committee (NBC) Approvals</td>
                <td>25</td>
                <td>14</td>
                <td> 25</td>
              </tr>
              <tr>
                <td>% NBC Approvals Converted to Mandates</td>
                <td>60.0%</td>
                <td>78.6%</td>
                <td> 80.0%</td>
              </tr>
            </tbody>

            <tbody>
              <p
                className="py-1"
                style={{ fontWeight: "bold", fontSize: "11px" }}
              >
                PERIOD ENDING STATISTICS
              </p>
              <tr>
                <td>Size of Guaranteed Transactions Since Inception </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Size of Mandated Deal Pipeline (period-end) </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>{`Advanced Mandates (to close in < 6  months)`} </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>{`Longer Mandates (to close in > 6 months)`} </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>{`Contingent Refis (long-lead Greenfield)`}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </Container>
    
    </>
  )
}
