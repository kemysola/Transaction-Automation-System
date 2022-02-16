import React from 'react';
import UserForm from '../Login/UserForm';
import './Main.css';
import logo1  from '../../../Images/logo.jpg'
import { Row, Container ,Col, Stack} from 'react-bootstrap';


const Main =()=>{
    return(
        <div className='bodyBackground'>
            <Container fluid>
          <Row>
                    <Col sm ={6} lg={7}>
                    <div className='my-0'>
                                <img src={logo1} alt='whiteLogo' width='120'/>
                        </div>
                        <Container className='containerMargin'>
                            <div className='justify-content-center'>
                                <Stack gap={3}>
                                    <div>
                                        <h1 className='text-light'>Unlocking long-term local  </h1>
                                        <h1 className='text-light'>currency infrastructure </h1>
                                        <h1 className='text-light'>finance in Nigeria</h1>
                                    </div>
                                    </Stack>
                                </div>
                            </Container>
                    </Col>
                    <Col sm ={6} lg={5} md={'auto'} className='justify-content-end' style={{width:'500px',marginTop:'30px'}}>
                    <UserForm/>
                    </Col>
                </Row>     
                </Container>

        </div>

    )
}
    

export default Main;

