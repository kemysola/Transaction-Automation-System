import React, { useContext, useEffect } from "react";
import { Stack, Container } from "react-bootstrap";
import StructuringItem from "./StructuringItem";
import StructuringItem2 from "./StructuringItem2";
import StructuringItem3 from "./StructuringItem3";
import TransactionChart from "./TransactionChart";
import Editable from "react-editable-title";
import TitleContext from "../../context/TitleContext";
import Service from "../../Services/Service";

export default function StructuringExecution() {
  const currentYear = localStorage.getItem("currentFy");
  const handleStatsYear = (current) => {
    addStructuring(current);
  };
  const { structuringDev, addStructuring } = useContext(TitleContext);
  useEffect(() => {
    getExecutionData();
    submitData();
  }, []);

  const getExecutionData = async () => {
    await Service.getAllReport("Q1", "FY2024").then((res) => {});
  };
  const reportFy = localStorage.getItem("currentFy");
  const currentFy = JSON.parse(reportFy);

  /**
   * Set Current Quarter.....
   */
  const reportQt = localStorage.getItem("currentQuarter");
  const currentFQt = JSON.parse(reportQt);

  /**
   * Post Data
   */

  const title = localStorage.getItem("title");
  const cgtBody = localStorage.getItem("titles");
  const progressBody = localStorage.getItem("progressBody");
  const guaranteeBody = localStorage.getItem("guarPYearTitle");
  const gPipelineReport = localStorage.getItem("pipelineReport");
  let postData = {
    ReportFY: currentFy[0],
    ReportFYQuarter: currentFQt[0],
    ReportSectionContent: {
      CurrentGuaranteePortfolio: {
        // "title":JSON.parse(title)[0],
        body: JSON.parse(localStorage.getItem("titles"))[0],
      },
      KeyStatics: {
        body: [
          {
            summary: "sisusjs",
          },
          {
            2017: "7890000",
          },
          {
            2020: "7890000",
          },
          {
            2021: "7890000",
          },
          {
            2022: "7890000",
          },
        ],
      },
      periodendingstats: {
        body: [
          {
            summary: "sisusjs",
          },
          {
            "2017-19": "7890000",
          },
          {
            2020: "7890000",
          },
          {
            2021: "7890000",
          },
          {
            2022: "7890000",
          },
        ],
      },
      "Progress on Guarantee Target through 31 December 2021 and Near-Term Forecast":
        {
          body: JSON.parse(progressBody)[0],
        },
      "Expected Financial Close by Quarter (Cumm)": {
        body: [
          {
            "Infrastructure Entity": "bboovifv",
          },
          {
            "Infrastructure Activity": "ckjnddjb",
          },
          {
            size: "789",
          },
          {
            "expected Closing": "2022-98-8",
          },
          {
            Yust: "hhyuueo",
          },
        ],
      },
      "Guarantee Pipeline": {
        title: JSON.parse(guaranteeBody)[0],
        body: JSON.parse(gPipelineReport)[0],
      },
      "Origination Activity": {
        "NBC Submission": localStorage.getItem("nbcActivities"),
        "NBC Tables": localStorage.getItem("originationInput"),
      },
      "Structuring & Execution": {
        "structuring & Execution": {
          "Progress on Due Diligence": localStorage.getItem("structInput"),
          "Progress on stucturing": localStorage.getItem("structStructuring"),
          "Progress on Execution": localStorage.getItem("structExecution"),
        },
      },
    },
  };

  const submitData = async () => {
    await Service.postReport(postData);
  };

  return (
    <React.Fragment>
      <br />

      <Container className="my-3 pt-2">
        <Stack gap={1} style={{ fontWeight: "bold", fontSize: "18px" }}>
          {/* <Editable
            text={structuringDev}
            editButtonStyle={{ lineHeight: "unset" }}
            editButton
            editControlButtons
            placeholder="Type here"
            cb={handleStatsYear}
          /> */}
          NBC Submissions and Mandate Status – {currentFQt[0]}{" "}
          {JSON.parse(currentYear)[0]} Update
        </Stack>
        <div>
          <p style={{ fontWeight: "bold" }}>
            Structuring & Execution Activities
          </p>
          <p style={{ fontWeight: "bold" }}>Progress on Due Diligence</p>
          <StructuringItem />
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bold" }}>Progress on Structuring</p>
          <StructuringItem2 />
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bold" }}>Progress on Execution</p>
          <StructuringItem3 />
        </div>
      </Container>
      <div>
        <button
          style={{ background: "green", color: "white", border: "none" }}
          onClick={submitData}
        >
          Submit
        </button>
      </div>

      <Container>{/* <TransactionChart/> */}</Container>
    </React.Fragment>
  );
}
