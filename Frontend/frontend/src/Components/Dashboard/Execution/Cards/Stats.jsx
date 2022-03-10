import React from 'react';
import styled from 'styled-components';
import {Container,Row,Col} from 'react-bootstrap';
import { PieChart, Pie} from 'recharts';
import map from '../../../../Images/map.png'
import './../style.css'


const PieDiv = styled.div`
padding:2px;
`;
const GridDiv = styled.div`
display:grid;
grid-template-columns:1.5fr 2fr;


`;

export default function Stats(){
    const data = [
        {name: 'Geeksforgeeks', students: 20},
        {name: 'Technical scripter', students: 20},
        {name: 'Geek-i-knack', students: 20},
        {name: 'Geek-o-mania', students: 20}
      ];
    return(
        <React.Fragment>
    {/*---------------------------- Div ------------------------------------------- */}
            <PieDiv>
                <Container fliud>
                    <Row className=''>
                    <Col sm={6} className=''>
                        <Row  className='bg-light pt-1' style={{margin:'5px 2px', borderRadius:'10px'}}>
                            <Col sm={4}>
                                <div>
                                <p style={{color:'darkblue', fontWeight:'bold',fontSize:'10px'}}>
                                DEAL MANAGER
                                </p>
                                <p style={{fontSize:'12px'}}>Green</p>
                                <p style={{fontSize:'12px'}}>Amber</p>
                                <p style={{fontSize:'12px'}}>Red</p>
                                </div>

                            </Col>
                            <Col sm={8}>
                                <div>
                                <PieChart width={150} height={166}>
                                    <Pie data={data} dataKey="students" outerRadius={50} fill="green yellow" />
                                    </PieChart>
                                </div>
                            

                            </Col>
                        </Row>
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