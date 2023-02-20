import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Form, Row, Col } from "react-bootstrap";
import { Box, TextareaAutosize, TextField } from "@mui/material";
import { FiDelete } from "react-icons/fi";
import { GrAdd } from "react-icons/gr";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import NbcFocusMode from './NbcFocusMode'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function RegisteredFields(props) {
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const {
    register,
    control,
    // handleSubmit,
    // reset,
    // trigger,
    // setError,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      StructuringExecution: [
        {
          //  label: "", concern: "", date: "", methodology: "",
          progress: [],
          ProgressStrucuring: [],
          ProgressExecution: [],
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "StructuringExecution",
  });
  const watchAllFields = watch();
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  const formSubmit = () => {
    const data = {
      summary: watchAllFields?.summary,
      age: watchAllFields.age,
      ProgressonGuarantee: {
        body: watchAllFields?.ProgressonGuarantee,
      },
      GuaranteePipeline: {
        body: watchAllFields?.GuaranteePipeline,
      },
      CurrentGuaranteePortfolio: {
        body: watchAllFields?.CurrentGuaranteePortfolio,
      },
    };
  };
  const nbcFocusList =props?.statistics.map((item) => (
    <NbcFocusMode
    //   transid={item.transid}
      id={item}
    //   nbcFocusOriginal={item.nbc_focus_original}
    //   nbcFocusOriginalYesNo={item.nbc_focus_original_yes_no}
    //   nbcFocusOriginalDate={item.nbc_focus_original_date}
    //   nbcFocusOriginalMethod={item.nbc_focus_original_methodology}
    //   key={item.nbcid}
    //   editNBCFocus={editNBCFocus}
    //   deleteNbcFocus={deleteNbcFocus}
    />
  ));
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 524,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 0.22, borderColor: "divider" }}
        >
          <Tab label="Current Guarantee Portfolio" {...a11yProps(0)} />
          <Tab label="Progress on Guarantee" {...a11yProps(1)} />
          <Tab label="Guarantee Pipeline" {...a11yProps(2)} />
          <Tab label="Key Statistics" {...a11yProps(3)} />
          <Tab label="Period Ending statistics" {...a11yProps(4)} />
          {/* <Tab label="Item Six" {...a11yProps(5)} /> */}
          {/* <Tab label="Item Seven" {...a11yProps(6)} /> */}
        </Tabs>
        <TabPanel value={value} index={0}>
          <p className="mt-2 text-bold" style={{ fontWeight: "" }}>
            Current Guarantee Portfolio
          </p>
          <textarea
            matInput
            rows="10"
            cols="100"
            style={{
              border: "1px dotted lightblue",
              padding: "10px",
              marginTop: "22px",
            }}
            {...register("CurrentGuaranteePortfolio", { required: true })}
            defaultValue={props?.currentGuarantee}
          ></textarea>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <label>Progress on Guarantee</label>
          <br />
          <textarea
            matInput
            rows="10"
            cols="100"
            style={{
              border: "1px dotted lightblue",
              padding: "10px",
              marginTop: "22px",
            }}
            defaultValue="Progress On Guarantee"
            {...register("ProgressonGuarantee", {
              required: true,
              maxLength: 2000,
            })}
          ></textarea>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <label>Guarantee Pipeline:</label>
          <textarea
            matInput
            rows="10"
            cols="100"
            style={{
              border: "1px dotted lightblue",
              padding: "10px",
              marginTop: "22px",
            }}
            defaultValue="GuaranteePipeline"
            {...register("GuaranteePipeline", {
              required: true,
              maxLength: 500,
            })}
          ></textarea>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <label>Key Summary</label>
          <textarea
            matInput
            rows="5"
            cols="100"
            style={{
              border: "1px dotted lightblue",
              padding: "10px",
              marginTop: "22px",
            }}
            defaultValue="GuaranteePipeline"
            {...register("GuaranteePipeline", {
              required: true,
              maxLength: 500,
            })}
          ></textarea>
          <label>Financial Year</label>
          <textarea
            matInput
            rows="5"
            cols="100"
            style={{
              border: "1px dotted lightblue",
              padding: "10px",
              marginTop: "22px",
            }}
            defaultValue="GuaranteePipeline"
            {...register("GuaranteePipeline", {
              required: true,
              maxLength: 500,
            })}
          ></textarea>
        </TabPanel>
        <TabPanel value={value} index={4}> 
        <p>Nbc Focus Mode </p>
        {/* <NbcFocusMode/> */}
        {nbcFocusList}
          
         </TabPanel>
        <TabPanel value={value} index={5}>
          <p>Period Ending statistics</p>
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
      </Box>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <p>Financial Year: {props?.financialYear}</p>
        
       
            <p>Key Statistics</p>
            <Row className="py-1">
                        <Col sm={4}>
                          <div>
                            Progress
                            {fields.map((item, index) => {
                              return (
                                <Controller
                                  render={({ field }) => (
                                    <Box
                                      component="div"
                                      sx={{
                                        "& > :not(style)": {
                                          m: 1,
                                          width: "30ch",
                                        },
                                      }}
                                      noValidate
                                      autoComplete="off"
                                    >
                                      <Form.Control
                                        style={{ height: "30px" }}
                                        {...field}
                                      />
                                    </Box>
                                  )}
                                  name={`StructuringExecution.${index}.Progress`}
                                  control={control}
                                />
                              );
                            })}
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div>
                            Progress Structuring
                            {fields.map((item, index) => {
                              return (
                                <Controller
                                  render={({ field }) => (
                                    <Box
                                      component="div"
                                      sx={{
                                        "& > :not(style)": {
                                          m: 1,
                                          width: "30ch",
                                        },
                                      }}
                                      noValidate
                                      autoComplete="off"
                                    >
                                      <Form.Control
                                        style={{ height: "30px" }}
                                        {...field}
                                      />
                                    </Box>
                                  )}
                                  name={`StructuringExecution.${index}.ProgressStrucuring`}
                                  control={control}
                                />
                              );
                            })}
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div className="text-start">
                            <>Progress Execution</>
                            {fields.map((item, index) => {
                              return (
                                <div className="mt-2">
                                  <Controller
                                    render={({ field }) => (
                                      <Box
                                        sx={{
                                          "& > :not(style)": {
                                            width: "30ch",
                                          },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                      >
                                        <Form.Control
                                          style={{ height: "30px" }}
                                          type="text"
                                          {...field}
                                        />
                                      </Box>
                                    )}
                                    name={`StructuringExecution.${index}.ProgressExecution`}
                                    control={control}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </Col>
                        
                        <div className="d-flex justify-content-end">
                          <GrAdd
                            onClick={() => {
                              append({
                                Progress: [],
                                ProgressStrucuring: [],
                                ProgressExecution: [],
                              });
                            }}
                          />
                        </div>
                      </Row>

                      <Row className="py-1">
                        <Col sm={4}>
                          <div>
                            Progress
                            {fields.map((item, index) => {
                              return (
                                <Controller
                                  render={({ field }) => (
                                    <Box
                                      component="div"
                                      sx={{
                                        "& > :not(style)": {
                                          m: 1,
                                          width: "30ch",
                                        },
                                      }}
                                      noValidate
                                      autoComplete="off"
                                    >
                                      <Form.Control
                                        style={{ height: "30px" }}
                                        {...field}
                                      />
                                    </Box>
                                  )}
                                  name={`StructuringExecution.${index}.Progress`}
                                  control={control}
                                />
                              );
                            })}
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div>
                            Progress Structuring
                            {fields.map((item, index) => {
                              return (
                                <Controller
                                  render={({ field }) => (
                                    <Box
                                      component="div"
                                      sx={{
                                        "& > :not(style)": {
                                          m: 1,
                                          width: "30ch",
                                        },
                                      }}
                                      noValidate
                                      autoComplete="off"
                                    >
                                      <Form.Control
                                        style={{ height: "30px" }}
                                        {...field}
                                      />
                                    </Box>
                                  )}
                                  name={`StructuringExecution.${index}.ProgressStrucuring`}
                                  control={control}
                                />
                              );
                            })}
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div className="text-start">
                            <>Progress Execution</>
                            {fields.map((item, index) => {
                              return (
                                <div className="mt-2">
                                  <Controller
                                    render={({ field }) => (
                                      <Box
                                        sx={{
                                          "& > :not(style)": {
                                            width: "30ch",
                                          },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                      >
                                        <Form.Control
                                          style={{ height: "30px" }}
                                          type="text"
                                          {...field}
                                        />
                                      </Box>
                                    )}
                                    name={`StructuringExecution.${index}.ProgressExecution`}
                                    control={control}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </Col>
                        <div className="d-flex justify-content-end">
                          <GrAdd
                            onClick={() => {
                              append({
                                Progress: [],
                                ProgressStrucuring: [],
                                ProgressExecution: [],
                              });
                            }}
                          />
                        </div>
                      </Row>


        <input type="submit" onClick={formSubmit} />
      </form>
       */}
    </>
  );
}
