import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Stack, Container } from 'react-bootstrap';
import styled from 'styled-components';
import SubCards from './SubCards';
import './MainCards.css';
import { FaRegHandshake } from 'react-icons/fa'
import { GoDeviceDesktop } from 'react-icons/go'
import { RiCalculatorLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'




const MainCards = () => {
      // ******************************************  use state hook to store state: email ****************************************

    const [userEmail, setUserEmail] = useState()

      // *******************************     use effect hook - componentDidMount and ComponentDidReceive *************************

    useEffect(() => {
        users()

    })

      // ****************************************** retrieve state from local storage ****************************************

    const users = () =>{
        const user = JSON.parse(localStorage.getItem('user'))
        const username = user.name
        var name   = username.substring(0, username.lastIndexOf("@"));
        const nameCase = name.toUpperCase()
        setUserEmail(nameCase)


    }

    return (
        <React.Fragment>
            <Container>
                <div className='title'>
                    <p class='' style={{ color: '#1184c2', fontWeight:"13px" }}>Welcome Back <b>{userEmail}</b></p>
                </div>

                <Row >
                    <Col sm={6}  lg={4} md={6} className='my-1'>
                        <div className="bg-light py-2">
                            <li className='text-center' style={{ fontWeight: 'bold', listStyleType: 'none' }}>
                                <Link to='#'  style={{ textDecoration: "none", color: '#1184c2', fontFamily:'PT Serif' }}>
                                    BUDGET MANAGER
                                </Link>
                            </li>
                            <div className='text-center text-success'>
                                <h1 style={{ fontSize: '80px' }}><RiCalculatorLine /></h1>
                            </div>
                        </div>

                    </Col>
                    <Col sm={6}  lg={4} md={6}  className='my-1'>
                        <div className="bg-light py-2">
                            <li className='text-center' style={{ fontWeight: 'bold', listStyleType: 'none' }}>

                                <Link to='/dashboard' style={{ textDecoration: "none", color: '#1184C2', fontFamily:'PT Serif' }}>
                                    ANALYTICS MODULE
                                </Link>
                            </li>
                            <div className='text-center text-success'>
                                <h1 style={{ fontSize: '80px' }}><GoDeviceDesktop /></h1>
                            </div>
                        </div>


                    </Col>
                    <Col sm={6}  lg={4} md={6} className='my-1'>
                        <div className="bg-light py-2">
                            <li className='text-center' style={{ fontWeight: 'bold', listStyleType: 'none' }}>
                                <Link to='/create_transaction' style={{ textDecoration: "none", color: '#1184C2',fontFamily:'PT Serif' }}>
                                    DEAL MANAGER
                                </Link>
                            </li>
                            <div className='text-center text-success'>
                                <h1 style={{ fontSize: '80px' }}><FaRegHandshake /></h1>
                            </div>

                        </div>

                    </Col>
                </Row>
            </Container>
            <Container>
                <br/>
                <div class='subCardsContainer'>
                    <SubCards />
                </div>

            </Container>
        </React.Fragment>

    )
}

export default MainCards;
