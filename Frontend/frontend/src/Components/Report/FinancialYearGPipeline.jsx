import React,{useContext} from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import ChartProducts from "./ChartProducts";
import ReportRegion from "./ReportRegion";
import SectorChart from "./SectorChart";
import TitleContext from "../../context/TitleContext";
import Editable from "react-editable-title";
export default function FinancialYearGPipeline() {
  const handleTextUpdates = (current) => {
    addPipelines(current);
  };
  const handleYearUpdates = (current) => {
    addGPYear(current);
  };
  const { addPipelines, reportStore,guarPipelineYear,addGPYear } = useContext(TitleContext);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <React.Fragment>
      <Container fluid className="my-1 pt-2">
        <Stack gap={1}>
          <p style={{ fontWeight: "bold" }}>
            <Editable
            text={guarPipelineYear}
            editButtonStyle={{ lineHeight: "unset" }}
            editButton
            editControlButtons
            placeholder="Type here"
            cb={handleYearUpdates}
          />
            </p>
        </Stack>
        <div> 
        </div>
        <Row>
          <Col sm="6" className="my-1 pt-3">
            <p><Editable
            text={reportStore}
            editButtonStyle={{ lineHeight: "unset" }}
            editButton
            editControlButtons
            placeholder="Type here"
            cb={handleTextUpdates}
          /></p>
          </Col>
          <Col sm="6" className="">
              <p
                className="text-dark pt-3 mt-3"
                style={{ fontWeight: "", textAlign: "center" }}
              >
                Pipeline By Sector
              </p>
              <SectorChart/>
          </Col>
        </Row>
        <Row>
          <Col sm="6" className="mt-3 pt-3">
            <Stack
              gap={1}
              className="text-dark"
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "13px",
              }}
            >
              Pipeline Distribution By Region
            </Stack>
            
            <ReportRegion/>
          </Col>
          <Col sm="6" className="mt-3 pt-3">
            <Stack
              gap={1}
              className="text-dark"
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "13px",
              }}
            >
              Pipeline Distribution By Product
            </Stack>
            <ChartProducts/>
            
          </Col>
        </Row>
        <div className='mt-3 pt-3'>
          <small>
            * NB: All pipeline figures and charts exclude our existing guarantee
            portfolio of Viathan, North South Power, GEL Utility, TSL, LFZC and
            GPC. We have also excluded three mandated transactions which no
            longer qualify for the pipeline due to prolonged inactivity.
          </small>
        </div>
      </Container>
    </React.Fragment>
  );
}
