import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Nav, Form } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import InfraCredit from '../../Images/InfraCredit.svg';
import { Link } from 'react-router-dom';
import MenuOption from './MenuOption';
import { GlobalFilter } from '../Transactions/TransactionTable';
import SearchFY from './SearchFY';
import Services from "../../Services/Service";


const NavbarNav = styled.div`
background:#eff1f1;
margin: 25px 5px;
display:flex;
justify-content: space-between;
align-items: center;
`

const Navbar = ({ handleToggleSidebar, props }) => {
    // const [aFY, SetAFY] = useState()

    // useEffect(() => {
    //   retrieveFY();
    // }, []);
    
    // const retrieveFY = () => {
    //   Services.getFY("''")
    //   .then((response) => {
    //       response.data.financial_years.map(fy => {
    //         if(fy.fy_status == 'Active') {
    //           // localStorage.setItem("fy", JSON.stringify(fy.fy))
    //           SetAFY(fy.fy)
    //         }
    //       })
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // };

    // console.log("I am fron Navbr", aFY)

    return (
        <React.Fragment>
            <NavbarNav>
                
                {/*---------------------------  Logo Div ------------------------------------- */}
                <div>
                    <Link to ='/landing'>
                    <img src={InfraCredit} alt='logo' width='150' />

                    </Link>
                </div>
              

                {/*----------------------- Icon Div ------------------------------------------- */}
                <div style={{display: 'flex', marginLeft: '20px', paddingTop: '20px' }}>
                    <div style={{marginRight: '75px', paddingTop: '8px' }}>
                        <SearchFY />
                    </div>
                    <div>
                        <MenuOption/>
                    </div>
                </div>

            </NavbarNav>
        </React.Fragment>
    )
}

export default Navbar;