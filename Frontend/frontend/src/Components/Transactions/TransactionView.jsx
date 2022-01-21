import React from 'react';
import styled from 'styled-components';
import {Container,Row,Col} from 'react-bootstrap';
import NewTransactions from './NewTransactions';
import Sidenav from '../LandingPage/Sidenav';

const ViewWrapper = styled.div`
  background: #eff1f1;
  margin:0;
  padding: 0 10px;

`;

export default function TransactionView(){
    return(
        <React.Fragment>
            <ViewWrapper>
            <Row>
                    <Col sm={3} style={{padding:'10px'}}>
                        <Sidenav/>
                    </Col>
                    <Col sm={7}> 
                        <NewTransactions/>
                    </Col>
                    <Col sm={1}>  
                    </Col>
                </Row>
            </ViewWrapper>

        </React.Fragment>

    )
}

