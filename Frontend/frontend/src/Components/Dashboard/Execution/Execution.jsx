import React from 'react';
import styled from 'styled-components';
import {Row,Col} from 'react-bootstrap';
import SideNav2 from '../../LandingPage/SideNav2';
import Navbar from '../../LandingPage/Navbar';
import Stats from '../Management/Cards/Stats';
//import Table from './Table'
import StaffTable from '../../Staffs/StaffTable';


const ViewWrapper = styled.div`
  background: #eff1f1;
  margin:0;
  padding: 0 10px;

`;

export default function Execution(){
    return(
        <React.Fragment>
            <Navbar/>
            <ViewWrapper>
            <Row>
                    <Col sm={3} style={{padding:'10px'}}>
                        <SideNav2/>
                    </Col>
                    <Col sm={9}> 
                    
                        
                    </Col>
                        
                    
            </Row>
            </ViewWrapper>

        </React.Fragment>

    )
}

