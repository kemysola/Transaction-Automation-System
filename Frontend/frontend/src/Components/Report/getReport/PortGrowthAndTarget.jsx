import React, { useState, useContext } from "react";
import { Container, Table, Form } from "react-bootstrap";

import { Col, Row, Stack } from "react-bootstrap";
import { BarChart, Bar } from "recharts";
import GuaranteeForecast from "../GuaranteeForecast";
import { Divider } from 'antd';
export default function PortGrowthAndTarget(props){
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
    
    return(
        <>
        <Container>
        <div>
        <Divider> Portfolio Growth vs Target</Divider>
          <Stack>
          </Stack>
        </div>
        <div className="d-flex justify-content-start">
          <GuaranteeForecast />
        </div>

        <div className="my-2 pt-3">
          <Divider style={{fontWeiht:'bold'}}>Progress on Guarantee Target through Q4 2023 and Near-Term Forecast:</Divider>

          <Stack gap={1}>
            {/* <p style={{ fontWeight: "bold" }}>Progress on Guarantee Target through Q4 2023 and Near-Term Forecast:</p> */}
            <p>
            {props.header}
            </p>
          </Stack>
          <p>
             
          </p>
        </div>
        <div>
          <Row>
            <Col sm={6} className="my-1">
              <div
                className="d-flex justify-content-end ml-2"
                style={{ cursor: "pointer", height: "1rem" }}
              >
                
              </div>

              <Table striped bordered hover>
                <thead style={{ fontSize: "12px" }}>
                  <tr>
                    <th>Infrastructure Entity</th>
                    <th className="text-center">
                      Infrastructure Activity/Industry{" "}
                    </th>
                    <th className="text-center">Size</th>
                    <th className="text-center">Expected Closing</th>
                  </tr>
                </thead>

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
        </>
    )
}