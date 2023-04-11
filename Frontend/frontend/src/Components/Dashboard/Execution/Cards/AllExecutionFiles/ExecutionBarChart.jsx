import { useState} from "react";
import styled from "styled-components";
import { Container, Row, Col, Spinner, Stack } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { ResponsiveContainer} from "recharts";
const RedDiv = styled.div`
border-radius: 50px;
background: red;
color: white;
height: 30px;
width: 30px;
margin-top: 10px,
margin-bottom: 10px;
text-align:center;
padding-top:8px;
font-size: 10px;
display:inline-block;
margin-left:1px;
`;
const WhiteDiv = styled.div`
border-radius: 50px;
border:2px solid blue;
background: white;
color:black;
height: 30px;
width: 30px;
margin-top: 10px,
margin-bottom: 10px;
text-align:center;
padding-top:8px;
font-size: 10px;
display:inline-block;
margin-left:1px;
`;

const GreenDiv = styled.div`
  border-radius: 50px;
  background: #00c49f;
  color: white;
  height: 30px;
  width: 30px;
  margin-top: 10px,
  margin-bottom: 10px;
  text-align:center;
  padding-top:8px;
  font-size: 10px;
  display:inline-block;
  margin-left:1px;
`;

const AmberDiv = styled.div`
  border-radius: 50px;
  background: #ffbb28;
  color: white;
  height: 30px;
  width: 30px;
  margin-top: 15px,
  margin-bottom: 2px;
  text-align:center;
  padding-top:8px;
  font-size: 10px;
  display:inline-block;
`;

function ExecutionBarChart({ data }) {
  var red = data.reduce(function (filtered, arr) {
    if (arr.deal_category === "Red") {
      var someNewValue = arr.dealsize;
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);

  var amber = data.reduce(function (filtered, arr) {
    if (arr.deal_category === "Yellow") {
      var someNewValue = arr.dealsize;
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);

  var green = data.reduce(function (filtered, arr) {
    if (arr.deal_category === "Green") {
      var someNewValue = arr.dealsize;
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);


  var redTotal = red.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  var amberTotal = amber.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  var greenTotal = green.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  var sumTotal = data.reduce(function (tot, arr) {
    return tot + parseFloat(arr.dealsize);
  }, 0);

  const chartData = [
    { name: "Red", value: redTotal },
    { name: "Amber", value: amberTotal },
    { name: "Green", value: greenTotal },
  ];

  // ................................. Rechart Piechart Customized Label ...........................

  const COLORS = ["#FF4500", "#FFBB28", "#00C49F"];

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
    const radius = innerRadius + (outerRadius - innerRadius) * 0.1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <>
        <text x={cx} y={cy} dy={8} textAnchor="middle">
          {`₦${sumTotal.toLocaleString("en-US", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 2,
          })}bn`}
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

  const chartLegend = chartData.map((item, i) => {
    if (`${item.name}` === "Amber") {
      return (
        <li key={i} style={{ color: "#FFBF00" }}>
          {item.name}: ₦
          {item.value.toLocaleString("en-US", {
            maximumFractionDigits: 2,
          })}
          bn
        </li>
      );
    }
    return (
      <li key={i} style={{ color: `${item.name}` }}>
        {item.name}: ₦
        {item.value.toLocaleString("en-US", {
          maximumFractionDigits: 2,
        })}
        bn
      </li>
    );
  });

  return (
    <Container fluid className="mb-3 " style={{ borderRadius: "10px" }}>
      <div>
        <Row>
          <Col lg={12} sm={12} md={12} className="my-1 ">
            <p
              className="pb-2"
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "13px",
                paddingLeft: "1px",
                paddingTop: "5px",
              }}
            >
              DEAL CATEGORY
            </p>

            <Stack className="mb-2" direction="horizontal" gap={3}>
              <div className="bg-light">
                <small>Total:</small>
                <WhiteDiv>{data.length}</WhiteDiv>
              </div>

              <div className="vr" />
              <div className="bg-light">
                <GreenDiv>{green.length}</GreenDiv>
              </div>

              <div className="bg-light">
                <AmberDiv>{amber.length}</AmberDiv>
              </div>

              <div className="bg-light">
                <RedDiv style={{ marginLeft: "2%" }}>{red.length}</RedDiv>
              </div>
            </Stack>
            <Row>
              <div className="mt-3">
                <ResponsiveContainer width="100%" height={210}>
                  <PieChart margin={{ top: 20, left: 80, right: 0, bottom: 0 }}>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="25%"
                      cy="40%"
                      fill="#8884d8"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={1}
                      isAnimationActive={false}
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

                <div
                  style={{ width: "40%", fontSize: "12px", display: "inline" }}
                >
                  <ul className="d-flex justify-content-center align-items-center">
                    {chartLegend}
                    <br />
                  </ul>
                </div>
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default ExecutionBarChart;
