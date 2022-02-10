import React ,{useState} from 'react';
import { Form,Stack, Container, Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios'


const BorderDiv = styled.div`
border-radius:12px;
background:white;
margin:6.5rem 0.22rem;
font-size:12px;
padding: 0.11rem 1.5rem;

`;


const UserForm =()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(true)

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setError(false)
        try{
            const res = await axios.get('',{
                email,
                password,
            });
            res.data && window.location.replace("/")
        }catch (err){
            setError(true)
        }
        
    }
        

    return (
        <Container>
            <BorderDiv>
                <Form action='/app/login' method='post' onSubmit={handleSubmit}>
                    <Row>
                        <Col sm={12}>
                        <Stack className='py-2 mt-1'>
                            <article style={{fontSize:'18px',fontWeight:'bold'}} className='pt-3 pb-1 mb-1'>Sign In</article>
                        </Stack>
                        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                        <Form.Label className=''>Email Address</Form.Label>
                        <Form.Control size="sm" 
                        type="email" 
                        placeholder="Email"
                        onChange={e=>setEmail(e.target.value)}
                        />
                    </Form.Group>
                        </Col>
                        <Col sm={12} className='pt-2 mt-2'>
                        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                            <Row>
                                <Col sm={6}>
                                <Form.Label >Password</Form.Label>
                                </Col>
                                <Col sm={6}>
                                <small className='d-flex justify-content-end'>Forgot Your Password?</small>
                                </Col>
                            </Row>
                         <Form.Control size="sm" 
                         type="password" 
                         placeholder="password"
                         onChange={e=>setPassword(e.target.value)}
                         />
                    </Form.Group>
                        </Col>
                        <Col sm={12} className=''>
                        <Form.Group>
                            <br></br>
                           <input type='checkbox'/>
                           <p className='' style={{display:'inline'}}> Remember Me</p>
                       </Form.Group>
                        </Col>
                        <Col sm={12} className='py-2 mt-3'>
                        <Form.Group className="mb-3 text-light" controlId="exampleForm.ControlInput1">
                         <Form.Control size="sm" type="Button" placeholder="Login" className=''  value='Login' style={{background:'#4cab48', color:'white', fontWeight:'light'}}/>
                    </Form.Group>
                        </Col>
                    {
                    error && <p>Something went wrong, Please try again.</p>
                    }

                    </Row>
                </Form>
                </BorderDiv>
                </Container>
                       
      );
}

export default UserForm;