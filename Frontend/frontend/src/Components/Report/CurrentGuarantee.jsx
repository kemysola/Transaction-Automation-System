import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Stack, Table } from "react-bootstrap";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import ReactTable from "react-table";
import GuaranteePortGrowthVsTar from "./GuaranteePortGrowthVsTar";
import FinancialYearGPipeline from "./FinancialYearGPipeline";
import OriginationActivity from "./OriginationActivity";
import StructuringExecution from "./StructuringExecution";
import Editable from "react-editable-title";
import TitleContext from "../../context/TitleContext";
import GeneralPie from "./GeneralPie";


export default function CurrentGuarantee() {
  const [title, setTitle] = useState("")
  // useState("Current Guarantee Portfolio")
  const handleTextUpdate = current => {
    setTitle(current);
    addTitle(current)

  };
  const {addTitle, cartTitle} = useContext(TitleContext)

  console.log(cartTitle)



    // ******************************************  static data shared  ****************************************

  const data = [
    { name: "GPC", value: 26 },
    { name: "GELUL", value: 17 },
    { name: "LFZC", value: 13 },
    { name: "TSL", value: 15 },
    { name: "North Soth Power", value: 14 },
    { name: "VIATHAN", value: 15 },
  ];
  const data1 = [
    { name: "GPC", value: 89 },
    { name: "GELUL", value: 7 },
    { name: "LFZC", value: 4 },
    
  ];

    // ******************************************  Color selection for the pie chart ****************************************

  const COLORSS = ["red", "#FFBB28", "#00C49F"];
  const COLORS = ["#FF4500", "#FFBB28", "#00C49F", "GREEN", "BLUE", "PURPLE"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <>
        <text x={cx} y={cy} dy={8} textAnchor="left">
        </text>
        <text
          x={x}
          y={y}
          fill="black"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      </>
    );
  };

  // ....................... Recharts customTooltip .........................................

  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "white",
            height: "30px",
            padding: "2px 2px",
          }}
        >
          <p className="label">
            {`${payload[0].name} : 
            ₦${payload[0].value.toLocaleString("en-US", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 2,
            })}bn`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <React.Fragment>
      <Container fluid>
      <p
        style={{
          fontWeight:'bold',
          marginLeft:''
        }}
      >

        <Editable
          text={cartTitle}
          editButtonStyle={{ lineHeight: "unset" }}
          editButton
          editControlButtons
          placeholder="Type here"
          cb={handleTextUpdate}
          
        />
        </p>
        <div>
        </div>
      </Container>
      <Container fluid>
        <Row className="py-2 my-2">
          <Col sm={6}>
            <p
              className="text-success text-center"
              style={{ fontWeight: "", fontSize: "12px" }}
            >
              Analysis of Guarantee Transactions Since Inception of NGN77.6
              Billion as at 31 December 2021.
            </p>
            {/* <PieChart width={340} height={210}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                fill="#8884d8"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={1}
                isAnimationActive={true}
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={customTooltip} />
            </PieChart> */}
          </Col>
          <Col sm={6}>
            <p
              className="text-success text-center"
              style={{ fontWeight: "", fontSize: "12px" }}
            >
              Categorisation of NGN311.5 Billion of Mandated Transactions as at
              31 December 202
            </p>
            {/* <GeneralPie/> */}
            
          </Col>
        </Row>
        <Container className="my-3 py-1">
          <p
            style={{ fontWeight: "bold", fontSize: "16px" }}
          >
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
            <p  className='py-1' style={{fontWeight:'bold', fontSize:'11px'}}>PERIOD ENDING STATISTICS</p>
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
                <td>{`Advanced Mandates (to close in < 6  months)`}  </td>
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
      </Container>
      <GuaranteePortGrowthVsTar />
      <FinancialYearGPipeline />
      <OriginationActivity />
      <StructuringExecution />
    </React.Fragment>
  );
}
