import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import MenuItem from './MenuItem';

const AppWrapper = styled.div`
    border-right: 1px solid black;
    background: #eff1f1;
    //overflow:hidden;
    padding-top:10px;

`;

const PowerDiv = styled.div`
`;


const Sidenav = () => {
    const menuItems = [
        {
            name: 'Transactions',
            to: '/',
            iconClassName: "jam:dashboard",
            subMenus: [
                { icon: "bi bi-wallet2" },
                { name: 'Transactions' },
                { name: 'New Transactions' },

            ]
        },

        {
            name: 'Staffs',
            to: '/',
            subMenus: [
                { icon: "bi bi-people-fill" },
                { name: 'Staffs' },
                { name: 'New Staffs' },

            ]
        },

        {
            name: 'Dashboard',
            to: '/',
            subMenus: [
                { icon: "bi bi-speedometer2" },
                { name: 'Origination Dashboard' },
                { name: 'Management Dashboard' },
                { name: 'Execution Dashboard' },

            ]
        },

        {
            name: 'Budget',
            to: '/',
            subMenus: [
                { icon: "bi bi-wallet" },
                { name: 'Origination Dashboard' },
                { name: 'Management Dashboard' },
                { name: 'Execution Dashboard' },
            ]
        },
    ]

    return (
        <React.Fragment>
            <Container>
                <AppWrapper>
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
                        <i class="bi bi-power" style={{ color: 'red' }} ></i>
                        <span style={{ color: '#1184C2' }}>  Log Out</span>
                    </PowerDiv>
                </AppWrapper>
            </Container>
        </React.Fragment>
    )
}
export default Sidenav;

