import React from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import MainCards from './MainCards';
import Sidenav from './Sidenav';
import styled from 'styled-components';
import Navbar from './Navbar';

const LandingWrapper = styled.div`
  margin:0;
  padding: 0 10px;

`;


const Landing =()=>{
    return(
        <React.Fragment>
            <Navbar/>
            <LandingWrapper>
            <Row>
                    <Col sm={3} style={{padding:'10px'}}>
                        <Sidenav/>
                    </Col>
                    <Col sm={7}> 
                        <MainCards/> 
                    </Col>
                    
                </Row>
            </LandingWrapper>
                
        </React.Fragment>

    )
}

export default Landing;