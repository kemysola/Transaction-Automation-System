import React, { useEffect, useState } from "react";
import { Container, Row, Col, ProgressBar, Card } from "react-bootstrap";
import styled from "styled-components";
import { BsArrowDown } from 'react-icons/bs'
import Table from "../Table";
import Dropdownmenu from "../../Origination/stafflist/Dropdown"
import Service from "../../../../Services/Service";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

import PieCardOrigination from "./PieCardOrigination";
import SingleStaff from "../../Origination/deals/SingleStaff";
import { blueGrey } from "@mui/material/colors";

const ProgressBarDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  justify-content: center;
  font-size: 10px;
  padding: 4px 15px;
  border-radius: 20px;
  
`;
export default function ProgressOrigination() {
  const [data, setData] = useState([]);
  const [target, setTarget] = useState([]);

  
  let user_email = window.location.search.split("?")[1]

  //edit user_email

  //let name = user_email.toUpperCase()
  const retrieveDeals = () => {
    Service.getMyDealsByEmail( user_email)
      .then((response) => {
        setData(response.data.deals);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveDeals();
  }, []);


  const [mandate, setMandate] = useState([])
  const [financialClose, setFinancialClose] = useState([])
  const [cca, setCca] = useState([])
  const [feeLetter, setFeeLetter] = useState([])
  
  const retrieveGuranteePipeline = () => {
    Service.getOneStaff(user_email)
      .then((response) => {
        setMandate(response.data.staffInfo[0].mandateletter)
        setFinancialClose(response.data.staffInfo[0].financialclose)
        setCca(response.data.staffInfo[0].creditcommiteeapproval)
        setFeeLetter(response.data.staffInfo[0].feeletter)
        setTarget(response.data.staffInfo);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveGuranteePipeline();
  }, []);


  // let Target value i.e gurantee fee
  var targetValue = target.reduce(function (tot, arr) {
    return tot + parseFloat(arr.guaranteepipeline);
  }, 0);

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

  // actual deal size
  var sumTotal = data.reduce(function (tot, arr) {
    return tot + parseFloat(arr.dealsize);
  }, 0);

  

  //*****************************Varience******************/

  
  let varianceAmount = targetValue - sumTotal

  function varianceDisplay(variance){
    if (variance < 1) {
      let varianceAns = (variance * -1)
      return `↓ ₦${(varianceAns ).toFixed(2)}bn`;
    }
    else if(variance === Infinity){
      return `↓ $0 %`;
    }
    
    return `↑ ${(variance).toFixed(2)}bn`;
  }

  let variancePercent = ((varianceAmount / targetValue) * 100).toFixed(1)

  function variancePerDisplay(variancePer) {
    if (variancePer < 1) {
      let varianceAns = (variancePer * -1)
      return `↓ ${varianceAns}%`;
    }
    else if(variancePer === Infinity){
      return `↓ $0 %`;
    }
    return `↑ ${variancePer}%`;
  };



  const approvalData = [
    {
    name:"Mandate: 2%",
      value: mandate,
      percent: `${((mandate) * 1).toFixed(1)}%`
    },
    {
      name:"Credit Approval:10%",
      value: cca,
      percent: `${((cca) * 1).toFixed(1)}%`

    },
    {
      name:'Financial Close:100%',
      value: financialClose,
      percent: `${((financialClose) *1).toFixed(1)}%`
    },
    {
      name:"Fee Letter:20%",
      value: feeLetter,
      percent: `${((feeLetter) * 1).toFixed(1)}%`
    }
  ]


  const chartData = [
    {
      name: `On-grid Power: ₦${(option1Total).toFixed(2)}bn`,
      value: option1Total,
      percent: `${((option1Total/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name: `Off-grid Power: ₦${(option2Total).toFixed(2)}bn`,
      value: option2Total,
      percent: `${((option2Total/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name: `Agric infra: ₦${(option3Total).toFixed(2)}bn`,
      value: option3Total,
      percent: `${((option3Total/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name: `Gas: ₦${(option4Total).toFixed(2)}bn`,
      value: option4Total,
      percent: `${((option4Total/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name: `Transport: ₦${(option5Total).toFixed(2)}bn`,
      value: option5Total,
      percent: `${((option5Total / sumTotal) * 100).toFixed(1)}%`
    },
    {
      name: `Inputs to Infra: ₦${(option6Total).toFixed(2)}bn`,
      value: option6Total,
      percent: `${((option6Total/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name:  `Affordable Housing: ₦${(option7Total).toFixed(2)}bn`,
      value: option7Total,
      percent: `${((option7Total/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name: `Education Infra: ₦${(option8Total).toFixed(2)}bn`,
      value: option8Total,
      percent: `${((option8Total/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name: `Healthcare: ₦${(option9Total).toFixed(2)}bn`,
      value: option9Total,
      percent: `${((option9Total/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name: `Water/Waste: ₦${(option10Total).toFixed(2)} bn`,
      value: option10Total,
      percent: `${((option10Total/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name: `ICT/Telecoms: ₦${(option11Total).toFixed(2)}bn`,
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
      name: `Public Bond: ₦${(productOption1Total).toFixed(2)}bn`,
      value: productOption1Total,
      percent: `${((productOption1Total/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name: `Blended Finance: ₦${(productOption2Total).toFixed(2)}bn`,
      value: productOption2Total,
      percent: `${((productOption2Total/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name: `Contigent Refi. Gte.: ₦${(productOption3Total).toFixed(2)}bn`,
      value: productOption3Total,
      percent: `${((productOption3Total/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name: `Private Bond (Clean Energy): ₦${(productOption4Total).toFixed(2)}bn`,
      value: productOption4Total,
      percent: `${((productOption4Total/sumTotal) * 100).toFixed(1)}%`

    },
    {
      name: `Private Bond (Other): ₦${(productOption5Total).toFixed(2)}bn`,
      value: productOption5Total,
      percent: `${((productOption5Total/sumTotal) * 100).toFixed(1)}%`
    },
    {
      name: `Annuity PPP: ₦${(productOption6Total).toFixed(2)}bn`,
      value: productOption6Total,
      percent: `${((productOption6Total/sumTotal) * 100).toFixed(1)}%`

    },
  ];
  

  let user_name = user_email.split('@')
  let staff_name = user_name[0]

  return (
    <React.Fragment>
      <Container fluid className='bg-light'>
      <Row>
      <Col md={4}>
                
            <div class='animate__animated animate__pulse pt-2 d-flex justify-content-center'><b>Origination Summary <br /> <span style={{ margin: '1.2em', fontSize: '1em', textTransform: 'uppercase', fontWeight: '400'}}>{staff_name}</span></b></div> 
        
            </Col>
          <Col md={{ span: 4, offset: 4 }}>
          
            <Dropdownmenu />
          
          </Col>
        </Row>
        <Row>
       
       <Col sm={3} lg={4} md={12} className="my-1" style={{ display: 'flex', flexDirection: 'row' }}>
         <Card style={{ width: '18rem', flex: 1}}>
         <Card.Body>
           <Card.Title>{`₦${(sumTotal).toFixed(2)}bn`}</Card.Title>     
           <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
           <Card.Text>
             Actual
           </Card.Text>  
         </Card.Body>
       </Card>
      </Col>
       
       <Col sm={3} lg={4} md={12} className="my-1" style={{ display: 'flex', flexDirection: 'row' }}>
         <Card style={{ width: '18rem', flex: 1 }}>
           <Card.Body>
             <Card.Title>{`₦${(targetValue).toFixed(2)}bn`}</Card.Title>     
             <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
             <Card.Text>
               Target
             </Card.Text>  
           </Card.Body>
       </Card>
     </Col>
       
       <Col sm={3} lg={4} md={12} className="my-1" style={{ display: 'flex', flexDirection: 'row' }}>
       <Card style={{ width: '18rem', flex: 1}}>
         <Card.Body>
           <Card.Title>{variancePerDisplay(variancePercent)}</Card.Title>
           <Card.Subtitle className="mb-2 text-muted">{varianceDisplay(varianceAmount)}</Card.Subtitle>
           <Card.Text>
             Variance
           </Card.Text>
         </Card.Body>
       </Card>
     </Col>
       
     </Row>
        <Row style={{ marginTop: "5px " }}>
          <Col sm={12} lg={4} md={12} className="my-1">
            <br/>
            <PieCardOrigination/>

          </Col>

          <Col sm={12} lg={4} md={12} className="my-1">
            <div
              style={{
                padding: "10px",
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
                width={220}
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
                />
              </BarChart>
                </Container>
              </Container>
            </div>
          </Col>

          {/*------------------------ Column ------------------------------- */}
          <Col sm={12} lg={4} className="my-1">
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
                width={250}
                height={250}
                data={productChartData}
                barSize={15}
                margin={{
                  top: 25,
                  right: 10,
                  left: 10,
                  bottom: 22,
                }}
                style={{
                  paddingTop: 20,
                }}
                layout="vertical"
              >
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  yAxisId={0}
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  style={{
                    fontSize: "0.52rem",
                    fontFamily: "Arial",
                    // width: "10px"
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
                  dataKey="name"
                  fill="#82ca9d"
                  minPointSize={0}
                  background={{ fill: "#eee" }}
                />
              </BarChart>
<br/> 


                </Container>
              </Container>
            </div>
          </Col>
          {/*------------------------ Column ------------------------------- */}
        </Row>

        <BarChart 
               width={410}
               height={300}
               margin={{
                 top: 5,
                 right: 5,
                 left: 5,
                 bottom: 5,
               }}
                data={approvalData}
                layout="horizontal"
                barSize={20}
              >

                <YAxis style={{
                    fontSize: "0.52rem",
                    fontFamily: "Arial",
                    padding: "15px",}} />

                      <XAxis xAxisId={0}
                        type="category"
                        dataKey='name'
                        tickLine={false}
                        axisLine={false}
                        style={{ fontSize: "0.5rem"}}
                      />
                      
                      <XAxis xAxisId={1}
                        type="category"
                        dataKey='percent'
                        tickLine={false}
                        axisLine={false}
                        orientation="top"
                        style={{ fontSize: "0.5rem"}}
                      />
                      <Tooltip/>


                      
                <Bar
                  dataKey="value"
                  minPointSize={0}
                  fill="blue"
                  background={{ fill: 'white' }}
                />
              </BarChart>

       
      </Container>
      <br />
      <SingleStaff/>
    </React.Fragment>
  );
}