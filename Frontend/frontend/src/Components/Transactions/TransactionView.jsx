import React,{useState} from 'react';
// import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {Row, Col, Container} from 'react-bootstrap';
import SideNav2 from '../LandingPage/SideNav2';
import TransactionTable from './TransactionTable';
import TransactionCards from './TransactionCards';
import Navbar from '../HomePage/Navbar';

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
                <Col sm={3} style={{padding:'10px 10px 10px 0px'}}>
                    <SideNav2/>
                </Col>
                <Col sm={9}>
                    <TransactionCards/>
                    <Container>
                        <TransactionTable />
                    </Container>
                </Col>

            </Row>
            </ViewWrapper>
        </React.Fragment>
    )
}

