//***************************************** Import Dependencies and Hooks ****************************/
import React, { useState, useEffect } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Form, Container, Row, Col, Alert } from "react-bootstrap";
import Box from "@mui/material/Box";
import styled from "styled-components";
import Services from "../../Services/Service";
import { useHistory } from "react-router-dom";
import { GrAdd } from "react-icons/gr";
import { FiDelete } from "react-icons/fi";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

//********************************* Material UI styled Components    **********************************/

const ButtonWrapper = styled.button`
  background: black;
  border: 1px solid white;
  padding: 12px 21px;
  margin-top: 3px;
  margin-right: 3px;
  font-size: 11px;
  border-radius: 2px;
  color: white;
`;
const FormWrapper = styled.div`
  margin: 0;
  border:1.2px dashed #E2E2E2;
  font-size: 5px;
  padding: 0;
`;

const Container1 = styled.div`
  border:1.2px dashed #E2E2E2;
  font-size: 12px;
  padding: 1px 1rem;
  border-radius: 15px;
`;

const PWrapper = styled.p`
  color: #1e2f97;
  font-weight: bold;
  font-size: 11px;
  margin: 0;
  padding: 0;
`;

//************************************************* New Transaction Module ******************************************* */
let renderCount = 0;
const NewTransaction = () => {
  //*********************************************** Instantiate useHistory hook **************************************** */
  const history = useHistory();
  //*****************************************    Use React-Use-fORM hook     ******************************************/
  const {
    register,
    formState: {
      errors,
      isDirty,
      dirtyFields,
      isSubmitting,
      touchedFields,
      submitCount,
    },
    control,
    handleSubmit,
    setFocus,
    reset,
    watch,
    getValues,
  } = useForm({
    defaultValues: {
      clientName: "",
      originator: "",
      transactor: "",
      transactionlegallead: "",
      industry: "",
      product: "",
      region: "",
      repaymentFrequency: "Semi-Annually",
      amortizationStyle: "Annuity",
      mandateLetter: null,
      nbc_approval_date: null,
      nbc_submitted_date: null,
      creditApproval: null,
      feeLetter: null,
      principal:"",
      guaranteefeerate:"",
      issuedate:null,
      firstcoupondate:null,
      takingfirstinterestearly:"",
      discountfactor:"",
      expectedClose: null,
      actualClose: null,
      greenA: "false",
      greenB: "false",
      greenC: "false",
      greenD: "false",
      greenE: "false",
      greenF: "false",
      amberA: "false",
      amberB: "false",
      amberC: "false",
      amberD: "false",
      amberE: "false",
      redA: "false",
      redB: "false",
      redC: "false",
      notes: "",
      closed: "false",
      nbcFocus: [
        {
          //  label: "", concern: "", date: "", methodology: "",
          nbc_focus_original: "",
          nbc_focus_original_yes_no: 0,
          nbc_focus_original_date: null,
          nbc_focus_original_methodology: "",
            nbc_focus_apprv_1_b: "",
            nbc_focus_apprv_1_c: null,
            nbc_focus_apprv_2_b: "",
            nbc_focus_apprv_2_c: null,
            nbc_focus_apprv_3_b: "",
            nbc_focus_apprv_3_c: null,
            nbc_focus_apprv_4_b: "",
            nbc_focus_apprv_4_c: null,
            nbc_focus_apprv_5_b: "",
            nbc_focus_apprv_5_c: null,
        },
      ],

      kpi: [
        {
          kpi_factors: "",
          kpi_yes_no: 0,
          kpi_concern: "",
          kpi_expected: null,
          kpi_resp_party: "",
          kpi_status: "Pending",
        },
      ],
      plis: [
        {
          plis_particulars: "",
          plis_concern: "",
          plis_weighting: 10,
          plis_expected: "2022-06-14",
          plis_status: "Active",
        },
      ],

      parties: [
        {
          parties_role: "",
          parties_party: "",
          parties_appointed: 0,
          parties_status: "Pending",
        },
      ],
      ocps: [
        {
          ocps_factors: "",
          ocps_yes_no: 1,
          ocps_concern: "",
          ocps_expected: null,
          ocps_resp_party: "",
          ocps_status: "Active",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "nbcFocus",
  });

  //********************************************************* Deal Tracking features - state and functions ************************ */

  const [ocps, setOcps] = useState([
    {
      ocps_factors: "",
      ocps_yes_no: 1,
      ocps_concern: "",
      ocps_expected: null,
      ocps_resp_party: "",
      ocps_status: "Active",
    },
  ]);

  const [plis, setPlis] = useState([
    {
      plis_particulars: "",
      plis_concern: "",
      plis_weighting: 10,
      plis_expected: null,
      plis_status: "",
    },
  ]);

  const [parties, setParties] = useState([
    {
      parties_role: "",
      parties_party: "",
      parties_appointed: 0,
      parties_status: "Pending",
    },
  ]);

  const [kpi, setKpi] = useState([
    {
      kpi_factors: "",
      kpi_yes_no: 0,
      kpi_concern: "",
      kpi_expected: null,
      kpi_resp_party: "",
      kpi_status: "Pending",
    },
  ]);

  //************************************************************ Create states and default values ******************************* */

  const [activeTab, setActiveTab] = useState("first");
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState(false);
  const [noteList, setNoteList] = useState([{ note: "" }]);
  const [industry, setIndustry] = useState([]);
  const [product, setProduct] = useState([]);
  const [region, setRegion] = useState([]);
  const [frequency, setFrequency] = useState([]);
  const [style, setStyle] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [staffLists, setStaffLists] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [hideSubmit, setHideSubmit] = useState(false)

  // ************************************ use Effect : ComponentDidMount - ComponentWillReceive ***********************************/

  //************************************* UseEffect hook for componentDidMount, componentWillReceive and ComponentWillUpdate  ****/
  useEffect(() => {
    setFocus("clientName");
    retrieveIndustry();

    retrieveProduct();

    retrieveRegion();

    retrieveRepaymentFreq();

    retrieveAmortizationStyle();

    retrieveStaffList();
    retrieveStaffLists();
  }, [setFocus]);

  // ******************************************  Axios :  get industry *********************************************/

  const retrieveIndustry = () => {
    Services.getIndustry()
      .then((response) => {
        setIndustry(response.data.industry);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // ******************************************  Axios :  get product ****************************************

  const retrieveProduct = () => {
    Services.getProduct()
      .then((response) => {
        setProduct(response.data.product);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // ******************************************  Axios :  get Region ****************************************

  const retrieveRegion = () => {
    Services.getRegion()
      .then((response) => {
        setRegion(response.data.region);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // ******************************************  Axios :  get repayment Frequency ************************

  const retrieveRepaymentFreq = () => {
    Services.getRepaymentFreq()
      .then((response) => {
        setFrequency(response.data.frequency);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // ******************************************  Axios :  get Amortization ****************************************

  const retrieveAmortizationStyle = () => {
    Services.getAmortizationSty()
      .then((response) => {
        setStyle(response.data.amortization);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // ******************************************  Axios :  get all staff  ****************************************

  const retrieveStaffList = () => {
    Services.getStaffList()
      .then((response) => {
        setStaffList(response.data.staffList);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveStaffLists = () => {
    Services.getAllStaff()
      .then((response) => {
        setStaffLists(response.data.staff);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // ******************************************  Next and Previous function  ****************************************
  //***********************************************PARTIES ********************************************** */
  const handlePartyChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...parties];
    list[index][name] = value;
    setParties(list);
  };

  const handlePartyAdd = () => {
    setParties([
      ...parties,
      {
        parties_role: "",
        parties_party: "",
        parties_appointed: 0,
        parties_status: "Pending",
      },
    ]);
  };

  const handlePartyRemove = (index) => {
    const list = [...parties];
    list.splice(index, 1);
    setParties(list);
  };

  // **************************************************** Key Performance Indicators ************************//
  const handleKpiChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...kpi];
    list[index][name] = value;
    setKpi(list);
  };

  const handleKpiAdd = () => {
    setKpi([
      ...kpi,
      {
        kpi_factors: "",
        kpi_yes_no: 0,
        kpi_concern: "",
        kpi_expected: null,
        kpi_resp_party: "",
        kpi_status: "",
      },
    ]);
  };

  const handleKpiRemove = (index) => {
    const list = [...kpi];
    list.splice(index, 1);
    setKpi(list);
  };

  //***********************************      Other Conditions precedents    ***************** */
  const handleOcpsChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...ocps];
    list[index][name] = value;
    setOcps(list);
  };

  const handleOcpsAdd = () => {
    setOcps([
      ...ocps,
      {
        ocps_factors: "",
        ocps_yes_no: 1,
        ocps_concern: "",
        ocps_expected: null,
        ocps_resp_party: "",
        ocps_status: "Active",
      },
    ]);
  };

  const handleOcpsRemove = (index) => {
    const list = [...ocps];
    list.splice(index, 1);
    setOcps(list);
  };

  const handlePlisChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...plis];
    list[index][name] = value;
    setPlis(list);
  };

  const handlePlisAdd = () => {
    setPlis([
      ...plis,
      {
        plis_particulars: "",
        plis_concern: "",
        plis_weighting: 10,
        plis_expected: null,
        plis_status: "",
      },
    ]);
  };

  let transactorList = staffList.filter((opt) => opt.istransactor === true);
  let originatorList = staffList.filter((opt) => opt.isoriginator === true);
  let ttrlegalLead = staffList.filter(
    (opt) => opt.istransactionlegallead === true
  );

  const handlePlisRemove = (index) => {
    const list = [...plis];
    list.splice(index, 1);
    setPlis(list);
  };

  function toNextTab(e) {
    e.preventDefault();
    handleTabChange();
  }

  function toPrevTab(e) {
    e.preventDefault();
    handlePrevChange();
  }

  function handleTabChange() {
    if (activeTab === "first") {
      setActiveTab("second");
    }
    if (activeTab === "second") {
      setActiveTab("third");
    }
    if (activeTab === "third") {
      setActiveTab("fourth");
    }
    if (activeTab === "fourth") {
      setActiveTab("sixth");
    }
    if (activeTab === "sixth") {
      setActiveTab("seventh");
    }
    if (activeTab === "seventh") {
      setActiveTab("eigth");
    }
    if (activeTab === "eigth") {
      setActiveTab("ninth");
    }
    if (activeTab === "ninth") {
      setActiveTab("tenth");
    }
  }
  function handlePrevChange() {
    if (activeTab === "second") {
      setActiveTab("first");
    }
    if (activeTab === "third") {
      setActiveTab("second");
    }
    if (activeTab === "fourth") {
      setActiveTab("third");
    }
    if (activeTab === "sixth") {
      setActiveTab("fourth");
    }
    if (activeTab === "seventh") {
      setActiveTab("sixth");
    }
    if (activeTab === "eigth") {
      setActiveTab("seventh");
    }
    if (activeTab === "ninth") {
      setActiveTab("eigth");
    }
    if (activeTab === "tenth") {
      setActiveTab("ninth");
    }
  }

  const newDeal = () => {
    history.push({
      pathname: "/create_transaction",
    });
    window.location.reload();
  };

  // ******************************************  req body event ****************************************
  //******************************************* Handle Note functions ******************************** */
  const handleNoteChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...noteList];
    list[index][name] = value;
    setNoteList(list);
  };

  const handleNoteAdd = () => {
    setNoteList([...noteList, { note: "" }]);
  };

  const handleNoteRemove = (index) => {
    const list = [...noteList];
    list.splice(index, 1);
    setNoteList(list);
    // setNoteList(list);
    // console.log(list[index]);
    // setNoteList((prev) => [...prev.filter((i) => i === list[i])]);
  };

  const handleInputChange = (event) => {
    // function to save user data to deal state
    const { name, value } = event.target;
    // setNbcFocus({ ...nbcFocus, [name]: value });
  };

 

  // handle PLIs validation; return erroe when the sum of PLIs is greater than 100
  const validatePlisWeights = () => {
    const totalWeight = plis.reduce((acc, curr) => acc + Number(curr.plis_weighting), 0);

    if (totalWeight > 100) {
      
      return (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          The sum of plis weights cannot be greater than 100%.
        </Alert>
      );
    }
      
  };
  //********************************************************************* Handle Submit Function ********************************** */
  const onSubmit = (reqdata, e) => {
    e.preventDefault();
    let allNotes = noteList.map(({ note }) => note);
    let note = allNotes.join("|");

    /**
     * const handleRemoveFruit = (item) => {
    setFruitsInBasket((prev) => [...prev.filter((i) => i !== item)]);
  };
     */
    //****************************************************************** Object to handle request data to the server ***************** */
    const data = {
      clientName: reqdata.clientName,
      originator: reqdata.originator,
      transactor: reqdata.transactor,
      transactionLegalLead: reqdata.transactionLegalLead,
      industry: reqdata.industry,
      product: reqdata.product,
      region: reqdata.region,
      dealSize: +reqdata.dealSize,
      coupon: +reqdata.coupon,
      tenor: +reqdata.tenor,
      principal: +reqdata.principal,
      guaranteefeerate:+reqdata.guaranteefeerate,
      issuedate:`${
        reqdata.issuedate ? reqdata.issuedate : 20221203
      }`,
      firstcoupondate:`${
        reqdata.firstcoupondate ? reqdata.firstcoupondate : 20221203
      }`,
      takingfirstinterestearly:reqdata.takingfirstinterestearly,
      discountfactor:+reqdata.discountfactor,
      mandateLetter: `${
        reqdata.mandateLetter ? reqdata.mandateLetter : 20221203
      }`,
      creditApproval: `${
        reqdata.creditApproval ? reqdata.creditApproval : 20221203
      }`,
      ccSubmissionDate: `${
        reqdata.ccSubmissionDate ? reqdata.ccSubmissionDate : 20221203
      }`,
      expectedClose: `${
        reqdata.expectedClose ? reqdata.expectedClose : 20221203
      }`,
      moratorium: +reqdata.moratorium,
      repaymentFrequency: reqdata.repaymentFrequency,
      amortizationStyle: reqdata.amortizationStyle,
      actualClose: `${reqdata.actualClose ? reqdata.actualClose : 20221203}`,
      feeLetter: `${reqdata.feeLetter ? reqdata.feeLetter : 20221203}`,
      NBC_approval_date: `${
        reqdata.nbc_approval_date ? reqdata.nbc_approval_date : 20221203
      }`,
      NBC_submitted_date: `${
        reqdata.nbc_submitted_date ? reqdata.nbc_submitted_date : 20221203
      }`,
      greenA: JSON.parse(reqdata.greenA),
      greenB: JSON.parse(reqdata.greenB),
      greenC: JSON.parse(reqdata.greenC),
      greenD: JSON.parse(reqdata.greenD),
      greenE: JSON.parse(reqdata.greenE),
      greenF: JSON.parse(reqdata.greenF),
      amberA: JSON.parse(reqdata.amberA),
      amberB: JSON.parse(reqdata.amberB),
      amberC: JSON.parse(reqdata.amberC),
      amberD: JSON.parse(reqdata.amberD),
      amberE: JSON.parse(reqdata.amberE),
      redA: JSON.parse(reqdata.redA),
      redB: JSON.parse(reqdata.redB),
      redC: JSON.parse(reqdata.redC),
      structuringFeeAmount: +reqdata.structuringFeeAmount,
      structuringFeeAdvance: +reqdata.structuringFeeAdvance,
      guaranteeFee: +reqdata.guaranteeFee,
      monitoringFee: +reqdata.monitoringFee,
      reimbursible: +reqdata.reimbursible,
      closed: false,
      notes: note,
      nbcFocus: reqdata.nbcFocus,
      parties,
      kpi,
      plis,
      ocps,
    };

    //********************************************************** Send data using rest api in a promise! **************************** */
    Services.createDeal(data)
      .then((res) => {
        setResponse(res.data.message);
        toast.success(res.data.message, {
          duration: 4000,
          position: "bottom-right",
          // Styling
          style: {
            fontSize: "16px",
          },
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
        setSubmitted(true);
      })
      .catch((error) => {
        toast.error("Failed to Create Deal. Please Fill all required fields", {
          duration: 4000,
          position: "bottom-right",
          // Styling
          style: {
            fontSize: "16px",
          },
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
        setResponse("Failed to Create Deal. Please Fill all required fields");
        setSubmitted(false);
      });
  };

  return (
    <React.Fragment>
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
      <FormWrapper>
        <Container fluid style={{ marginTop: "0" }}>
          {submitted ? (
            <div>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  color: "steelblue",
                  marginTop: "1rem",
                }}
              >
                {response}
              </p>
              <ButtonWrapper onClick={newDeal}>
                Add New Transaction
              </ButtonWrapper>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <PWrapper>
                <h5 className="py-3 text-secondary">New Transaction</h5>
              </PWrapper>
              <div>
                <Tabs
                  onSelect={(k) => handleTabChange}
                  style={{ fontSize: "12px",background:'black',padding:'0.77rem 10px' }}
                >
                  <Tab eventKey="first" title="CLIENT">
                    <Container1>
                      <br />
                      <Row>
                        <Col sm={6}>
                          <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Form.Label>Client Name:</Form.Label>
                            <Form.Control
                              style={{
                                width: "100%",
                                padding: "4px 2px",
                                focus: "none",
                              }}
                              {...register("clientName", { required: true })}
                            />
                            <div className="text-danger">
                              {errors.clientName?.type === "required" &&
                                "Client name is required"}
                            </div>
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Form.Label>Originator:</Form.Label>
                            <Form.Select
                              {...register("originator", { required: true })}
                              style={{
                                width: "100%",
                                padding: "4px 2px",
                                focus: "none",
                              }}
                            >
                              <option></option>
                              {originatorList.map((opt, i) => (
                                <option key={opt.email} value={opt.stafflist}>
                                  {opt.stafflist}
                                </option>
                              ))}
                            </Form.Select>
                            <div className="text-danger">
                              {errors.originator?.type === "required" &&
                                "Originator name is required"}
                            </div>
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Form.Label>Transactor:</Form.Label>
                            <Form.Select
                              {...register("transactor", { required: true })}
                              style={{
                                width: "100%",
                                padding: "4px 2px",
                                focus: "none",
                              }}
                            >
                              <option></option>
                              {transactorList.map((opt, i) => (
                                <option key={opt.email} value={opt.stafflist}>
                                  {opt.stafflist}
                                </option>
                              ))}
                            </Form.Select>
                            <div className="text-danger">
                              {errors.transactor?.type === "required" &&
                                "Transactor name is required"}
                            </div>
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Form.Label>Transaction Legal Lead:</Form.Label>

                            <Form.Select
                              {...register("transactionLegalLead", {
                                required: true,
                              })}
                              style={{
                                width: "100%",
                                padding: "4px 2px",
                                focus: "none",
                              }}
                            >
                              {" "}
                              <option></option>
                              {ttrlegalLead.map((opt, i) => (
                                <option key={opt.email} value={opt.stafflist}>
                                  {opt.stafflist}
                                </option>
                              ))}
                            </Form.Select>
                            <div className="text-danger">
                              {errors.transactionLegalLead?.type ===
                                "required" &&
                                "Transactor Lead Name  is required"}
                            </div>
                          </Form.Group>
                        </Col>
                        <Col sm={12}>
                          <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Form.Label>Note</Form.Label>{" "}
                            <button
                              type="button"
                              onClick={handleNoteAdd}
                              style={{
                                fontSize: "10px",
                                padding: "2px 10px",
                                margin: "8px",
                                background: "steelblue",
                                color: "white",
                                borderRadius: "3px",
                              }}
                            >
                              Add
                            </button>
                            {noteList.map((singleNote, index) => {
                              return (
                              <div class="input-group" key={index}>
                                <Form.Control
                                  as="textarea"
                                  style={{ margin: "0.8em", width: "60%" }}
                                  size="sm"
                                  value={singleNote.note}
                                  name="note"
                                  onChange={(e) => handleNoteChange(e, index)}
                                />
                               <button
                                  type="button"
                                  style={{
                                    fontSize: "10px",
                                    padding: "2px 10px",
                                    margin: "8px",
                                    background: "steelblue",
                                    color: "white",
                                    borderRadius: "3px",
                                  }}
                                  onClick={() => handleNoteRemove(index)}
                                >
                                  x
                                </button>
                              </div>
                            )})}
                          </Form.Group>
                        </Col>
                      </Row>
                    </Container1>
                  </Tab>

                  <Tab eventKey="second" title="DEAL PROFILE ">
                    <Container1>
                      <div className="mt-2">
                        <Row>
                          <Col sm={6} className="my-0 py-0">
                            <Form.Label>Industry:</Form.Label>
                            {/* <Form.Control {...register("industry", { required: true })} /> */}
                            <Form.Select
                              {...register("industry", { required: true })}
                              style={{
                                width: "100%",
                                padding: "4px 1px",
                                focus: "none",
                              }}
                            >
                              <option></option>
                              {industry.map((opt, i) => (
                                <option
                                  key={industry[i].industryid}
                                  value={industry[i].industry}
                                >
                                  {industry[i].industry}
                                </option>
                              ))}
                            </Form.Select>
                            <div className="text-danger">
                              {errors.industry?.type === "required" &&
                                "This field is required"}
                            </div>
                          </Col>
                          <Col sm={6} className="my-0 py-0">
                            <Form.Group className="">
                              <Form.Label>Product:</Form.Label>
                              <Form.Select
                                {...register("product", { required: true })}
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              >
                                <option></option>
                                {product.map((opt, i) => (
                                  <option
                                    key={product[i].productid}
                                    value={product[i].product}
                                  >
                                    {product[i].product}
                                  </option>
                                ))}
                              </Form.Select>
                              <div className="text-danger">
                                {errors.product?.type === "required" &&
                                  "This field is required"}
                              </div>
                            </Form.Group>
                          </Col>
                          <Col sm={6} className="my-0 py-0">
                            <Form.Group className="">
                              <Form.Label>Region:</Form.Label>
                              <Form.Select
                                {...register("region", { required: true })}
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              >
                                <option></option>
                                {region.map((opt, i) => (
                                  <option
                                    key={region[i].regionid}
                                    value={region[i].region}
                                  >
                                    {region[i].region}
                                  </option>
                                ))}
                              </Form.Select>

                              <div className="text-danger">
                                {errors.region?.type === "required" &&
                                  "This field is required"}
                              </div>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>Deal Size(₦'BN): </Form.Label>
                              <Form.Control
                                type="number"
                                {...register("dealSize", { required: true })}
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                              <div className="text-danger">
                                {errors.dealSize?.type === "required" &&
                                  "This field is required"}
                              </div>
                            </Form.Group>
                          </Col>

                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>Coupon(%)</Form.Label>
                              <Form.Control
                                type="number"
                                {...register("coupon", { required: false })}
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                            </Form.Group>
                          </Col>

                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>Tenor(yrs)</Form.Label>
                              <Form.Control
                                type="number"
                                {...register("tenor", { required: false })}
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                            </Form.Group>
                          </Col>

                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>Moratorium(yrs)</Form.Label>
                              <Form.Control
                                type="number"
                                {...register("moratorium", { required: false })}
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={6}>
                            <Form.Group className="">
                              <Form.Label>Repayment Frequency</Form.Label>
                              <Form.Select
                                {...register("repaymentFrequency")}
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              >
                                <option></option>
                                {frequency.map((opt, i) => (
                                  <option
                                    key={frequency[i].id}
                                    value={frequency[i].frequency}
                                  >
                                    {frequency[i].frequency}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>Amortization Style</Form.Label>
                              <Form.Select
                                {...register("amortizationStyle")}
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              >
                                <option></option>
                                {style.map((opt, i) => (
                                  <option
                                    key={style[i].id}
                                    value={style[i].amortizationstyle}
                                  >
                                    {style[i].amortizationstyle}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>Mandate Letter:</Form.Label>
                              <Form.Control
                                type="date"
                                {...register("mandateLetter", {
                                  required: true,
                                })}
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                              <div className="text-danger">
                                {errors.mandateLetter?.type === "required" &&
                                  "Kindly enter a date"}
                              </div>
                            </Form.Group>
                          </Col>
                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>Credit Approval:</Form.Label>
                              <Form.Control
                                type="date"
                                {...register("creditApproval", {
                                  required: true,
                                })}
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                              <div className="text-danger">
                                {errors.creditApproval?.type === "required" &&
                                  "Kindly enter a date"}
                              </div>
                            </Form.Group>
                          </Col>
                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>Fee Letter:</Form.Label>
                              <Form.Control
                                type="date"
                                {...register("feeLetter")}
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>Expected Close:</Form.Label>
                              <Form.Control
                                type="date"
                                {...register("expectedClose")}
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>Actual Close:</Form.Label>
                              <Form.Control
                                type="date"
                                {...register("actualClose")}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>NBC Approval Date:</Form.Label>
                              <Form.Control
                                type="date"
                                {...register("NBC_approval_date")}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>NBC Submission Date:</Form.Label>
                              <Form.Control
                                type="date"
                                {...register("NBC_submitted_date")}
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>CC Submission Date:</Form.Label>
                              <Form.Control
                                type="date"
                                {...register("ccSubmissionDate")}
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>
                    </Container1>
                  </Tab>
                  <Tab eventKey="third" title="FEES">
                    <Container1>
                      <div className="mt-2">
                        <Row>
                          <Col sm={6} className="my-0 py-0">
                            <Form.Group>
                              <Form.Label>Amount (₦'MN)</Form.Label>
                              <Form.Control
                                {...register("structuringFeeAmount")}
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={6} className="my-0 py-0">
                            <Form.Group>
                              <Form.Label>Advance (%)</Form.Label>
                              <Form.Control
                                {...register("structuringFeeAdvance")}
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={6} className="my-0 py-0">
                            <Form.Group>
                              <Form.Label>Final (%)</Form.Label>
                              <Form.Control
                                {...register("structuringFeeFinal")}
                                defaultValue={getValues("structuringFeeAmount")}
                                disabled
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={6} className="my-0 py-0">
                            <Form.Group>
                              <Form.Label>Guarantee(%)</Form.Label>
                              <Form.Control
                                {...register("guaranteeFee")}
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={6} className="my-0 py-0">
                            <Form.Group>
                              <Form.Label>Monitoring(₦'MN)</Form.Label>
                              <Form.Control
                                {...register("monitoringFee")}
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={6} className="my-0 py-0">
                            <Form.Group>
                              <Form.Label>Reimbursible(₦'MN)</Form.Label>

                              <Form.Control
                                {...register("reimbursible")}
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>
                    </Container1>
                  </Tab>
                  <Tab
                    eventKey="fourth"
                    title="DEAL CATEGORY"
                    style={{ fontSize: "12px" }}
                  >
                    <Container1>
                      <div name="redCategory" className="py-3">
                        <PWrapper>
                          <h6
                            className="pt-1"
                            style={{ fontSize: "10px", color: "red" }}
                          >
                            RED CATEGORY
                          </h6>
                        </PWrapper>
                      </div>
                      <Form.Group>
                        <Row>
                          <Col sm={6}>
                            <Form.Label style={{ paddingRight: "1rem" }}>
                              Mandate Letter signed:
                            </Form.Label>
                          </Col>
                          <Col sm={6}>
                            <Form.Check
                              inline
                              label="Yes"
                              type="radio"
                              {...register("redA")}
                              value={true}
                            />
                            <Form.Check
                              inline
                              label="No"
                              type="radio"
                              {...register("redA")}
                              value={false}
                              defaultChecked
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={6}>
                            <Form.Label style={{ paddingRight: "1rem" }}>
                              Due dilligence ongoing:
                            </Form.Label>
                          </Col>
                          <Col sm={6}>
                            <Form.Check
                              inline
                              label="Yes"
                              type="radio"
                              {...register("redB")}
                              value={true}
                            />
                            <Form.Check
                              inline
                              label="No"
                              type="radio"
                              {...register("redB")}
                              value={false}
                              defaultChecked
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={6}>
                            <Form.Label style={{ paddingRight: "1rem" }}>
                              Pending Credit Committee approval:
                            </Form.Label>
                          </Col>
                          <Col sm={6}>
                            <Form.Check
                              inline
                              label="Yes"
                              type="radio"
                              {...register("redC")}
                              value={true}
                            />
                            <Form.Check
                              inline
                              label="No"
                              type="radio"
                              {...register("redC")}
                              value={false}
                              defaultChecked
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                    </Container1>
                    <Container1 className="mt-2 pt-3">
                      <div name="amberCategory">
                        <PWrapper>
                          <h6
                            className="pt-1"
                            style={{ fontSize: "10px", color: "#FFC200" }}
                          >
                            AMBER CATEGORY
                          </h6>
                        </PWrapper>
                        <div>
                          <Row>
                            <Form.Group>
                              <Row>
                                <Col sm={6}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                    Mandate Letter signed:
                                  </Form.Label>
                                </Col>
                                <Col sm={6}>
                                  <Form.Check
                                    inline
                                    label="Yes"
                                    type="radio"
                                    {...register("amberA")}
                                    value={true}
                                  />
                                  <Form.Check
                                    inline
                                    label="No"
                                    type="radio"
                                    {...register("amberA")}
                                    value={false}
                                    defaultChecked
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col sm={6}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                    Transaction has obtained Credit Committe
                                    approval:
                                  </Form.Label>
                                </Col>
                                <Col sm={6}>
                                  <Form.Check
                                    inline
                                    label="Yes"
                                    type="radio"
                                    {...register("amberB")}
                                    value={true}
                                  />
                                  <Form.Check
                                    inline
                                    label="No"
                                    type="radio"
                                    {...register("amberB")}
                                    value={false}
                                    defaultChecked
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col sm={6}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                    Professional Parties to the Bond issue
                                    appointed or selected:
                                  </Form.Label>
                                </Col>
                                <Col sm={6}>
                                  <Form.Check
                                    inline
                                    label="Yes"
                                    type="radio"
                                    {...register("amberC")}
                                    value={true}
                                  />
                                  <Form.Check
                                    inline
                                    label="No"
                                    type="radio"
                                    {...register("amberC")}
                                    value={false}
                                    defaultChecked
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col sm={6}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                    Fee Letter and/or Guarantee Documentation
                                    expected to be negotiated and/or signed
                                    within 8 weeks:
                                  </Form.Label>
                                </Col>
                                <Col sm={6}>
                                  <Form.Check
                                    inline
                                    label="Yes"
                                    type="radio"
                                    {...register("amberD")}
                                    value={true}
                                  />
                                  <Form.Check
                                    inline
                                    label="No"
                                    type="radio"
                                    {...register("amberD")}
                                    value={false}
                                    defaultChecked
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col sm={6}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                    All Materials CPs with timelines for
                                    completion agreed with the client:
                                  </Form.Label>
                                </Col>
                                <Col sm={6}>
                                  <Form.Check
                                    inline
                                    label="Yes"
                                    type="radio"
                                    {...register("amberE")}
                                    value={true}
                                  />
                                  <Form.Check
                                    inline
                                    label="No"
                                    type="radio"
                                    {...register("amberE")}
                                    value={false}
                                    defaultChecked
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Row>
                        </div>
                      </div>
                    </Container1>
                    <Container1 className="mt-2 pt-3">
                      <div name="greenCategory">
                        <PWrapper>
                          <br />
                          <h6
                            className="pt-1"
                            style={{ fontSize: "10px", color: "green" }}
                          >
                            GREEN CATEGORY
                          </h6>
                        </PWrapper>
                        <div></div>
                        <Row>
                          <Form.Group>
                            <Row>
                              <Col sm={6}>
                                <Form.Label style={{ paddingRight: "1rem" }}>
                                  Transaction has obtained Credit Committee
                                  approval:
                                </Form.Label>
                              </Col>
                              <Col sm={6}>
                                <Form.Check
                                  inline
                                  label="Yes"
                                  type="radio"
                                  {...register("greenA")}
                                  value={true}
                                />
                                <Form.Check
                                  inline
                                  label="No"
                                  type="radio"
                                  {...register("greenA")}
                                  value={false}
                                  defaultChecked
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col sm={6}>
                                <Form.Label style={{ paddingRight: "1rem" }}>
                                  Guarantee Document in agreed form:
                                </Form.Label>
                              </Col>
                              <Col sm={6}>
                                <Form.Check
                                  inline
                                  label="Yes"
                                  type="radio"
                                  {...register("greenB")}
                                  value={true}
                                />
                                <Form.Check
                                  inline
                                  label="No"
                                  type="radio"
                                  {...register("greenB")}
                                  value={false}
                                  defaultChecked
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col sm={6}>
                                <Form.Label style={{ paddingRight: "1rem" }}>
                                  Professional Parties to the Bond Issue
                                  appointed or selected:
                                </Form.Label>
                              </Col>
                              <Col sm={6}>
                                <Form.Check
                                  inline
                                  label="Yes"
                                  type="radio"
                                  {...register("greenC")}
                                  value={true}
                                />
                                <Form.Check
                                  inline
                                  label="No"
                                  type="radio"
                                  {...register("greenC")}
                                  value={false}
                                  defaultChecked
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col sm={6}>
                                <Form.Label style={{ paddingRight: "1rem" }}>
                                  Already filed or expected filing with SEC (or
                                  equivalent Exchange) within 6 weeks:
                                </Form.Label>
                              </Col>
                              <Col sm={6}>
                                <Form.Check
                                  inline
                                  label="Yes"
                                  type="radio"
                                  {...register("greenD")}
                                  value={true}
                                />
                                <Form.Check
                                  inline
                                  label="No"
                                  type="radio"
                                  {...register("greenD")}
                                  value={false}
                                  defaultChecked
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col sm={6}>
                                <Form.Label style={{ paddingRight: "1rem" }}>
                                  All Materials CPs to Financial Close have been
                                  satisfactorily met or committed by the Client
                                  for completion on or before Financial Close:
                                </Form.Label>
                              </Col>
                              <Col sm={6}>
                                <Form.Check
                                  inline
                                  label="Yes"
                                  type="radio"
                                  {...register("greenE")}
                                  value={true}
                                />
                                <Form.Check
                                  inline
                                  label="No"
                                  type="radio"
                                  {...register("greenE")}
                                  value={false}
                                  defaultChecked
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col sm={6}>
                                <Form.Label style={{ paddingRight: "1rem" }}>
                                  Financial Close expected within 3-6 months:
                                </Form.Label>
                              </Col>
                              <Col sm={6}>
                                <Form.Check
                                  inline
                                  label="Yes"
                                  type="radio"
                                  {...register("greenF")}
                                  value={true}
                                />
                                <Form.Check
                                  inline
                                  label="No"
                                  type="radio"
                                  {...register("greenF")}
                                  value={false}
                                  defaultChecked
                                />
                              </Col>
                            </Row>
                          </Form.Group>
                        </Row>
                      </div>
                    </Container1>
                  </Tab>
                  <Tab
                    eventKey="sixth"
                    title="NBC FOCUS AREAS"
                    style={{ fontSize: "12px" }}
                  >
                    <Container1>
                      <Row className="py-1">
                        <Col sm={2}>
                          <div>
                            ORIGINAL
                            {fields.map((item, index) => {
                              return (
                                <Controller
                                  render={({ field }) => (
                                    <Box
                                      component="div"
                                      sx={{
                                        "& > :not(style)": {
                                          m: 1,
                                          width: "11ch",
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
                                  name={`nbcFocus.${index}.nbc_focus_original`}
                                  control={control}
                                />
                              );
                            })}
                          </div>
                        </Col>
                        <Col sm={2}>
                          <div>
                            CONCERNS
                            {fields.map((item, index) => {
                              return (
                                <Controller
                                  render={({ field }) => (
                                    <Box
                                      component="div"
                                      sx={{
                                        "& > :not(style)": {
                                          width: "10ch",
                                        },
                                      }}
                                      noValidate
                                      autoComplete="off"
                                    >
                                      <div className="mt-2">
                                        <Form.Select
                                          style={{
                                            height: "30px",
                                            fontSize: "12px",
                                          }}
                                          {...field}
                                          variant="standard"
                                        >
                                          <option value="">
                                            <em>select</em>
                                          </option>
                                          <option
                                            value={1}
                                            selected={
                                              item.status === "1"
                                                ? "selected"
                                                : true
                                            }
                                          >
                                            Yes
                                          </option>
                                          <option
                                            value={0}
                                            selected={
                                              item.status === "0"
                                                ? "selected"
                                                : false
                                            }
                                          >
                                            No
                                          </option>
                                        </Form.Select>
                                      </div>
                                    </Box>
                                  )}
                                  name={`nbcFocus.${index}.nbc_focus_original_yes_no`}
                                  control={control}
                                />
                              );
                            })}
                          </div>
                        </Col>
                        <Col sm={2}>
                          <div className="text-start">
                            <>DATE</>
                            {fields.map((item, index) => {
                              return (
                                <div className="mt-2">
                                  <Controller
                                    render={({ field }) => (
                                      <Box
                                        sx={{
                                          "& > :not(style)": {
                                            width: "12ch",
                                          },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                      >
                                        <Form.Control
                                          style={{ height: "30px" }}
                                          type="date"
                                          {...field}
                                        />
                                      </Box>
                                    )}
                                    name={`nbcFocus.${index}.nbc_focus_original_date`}
                                    control={control}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div>
                            METHODOLOGY
                            {fields.map((item, index) => {
                              return (
                                <div>
                                  <Controller
                                    render={({ field }) => (
                                      <div className="mt-2">
                                        <Form.Control
                                          style={{
                                            height: "30px",
                                            width: "50%",
                                            display: "inline",
                                          }}
                                          type="text"
                                          {...field}
                                          variant="standard"
                                          // style={{ marginLeft: "10px" }}
                                        />
                                        <button
                                          type="button"
                                          onClick={() => remove(index)}
                                          // className="mt-3 pt-2"
                                          className="mt-1"
                                          style={{
                                            height: "25px",
                                            border: "none",
                                          }}
                                        >
                                          <i className="">
                                            <FiDelete />
                                          </i>
                                        </button>
                                      </div>
                                    )}
                                    name={`nbcFocus.${index}.nbc_focus_original_methodology`}
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
                                nbc_focus_original: "",
                                nbc_focus_original_yes_no: 0,
                                nbc_focus_original_date: null,
                                nbc_focus_original_methodology: "",
                              });
                            }}
                          />
                        </div>
                      </Row>

                      <div>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={5}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                    MROC Pre_NBC Approval ( Link to Doc)
                                  </Form.Label>
                                </Col>
                                <Col sm={3}>
                                  {/* <input
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_1_b"
                                    value=""
                                  /> */}
                                   {fields.map((item, index) => {
                              return (
                                <Controller
                                  render={({ field }) => (
                                    <Box
                                      component="div"
                                      // sx={{
                                      //   "& > :not(style)": {
                                      //     m: 1,
                                      //     width: "11ch",
                                      //   },
                                      // }}
                                      // noValidate
                                      // autoComplete="off"
                                    >
                                      <input
                                        // style={{ height: "30px" }}
                                        {...field}
                                      />
                                    </Box>
                                  )}
                                  name={`nbcFocus.${index}.nbc_focus_apprv_1_b`}
                                  control={control}
                                />
                              );
                            })}
                                </Col>
                                <Col sm={3}>
                                  {/* <input
                                    size="sm"
                                    type="date"
                                  
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_1_c"
                                    style={{
                                      width: "80%",
                                      padding: "2px 1px",
                                      focus: "none",
                                    }}
                                  /> */}
                                   {fields.map((item, index) => {
                              return (
                                <Controller
                                  render={({ field }) => (
                                    <Box
                                      component="div"
                                      // sx={{
                                      //   "& > :not(style)": {
                                      //     m: 1,
                                      //     width: "11ch",
                                      //   },
                                      // }}
                                      // noValidate
                                      // autoComplete="off"
                                    >
                                      <input
                                        // style={{ height: "30px" }}
                                        type="date"
                                        {...field}
                                      />
                                    </Box>
                                  )}
                                  name={`nbcFocus.${index}.nbc_focus_apprv_1_c`}
                                  control={control}
                                />
                              );
                            })}
                                </Col>
                              </Row>
                              <Row>
                                <Col sm={5}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                    MROC Pre_NBC Minutes. ( Link to Doc)
                                  </Form.Label>
                                </Col>
                                <Col sm={3}>
                                  {/* <input
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_2_b"
                                    value=""
                                  /> */}
                                   {fields.map((item, index) => {
                              return (
                                <Controller
                                  render={({ field }) => (
                                    <Box
                                      component="div"
                                      // sx={{
                                      //   "& > :not(style)": {
                                      //     m: 1,
                                      //     width: "11ch",
                                      //   },
                                      // }}
                                      // noValidate
                                      // autoComplete="off"
                                    >
                                      <input
                                        // style={{ height: "30px" }}
                                        {...field}
                                      />
                                    </Box>
                                  )}
                                  name={`nbcFocus.${index}.nbc_focus_apprv_2_b`}
                                  control={control}
                                />
                              );
                            })}
                                </Col>
                                <Col sm={3}>
                                  {/* <input
                                    size="sm"
                                    type="date"
                                    // value={deal.nbc_focus_apprv_1_c}
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_2_c"
                                    style={{
                                      width: "80%",
                                      padding: "2px 1px",
                                      focus: "none",
                                    }}
                                  /> */}
                                   {fields.map((item, index) => {
                              return (
                                <Controller
                                  render={({ field }) => (
                                    <Box
                                      component="div"
                                      // sx={{
                                      //   "& > :not(style)": {
                                      //     m: 1,
                                      //     width: "11ch",
                                      //   },
                                      // }}
                                      // noValidate
                                      // autoComplete="off"
                                    >
                                      <input
                                        // style={{ height: "30px" }}
                                        type="date"
                                        {...field}
                                      />
                                    </Box>
                                  )}
                                  name={`nbcFocus.${index}.nbc_focus_apprv_2_c`}
                                  control={control}
                                />
                              );
                            })}
                                </Col>
                              </Row>
                              <Row>
                                <Col sm={5}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                    NBC Approval ( Link to Doc)
                                  </Form.Label>
                                </Col>
                                <Col sm={3}>
                                  {/* <input
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_3_b"
                                    value=""
                                  /> */}
                                   {fields.map((item, index) => {
                              return (
                                <Controller
                                  render={({ field }) => (
                                    <Box
                                      component="div"
                                      // sx={{
                                      //   "& > :not(style)": {
                                      //     m: 1,
                                      //     width: "11ch",
                                      //   },
                                      // }}
                                      // noValidate
                                      // autoComplete="off"
                                    >
                                      <input
                                        // style={{ height: "30px" }}
                                        {...field}
                                      />
                                    </Box>
                                  )}
                                  name={`nbcFocus.${index}.nbc_focus_apprv_3_b`}
                                  control={control}
                                />
                              );
                            })}
                                </Col>
                                <Col sm={3}>
                                  {/* <input
                                    size="sm"
                                    type="date"
                                    // value={deal.nbc_focus_apprv_1_c}
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_3_c"
                                    style={{
                                      width: "80%",
                                      padding: "2px 1px",
                                      focus: "none",
                                    }}
                                  /> */}
                                   {fields.map((item, index) => {
                              return (
                                <Controller
                                  render={({ field }) => (
                                    <Box
                                      component="div"
                                      // sx={{
                                      //   "& > :not(style)": {
                                      //     m: 1,
                                      //     width: "11ch",
                                      //   },
                                      // }}
                                      // noValidate
                                      // autoComplete="off"
                                    >
                                      <input
                                        // style={{ height: "30px" }}
                                        type="date"
                                        {...field}
                                      />
                                    </Box>
                                  )}
                                  name={`nbcFocus.${index}.nbc_focus_apprv_3_c`}
                                  control={control}
                                />
                              );
                            })}
                                </Col>
                              </Row>
                              <Row>
                                <Col sm={5}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                    NBC Minutes ( Link to Doc)
                                  </Form.Label>
                                </Col>
                                <Col sm={3}>
                                  {/* <input
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_4_b"
                                    value=""
                                  /> */}
                                   {fields.map((item, index) => {
                              return (
                                <Controller
                                  render={({ field }) => (
                                    <Box
                                      component="div"
                                      // sx={{
                                      //   "& > :not(style)": {
                                      //     m: 1,
                                      //     width: "11ch",
                                      //   },
                                      // }}
                                      // noValidate
                                      // autoComplete="off"
                                    >
                                      <input
                                        // style={{ height: "30px" }}
                                        {...field}
                                      />
                                    </Box>
                                  )}
                                  name={`nbcFocus.${index}.nbc_focus_apprv_4_b`}
                                  control={control}
                                />
                              );
                            })}
                                </Col>
                                <Col sm={3}>
                                  {/* <input
                                    size="sm"
                                    type="date"
                                    // value={deal.nbc_focus_apprv_1_c}
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_4_c"
                                    style={{
                                      width: "80%",
                                      padding: "2px 1px",
                                      focus: "none",
                                    }}
                                  /> */}
                                   {fields.map((item, index) => {
                              return (
                                <Controller
                                  render={({ field }) => (
                                    <Box
                                      component="div"
                                      // sx={{
                                      //   "& > :not(style)": {
                                      //     m: 1,
                                      //     width: "11ch",
                                      //   },
                                      // }}
                                      // noValidate
                                      // autoComplete="off"
                                    >
                                      <input
                                      type="date"
                                        // style={{ height: "30px" }}
                                        {...field}
                                      />
                                    </Box>
                                  )}
                                  name={`nbcFocus.${index}.nbc_focus_apprv_4_c`}
                                  control={control}
                                />
                              );
                            })}
                                </Col>
                              </Row>
                              <Row>
                                <Col sm={5}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                    Mandate Letter with Indicative Term Sheet
                                    On-Boarding Documents ( Link to Doc)
                                  </Form.Label>
                                </Col>
                                <Col sm={3}>
                                  {/* <input
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_5_b"
                                    value=""
                                  /> */}
                                   {fields.map((item, index) => {
                              return (
                                <Controller
                                  render={({ field }) => (
                                    <Box
                                      component="div"
                                      // sx={{
                                      //   "& > :not(style)": {
                                      //     m: 1,
                                      //     width: "11ch",
                                      //   },
                                      // }}
                                      // noValidate
                                      // autoComplete="off"
                                    >
                                      <input
                                       
                                        // style={{ height: "30px" }}
                                        {...field}
                                      />
                                    </Box>
                                  )}
                                  name={`nbcFocus.${index}.nbc_focus_apprv_5_b`}
                                  control={control}
                                />
                              );
                            })}
                                </Col>
                                <Col sm={3}>
                                  {/* <input
                                    size="sm"
                                    type="date"
                                    // value={deal.nbc_focus_apprv_1_c}
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_5_c"
                                    style={{
                                      width: "80%",
                                      padding: "2px 1px",
                                      focus: "none",
                                    }}
                                  /> */}
                                   {fields.map((item, index) => {
                              return (
                                <Controller
                                  render={({ field }) => (
                                    <Box
                                      component="div"
                                      // sx={{
                                      //   "& > :not(style)": {
                                      //     m: 1,
                                      //     width: "11ch",
                                      //   },
                                      // }}
                                      // noValidate
                                      // autoComplete="off"
                                    >
                                      <input
                                        type="date"
                                        // style={{ height: "30px" }}
                                        {...field}
                                      />
                                    </Box>
                                  )}
                                  name={`nbcFocus.${index}.nbc_focus_nbc_focus_apprv_5_c`}
                                  control={control}
                                />
                              );
                            })}
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-end ml-2">
                        <p className=""></p>
                      </div>
                    </Container1>
                  </Tab>
                  <Tab
                    eventKey="seventh"
                    title="TRANSACTION PARTIES"
                    style={{ fontSize: "12px" }}
                  >
                    <Container1>
                      <br />
                      <Row className="py-1">
                        <Col sm={3} className="mt-1 mb-1">
                          <p>Role</p>
                          {parties.map((singleNote, index) => (
                            <Form.Control
                              style={{ height: "30px" }}
                              type="text"
                              value={singleNote.parties}
                              name="parties_role"
                              onChange={(e) => handlePartyChange(e, index)}
                              variant="standard"
                            />
                          ))}
                        </Col>
                        <Col sm={2} className="mt-1 mb-1">
                          <p>Appointed</p>
                          {parties.map((singleNote, index) => (
                            <Form.Select
                              style={{ height: "30px", fontSize: "12px" }}
                              type="text"
                              size="md"
                              value={singleNote.parties}
                              onChange={(e) => handlePartyChange(e, index)}
                              name="parties_appointed"
                              variant="standard"
                            >
                              <option value={1} name="parties_appointed">
                                Yes
                              </option>
                              <option value={2} name="parties_appointed">
                                No
                              </option>
                            </Form.Select>
                          ))}
                        </Col>
                        <Col sm={2} className=" mb-1 mt-1">
                          <p>Party</p>
                          {parties.map((singleNote, index) => (
                            <Form.Control
                              type="text"
                              style={{ height: "30px" }}
                              value={singleNote.parties}
                              name="parties_party"
                              onChange={(e) => handlePartyChange(e, index)}
                              variant="standard"
                            />
                          ))}
                        </Col>
                        <Col sm={2} className="mt-1 mb-1">
                          <p>Status</p>
                          {parties.map((singleNote, index) => (
                            <div>
                              <Form.Control
                                type="text"
                                style={{
                                  width: "70%",
                                  display: "inline",
                                  height: "30px",
                                }}
                                value={singleNote.parties}
                                name="parties_status"
                                onChange={(e) => handlePartyChange(e, index)}
                                variant="standard"
                              />
                              <button
                                onClick={handlePartyRemove}
                                className="mt-1"
                                style={{ height: "25px", border: "none" }}
                              >
                                <i className="">
                                  <FiDelete />
                                </i>
                              </button>
                            </div>
                          ))}
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-end ml-2">
                        <p className="">
                          <GrAdd onClick={handlePartyAdd} />
                        </p>
                      </div>
                    </Container1>
                  </Tab>
                  <Tab
                    eventKey="eigth"
                    title="PERFORMANCE-LINKED INDICATORS"
                    style={{ fontSize: "12px" }}
                  >
                    <Container1>
                      <br />
                      {showAlert && validatePlisWeights()}
                      <Row className="py-1">
                        <Col sm={2} className="mt-1 mb-1">
                          <p>Particulars</p>
                          {plis.map((singleNote, index) => (
                            <Form.Control
                              type="text"
                              size="sm"
                              value={singleNote.plis}
                              name="plis_particulars"
                              onChange={(e) => handlePlisChange(e, index)}
                              variant="standard"
                            />
                          ))}
                        </Col>
                        <Col sm={2} className="mb-1">
                          <p>Concern</p>
                          {plis.map((singleNote, index) => (
                            <Form.Select
                              style={{ height: "32px", fontSize: "10px" }}
                              type="text"
                              value={singleNote.plis}
                              onChange={(e) => handlePlisChange(e, index)}
                              name="plis_concern"
                              variant="standard"
                            >
                              <option>Concern</option>
                              <option value={"High"} name="plis_concern">
                                High
                              </option>
                              <option value={"medium"} name="plis_concern">
                                Medium
                              </option>
                              <option value={"Low"} name="plis_concern">
                                Low
                              </option>
                            </Form.Select>
                          ))}
                        </Col>
                        
                        <Col sm={2} className=" mb-1">
                          <p>Weight (%)</p>
                          {plis.map((singleNote, index) => (
                            <Form.Control
                              type="number"
                              size="sm"
                              value={singleNote.plis}
                              name="plis_weighting"
                              onChange={(e) => handlePlisChange(e, index)}
                              onBlur={() => setShowAlert(true)}
                              variant="standard"
                            />
                          ))}
                        </Col>
                        <Col sm={2} className="">
                          <p>Expected</p>
                          {plis.map((singleNote, index) => (
                            <Box
                              component="div"
                              sx={{
                                "& > :not(style)": {
                                  width: "14ch",
                                },
                              }}
                              noValidate
                              autoComplete="off"
                            >
                              <Form.Control
                                style={{
                                  height: "31px",
                                  fontSize: "12px",
                                  display: "inline",
                                }}
                                type="date"
                                value={singleNote.plis}
                                name="plis_expected"
                                onChange={(e) => handlePlisChange(e, index)}
                                variant="standard"
                              />
                            </Box>
                          ))}
                        </Col>
                        <Col sm={3} className="">
                          <p>Status</p>
                          {plis.map((singleNote, index) => (
                            <div class="input-group">
                              <Form.Control
                                type="text"
                                style={{ width: "30%", height: "10px" }}
                                size="sm"
                                value={singleNote.plis}
                                name="plis_status"
                                onChange={(e) => handlePlisChange(e, index)}
                              />
                              <button
                                onClick={handlePlisRemove}
                                className="mt-1"
                                style={{ height: "25px", border: "none" }}
                              >
                                <i className="">
                                  <FiDelete />
                                </i>
                              </button>
                            </div>
                          ))}
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-end ml-2">
                        <p className="">
                          <GrAdd onClick={handlePlisAdd} />
                        </p>
                      </div>
                    </Container1>
                  </Tab>

                  <Tab
                    eventKey="ninth"
                    title="OTHER CONDITIONS PRECEDENT"
                    style={{ fontSize: "12px" }}
                  >
                    <Row className="py-1">
                      <Col sm={2} className=" mb-1">
                        <p>Factors</p>
                        {ocps.map((singleNote, index) => (
                          <Form.Control
                            style={{ height: "31px", fontSize: "12px" }}
                            type="text"
                            value={singleNote.ocps}
                            name="ocps_factors"
                            onChange={(e) => handleOcpsChange(e, index)}
                            variant="standard"
                          />
                        ))}
                      </Col>
                      <Col sm={2} className="mb-1">
                        <p>Yes/No</p>
                        {ocps.map((singleNote, index) => (
                          <Form.Select
                            style={{ height: "31px", fontSize: "13px" }}
                            type="text"
                            size="md"
                            value={singleNote.ocps}
                            onChange={(e) => handleOcpsChange(e, index)}
                            name="ocps_yes_no"
                            variant="standard"
                          >
                            <option>Select</option>
                            <option value={1} name="ocps_yes_no">
                              Yes
                            </option>
                            <option value={0} name="ocps_yes_no">
                              No
                            </option>
                          </Form.Select>
                        ))}
                      </Col>
                      <Col sm={1} className="mb-1">
                        <p>Concern</p>
                        {ocps.map((singleNote, index) => (
                          <Form.Select
                            style={{ height: "31px", fontSize: "12px" }}
                            type="text"
                            size="md"
                            value={singleNote.ocps}
                            onChange={(e) => handleOcpsChange(e, index)}
                            name="ocps_concern"
                            variant="standard"
                          >
                            <option>Concern</option>
                            <option value={"High"} name="ocps_concern">
                              High
                            </option>
                            <option value={"Medium"} name="ocps_concern">
                              Medium
                            </option>
                            <option value={"Low"} name="ocps_concern">
                              Low
                            </option>
                          </Form.Select>
                        ))}
                      </Col>
                      <Col sm={2} className=" mb-1">
                        <p>Expected Date</p>
                        {ocps.map((singleNote, index) => (
                          <Box
                            component="div"
                            sx={{
                              "& > :not(style)": {
                                width: "13ch",
                              },
                            }}
                            noValidate
                            autoComplete="off"
                          >
                            <Form.Control
                              type="date"
                              size="sm"
                              value={singleNote.ocps}
                              name="ocps_expected"
                              onChange={(e) => handleOcpsChange(e, index)}
                              variant="standard"
                            />
                          </Box>
                        ))}
                      </Col>
                      <Col sm={2} className=" mb-1">
                        <p>Resp Party</p>
                        {ocps.map((singleNote, index) => (
                          <Form.Control
                            type="text"
                            size="sm"
                            value={singleNote.ocps}
                            name="ocps_resp_party"
                            onChange={(e) => handleOcpsChange(e, index)}
                            variant="standard"
                          />
                        ))}
                      </Col>
                      <Col sm={3} className="">
                        <p>Status</p>
                        {ocps.map((singleNote, index) => (
                          <Box
                            component="span"
                            sx={{
                              "& > :not(style)": {
                                width: "9ch",
                              },
                            }}
                            noValidate
                            autoComplete="off"
                          >
                            <Form.Control
                              style={{
                                display: "inline",
                                height: "30px",
                              }}
                              type="text"
                              value={singleNote.ocps}
                              name="ocps_status"
                              onChange={(e) => handleOcpsChange(e, index)}
                              variant="standard"
                            />

                            <button
                              onClick={handleOcpsRemove}
                              className="mt-1"
                              style={{ height: "25px", border: "none" }}
                            >
                              <i className="">
                                <FiDelete />
                              </i>
                            </button>
                          </Box>
                        ))}
                      </Col>
                    </Row>
                    <div className="d-flex justify-content-end ml-2">
                      <p className="">
                        <GrAdd onClick={handleOcpsAdd} />
                      </p>
                    </div>
                  </Tab>
                  <Tab
                    eventKey="tenth"
                    title="KEY DEAL FACTORS"
                    style={{ fontSize: "12px" }}
                  >
                    <br />
                    <Row className="py-1">
                      <Col sm={2} className=" mb-1">
                        <p>Factors</p>
                        {kpi.map((singleNote, index) => (
                          <Form.Control
                            type="text"
                            size="sm"
                            value={singleNote.kpi}
                            name="kpi_factors"
                            onChange={(e) => handleKpiChange(e, index)}
                            variant="standard"
                          />
                        ))}
                      </Col>
                      <Col sm={2} className="mb-1">
                        <p>Yes/No</p>
                        {kpi.map((singleNote, index) => (
                          <Form.Select
                            style={{ height: "30px", fontSize: "12px" }}
                            type="text"
                            value={singleNote.kpi}
                            onChange={(e) => handleKpiChange(e, index)}
                            name="kpi_yes_no"
                            variant="standard"
                          >
                            <option>Yes/No</option>
                            <option value={1} name="kpi_yes_no">
                              Yes
                            </option>
                            <option value={0} name="kpi_yes_no">
                              No
                            </option>
                          </Form.Select>
                        ))}
                      </Col>
                      <Col sm={2} className="mb-1">
                        <p>Concern</p>
                        {kpi.map((singleNote, index) => (
                          <Form.Select
                            style={{ height: "30px", fontSize: "12px" }}
                            type="text"
                            value={singleNote.kpi}
                            onChange={(e) => handleKpiChange(e, index)}
                            name="kpi_concern"
                            variant="standard"
                          >
                            <option>Concern</option>
                            <option value={"High"} name="kpi_concern">
                              High
                            </option>
                            <option value={"medium"} name="kpi_concern">
                              Medium
                            </option>
                            <option value={"Low"} name="kpi_concern">
                              Low
                            </option>
                          </Form.Select>
                        ))}
                      </Col>
                      <Col sm={2}>
                        <p>Expected</p>
                        {kpi.map((singleNote, index) => (
                          <Box
                            component="div"
                            sx={{
                              "& > :not(style)": {
                                width: "13ch",
                              },
                            }}
                            noValidate
                            autoComplete="off"
                          >
                            <Form.Control
                              type="date"
                              size="sm"
                              value={singleNote.kpi}
                              name="kpi_expected"
                              onChange={(e) => handleKpiChange(e, index)}
                              variant="standard"
                            />
                          </Box>
                        ))}
                      </Col>
                      <Col sm={2} className=" mb-1">
                        <p>Resp. Party</p>
                        {kpi.map((singleNote, index) => (
                          <Form.Control
                            type="text"
                            size="sm"
                            value={singleNote.kpi}
                            name="kpi_resp_party"
                            onChange={(e) => handleKpiChange(e, index)}
                            variant="standard"
                          />
                        ))}
                      </Col>
                      <Col sm={2} className="">
                        <p>Status</p>
                        {kpi.map((singleNote, index) => (
                          <div>
                            <Form.Control
                              type="text"
                              style={{
                                width: "70%",
                                height: "10px",
                                display: "inline",
                              }}
                              size="sm"
                              value={singleNote.kpi}
                              name="kpi_status"
                              onChange={(e) => handleKpiChange(e, index)}
                              variant="standard"
                            />
                            <button
                              onClick={handleKpiRemove}
                              className="mt-1"
                              style={{ height: "25px", border: "none" }}
                            >
                              <i className="">
                                <FiDelete />
                              </i>
                            </button>
                          </div>
                        ))}
                      </Col>
                    </Row>
                    <div className="d-flex justify-content-end ml-2">
                      <p className="">
                        <GrAdd onClick={handleKpiAdd} />
                      </p>
                    </div>
                  </Tab>
                  <Tab eventKey="" title="AMORTIZATION">
                    <Container1>
                    <Container>
                      <div>
                        <Row className='mt-2 pt-2'>
                          <Col sm={6}>
                          <Form.Label>Principal</Form.Label>
                        <Form.Control
                          type="number"
                          size="sm"
                          {...register("principal", { required: true })}
                        />
                          </Col>
                          <Col sm={6}>
                          <Form.Label>IssueDate</Form.Label>
                        <Form.Control
                          type="date"
                          size="sm"
                          {...register("issuedate", { required: true })}
                        />
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={6}>
                          <Form.Label>FirstCouponDate</Form.Label>
                        <Form.Control
                          type="date"
                          size="sm"
                          name="plis_status"
                          {...register("firstcoupondate", { required: true })}
                        />
                          </Col>
                          <Col sm={6}>
                          <Form.Label>TakingFirstInterestEarly</Form.Label>
                        <Form.Control
                          type="number"
                          size="sm"
                          {...register("takingfirstinterestearly", { required: true })}
                        />
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={6}>
                          <Form.Label>GuaranteeFeeRate</Form.Label>
                        <Form.Control
                          type="number"
                          size="sm"
                          {...register("guaranteefeerate", { required: true })}
                        />

                          </Col>
                          <Col sm={6}>
                          <Form.Label>DiscountFactor</Form.Label>
                        <Form.Control
                          type="number"
                          size="sm"
                          {...register("discountfactor", { required: true })}
                        />

                          </Col>

                        </Row>

                      </div>
                    </Container>
                    </Container1>
                    
                  </Tab>
                </Tabs>

                <div
                  className="d-flex justify-content-end"
                  style={{ fontSize: "13px", color: "red" }}
                >
                  <p class="animate__animated animate__pulse pt-2">
                    {response}
                  </p>
                  <div className="text-danger">
                    {(errors.clientName ||
                      errors.dealSize ||
                      errors.product ||
                      errors.region ||
                      errors.transactor ||
                      errors.originator ||
                      errors.transactionLegalLead ||
                      errors.industry ||
                      errors.region ||
                      errors.mandateLetter ||
                      errors.creditApproval) && (
                      <p>Kindly fill out all required fields.</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <ButtonWrapper type="submit">Submit</ButtonWrapper>
                <ButtonWrapper type="reset" style={{color:'white !important'}}>Reset</ButtonWrapper>
              </div>
            </form>
          )}
        </Container>
      </FormWrapper>
    </React.Fragment>
  );
};

export default NewTransaction;
