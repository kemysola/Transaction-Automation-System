import React from 'react';
import styled from 'styled-components';
import {Row,Col} from 'react-bootstrap';
import Sidenav from '../LandingPage/Sidenav';
import TransactionDatabase from './TransactionDatabase';
import Navbar from '../LandingPage/Navbar';


const ViewWrapper = styled.div`
  margin:0;
  padding: 0 10px;
  

`;

export default function TransactionView(){
    return(
        <React.Fragment>
            <Navbar/>
            <ViewWrapper>
            <Row>
                <Col sm={3} style={{padding:'5px'}}>
                    <Sidenav/>
                </Col>
                <Col sm={7}>
                    <TransactionDatabase/>
                </Col>
                <Col sm={1}>  
                </Col>
                </Row>
            </ViewWrapper>
        </React.Fragment>

    )
}

