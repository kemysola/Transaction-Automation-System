import React from 'react';
import styled from 'styled-components';
import { Container, Nav, Form } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import InfraCredit from '../../Images/InfraCredit.svg';
import { Link } from 'react-router-dom';
import MenuOption from './MenuOption';
const NavbarNav = styled.div`
background:#eff1f1;
// padding:1px 10px;
margin: 15px 5px;
// margin-bottom:0.1px;
display:flex;
// grid-template-columns: auto auto auto auto;
justify-content: space-between;
align-items: center;
`

const Navbar = ({ handleToggleSidebar, props }) => {
    return (
        <React.Fragment>
            <NavbarNav>
                
                {/*---------------------------  Logo Div ------------------------------------- */}
                <div>
                    <img src={InfraCredit} alt='logo' width='150' />
                </div>

                
                {/*----------------------- Icon Div ------------------------------------------- */}
                <div style={{ marginTop: '20px', paddingTop: '20px' , }}>
                    <MenuOption/>
                </div>

            </NavbarNav>
        </React.Fragment>
    )
}

export default Navbar;