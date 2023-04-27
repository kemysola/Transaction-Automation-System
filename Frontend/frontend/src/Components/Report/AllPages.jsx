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
import "./index.css";
import { Button, Space } from "antd";
import { Switch, Route, Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

export default function AllPages() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [activeTabKey1, setActiveTabKey1] = useState("tab1");
  const [activeTabKey2, setActiveTabKey2] = useState("app");
  const [showForm, setShowForm] = useState(false);
  const [showFormA, setShowFormA] = useState(false);
  const [showFormB, setShowFormB] = useState(false);
  const [showFormC, setShowFormC] = useState(false);
  const [showFormD, setShowFormD] = useState(false);

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
  const handleClick = () => {
    setShowForm(true);
  };

  const handleClickA = () => {
    setShowFormA(true);
  };

  const handleClickB = () => {
    setShowFormB(true);
  };
  const handleClickC = () => {
    setShowFormC(true);
  };
  const currentFy = currentFyStore[0];
  const currentQT = currentQuarterStore[0];

  return (
    <React.Fragment>
      <Navbar />
      {/* <AllReport/> */}

      <Row>
        <Col sm={3} lg={3} className="">
          <Sidenav />
        </Col>
        <Col
          sm={8}
          className="my-3 pt-2"
          style={{ border: "1.2px dashed #E2E2E2", borderRadius: "15px" }}
        >
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
          {/* <Card
          headStyle={{backgroundColor:'white',}}
            style={{ background: "none", color: "" }}
            tabList={tabListNoTitle}
            activeTabKey={activeTabKey2}
            // tabBarExtraContent={<a href="#">More</a>}
            onTabChange={onTab2Change}
          >
            {contentListNoTitle[activeTabKey2]}
          </Card> */}
          <div>{/* <StructuringExecution /> */}</div>

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
      <Container>
        <Container>
          <Row style={{ marginLeft: "0.8em" }}>
            <Col lg={2}></Col>
            <Col lg={10}>
              <div className="space-align-container">
                <div
                  className="space-align-block"
                  style={{
                    border: "1px dotted green",
                    borderRadius: "5px",
                    paddingTop: "1.3rem",
                  }}
                >
                  <Space align="center">
                    Guarantee Portfolio
                    <Fab color="success" aria-label="add">
                      <AddIcon onClick={handleClick} />
                    </Fab>
                  </Space>
                </div>
                <div
                  className="space-align-block"
                  style={{
                    border: "1px dotted green",
                    borderRadius: "5px",
                    paddingTop: "1.3rem",
                  }}
                >
                  <Space align="center">
                    Origination Activity
                    <Fab color="success" aria-label="add">
                      <AddIcon onClick={handleClickA} />
                    </Fab>
                  </Space>
                </div>
                <div
                  className="space-align-block"
                  style={{
                    border: "1px dotted green",
                    borderRadius: "5px",
                    paddinTop: "1.3rem",
                  }}
                >
                  <Space align="center">
                    structuring reports
                    <Fab color="success" aria-label="add">
                      <AddIcon onClick={handleClickB} />
                    </Fab>
                  </Space>
                </div>
                <div
                  className="space-align-block "
                  style={{
                    border: "1px dotted green",
                    borderRadius: "5px",
                    paddingTop: "1.3rem",
                  }}
                >
                  <Space align="center">
                    Execution Report{" "}
                    <Fab color="success" aria-label="add">
                      <AddIcon onClick={handleClickC} />
                    </Fab>
                  </Space>
                </div>
                {/* <div className="space-align-block" style={{border:'1px dotted green',borderRadius:'5px',paddingTop:'1.3rem'}}>
                  <Space align="center">
                    Execution Report{" "}
                    <Fab color="success" aria-label="add">
                      <AddIcon onClick={handleClickC} />
                    </Fab>
                  </Space>
                </div> */}
              </div>
              {showForm && (
                <div className="mt-3 pt-2">
                  <button
                    className="bg-success text-light"
                    onClick={() => setShowForm(false)}
                  >
                    X
                  </button>{" "}
                  <CurrentGuarantee fy={currentFy} qt={currentQT} />
                  <GuaranteePortGrowthVsTar fy={currentFy} qt={currentQT} />
                </div>
              )}
              {showFormA && (
                <div
                  className="mt-2 py-1"
                  style={{
                    height: "56vh",
                    // background: "#E4E4E4",
                    overflow: "scroll",
                    padding: "10px",
                    overflowX: "hidden",
                  }}
                >
                  {" "}
                  <button
                    onClick={() => setShowFormA(false)}
                    className="bg-success text-light"
                  >
                    X
                  </button>
                  <OriginationActivity fy={currentFy} qt={currentQT} />
                </div>
              )}
              {showFormB && (
                <div
                  className="mt-2 py-1"
                  style={{
                    overflow: "scroll",
                    padding: "10px",
                    overflowX: "hidden",
                  }}
                >
                  {" "}
                  <button
                    onClick={() => setShowFormB(false)}
                    className="bg-success text-light"
                  >
                    X
                  </button>
                  <StructuringExecution fy={currentFy} qt={currentQT} />
                </div>
              )}

              {showFormC && (
                <div className="mt-3 pt-2">
                  <button
                    className="bg-success text-light"
                    onClick={() => setShowFormC(false)}
                  >
                    X
                  </button>{" "}
                  <FinancialYearGPipeline fy={currentFy} qt={currentQT} />
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </Container>
    </React.Fragment>
  );
}
