import React from 'react';
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
    return(
        <React.Fragment>
            <Navbar/>
            <ViewWrapper>
            <Row>
                <Col sm={2} style={{padding:'5px'}}>
                    <SideNav2/>
                </Col>
                <Col sm={8}>
                    <TransactionCards/>
                    {/* <TransactionTable/> */}
                </Col>

            </Row>
            </ViewWrapper>
        </React.Fragment>
    )
}

