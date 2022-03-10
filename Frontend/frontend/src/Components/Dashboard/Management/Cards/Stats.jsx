import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {Container,Row,Col} from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip} from 'recharts';
import map from '../../../../Images/map.png';
import Service from '../../../../Services/Service';
import './../style.css';

const PieDiv = styled.div`
padding:2px;
`;
const GridDiv = styled.div`
display:grid;
grid-template-columns:1.5fr 2fr;
`;

export default function Stats(){
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

    var red = data.reduce(function (filtered, arr) {
        if (arr.deal_category === 'Red') {
            var someNewValue = arr.dealsize
            filtered.push(someNewValue);
        }
        return filtered;
    }, []);

    var amber = data.reduce(function (filtered, arr) {
        if (arr.deal_category === 'Yellow') {
            var someNewValue = arr.dealsize
            filtered.push(someNewValue);
        }
        return filtered;
    }, []);

    var green = data.reduce(function (filtered, arr) {
        if (arr.deal_category === 'Green') {
            var someNewValue = arr.dealsize
            filtered.push(someNewValue);
        }
        return filtered;
    }, []);

    var redTotal = red.reduce(function (tot, arr) {
        return tot + parseFloat(arr);
    }, 0)

    var amberTotal = amber.reduce(function (tot, arr) {
        return tot + parseFloat(arr);
    }, 0)

    var greenTotal = green.reduce(function (tot, arr) {
        return tot + parseFloat(arr);
    }, 0)

    const chartData = [
        { name: 'Red', value: redTotal },
        { name: 'Amber', value: amberTotal},
        { name: 'Green', value: greenTotal}
    ]

    const COLORS = ['#FF4500', '#FFBB28', '#00C49F'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="black"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return(
        <React.Fragment>
    {/*---------------------------- Div ------------------------------------------- */}
            <PieDiv>
                <Container fliud className='mb-3'>
                    <Row  >
                    <Col sm={6} className='bg-light pt-1 ' style={{borderRadius:'1px'}}>
                        <div className='d-flex justify-content-center '>
                            <p style={{color:'black', fontWeight:'bold',fontSize:'13px'}}>
                                DEAL CATEGORY
                            </p>
                            <PieChart width={300} height={300}>
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="40%" cy="50%"
                                    fill="#8884d8" 
                                    innerRadius={60} 
                                    outerRadius={100}
                                    paddingAngle={1}
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>

                                    ))}
                                    
                                </Pie>

                                <Tooltip />

                            </PieChart>
                        </div>
                    </Col>

                    <Col sm={6}>
                        <Row className='bg-light pt-1' style={{margin:'5px 2px',borderRadius:'10px'}}>
                            <Col sm={4}>
                                <div>
                                <p style={{color:'darkblue',fontWeight:'bold', fontSize:'10px'}}>REGION</p>
                                </div>
                            </Col>
                            <Col sm={8}>
                                <div className='py-2'>
                                    <img src={map} alt='map' height='150'/>    
                                </div>
                            </Col>
                        </Row>
                    </Col>

                    </Row>
                    </Container>

            </PieDiv>

        </React.Fragment>
    )
}