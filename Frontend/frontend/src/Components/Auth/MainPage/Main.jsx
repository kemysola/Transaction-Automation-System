import React ,{useEffect, useState}from 'react';
import UserLogin from '../Login/UserLogin';
import './Main.css';
import logo1  from '../../../Images/logo.jpg'
import { Row, Container ,Col, Stack} from 'react-bootstrap';

const Main =()=>{
    //create state variables to handle the http response and save them

    const [user, setUser] = useState()

    // use a useEffect hook to render the endpoint on a componentDidMount

    useEffect(() =>{
        //fetch data from the response header and save it in a react state 

        fetch('http/3000/login').then((response) =>{
            const body = response;
            console.log(body)
            setUser(response.status)
           
            
        })
    },[])
  
    return(
        <div className='bodyBackground'>
        {/* Store the data in an html tag , which would be passed as a props to the login better still pass it to the form as a props durectly */}
            {/* This p tag holding the state would be erased once i have gotten the User-Email from the backend */}
            <p>{user}</p>
        
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
                   {/** Here we pass the user state storing the data as a props to the login */}
                    <UserLogin user={user}/>
                    </Col>
                </Row>     
                </Container>

        </div>

    )
}
    

export default Main;

