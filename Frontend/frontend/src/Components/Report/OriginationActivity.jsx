import React, { useState, useContext } from "react";
import { Stack, Container, Table, Form } from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";
import { CgAdd } from "react-icons/cg";
import { MdDeleteSweep } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { GrAddCircle } from "react-icons/gr";
import { FiDelete, FiSave } from "react-icons/fi";
import Editable from "react-editable-title";
import TitleContext from "../../context/TitleContext";
import Service from "../../Services/Service";
import toast, { Toaster } from "react-hot-toast";


export default function OriginationActivity({ fy, qt }) {
  const [message, setMessage] =useState("")
  // const handleYearUpdates = (current) => {
  //   addReportYear(current);
  // };

  // const handleNbcYear = (current) => {
  //   addNbcYear(current);
  // };

  const { reportYearStore, nbcSubmissionStore, addNbcYear, addReportYear } =
    useContext(TitleContext);
  const [nbcInfo, setNbcInfo] = useState([
    {
      infrastrureentity: "",
      infrastrureactivity: "",
      size: 0,
      description: "",
      status: "",
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
        infrastrureentity: "",
        infrastrureactivity: "",
        size: 0,
        description: "",
        status: "",
      },
    ]);
  };
  const handleNbcRemove = (index) => {
    const list = [...nbcInfo];
    list.splice(index, 1);
    setNbcInfo(list);
  };

  // const addNewnbcInfo = () => {};
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      test: [
        {
          nbclist: "",
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
  const onSubmit = (data) => {
    const status = nbcInfo.map((data) => data?.status)
    const size = nbcInfo.map((data) => +data?.size)
    const description = nbcInfo.map((data) => data?.description)
    const entity = nbcInfo.map((data) => data?.infrastrureentity)
    const activity = nbcInfo.map((data) => data?.infrastrureactivity)
    const mappedArray = Object.keys(data).map(key => {
      return data[key];
    })

    const postdata = {
      ReportFYQuarter: qt,
      ReportFY: fy,
      infrastureEntity: entity,
      infrastureActivity: activity,
      size: size,
      description:description,
      status:status,
      originationActivity:mappedArray,
    };

   Service.postoriginationActivity(postdata).then((res) => {
    toast.success(res?.data?.message, {
      duration: 4000,
      position: "bottom-right",
      // Styling
      style: {},
      className: "",
      icon: "👏",
      iconTheme: {
        primary: "green",
        secondary: "#fff",
      },
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });
   }
   
   ).catch((err) => console.log(err))  
  };
  return (
    <React.Fragment>
      <Container fluid>
      <Toaster
          toastOptions={{
            className: "",
            style: {
              border: "1px solid green",
              padding: "8px",
              color: "green",
            },
          }}
        />
        <Stack gap={2}>
          <p className="text-success" style={{ fontWeight: "bold" }}>
            Origination Activity – <span>{qt}</span> <span> {fy}</span>
          </p>
        </Stack>
        <div>
          <p style={{ fontWeight: "bold" }} className='text-success'>
            NBC Submissions and Mandate Status – <span>{qt}</span> <span> {fy}</span>{" "}
            Update
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

             
            </section>
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
                        placeholder="Infrastructure Entity"
                        value={singleNote.nbcInfo}
                        name="infrastrureentity"
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
                        placeholder="Infrastructure Activity"
                        value={singleNote.nbcInfo}
                        name="infrastrureactivity"
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
                        placeholder=""
                        value={singleNote.nbcInfo}
                        name="description"
                        onChange={(e) => handleNbcChange(e, index)}
                      />
                    </div>
                  ))}
                </td>
                <td>
                  {nbcInfo.map((singleNote, index) => (
                    <div class="input-group mt-2">
                      <Form.Control
                        type="number"
                        size="sm"
                        placeholder=""
                        value={singleNote.nbcInfo}
                        name="size"
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
                        placeholder=""
                        value={singleNote.nbcInfo}
                        name="status"
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
                    <div></div>
                  ))}
                </td>
              </tr>
            </tbody>
          </Table>

          <button type="submit">
                submit
              </button>
              {/* <p>{message}</p> */}
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
}
