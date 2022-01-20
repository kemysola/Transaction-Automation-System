import React, {Component} from 'react';
import {Row, Col, Container,Navbar, Nav, NavItem, Button, Stack} from 'react-bootstrap';
import styled from 'styled-components';

const AppWrapper = styled.div`
  padding: 1.5rem;
  background-position: 150px -150px;
  height: 80vh;
  border-right: 1px solid black;
  background: #eff1f1;

`;


const Sidenav =()=>{
    return(
        <React.Fragment>
            <AppWrapper>
                <div>
                    <Stack gap={4}>
                        <div>
                            <small>Transactions</small>
                        </div>
                        <div>
                            <div>
                               <small>All Transactions</small>
                            </div>
                            <div>
                                <small>New Transaction</small>
                            </div>
                        </div>
                        <div>
                            <small>Staff</small>
                        </div>
                            <div>
                            <small>Dashboard</small>
                            </div>
                            
                    </Stack>
                </div>
               


            </AppWrapper>
        </React.Fragment>
    )
    
}
export default Sidenav;
    
