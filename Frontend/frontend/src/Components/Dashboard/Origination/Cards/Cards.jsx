import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Stack, ProgressBar } from 'react-bootstrap';
import styled from 'styled-components';
import Service from '../../../../Services/Service';
import { PieChart, Pie, ResponsiveContainer, Sector, Cell, Tooltip } from 'recharts';

const ProgressBarDiv = styled.div`
display:grid;
grid-template-columns: 1fr 2fr;
justify-content:center;
font-size:10px;
padding:4px 15px;
border-radius:20px;
`;

export default function Cards() {
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

    console.log("data is", data)

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

    console.log("for sure, this is red total ", redTotal)
    console.log("for sure, this is amber total ", amberTotal)
    console.log("for sure, this is green total ", greenTotal)

    console.log("total red array is", red)
    console.log("total amber array is", amber)
    console.log("total green array is", green)

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
            {`${(percent * 100).toFixed(2)}%`}
            </text>
        );
    };

    return (
        <>
            <Container fluid>
                <Row style={{ backgroundColor: "white" }}>
                    <Col lg={12}>
                        <div>
                            <p>Is there actually anything here!!!!!!</p>
                        </div>

                        <div>
                            {/* <ResponsiveContainer width="100%" height="100%"> */}
                            <PieChart width={250} height={200}>
                                <Pie 
                                    data={chartData} 
                                    dataKey="value" 
                                    nameKey="name" 
                                    cx="50%" cy="50%" 
                                    fill="#8884d8" 
                                    innerRadius={50} 
                                    outerRadius={80}
                                    paddingAngle={5}
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                >
                                
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                                </Pie>

                                <Tooltip />
                            </PieChart>
                            {/* </ResponsiveContainer> */}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} lg={2} className="my-3">
                        <Card style={{ background: 'white', padding: '10px', width: '100px', color: 'darkblue', borderRadius: '10px', marginTop: '3px', marginBottom: '15px' }}>
                            <Stack>
                                <div>
                                    <small>-</small>
                                    <br />
                                    <small>Actual</small>
                                    <br />
                                    <br />
                                </div>

                                <div>
                                    <small>N4.9bn</small>
                                    <br />
                                    <small>Target</small>
                                    <br />
                                    <br />
                                </div>

                                <div>
                                    <small>100.0%</small>
                                    <br />
                                    <small>N4.9bn</small>
                                    <br />
                                    <small>Variance</small>
                                </div>
                            </Stack>
                        </Card>
                    </Col>

                    <Col sm={12} lg={3} className="my-3">
                        <Card style={{ background: 'white', padding: '10px', color: 'darkblue', borderRadius: '10px', marginTop: '3px', marginBottom: '15px' }}>
                            <p style={{ fontSize: '12px' }}>Share of Actual Origination</p>
                        </Card>
                    </Col>

                    <Col sm={12} lg={3} className="my-3">
                        <Card style={{ background: 'white', padding: '10px', color: 'darkblue', borderRadius: '10px', marginTop: '3px', marginBottom: '15px' }}>
                            <p style={{ fontSize: '12px' }}>Share of Target Origination</p>
                        </Card>
                    </Col>

                    <Col sm={12} lg={3} className="my-3">
                        <div style={{ background: 'white', padding: '10px', marginTop: '3px', borderRadius: '10px' }}>
                            <p style={{ fontSize: '12px' }}>Origination Incentive Earned</p>

                            <ProgressBarDiv>
                                <div>
                                    <p>100%</p>
                                    <p>50%</p>
                                </div>
                                <ProgressBar striped variant='success' now={10} />
                            </ProgressBarDiv>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}