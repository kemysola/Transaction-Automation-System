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
export default function Progress(){
    
    const [data, setData] = useState([])

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
  
    
    let option1 = data.reduce(function(filtered, arr) {
  
      if (arr.industry === 'On-grid Power') {
  
         let someNewValue = arr.dealsize
  
         filtered.push(someNewValue);
  
      }
  
      return filtered;
  
    }, []);
  
  
  
    let option2 = data.reduce(function(filtered, arr) {
  
      if (arr.industry === 'Off-grid Power') {
  
         let someNewValue = arr.dealsize
  
         filtered.push(someNewValue);
  
      }
  
      return filtered;
  
    }, []);
  
  
  
    let option3 = data.reduce(function(filtered, arr) {
  
      if (arr.deal_category === 'Agric Infra.') {
  
         let someNewValue = arr.dealsize
  
         filtered.push(someNewValue);
  
      }
  
      return filtered;
  
    }, []);
  
    let option4 = data.reduce(function(filtered, arr) {
  
      if (arr.industry === 'Gas') {
  
         let someNewValue = arr.dealsize
  
         filtered.push(someNewValue);
  
      }
  
      return filtered;
  
    }, []);
  
  
  
    let option5 = data.reduce(function(filtered, arr) {
  
      if (arr.industry === 'Transportation') {
  
         let someNewValue = arr.dealsize
  
         filtered.push(someNewValue);
  
      }
  
      return filtered;
  
    }, []);
  
  
  
    let option6 = data.reduce(function(filtered, arr) {
  
      if (arr.industry === 'Inputs to Infra.') {
  
         let someNewValue = arr.dealsize
  
         filtered.push(someNewValue);
  
      }
  
      return filtered;
  
    }, []);
  
  
    let option7 = data.reduce(function(filtered, arr) {
  
      if (arr.industry === 'Affordable Housing') {
  
         let someNewValue = arr.dealsize
  
         filtered.push(someNewValue);
  
      }
  
      return filtered;
  
    }, []);
  
  
  
    let option8 = data.reduce(function(filtered, arr) {
  
      if (arr.industry === 'Education Infra.') {
  
         let someNewValue = arr.dealsize
  
         filtered.push(someNewValue);
  
      }
  
      return filtered;
  
    }, []);
  
  
  
    let option9 = data.reduce(function(filtered, arr) {
  
      if (arr.industry === 'Healthcare') {
  
         let someNewValue = arr.dealsize
  
         filtered.push(someNewValue);
  
      }
  
      return filtered;
  
    }, []);
  
    let option10 = data.reduce(function(filtered, arr) {
  
      if (arr.industry === 'Water/Waste') {
  
         let someNewValue = arr.dealsize
  
         filtered.push(someNewValue);
  
      }
  
      return filtered;
  
    }, []);
  
  
  
    let option11 = data.reduce(function(filtered, arr) {
  
      if (arr.industry === 'ICT/Telecoms') {
  
         let someNewValue = arr.dealsize
  
         filtered.push(someNewValue);
  
      }
  
      return filtered;
  
    }, []);
  
  
    let option1Total = option1.reduce(function(tot, arr) {
  
      return tot + parseFloat(arr);
  
    }, 0)
  
  
  
    let option2Total = option2.reduce(function(tot, arr) {
  
      return tot + parseFloat(arr);
  
    }, 0)
  
  
  
    let option3Total = option3.reduce(function(tot, arr) {
  
      return tot + parseFloat(arr);
  
    }, 0)
  
    let option4Total = option4.reduce(function(tot, arr) {
  
      return tot + parseFloat(arr);
  
    }, 0)
  
  
  
    let option5Total = option5.reduce(function(tot, arr) {
  
      return tot + parseFloat(arr);
  
    }, 0)
  
  
  
    let option6Total = option6.reduce(function(tot, arr) {
  
      return tot + parseFloat(arr);
  
    }, 0)
  
  
    
    let option7Total = option7.reduce(function(tot, arr) {
  
      return tot + parseFloat(arr);
  
    }, 0)
  
  
  
    let option8Total = option8.reduce(function(tot, arr) {
  
      return tot + parseFloat(arr);
  
    }, 0)
  
  
  
    let option9Total = option9.reduce(function(tot, arr) {
  
      return tot + parseFloat(arr);
  
    }, 0)
  
    let option10Total = option10.reduce(function(tot, arr) {
  
      return tot + parseFloat(arr);
  
    }, 0)
  
  
  
    let option11Total = option11.reduce(function(tot, arr) {
  
      return tot + parseFloat(arr);
  
    }, 0)

    const chartData = [{
        name: "On-gric Power",
        value: option1Total
        },
        {
            name: "Off-grid Power",
            value: option2Total
        }, {
            name: "Agric infra",
            value: option3Total
        },
        {
            name: "Gas",
            value: option4Total
        },
        {
            name: "Transport",
            value: option5Total
        },
        {
            name: "Inputs to Infra",
            value: option6Total
        },
            {
                name: "Affordable Housing",
                value: option7Total
            },
            {
                name: "Education Infra",
                value: option8Total
            }, {
                name: "Healthcare",
                value: option9Total
            },
            {
                name: "Water/Waste",
                value: option10Total
            },
            {
                name: "ICT/Telecoms",
                value: option11Total
            }
    
    ]

///////////////////////////////PRODUCT
  
    
    let productOption1 = data.reduce(function(filtered, arr) {
  
      if (arr.product === 'Public Bond') {
  
         let someNewValue = arr.dealsize
  
         filtered.push(someNewValue);
  
      }
  
      return filtered;
  
    }, []);
  
  
  
    let productOption2 = data.reduce(function(filtered, arr) {
  
      if (arr.product === 'Blended Finance') {
  
         let someNewValue = arr.dealsize
  
         filtered.push(someNewValue);
  
      }
  
      return filtered;
  
    }, []);
  
  
  
    let productOption3 = data.reduce(function(filtered, arr) {
  
      if (arr.product === 'Contingent Refi. Gte.') {
  
         let someNewValue = arr.dealsize
  
         filtered.push(someNewValue);
  
      }
  
      return filtered;
  
    }, []);
  
    let productOption4 = data.reduce(function(filtered, arr) {
  
      if (arr.product === 'Private Bond (Clean Energy)') {
  
         let someNewValue = arr.dealsize
  
         filtered.push(someNewValue);
  
      }
  
      return filtered;
  
    }, []);
  
  
  
    let productOption5 = data.reduce(function(filtered, arr) {
  
      if (arr.product === 'Private Bond (Other)') {
  
         let someNewValue = arr.dealsize
  
         filtered.push(someNewValue);
  
      }
  
      return filtered;
  
    }, []);
  
  
  
    let productOption6 = data.reduce(function(filtered, arr) {
  
      if (arr.product === 'Annity PPP') {
  
         let someNewValue = arr.dealsize
  
         filtered.push(someNewValue);
  
      }
  
      return filtered;
  
    }, []);
  

  
    let productOption1Total = productOption1.reduce(function(tot, arr) {
  
      return tot + parseFloat(arr);
  
    }, 0)
  
  
  
    let productOption2Total = productOption2.reduce(function(tot, arr) {
  
      return tot + parseFloat(arr);
  
    }, 0)
  
  
  
    let productOption3Total = productOption3.reduce(function(tot, arr) {
  
      return tot + parseFloat(arr);
  
    }, 0)
  
    let productOption4Total = productOption4.reduce(function(tot, arr) {
  
      return tot + parseFloat(arr);
  
    }, 0)
  
  
  
    let productOption5Total = productOption5.reduce(function(tot, arr) {
  
      return tot + parseFloat(arr);
  
    }, 0)
  
  
  
    let productOption6Total = productOption6.reduce(function(tot, arr) {
  
      return tot + parseFloat(arr);
  
    }, 0)
  
  
    const productChartData = [{
        name: "Public Bond ",
        value: productOption1Total
        },
        {
            name: "Blended Finance ",
            value: productOption2Total
        }, {
            name: "Contigent Refi. Gte. ",
            value: productOption3Total
        },
        {
            name: "Private Bond (Clean Energy)",
            value: productOption4Total
        },
        {
            name: "Private Bond (Other) ",
            value: productOption5Total
        },
        {
            name: "Annuity PPP",
            value: productOption6Total
        },
    ]

    return(
        <React.Fragment>
          <div style={{marginLeft:' 0.75rem',marginRight:' 1.9rem'}}>
          <Stats/>
          </div>
            
            <Container fluid>
                <Row style={{marginTop:'5px '}}>
                    <Col sm={12} lg={6} className="my-1">
                        <div style={{background:'white',padding:'10px',marginTop:'3px', borderRadius:'1px'}} > 
                        <p style={{fontSize:'15px', paddingLeft:'12px',fontWeight:'bold'}}>INDUSTRY</p>


                        <BarChart
                            width={400}
                            height={340} 
                            data={chartData}
                            margin={{
                              top: 5,
                              right: 5,
                              left: 5,
                              bottom: 2,
                            }}
                            layout='vertical'
                            
                        >
                            <XAxis type='number' hide/>
                            <YAxis type='category' dataKey='name' tickLine={false} axisLine={false} style={{fontSize: '0.5rem', fontFamily: 'Arial',}}/>
                            <Bar dataKey='value' stackId="a" fill='#82ca9d' background={{ fill: '#eee' }}/>
                        </BarChart>
                        </div>
                    

                    </Col>
                {/*------------------------ Column ------------------------------- */}
                <Col sm={12} lg={6} className="my-1">
                        <div style={{background:'white', paddingTop:'10px',marginTop:'3px',borderRadius:'1px',height:'65.4vh'}} > 
                            <p style={{ fontSize: '15px', paddingLeft: '10px', fontWeight:'bold' }}>PRODUCT</p>
                        <BarChart
                            width={400}
                            height={300}
                            data={productChartData}
                            margin={{
                              top: 25,
                              right: 15,
                              left: 15,
                              bottom: 22,

                            }}
                            style={{
                              paddingTop:20
                            }}
                            layout='vertical'
                        >
                            <XAxis type='number' hide/>
                            <YAxis type='category' 
                            dataKey='name' 
                            tickLine={false} 
                            axisLine={false} style={{fontSize: '0.52rem', fontFamily: 'Arial', padding:'15px',}} />
                            <Bar dataKey='value'
                             stackId="a"
                            fill='#82ca9d'
                            background={{ fill: '#eee' }}
                            />
                        </BarChart>
                        
                        </div>
                    </Col>
                {/*------------------------ Column ------------------------------- */}

                </Row>
            </Container>
            <br/>
            {/*<GuarPipe/>*/}
            
        </React.Fragment>
    )
}
