import React from 'react';
import UserForm from '../Login/UserForm';
import './Main.css';
import logo1  from '../../../Images/i.png'
import { Row, Container ,Col, Stack} from 'react-bootstrap';
import styled from 'styled-components';

const BodyDiv = styled.div`
box-sizing:border-box;
margin:0;
padding:0.11rem 3rem;
`

const Main =()=>{
    return(
        <BodyDiv>
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
                    <Col sm ={6} lg={5} md={'auto'} className='justify-content-end'>
                    <UserForm/>
                    </Col>
                </Row>     
                </Container>

        </BodyDiv>

    )
}
    

export default Main;

