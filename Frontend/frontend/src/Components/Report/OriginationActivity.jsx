import React, { useEffect, useState } from "react";
import { Stack, Container, Table, Form, Col, Row } from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";
import { CgAdd } from "react-icons/cg";
import { MdDeleteSweep } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
// import OriginationTable from "./OriginationTable";
import { GrAddCircle } from "react-icons/gr";
// import Nbcinfo from "./NbcInfo";
// import Services from "../../Services/Service";
import { FiDelete, FiSave } from "react-icons/fi";
import { Divider } from "@mui/material";

export default function OriginationActivity() {
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
  const onSubmit = (data) => console.log("data", data);

  return (
    <React.Fragment>
      <Container>
        <Stack gap={2}>
          <p className="" style={{ fontWeight: "bold" }}>
            Origination Activity – Q4 2021
          </p>
        </Stack>
        <div>
          <p style={{ fontWeight: "bold" }}>
            NBC Submissions and Mandate Status – Q4 2021 Update
          </p>

          {/* <li>Executed seven (7) new mandates: Urban Shelter, Accugas, ACOB Lighting, GVE, LFZC, Greenville and Falcon.</li>
          <li>Received six (6) NBC
          approvals for prospects: Accugas, Solad, GVE Projects, ACOB Lighting,
          Greenville and LFZC.
            </li>  
            <li>The following table summarises all Q4 2021
          submissions to NBC:</li>  */}
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

          {/* table * sn    */}
          {/* <Table striped bordered hover className="my-3 py-1" >
            
  <thead style={{fontSize:'12px'}}>
    <tr>
    <th>S/n</th>
         <th  > Infrastructure Entity </th>
         <th>Infrastructure Activity </th>
         <th>Brief Description </th>
         <th>  Size (N’b) </th>
         <th> NBC/Mandate Status </th>
    </tr>
  </thead>
  <tbody>
    
    <tr>
    <td>1</td>
    
         <td>N31.5 billion</td>
         <td> N123.9 billion</td>
         <td>N62.5 billion</td>
         <td>N43.9 billion</td>
         <td>N93.0 billion</td>
    </tr>
    <tr>
    <td>2</td>
         <td>N43.5 billion</td>
         <td>N203.5 billion</td>
         <td>N70.6 billion</td>
         <td>N93.0 billion</td>
         <td>N93.0 billion</td>
    </tr>
    <tr>
    <td>3</td>
         <td>N77.6 billion</td>
         <td>N 311.5 billion</td>
         <td>N 311.5 billion</td>
         <td>N191.4 billion</td>
         <td>N93.0 billion</td>
    </tr>
   
  </tbody>
</Table>


<li>Recent leads under review which may proceed to NBC in the near future include:</li>

<Table striped bordered hover className="my-3 py-1">
  <thead style={{fontSize:'12px'}}>
    <tr>
    <th>S/n</th>
         <th  > Infrastructure Entity </th>
         <th>Infrastructure Activity </th>
         <th>Brief Description  </th>
         <th> Size (N’b) </th>
         <th> NBC/Mandate Status </th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>1</td>
         <td>N31.5 billion</td>
         <td> N123.9 billion</td>
         <td>N62.5 billion</td>
         <td>N43.9 billion</td>
         <td>N93.0 billion</td>
    </tr>
    <tr>
    <td>2</td>
         <td>N43.5 billion</td>
         <td>N203.5 billion</td>
         <td>N70.6 billion</td>
         <td>N93.0 billion</td>
         <td>N93.0 billion</td>
    </tr>
    <tr>
    <td>3</td>
         <td>N77.6 billion</td>
         <td>N 311.5 billion</td>
         <td>N 311.5 billion</td>
         <td>N191.4 billion</td>
         <td>N93.0 billion</td>
    </tr>
   
  </tbody>
</Table> */}
          <Table striped bordered hover className="my-3 py-1">
            <thead style={{ fontSize: "12px" }}>
              <tr>
                <th>S/n</th>
                <th> Infrastructure Entity </th>
                <th>Infrastructure Activity </th>
                <th>Brief Description </th>
                <th> Size (N’b) </th>
                <th> NBC/Mandate Status </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>

                <td>N31.5 billion</td>
                <td> N123.9 billion</td>
                <td>N62.5 billion</td>
                <td>N43.9 billion</td>
                <td>N93.0 billion</td>
              </tr>
              <tr>
                <td>2</td>
                <td>N43.5 billion</td>
                <td>N203.5 billion</td>
                <td>N70.6 billion</td>
                <td>N93.0 billion</td>
                <td>N93.0 billion</td>
              </tr>
              <tr>
                <td>3</td>
                <td>N77.6 billion</td>
                <td>N 311.5 billion</td>
                <td>N 311.5 billion</td>
                <td>N191.4 billion</td>
                <td>N93.0 billion</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Container>
    </React.Fragment>
  );
}
