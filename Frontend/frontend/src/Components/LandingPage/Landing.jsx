import React from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import MainCards from './MainCards';
import Sidenav from './Sidenav';
import styled from 'styled-components';
import SubCards from './SubCards';

const LandingWrapper = styled.div`
  background: #eff1f1;
  height:98vh;
  margin:0;
  padding: 0 10px;

`;


const Landing =()=>{
    return(
        <React.Fragment>
            <LandingWrapper>
            <Row>
                    <Col sm={3} style={{padding:'10px'}}>
                        <Sidenav/>
                    </Col>
                    <Col sm={6}> 
                        <MainCards/> 
                    </Col>
                    <Col sm={2}>  
                    </Col>
                </Row>
            </LandingWrapper>
                
        </React.Fragment>

    )
}

export default Landing;