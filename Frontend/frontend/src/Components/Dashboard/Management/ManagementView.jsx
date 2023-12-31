import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import SideNav2 from '../../LandingPage/SideNav2';
import Navbar from '../../LandingPage/Navbar';
import Progress from './Cards/Progress';
// import "./navStyle.scss";

const ViewWrapper = styled.div`
  background: #eff1f1;
  margin:0;
  padding: 0 10px;
`;
  
function MgtView() {

    return(
        <React.Fragment>
                <Navbar/>
                <ViewWrapper>
                    <Row>
                        <Col sm={2} style={{padding:'10px 10px 10px 0px'}}>
                            <SideNav2  />
                        </Col>
                        <Col sm={9}> 
                            <Progress/>
                        </Col>
                    </Row>
                </ViewWrapper>
        </React.Fragment>

    )
}

export default MgtView;
