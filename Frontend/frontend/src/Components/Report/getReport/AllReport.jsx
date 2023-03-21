import { useEffect, useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import TransactionChart from "../TransactionChart";
import Service from "../../../Services/Service";
import CurrentGPortfolio from "./CurrentGPortfolio";
import GuaranteePipeline from "./GuaranteePipeline";
import Statistics from "./Statistics";
import PortGrowthAndTarget from "./PortGrowthAndTarget";
import OriginationActivities from "./OriginationActivities";
// import UpdateStats from "./UpdateStats";
// import EditOriginationActivity from "./EditOriginationActivity";
// import UpdateStructuringReport from "./UpdateStructuringReport";
import Navbar from "../../LandingPage/Navbar";
import RegisteredFields from "./RegisteredFields";
import Sidenav from "../../LandingPage/SideNav2";
import { Divider } from 'antd';
export default function AllReport() {
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

  useEffect(() => {
    getAllDeals();
  }, []);
  const getFinancialYear = localStorage.getItem("fy");
  const getAllDeals = async () => {
    const data= {
      financialYear: ReportFy.current.value ,
      financialQuarter:'Q7',
      // originator.current.value
    }
    console.log(data?.financialYear,'fy')
    await Service.getAllReport(data?.financialQuarter, data?.financialYear).then((res) => {
      if (res) {
        setQuarter(res.data.reportquarter);
        setFy(res.data.reportfy);
        setFys(res.data?.quarterly_report?.CurrentGuaranteePortfolio.body);
        setOsReport(res.data?.quarterly_report?.GuaranteePipeline.body);
        setStructuring(res.data?.quarterly_report?.StructuringExecution.body);
        let data = res?.data?.quarterly_report?.KeyStatics.summary.map(
          (item) => item
        );
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
  const ReportFYQuarter = useRef("");
  const ReportFy = useRef("");
  let progressData = structuring.Progress;
  let progressExecution = structuring.ProgressExecution;
  let ProgressStrucuring = structuring.ProgressStrucuring;
  return (
    <>
      <Navbar />
      <Row>
        <Col sm={3}>
          <Sidenav />
        </Col>

        <Col
          sm={7}
          style={{ boxShadow: "0px 8px 22px #E4E4E4", borderRadus: "10px" }}
          pt="1"
          mt="2"
        >
          <CurrentGPortfolio data={fys} />

          {/* <TransactionChart /> */}

          {/* </Container> */}
        </Col>
        <Col sm={2}>
          <Row>
            <Col>
              <Container>
              <Form.Label>Financial Year:</Form.Label>
                <br />
                <Form.Control
                  size="sm"
                  type="text"
                  defaultValue="FY2022"
                  id="ReportFy"
                  ref={ReportFy}
                  required
                />
                <Form.Label>Financial Quarter:</Form.Label>
                <br />
                <Form.Control
                  size="sm"
                  type="text"
                  defaultValue="Q1"
                  id="ReportFYQuarter"
                  ref={ReportFYQuarter}
                  required
                />
                
                <br />
                <br />
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
                        <span
                          style={{ marginLeft: "4rem" }}
                          className="text-center"
                        >
                          FINANCIAL QUARTER: Q1
                        </span>
                      </p>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <RegisteredFields
                      currentGuarantee={fys}
                      financialYear={getFinancialYear}
                      statistics={keyStats}
                    />
                  </Modal.Body>
                </Modal>
              </Container>
            </Col>
          </Row>
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
