import React, {useState } from "react";
import { Container, Table, Form} from "react-bootstrap";
import { GrAddCircle } from "react-icons/gr";
import { FiDelete } from "react-icons/fi";
import { Divider } from "@mui/material";

export default function KeyStats() {
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

  const addNewnbcInfo = () => {
    console.log("hello");
  };
  return (
    <>
      <Container className="my-3 py-1">
        <p
          style={{ fontWeight: "bold", fontSize: "16px" }}
          className="text-center mt-2"
        >
          Key Statistics on O & S Activity - Inception till Date
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
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
}
