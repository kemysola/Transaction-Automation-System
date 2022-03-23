import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import Sidenav from '../../Components/LandingPage/SideNav2';
import Navbar from '../../Components/LandingPage/Navbar';
import UpdateTransaction from '../../Components/Transactions/UpdateTransaction';

const ViewWrapper = styled.div`
  background: #eff1f1;
  margin:0;
  padding: 0 10px;
`;

export default function NewTransaction() {
    return(
        <React.Fragment>
            <Navbar/>
            <ViewWrapper>
            <Row>
                <Col sm={3} style={{padding:'10px 10px 10px 0px'}}>
                    <Sidenav/>
                </Col>
                <Col sm={8} className='bg-light py-3'> 
                    <UpdateTransaction />
                </Col>
                </Row>
            </ViewWrapper>

        </React.Fragment>
    )
}

