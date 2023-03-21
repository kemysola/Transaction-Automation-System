import React, { useContext, useState } from "react";
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
import AllReport from "./getReport/AllReport";
import { Card } from "antd";

export default function AllPages() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [activeTabKey1, setActiveTabKey1] = useState("tab1");
  const [activeTabKey2, setActiveTabKey2] = useState("app");

  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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

  const tabList = [
    {
      key: "tab1",
      tab: "tab1",
    },
    {
      key: "tab2",
      tab: "tab2",
    },
  ];

  const contentList = {
    tab1: <p>content1</p>,
    tab2: <p>content2</p>,
  };

  const tabListNoTitle = [
    {
      key: "Article",
      tab: "Current Guarantee Portfolio",
    },
    {
      key: "app",
      tab: "Guarantee Portfolio Growth Vs. Target",
    },
    {
      key: "origination",
      tab: "Origination Activity",
    },
    {
      key: "project",
      tab: "Guarantee Pipeline",
    },
  ];

  const contentListNoTitle = {
    Article: (
      <div>
        <CurrentGuarantee />
        <KeyStats />
      </div>
    ),
    app: (
      <div>
        <GuaranteePortGrowthVsTar />

      </div>
    ),
    origination: (
      <div>
        <OriginationActivity />
      </div>
    ),
    project: (
      <div>
        <FinancialYearGPipeline />
      </div>
    ),
  };

  return (
    <React.Fragment>
      <Navbar />
      {/* <AllReport/> */}

      <Row>
        <Col sm={3} lg={3} className="">
          <Sidenav />
        </Col>
        <Col sm={8} className="my-3 pt-2" style={{border:'1.2px dashed #E2E2E2',borderRadius:'15px'}}>
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
          <br />
          <Card
          headStyle={{backgroundColor:'white',}}
            style={{ background: "none", color: "" }}
            tabList={tabListNoTitle}
            activeTabKey={activeTabKey2}
            // tabBarExtraContent={<a href="#">More</a>}
            onTabChange={onTab2Change}
          >
            {contentListNoTitle[activeTabKey2]}
          </Card>
          <div>
          <StructuringExecution />

          </div>

          {/*  <div style={{ textAlign: "right", fontWeight: "bold" }}>
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
      </div> */}
          {/* <Container>
            <CurrentGuarantee />
          </Container> */}
        </Col>
        {/* <Divider></Divider>
        <Container>
          <KeyStats />
        </Container> */}
      </Row>
      {/* <Container>

        <GuaranteePortGrowthVsTar />
        <FinancialYearGPipeline />
        <OriginationActivity />
        <StructuringExecution />
      </Container> */}
      {/* </ApiProvider> */}
    </React.Fragment>
  );
}
