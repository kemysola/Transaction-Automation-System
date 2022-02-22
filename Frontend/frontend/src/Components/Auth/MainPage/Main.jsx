import React ,{useEffect}from 'react';
import UserLogin from '../Login/UserLogin';
import './Main.css';
import logo1  from '../../../Images/logo.jpg'
import { Row, Container ,Col, Stack} from 'react-bootstrap';

const Main =()=>{
    useEffect(() =>{
        //window.location.href('http://localhost/5000/api/v1/auth')
        console.log('hi')
        fetch('http/3000/login').then((response) =>{
            console.log(response)
            console.log(response.status)
            console.log(response.headers)
            
        })
        

    },[])
  
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
                    <UserLogin/>
                    </Col>
                </Row>     
                </Container>

        </div>

    )
}
    

export default Main;

