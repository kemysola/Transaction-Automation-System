import React from 'react';
import {Container, Row , Card, Col} from 'react-bootstrap';

export default function SubCards(){
    return(
        <React.Fragment>
            <Container>
                <Row className='py-3'>
                    <Col sm={3}>
                        <div className='py-3'>
                            <div style={{borderRight: '1px solid black'}}>
                            <small className='text-center text-info' >Transactions</small>
                            <br/>
                           <h5>3290000</h5>
                            </div>
                        </div>
                    </Col>
                    <Col sm={3}>
                    <div className='py-3'>
                        <div style={{borderRight: '1px solid black'}}>
                        <small className='text-center text-info' >Staffs</small>
                           <h5>3290000</h5>
                        </div>
                           
                        </div>
                    </Col>
                    <Col sm={3}>
                    <div className='py-3'>
                        <div style={{borderRight: '1px solid black'}}>
                        <small className='text-center text-info' >Deals</small>
                           <h5>3290000</h5>
                        </div>
                    </div>
                    </Col>
                    <Col sm={3}>
                    <div className='py-3'>
                        <div>
                        <small className='text-center text-info' >Budget</small>
                           <h5>3290000</h5>
                        </div>
                           
                        </div>
                    </Col>
                </Row>

            </Container>
            
        </React.Fragment>
    )
}