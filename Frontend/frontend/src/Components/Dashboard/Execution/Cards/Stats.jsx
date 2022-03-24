import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
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
  background: red;
  color: white;
  height: 40px;
  width: 40px;
  margin-top: 10px,
  margin-bottom: 2px;
  text-align:center;
  padding-top:12px;
  font-size: 10px;
  display:inline-block;
  margin-left:19px;
`;

const GreenDiv = styled.div`
  border-radius: 50px;
  background: #00c49f;
  color: white;
  height: 40px;
  width: 40px;
  margin-top: 10px,
  margin-bottom: 10px;
  text-align:center;
  padding-top:12px;
  font-size: 10px;
  display:inline-block;
  margin-left:5px;
`;

const AmberDiv = styled.div`
  border-radius: 50px;
  background: #ffbb28;
  color: white;
  height: 40px;
  width: 40px;
  margin-top: 15px,
  margin-bottom: 2px;
  text-align:center;
  padding-top:12px;
  font-size: 10px;
  display:inline-block;
  margin-left:3px;
`;

//  ........................................React functional component.......................

export default function Stats() {
    const [data, setData] = useState([]);
    const [region, setRegion] = useState([])
  
    // ................................... Use Effect Hook .................................
  
    useEffect(() => {
      retrieveDeals();
    }, []);
  
    // .................................... Axios Endpoint ..............................
    const retrieveDeals = () => {
      Service.getAllDeals()
        .then((response) => {
          //console.log((response.data.deals).length)
          setData(response.data.deals);
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    // ............................ Region Data ................................................

    var south = data.reduce(function (filtered, arr) {
      if (arr.region === "SE") {
        var someNewValue = arr.dealsize;
        filtered.push(someNewValue);
      }
      return filtered;
    }, []);

    var southwest = data.reduce(function (filtered, arr) {
      if (arr.region === "SW") {
        var someNewValue = arr.dealsize;
        filtered.push(someNewValue);
      }
      return filtered;
    }, []);

    var southsouth = data.reduce(function (filtered, arr) {
      if (arr.region === "SS") {
        var someNewValue = arr.dealsize;
        filtered.push(someNewValue);
      }
      return filtered;
    }, []);

    var northwest = data.reduce(function (filtered, arr) {
      if (arr.region === "NW") {
        var someNewValue = arr.dealsize;
        filtered.push(someNewValue);
      }
      return filtered;
    }, []);

    var northeast = data.reduce(function (filtered, arr) {
      if (arr.region === "NE") {
        var someNewValue = arr.dealsize;
        filtered.push(someNewValue);
      }
      return filtered;
    }, []);

    var northcentral = data.reduce(function (filtered, arr) {
      if (arr.region === "NC") {
        var someNewValue = arr.dealsize;
        filtered.push(someNewValue);
      }
      return filtered;
    }, []);
  
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

    //........................ Return Region Total ......................................
    var ssTotal = south.reduce(function (tot, arr) {
      return tot + parseFloat(arr);
    }, 0);
    var seTotal = southwest.reduce(function (tot, arr) {
      return tot + parseFloat(arr);
    }, 0);
    var ncTotal = northcentral.reduce(function (tot, arr) {
      return tot + parseFloat(arr);
    }, 0);
  
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
      const radius = innerRadius + (outerRadius - innerRadius) * 0.2;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
      return (
        <>
          <text x={cx} y={cy} dy={8} textAnchor="middle">
            {`₦${(sumTotal / 1000000).toFixed(2)}bn`}
          </text>
          <text
            x={x}
            y={y}
            fill="black"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
          >
            {`${(percent * 100).toFixed(1)}%`}
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
            <p className="label">{`${payload[0].name} : ₦${(
              payload[0].value / 1000000
            ).toFixed(2)}bn`}</p>
          </div>
        );
      }
      return null;
    };
  
    return (
      <React.Fragment>
        {/*---------------------------- Div ------------------------------------------- */}
          <Container fluid className="mb-3">
            <Row>
              <Col lg={6} sm={12} className="my-1">
                <Container>
                  <Container
                    className="bg-light"
                    style={{
                      borderRadius: "10px",
                      paddingTop: "10px",
                      marginTop: "3px",
                    }}
                  >
                    <p
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

                    <Row>
                      <Col md={6} className="mt-1">
                      <small>Green </small>
                      <GreenDiv className="my-3">{green.length}</GreenDiv>
                      <br/>
                      <small>Amber </small>
                        <AmberDiv className="my-3">{amber.length}</AmberDiv>
                        <br/>
                        <small>Red </small>
                        <RedDiv className="my-3">{red.length}</RedDiv>
                      </Col>
                      <Col md={6}>
                        <PieChart width={300} height={210}>
                          <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="30%"
                            cy="40%"
                            fill="#8884d8"
                            innerRadius={55}
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
                  </Container>
                </Container>
              </Col>
  
              <Col sm={12} lg={6}>
                <Row>
                <Container>
                    <Container className="bg-light"
                      style={{
                        borderRadius: "10px",
                        paddingTop: "10px",
                        marginTop: "3px",}}
                    >
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

                      <p> SE: {south.length} -- {ssTotal}</p>
                      <p> SW: {southwest.length}</p>
                      <p> SS: {southsouth.length}</p>
                      <p> NW: {northwest.length}</p>
                      <p> NE: {northeast.length}</p>
                      <p> NC: {northcentral.length}  -- {ncTotal}</p>
                    </Container>
                  </Container>
                </Row>
              </Col>
            </Row>
          </Container>
      </React.Fragment>
    );
  }