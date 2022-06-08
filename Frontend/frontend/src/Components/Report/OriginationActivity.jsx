import React from "react";
import { Stack, Container, Row, Col, Table } from "react-bootstrap";

export default function OriginationActivity() {
  return (
    <React.Fragment>
      <Container>
        <Stack gap={2}>
          <p className="" style={{ fontWeight: "bold" }}>
            Origination Activity – Q4 2021
          </p>
        </Stack>
        <div>
          <p style={{ fontWeight: "bold" }}>
            NBC Submissions and Mandate Status – Q4 2021 Update
          </p>
          <li>Executed seven (7) new mandates: Urban Shelter, Accugas, ACOB Lighting, GVE, LFZC, Greenville and Falcon.</li>
          <li>Received six (6) NBC
          approvals for prospects: Accugas, Solad, GVE Projects, ACOB Lighting,
          Greenville and LFZC.
            </li>  
            <li>The following table summarises all Q4 2021
          submissions to NBC:</li> 
          {/* table * sn    */}
          <Table striped bordered hover className="my-3 py-1">
  <thead style={{fontSize:'12px'}}>
    <tr>
    <th>S/n</th>
         <th  > Infrastructure Entity </th>
         <th>Infrastructure Activity </th>
         <th>Brief Description </th>
         <th>  Size (N’b) </th>
         <th> NBC/Mandate Status </th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>1</td>
         <td>N31.5 billion</td>
         <td> N123.9 billion</td>
         <td>N62.5 billion</td>
         <td>N43.9 billion</td>
         <td>N93.0 billion</td>
    </tr>
    <tr>
    <td>2</td>
         <td>N43.5 billion</td>
         <td>N203.5 billion</td>
         <td>N70.6 billion</td>
         <td>N93.0 billion</td>
         <td>N93.0 billion</td>
    </tr>
    <tr>
    <td>3</td>
         <td>N77.6 billion</td>
         <td>N 311.5 billion</td>
         <td>N 311.5 billion</td>
         <td>N191.4 billion</td>
         <td>N93.0 billion</td>
    </tr>
   
  </tbody>
</Table>

<li>Recent leads under review which may proceed to NBC in the near future include:</li>
<Table striped bordered hover className="my-3 py-1">
  <thead style={{fontSize:'12px'}}>
    <tr>
    <th>S/n</th>
         <th  > Infrastructure Entity </th>
         <th>Infrastructure Activity </th>
         <th>Brief Description  </th>
         <th> Size (N’b) </th>
         <th> NBC/Mandate Status </th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>1</td>
         <td>N31.5 billion</td>
         <td> N123.9 billion</td>
         <td>N62.5 billion</td>
         <td>N43.9 billion</td>
         <td>N93.0 billion</td>
    </tr>
    <tr>
    <td>2</td>
         <td>N43.5 billion</td>
         <td>N203.5 billion</td>
         <td>N70.6 billion</td>
         <td>N93.0 billion</td>
         <td>N93.0 billion</td>
    </tr>
    <tr>
    <td>3</td>
         <td>N77.6 billion</td>
         <td>N 311.5 billion</td>
         <td>N 311.5 billion</td>
         <td>N191.4 billion</td>
         <td>N93.0 billion</td>
    </tr>
   
  </tbody>
</Table>
        </div>
      </Container>
    </React.Fragment>
  );
}
