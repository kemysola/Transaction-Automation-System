import React from 'react';
import styled from 'styled-components';
import {Container, Row, Col, Nav, Form} from 'react-bootstrap';
import InfraCredit from '../../Images/i.png';


const NavbarNav = styled.div`
background:#eff1f1;
padding:0 10px;
margin:0;
`

const SearchBox = styled.div`
margin-left:  7rem;
padding:3rem 4rem;
text-align:center;

`;

const Input = styled.input`
border-radius:20px;
padding:5px
`;








export  default function Navbar(){
    return(
        <React.Fragment>
            <NavbarNav>
                <Container>
                <Nav> 
                {/*------------------------- Logo ---------------------------------------*/}

                <img src={InfraCredit} alt='logo' width='100'/>

                {/*----------------------------Search box------------------------------- */}
                <SearchBox>
                <Form action='' method=''>
                <input type='text' placeholder='Search' style={{borderRadius:'22px', padding:' 2px 15px', border:'none'}}/>
                </Form>
                </SearchBox>
            </Nav>
                </Container>
                

               
                {/*----------------------- Navbar Search Form --------------------- */}
                
               
            </NavbarNav>

        </React.Fragment>
    )

}