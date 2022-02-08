import React from 'react';
import styled from 'styled-components';
import {Row,Col} from 'react-bootstrap';
import Sidenav from '../../Components/LandingPage/Sidenav';
import Navbar from '../../Components/LandingPage/Navbar';
import UpdateStaff from '../../Components/Staffs/UpdateStaffs';

const ViewWrapper = styled.div`
  background: #eff1f1;
  margin:0;
  padding: 0 10px;
`;

export default function AllStaff() {
    return(
        <React.Fragment>
            <Navbar/>
            <ViewWrapper>
                <Row>
                    <Col sm={3} style={{padding:'10px'}}>
                        <Sidenav/>
                    </Col>
                    <Col sm={7}> 
                        <UpdateStaff />
                    </Col>
                </Row>
            </ViewWrapper>

        </React.Fragment>
    )
}

