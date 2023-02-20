import { useEffect, useState,useRef } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  FloatingLabel,
  InputGroup,
} from "react-bootstrap";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import TransactionChart from "../TransactionChart";
import Service from "../../../Services/Service";
import CurrentGPortfolio from "./CurrentGPortfolio";
import GuaranteePipeline from "./GuaranteePipeline";
import Statistics from "./Statistics";
import PortGrowthAndTarget from "./PortGrowthAndTarget";
import OriginationActivities from "./OriginationActivities";
import UpdateStats from "./UpdateStats";
import EditOriginationActivity from "./EditOriginationActivity";
import UpdateStructuringReport from "./UpdateStructuringReport";

import Navbar from "../../LandingPage/Navbar";
import RegisteredFields from './RegisteredFields';
import Sidenav from "../../LandingPage/SideNav2";

export default function AllReport() {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [quarter, setQuarter] = useState("");
  const [fy, setFy] = useState("");
  const [fys, setFys] = useState("");
  const [osReport, setOsReport] = useState("");
  const [structuring, setStructuring] = useState({});
  const [struct, setStructu] = useState({});
  const [keyStats, setKeyStats] = useState([]);
  const [progress, setProgress] = useState("");
  const [origination, setOrigination] = useState();
  const [execution, setExecution] = useState([]);
  const [formState, setFormState] = useState(false);

  useEffect(() => {
    getAllDeals();
  }, []);
  const getFinancialYear = localStorage.getItem("fy");
  const getAllDeals = async () => {
    await Service.getAllReport("Q7", "FY2019").then((res) => {
      if (res) {
        console.log("i am here", res.data);
        setQuarter(res.data.reportquarter);
        setFy(res.data.reportfy);
        setFys(res.data?.quarterly_report?.CurrentGuaranteePortfolio.body);
        setOsReport(res.data?.quarterly_report?.GuaranteePipeline.body);
        setStructuring(res.data?.quarterly_report?.StructuringExecution.body);
        let data = res?.data?.quarterly_report?.KeyStatics.summary.map((item) =>
          item
        );
      //   let datas = res?.data?.quarterly_report?.KeyStatics.summary.map((item) =>
      //   Object.values(item)
      // );
      console.log(data,'datas')
        // console.log(res?.data?.quarterly_report?.KeyStatics?.summary,'summary')
        // KeyStatics
        setKeyStats([data]);
        setProgress(res.data?.quarterly_report?.ProgressonGuarantee.body);
        setStructu(
          Object.keys(res.data?.quarterly_report?.StructuringExecution.body)
        );
        setOrigination(res.data?.quarterly_report?.OriginationActivity.body);
        setExecution(res.data?.quarterly_report?.ExpectedFinancialClose.body);
      }
    });
  };


  const ReportFY = useRef('')
  const ReportFYQuarter = useRef('')
  const ReportSectionContent = useRef('')

  const data = {
    // ReportFY:ReportFY.current.value,
    ReportFYQuarter:ReportFYQuarter.current.value,

  }

  console.log(ReportFYQuarter?.current.value,'fyquart', data)
  
  let progressData = structuring.Progress;
  let progressExecution = structuring.ProgressExecution;
  let ProgressStrucuring = structuring.ProgressStrucuring;

  console.log(
    execution?.map((data) => data?.InfrastructureEntity),
    "nfrac",
    execution
  );

  return (
    <>
      <Navbar />
     
      

      <Row>
        <Col sm={2}>{/* <Sidenav/> */}</Col>
        <Col
          sm={9}
          style={{ boxShadow: "0px 8px 22px #E4E4E4", borderRadus: "10px" }}
          pt="2"
          mt="2"
        >
           <Row>
        <Col sm={7}></Col>
        <Col sm={5}>
        
            <Container>
            <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon3">
          Financial Quarter:
        </InputGroup.Text>
        <Form.Control
                                size="sm"
                                type="text"
                                defaultValue='text'
                                id="ReportFYQuarter"
                                ref={ReportFYQuarter}
                                required
                              />

      </InputGroup>
    
      <Button variant="none" onClick={() => setShow(true)}>
        Edit Report
      </Button>

      <Modal
        show={show}
        size="xl"
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="example-custom-modal-styling-title"
            style={{ fontSize: "14px" }}
          >
            <p className="pt-1 mt-0 text-center">
              FINANCIAL YEAR : FY2023
              <span style={{ marginLeft: "4rem" }} className="text-center">
                {" "}
                FINANCIAL QUARTER: Q1
              </span>
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <RegisteredFields currentGuarantee={fys} financialYear={getFinancialYear} statistics={keyStats}/>

        </Modal.Body>
      </Modal>
            </Container>
          
          
        
        </Col>
      </Row>
      {/* <Form.Label htmlFor="basic-url">Your vanity URL</Form.Label> */}
     
          {/* <Container> */}
          <CurrentGPortfolio data={fys} />

          {/* <TransactionChart /> */}

          {/* </Container> */}
        </Col>
      </Row>
      <Container style={{ marginTop: "2rem" }}>
        <Statistics data={keyStats} />
        <PortGrowthAndTarget header={progress} />
        <GuaranteePipeline data={osReport} />
        <OriginationActivities data={origination} />
        <Container className="my-2 pt-2">
          <div>
            <p style={{ fontWeight: "bold" }}>
              NBC Submissions and Mandate Status – Q 2026 Update
            </p>
            <span style={{ fontWeight: "bold" }}>
              Structuring & Execution Activities
            </span>
            <Row>
              <Col sm={3}>
                <p>Progress on Due Diligence</p>
              </Col>
              <Col sm={9}>
                {structuring?.Progress !== "undefined" ? (
                  <ul>
                    <li>
                      {progressData?.map((data) => (
                        <li>{data}</li>
                      ))}
                    </li>
                  </ul>
                ) : (
                  <td></td>
                )}
              </Col>
            </Row>
            <Row>
              <Col sm={3}>
                <p>Progress on Structuring</p>
              </Col>
              <Col sm={9}>
                {structuring?.progressExecution !== "undefined" ? (
                  <ul>
                    <li>
                      {progressExecution?.map((data) => (
                        <li>{data}</li>
                      ))}
                    </li>
                  </ul>
                ) : (
                  <td></td>
                )}
              </Col>
            </Row>
            <Row>
              <Col sm={3}>
                <p>Progress on Execution</p>
              </Col>
              <Col sm={9}>
                {structuring?.ProgressStrucuring !== "undefined" ? (
                  <ul>
                    <li>
                      {ProgressStrucuring?.map((data) => (
                        <li>{data}</li>
                      ))}
                    </li>
                  </ul>
                ) : (
                  <td></td>
                )}
              </Col>
            </Row>
          </div>
        </Container>
        <TransactionChart />
      </Container>
    </>
  );
}
