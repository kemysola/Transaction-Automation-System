import React from 'react';
import styled from 'styled-components';
import {Container, Row, Col,Card} from 'react-bootstrap';
import TableView from './TransactionTable';


const Paragraph = styled.p`
font-size:15px;
font-weight:light;
`;


export default function TransactionCards(){
    return(
        <React.Fragment>
            <Container>
                <Paragraph>
                <p>All Transactions</p>
                </Paragraph>
                <Row>
                    <Col sm={6} className='py-3'>
                        <Card  style={{height:'85px'}}>
                        <Card.Body>
                        <Card.Title>
                            <small>Lorem, ipsum dolor</small>
                            </Card.Title>
                        <Card.Text className='text-info'>
                           <h4>
                           123, 000,000, 000
                           </h4>
                        </Card.Text>
                    </Card.Body>
                        </Card>

                    </Col>
                    <Col sm={6} className='py-3'>
                        <Card style={{height:'85px'}}>
                        <Card.Body>
                        <Card.Title>
                            <small>Lorem, ipsum dolor</small>
                            </Card.Title>
                        <Card.Text className='text-info'>
                           <h4>
                           123, 000,000, 000
                           </h4>
                        </Card.Text>
                    </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Container>
                        <TableView/>
                    </Container>

                </Row>

            </Container>
        </React.Fragment>
    )
}