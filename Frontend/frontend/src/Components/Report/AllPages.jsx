import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../LandingPage/Navbar";
import Sidenav from "../LandingPage/SideNav2";
import CurrentGuarantee from "./CurrentGuarantee";
import FinancialYearGPipeline from "./FinancialYearGPipeline";
import GuaranteePortGrowthVsTar from "./GuaranteePortGrowthVsTar";
import OriginationActivity from "./OriginationActivity";
import StructuringExecution from "./StructuringExecution";
import { Divider } from "@mui/material";
import KeyStats from "./KeyStats";
import Editable from "react-editable-title";
import TitleContext from "../../context/TitleContext";
export default function AllPages() {
  const currentQuarter = (current) => {
    addCurrentQuarter(current);
  };

  const currentFY = (current) => {
    addCurrentFy(current);
  };

  const {
    addCurrentQuarter,
    addCurrentFy,
    currentFyStore,
    currentQuarterStore,
  } = useContext(TitleContext);

  return (
    <React.Fragment>
      <Navbar />
      <div style={{ textAlign: "right", fontWeight: "bold" }}>
        Quarterly Report for :
        <Editable
          text={currentFyStore}
          editButtonStyle={{ lineHeight: "unset" }}
          editButton
          editControlButtons
          placeholder="Type here"
          cb={currentFY}
        />
        <span>
          Quarter :
          <Editable
            text={currentQuarterStore}
            editButtonStyle={{ lineHeight: "unset" }}
            editButton
            editControlButtons
            placeholder="Type here"
            cb={currentQuarter}
          />
        </span>{" "}
      </div>
      <Row>
        <Col sm={3} lg={2} className="">
          <Sidenav />
        </Col>
        <Col sm={8} lg={9} className="my-3">
          <Container fluid>
            <CurrentGuarantee />
          </Container>
        </Col>
        <Divider></Divider>
        <Container>
          <KeyStats />
        </Container>
      </Row>
      <Container>
        <GuaranteePortGrowthVsTar />
        <FinancialYearGPipeline />
        <OriginationActivity />
        <StructuringExecution />
      </Container>
      {/* </ApiProvider> */}
    </React.Fragment>
  );
}
