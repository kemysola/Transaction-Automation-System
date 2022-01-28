import React, {useState} from 'react';
import {Container} from 'react-bootstrap';
import styled from 'styled-components';
import MenuItem from './MenuItem';
import { BsFillCalendar2RangeFill } from "react-icons/bs";


const AppWrapper = styled.div`
  padding: 1.5rem ;
  height:60vh;
  border-right: 1px solid black;
  background: #eff1f1;
  overflow:hidden;

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
        iconClassName:"jam:dashboard",
        subMenus:[
            {name:'Transactions'},
            {name:'New Transactions'},

        ]},

        {
        name:'Staffs',
        to: '/',
        iconClassName:'bi bi-calendar4-event', 
        subMenus:[
            {name:'Staffs'},
            {name:'New Staffs'},

        ]},

        {
        name:'Dashboard',
        to: '/', 
        iconClassName:'bi bi-calendar4-event',
        subMenus:[
            {name:'Origination Dashboard'},
            {name:'Management Dashboard'},
            {name:'Execution Dashboard'},

        ]},

        {
        name:'Budget',
        to: '/',
        iconClassName:''
    },
    ]
    return(
        <React.Fragment>

            <AppWrapper>
                <Container>
                {menuItems.map((menuItem, index) => (
                    <MenuItem key={index}
                    name={menuItem.name} 
                    icon={menuItem.icon}
                    to={menuItem.to}
                     subMenus={
                        menuItem.subMenus
                    }
                    
                    />
                ))}
                </Container>
               
            </AppWrapper>
        </React.Fragment>
    )
    
}
export default Sidenav;
    
