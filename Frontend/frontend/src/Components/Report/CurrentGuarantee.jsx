import React, { useContext } from "react";
import { Container, Row, Col} from "react-bootstrap";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Editable from "react-editable-title";
import TitleContext from "../../context/TitleContext";
import GeneralPie from "./GeneralPie";

export default function CurrentGuarantee() {
  const handleTextUpdate = (current) => {
    addTitle(current);
  };
  const { addTitle, cartTitle } = useContext(TitleContext);

  console.log(cartTitle);

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
        <text x={cx} y={cy} dy={8} textAnchor="left"></text>
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
            fontWeight: "bold",
            marginLeft: "",
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
        <div className='pt-1'>
        Gross guarantee fee income is based on total guarantee guarantees issued since inception of 77 6
        Billion through 31 December 2021 In FY 2021 a total of N 34 1 in guarantee transactions have reached 
        financial close The pipeline of active mandates comprises
        </div>
      </Container>
      <Container fluid>
        <Row className="py-1 my-1">
          <Col sm={6}>
            <p
              className="text-success text-center"
              style={{ fontWeight: "", fontSize: "12px" }}
            >
              Analysis of Guarantee Transactions Since Inception of NGN77.6
              Billion as at 31 December 2021.
            </p>
            <ResponsiveContainer width="120%" height={265}>
              <PieChart margin={{ top: 10, right: 0, bottom: 0 }}>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="40%"
                  cy="50%"
                  fill="#8884d8"
                  innerRadius={67}
                  outerRadius={220 / 2}
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
              </PieChart>
            </ResponsiveContainer>
          </Col>
          <Col sm={6}>
            <p
              className="text-success text-center"
              style={{ fontWeight: "", fontSize: "12px" }}
            >
              Categorisation of NGN311.5 Billion of Mandated Transactions as at
              31 December 202
            </p>
            <GeneralPie />
          </Col>
        </Row>
        
      </Container>
    </React.Fragment>
  );
}
