import React from 'react';
import styled from 'styled-components';
import {Row, Col, Container} from 'react-bootstrap';
import SideNav2 from '../LandingPage/SideNav2';
import TransactionTable from './AllDealsTable';
import Navbar from '../LandingPage/Navbar';


const ViewWrapper = styled.div`
  margin:0;
  padding: 0 10px;
`;

export default function AllDeals(){
    return(
        <React.Fragment>
            <Navbar/>
            <ViewWrapper>
            <Row>
                <Col sm={3} style={{padding:'10px 10px 10px 0px'}}>
                    <SideNav2/>
                </Col>

                <Col sm={9}>
                    {/* <TransactionCards/> */}
                    <Container>
                        <TransactionTable />
                    </Container>
                </Col>
            </Row>
            </ViewWrapper>
        </React.Fragment>
    )
}
