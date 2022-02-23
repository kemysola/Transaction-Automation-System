import React from 'react';
import styled from 'styled-components';
import { Container, Nav, Form } from 'react-bootstrap';
// import { FaBars } from 'react-icons/fa';
import InfraCredit from '../../Images/i.png';


const NavbarNav = styled.div`
background:#eff1f1;
padding:1px 15px;
margin-bottom:0.1px;
display:grid;
grid-template-columns:0.81fr 1.78fr 0.38fr;
justify-content:center;
`
// handleToggleSidebar

export default function Navbar() {
    return (
        <React.Fragment>
            <NavbarNav>
                {/*---------------------------  Logo Div ------------------------------------- */}
                <div>
                    <img src={InfraCredit} alt='logo' width='90' />
                </div>

                {/* ------------------------  Toggle Sidebar --------------------------------- */}
                {/* <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
                <FaBars />
            </div> */}

                {/*-------------------------  Search Div ------------------------------------ */}

                <div style={{ marginTop: '5px', paddingTop: '10px' }}>
                    <Form action='' method='post'>
                        <input type='text' placeholder='Search' style={{ border: 'none', padding: '5px 10px', outline: 'none' }} />
                        <button type="submit" style={{ background: 'white', border: 'none', padding: '5px 5px', position: 'relative', left: '0.11px' }}>
                            <i class="bi-search"></i>
                        </button>
                    </Form>
                </div>

                {/*----------------------- Icon Div ------------------------------------------- */}
                <div style={{ marginTop: '5px', paddingTop: '20px' }}>
                    <i class="bi bi-power" style={{ padding: '0 3px', color: 'red' }}></i>
                    <i class="bi bi-bell" style={{ padding: '0 2px' }}></i> <span></span>
                    <i class="bi bi-person" style={{ padding: '0 3px', background: 'green', color: 'white', borderRadius: '20px' }}></i>


                </div>



            </NavbarNav>

        </React.Fragment>
    )
}