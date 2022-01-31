import React from 'react';
import styled from 'styled-components';
import {Row,Col} from 'react-bootstrap';
import Sidenav from '../LandingPage/Sidenav';
import Navbar from '../LandingPage/Navbar';
import NewStaff from './NewStaff';

const ViewWrapper = styled.div`
  background: #eff1f1;
  margin:0;
  padding: 0 10px;

`;

export default function StaffView(){
    return(
        <React.Fragment>
            <Navbar/>
            <ViewWrapper>
            <Row>
                    <Col sm={3} style={{padding:'10px'}}>
                        <Sidenav/>
                    </Col>
                    <Col sm={7}> 
                        <NewStaff/>
                    </Col>
                    <Col sm={1}>  
                    </Col>
                </Row>
            </ViewWrapper>

        </React.Fragment>

    )
}

