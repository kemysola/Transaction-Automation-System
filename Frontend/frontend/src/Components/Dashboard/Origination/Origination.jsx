import React from 'react';
import styled from 'styled-components';
import {Row,Col} from 'react-bootstrap'
import SideNav from '../../LandingPage/SideNav2';
import SideNav2 from '../../LandingPage/SideNav2';
import Navbar from '../../LandingPage/Navbar';
import Card from './Cards/Cards';
import StaffList from './stafflist/StaffList';
import SingleStaff from './deals/SingleStaff';
import ProgressOrigination from '../Execution/Cards/ProgressOrigination';
import Progress from '../Origination/Cards/Progress';



const ViewWrapper = styled.div`
  background: #eff1f1;
  margin:0;
  padding: 0 10px;
  box-shadow:10px black;
`;

const Origination =()=> {
    return(
        <React.Fragment>
            <Navbar/>
            <ViewWrapper/>
            <Row>
                <Col sm={2} style={{padding:'10px 10px 10px 0px'}}>
                    <SideNav2 />
                </Col>
                <Col sm={9}>
                    {/* <StaffList /> */}
                    <Progress/>
                    <br/>
                </Col>
                
    </Row>

        </React.Fragment>

    )
}

export default Origination;