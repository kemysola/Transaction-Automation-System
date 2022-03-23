import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import map from "../../../../Images/map.png";
import Service from "../../../../Services/Service";
import { Chart } from "react-google-charts";
import "./../style.css";

// .................................. Styled Components .........................

const PieDiv = styled.div`
  padding: 2px;
`;
const GridDiv = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 2fr;
`;
const RedDiv = styled.div`
  border-radius: 50px;
  padding: 5px;
  background: red;
  color: white;
  height: 60px;
  width: 60px;
  margin-top: 1rem;
  margin-bottom: 0.22rem;
  padding: 0.89rem 1.3rem;
  font-size: 20px;
  font-weight: 600;
`;

const GreenDiv = styled.div`
  border-radius: 50px;
  padding: 5px;
  background: #00c49f;
  color: white;
  height: 60px;
  width: 60px;
  margin-top: 1rem;
  margin-bottom: 0.22rem;
  padding: 0.89rem 1.2rem;
  font-size: 20px;
  font-weight: 600;
`;

const AmberDiv = styled.div`
  border-radius: 50px;
  padding: 5px;
  background: #ffbb28;
  color: white;
  height: 60px;
  width: 60px;
  margin-top: 1rem;
  margin-bottom: 0.22rem;
  padding: 0.89rem 1.2rem;
  font-size: 20px;
  font-weight: 600;
`;

//  ........................................React functional component.......................

export default function Stats() {
  const [data, setData] = useState([]);

  // ................................... Use Effect Hook .................................

  useEffect(() => {
    retrieveDeals();
  }, []);

  // .................................... Axios Endpoint ..............................
  const retrieveDeals = () => {
    Service.getAllDeals()
      .then((response) => {
        setData(response.data.deals);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // ............................ Google Chart .....................................

  const mapData = [
    ["", "population%"],
    ["NG", 2],
    ["NG", 3],
  ];

  const mapOptions = {
    region: "NG", // Africa
    displayMode: "text",
    magnifyingGlass: { enable: true, zoomFactor: 30 },
    resolution: "provinces",
    colorAxis: { colors: ["#00853f", "white", "#e31b23"] },
    backgroundColor: "white",
    defaultColor: "#f5f5f5",
  };

  // .......................... Get transactions according to deal category ...................

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

  // ......... Return deal_category total ...............................................

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

  // ......................... Store Transaction in Recharts Array .....................

  const chartData = [
    { name: "Red", value: redTotal },
    { name: "Amber", value: amberTotal },
    { name: "Green", value: greenTotal },
  ];

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
    const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // ................................. Rechart Piechart ...........................
    return (
      <>
        <text x={cx} y={cy} dy={8} textAnchor="middle">
          {`₦${(sumTotal / 1000000)
              .toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })
            }bn`}
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
            ₦${(payload[0].value / 1000000)
              .toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })
            }bn`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <React.Fragment>
      {/*---------------------------- Div ------------------------------------------- */}
      {/* <PieDiv> */}
        <Container fluid className="mb-3">
          <Row>
            <Col lg={6} sm={12}
              className="my-1"
              style={{ 
                borderRadius: "15px", 
                height: '20rem',
                background: "white",
                paddingTop: "10px",
                marginTop: "3px", 
              }}
            >
              <p
                style={{ 
                  color: "black", 
                  fontWeight: "bold", 
                  fontSize: "13px",
                  paddingLeft: "10px",
                }}
              >
                DEAL CATEGORY
              </p>

              <Row>
                <Col md={3} className="mt-1">
                  <GreenDiv>{green.length}</GreenDiv>
                  <AmberDiv>{amber.length}</AmberDiv>
                  <RedDiv>{red.length}</RedDiv>
                </Col>
                <Col md={9}>
                  <PieChart width={300} height={300}>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      fill="#8884d8"
                      innerRadius={50}
                      outerRadius={85}
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
                </Col>
              </Row>
            </Col>

            <Col sm={12} lg={6}>
              <Row
                className="my-1"
                style={{ 
                  background: "white",
                  marginLeft: "5px", 
                  borderRadius: "15px", 
                  height: '20rem',
                  paddingTop: "10px",
                  marginTop: "3px",
                }}
              >
                <div>
                  <p
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "13px",
                      paddingLeft: "10px",
                    }}
                  >
                    REGION
                  </p>
                </div>

                <Chart
                  chartType="GeoChart"
                  width="300px"
                  height="200px"
                  data={mapData}
                  options={mapOptions}
                />
              </Row>
            </Col>
          </Row>
        </Container>
      {/* </PieDiv> */}
    </React.Fragment>
  );
}
