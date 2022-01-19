import React from 'react';
import UserForm from '../Login/UserForm';
import './Main.css';
import { Button, Row, Container ,Col, Stack} from 'react-bootstrap';


const Main =()=>{
    return(
        <React.Fragment>
            <Container>
                <Row>
                    <Col sm={8}>
                        <div>
                        <div>
                            <p className='text-light'>InfraCredit</p>
                        </div>
                        <Container className='containerMargin'>
                            <div className='justify-content-center'>
                                <Stack gap={3}>
                                    <div>
                                        <h1 className='text-light'>Unlocking long-term local  </h1>
                                    </div>
                                    <div>
                                        <h1 className='text-light'>currency infrastructure </h1>
                                    </div>
                                    <div>
                                        <h1 className='text-light'>finance in Nigeria</h1>
                                    </div>
                                    </Stack>
                                </div>
                            </Container>
                        </div>
                    </Col>
                    <Col sm={4} className='formContainer containerMargin'>
                        <div className=''>
                            <UserForm/>
                        </div>
                    </Col>
                </Row>
                </Container>

        </React.Fragment>

    )
}
    

    

    

export default Main;

