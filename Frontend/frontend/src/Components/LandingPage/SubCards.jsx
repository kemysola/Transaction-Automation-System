import React from 'react';
import { Container, Row, Card, Col } from 'react-bootstrap';
import { BiReceipt } from 'react-icons/bi';
import { GrGroup } from 'react-icons/gr';
import { FaRegHandshake } from 'react-icons/fa';
import { CgCalculator } from 'react-icons/cg'



export default function SubCards() {
    return (
        <React.Fragment>
            <Container>
                <Row className='mb-3' >
                    <Col sm={3}>
                        <div className='py-1'>
                            <div style={{ borderRight: '1px solid black' }}>
                                <p className='d-flex justify-content-end ' style={{ marginRight: '1rem' }} ><BiReceipt /></p>
                                <small style={{ color: '#1184C2' }} >Transactions</small>
                                <br />
                                <h5>3290000</h5>
                            </div>
                        </div>
                    </Col>
                    <Col sm={3} className='my-2'>
                        <div className='py-1'>
                            <div style={{ borderRight: '1px solid black' }}>
                                <p className='d-flex justify-content-end ' style={{ marginRight: '1rem' }} ><GrGroup /></p>
                                <small style={{ color: '#1184C2' }} >Staffs</small>
                                <h5>3290000</h5>
                            </div>

                        </div>
                    </Col>
                    <Col sm={3} className='my-2'>
                        <div className='py-1'>
                            <div style={{ borderRight: '1px solid black' }}>
                                <p className='d-flex justify-content-end ' style={{ marginRight: '1rem' }} ><FaRegHandshake /></p>
                                <small style={{ color: '#1184C2' }} >Deals</small>
                                <h5>3290000</h5>
                            </div>
                        </div>
                    </Col>
                    <Col sm={3} className='my-2'>
                        <div className='py-1'>
                            <div style={{ borderRight: '1px solid black' }}>
                                <p className='d-flex justify-content-end ' style={{ marginRight: '1rem' }} >< CgCalculator /></p>
                                <small style={{ color: '#1184C2' }} >Budget</small>
                                <h5>3290000</h5>
                            </div>

                        </div>
                    </Col>
                </Row>

            </Container>

        </React.Fragment>
    )
}