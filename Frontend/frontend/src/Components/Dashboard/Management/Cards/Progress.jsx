import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Card, } from "react-bootstrap";
import Stats from "./Stats";
import Service from "../../../../Services/Service";
import Matrics from "./Matrics";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  Tooltip,
  Legend,
} from "recharts";


export default function Progress() {

      // ******************************************  useState Hook to store state data  ****************************************

  const [data, setData] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [indFilter, setIndFilter] = useState("Value");
  const [prdFilter, setPrdFilter] = useState("Value");
 


      // ******************************************  useEffect hook - ComponentDidMount   ****************************************

  useEffect(() => {
    retrieveDeals();
  }, []);

  useEffect(() => {
    retrieveForecast();
  }, []);


      // ******************************************  Axios :  get transactions  ****************************************


  const retrieveDeals = async() => {
    await Service.getAllDeals()
      .then((response) => {
        setData(response.data.deals);
      })
      .catch((e) => {
        console.log(e);
      });
  };

    // ******************************************  Axios :  get forecast  ****************************************


  const retrieveForecast = async() => {
    await Service.getForecast()
      .then((response) => {
        setForecast(response.data.forecast);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // ************************************** calculations for on-grid power industry  **********************


  let option1 = data.reduce(function (filtered, arr) {
    if (arr.industry === "On-grid Power") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

    // ************************************** calculations for off-grid power industry  **********************


  let option2 = data.reduce(function (filtered, arr) {
    if (arr.industry === "Off-grid Power") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

    // ************************************** calculations for agric infra industry  **********************

  let option3 = data.reduce(function (filtered, arr) {
    if (arr.deal_category === "Agric Infra.") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

    // ************************************** calculations for gas industry  **********************


  let option4 = data.reduce(function (filtered, arr) {
    if (arr.industry === "Gas") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

    // ************************************** calculations for transportation industry  **********************


  let option5 = data.reduce(function (filtered, arr) {
    if (arr.industry === "Transportation") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

    // ************************************** calculations for inputs to Infra industry  **********************

  let option6 = data.reduce(function (filtered, arr) {
    if (arr.industry === "Inputs to Infra.") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

    // ******************************** calculations for Affordable Housing industry  **********************


  let option7 = data.reduce(function (filtered, arr) {
    if (arr.industry === "Affordable Housing") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

  // ******************************** calculations for Education Infra industry  **********************


  let option8 = data.reduce(function (filtered, arr) {
    if (arr.industry === "Education Infra.") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

    // ******************************** calculations for Healthcare industry  **********************


  let option9 = data.reduce(function (filtered, arr) {
    if (arr.industry === "Healthcare") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);


      // ******************************** calculations for water/waste industry  **********************


  let option10 = data.reduce(function (filtered, arr) {
    if (arr.industry === "Water/Waste") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);

      // ******************************** calculations for ICT/Telecoms industry  **********************

  let option11 = data.reduce(function (filtered, arr) {
    if (arr.industry === "ICT/Telecoms") {
      let someNewValue = arr.dealsize;

      filtered.push(someNewValue);
    }

    return filtered;
  }, []);


      // ******************************** sumtotal    **********************


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

      // ******************************** calculations Chart Data **********************


  const chartData = [
    {
      name: `On-grid Power: ₦${option1Total.toFixed(1)}bn`,
      countName: `On-grid Power: ${option1.length}`,
      value: option1Total,
      count: option1.length,
      percent: `${((option1Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((option1.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Off-grid Power: ₦${option2Total.toFixed(1)}bn`,
      countName: `Off-grid Power: ${option2.length}`,
      value: option2Total,
      count: option2.length,
      percent: `${((option2Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((option2.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Agric infra: ₦${option3Total.toFixed(1)}bn`,
      countName: `Agric infra: ${option3.length}`,
      value: option3Total,
      count: option3.length,
      percent: `${((option3Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((option3.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Gas: ₦${option4Total.toFixed(1)}bn`,
      countName: `Gas: ${option4.length}`,
      value: option4Total,
      count: option4.length,
      percent: `${((option4Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((option4.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Transport: ₦${option5Total.toFixed(1)}bn`,
      countName: `Transport: ${option5.length}`,
      value: option5Total,
      count: option5.length,
      percent: `${((option5Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((option5.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Inputs to Infra: ₦${option6Total.toFixed(1)}bn`,
      countName: `Inputs to Infra: ${option6.length}`,
      value: option6Total,
      count: option6.length,
      percent: `${((option6Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((option6.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Affordable Housing: ₦${option7Total.toFixed(1)}bn`,
      countName: `Affordable Housing: ${option7.length}`,
      value: option7Total,
      count: option7.length,
      percent: `${((option7Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((option7.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Education Infra: ₦${option8Total.toFixed(1)}bn`,
      countName: `Education Infra: ${option8.length}`,
      value: option8Total,
      count: option8.length,
      percent: `${((option8Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((option8.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Healthcare: ₦${option9Total.toFixed(1)}bn`,
      countName: `Healthcare: ${option9.length}`,
      value: option9Total,
      count: option9.length,
      percent: `${((option9Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((option9.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `Water/Waste: ₦${option10Total.toFixed(1)} bn`,
      countName: `Water/Waste: ${option10.length}`,
      value: option10Total,
      count: option10.length,
      percent: `${((option10Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((option10.length / data.length) * 100).toFixed(1)}%`,
    },
    {
      name: `ICT/Telecoms: ₦${option11Total.toFixed(1)}bn`,
      countName: `ICT/Telecoms: ${option11.length}`,
      value: option11Total,
      count: option11.length,
      percent: `${((option11Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((option11.length / data.length) * 100).toFixed(1)}%`,
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


      // ******************************** Product Data  **********************


  const productChartData = [
    {
      name: `Public Bond: ₦${productOption1Total.toFixed(1)}bn`,
      countName: `Public Bond: ${productOption1.length}`,
      value: productOption1Total,
      count: productOption1.length,
      percent: `${((productOption1Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((productOption1.length / data.length) * 100).toFixed(
        1
      )}%`,
    },
    {
      name: `Blended Finance: ₦${productOption2Total.toFixed(1)}bn`,
      countName: `Blended Finance: ${productOption2.length}`,
      value: productOption2Total,
      count: productOption2.length,
      percent: `${((productOption2Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((productOption2.length / data.length) * 100).toFixed(
        1
      )}%`,
    },
    {
      name: `Contigent Refi. Gte.: ₦${productOption3Total.toFixed(1)}bn`,
      countName: `Contigent Refi. Gte.: ${productOption3.length}`,
      value: productOption3Total,
      count: productOption3.length,
      percent: `${((productOption3Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((productOption3.length / data.length) * 100).toFixed(
        1
      )}%`,
    },
    {
      name: `Private Bond (Clean Energy): ₦${productOption4Total.toFixed(1)}bn`,
      countName: `Private Bond (Clean Energy): ${productOption4.length}`,
      value: productOption4Total,
      count: productOption4.length,
      percent: `${((productOption4Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((productOption4.length / data.length) * 100).toFixed(
        1
      )}%`,
    },
    {
      name: `Private Bond (Other): ₦${productOption5Total.toFixed(1)}bn`,
      countName: `Private Bond (Other): ${productOption5.length}`,
      value: productOption5Total,
      count: productOption5.length,
      percent: `${((productOption5Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((productOption5.length / data.length) * 100).toFixed(
        1
      )}%`,
    },
    {
      name: `Annuity PPP: ₦${productOption6Total.toFixed(1)}bn`,
      countName: `Annuity PPP: ${productOption6.length}`,
      value: productOption6Total,
      count: productOption6.length,
      percent: `${((productOption6Total / sumTotal) * 100).toFixed(1)}%`,
      countPercent: `${((productOption6.length / data.length) * 100).toFixed(
        1
      )}%`,
    },
  ];

  // --------------------------- Guarantee Projection Forecast ---------------------- //
  const newGuaranteeData = forecast.map(item => (
    {
      "name": item.projectionyear,
      "Cumulative Growth": item.cumulativegrowth,
      "New Guarantees": item.newdeals
    }
  ));

  const guaranteePipelineData = forecast.map(item => (
    {
      "name": item.projectionyear,
      "Pipeline": item.guaranteepipeline
    }
  ));

  const dealCategoryData = forecast.map(item => (
    {
      "name": item.projectionyear,
      "Green & Amber Deals": item.greenandamberdeals,
      "Green Deals": item.greendeals
    }
  ));

  
  return (
    <React.Fragment>
      <Container Fluid style={{ marginLeft: "0.22rem ", background:'white', borderRadius: "5px" }}>
        {/* --------- Title and Filter Bar */}
        <div style={{display: "flex", justifyContent: "space-between", padding: "0.22rem 0rem", marginRight: "0.22rem"}}>
          <p class='animate__animated animate__pulse py-1' style={{}}><b>Management Dashboard</b></p>
        {/* ---------- Filter Bar ------------ */}
          <Row>
            <Card className="my-1" style={{ borderRadius: "5px",boxShadow:'10px 5px 5px whitesmoke' }}>
              <Card.Body>
                <Card.Subtitle className="mb-2">
                  <h6 style={{width: "250px", fontSize: "13px"}}>Filter</h6>
                </Card.Subtitle>

                <Card.Text>
                  {/* --------- Filter Industry Barchart ----------- */}
                  <Row>
                    <Col sm={4} lg={4} style={{fontSize: "12px"}}>
                      <Form.Label>Industry by:</Form.Label>
                    </Col>
                    <Col sm={8} lg={8} style={{fontSize: "12px"}}>
                      <Form.Check
                        inline
                        label="Value"
                        type="radio"
                        name="indFilter"
                        value="Value"
                        onClick={(e) => setIndFilter(e.target.value)}
                        defaultChecked
                      />
                      <Form.Check
                        inline
                        label="Count"
                        type="radio"
                        name="indFilter"
                        value="Count"
                        onClick={(e) => setIndFilter(e.target.value)}
                      />
                    </Col>
                  </Row>

                  {/* --------- Filter Product Barchart --------- */}
                  <Row>
                    <Col sm={4} lg={4} style={{fontSize: "12px"}}>
                      <Form.Label>Product by:</Form.Label>
                    </Col>

                    <Col sm={8} lg={8} style={{fontSize: "12px"}}>
                      <Form.Check
                        inline
                        label="Value"
                        type="radio"
                        name="prdFilter"
                        value="Value"
                        onClick={(e) => setPrdFilter(e.target.value)}
                        defaultChecked
                      />
                      <Form.Check
                        inline
                        label="Count"
                        type="radio"
                        name="prdFilter"
                        value="Count"
                        onClick={(e) => setPrdFilter(e.target.value)}
                      />
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </Row>
        </div>
        
        {/* --------- Deal Category PieChart and Region Bar Chart ------------------- */}
        <Row style={{marginBottom: "-38px"}}>
          <Stats />
        </Row>
        <br/>

                        {/* Cumulative Performance Earned  */}
        <Row style={{marginBottom: "-38px"}}>
          <Matrics/>
        </Row>
        <br/>
        <br/>



       {/* ----- Forecast Bar Charts ----------- */}
        <Row style={{ marginTop: "5px " }}>
          {/*------------------------ New Guarantee Forecast barchart ------------------------------- */}
          <Col sm={12} lg={4} className="mt-3 mb-1">
            <div
              style={{
                paddingTop: "5px",
                marginTop: "1px",
                borderRadius: "15px",
                height: "65.4vh",
              }}
            >
                <Container Fluid className='bg-light py-3' style={{borderRadius: "5px"}}>
                <p
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                New Guarantee Forecast (₦'Billions)
              </p>
              <BarChart
                width={250}
                height={250}
                data={newGuaranteeData}
                barSize={15}
                margin={{
                  top: 5,
                  right: 2,
                  left: 2,
                  bottom: 1,
                }}

                layout="horizontal"
              >
                <XAxis xAxisId={0}
                  dataKey="name"
                  tickLine={false}
                  axisLine={true}
                  style={{
                    fontSize: "0.52rem",
                    fontFamily: "Arial",
                    paddingLeft: "2px",
                  }}
                />
                <YAxis hide/>
                <Tooltip />
                <Legend height={30} iconSize={10} />
                <Bar
                  dataKey="Cumulative Growth"
                  fill="#82ca9d"
                  minPointSize={1}
                  isAnimationActive={false}
                  style={{lineHeight: "10px"}}
                >
                  <LabelList dataKey="Cumulative Growth" position="top" style={{fontSize: "0.7rem"}} />
                </Bar>
                <Bar
                  dataKey="New Guarantees"
                  fill="#89ec8a"
                  minPointSize={1}
                  isAnimationActive={false}
                  style={{lineHeight: "10px"}}
                >
                  <LabelList dataKey="New Guarantees" position="insideBottom" style={{fontSize: "0.6rem"}} />
                </Bar>
              </BarChart>

                </Container>
              
            </div>
          </Col>

          {/*------------------------ Guarantee Pipeline Forecast barchart ------------------------------- */}
          <Col sm={12} lg={4} className="mt-3 mb-1">
            <div
              style={{
                paddingTop: "5px",
                marginTop: "1px",
                borderRadius: "15px",
                height: "65.4vh",
              }}
            >
                <Container Fluid className='bg-light py-3' style={{borderRadius: "5px"}}>
                <p
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                Guarantee Pipeline Forecast (₦'Billions)
              </p>
              <BarChart
                width={250}
                height={250}
                data={guaranteePipelineData}
                barSize={20}
                margin={{
                  top: 5,
                  right: 5,
                  left: 5,
                  bottom: 2,
                }}
                layout="horizontal"
              >
                <XAxis xAxisId={0}
                  dataKey="name"
                  tickLine={false}
                  axisLine={true}
                  style={{
                    fontSize: "0.52rem",
                    fontFamily: "Arial",
                    paddingLeft: "2px",
                  }}
                />
                <YAxis hide/>
                <Tooltip />
                {/* <Legend /> */}           
                <Bar
                  dataKey="Pipeline"
                  fill="#34B2D2"
                  minPointSize={1}
                  isAnimationActive={false}
                >
                  <LabelList dataKey="Pipeline" position="top" style={{fontSize: "0.8rem"}} />
                </Bar>
              </BarChart>

                </Container>
              
            </div>
          </Col>

          {/*------------------------ Deal Category Forecast barchart ------------------------------- */}
          <Col sm={12} lg={4} className="mt-3 mb-1">
            <div
              style={{
                paddingTop: "5px",
                marginTop: "1px",
                borderRadius: "15px",
                height: "65.4vh",
              }}
            >
                <Container Fluid className='bg-light py-3' style={{borderRadius: "5px"}}>
                <p
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                Deal Category Forecast (₦'Billions)
              </p>
              <BarChart
                width={250}
                height={250}
                data={dealCategoryData}
                barSize={15}
                margin={{
                  top: 10,
                  right: 5,
                  left: 5,
                  bottom: 1,
                }}
                layout="horizontal"
              >
                <XAxis xAxisId={0}
                  dataKey="name"
                  tickLine={false}
                  axisLine={true}
                  style={{
                    fontSize: "0.52rem",
                    fontFamily: "Arial",
                    paddingLeft: "2px",
                  }}
                />
                <YAxis hide/>
                <Tooltip />
                <Legend height={30} iconSize={10} />
                <Bar
                  dataKey="Green & Amber Deals"
                  fill="#D6E865"
                  minPointSize={1}
                  isAnimationActive={false}
                  style={{lineHeight: "10px"}}
                >
                  <LabelList dataKey="Green & Amber Deals" position="top" style={{fontSize: "0.7rem"}} />
                </Bar>
                <Bar
                  dataKey="Green Deals"
                  fill="#89ec8a"
                  minPointSize={1}
                  isAnimationActive={false}
                  style={{lineHeight: "10px"}}
                >
                  <LabelList dataKey="Green Deals" position="insideBottom" style={{fontSize: "0.6rem"}} />
                </Bar>
              </BarChart>
              </Container>
              
            </div>
          </Col>
        </Row>

        {/* ------- Industry and Product Bar Charts ---------- */}
        <Row style={{marginTop: "-40px"}}>
          {/* -------------------------- Industry barchart -------------------------------- */}
          <Col sm={12} lg={6} className="mt-1 mb-3">
            <div
              style={{
                paddingTop: "10px",
                marginTop: "3px",
                borderRadius: "15px",
              }}
            >
              <Container  Fluid className='bg-light py-2' style={{borderRadius: "5px"}}>
              <p
              style={{
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              INDUSTRY
            </p>

            {indFilter === "Value" ? (
              <BarChart
                width={400}
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
                  style={{ fontSize: "9px",  }}
                />
                <YAxis
                  orientation="right"
                  yAxisId={1}
                  dataKey="percent"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "9px" }}
                />
                <Tooltip/>
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
            ) : (
              <BarChart
                width={400}
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
                  dataKey="countName"
                  yAxisId={0}
                  tickLine={false} 
                  axisLine={false}
                  style={{ fontSize: "9px" }}
                />
                <YAxis
                  orientation="right"
                  yAxisId={1}
                  dataKey="countPercent"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "9px" }}
                />
                <Bar
                  dataKey="count"
                  fill="#82ca9d"
                  minPointSize={1}
                  background={{ fill: "#eee" }}
                  // label={<CustomizedLabel />}
                >    
                  {/* <LabelList dataKey="percent" content={renderCustomizedLabel} />  */}
                </Bar>

              </BarChart>
            )}
              </Container>              
            </div>
          </Col>

          {/*------------------------ Product Barchart ------------------------------- */}
          <Col sm={12} lg={6} className="my-1">
            <div
              style={{
                paddingTop: "10px",
                marginTop: "3px",
                borderRadius: "15px",
                height: "65.4vh",
              }}
            >
              <Container Fluid className='bg-light py-2' style={{borderRadius: "5px"}}>
              <p
              style={{
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              PRODUCT
            </p>

            {prdFilter === "Value" ? (
              <BarChart
                width={400}
                height={250}
                data={productChartData}
                barSize={15}
                margin={{
                  top: 25,
                  right: 5,
                  left: 5,
                  bottom: 22,
                }}
                style={{
                  paddingTop: 2,
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
                    fontSize: "9px",
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
                    fontSize: "9px",
                    padding: "15px",
                  }}
                />
                <Tooltip/>
                <Bar
                  dataKey="value"
                  fill="#82ca9d"
                  minPointSize={1}
                  style={{lineHeight: "10px"}}
                  background={{ fill: "#eee" }}
                />
              </BarChart>
            ) : (
              <BarChart
                width={400}
                height={250}
                data={productChartData}
                barSize={15}
                margin={{
                  top: 25,
                  right: 5,
                  left: 5,
                  bottom: 22,
                }}
                style={{
                  paddingTop: 2,
                }}
                layout="vertical"
              >
                <XAxis type="number" hide />
                <YAxis
                  yAxisId={0}
                  type="category"
                  dataKey="countName"
                  tickLine={false}
                  axisLine={false}
                  style={{
                    fontSize: "9px",
                    paddingLeft: "2px",
                  }}
                />
                <YAxis
                  orientation="right"
                  yAxisId={1}
                  dataKey="countPercent"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  style={{
                    fontSize: "9px",
                    padding: "15px",
                  }}
                />
                <Tooltip/>
                <Bar
                  dataKey="count"
                  fill="#82ca9d"
                  minPointSize={1}
                  style={{lineHeight: "10px"}}
                  background={{ fill: "#eee" }}
                />
              </BarChart>
            )}

              </Container>
            </div>
          </Col>

        </Row>
      </Container>
      <br />
    </React.Fragment>
  );
}
