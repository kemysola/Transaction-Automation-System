import React from "react";
import { Stack, Container,Table } from "react-bootstrap";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import {CgAdd} from 'react-icons/cg'
import {GrPowerReset} from'react-icons/gr'
import {MdDeleteSweep} from 'react-icons/md'
import {IoIosSave} from 'react-icons/io'

export default function OriginationActivity() {
  const { register, control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      test: [{ nbclist: "Received six (6) NBC approvals for prospects: Accugas, Solad, GVE Projects, ACOB Lighting,Greenville and LFZC." }]
    }
  });
  const {
    fields,
    append,
   
    remove,
   
  } = useFieldArray({
    control,
    name: "test"
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

         
          
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <input {...register(`test.${index}.nbclist`)} style={{border:'none',color:'inherit', width:'80%'}} />

              {/* <Controller
                render={({ field }) => <input {...field} />}
                name={`test.${index}.lastName`}
                control={control}
              /> */}
              <button type="button" onClick={() => remove(index)} style={{border:'1px solid white',height:'33px',background:'black',color:'white'}}>
                <MdDeleteSweep/>
              </button>
            </li>
          );
        })}
      </ul>
      <section>
        <button
          type="button"
          onClick={() => {
            append({ nbclist: ""});
          }}
          style={{border:'1px solid white',height:'33px',background:'black',color:'white'}}
        >
          <CgAdd/>
        </button>
        
        <button type="submit">
        <IoIosSave/>
        </button>
       
      </section>

    </form>
          {/* table * sn    */}
             <form onSubmit={handleSubmit(onSubmit)}>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <input {...register(`test.${index}.nbctab`)} style={{border:'none',color:'inherit', width:''}} style={{borderRight:'1px solid black',borderLeft:'none',borderTop:'none',borderBottom:'none'}} />

              <Controller
                render={({ field }) => <input {...field} style={{borderRight:'1px solid black',borderLeft:'none',borderTop:'none',borderBottom:'none'}}/>}
                name={`test.${index}.nbc2`}
                control={control}
              />
                <Controller
                render={({ field }) => <input {...field} style={{borderRight:'1px solid black',borderLeft:'none',borderTop:'none',borderBottom:'none'}}/>}
                name={`test.${index}.nbc3`}
                control={control}
              />
                <Controller
                render={({ field }) => <input {...field}  style={{borderRight:'1px solid black',borderLeft:'none',borderTop:'none',borderBottom:'none'}}/>}
                name={`test.${index}.nbc4`}
                control={control}
              />
                <Controller
                render={({ field }) => <input {...field}  style={{border:'none'}}/>}
                name={`test.${index}.nbc5`}
                control={control}
              />
              <button type="button" onClick={() => remove(index)} style={{border:'1px solid white',height:'33px',background:'black',color:'white'}}>
                <MdDeleteSweep/>
              </button>
            </li>
          );
        })}
      </ul>
      <section>
        <button
          type="button"
          onClick={() => {
            append({ nbclist: ""});
          }}
          style={{border:'1px solid white',height:'33px',background:'black',color:'white'}}
        >
          <CgAdd/>
        </button>
        
        <button type="submit">
        <IoIosSave/>
        </button>
       
      </section>

    </form>
    
      </Container>
    </React.Fragment>
  );
}
