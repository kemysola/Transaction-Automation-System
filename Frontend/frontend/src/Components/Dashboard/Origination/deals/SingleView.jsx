import React from 'react';
import styled from 'styled-components';
import {Row,Col} from 'react-bootstrap'
import SideNav2 from '../../../LandingPage/SideNav2';
import Navbar from '../../../LandingPage/Navbar';
//import Card from './Cards/Cards';
//import StaffList from './stafflist/StaffList';
import { useTable, useResizeColumns, useFlexLayout, useRowSelect, usePagination, useGlobalFilter, useAsyncDebounce, useFilters } from 'react-table'
import SingleStaff from './SingleStaff';
import ProgressOrigination from '../../Execution/Cards/ProgressOrigination';


const ViewWrapper = styled.div`
  background: #eff1f1;
  margin:0;
  padding: 0 10px;
`;

const SingleView =()=> {
    return(
        <React.Fragment>
            <Navbar/>
            <ViewWrapper />
            <Row>
                <Col sm={3} style={{padding:'10px 10px 10px 0px'}}>
                    <SideNav2/>
                </Col>

                <Col sm={8}> 
                    <ProgressOrigination />                   
                </Col>

                {/* <Col sm={8}>
                    <SingleStaff/>
                </Col> */}
                
                </Row>

        </React.Fragment>

    )
}

export default SingleView;