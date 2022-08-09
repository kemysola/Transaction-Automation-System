import React,{useState} from "react";
import { Col, Container, Row, Stack, Table } from "react-bootstrap";
import {
  BarChart,
  Bar
} from "recharts";



export default function GuaranteePortGrowthVsTar() {
  

  const [currentGt, setCurrentGt] = useState("InfraCredit’s projected guarantee portfolio growth (indicative) is based on the assumption that initial operations were expected to commence at a conservative level, with the Company able to underwrite an initial transaction with NGN10 Billion face value, then progressively ramp up scale to over NGN500 Billion over a 5-year period. Throughout the past 3 years, management built a sizeable pipeline of mandated transactions, providing a base to achieve future growth targets.");
  const handleInputUpdate = (current) => {
    setCurrentGt(current);
    // addTitle(current)
  };
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page F",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page G",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
  ];

  return (
    <React.Fragment>
      <Container fluid>
        <div>
          <Stack>
            <p style={{ fontWeight: "bold" }} className=' mt-1 pt-2'>
              Guarantee Portfolio Growth Vs. Target
            </p>
          </Stack>
        </div>
        <div>
        </div>
        <div>
          <br />
          <br />
          <BarChart width={380} height={200} data={data}>
            <Bar dataKey="uv" fill="#8884d8" />
          </BarChart>
        </div>

        <div className="my-2 pt-3">
          <Stack gap={1}>
            <p style={{ fontWeight: "bold" }}>
              Progress on Guarantee Target through 31 December 2021 and
              Near-Term Forecast:
            </p>
          </Stack>
          <p>
            Of seven (7) advanced transactions, up to five (5) totaling of N38.1
            Billion may reach financial close in Q1 2022 , including a minimum
            of N14.1 Billion:
          </p>
        </div>
        <div>
          <Row>
            <Col sm={6} className="my-1">
              <Table striped bordered hover>
                <thead style={{ fontSize: "12px" }}>
                  <tr>
                    <th>S/n</th>
                    <th>Infrasture entity </th>
                    <th>Infrastructure activity/industry </th>
                    <th>Size</th>
                    <th>Expected closing </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>N31.5 billion</td>
                    <td> N123.9 billion</td>
                    <td>N62.5 billion</td>
                    <td>N43.9 billion</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>N43.5 billion</td>
                    <td>N203.5 billion</td>
                    <td>N70.6 billion</td>
                    <td>N93.0 billion</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>N77.6 billion</td>
                    <td>N 311.5 billion</td>
                    <td>N 311.5 billion</td>
                    <td>N191.4 billion</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col sm={6} className="">
            <div className="d-flex justify-content-center">
            <p
                classNmae="text-center"
                style={{ fontWeight: "bold", fontSize: "12px" }}
              >
                Expected Financial Close by Quarter (Cumm)
              </p>
            </div>
              
              {/* graph : q1 2022, q2 2022 q3 2022 q4 2022 */}
              <br />
              <div className="d-flex justify-content-center">
                <BarChart width={300} height={200} data={data}>
                  <Bar dataKey="uv" fill="#8884d8" />
                </BarChart>
              </div>
            </Col>
          </Row>
        </div>
       
      </Container>
    </React.Fragment>
  );
}
