import React, {Component} from 'react';
import {Row, Col, Container,Navbar, Nav, NavItem, Button, Stack} from 'react-bootstrap';
import styled from 'styled-components';
import InfraCredit from '../../Images/i.png'

const AppWrapper = styled.div`
  padding: 1.5rem  3rem;
  height: 80vh;
  border-right: 1px solid black;
  background: #eff1f1;

`;

const SideDiv = styled.div`
background:white;
padding:10px 15px;
margin: 5px;
border-radius: 14px;
color:#1184C2;
font-size:12px;
line-height:8px;
font-family: 'Roboto', sans-serif;
`;

const Green = styled.small`
color:#32CD32;
font-weight:bold;
`;



const Sidenav =()=>{
    return(
        <React.Fragment>

            <AppWrapper>
                <Container>
                <div>
                    <Stack gap={4}>
                        <div>
                            <Green>
                            <small>Transactions</small>
                            </Green>
                            
                        </div>
                        <SideDiv>
                            <p>All Transactions</p>
                            <p>New Transactions</p>
                        </SideDiv>
                        <div>  
                            <small>Staff</small>
                        </div>
                            <div>
                            <small>Dashboard</small>
                            </div>
                            
                    </Stack>
                </div>
               


                </Container>
               
            </AppWrapper>
        </React.Fragment>
    )
    
}
export default Sidenav;
    
