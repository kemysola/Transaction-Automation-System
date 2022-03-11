import React from 'react';
import styled from 'styled-components';
import {Row,Col} from 'react-bootstrap'
import SideNav from '../../LandingPage/SideNav2';
import Navbar from '../../LandingPage/Navbar';
import Card from './Cards/Cards';

const ViewWrapper = styled.div`
  background: #eff1f1;
  margin:0;
  padding: 0 10px;

`;

const Origination =()=> {
    return(
        <React.Fragment>
            <Navbar/>
            <ViewWrapper/>
            <Row>
                <Col sm={3} style={{padding: '10px'}}>
                    <SideNav/>
                </Col>
                <Col sm={8}>
                    <Card/>
                </Col>
            </Row>

        </React.Fragment>

    )
}

export default Origination;