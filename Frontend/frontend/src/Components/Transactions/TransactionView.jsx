import React,{useState} from 'react';
// import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {Row,Col} from 'react-bootstrap';
import SideNav2 from '../LandingPage/SideNav2';
import TransactionTable from './TransactionTable';
import TransactionCards from './TransactionCards';
import Navbar from '../LandingPage/Navbar';


const ViewWrapper = styled.div`
  margin:0;
  padding: 0 10px;
`;

export default function TransactionView(){
//     const location = useLocation();

//   const query_ = useLocation().search;
//   const name = new URLSearchParams(query_).get("token");
//     console.log(name)

    return(
        <React.Fragment>
            <Navbar/>
            <ViewWrapper>
            <Row>
                <Col sm={3} style={{padding:'5px'}}>
                    <SideNav2/>
                </Col>
                <Col sm={9}>
                    <TransactionCards/>
                    {/* <TransactionTable/> */}
                </Col>

            </Row>
            </ViewWrapper>
        </React.Fragment>
    )
}

