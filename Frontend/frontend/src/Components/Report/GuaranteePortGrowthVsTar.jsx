import React, { useState, useContext } from "react";
import { Container, Table, Form } from "react-bootstrap";
import { GrAddCircle } from "react-icons/gr";
import { FiDelete, FiSave } from "react-icons/fi";
import { Col, Row, Stack } from "react-bootstrap";
import { BarChart, Bar } from "recharts";
import GuaranteeForecast from "./GuaranteeForecast";
import Editable from "react-editable-title";
import TitleContext from "../../context/TitleContext";

export default function GuaranteePortGrowthVsTar() {
  const handleTextUpdate = (current) => {
    addguaranteeTargets(current);
  };
  const handleTextsUpdate = (current) => {
    addHeader(current);
  };
  const handleBodyUpdate = (current) => {
    addProgressBody(current);
  };
  const { addguaranteeTargets, guaranteeTargetStore,tableStore,addHeader,progressBodyStore,addProgressBody } =
    useContext(TitleContext);

  const [nbcInfo, setNbcInfo] = useState([
    {
      summaryOfActivity: "",
      2017: 0,
      2020: 0,
      2021: 0,
      2022: 0,
    },
  ]);

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

  

  const [currentGt, setCurrentGt] = useState(
    "InfraCredit’s projected guarantee portfolio growth (indicative) is based on the assumption that initial operations were expected to commence at a conservative level, with the Company able to underwrite an initial transaction with NGN10 Billion face value, then progressively ramp up scale to over NGN500 Billion over a 5-year period. Throughout the past 3 years, management built a sizeable pipeline of mandated transactions, providing a base to achieve future growth targets."
  );
  const handleInputUpdate = (current) => {
    setCurrentGt(current);
    // addTitle(current)
  };
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page F",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page G",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
  ];

  return (
    <React.Fragment>
      <Container>
        <div>
          <Stack>
            <p style={{ fontWeight: "bold" }} className=" mt-1 pt-2">
              <Editable
                text={guaranteeTargetStore}
                editButtonStyle={{ lineHeight: "unset" }}
                editButton
                editControlButtons
                placeholder="Type here"
                cb={handleTextUpdate}
              />
            </p>
          </Stack>
        </div>
        <div className="d-flex justify-content-start">
          <GuaranteeForecast />
        </div>

        <div className="my-2 pt-3">
          <Stack gap={1}>
            <p style={{ fontWeight: "bold" }}>
              <Editable
                text={tableStore}
                editButtonStyle={{ lineHeight: "unset" }}
                editButton
                editControlButtons
                placeholder="Type here"
                cb={handleTextsUpdate}
              />
            </p>
          </Stack>
          <p>
             <Editable
                text={progressBodyStore}
                editButtonStyle={{ lineHeight: "unset" }}
                editButton
                editControlButtons
                placeholder="Type here"
                cb={handleBodyUpdate}
              />
          </p>
        </div>
        <div>
          <Row>
            <Col sm={6} className="my-1">
              <div
                className="d-flex justify-content-end ml-2"
                style={{ cursor: "pointer", height: "1rem" }}
              >
                <GrAddCircle
                  onClick={handleNbcAdd}
                  style={{ width: "1rem", height: "1rem" }}
                />
              </div>

              <Table striped bordered hover>
                <thead style={{ fontSize: "12px" }}>
                  <tr>
                    <th>Infrastructure Entity</th>
                    <th className="text-center">
                      Infrastructure Activity/Industry{" "}
                    </th>
                    <th className="text-center">Size</th>
                    <th className="text-center">Expected Closing</th>
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
                            placeholder="entity"
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
                            placeholder="industry"
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
                            placeholder="size"
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
                            placeholder="closing"
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
                            onClick={handleNbcRemove}
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
            </Col>
            <Col sm={6} className="">
              <div className="d-flex justify-content-center">
                <p
                  classNmae="text-center"
                  style={{ fontWeight: "bold", fontSize: "12px" }}
                >
                  Expected Financial Close by Quarter (Cumm)
                </p>
              </div>

              {/* graph : q1 2022, q2 2022 q3 2022 q4 2022 */}
              <br />
              <div className="d-flex justify-content-center">
                <BarChart width={300} height={200} data={data}>
                  <Bar dataKey="uv" fill="#8884d8" />
                </BarChart>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </React.Fragment>
  );
}
