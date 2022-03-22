import React, { useEffect, useState } from "react";
import UserLogin from "../Login/UserLogin";
import "./Main.css";
import logo1 from "../../../Images/logo.jpg";
import { Row, Container, Col, Stack } from "react-bootstrap";

const Main = () => {
  return (
    <div className="bodyBackground">
      <Container fluid>
        <Row>
        <div className="my-0">
              <img src={logo1} alt="whiteLogo" width="160" />
            </div>
          <Col sm={6} lg={7} className='d-none d-sm-block'>
            
            <Container className="containerMargin  ">
              <div className="justify-content-center py-3 my-3 ">
                <Stack gap={2} >
                  <div className="py-2">
                    <h1 className="text-light">Unlocking long-term local </h1>
                    <h1 className="text-light">currency infrastructure </h1>
                    <h1 className="text-light">finance in Nigeria</h1>
                  </div>
                </Stack>
              </div>
            </Container>
          </Col>
          <Col
            sm={6}
            lg={5}
            md={"auto"}
            className="justify-content-center"
            style={{  marginTop: "20px" }}
          >
            <div className="" style={{ borderRadius: "20px"}}>
              <UserLogin />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Main;
