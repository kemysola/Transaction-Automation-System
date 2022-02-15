import React from 'react';
import {Card, Row, Col,Stack, Container} from 'react-bootstrap';
import styled from 'styled-components';
import SubCards from './SubCards';
import './MainCards.css';
import {FaRegHandshake} from 'react-icons/fa'
import {GoDeviceDesktop} from 'react-icons/go'
import {RiCalculatorLine} from 'react-icons/ri'



const MainCards =()=>{
    return(
        <React.Fragment>
            <Container>
                <div className='title'>
                        <p style={{color:'darkblue'}}>Hi Admin, Welcome
                            <br/>
                            Back
                        </p>
                </div>

                <Row >
                    <Col sm ={4} className='my-2'>
                        <div  className="bg-light py-2">
                            <p className='text-center' style={{color:'darkblue', fontWeight:'bold'}}>Budget Manager</p>
                            <div  className='text-center text-success'>
                            <h1 style={{fontSize:'80px'}}><RiCalculatorLine/></h1>
                        </div>
                        </div>

                    </Col>
                    <Col sm ={4} className='my-2'>
                        <div className="bg-light py-2">
                            <p className='text-center' style={{color:'darkblue', fontWeight:'bold'}}>Analytics Module</p>
                            <div  className='text-center text-success'>
                            <h1 style={{fontSize:'80px'}}><GoDeviceDesktop/></h1>
                        </div>
                        </div>
                        

                    </Col>
                    <Col sm ={4} className='my-2'>
                        <div className="bg-light py-2">
                            <p className='text-center' style={{color:'darkblue',  fontWeight:'bold'}}>
                                Deal Manager
                            </p>
                            <div className='text-center text-success'>
                            <h1 style={{fontSize:'80px'}}><FaRegHandshake/></h1>
                            </div>
                            
                        </div>

                    </Col>
                </Row>
            </Container>
            <Container>
                <div class='subCardsContainer'>
                <SubCards/>
                </div>
                
            </Container>













           {/*<div>
                <div>
                <Stack gap={2}>
                    <div>
                        <h5 className='text-info'>Hi Admin, Welcome</h5>
                    </div>
                    <div>
                    <h5 className='text-info'>Back!</h5>
                    </div>
                </Stack>
                </div>
                
                <Row>
                    <Col sm={6} lg={4}>
                    <Card>
                    <Card.Body>
                        <Card.Title>
                            <p>Budget Manager</p>
                            </Card.Title>
                        <Card.Text>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </Card.Text>
                    </Card.Body>
                </Card>
                    </Col>
                    <Col sm={6} lg={4}>
                    <Card>
                    <Card.Body>
                        <Card.Title>
                            <p>Analytics Module</p>
                            </Card.Title>
                        <Card.Text>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                           
                        </Card.Text>
                    </Card.Body>
                </Card>
                    </Col>
                    <Col sm={6} lg={4}>
                    <Card>
                    <Card.Body>
                        <Card.Title>
                            <p>Deal Manager</p>
                            </Card.Title>
                        <Card.Text>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            
                        </Card.Text>
                    </Card.Body>
                </Card>
                    </Col>

                </Row>
                <div className='subCardsContainer'>
                    <Container className='bg-light'>
                    <SubCards/>
                    </Container>
                    
                </div>
                

            </div>*/}
        </React.Fragment>

    )
}

export default MainCards;