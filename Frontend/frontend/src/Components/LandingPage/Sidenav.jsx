import React, {useState} from 'react';
import {Row, Col, Container,Navbar, Nav, NavItem, Button, Stack} from 'react-bootstrap';
import styled from 'styled-components';
import InfraCredit from '../../Images/i.png'
import MenuItem from './MenuItem';

const AppWrapper = styled.div`
  padding: 1.5rem;
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
    const menuItems =[
        {
        name:'Transactions',
        to: '/',
        iconClasName:'',
        subMenus:[
            {name:'Transactions'},
            {name:'New Transactions'},

        ]},

        {
        name:'Staffs',
        to: '/',
        iconClasName:'', 
        subMenus:[
            {name:'Staffs'},
            {name:'New Staffs'},

        ]},

        {
        name:'Dashboard',
        to: '/', 
        iconClasName:'',
        subMenus:[
            {name:'Origination Dashboard'},
            {name:'Management Dashboard'},
            {name:'Execution Dashboard'},

        ]},

        {
        name:'Budget',
        to: '/',
        iconClasName:''
    },
    ]
    return(
        <React.Fragment>

            <AppWrapper>
                <Container>
                {menuItems.map((menuItem, index) => (
                    <MenuItem key={index}
                    name={menuItem.name} 
                    to={menuItem.to}
                     subMenus={
                        menuItem.subMenus
                    }
                    iconClassName={menuItem.iconClassName}
                    />
                ))}
                </Container>
               
            </AppWrapper>
        </React.Fragment>
    )
    
}
export default Sidenav;
    
