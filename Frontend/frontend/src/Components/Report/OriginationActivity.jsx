import React, { useState,useContext } from "react";
import { Stack, Container, Table, Form} from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";
import { CgAdd } from "react-icons/cg";
import { MdDeleteSweep } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { GrAddCircle } from "react-icons/gr";
import { FiDelete, FiSave } from "react-icons/fi";
import Editable from "react-editable-title";
import TitleContext from "../../context/TitleContext";

export default function OriginationActivity() {

  const handleYearUpdates = (current) => {
    addReportYear(current);
  };

  const handleNbcYear = (current) => {
    addNbcYear(current);
  };

  const { reportYearStore, nbcSubmissionStore,addNbcYear,addReportYear } =useContext(TitleContext);
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
  };
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      test: [
        {
          nbclist:
            "Received six (6) NBC approvals for prospects: Accugas, Solad, GVE Projects, ACOB Lighting,Greenville and LFZC.",
        },
      ],
    },
  });
  const {
    fields,
    append,

    remove,
  } = useFieldArray({
    control,
    name: "test",
  });
  const onSubmit = (data) => data

  return (
    <React.Fragment>
      <Container>
        <Stack gap={2}>
          <p className="" style={{ fontWeight: "bold" }}>
            {/* Origination Activity – Q4 2021 */}
            <Editable
            text={reportYearStore}
            editButtonStyle={{ lineHeight: "unset" }}
            editButton
            editControlButtons
            placeholder="Type here"
            cb={handleYearUpdates}
          />
          </p>
        </Stack>
        <div>
          <p style={{ fontWeight: "bold" }}>
          <Editable
            text={nbcSubmissionStore}
            editButtonStyle={{ lineHeight: "unset" }}
            editButton
            editControlButtons
            placeholder="Type here"
            cb={handleNbcYear}
          />
            {/* NBC Submissions and Mandate Status – Q4 2021 Update */}
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ul>
              {fields.map((item, index) => {
                return (
                  <li key={item.id}>
                    <input
                      {...register(`test.${index}.nbclist`)}
                      style={{ border: "none", color: "inherit", width: "80%" }}
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      style={{
                        border: "1px solid white",
                        height: "33px",
                        background: "black",
                        color: "white",
                      }}
                    >
                      <MdDeleteSweep />
                    </button>
                  </li>
                );
              })}
            </ul>
            <section>
              <button
                type="button"
                onClick={() => {
                  append({ nbclist: "" });
                }}
                style={{
                  border: "1px solid white",
                  height: "33px",
                  background: "black",
                  color: "white",
                }}
              >
                <CgAdd />
              </button>

              <button type="submit">
                <IoIosSave />
              </button>
            </section>
          </form>
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
                <th> Infrastructure Entity </th>
                <th>Infrastructure Activity </th>
                <th>Brief Description </th>
                <th> Size (N’b) </th>
                <th> NBC/Mandate Status </th>
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
        </div>
      </Container>
    </React.Fragment>
  );
}
