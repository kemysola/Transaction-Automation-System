import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Container, Row, Col, Stack } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import Scope from './managementCards/Scope';
import TitleContext from '../../../../context/TitleContext';


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Service from "../../../../Services/Service";
import { Chart } from "react-google-charts";
import "./../style.css";
import { FilterDramaTwoTone } from "@mui/icons-material";
import background from '../../../../Images/removeG.png'

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
  margin-left:8%;
`;
const WhiteDiv = styled.div`
  border-radius: 50px;
  background: white;
  color: royalblue;
  height: 40px;
  width: 40px;
  margin-top: 10px,
  margin-bottom: 2px;
  text-align:center;
  padding-top:12px;
  font-size: 10px;
  display:inline-block;
  margin-left:16px;
  border:2px solid royalblue;
  font-weight:bold;
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
  const { filteredStore, addFtYear} = useContext(TitleContext)
  const [data, setData] = useState([]);
  const [region, setRegion] = useState([])

  // ................................... Use Effect Hook .................................
  const newStore = JSON.parse(filteredStore)

  useEffect(() => {
    retrieveDeals();
  }, [newStore]);

  // .................................... Axios Endpoint ..............................
  const retrieveDeals = async() => {
    await Service.getAllDeals(newStore)
      .then((response) => {
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

  // summ all values in each of the region arrays

  let southTotal = south.reduce(function (tot, arr) {
    return tot + parseFloat(arr)
  }, 0)

  let southwestTotal = southwest.reduce(function (tot, arr) {
    return tot + parseFloat(arr)
  }, 0)

  let southsouthTotal = southsouth.reduce(function (tot, arr) {
    return tot + parseFloat(arr)
  }, 0)

  let northwestTotal = northwest.reduce(function (tot, arr) {
    return tot + parseFloat(arr)
  }, 0)

  let northeastTotal = northeast.reduce(function (tot, arr) {
    return tot + parseFloat(arr)
  }, 0)

  let northcentralTotal = northcentral.reduce(function (tot, arr) {
    return tot + parseFloat(arr)
  }, 0)

  
  // .......................... Get transactions dealsize according to deal category ...................

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


  // ......... Return deal_category dealsize total ...............................................

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

  const chartLegend = chartData.map((item, i) => {
    if (`${item.name}` === "Amber") {
      return (
        <li key={i} style={{color: "#FFBF00"}} >
          {item.name}:  ₦{(item.value).toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })}bn
        </li>
        )
      }
      return (
        <li key={i} style={{color: `${item.name}`}} >
          {item.name}: ₦{(item.value).toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })}bn
        </li>
      );
    });


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
    const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <>
        <text x={cx} y={cy} dy={8} textAnchor="middle">
          {`₦${(sumTotal).toLocaleString("en-US", {
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
            ₦${(payload[0].value).toLocaleString("en-US", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 2,
            })}bn`}
          </p>
        </div>
      );
    }
    return null;
  };

    // ******************************** Chart Data  **********************


  const chartRegion = [
    {
      name:"SE",
      value: southTotal,
      percent: `${((southTotal/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name:"SW",
      value: southwestTotal,
      percent: `${((southwestTotal/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name:"NC",
      value: northcentralTotal,
      percent:`${((northcentralTotal/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name:"NE",
      value: northeast,
      percent: `${((northeastTotal/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name:"NW",
    value: northwestTotal,
    percent: `${((northwestTotal/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name:"SS",
      value: southsouth,
      percent: `${((southsouthTotal/sumTotal) * 100).toFixed(1)}%`
    }
  ]

  return (
    <React.Fragment>
      {/*---------------------------- Div ------------------------------------------- */}
      <Container fluid className="mb-3">
        <Row>
        <Col sm={12} lg={2} className='mt-1 mb-3'>
          <Scope/>
        </Col>

          <Col lg={6} sm={12} className="mt-1 mb-3">
            <Container fluid className='bg-light py-3'
              style={{
                borderRadius: "10px",
                paddingTop: "10px",
                marginTop: "3px",
              }}
            >
              <p className="pb-2"
                style={{
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
              >
                Deal Category
              </p>

              <Stack className="mb-2" direction="horizontal" gap={3}>
                <div className="bg-light">
                  <small>Total:</small>
                  <WhiteDiv>{green.length+ amber.length + red.length}</WhiteDiv>
                </div>

                <div className="vr" />
                <div className="bg-light">
                  <GreenDiv>{green.length}</GreenDiv>
                </div>

                <div className="bg-light">
                  <AmberDiv>{amber.length}</AmberDiv>
                </div>

                <div className="bg-light">
                  <RedDiv style={{marginLeft: "2%"}} >{red.length}</RedDiv>
                </div>
              </Stack>

              <Row>
                <div className="mt-3 d-flex justify-content-space-evenly align-items-center">
                  <ResponsiveContainer width="100%" height={210}>
                    <PieChart margin={{ top: 20, left: 50, right: 0, bottom: 0 }}>
                      <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="30%"
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

                  <div style={{width: "40%", fontSize: "12px" }}>
                    <ul>
                      {chartLegend}
                    </ul>
                  </div>
                  
                </div>
 
              </Row>
            </Container>
          </Col>

          <Col sm={12} lg={4} className='mt-1 mb-3'>
              <Container fluid className='bg-light py-3'
                style={{
                  borderRadius: "10px",
                  marginTop: "3px",
                  maxHeight: "53vh",             
                }}>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "13px",
                  }}
                >
                  Region
                </p>

                <BarChart 
                  width={200}
                  height={210}
                  data={chartRegion}
                  barSize={25}
                  margin={{
                    top: 5,
                    right: 5,
                    left: 5,
                    bottom: 2,
                  }}
                  layout="horizontal"
                >
                  <XAxis xAxisId={0}
                    type="category"
                    dataKey='name'
                    tickLine={false}
                    axisLine={true}
                  />
                  
                  <XAxis xAxisId={1}
                    type="category"
                    dataKey='percent'
                    tickLine={false}
                    axisLine={false}
                    orientation="top"
                    style={{ fontSize: "9px"}}
                  />
                  <Tooltip/>
                  <Bar
                    dataKey="value"
                    minPointSize={2}
                    fill="#82ca9d"
                    background={{ fill: "#eee" }}
                  />
                </BarChart>
              <br/>
              </Container>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
