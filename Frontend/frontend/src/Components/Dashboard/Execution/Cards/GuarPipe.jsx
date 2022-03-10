import React from 'react';
import {Container, Card, Row, Col,Stack} from 'react-bootstrap';


export default function GuarPipe(){
    return(
        <React.Fragment>
            <Container fluid>
  
                <Row>
                    <Col sm={12} lg={6}>
                        <Card style={{background:'color', padding:'10px', color:'darkblue', borderRadius:'8px', marginBottom:'15px'}}>
                            <Stack gap={0} className='pb-1' style={{fontWeight:'bold'}}>
                            <small style={{fontSize:'10px'}}>GUARANTEE</small>
                            <small style={{fontSize:'10px'}}>PIPELINE</small>
                            </Stack>
                            <Row>
                            <Col sm={4}>
                                    <div style={{borderRight:'1px solid black'}}>
                                    <small style={{fontSize:'10px'}}>Actual</small>
                                    <p style={{fontSize:'20px'}}>500%</p>
                                    </div>
                                    
                                </Col>
                                <Col sm={4}>
                                <div style={{borderRight:'1px solid black'}}>
                                    <small style={{fontSize:'10px'}}>Target</small>
                                    <p style={{fontSize:'20px'}} >500%</p>
                                    </div>
                                </Col>
                                <Col sm={4}>
                                <small style={{fontSize:'10px'}}>Variance</small>
                                    <p style={{fontSize:'20px'}}>500%</p>
                                </Col>
                            </Row>

                        </Card>
                    </Col>

                {/* -------------------------------------------- Column ----------------- */}
                    <Col sm={12} lg={6}>
                    <Card style={{background:'color', padding:'10px', color:'darkblue', borderRadius:'8px', marginBottom:'15px'}}>
                            <Stack gap={0} className='pb-1' style={{fontWeight:'bold'}}>
                                <small style={{fontSize:'10px'}}>GUARANTEE</small>
                                <small style={{fontSize:'10px'}}>PIPELINE</small>
                            </Stack>
                            <Row>
                                <Col sm={4}>
                                    <div style={{borderRight:'1px solid black'}}>
                                    <small style={{fontSize:'10px'}}>Actual</small>
                                    <p style={{fontSize:'20px'}}>500%</p>
                                    </div>
                                    
                                </Col>
                                <Col sm={4}>
                                <div style={{borderRight:'1px solid black'}}>
                                    <small style={{fontSize:'10px'}}>Target</small>
                                    <p style={{fontSize:'20px'}} >500%</p>
                                    </div>
                                </Col>
                                <Col sm={4}>
                                <small style={{fontSize:'10px'}}>Variance</small>
                                    <p style={{fontSize:'20px'}}>500%</p>
                                </Col>
                            </Row>

                        </Card>
                    </Col>                
                {/* -------------------------------------------- Column ----------------- */}

                    <Col sm={12} lg={6}>
                    <Card style={{background:'color', padding:'10px', color:'darkblue', borderRadius:'8px', marginBottom:'5px'}}>
                            <Stack gap={0} className='pb-1' style={{fontWeight:'bold'}}>
                            <small style={{fontSize:'10px'}}>GUARANTEE</small>
                                <small style={{fontSize:'10px'}}>PIPELINE</small>
                            </Stack>
                            <Row>
                            <Col sm={4}>
                                    <div style={{borderRight:'1px solid black'}}>
                                    <small style={{fontSize:'10px'}}>Actual</small>
                                    <p style={{fontSize:'20px'}}>500%</p>
                                    </div>
                                    
                                </Col>
                                <Col sm={4}>
                                <div style={{borderRight:'1px solid black'}}>
                                    <small style={{fontSize:'10px'}}>Target</small>
                                    <p style={{fontSize:'20px'}} >500%</p>
                                    </div>
                                </Col>
                                <Col sm={4}>
                                <small style={{fontSize:'10px'}}>Variance</small>
                                    <p style={{fontSize:'20px'}}>500%</p>
                                </Col>
                            </Row>

                        </Card>
                    </Col>

                {/* -------------------------------------------- Column ----------------- */}

                    <Col sm={12} lg={6}>
                    <Card style={{background:'color', padding:'10px', color:'darkblue', borderRadius:'8px', marginBottom:'5px'}}>
                            <Stack gap={0} className='pb-1' style={{fontWeight:'bold'}}>
                            <small style={{fontSize:'10px'}}>GUARANTEE</small>
                                <small style={{fontSize:'10px'}}>PIPELINE</small>
                            </Stack>
                            <Row>
                            <Col sm={4}>
                                    <div style={{borderRight:'1px solid black'}}>
                                    <small style={{fontSize:'10px'}}>Actual</small>
                                    <p style={{fontSize:'20px'}}>500%</p>
                                    </div>
                                    
                                </Col>
                                <Col sm={4}>
                                <div style={{borderRight:'1px solid black'}}>
                                    <small style={{fontSize:'10px'}}>Target</small>
                                    <p style={{fontSize:'20px'}} >500%</p>
                                    </div>
                                </Col>
                                <Col sm={4}>
                                <small style={{fontSize:'10px'}}>Variance</small>
                                    <p style={{fontSize:'20px'}}>500%</p>
                                </Col>
                            </Row>

                        </Card>
                    </Col>
                {/* -------------------------------------------- Column ----------------- */}

                </Row>
            </Container>
           
        </React.Fragment>
    )
}