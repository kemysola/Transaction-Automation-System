import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Stack, ProgressBar, Form } from 'react-bootstrap';
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

const ButtonWrapper = styled.button`
  color:white;
  background: green;
  border: 1px solid white;
  padding: 2px 20px;
  font-size:13px;
  margin: 10px;
  border-radius: 3px
`;

export default function Cards() {
    const initialClientState = {
        start_date: "",
        end_date: "",
        clientname: "",
    };

    const [client, setClient] = useState(initialClientState);
    const [data, setData] = useState([]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setClient({ ...client, [name]: value });
    };

    useEffect(() => {
        retrieveDeals();
    }, []); 

    const retrieveDeals = () => {
        let start_date = "2022-02-17"
        let end_date = "2022-02-17"
        let clientname = "''"
     Service.getClient(start_date, end_date, clientname)
            .then((response) => {
                setData(response.data.records);
            })
            .catch((e) => {
                console.log(e);
            });
        }; 
    


    const saveStaff = (e) => {
        e.preventDefault()
        let start_date = client.start_date
        let end_date = client.end_date
        let clientname = client.clientname

        Service.getClient(start_date, end_date, clientname)
            .then((response) => {
                setData(response.data.records);
            })
            .catch((e) => {
                alert("Not a valid client name")
            });
        
    }

        var clientdeal = data.reduce(function (filtered, arr) {
            let clientname = client.clientname
            if (arr.clientname === clientname) {
                var someNewValue = arr.dealsize;
                filtered.push(someNewValue);
            }
            return filtered;
        }, []);
   
        var clientdealTotal = clientdeal.reduce(function (tot, arr) {
            return tot + parseFloat(arr);
        }, 0);
    
        var sumTotal = data.reduce(function (tot, arr) {
            return tot + parseFloat(arr.dealsize);
        }, 0);

    
        const chartData = [
            { name: "Trans", value: clientdealTotal },
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
            const radius = innerRadius + (outerRadius - innerRadius) * 0.2;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            // ................................. Rechart Piechart ...........................
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
                        {`${(percent * 100).toFixed(2)}%`}
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
            <>
                <Container fluid>
                    <Row>
                        <Col>
                            <Form.Group className="mb-0 mt-2 pt-2 pb-1">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control size="sm" type="date" value={client.start_date} onChange={handleInputChange} name='start_date' />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-0 mt-2 pt-2 pb-1">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control size="sm" type="date" value={client.end_date} onChange={handleInputChange} name='end_date' />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-0 mt-2 pt-2 pb-1">
                                <Form.Label>Client Name</Form.Label>
                                <Form.Control size="sm" type="text" value={client.clientname} onChange={handleInputChange} name='clientname' />
                            </Form.Group>
                        </Col>
                        <Col>
                            <div></div>
                            <ButtonWrapper onClick={saveStaff}>
                                Submit
                            </ButtonWrapper>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6} lg={3} className="my-3">
                        <p style={{ fontSize: '12px' }}>Share of Target Origination</p>
                        
                            <PieChart width={300} height={300}>
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    fill="#8884d8"
                                    innerRadius={60}
                                    outerRadius={127}
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

                        <Col sm={12} lg={3} className="my-3">
                            <Card style={{ background: 'white', padding: '10px', color: 'darkblue', borderRadius: '10px', marginTop: '3px', marginBottom: '15px'}}>
                                <p style={{ fontSize: '12px' }}>Share of Actual Origination</p>
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
                    <Row>
                        <Col sm={6} lg={2} className="my-3">
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
