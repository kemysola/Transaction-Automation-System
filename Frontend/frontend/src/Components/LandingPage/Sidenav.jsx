import React, {useState} from 'react';
import {Container} from 'react-bootstrap';
import styled from 'styled-components';
import MenuItem from './MenuItem';
/*import { BsFillCalendar2RangeFill } from "react-icons/bs";*/

const AppWrapper = styled.div`
    padding: 1.5rem ;
    border-right: 1px solid black;
    background: #eff1f1;
    overflow:hidden;

`;

const Green = styled.small`
color:#32CD32;
font-weight:bold;
`;

const PowerDiv = styled.div`
margin-top:4rem;
padding:4em 0;
`;


const Sidenav =()=>{
    const menuItems =[
        {
        name:'Transactions',
        to: '/',
        iconClassName:"jam:dashboard",
        subMenus:[
            {icon:"bi bi-wallet2"},
            {name:'Transactions'},
            {name:'New Transactions'},

        ]},

        {
        name:'Staffs',
        to: '/',

        subMenus:[
            {icon:"bi bi-people-fill"},
            {name:'Staffs'},
            {name:'New Staffs'},

        ]},

        {
        name:'Dashboard',
        to: '/', 
        subMenus:[
            {icon:"bi bi-speedometer2"},
            {name:'Origination Dashboard'},
            {name:'Management Dashboard'},
            {name:'Execution Dashboard'},

        ]},

        {
        name:'Budget',
        to: '/',
        subMenus:[
            {icon:"bi bi-wallet"},
            {name:'Origination Dashboard'},
            {name:'Management Dashboard'},
            {name:'Execution Dashboard'},

        ]},
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
                    
                    />
                ))}

                <PowerDiv>
                <i class="bi bi-power" style={{color:'red'}} ></i>
                <span style={{color:'#1184C2'}}>  Log Out</span>
                </PowerDiv>

                </Container>
            
                
               
            </AppWrapper>
        </React.Fragment>
    )
    
}
export default Sidenav;
    
