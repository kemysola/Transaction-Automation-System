import React from 'react';
import {Container, Card, Row, Col} from 'react-bootstrap';

export default function GuarPipe(){
    return(
        <React.Fragment>
            <Container>
                <Row>
                    <Col sm={6}>
                        <div>
                            <Row>
                                <Col sm={3}>
                                    <small>Actual</small>
                                    <p>500%</p>
                                </Col>
                                <Col sm={3}>
                                <small>Actual</small>
                                    <p>500%</p>
                                </Col>
                                <Col sm={3}></Col>
                            </Row>
                        </div>

                    </Col>
                    <Col sm={6}>
                        
                    </Col>
                </Row>
            </Container>

        </React.Fragment>
    )
}