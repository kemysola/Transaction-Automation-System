import React from 'react';
import styled from 'styled-components';
import {Row,Col} from 'react-bootstrap';
import SideNav2 from '../../Components/LandingPage/SideNav2';
import Navbar from '../../Components/LandingPage/Navbar';
import UpdateStaffs from '../../Components/Staffs/UpdateStaffs';

const ViewWrapper = styled.div`
  background: #eff1f1;
  margin:0;
  padding: 0 10px;
`;

export default function Updates() {
    return(
        <React.Fragment>
            <Navbar/>
            <ViewWrapper>
                <Row>
                    <Col sm={3} style={{padding:'10px 10px 10px 0px'}}>
                        <SideNav2/>
                    </Col>
                    <Col sm={9} className=' ' > 
                    <div className=' py-2'>
                    <UpdateStaffs />
                    </div>
                        
                    </Col>
                </Row>
            </ViewWrapper>

        </React.Fragment>
    )
}

