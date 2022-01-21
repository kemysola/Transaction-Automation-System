import React from 'react';
import { Form,Container,Button,Row,Col } from 'react-bootstrap';

export default function NewTransactions(){
    return(
        <React.Fragment>
            <Container>
                <Form style={{padding:'1px'}}>
                    <p className='text-info'>Update Staff Information</p>
                <div style={{fontSize:'10px'}} className='bg-light'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control size="sm" type="email" placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Level</Form.Label>
                        <Form.Control size="sm" type="email" placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Has Origination Target?</Form.Label>
                        <Form.Control size="sm" type="email" placeholder="name@example.com" />
                    </Form.Group>
                </div>


                <div style={{fontSize:'10px'}} className='bg-light'>
                    <p style={{fontWeight:'bold'}}>Targets</p>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                        <small>Origination (NGN)</small> 
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="Password" size='sm' />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            <small>Guarantee Pipeline (NGN)</small>
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="Password" size='sm' />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            <small>Green Transaction (NGN)</small>
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="Password" size='sm' />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            <small>Amber Transaction (NGN)</small>
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="Password" size='sm' />
                        </Col>
                    </Form.Group>
                </div>
                <br/>

                <div style={{fontSize:'10px'}} className='bg-light'>
                    <p style={{fontWeight:'bold'}}>Performance Pay</p>
                        <Row>
                            <Col sm={4}>
                                <p>% per milestone</p> 
                            </Col>
                            <Col sm={8}>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="5">
                            <small>Mandate Letter (NGN)</small>
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="password" placeholder="Password" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="5">
                        <small>Credit Committee Approval(NGN)</small>
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="password" placeholder="Password" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="5">
                        <small>Fee Letter (%)</small>
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="password" placeholder="Password" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="5">
                        <small>Financial Close (%)</small>
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="password" placeholder="Password" />
                        </Col>
                    </Form.Group>
                    </Col>
                    </Row>   
                </div>
                <div>
                <Button className='bg-success text-light'>Update</Button>
                <Button className='bg-light text-dark'>Cancel</Button>
                        
                </div>
                </Form>
            </Container>
        </React.Fragment>
    )
}