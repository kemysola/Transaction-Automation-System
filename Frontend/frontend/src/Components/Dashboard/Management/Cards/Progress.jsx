import React, { useEffect, useState } from "react";
import { Container, Row, Col, ProgressBar, Card } from "react-bootstrap";
import styled from "styled-components";
import GuarPipe from "./GuarPipe";
import Stats from "./Stats";
import Service from "../../../../Services/Service";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ZAxis,
  LabelList,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ProgressBarDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  justify-content: center;
  font-size: 10px;
  padding: 4px 15px;
  border-radius: 20px;
`;
export default function Progress() {
  const [data, setData] = useState([]);

  useEffect(() => {
    retrieveDeals();
  }, []);

  const retrieveDeals = () => {
    Service.getAllDeals()
      .then((response) => {
        setData(response.data.deals);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  let option1 = data.reduce(function (filtered, arr) {
    if (arr.industry === "On-grid Power") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let option2 = data.reduce(function (filtered, arr) {
    if (arr.industry === "Off-grid Power") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let option3 = data.reduce(function (filtered, arr) {
    if (arr.deal_category === "Agric Infra.") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let option4 = data.reduce(function (filtered, arr) {
    if (arr.industry === "Gas") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let option5 = data.reduce(function (filtered, arr) {
    if (arr.industry === "Transportation") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let option6 = data.reduce(function (filtered, arr) {
    if (arr.industry === "Inputs to Infra.") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let option7 = data.reduce(function (filtered, arr) {
    if (arr.industry === "Affordable Housing") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let option8 = data.reduce(function (filtered, arr) {
    if (arr.industry === "Education Infra.") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let option9 = data.reduce(function (filtered, arr) {
    if (arr.industry === "Healthcare") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let option10 = data.reduce(function (filtered, arr) {
    if (arr.industry === "Water/Waste") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let option11 = data.reduce(function (filtered, arr) {
    if (arr.industry === "ICT/Telecoms") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let option1Total = option1.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let option2Total = option2.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let option3Total = option3.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let option4Total = option4.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let option5Total = option5.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let option6Total = option6.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let option7Total = option7.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let option8Total = option8.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let option9Total = option9.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let option10Total = option10.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let option11Total = option11.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  var sumTotal = data.reduce(function (tot, arr) {
    return tot + parseFloat(arr.dealsize);
  }, 0);

  const chartData = [
    {
      name: `On-grid Power: ₦${(option1Total/1000000).toFixed(2)}bn`,
      value: option1Total,
      percent: `${((option1Total/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name: `Off-grid Power: ₦${(option2Total/1000000).toFixed(2)}bn`,
      value: option2Total,
      percent: `${((option2Total/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name: `Agric infra: ₦${(option3Total/1000000).toFixed(2)}bn`,
      value: option3Total,
      percent: `${((option3Total/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name: `Gas: ₦${(option4Total/1000000).toFixed(2)}bn`,
      value: option4Total,
      percent: `${((option4Total/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name: `Transport: ₦${(option5Total/1000000).toFixed(2)}bn`,
      value: option5Total,
      percent: `${((option5Total / sumTotal) * 100).toFixed(1)}%`
    },
    {
      name: `Inputs to Infra: ₦${(option6Total/1000000).toFixed(2)}bn`,
      value: option6Total,
      percent: `${((option6Total/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name:  `Affordable Housing: ₦${(option7Total/1000000).toFixed(2)}bn`,
      value: option7Total,
      percent: `${((option7Total/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name: `Education Infra: ₦${(option8Total/1000000).toFixed(2)}bn`,
      value: option8Total,
      percent: `${((option8Total/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name: `Healthcare: ₦${(option9Total/1000000).toFixed(2)}bn`,
      value: option9Total,
      percent: `${((option9Total/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name: `Water/Waste: ₦${(option10Total/1000000).toFixed(2)} bn`,
      value: option10Total,
      percent: `${((option10Total/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name: `ICT/Telecoms: ₦${(option11Total/1000000).toFixed(2)}bn`,
      value: option11Total,
      percent: `${((option11Total/sumTotal) * 100).toFixed(1)}%`
    },
  ];

  //-------------------- PRODUCT ------------------------------//

  let productOption1 = data.reduce(function (filtered, arr) {
    if (arr.product === "Public Bond") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let productOption2 = data.reduce(function (filtered, arr) {
    if (arr.product === "Blended Finance") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let productOption3 = data.reduce(function (filtered, arr) {
    if (arr.product === "Contingent Refi. Gte.") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let productOption4 = data.reduce(function (filtered, arr) {
    if (arr.product === "Private Bond (Clean Energy)") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let productOption5 = data.reduce(function (filtered, arr) {
    if (arr.product === "Private Bond (Other)") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let productOption6 = data.reduce(function (filtered, arr) {
    if (arr.product === "Annuity PPP") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  let productOption1Total = productOption1.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let productOption2Total = productOption2.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let productOption3Total = productOption3.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let productOption4Total = productOption4.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let productOption5Total = productOption5.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  let productOption6Total = productOption6.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  const productChartData = [
    {
      name: `Public Bond: ₦${(productOption1Total/1000000).toFixed(2)}bn`,
      value: productOption1Total,
      percent: `${((productOption1Total/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name: `Blended Finance: ₦${(productOption2Total/1000000).toFixed(2)}bn`,
      value: productOption2Total,
      percent: `${((productOption2Total/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name: `Contigent Refi. Gte.: ₦${(productOption3Total/1000000).toFixed(2)}bn`,
      value: productOption3Total,
      percent: `${((productOption3Total/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name: `Private Bond (Clean Energy): ₦${(productOption4Total/1000000).toFixed(2)}bn`,
      value: productOption4Total,
      percent: `${((productOption4Total/sumTotal) * 100).toFixed(1)}%`

    },
    {
      name: `Private Bond (Other): ₦${(productOption5Total/1000000).toFixed(2)}bn`,
      value: productOption5Total,
      percent: `${((productOption5Total/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name: `Annuity PPP: ₦${(productOption6Total/1000000).toFixed(2)}bn`,
      value: productOption6Total,
      percent: `${((productOption6Total/sumTotal) * 100).toFixed(1)}%`

    },
  ];

  // const renderCustomizedLabel = (props) => {
  //   const { x, y, width, value } = props;
  //   const radius = 20;
  
  //   return (
  //     <g>
  //       {/* <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#fff"/> */}
  //         <text
  //           x={x + width /2}
  //           y={y - radius}
  //           style={{
  //             fontSize: "10px"
  //           }}
  //           fill="black"
  //           textAnchor="middle"
  //           dominantBaseline="middle"
  //         >
  //           {value}
  //         </text>
  //     </g>
  //   );
  // };
  
  return (
    <React.Fragment>
      <div style={{ marginLeft: "1rem ", marginRight: " 0.11rem", background:'white' }}>
      <p class='animate__animated animate__pulse py-1' style={{marginLeft:'1rem'}}><b>Management Dashboard</b></p>
        <Stats />
      </div>

      <Container style={{ marginLeft: "1rem ", marginRight: " 0.11rem", background:'white' }}>
        <Row style={{ marginTop: "5px " }}>
          <Col sm={12} lg={6} className="my-3">
            <div
              style={{
                paddingTop: "10px",
                marginTop: "3px",
                borderRadius: "15px",
              }}
            >
              <Container>
                <Container className='bg-light py-3'>
                <p
                style={{
                  fontSize: "13px",
                  paddingLeft: "10px",
                  fontWeight: "bold",
                }}
              >
                INDUSTRY
              </p>

              <BarChart
                width={350}
                height={340}
                data={chartData}
                barSize={15}
                margin={{
                  top: 5,
                  right: 5,
                  left: 5,
                  bottom: 2,
                }}
                layout="vertical"
              >
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  yAxisId={0}
                  tickLine={false} 
                  axisLine={false}
                  style={{ fontSize: "0.5rem", fontFamily: "Arial" }}
                />
                <YAxis
                  orientation="right"
                  yAxisId={1}
                  dataKey="percent"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "0.5rem", fontFamily: "Arial" }}
                />
                <Bar
                  dataKey="value"
                  fill="#82ca9d"
                  minPointSize={1}
                  background={{ fill: "#eee" }}
                  // label={<CustomizedLabel />}
                >    
                  {/* <LabelList dataKey="percent" content={renderCustomizedLabel} />  */}
                </Bar>

              </BarChart>
                </Container>
              </Container>
              
            </div>
          </Col>
          {/*------------------------ Column ------------------------------- */}
          <Col sm={12} lg={6} className="my-3">
            <div
              style={{
                paddingTop: "10px",
                marginTop: "3px",
                borderRadius: "15px",
                height: "65.4vh",
              }}
            >
              <Container>
                <Container className='bg-light py-3'>
                <p
                style={{
                  fontSize: "13px",
                  paddingLeft: "10px",
                  fontWeight: "bold",
                }}
              >
                PRODUCT
              </p>
              <BarChart
                width={350}
                height={250}
                data={productChartData}
                barSize={15}
                margin={{
                  top: 25,
                  right: 15,
                  left: 15,
                  bottom: 22,
                }}
                style={{
                  paddingTop: 20,
                }}
                layout="vertical"
              >
                <XAxis type="number" hide />
                <YAxis
                  yAxisId={0}
                  type="category"
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  style={{
                    fontSize: "0.52rem",
                    fontFamily: "Arial",
                    paddingLeft: "2px",
                  }}
                />
                <YAxis
                  orientation="right"
                  yAxisId={1}
                  dataKey="percent"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  style={{
                    fontSize: "0.52rem",
                    fontFamily: "Arial",
                    padding: "15px",
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="#82ca9d"
                  minPointSize={1}
                  style={{lineHeight: "10px"}}
                  background={{ fill: "#eee" }}
                />
              </BarChart>

                </Container>
              </Container>
              
            </div>
          </Col>
          {/*------------------------ Column ------------------------------- */}
        </Row>
      </Container>
      <br />
    </React.Fragment>
  );
}
