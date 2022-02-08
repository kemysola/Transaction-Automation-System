import React from 'react';
import {Card, Row, Col,Stack, Container} from 'react-bootstrap';
import { makeStyles } from '@material-ui/styles';
import SubCards from './SubCards';
import './MainCards.css';


const useStyles = makeStyles({
    
})

const MainCards =()=>{
    const cards = useStyles()
    return(
        <React.Fragment>
            <div>
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
                    <Col sm={4}>
                    <Card style={{width:'12rem'}}>
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
                    <Col sm={4}>
                    <Card style={{width:'12rem'}}>
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
                    <Col sm={4}>
                    <Card style={{width:'12rem'}}>
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
                

            </div>
        </React.Fragment>

    )
}

export default MainCards;