import React, { useState, useEffect,useContext } from "react";
import { Container, Table, Form } from "react-bootstrap";
import { GrAddCircle } from "react-icons/gr";
import { FiDelete } from "react-icons/fi";
import { FiSave } from "react-icons/fi";
import Editable from "react-editable-title";
import TitleContext from "../../context/TitleContext";

import { Divider } from "@mui/material";
import {
  useGetReportQuery,
  useAddReportMutation,
  // useUpdateReportMutation,
} from "../../Services/apiSlice";

export default function KeyStats() {

  const { data, isLoading, error, isError, isSuccess } = useGetReportQuery();
  const [addReport] = useAddReportMutation();

  const handleKeyStatsTitle = (current) => {
    addkeyStats(current);
  };

  const {addkeyStats,keyTitleStore } = useContext(TitleContext);

  useEffect(() => {}, [data]);


  const [nbcInfo, setNbcInfo] = useState([
    {
      summaryOfActivity: "",
      2017: 0,
      2020: 0,
      2021: 0,
      2022: 0,
    },
  ]);
  const [periodStats, setPeriodStats] = useState([
    {
      periodEndStats: "",
      2017: 0,
      2020: 0,
      2021: 0,
      2022: 0,
    },
  ]);


  const handleStatsChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...periodStats];
    list[index][name] = value;
    setPeriodStats(list);
  };




  const handleStatsAdd = () => {
    setPeriodStats([
      ...periodStats,
      {
        summaryOfActivity: "",
        2017: 0,
        2020: 0,
        2021: 0,
        2022: 0,
      },
    ]);
  };
  const handleStatsRemove = (index) => {
    const list = [...periodStats];
    list.splice(index, 1);
    setPeriodStats(list);
  };



  const addNewStats = () => {};



  const handleNbcChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...nbcInfo];
    list[index][name] = value;
    setNbcInfo(list);
  };



  const handleNbcAdd = () => {
    setNbcInfo([
      ...nbcInfo,
      {
        summaryOfActivity: "",
        2017: 0,
        2020: 0,
        2021: 0,
        2022: 0,
      },
    ]);
  };

  const handleNbcRemove = (index) => {
    const list = [...nbcInfo];
    list.splice(index, 1);
    setNbcInfo(list);
  };

  const addNewnbcInfo = () => {};

  // const dataNbcInfo = localStorage.getItem('nbcInfo')
  
  const onsubmit = () => {
    // addReport(postData);
    localStorage.setItem('keyStats',JSON.stringify(nbcInfo))
    alert('Saved Entries') 
  };

  return (
    <>
      <Container className="my-3 py-1">
      
        <p
          style={{ fontWeight: "bold", fontSize: "16px" }}
          className="text-center mt-2"
        >
          <Editable
            text={keyTitleStore}
            editButtonStyle={{ lineHeight: "unset" }}
            editButton
            editControlButtons
            placeholder="Type here"
            cb={handleKeyStatsTitle}
          />
          
        </p>
        <Divider />
        <div
          className="d-flex justify-content-end ml-2"
          style={{ cursor: "pointer", height: "1rem" }}
        >
          <GrAddCircle
            onClick={handleNbcAdd}
            style={{ width: "1rem", height: "1rem" }}
          />
        </div>
        {isLoading ? (
          <div>...Loading</div>
        ) : isError ? (
          `Failed to post`
        )  : (
          <div></div>
        )}
        <Table striped bordered hover>
          <thead style={{ fontSize: "12px" }}>
            <tr>
              <th>SUMMARY OF KEY ACTIVITY</th>
              <th className="text-center">2017-19 </th>
              <th className="text-center">2020</th>
              <th className="text-center">2021</th>
              <th className="text-center">2022</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                {nbcInfo.map((singleNote, index) => (
                  <div class="input-group mt-2">
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Summary of Key Activities"
                      value={singleNote.nbcInfo}
                      name="nbc_focus_original_date"
                      onChange={(e) => handleNbcChange(e, index)}
                    />
                  </div>
                ))}{" "}
              </td>
              <td>
                {nbcInfo.map((singleNote, index) => (
                  <div class="input-group mt-2">
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="2017-2017"
                      value={singleNote.nbcInfo}
                      name="nbc_focus_original_date"
                      onChange={(e) => handleNbcChange(e, index)}
                    />
                  </div>
                ))}
              </td>
              <td>
                {nbcInfo.map((singleNote, index) => (
                  <div class="input-group mt-2">
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="2020"
                      value={singleNote.nbcInfo}
                      name="nbc_focus_original_date"
                      onChange={(e) => handleNbcChange(e, index)}
                    />
                  </div>
                ))}
              </td>
              <td>
                {nbcInfo.map((singleNote, index) => (
                  <div class="input-group mt-2">
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="2021"
                      value={singleNote.nbcInfo}
                      name="nbc_focus_original_date"
                      onChange={(e) => handleNbcChange(e, index)}
                    />
                  </div>
                ))}
              </td>
              <td>
                {nbcInfo.map((singleNote, index) => (
                  <div class="input-group mt-2">
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="2022"
                      value={singleNote.nbcInfo}
                      name="nbc_focus_original_date"
                      onChange={(e) => handleNbcChange(e, index)}
                    />
                  </div>
                ))}
              </td>
              <td style={{ background: "none" }}>
                {nbcInfo.map((singleNote, index) => (
                  <div>
                    <button
                      onClick={handleNbcRemove}
                      className="mt-2 mb-2"
                      style={{
                        height: "23px",
                        border: "none",
                        marginRight: "3px",
                      }}
                    >
                      <i className="">
                        <FiDelete />
                      </i>
                    </button>
                  </div>
                ))}
              </td>
              <td style={{ background: "none" }}>
                {nbcInfo.map((singleNote, index) => (
                  <div>
                    <button
                      onClick={onsubmit}
                      className="mt-2 mb-2"
                      style={{
                        height: "23px",
                        border: "none",
                        marginRight: "3px",
                      }}
                    >
                      <i className="">
                        <FiSave />
                      </i>
                    </button>
                  </div>
                ))}
              </td>
            </tr>
          </tbody>
        </Table>
        <div
          className="d-flex justify-content-end ml-2"
          style={{ cursor: "pointer", height: "1rem" }}
        >
          <GrAddCircle
            onClick={handleStatsAdd}
            style={{ width: "1rem", height: "1rem" }}
          />
        </div>
        <Table striped bordered hover>
          <thead style={{ fontSize: "12px" }}>
            <tr>
              <th>PERIOD ENDING STATISTICS</th>
              <th className="text-center">2017-19 </th>
              <th className="text-center">2020</th>
              <th className="text-center">2021</th>
              <th className="text-center">2022</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                {periodStats.map((singleNote, index) => (
                  <div class="input-group mt-2">
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Summary of Key Activities"
                      value={singleNote.periodStats}
                      name="nbc_focus_original_date"
                      onChange={(e) => handleStatsChange(e, index)}
                    />
                  </div>
                ))}{" "}
              </td>
              <td>
                {periodStats.map((singleNote, index) => (
                  <div class="input-group mt-2">
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="2017-2017"
                      value={singleNote.periodStats}
                      name="nbc_focus_original_date"
                      onChange={(e) => handleStatsChange(e, index)}
                    />
                  </div>
                ))}
              </td>
              <td>
                {periodStats.map((singleNote, index) => (
                  <div class="input-group mt-2">
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="2020"
                      value={singleNote.periodStats}
                      name="nbc_focus_original_date"
                      onChange={(e) => handleStatsChange(e, index)}
                    />
                  </div>
                ))}
              </td>
              <td>
                {periodStats.map((singleNote, index) => (
                  <div class="input-group mt-2">
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="2021"
                      value={singleNote.periodStats}
                      name="nbc_focus_original_date"
                      onChange={(e) => handleStatsChange(e, index)}
                    />
                  </div>
                ))}
              </td>
              <td>
                {periodStats.map((singleNote, index) => (
                  <div class="input-group mt-2">
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="2022"
                      value={singleNote.periodStats}
                      name="nbc_focus_original_date"
                      onChange={(e) => handleStatsChange(e, index)}
                    />
                  </div>
                ))}
              </td>
              <td style={{ background: "none" }}>
                {periodStats.map((singleNote, index) => (
                  <div>
                    <button
                      onClick={handleStatsRemove}
                      className="mt-2 mb-2"
                      style={{
                        height: "23px",
                        border: "none",
                        marginRight: "3px",
                      }}
                    >
                      <i className="">
                        <FiDelete />
                      </i>
                    </button>
                  </div>
                ))}
              </td>
              <td style={{ background: "none" }}>
                {periodStats.map((singleNote, index) => (
                  <div>
                    <button
                      className="mt-2 mb-2"
                      style={{
                        height: "23px",
                        border: "none",
                        marginRight: "3px",
                      }}
                    >
                      <i className="">
                        <FiSave />
                      </i>
                    </button>
                  </div>
                ))}
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
}
