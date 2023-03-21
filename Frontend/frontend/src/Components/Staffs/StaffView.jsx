import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import Sidenav from '../LandingPage/SideNav2';
import Navbar from '../LandingPage/Navbar';
import NewStaff from './NewStaff';

const ViewWrapper = styled.div`
  background: #eff1f1;
  margin:0 2rem 5rem 0;
  padding: 0 10px;
`;

export default function StaffView() {
    return (
        <React.Fragment>
            <Navbar />
            <ViewWrapper>
                <Row >
                    <Col sm={3} style={{padding:'10px 10px 10px 0px'}}>
                        <Sidenav />
                    </Col>
                    <Col sm={9} className=' '>
                        {/* d-flex justify-content-center mr-2 */}
                        <NewStaff />
                        
                    </Col>
                    
                </Row>
            </ViewWrapper>

        </React.Fragment>

    )
}

