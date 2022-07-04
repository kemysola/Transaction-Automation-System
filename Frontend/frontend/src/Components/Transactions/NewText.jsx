import React, { useState, useEffect, useRef } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Form as Fm, Container, Row, Col, Dropdown } from "react-bootstrap";
import styled from "styled-components";
import Services from "../../Services/Service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import { GrAdd } from "react-icons/gr";
import { FiDelete } from "react-icons/fi";

const ButtonWrapper = styled.button`
  background: green;
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
  font-size: 5px;
  padding: 0;
`;

const Container1 = styled.div`
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

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block text-danger">
        This field is required!
      </div>
    );
  }
};

const AddDeal = () => {
  // ******************************************  Declare Initial state ****************************************

  const initialDealState = {
    clientName: "",
    originator: "",
    transactor: "",
    transactionLegalLead: "",
    industry: "",
    product: "",
    region: "",
    dealSize: 0,
    coupon: 0,
    tenor: 0,
    moratorium: 0,
    repaymentFrequency: "Semi-Annually",
    amortizationStyle: "Annuity",
    mandateLetter: null,
    nbc_approval_date: null,
    nbc_submitted_date: null,
    creditApproval: null,
    feeLetter: null,
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
    structuringFeeAmount: 0,
    structuringFeeAdvance: 0,
    guaranteeFee: 0,
    monitoringFee: 0,
    reimbursible: 0,
    notes: "",
    closed: false,
    nbcFocus: [{ label: "", concern: "", date: "", methodology: "" }],
    keyPerformanceI: [
      {
        factors: "",
        option: "",
        expected: "",
        concern: "",
        date: "",
        party: "",
        status: "",
      },
    ],
    // Performance Linked Indicators Columns
    plis_1_b: "",
    plis_1_c: 0.0,
    plis_1_d: null,
    plis_1_e: "",
    plis_2_b: "",
    plis_2_c: 0.0,
    plis_2_d: null,
    plis_2_e: "",
    plis_3_b: "",
    plis_3_c: 0.0,
    plis_3_d: null,
    plis_3_e: "",
    plis_4_b: "",
    plis_4_c: 0.0,
    plis_4_d: null,
    plis_4_e: "",
    plis_5_b: "",
    plis_5_c: 0.0,
    plis_5_d: null,
    plis_5_e: "",
    plis_6_b: "",
    plis_6_c: 0.0,
    plis_6_d: null,
    plis_6_e: "",

    // Parties Columns
    parties_1_b: "",
    parties_1_c: "false",
    parties_1_d: "",
    parties_2_b: "",
    parties_2_c: "false",
    parties_2_d: "",
    parties_3_b: "",
    parties_3_c: "false",
    parties_3_d: "",
    parties_4_b: "",
    parties_4_c: "false",
    parties_4_d: "",
    parties_5_b: "",
    parties_5_c: "false",
    parties_5_d: "",
    parties_6_b: "",
    parties_6_c: "false",
    parties_6_d: "",
    parties_7_b: "",
    parties_7_c: "false",
    parties_7_d: "",
    parties_8_b: "",
    parties_8_c: "false",
    parties_8_d: "",
    parties_9_b: "",
    parties_9_c: "false",
    parties_9_d: "",
    parties_10_b: "",
    parties_10_c: "false",
    parties_10_d: "",
    parties_11_b: "",
    parties_11_c: "false",
    parties_11_d: "",

    // NBC Focus Data
    // nbc_focus_original_1_b:"false",
    // nbc_focus_original_1_c:null,
    // nbc_focus_original_1_d:"",
    // nbc_focus_original_2_b:"false",
    // nbc_focus_original_2_c:null,
    // nbc_focus_original_2_d:"",
    // nbc_focus_original_3_b:"false",
    // nbc_focus_original_3_c:null,
    // nbc_focus_original_3_d:"",
    // nbc_focus_original_4_b:"false",
    // nbc_focus_original_4_c:null,
    // nbc_focus_original_4_d:"",
    // nbc_focus_original_5_b:"false",
    // nbc_focus_original_5_c:null,
    // nbc_focus_original_5_d:"",
    // nbc_focus_apprv_1_b:"false",
    // nbc_focus_apprv_1_c:null,
    // nbc_focus_apprv_2_b:"false",
    // nbc_focus_apprv_2_c:null,
    // nbc_focus_apprv_3_b:"false",
    // nbc_focus_apprv_3_c:null,
    // nbc_focus_apprv_4_b:"false",
    // nbc_focus_apprv_4_c:null,
    // nbc_focus_apprv_5_b:"false",
    // nbc_focus_apprv_5_c:null,

    // Other CPS Data
    ocps_fac_1_b: "false",
    ocps_fac_1_c: "",
    ocps_fac_1_d: null,
    ocps_fac_1_e: "",
    ocps_fac_1_f: "",
    ocps_fac_2_b: "false",
    ocps_fac_2_c: "",
    ocps_fac_2_d: null,
    ocps_fac_2_e: "",
    ocps_fac_2_f: "",
    ocps_fac_3_b: "false",
    ocps_fac_3_c: "",
    ocps_fac_3_d: null,
    ocps_fac_3_e: "",
    ocps_fac_3_f: "",
    ocps_fac_4_b: "false",
    ocps_fac_4_c: "",
    ocps_fac_4_d: null,
    ocps_fac_4_e: "",
    ocps_fac_4_f: "",
    ocps_fac_5_b: "false",
    ocps_fac_5_c: "",
    ocps_fac_5_d: null,
    ocps_fac_5_e: "",
    ocps_fac_5_f: "",
    ocps_fac_6_b: "false",
    ocps_fac_6_c: "",
    ocps_fac_6_d: null,
    ocps_fac_6_e: "",
    ocps_fac_6_f: "",
    ocps_fac_7_b: "false",
    ocps_fac_7_c: "",
    ocps_fac_7_d: null,
    ocps_fac_7_e: "",
    ocps_fac_7_f: "",
    ocps_fac_8_b: "false",
    ocps_fac_8_c: "",
    ocps_fac_8_d: null,
    ocps_fac_8_e: "",
    ocps_fac_8_f: "",
    ocps_fac_9_b: "false",
    ocps_fac_9_c: "",
    ocps_fac_9_d: null,
    ocps_fac_9_e: "",
    ocps_fac_9_f: "",

    ocps_fac_10_b: "false",
    ocps_fac_10_c: "",
    ocps_fac_10_d: null,
    ocps_fac_10_e: "",
    ocps_fac_10_f: "",
    ocps_fac_11_b: "false",
    ocps_fac_11_c: "",
    ocps_fac_11_d: null,
    ocps_fac_11_e: "",
    ocps_fac_11_f: "",
    ocps_fac_12_b: "false",
    ocps_fac_12_c: "",
    ocps_fac_12_d: null,
    ocps_fac_12_e: "",
    ocps_fac_12_f: "",
    ocps_fac_13_b: "false",
    ocps_fac_13_c: "",
    ocps_fac_13_d: null,
    ocps_fac_13_e: "",
    ocps_fac_13_f: "",
    ocps_fac_14_b: "false",
    ocps_fac_14_c: "",
    ocps_fac_14_d: null,
    ocps_fac_14_e: "",
    ocps_fac_14_f: "",
    ocps_fac_15_b: "false",
    ocps_fac_15_c: "",
    ocps_fac_15_d: null,
    ocps_fac_15_e: "",
    ocps_fac_15_f: "",
    ocps_fac_16_b: "false",
    ocps_fac_16_c: "",
    ocps_fac_16_d: null,
    ocps_fac_16_e: "",
    ocps_fac_16_f: "",
    ocps_fac_17_b: "false",
    ocps_fac_17_c: "",
    ocps_fac_17_d: null,
    ocps_fac_17_e: "",
    ocps_fac_17_f: "",
    ocps_fac_18_b: "false",
    ocps_fac_18_c: "",
    ocps_fac_18_d: null,
    ocps_fac_18_e: "",
    ocps_fac_18_f: "",
    ocps_fac_19_b: "false",
    ocps_fac_19_c: "",
    ocps_fac_19_d: null,
    ocps_fac_19_e: "",
    ocps_fac_19_f: "",
    ocps_fac_20_b: "false",
    ocps_fac_20_c: "",
    ocps_fac_20_d: null,
    ocps_fac_20_e: "",
    ocps_fac_20_f: "",

    //KEY PERFORMANCE INDICATOR
    key_deal_fac_1_b: "false",
    key_deal_fac_1_c: "",
    key_deal_fac_1_d: null,
    key_deal_fac_1_e: "",
    key_deal_fac_1_f: "",
    key_deal_fac_2_b: "false",
    key_deal_fac_2_c: "",
    key_deal_fac_2_d: null,
    key_deal_fac_2_e: "",
    key_deal_fac_2_f: "",
    key_deal_fac_3_b: "false",
    key_deal_fac_3_c: "",
    key_deal_fac_3_d: null,
    key_deal_fac_3_e: "",
    key_deal_fac_3_f: "",
    key_deal_fac_4_b: "false",
    key_deal_fac_4_c: "",
    key_deal_fac_4_d: null,
    key_deal_fac_4_e: "",
    key_deal_fac_4_f: "",
    key_deal_fac_5_b: "false",
    key_deal_fac_5_c: "",
    key_deal_fac_5_d: null,
    key_deal_fac_5_e: "",
    key_deal_fac_5_f: "",
    key_deal_fac_6_b: "false",
    key_deal_fac_6_c: "",
    key_deal_fac_6_d: null,
    key_deal_fac_6_e: "",
    key_deal_fac_6_f: "",
    key_deal_fac_7_b: "false",
    key_deal_fac_7_c: "",
    key_deal_fac_7_d: null,
    key_deal_fac_7_e: "",
    key_deal_fac_7_f: "",
    key_deal_fac_8_b: "false",
    key_deal_fac_8_c: "",
    key_deal_fac_8_d: null,
    key_deal_fac_8_e: "",
    key_deal_fac_8_f: "",
    key_deal_fac_9_b: "false",
    key_deal_fac_9_c: "",
    key_deal_fac_9_d: null,
    key_deal_fac_9_e: "",
    key_deal_fac_9_f: "",
    key_deal_fac_10_b: "false",
    key_deal_fac_10_c: "",
    key_deal_fac_10_d: null,
    key_deal_fac_10_e: "",
    key_deal_fac_10_f: "",
    key_deal_fac_11_b: "false",
    key_deal_fac_11_c: "",
    key_deal_fac_11_d: null,
    key_deal_fac_11_e: "",
    key_deal_fac_11_f: "",
    key_deal_fac_12_b: "false",
    key_deal_fac_12_c: "",
    key_deal_fac_12_d: null,
    key_deal_fac_12_e: "",
    key_deal_fac_12_f: "",
    key_deal_fac_13_b: "false",
    key_deal_fac_13_c: "",
    key_deal_fac_13_d: null,
    key_deal_fac_13_e: "",
    key_deal_fac_13_f: "",
    key_deal_fac_14_b: "false",
    key_deal_fac_14_c: "",
    key_deal_fac_14_d: null,
    key_deal_fac_14_e: "",
    key_deal_fac_14_f: "",
    key_deal_fac_15_b: "false",
    key_deal_fac_15_c: "",
    key_deal_fac_15_d: null,
    key_deal_fac_15_e: "",
    key_deal_fac_15_f: "",
    key_deal_fac_16_b: "false",
    key_deal_fac_16_c: null,
    key_deal_fac_17_b: "false",
    key_deal_fac_17_c: null,
    key_deal_fac_18_b: "false",
    key_deal_fac_18_c: null,
    key_deal_fac_19_b: "false",
    key_deal_fac_19_c: null,
    key_deal_fac_20_b: "false",
    key_deal_fac_20_c: null,
    key_deal_fac_21_b: "false",
    key_deal_fac_21_c: null,
    key_deal_fac_22_b: "false",
    key_deal_fac_22_c: null,
    key_deal_fac_23_b: "false",
    key_deal_fac_23_c: null,
  };

  // ******************************************  use state hook to store state ****************************************

  const [activeTab, setActiveTab] = useState("first");
  const [deal, setDeal] = useState(initialDealState);
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState(false);
  const [noteList, setNoteList] = useState([{ note: "" }]);
  const [nbcFocus, setNbcFocus] = useState([
    { label: "", concern: "", date: "", methodology: "" },
  ]);
  const [keyPerformanceI, setKeyPerformanceI] = useState([
    {
      factors: "",
      option: "",
      expected: "",
      concern: "",
      date: "",
      party: "",
      status: "",
    },
  ]);
  const [dealTracking, setDealTracking] = useState({});
  const [industry, setIndustry] = useState([]);
  const [product, setProduct] = useState([]);
  const [region, setRegion] = useState([]);
  const [frequency, setFrequency] = useState([]);
  const [style, setStyle] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const form = useRef();

  // ************************************ use Effect : ComponentDidMount - ComponentWillReceive **************

  useEffect(() => {
    retrieveIndustry();

    retrieveProduct();

    retrieveRegion();

    retrieveRepaymentFreq();

    retrieveAmortizationStyle();

    retrieveStaffList();
  }, []);

  // ******************************************  Axios :  get industry ****************************************

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

  // ******************************************  Next and Previous function  ****************************************

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
  }

  // ******************************************  req body event ****************************************

  const handleInputChange = (event) => {
    // function to save user data to deal state
    const { name, value } = event.target;
    setDeal({ ...deal, [name]: value });
  };

  const handleInputChanges = (event) => {
    // function to save user data to deal state
    const { name, value } = event.target;
    setDeal({ ...deal, [name]: value });
  };

  // *********************************************** Daniel's features ***********************************/
  const handleNbcChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...nbcFocus];
    list[index][name] = value;
    setNbcFocus(list);
  };

  const handleNbcAdd = () => {
    setNbcFocus([
      ...nbcFocus,
      { label: "", concern: "", date: "", methodology: "" },
    ]);
  };

  const handleNbcRemove = (index) => {
    const list = [...nbcFocus];
    list.splice(index, 1);
    setNbcFocus(list);
  };

  // **************************************************** Key Performance Indicators ************************
  const handleKpiChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...keyPerformanceI];
    list[index][name] = value;
    setKeyPerformanceI(list);
  };

  const handleKpiAdd = () => {
    setKeyPerformanceI([
      ...keyPerformanceI,
      { label: "", concern: "", date: "", methodology: "" },
    ]);
  };

  const handleKpiRemove = (index) => {
    const list = [...keyPerformanceI];
    list.splice(index, 1);
    setKeyPerformanceI(list);
  };
  // ******************************** note feature ******************************************************/
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
  };

  // Daniel's features
  // const addDealTracking = () => {
  //   setNoteList([...noteList, { note: "" }]);
  // };

  // const removeDealTracking = (index) => {
  //   const list = [...noteList];
  //   list.splice(index, 1);
  //   setNoteList(list);
  // };

  // const handleNoteChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...noteList];
  //   list[index][name] = value;
  //   setNoteList(list);
  // };

  // ******************************************* Save Deal and Send to the Backend ***********************************
  const saveDeal = (e) => {
    // function to save users data and post to db
    e.preventDefault();
    form.current.validateAll();

    let allNotes = noteList.map(({ note }) => note);
    let note = allNotes.join("|");

    // ******************************************  End Function  ****************************************

    // ************************************* Request body Payload to be sent to the DB ******************

    let data = {
      // store user's inpt in a variable called data
      clientName: deal.clientName,
      originator: deal.originator,
      transactor: deal.transactor,
      transactionLegalLead: deal.transactionLegalLead,
      industry: deal.industry,
      product: deal.product,
      region: deal.region,
      dealSize: +deal.dealSize,
      coupon: +deal.coupon,
      tenor: +deal.tenor,
      moratorium: +deal.moratorium,
      repaymentFrequency: deal.repaymentFrequency,
      amortizationStyle: deal.amortizationStyle,
      mandateLetter: `${deal.mandateLetter ? deal.mandateLetter : 19000101}`,
      creditApproval: `${deal.creditApproval ? deal.creditApproval : 19000101}`,
      feeLetter: `${deal.feeLetter ? deal.feeLetter : 19000101}`,
      expectedClose: `${deal.expectedClose ? deal.expectedClose : 19000101}`,
      actualClose: `${deal.actualClose ? deal.actualClose : 19000101}`,
      greenA: JSON.parse(deal.greenA),
      greenB: JSON.parse(deal.greenB),
      greenC: JSON.parse(deal.greenC),
      greenD: JSON.parse(deal.greenD),
      greenE: JSON.parse(deal.greenE),
      greenF: JSON.parse(deal.greenF),
      amberA: JSON.parse(deal.amberA),
      amberB: JSON.parse(deal.amberB),
      amberC: JSON.parse(deal.amberC),
      amberD: JSON.parse(deal.amberD),
      amberE: JSON.parse(deal.amberE),
      redA: JSON.parse(deal.redA),
      redB: JSON.parse(deal.redB),
      redC: JSON.parse(deal.redC),
      structuringFeeAmount: +deal.structuringFeeAmount,
      structuringFeeAdvance: +deal.structuringFeeAdvance,
      guaranteeFee: +deal.guaranteeFee,
      monitoringFee: +deal.monitoringFee,
      reimbursible: +deal.reimbursible,
      NBC_approval_date: `${
        deal.nbc_approval_date ? deal.nbc_approval_date : 19000101
      }`,
      NBC_submitted_date: `${
        deal.nbc_submitted_date ? deal.nbc_submitted_date : 19000101
      }`,
      notes: note,
      closed: false,
      nbcFocus: nbcFocus,
      // keyPerformanceI:keyPerformanceI,

      //Parties data
      parties_1_b: deal.parties_1_b,
      parties_1_c: JSON.parse(deal.parties_1_c),
      parties_1_d: deal.parties_1_d,

      parties_2_b: deal.parties_2_b,
      parties_2_c: JSON.parse(deal.parties_2_c),
      parties_2_d: deal.parties_2_d,

      parties_3_b: deal.parties_3_b,
      parties_3_c: JSON.parse(deal.parties_3_c),
      parties_3_d: deal.parties_3_d,

      parties_4_b: deal.parties_4_b,
      parties_4_c: JSON.parse(deal.parties_4_c),
      parties_4_d: deal.parties_4_d,

      parties_5_b: deal.parties_5_b,
      parties_5_c: JSON.parse(deal.parties_5_c),
      parties_5_d: deal.parties_5_d,

      parties_6_b: deal.parties_6_b,
      parties_6_c: JSON.parse(deal.parties_6_c),
      parties_6_d: deal.parties_6_d,

      parties_7_b: deal.parties_7_b,
      parties_7_c: JSON.parse(deal.parties_7_c),
      parties_7_d: deal.parties_7_d,

      parties_8_b: deal.parties_8_b,
      parties_8_c: JSON.parse(deal.parties_8_c),
      parties_8_d: deal.parties_8_d,

      parties_9_b: deal.parties_9_b,
      parties_9_c: JSON.parse(deal.parties_9_c),
      parties_9_d: deal.parties_9_d,

      parties_10_b: deal.parties_10_b,
      parties_10_c: JSON.parse(deal.parties_10_c),
      parties_10_d: deal.parties_10_d,

      parties_11_b: deal.parties_11_b,
      parties_11_c: JSON.parse(deal.parties_11_c),
      parties_11_d: deal.parties_11_d,

      // NBC Focus Data
      // nbc_focus_original_1_b: JSON.parse(deal.nbc_focus_original_1_b),
      // nbc_focus_original_1_c: `${deal.nbc_focus_original_1_c ? deal.nbc_focus_original_1_c : 19000101}`,
      // nbc_focus_original_1_d: deal.nbc_focus_original_1_d,

      // nbc_focus_original_2_b: JSON.parse(deal.nbc_focus_original_2_b),
      // nbc_focus_original_2_c: `${deal.nbc_focus_original_2_c ? deal.nbc_focus_original_2_c : 19000101}`,
      // nbc_focus_original_2_d: deal.nbc_focus_original_2_d,

      // nbc_focus_original_3_b: JSON.parse(deal.nbc_focus_original_3_b),
      // nbc_focus_original_3_c: `${deal.nbc_focus_original_3_c ? deal.nbc_focus_original_3_c : 19000101}`,
      // nbc_focus_original_3_d: deal.nbc_focus_original_3_d,

      // nbc_focus_original_4_b: JSON.parse(deal.nbc_focus_original_4_b),
      // nbc_focus_original_4_c: `${deal.nbc_focus_original_4_c ? deal.nbc_focus_original_4_c : 19000101}`,
      // nbc_focus_original_4_d: deal.nbc_focus_original_4_d,

      // nbc_focus_original_5_b: JSON.parse(deal.nbc_focus_original_5_b),
      // nbc_focus_original_5_c: `${deal.nbc_focus_original_5_c ? deal.nbc_focus_original_5_c : 19000101}`,
      // nbc_focus_original_5_d: deal.nbc_focus_original_5_d,

      // nbc_focus_apprv_1_b: deal.nbc_focus_apprv_1_b,
      // nbc_focus_apprv_1_c: `${deal.nbc_focus_apprv_1_c ? deal.nbc_focus_apprv_1_c : 19000101}`,

      // nbc_focus_apprv_2_b: deal.nbc_focus_apprv_2_b,
      // nbc_focus_apprv_2_c: `${deal.nbc_focus_apprv_2_c ? deal.nbc_focus_apprv_2_c : 19000101}`,

      // nbc_focus_apprv_3_b: deal.nbc_focus_apprv_3_b,
      // nbc_focus_apprv_3_c: `${deal.nbc_focus_apprv_3_c ? deal.nbc_focus_apprv_3_c : 19000101}`,

      // nbc_focus_apprv_4_b: deal.nbc_focus_apprv_4_b,
      // nbc_focus_apprv_4_c: `${deal.nbc_focus_apprv_4_c ? deal.nbc_focus_apprv_4_c : 19000101}`,

      // nbc_focus_apprv_5_b: deal.nbc_focus_apprv_5_b,
      // nbc_focus_apprv_5_c: `${deal.nbc_focus_apprv_5_c ? deal.nbc_focus_apprv_5_c : 19000101}`,

      // PLIS data
      plis_1_b: deal.plis_1_b,
      plis_1_c: deal.plis_1_c,
      plis_1_d: `${deal.plis_1_d ? deal.plis_1_d : 19000101}`,
      plis_1_e: deal.plis_1_e,

      plis_2_b: deal.plis_2_b,
      plis_2_c: deal.plis_2_c,
      plis_2_d: `${deal.plis_2_d ? deal.plis_2_d : 19000101}`,
      plis_2_e: deal.plis_2_e,

      plis_3_b: deal.plis_3_b,
      plis_3_c: deal.plis_3_c,
      plis_3_d: `${deal.plis_3_d ? deal.plis_3_d : 19000101}`,
      plis_3_e: deal.plis_3_e,

      plis_4_b: deal.plis_4_b,
      plis_4_c: deal.plis_4_c,
      plis_4_d: `${deal.plis_4_d ? deal.plis_4_d : 19000101}`,
      plis_4_e: deal.plis_4_e,

      plis_5_b: deal.plis_5_b,
      plis_5_c: deal.plis_5_c,
      plis_5_d: `${deal.plis_5_d ? deal.plis_5_d : 19000101}`,
      plis_5_e: deal.plis_5_e,

      plis_6_b: deal.plis_6_b,
      plis_6_c: deal.plis_6_c,
      plis_6_d: `${deal.plis_6_d ? deal.plis_6_d : 19000101}`,
      plis_6_e: deal.plis_6_e,

      // other cps data
      ocps_fac_1_b: JSON.parse(deal.ocps_fac_1_b),
      ocps_fac_1_c: deal.ocps_fac_1_c,
      ocps_fac_1_d: `${deal.ocps_fac_1_d ? deal.ocps_fac_1_d : 19000101}`,
      ocps_fac_1_e: deal.ocps_fac_1_e,
      ocps_fac_1_f: deal.ocps_fac_1_f,

      ocps_fac_2_b: JSON.parse(deal.ocps_fac_2_b),
      ocps_fac_2_c: deal.ocps_fac_2_c,
      ocps_fac_2_d: `${deal.ocps_fac_2_d ? deal.ocps_fac_2_d : 19000101}`,
      ocps_fac_2_e: deal.ocps_fac_2_e,
      ocps_fac_2_f: deal.ocps_fac_2_f,

      ocps_fac_3_b: JSON.parse(deal.ocps_fac_3_b),
      ocps_fac_3_c: deal.ocps_fac_3_c,
      ocps_fac_3_d: `${deal.ocps_fac_3_d ? deal.ocps_fac_3_d : 19000101}`,
      ocps_fac_3_e: deal.ocps_fac_3_e,
      ocps_fac_3_f: deal.ocps_fac_3_f,

      ocps_fac_4_b: JSON.parse(deal.ocps_fac_4_b),
      ocps_fac_4_c: deal.ocps_fac_4_c,
      ocps_fac_4_d: `${deal.ocps_fac_4_d ? deal.ocps_fac_4_d : 19000101}`,
      ocps_fac_4_e: deal.ocps_fac_4_e,
      ocps_fac_4_f: deal.ocps_fac_4_f,

      ocps_fac_5_b: JSON.parse(deal.ocps_fac_5_b),
      ocps_fac_5_c: deal.ocps_fac_5_c,
      ocps_fac_5_d: `${deal.ocps_fac_5_d ? deal.ocps_fac_5_d : 19000101}`,
      ocps_fac_5_e: deal.ocps_fac_5_e,
      ocps_fac_5_f: deal.ocps_fac_5_f,

      ocps_fac_6_b: JSON.parse(deal.ocps_fac_6_b),
      ocps_fac_6_c: deal.ocps_fac_6_c,
      ocps_fac_6_d: `${deal.ocps_fac_6_d ? deal.ocps_fac_6_d : 19000101}`,
      ocps_fac_6_e: deal.ocps_fac_6_e,
      ocps_fac_6_f: deal.ocps_fac_6_f,

      ocps_fac_7_b: JSON.parse(deal.ocps_fac_7_b),
      ocps_fac_7_c: deal.ocps_fac_7_c,
      ocps_fac_7_d: `${deal.ocps_fac_7_d ? deal.ocps_fac_7_d : 19000101}`,
      ocps_fac_7_e: deal.ocps_fac_7_e,
      ocps_fac_7_f: deal.ocps_fac_7_f,

      ocps_fac_8_b: JSON.parse(deal.ocps_fac_8_b),
      ocps_fac_8_c: deal.ocps_fac_8_c,
      ocps_fac_8_d: `${deal.ocps_fac_8_d ? deal.ocps_fac_8_d : 19000101}`,
      ocps_fac_8_e: deal.ocps_fac_8_e,
      ocps_fac_8_f: deal.ocps_fac_8_f,

      ocps_fac_9_b: JSON.parse(deal.ocps_fac_9_b),
      ocps_fac_9_c: deal.ocps_fac_9_c,
      ocps_fac_9_d: `${deal.ocps_fac_9_d ? deal.ocps_fac_9_d : 19000101}`,
      ocps_fac_9_e: deal.ocps_fac_9_e,
      ocps_fac_9_f: deal.ocps_fac_9_f,

      ocps_fac_10_b: JSON.parse(deal.ocps_fac_10_b),
      ocps_fac_10_c: deal.ocps_fac_10_c,
      ocps_fac_10_d: `${deal.ocps_fac_10_d ? deal.ocps_fac_10_d : 19000101}`,
      ocps_fac_10_e: deal.ocps_fac_10_e,
      ocps_fac_10_f: deal.ocps_fac_10_f,

      ocps_fac_11_b: JSON.parse(deal.ocps_fac_11_b),
      ocps_fac_11_c: deal.ocps_fac_11_c,
      ocps_fac_11_d: `${deal.ocps_fac_11_d ? deal.ocps_fac_11_d : 19000101}`,
      ocps_fac_11_e: deal.ocps_fac_11_e,
      ocps_fac_11_f: deal.ocps_fac_11_f,

      ocps_fac_12_b: JSON.parse(deal.ocps_fac_12_b),
      ocps_fac_12_c: deal.ocps_fac_12_c,
      ocps_fac_12_d: `${deal.ocps_fac_12_d ? deal.ocps_fac_12_d : 19000101}`,
      ocps_fac_12_e: deal.ocps_fac_12_e,
      ocps_fac_12_f: deal.ocps_fac_12_f,

      ocps_fac_13_b: JSON.parse(deal.ocps_fac_13_b),
      ocps_fac_13_c: deal.ocps_fac_13_c,
      ocps_fac_13_d: `${deal.ocps_fac_13_d ? deal.ocps_fac_13_d : 19000101}`,
      ocps_fac_13_e: deal.ocps_fac_13_e,
      ocps_fac_13_f: deal.ocps_fac_13_f,

      ocps_fac_14_b: JSON.parse(deal.ocps_fac_14_b),
      ocps_fac_14_c: deal.ocps_fac_14_c,
      ocps_fac_14_d: `${deal.ocps_fac_14_d ? deal.ocps_fac_14_d : 19000101}`,
      ocps_fac_14_e: deal.ocps_fac_14_e,
      ocps_fac_14_f: deal.ocps_fac_14_f,

      ocps_fac_15_b: JSON.parse(deal.ocps_fac_15_b),
      ocps_fac_15_c: deal.ocps_fac_15_c,
      ocps_fac_15_d: `${deal.ocps_fac_15_d ? deal.ocps_fac_15_d : 19000101}`,
      ocps_fac_15_e: deal.ocps_fac_15_e,
      ocps_fac_15_f: deal.ocps_fac_15_f,

      ocps_fac_16_b: JSON.parse(deal.ocps_fac_16_b),
      ocps_fac_16_c: deal.ocps_fac_16_c,
      ocps_fac_16_d: `${deal.ocps_fac_16_d ? deal.ocps_fac_16_d : 19000101}`,
      ocps_fac_16_e: deal.ocps_fac_16_e,
      ocps_fac_16_f: deal.ocps_fac_16_f,

      ocps_fac_17_b: JSON.parse(deal.ocps_fac_17_b),
      ocps_fac_17_c: deal.ocps_fac_17_c,
      ocps_fac_17_d: `${deal.ocps_fac_17_d ? deal.ocps_fac_17_d : 19000101}`,
      ocps_fac_17_e: deal.ocps_fac_17_e,
      ocps_fac_17_f: deal.ocps_fac_17_f,

      ocps_fac_18_b: JSON.parse(deal.ocps_fac_18_b),
      ocps_fac_18_c: deal.ocps_fac_18_c,
      ocps_fac_18_d: `${deal.ocps_fac_18_d ? deal.ocps_fac_18_d : 19000101}`,
      ocps_fac_18_e: deal.ocps_fac_18_e,
      ocps_fac_18_f: deal.ocps_fac_18_f,

      ocps_fac_19_b: JSON.parse(deal.ocps_fac_19_b),
      ocps_fac_19_c: deal.ocps_fac_19_c,
      ocps_fac_19_d: `${deal.ocps_fac_19_d ? deal.ocps_fac_19_d : 19000101}`,
      ocps_fac_19_e: deal.ocps_fac_19_e,
      ocps_fac_19_f: deal.ocps_fac_19_f,

      ocps_fac_20_b: JSON.parse(deal.ocps_fac_20_b),
      ocps_fac_20_c: deal.ocps_fac_20_c,
      ocps_fac_20_d: `${deal.ocps_fac_20_d ? deal.ocps_fac_20_d : 19000101}`,
      ocps_fac_20_e: deal.ocps_fac_20_e,
      ocps_fac_20_f: deal.ocps_fac_20_f,

      // Key Performance Indicator
      key_deal_fac_1_b: JSON.parse(deal.key_deal_fac_1_b), //B//oolean,
      key_deal_fac_1_c: deal.key_deal_fac_1_c, //V//ARCHAR,
      key_deal_fac_1_d: `${
        deal.key_deal_fac_1_d ? deal.key_deal_fac_1_d : 19000101
      }`, //D//ATE,
      key_deal_fac_1_e: deal.key_deal_fac_1_e, //V//ARCHAR,
      key_deal_fac_1_f: deal.key_deal_fac_1_f, //V//ARCHAR,
      key_deal_fac_2_b: JSON.parse(deal.key_deal_fac_2_b), //B//oolean,
      key_deal_fac_2_c: deal.key_deal_fac_2_c, //V//ARCHAR,
      key_deal_fac_2_d: `${
        deal.key_deal_fac_2_d ? deal.key_deal_fac_2_d : 19000101
      }`, //D//ATE,
      key_deal_fac_2_e: deal.key_deal_fac_2_e, //V//ARCHAR,
      key_deal_fac_2_f: deal.key_deal_fac_2_f, //V//ARCHAR,
      key_deal_fac_3_b: JSON.parse(deal.key_deal_fac_3_b), //B//oolean,
      key_deal_fac_3_c: deal.key_deal_fac_3_c, //V//ARCHAR,
      key_deal_fac_3_d: `${
        deal.key_deal_fac_3_d ? deal.key_deal_fac_3_d : 19000101
      }`, //D//ATE,
      key_deal_fac_3_e: deal.key_deal_fac_3_e, //V//ARCHAR,
      key_deal_fac_3_f: deal.key_deal_fac_3_f, //V//ARCHAR,
      key_deal_fac_4_b: JSON.parse(deal.key_deal_fac_4_b), //B//oolean,
      key_deal_fac_4_c: deal.key_deal_fac_4_c, //V//ARCHAR,
      key_deal_fac_4_d: `${
        deal.key_deal_fac_4_d ? deal.key_deal_fac_4_d : 19000101
      }`, //D//ATE,
      key_deal_fac_4_e: deal.key_deal_fac_4_e, //V//ARCHAR,
      key_deal_fac_4_f: deal.key_deal_fac_4_f, //V//ARCHAR,
      key_deal_fac_5_b: JSON.parse(deal.key_deal_fac_5_b), //B//oolean,
      key_deal_fac_5_c: deal.key_deal_fac_5_c, //V//ARCHAR,
      key_deal_fac_5_d: `${
        deal.key_deal_fac_5_d ? deal.key_deal_fac_5_d : 19000101
      }`, //D//ATE,
      key_deal_fac_5_e: deal.key_deal_fac_5_e, //V//ARCHAR,
      key_deal_fac_5_f: deal.key_deal_fac_5_f, //V//ARCHAR,
      key_deal_fac_6_b: JSON.parse(deal.key_deal_fac_6_b), //B//oolean,
      key_deal_fac_6_c: deal.key_deal_fac_6_c, //V//ARCHAR,
      key_deal_fac_6_d: `${
        deal.key_deal_fac_6_d ? deal.key_deal_fac_6_d : 19000101
      }`, //D//ATE,
      key_deal_fac_6_e: deal.key_deal_fac_6_e, //V//ARCHAR,
      key_deal_fac_6_f: deal.key_deal_fac_6_f, //V//ARCHAR,
      key_deal_fac_7_b: JSON.parse(deal.key_deal_fac_7_b), //B//oolean,
      key_deal_fac_7_c: deal.key_deal_fac_7_c, //V//ARCHAR,
      key_deal_fac_7_d: `${
        deal.key_deal_fac_7_d ? deal.key_deal_fac_7_d : 19000101
      }`, //D//ATE,
      key_deal_fac_7_e: deal.key_deal_fac_7_e, //V//ARCHAR,
      key_deal_fac_7_f: deal.key_deal_fac_7_f, //V//ARCHAR,
      key_deal_fac_8_b: JSON.parse(deal.key_deal_fac_8_b), //B//oolean,
      key_deal_fac_8_c: deal.key_deal_fac_8_c, //V//ARCHAR,
      key_deal_fac_8_d: `${
        deal.key_deal_fac_8_d ? deal.key_deal_fac_8_d : 19000101
      }`, //D//ATE,
      key_deal_fac_8_e: deal.key_deal_fac_8_e, //V//ARCHAR,
      key_deal_fac_8_f: deal.key_deal_fac_8_f, //V//ARCHAR,
      key_deal_fac_9_b: JSON.parse(deal.key_deal_fac_9_b), //B//oolean,
      key_deal_fac_9_c: deal.key_deal_fac_9_c, //V//ARCHAR,
      key_deal_fac_9_d: `${
        deal.key_deal_fac_9_d ? deal.key_deal_fac_9_d : 19000101
      }`, //D//ATE,
      key_deal_fac_9_e: deal.key_deal_fac_9_e, //V//ARCHAR,
      key_deal_fac_9_f: deal.key_deal_fac_9_f, //V//ARCHAR,
      key_deal_fac_10_b: JSON.parse(deal.key_deal_fac_10_b), //Boolean,
      key_deal_fac_10_c: deal.key_deal_fac_10_c, //VARCHAR,
      key_deal_fac_10_d: `${
        deal.key_deal_fac_10_d ? deal.key_deal_fac_10_d : 19000101
      }`, //DATE,
      key_deal_fac_10_e: deal.key_deal_fac_10_e, //VARCHAR,
      key_deal_fac_10_f: deal.key_deal_fac_10_f, //VARCHAR,
      key_deal_fac_11_b: JSON.parse(deal.key_deal_fac_11_b), //Boolean,
      key_deal_fac_11_c: deal.key_deal_fac_11_c, //VARCHAR,
      key_deal_fac_11_d: `${
        deal.key_deal_fac_11_d ? deal.key_deal_fac_11_d : 19000101
      }`, //DATE,
      key_deal_fac_11_e: deal.key_deal_fac_11_e, //VARCHAR,
      key_deal_fac_11_f: deal.key_deal_fac_11_f, //VARCHAR,
      key_deal_fac_12_b: JSON.parse(deal.key_deal_fac_12_b), //Boolean,
      key_deal_fac_12_c: deal.key_deal_fac_12_c, //VARCHAR,
      key_deal_fac_12_d: `${
        deal.key_deal_fac_12_d ? deal.key_deal_fac_12_d : 19000101
      }`, //DATE,
      key_deal_fac_12_e: deal.key_deal_fac_12_e, //VARCHAR,
      key_deal_fac_12_f: deal.key_deal_fac_12_f, //VARCHAR,
      key_deal_fac_13_b: JSON.parse(deal.key_deal_fac_13_b), //Boolean,
      key_deal_fac_13_c: deal.key_deal_fac_13_c, //VARCHAR,
      key_deal_fac_13_d: `${
        deal.key_deal_fac_13_d ? deal.key_deal_fac_13_d : 19000101
      }`, //DATE,
      key_deal_fac_13_e: deal.key_deal_fac_13_e, //VARCHAR,
      key_deal_fac_13_f: deal.key_deal_fac_13_f, //VARCHAR,
      key_deal_fac_14_b: JSON.parse(deal.key_deal_fac_14_b), //Boolean,
      key_deal_fac_14_c: deal.key_deal_fac_14_c, //VARCHAR,
      key_deal_fac_14_d: `${
        deal.key_deal_fac_14_d ? deal.key_deal_fac_14_d : 19000101
      }`, //DATE,
      key_deal_fac_14_e: deal.key_deal_fac_14_e, //VARCHAR,
      key_deal_fac_14_f: deal.key_deal_fac_14_f, //VARCHAR,
      key_deal_fac_15_b: JSON.parse(deal.key_deal_fac_15_b), //Boolean,
      key_deal_fac_15_c: deal.key_deal_fac_15_c, //VARCHAR,
      key_deal_fac_15_d: `${
        deal.key_deal_fac_15_d ? deal.key_deal_fac_15_d : 19000101
      }`, //DATE,
      key_deal_fac_15_e: deal.key_deal_fac_15_e, //VARCHAR,
      key_deal_fac_15_f: deal.key_deal_fac_15_f, //VARCHAR,
      key_deal_fac_16_b: JSON.parse(deal.key_deal_fac_16_b), //Boolean,
      key_deal_fac_16_c: `${
        deal.key_deal_fac_16_c ? deal.key_deal_fac_16_c : 19000101
      }`, //DATE,
      key_deal_fac_17_b: JSON.parse(deal.key_deal_fac_17_b), //Boolean,
      key_deal_fac_17_c: `${
        deal.key_deal_fac_17_c ? deal.key_deal_fac_17_c : 19000101
      }`, //DATE,
      key_deal_fac_18_b: JSON.parse(deal.key_deal_fac_18_b), //Boolean,
      key_deal_fac_18_c: `${
        deal.key_deal_fac_18_c ? deal.key_deal_fac_18_c : 19000101
      }`, //DATE,
      key_deal_fac_19_b: JSON.parse(deal.key_deal_fac_19_b), //Boolean,
      key_deal_fac_19_c: `${
        deal.key_deal_fac_19_c ? deal.key_deal_fac_19_c : 19000101
      }`, //DATE,
      key_deal_fac_20_b: JSON.parse(deal.key_deal_fac_20_b), //Boolean,
      key_deal_fac_20_c: `${
        deal.key_deal_fac_20_c ? deal.key_deal_fac_20_c : 19000101
      }`, //DATE,
      key_deal_fac_21_b: JSON.parse(deal.key_deal_fac_21_b), //Boolean,
      key_deal_fac_21_c: `${
        deal.key_deal_fac_21_c ? deal.key_deal_fac_21_c : 19000101
      }`, //DATE,
      key_deal_fac_22_b: JSON.parse(deal.key_deal_fac_22_b), //Boolean,
      key_deal_fac_22_c: `${
        deal.key_deal_fac_22_c ? deal.key_deal_fac_22_c : 19000101
      }`, //DATE,
      key_deal_fac_23_b: JSON.parse(deal.key_deal_fac_23_b), //Boolean,
      key_deal_fac_23_c: `${
        deal.key_deal_fac_23_c ? deal.key_deal_fac_23_c : 19000101
      }`, //DATE
    };

    // ******************************************  Axios : Post Request ****************************************

    Services.createDeal(data)
      .then((res) => {
        setResponse(res.data.message);
        setSubmitted(true);
      })
      .catch((error) => {
        setResponse("Failed to Create Deal. Please Fill all required fields");
        setSubmitted(false);
      });
  };

  const newDeal = () => {
    setDeal(initialDealState);
    setNoteList([{ note: "" }]);
    setNbcFocus([{ label: "", concern: "", date: "", methodology: "" }]);
    setKeyPerformanceI([{ label: "", concern: "", date: "", methodology: "" }]);
    // setDealTracking()
    setSubmitted(false);
    setActiveTab("first");
    setResponse("");
  };

  // ******************************************  End Axios Call  ****************************************

  // console.log(nbcFocus)
  return (
    <React.Fragment>
      {/* ---------------------- New Transaction Forms ----------- */}
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
            <Form ref={form}>
              <PWrapper>
                <h5 className="py-3 text-secondary">New Transaction</h5>
              </PWrapper>
              <br />

              <div>
                <Tabs
                  //activeKey={activeTab}
                  onSelect={(k) => handleTabChange}
                  style={{ fontSize: "12px" }}
                >
                  <Tab eventKey="first" title="CLIENT">
                    <Container1>
                      <br />
                      <Row>
                        <Col sm={6}>
                          <Fm.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Fm.Label>
                              Client Name{" "}
                              <span style={{ color: "red" }}>*</span>
                            </Fm.Label>
                            <Input
                              type="text"
                              value={deal.clientName}
                              onChange={handleInputChange}
                              name="clientName"
                              validations={[required]}
                              style={{
                                width: "100%",
                                padding: "4px 2px",
                                focus: "none",
                              }}
                            />
                          </Fm.Group>
                        </Col>

                        <Col sm={6}>
                          <Fm.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Fm.Label>
                              Originator <span style={{ color: "red" }}>*</span>
                            </Fm.Label>
                            <Select
                              size="sm"
                              type="text"
                              value={deal.originator}
                              onChange={handleInputChange}
                              name="originator"
                              style={{
                                width: "100%",
                                padding: "4px 2px",
                                focus: "none",
                              }}
                              validations={[required]}
                            >
                              <option></option>
                              {staffList.map((opt, i) => (
                                <option
                                  key={staffList[i].email}
                                  value={staffList[i].stafflist}
                                >
                                  {staffList[i].stafflist}
                                </option>
                              ))}
                            </Select>
                          </Fm.Group>
                        </Col>

                        <Col sm={6}>
                          <Fm.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Fm.Label>
                              Transactor <span style={{ color: "red" }}>*</span>
                            </Fm.Label>
                            <Select
                              size="sm"
                              type="text"
                              value={deal.transactor}
                              onChange={handleInputChange}
                              name="transactor"
                              style={{
                                width: "100%",
                                padding: "4px 2px",
                                focus: "none",
                              }}
                              validations={[required]}
                            >
                              <option></option>
                              {staffList.map((opt, i) => (
                                <option
                                  key={staffList[i].email}
                                  value={staffList[i].stafflist}
                                >
                                  {staffList[i].stafflist}
                                </option>
                              ))}
                            </Select>
                          </Fm.Group>
                        </Col>

                        <Col sm={6}>
                          <Fm.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Fm.Label>
                              Transactor Legal Lead{" "}
                              <span style={{ color: "red" }}>*</span>
                            </Fm.Label>
                            <Select
                              size="sm"
                              type="text"
                              value={deal.transactionLegalLead}
                              onChange={handleInputChange}
                              name="transactionLegalLead"
                              style={{
                                width: "100%",
                                padding: "4px 2px",
                                focus: "none",
                              }}
                              validations={[required]}
                            >
                              <option></option>
                              {staffList.map((opt, i) => (
                                <option
                                  key={staffList[i].email}
                                  value={staffList[i].stafflist}
                                >
                                  {staffList[i].stafflist}
                                </option>
                              ))}
                            </Select>
                          </Fm.Group>
                        </Col>

                        <Col sm={12}>
                          <Fm.Group className="mb-0 mt-1 pt-1 pb-1">
                            <Fm.Label>Note</Fm.Label>{" "}
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
                            {noteList.map((singleNote, index) => (
                              <div class="input-group">
                                <Fm.Control
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
                                  onClick={handleNoteRemove}
                                >
                                  x
                                </button>
                              </div>
                            ))}
                          </Fm.Group>
                        </Col>
                      </Row>
                      <br />
                      <br />

                      {/* <button
                        onClick={(e) => toNextTab(e)}
                        style={{
                          display: "inlineBlock",
                          fontSize: "13px",
                          padding: "2px 20px",
                          margin: "10px",
                          background: "green",
                          color: "white",
                          borderRadius: "3px",
                        }}
                      >
                        Next{" "}
                      </button> */}
                    </Container1>
                  </Tab>

                  <Tab eventKey="second" title="DEAL PROFILE ">
                    <Container1>
                      <div className="mt-2">
                        <Row>
                          <Col sm={6} className="my-0 py-0">
                            <Fm.Group className="">
                              <Fm.Label>
                                Industry <span style={{ color: "red" }}>*</span>
                              </Fm.Label>
                              <Select
                                size="sm"
                                name="industry"
                                value={deal.industry}
                                onChange={handleInputChange}
                                validations={[required]}
                                style={{
                                  width: "100%",
                                  padding: "6px 1px",
                                  focus: "none",
                                }}
                              >
                                <option>Select</option>
                                {industry.map((opt, i) => (
                                  <option
                                    key={industry[i].industryid}
                                    value={industry[i].industry}
                                  >
                                    {industry[i].industry}
                                  </option>
                                ))}
                              </Select>
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="">
                              <Fm.Label>
                                Products <span style={{ color: "red" }}>*</span>
                              </Fm.Label>
                              <Select
                                size="sm"
                                name="product"
                                value={deal.product}
                                onChange={handleInputChange}
                                validations={[required]}
                                style={{
                                  width: "100%",
                                  padding: "6px 1px",
                                  focus: "none",
                                }}
                              >
                                <option>Select</option>
                                {product.map((opt, i) => (
                                  <option
                                    key={product[i].productid}
                                    value={product[i].product}
                                  >
                                    {product[i].product}
                                  </option>
                                ))}
                              </Select>
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="">
                              <Fm.Label>
                                Region <span style={{ color: "red" }}>*</span>
                              </Fm.Label>
                              <Select
                                size="sm"
                                name="region"
                                value={deal.region}
                                onChange={handleInputChange}
                                validations={[required]}
                                style={{
                                  width: "100%",
                                  padding: "6px 1px",
                                  focus: "none",
                                }}
                              >
                                <option>Select</option>
                                {region.map((opt, i) => (
                                  <option
                                    key={region[i].regionid}
                                    value={region[i].region}
                                  >
                                    {region[i].region}
                                  </option>
                                ))}
                              </Select>
                            </Fm.Group>
                          </Col>
                        </Row>

                        <Row className="mt-1">
                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>
                                Deal Size (₦'BN){" "}
                                <span style={{ color: "red" }}>*</span>
                              </Fm.Label>
                              <Input
                                size="sm"
                                type="number"
                                value={deal.dealSize}
                                onChange={handleInputChange}
                                name="dealSize"
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                                validations={[required]}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>Coupon(%)</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="number"
                                value={deal.coupon}
                                onChange={handleInputChange}
                                name="coupon"
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>Tenor(yrs)</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="number"
                                value={deal.tenor}
                                onChange={handleInputChange}
                                name="tenor"
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>Moratorium(yrs)</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="number"
                                value={deal.moratorium}
                                onChange={handleInputChange}
                                name="moratorium"
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>
                        </Row>

                        <Row className="mt-1 pt-3">
                          <Col sm={6}>
                            <Fm.Group className="">
                              <Fm.Label>Repayment Frequency</Fm.Label>
                              <Select
                                size="sm"
                                name="repaymentFrequency"
                                value={deal.repaymentFrequency}
                                onChange={handleInputChange}
                                style={{
                                  width: "100%",
                                  padding: "6px 1px",
                                  focus: "none",
                                }}
                              >
                                <option>Select</option>
                                {frequency.map((opt, i) => (
                                  <option
                                    key={frequency[i].id}
                                    value={frequency[i].frequency}
                                  >
                                    {frequency[i].frequency}
                                  </option>
                                ))}
                              </Select>
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="">
                              <Fm.Label>Amortization Style</Fm.Label>
                              <Select
                                size="sm"
                                name="amortizationStyle"
                                value={deal.amortizationStyle}
                                onChange={handleInputChange}
                                style={{
                                  width: "100%",
                                  padding: "6px 1px",
                                  focus: "none",
                                }}
                              >
                                <option>Select</option>
                                {style.map((opt, i) => (
                                  <option
                                    key={style[i].id}
                                    value={style[i].amortizationstyle}
                                  >
                                    {style[i].amortizationstyle}
                                  </option>
                                ))}
                              </Select>
                            </Fm.Group>
                          </Col>
                        </Row>

                        <Row className="mt-1 pt-3">
                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>
                                Mandate Letter{" "}
                                <span style={{ color: "red" }}>*</span>
                              </Fm.Label>
                              <Input
                                size="sm"
                                type="date"
                                value={deal.mandateLetter}
                                onChange={handleInputChange}
                                name="mandateLetter"
                                style={{
                                  width: "100%",
                                  padding: "6px 1px",
                                  focus: "none",
                                }}
                                validations={[required]}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>
                                Credit Approval{" "}
                                <span style={{ color: "red" }}>*</span>
                              </Fm.Label>
                              <Input
                                size="sm"
                                type="date"
                                value={deal.creditApproval}
                                onChange={handleInputChange}
                                name="creditApproval"
                                style={{
                                  width: "100%",
                                  padding: "6px 1px",
                                  focus: "none",
                                }}
                                validations={[required]}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>Fee Letter</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="date"
                                value={deal.feeLetter}
                                onChange={handleInputChange}
                                name="feeLetter"
                                style={{
                                  width: "100%",
                                  padding: "6px 1px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>Expected Close</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="date"
                                value={deal.expectedClose}
                                onChange={handleInputChange}
                                name="expectedClose"
                                style={{
                                  width: "100%",
                                  padding: "6px 1px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>Actual Close</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="date"
                                value={deal.actualClose}
                                onChange={handleInputChange}
                                name="actualClose"
                                style={{
                                  width: "100%",
                                  padding: "6px 1px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>NBC Approval</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="date"
                                value={deal.nbc_approval_date}
                                onChange={handleInputChange}
                                name="nbc_approval_date"
                                style={{
                                  width: "100%",
                                  padding: "6px 1px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6}>
                            <Fm.Group className="pt-1">
                              <Fm.Label>NBC Submission</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="date"
                                value={deal.nbc_submitted_date}
                                onChange={handleInputChange}
                                name="nbc_submitted_date"
                                style={{
                                  width: "100%",
                                  padding: "6px 1px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>
                        </Row>
                      </div>
                      <br />
                      <br />
                      {/* <button
                        onClick={(e) => toPrevTab(e)}
                        style={{
                          display: "inlineblock",
                          fontSize: "13px",
                          padding: "2px 20px",
                          margin: "10px",
                          background: "green",
                          color: "white",
                          borderRadius: "3px",
                        }}
                      >
                        {" "}
                        Prev
                      </button>
                      <button */}
                      {/* onClick={(e) => toNextTab(e)} */}
                      {/* style={{
                          display: "inlineblock",
                          fontSize: "13px",
                          padding: "2px 20px",
                          margin: "10px",
                          background: "green",
                          color: "white",
                          borderRadius: "3px",
                        }}
                      >
                        Next
                      </button> */}
                    </Container1>
                    <br />
                    <br />
                  </Tab>

                  <Tab eventKey="third" title="FEES">
                    <br />
                    <br />
                    <Container1>
                      <div className="mt-2">
                        <Row>
                          <Col sm={6} className="my-0 py-0">
                            <Fm.Group>
                              <Fm.Label>Amount (₦'MN)</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="number"
                                value={deal.structuringFeeAmount}
                                onChange={handleInputChange}
                                name="structuringFeeAmount"
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6} className="my-0 py-0">
                            <Fm.Group>
                              <Fm.Label>Advance(%)</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="number"
                                value={deal.structuringFeeAdvance}
                                onChange={handleInputChange}
                                name="structuringFeeAdvance"
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6} className="my-0 py-0">
                            <Fm.Group className="pt-1">
                              <Fm.Label>Final(%)</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="number"
                                value={deal.structuringFeeFinal}
                                onChange={handleInputChange}
                                name="structuringFeeFinal"
                                placeholder={
                                  deal.structuringFeeAmount &&
                                  deal.structuringFeeAdvance
                                    ? `${(
                                        (deal.structuringFeeAmount /
                                          deal.structuringFeeAdvance) *
                                        100
                                      ).toFixed(1)}`
                                    : 0
                                }
                                disabled
                                style={{
                                  width: "100%",
                                  padding: "4px 1px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6} className="my-0 py-0">
                            <Fm.Group className="pt-1">
                              <Fm.Label>Guarantee (%)</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="number"
                                value={deal.guaranteeFee}
                                onChange={handleInputChange}
                                name="guaranteeFee"
                                style={{
                                  width: "100%",
                                  padding: "4px 2px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6} className="my-0 py-0">
                            <Fm.Group className="pt-1">
                              <Fm.Label>Monitoring(₦'MN)</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="number"
                                value={deal.monitoringFee}
                                onChange={handleInputChange}
                                name="monitoringFee"
                                style={{
                                  width: "100%",
                                  padding: "4px 2px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>

                          <Col sm={6} className="my-0 py-0">
                            <Fm.Group className="pt-1">
                              <Fm.Label>Reimbursible(₦'MN)</Fm.Label>
                              <Fm.Control
                                size="sm"
                                type="number"
                                value={deal.reimbursible}
                                onChange={handleInputChange}
                                name="reimbursible"
                                style={{
                                  width: "100%",
                                  padding: "4px 2px",
                                  focus: "none",
                                }}
                              />
                            </Fm.Group>
                          </Col>
                        </Row>
                      </div>
                      <br />
                      <br />
                      {/* <button
                        onClick={(e) => toPrevTab(e)}
                        style={{
                          display: "inlineblock",
                          fontSize: "13px",
                          padding: "2px 20px",
                          margin: "10px",
                          background: "green",
                          color: "white",
                          borderRadius: "3px",
                        }}
                      >
                        {" "}
                        Prev
                      </button> */}
                      {/* <button
                        onClick={(e) => toNextTab(e)}
                        style={{
                          display: "inlineblock",
                          fontSize: "13px",
                          padding: "2px 20px",
                          margin: "10px",
                          background: "green",
                          color: "white",
                          borderRadius: "3px",
                        }}
                      >
                        Next
                      </button> */}
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
                      <div className="pb-2">
                        <Row>
                          <Col sm={12}>
                            <Col className="mb-3">
                              <Fm.Group>
                                <Row>
                                  <Col sm={6}>
                                    <Fm.Label style={{ paddingRight: "1rem" }}>
                                      Mandate Letter signed:
                                    </Fm.Label>
                                  </Col>
                                  <Col sm={6}>
                                    <Fm.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      name="redA"
                                      value={true}
                                      onChange={handleInputChange}
                                    />
                                    <Fm.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      name="redA"
                                      value={false}
                                      onChange={handleInputChange}
                                      defaultChecked
                                    />
                                  </Col>
                                </Row>
                              </Fm.Group>
                            </Col>

                            <Col className="mb-3">
                              <Fm.Group>
                                <Row>
                                  <Col sm={6}>
                                    <Fm.Label style={{ paddingRight: "1rem" }}>
                                      Due dilligence ongoing:
                                    </Fm.Label>
                                  </Col>
                                  <Col sm={6}>
                                    <Fm.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      name="redB"
                                      value={true}
                                      onChange={handleInputChange}
                                    />
                                    <Fm.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      name="redB"
                                      value={false}
                                      onChange={handleInputChange}
                                      defaultChecked
                                    />
                                  </Col>
                                </Row>
                              </Fm.Group>
                            </Col>

                            <Col>
                              <Fm.Group>
                                <Row>
                                  <Col sm={6}>
                                    <Fm.Label style={{ paddingRight: "1rem" }}>
                                      Pending Credit Committee approval:
                                    </Fm.Label>
                                  </Col>

                                  <Col sm={6}>
                                    <Fm.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      name="redC"
                                      value={true}
                                      onChange={handleInputChange}
                                    />
                                    <Fm.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      name="redC"
                                      value={false}
                                      onChange={handleInputChange}
                                      defaultChecked
                                    />
                                  </Col>
                                </Row>
                              </Fm.Group>
                            </Col>
                          </Col>
                        </Row>
                      </div>
                      <br />
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
                            <Col sm={12}>
                              <Col className="pb-3">
                                <Fm.Group>
                                  <Row>
                                    <Col sm={6}>
                                      <Fm.Label
                                        style={{ paddingRight: "1rem" }}
                                      >
                                        Mandate Letter signed:
                                      </Fm.Label>
                                    </Col>
                                    <Col sm={6}>
                                      <Fm.Check
                                        inline
                                        label="Yes"
                                        type="radio"
                                        name="amberA"
                                        value={true}
                                        onChange={handleInputChange}
                                      />
                                      <Fm.Check
                                        inline
                                        label="No"
                                        type="radio"
                                        name="amberA"
                                        value={false}
                                        onChange={handleInputChange}
                                        defaultChecked
                                      />
                                    </Col>
                                  </Row>
                                </Fm.Group>
                              </Col>

                              <Col className="pb-3">
                                <Fm.Group>
                                  <Row>
                                    <Col sm={6}>
                                      <Fm.Label
                                        style={{ paddingRight: "1rem" }}
                                      >
                                        Transaction has obtained Credit Committe
                                        approval:
                                      </Fm.Label>
                                    </Col>
                                    <Col sm={6}>
                                      <Fm.Check
                                        inline
                                        label="Yes"
                                        type="radio"
                                        name="amberB"
                                        value={true}
                                        onChange={handleInputChange}
                                      />
                                      <Fm.Check
                                        inline
                                        label="No"
                                        type="radio"
                                        name="amberB"
                                        value={false}
                                        onChange={handleInputChange}
                                        defaultChecked
                                      />
                                    </Col>
                                  </Row>
                                </Fm.Group>
                              </Col>

                              <Col className="pb-3">
                                <Fm.Group>
                                  <Row>
                                    <Col sm={6}>
                                      <Fm.Label
                                        style={{ paddingRight: "1rem" }}
                                      >
                                        Professional Parties to the Bond issue
                                        appointed or selected:
                                      </Fm.Label>
                                    </Col>
                                    <Col sm={6}>
                                      <Fm.Check
                                        inline
                                        label="Yes"
                                        type="radio"
                                        name="amberC"
                                        value={true}
                                        onChange={handleInputChange}
                                      />
                                      <Fm.Check
                                        inline
                                        label="No"
                                        type="radio"
                                        name="amberC"
                                        value={false}
                                        onChange={handleInputChange}
                                        defaultChecked
                                      />
                                    </Col>
                                  </Row>
                                </Fm.Group>
                              </Col>
                            </Col>
                          </Row>
                        </div>

                        <Col className="pb-3">
                          <Fm.Group>
                            <Row>
                              <Col sm={6}>
                                <Fm.Label style={{ paddingRight: "1rem" }}>
                                  Fee Letter and/or Guarantee Documentation
                                  expected to be negotiated and/or signed within
                                  8 weeks:
                                </Fm.Label>
                              </Col>

                              <Col sm={6}>
                                <Fm.Check
                                  inline
                                  label="Yes"
                                  type="radio"
                                  name="amberD"
                                  value={true}
                                  onChange={handleInputChange}
                                />
                                <Fm.Check
                                  inline
                                  label="No"
                                  type="radio"
                                  name="amberD"
                                  value={false}
                                  onChange={handleInputChange}
                                  defaultChecked
                                />
                              </Col>
                            </Row>
                          </Fm.Group>
                        </Col>

                        <Col className="pb-2">
                          <Fm.Group>
                            <Row>
                              <Col sm={6}>
                                <Fm.Label style={{ paddingRight: "1rem" }}>
                                  All Materials CPs with timelines for
                                  completion agreed with the client:
                                </Fm.Label>
                              </Col>
                              <Col sm={6}>
                                <Fm.Check
                                  inline
                                  label="Yes"
                                  type="radio"
                                  name="amberE"
                                  value={true}
                                  onChange={handleInputChange}
                                />
                                <Fm.Check
                                  inline
                                  label="No"
                                  type="radio"
                                  name="amberE"
                                  value={false}
                                  onChange={handleInputChange}
                                  defaultChecked
                                />
                              </Col>
                            </Row>
                          </Fm.Group>
                        </Col>
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
                        <div>
                          <Row>
                            <Col sm={12}>
                              <Col className="pb-2">
                                <Fm.Group>
                                  <Row>
                                    <Col sm={6}>
                                      <Fm.Label
                                        style={{ paddingRight: "1rem" }}
                                      >
                                        Transaction has obtained Credit
                                        Committee approval:
                                      </Fm.Label>
                                    </Col>
                                    <Col sm={6}>
                                      <Fm.Check
                                        inline
                                        label="Yes"
                                        type="radio"
                                        name="greenA"
                                        value={true}
                                        onChange={handleInputChange}
                                      />
                                      <Fm.Check
                                        inline
                                        label="No"
                                        type="radio"
                                        name="greenA"
                                        value={false}
                                        onChange={handleInputChange}
                                        defaultChecked
                                      />
                                    </Col>
                                  </Row>
                                </Fm.Group>
                              </Col>

                              <Col className="pb-2">
                                <Fm.Group>
                                  <Row>
                                    <Col sm={6}>
                                      <Fm.Label
                                        style={{ paddingRight: "1rem" }}
                                      >
                                        Guarantee Document in agreed form:
                                      </Fm.Label>
                                    </Col>
                                    <Col sm={6}>
                                      <Fm.Check
                                        inline
                                        label="Yes"
                                        type="radio"
                                        name="greenB"
                                        value={true}
                                        onChange={handleInputChange}
                                      />
                                      <Fm.Check
                                        inline
                                        label="No"
                                        type="radio"
                                        name="greenB"
                                        value={false}
                                        onChange={handleInputChange}
                                        defaultChecked
                                      />
                                    </Col>
                                  </Row>
                                </Fm.Group>
                              </Col>

                              <Col className="pb-2">
                                <Fm.Group>
                                  <Row>
                                    <Col sm={6}>
                                      <Fm.Label
                                        style={{ paddingRight: "1rem" }}
                                      >
                                        Professional Parties to the Bond Issue
                                        appointed or selected:
                                      </Fm.Label>
                                    </Col>
                                    <Col sm={6}>
                                      <Fm.Check
                                        inline
                                        label="Yes"
                                        type="radio"
                                        name="greenC"
                                        value={true}
                                        onChange={handleInputChange}
                                      />
                                      <Fm.Check
                                        inline
                                        label="No"
                                        type="radio"
                                        name="greenC"
                                        value={false}
                                        onChange={handleInputChange}
                                        defaultChecked
                                      />
                                    </Col>
                                  </Row>
                                </Fm.Group>
                              </Col>

                              <Col className="pb-2">
                                <Fm.Group>
                                  <Row>
                                    <Col sm={6}>
                                      <Fm.Label
                                        style={{ paddingRight: "1rem" }}
                                      >
                                        Already filed or expected filing with
                                        SEC (or equivalent Exchange) within 6
                                        weeks:
                                      </Fm.Label>
                                    </Col>

                                    <Col sm={6}>
                                      <Fm.Check
                                        inline
                                        label="Yes"
                                        type="radio"
                                        name="greenD"
                                        value={true}
                                        onChange={handleInputChange}
                                      />
                                      <Fm.Check
                                        inline
                                        label="No"
                                        type="radio"
                                        name="greenD"
                                        value={false}
                                        onChange={handleInputChange}
                                        defaultChecked
                                      />
                                    </Col>
                                  </Row>
                                </Fm.Group>
                              </Col>

                              <Col className="pb-2">
                                <Fm.Group>
                                  <Row>
                                    <Col sm={6}>
                                      <Fm.Label
                                        style={{ paddingRight: "1rem" }}
                                      >
                                        All Materials CPs to Financial Close
                                        have been satisfactorily met or
                                        committed by the Client for completion
                                        on or before Financial Close:
                                      </Fm.Label>
                                    </Col>

                                    <Col sm={6}>
                                      <Fm.Check
                                        inline
                                        label="Yes"
                                        type="radio"
                                        name="greenE"
                                        value={true}
                                        onChange={handleInputChange}
                                      />
                                      <Fm.Check
                                        inline
                                        label="No"
                                        type="radio"
                                        name="greenE"
                                        value={false}
                                        onChange={handleInputChange}
                                        defaultChecked
                                      />
                                    </Col>
                                  </Row>
                                </Fm.Group>
                              </Col>

                              <Col className="pb-2">
                                <Fm.Group>
                                  <Row>
                                    <Col sm={6}>
                                      <Fm.Label
                                        style={{ paddingRight: "1rem" }}
                                      >
                                        Financial Close expected within 3-6
                                        months:
                                      </Fm.Label>
                                    </Col>
                                    <Col sm={6}>
                                      <Fm.Check
                                        inline
                                        label="Yes"
                                        type="radio"
                                        name="greenF"
                                        value={true}
                                        onChange={handleInputChange}
                                      />
                                      <Fm.Check
                                        inline
                                        label="No"
                                        type="radio"
                                        name="greenF"
                                        value={false}
                                        onChange={handleInputChange}
                                        defaultChecked
                                      />
                                    </Col>
                                  </Row>
                                </Fm.Group>
                              </Col>
                            </Col>
                          </Row>
                        </div>
                      </div>
                      <br />
                      <br />
                    </Container1>
                    {/* <button
                      onClick={(e) => toPrevTab(e)}
                      style={{
                        display: "inlineblock",
                        fontSize: "13px",
                        padding: "2px 20px",
                        margin: "10px",
                        background: "green",
                        color: "white",
                        borderRadius: "3px",
                      }}
                    >
                      {" "}
                      Prev */}
                    {/* </button>
                    <button
                      onClick={(e) => toNextTab(e)}
                      style={{
                        display: "inlineblock",
                        fontSize: "13px",
                        padding: "2px 20px",
                        margin: "10px",
                        background: "green",
                        color: "white",
                        borderRadius: "3px",
                      }}
                    >
                      Next
                    </button> */}
                  </Tab>
                  <Tab
                    eventKey="sixth"
                    title="NBC FOCUS AREAS"
                    style={{ fontSize: "12px" }}
                  >
                    <Container1>
                      <br />
                      <Row className="py-1">
                        <Col sm={12}>
                          <Row>
                            {/* NBC DD FOCUS */}

                            <Col sm={3} className="mt-1 mb-1">
                              <p>ORIGINAL</p>
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Fm.Control
                                    type="text"
                                    // style={{ margin: "0.8em", width: "60%" }}
                                    size="sm"
                                    value={singleNote.nbcFocus}
                                    name="label"
                                    onChange={(e) => handleNbcChange(e, index)}
                                  />
                                  <br />
                                  {/* <button
                                  type="button"
                                  onClick={handleNoteRemove}
                                >
                                  x
                                </button> */}
                                </div>
                              ))}
                              {/* <button
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
                            </button> */}
                              {/* {noteList.map((singleNote, index) => (
                              <div class="input-group">
                                <Fm.Control
                                  type='text'
                                  style={{ margin: "0.8em", width: "60%" }}
                                  size="sm"
                                  value={singleNote.note}
                                  name="note"
                                  onChange={(e) => handleNoteChange(e, index)}
                                /> */}

                              {/* <button
                                  type="button"
                                  style={{
                                    fontSize: "10px",
                                    padding: "2px 10px",
                                    margin: "8px",
                                    background: "steelblue",
                                    color: "white",
                                    borderRadius: "3px",
                                  }}
                                  onClick={handleNoteRemove}
                                >
                                  x
                                </button>
                              </div>
                            ))} */}
                            </Col>
                            <Col sm={2} className="mt-1 mb-1">
                              <p>CONCERNS</p>
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group mt-2 ">
                                  {/* <Fm.Control
                                  type='text'
                                  style={{ margin: "0.8em", width: "60%" }}
                                  size="sm"
                                  value={singleNote.note}
                                  name="note"
                                  onChange={(e) => handleNoteChange(e, index)}
                                /> */}

                                  <Select
                                    className="py-1 mt-1 "
                                    type="text"
                                    size="md"
                                    value={singleNote.nbcFocus}
                                    // onChange={handleInputChange}
                                    onChange={(e) => handleNbcChange(e, index)}
                                    name="concern"
                                  >
                                    <option>Yes/No</option>
                                    <option value={"Yes"}>Yes</option>
                                    <option value={"No"}>No</option>
                                  </Select>

                                  {/* <button
                                  type="button"
                                  onClick={handleNoteRemove}
                                >
                                  x
                                </button> */}
                                </div>
                              ))}
                            </Col>
                            <Col sm={3} className=" mb-1">
                              <p>DATE</p>
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Fm.Control
                                    type="date"
                                    size="sm"
                                    value={singleNote.nbcFocus}
                                    name="date"
                                    onChange={(e) => handleNbcChange(e, index)}
                                  />

                                  {/* <button
                                  type="button"
                                  onClick={handleNoteRemove}
                                >
                                  x
                                </button> */}
                                </div>
                              ))}
                              {/* <span class="iconify" data-icon="fluent:add-circle-16-filled"></span> */}
                              {/* <button
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
                            {noteList.map((singleNote, index) => (
                              <div class="input-group">
                                <Fm.Control
                                  type='date'
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
                                  onClick={handleNoteRemove}
                                >
                                  x
                                </button>
                              </div>
                            ))} */}
                            </Col>
                            <Col sm={3} className="">
                              <p>METHODOLOGY</p>
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group  mt-2">
                                  <Fm.Control
                                    type="text"
                                    style={{ width: "30%", height: "10px" }}
                                    size="sm"
                                    value={singleNote.nbcFocus}
                                    name="methodology"
                                    onChange={(e) => handleNbcChange(e, index)}
                                  />

                                  <button
                                    onClick={handleNbcRemove}
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
                        </Col>
                        <div className="d-flex justify-content-end ml-2">
                          <p className="">
                            <GrAdd onClick={handleNbcAdd} />
                          </p>
                        </div>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={3}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    {/* Strength of Contracts: */}
                                  </Fm.Label>
                                </Col>
                                <Col sm={3}>
                                  {/* <Fm.Check
                                    inline
                                    label="Yes"
                                    type="radio"
                                    onChange={handleInputChange}
                                    name="nbc_focus_original_1_b"
                                    value={true}
                                  /> */}
                                  {/* <Fm.Check
                                    inline
                                    label="No"
                                    type="radio"
                                    onChange={handleInputChange}
                                    name="nbc_focus_original_1_b"
                                    value={false}
                                    defaultChecked
                                  /> */}
                                </Col>
                                <Col sm={3}>
                                  {/* <Input
                                    size="sm"
                                    type="date"
                                    value={deal.nbc_focus_original_1_c}
                                    onChange={handleInputChange}
                                    name="nbc_focus_original_1_c"
                                    style={{
                                      width: "80%",
                                      padding: "2px 1px",
                                      focus: "none",
                                    }}
                                  /> */}
                                </Col>
                                <Col sm={3}>
                                  {/* <Fm.Control
                                    as="textarea"
                                    placeholder=" "
                                    value={deal.nbc_focus_original_1_d}
                                    onChange={handleInputChange}
                                    name="nbc_focus_original_1_d"
                                    style={{ height: "30px" }}
                                  ></Fm.Control> */}
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>

                        {/* <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={3}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Sponsor Equity:
                                  </Fm.Label>
                                </Col>
                                <Col sm={3}>
                                  <Fm.Check
                                    inline
                                    label="Yes"
                                    type="radio"
                                    onChange={handleInputChange}
                                    name="nbc_focus_original_2_b"
                                    value={true}
                                  />
                                  <Fm.Check
                                    inline
                                    label="No"
                                    type="radio"
                                    onChange={handleInputChange}
                                    name="nbc_focus_original_2_b"
                                    value={false}
                                    defaultChecked
                                  />
                                </Col>
                                <Col sm={3}>
                                  <Input
                                    size="sm"
                                    type="date"
                                    value={deal.nbc_focus_original_2_c}
                                    onChange={handleInputChange}
                                    name="nbc_focus_original_2_c"
                                    style={{
                                      width: "80%",
                                      padding: "2px 1px",
                                      focus: "none",
                                    }}
                                  />
                                </Col>
                                <Col sm={3}>
                                  <Fm.Control
                                    as="textarea"
                                    placeholder=""
                                    value={deal.nbc_focus_original_2_d}
                                    onChange={handleInputChange}
                                    name="nbc_focus_original_2_d"
                                    style={{ height: "30px" }}
                                  ></Fm.Control>
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col> */}
                        {/* <Col sm={12}>
                            <Col className="pb-2">
                              <Fm.Group>
                                <Row>
                                  <Col sm={3}>
                                    <Fm.Label style={{ paddingRight: "1rem" }}>
                                      Regulatory Approval:
                                    </Fm.Label>
                                  </Col>
                                  <Col sm={3}>
                                    <Fm.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      onChange={handleInputChange}
                                      name="nbc_focus_original_3_b"
                                      value={true}
                                    />
                                    <Fm.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      onChange={handleInputChange}
                                      name="nbc_focus_original_3_b"
                                      value={false}
                                      defaultChecked
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Input
                                      size="sm"
                                      type="date"
                                      value={deal.nbc_focus_original_3_c}
                                      onChange={handleInputChange}
                                      name="nbc_focus_original_3_c"
                                      style={{
                                        width: "80%",
                                        padding: "2px 1px",
                                        focus: "none",
                                      }}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Fm.Control
                                      as="textarea"
                                      placeholder=""
                                      value={deal.nbc_focus_original_3_d}
                                      onChange={handleInputChange}
                                      name="nbc_focus_original_3_d"
                                      style={{ height: "30px" }}
                                    ></Fm.Control>
                                  </Col>
                                </Row>
                              </Fm.Group>
                            </Col>
                          </Col> */}
                        {/* <Col sm={12}>
                            <Col className="pb-2">
                              <Fm.Group>
                                <Row>
                                  <Col sm={3}>
                                    <Fm.Label style={{ paddingRight: "1rem" }}>
                                      Technical Validation:
                                    </Fm.Label>
                                  </Col>
                                  <Col sm={3}>
                                    <Fm.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      onChange={handleInputChange}
                                      name="nbc_focus_original_4_b"
                                      value={true}
                                    />
                                    <Fm.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      onChange={handleInputChange}
                                      name="nbc_focus_original_4_b"
                                      value={false}
                                      defaultChecked
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Input
                                      size="sm"
                                      type="date"
                                      value={deal.nbc_focus_original_4_c}
                                      onChange={handleInputChange}
                                      name="nbc_focus_original_4_c"
                                      style={{
                                        width: "80%",
                                        padding: "2px 1px",
                                        focus: "none",
                                      }}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Fm.Control
                                      as="textarea"
                                      placeholder=" "
                                      value={deal.nbc_focus_original_4_d}
                                      onChange={handleInputChange}
                                      name="nbc_focus_original_4_d"
                                      style={{ height: "30px" }}
                                    ></Fm.Control>
                                  </Col>
                                </Row>
                              </Fm.Group>
                            </Col>
                          </Col>
                          <Col sm={12}>
                            <Col className="pb-2">
                              <Fm.Group>
                                <Row>
                                  <Col sm={3}>
                                    <Fm.Label style={{ paddingRight: "1rem" }}>
                                      Competitive Landscape:
                                    </Fm.Label>
                                  </Col>
                                  <Col sm={3}>
                                    <Fm.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      onChange={handleInputChange}
                                      name="nbc_focus_original_5_b"
                                      value={true}
                                    />
                                    <Fm.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      onChange={handleInputChange}
                                      name="nbc_focus_original_5_b"
                                      value={false}
                                      defaultChecked
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Input
                                      size="sm"
                                      type="date"
                                      value={deal.nbc_focus_original_5_c}
                                      onChange={handleInputChange}
                                      name="nbc_focus_original_5_c"
                                      style={{
                                        width: "80%",
                                        padding: "2px 1px",
                                        focus: "none",
                                      }}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Fm.Control
                                      as="textarea"
                                      placeholder=""
                                      value={deal.nbc_focus_original_5_d}
                                      onChange={handleInputChange}
                                      name="nbc_focus_original_5_d"
                                      style={{ height: "30px" }}
                                    ></Fm.Control>
                                  </Col>
                                </Row>
                              </Fm.Group>
                            </Col>
                          </Col> */}
                        <Col sm={12}>
                          <p style={{ fontWeight: "bold" }}>
                            NBC Paper (Link to Doc)
                          </p>
                        </Col>
                        <Col sm={12}>
                          <p style={{ fontWeight: "bold" }}>
                            NBC Approvals and Minutes
                          </p>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={5}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    MROC Pre_NBC Approval ( Link to Doc)
                                  </Fm.Label>
                                </Col>
                                <Col sm={3}>
                                  <Fm.Check
                                    inline
                                    label="Yes"
                                    type="radio"
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_1_b"
                                    value={true}
                                  />
                                  <Fm.Check
                                    inline
                                    label="No"
                                    type="radio"
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_1_b"
                                    value={false}
                                    defaultChecked
                                  />
                                </Col>
                                <Col sm={3}>
                                  <Input
                                    size="sm"
                                    type="date"
                                    value={deal.nbc_focus_apprv_1_c}
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_1_c"
                                    style={{
                                      width: "80%",
                                      padding: "2px 1px",
                                      focus: "none",
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={5}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    MROC Pre_NBC Minutes. ( Link to Doc)
                                  </Fm.Label>
                                </Col>
                                <Col sm={3}>
                                  <Fm.Check
                                    inline
                                    label="Yes"
                                    type="radio"
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_2_b"
                                    value={true}
                                  />
                                  <Fm.Check
                                    inline
                                    label="No"
                                    type="radio"
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_2_b"
                                    value={false}
                                    defaultChecked
                                  />
                                </Col>
                                <Col sm={3}>
                                  <Input
                                    size="sm"
                                    type="date"
                                    value={deal.nbc_focus_apprv_2_c}
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_2_c"
                                    style={{
                                      width: "80%",
                                      padding: "2px 1px",
                                      focus: "none",
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={5}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    NBC Approval ( Link to Doc)
                                  </Fm.Label>
                                </Col>
                                <Col sm={3}>
                                  <Fm.Check
                                    inline
                                    label="Yes"
                                    type="radio"
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_3_b"
                                    value={true}
                                  />
                                  <Fm.Check
                                    inline
                                    label="No"
                                    type="radio"
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_3_b"
                                    value={false}
                                    defaultChecked
                                  />
                                </Col>
                                <Col sm={3}>
                                  <Input
                                    size="sm"
                                    type="date"
                                    value={deal.nbc_focus_apprv_3_c}
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_3_c"
                                    style={{
                                      width: "80%",
                                      padding: "2px 1px",
                                      focus: "none",
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={5}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    NBC Minutes ( Link to Doc)
                                  </Fm.Label>
                                </Col>
                                <Col sm={3}>
                                  <Fm.Check
                                    inline
                                    label="Yes"
                                    type="radio"
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_4_b"
                                    value={true}
                                  />
                                  <Fm.Check
                                    inline
                                    label="No"
                                    type="radio"
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_4_b"
                                    value={false}
                                    defaultChecked
                                  />
                                </Col>
                                <Col sm={3}>
                                  <Input
                                    size="sm"
                                    type="date"
                                    value={deal.nbc_focus_apprv_4_c}
                                    onChange={handleInputChange}
                                    name="nbc_focus_apprv_4_c"
                                    style={{
                                      width: "80%",
                                      padding: "2px 1px",
                                      focus: "none",
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                          <Col sm={12}>
                            <Col className="pb-2">
                              <Fm.Group>
                                <Row>
                                  <Col sm={5}>
                                    <Fm.Label style={{ paddingRight: "1rem" }}>
                                      Mandate Letter with Indicative Term Sheet
                                      On-Boarding Documents ( Link to Doc)
                                    </Fm.Label>
                                  </Col>
                                  <Col sm={3}>
                                    <Fm.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      onChange={handleInputChange}
                                      name="nbc_focus_apprv_5_b"
                                      value={true}
                                    />
                                    <Fm.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      onChange={handleInputChange}
                                      name="nbc_focus_apprv_5_b"
                                      value={false}
                                      defaultChecked
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Input
                                      size="sm"
                                      type="date"
                                      value={deal.nbc_focus_apprv_5_c}
                                      onChange={handleInputChange}
                                      name="nbc_focus_apprv_5_c"
                                      style={{
                                        width: "80%",
                                        padding: "2px 1px",
                                        focus: "none",
                                      }}
                                    />
                                  </Col>
                                </Row>
                              </Fm.Group>
                            </Col>
                            {/* </Col> */}
                          </Col>
                        </Col>
                      </Row>
                      {/* <button
                        onClick={(e) => toPrevTab(e)}
                        style={{
                          display: "inlineblock",
                          fontSize: "13px",
                          padding: "2px 20px",
                          margin: "10px",
                          background: "green",
                          color: "white",
                          borderRadius: "3px",
                        }}
                      >
                        {" "}
                        Prev
                      </button> */}
                      {/* <button
                        onClick={(e) => toNextTab(e)}
                        style={{
                          display: "inlineblock",
                          fontSize: "13px",
                          padding: "2px 20px",
                          margin: "10px",
                          background: "green",
                          color: "white",
                          borderRadius: "3px",
                        }}
                      >
                        Next
                      </button> */}
                    </Container1>
                  </Tab>

                  {/* ...................................... Parties .............................................. */}
                  <Tab
                    eventKey="seventh"
                    title="TRANSACTION PARTIES"
                    style={{ fontSize: "12px" }}
                  >
                    <Container1>
                      <br />
                      <Row className="py-1">
                        <Col sm={12}>
                          <Row>
                            <Col sm={3} className="mt-1 mb-1">
                              <p>Role</p>
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Fm.Control
                                    type="text"
                                    size="sm"
                                    value={singleNote.nbcFocus}
                                    name="label"
                                    onChange={(e) => handleNbcChange(e, index)}
                                  />
                                  <br />
                                </div>
                              ))}
                            </Col>
                            <Col sm={2} className="mt-1 mb-1">
                              <p>Appointed</p>
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group mt-2 ">
                                  <Select
                                    className="py-1 mt-1 "
                                    type="text"
                                    size="md"
                                    value={singleNote.nbcFocus}
                                    onChange={(e) => handleNbcChange(e, index)}
                                    name="appointed"
                                  >
                                    <option>Yes/No</option>
                                    <option value={"Yes"}>Yes</option>
                                    <option value={"No"}>No</option>
                                  </Select>
                                </div>
                              ))}
                            </Col>
                            <Col sm={3} className=" mb-1">
                              <p>Party</p>
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Fm.Control
                                    type="text"
                                    size="sm"
                                    value={singleNote.nbcFocus}
                                    name="party"
                                    onChange={(e) => handleNbcChange(e, index)}
                                  />
                                </div>
                              ))}
                            </Col>
                            <Col sm={3} className="">
                              <p>Status</p>
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group  mt-2">
                                  <Fm.Control
                                    type="text"
                                    style={{ width: "30%", height: "10px" }}
                                    size="sm"
                                    value={singleNote.nbcFocus}
                                    name="transactionstatus"
                                    onChange={(e) => handleNbcChange(e, index)}
                                  />
                                  <button
                                    onClick={handleNbcRemove}
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
                        </Col>
                        <div className="d-flex justify-content-end ml-2">
                          <p className="">
                            <GrAdd onClick={handleNbcAdd} />
                          </p>
                        </div>
                      </Row>
                    </Container1>
                  </Tab>

                  {/* ...........................eight tab */}
                  <Tab
                    eventKey="eigth"
                    title="PERFORMANCE-LINKED INDICATORS"
                    style={{ fontSize: "12px" }}
                  >
                    <Container1>
                      <br />
                      <Row className="py-1">
                        
                      <Col sm={12}>
                          <Row>
                            <Col sm={2} className="mt-1 mb-1">
                              <p>Particulars</p>
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Fm.Control
                                    type="text"
                                    size="sm"
                                    value={singleNote.nbcFocus}
                                    name="label"
                                    onChange={(e) => handleNbcChange(e, index)}
                                  />
                                  <br />
                                </div>
                              ))}
                            </Col>
                            <Col sm={2} className="mb-1">
                              <p>Concern</p>
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group mt-1 mb-1 ">
                                  <Select
                                    className="py-1 mt-1 "
                                    type="text"
                                    size="md"
                                    value={singleNote.nbcFocus}
                                    onChange={(e) => handleNbcChange(e, index)}
                                    name="appointed"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"medium"}>Medium</option>
                                    <option value={"Low"}>Low</option>
                                  </Select>
                                </div>
                              ))}
                            </Col>
                            <Col sm={2} className=" mb-1">
                              <p>Weight (%)</p>
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Fm.Control
                                    type="number"
                                    size="sm"
                                    value={singleNote.nbcFocus}
                                    name="party"
                                    onChange={(e) => handleNbcChange(e, index)}
                                  />
                                </div>
                              ))}
                            </Col>
                            <Col sm={2} className=" mb-1">
                              <p>Expected</p>
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Fm.Control
                                    type="text"
                                    size="sm"
                                    value={singleNote.nbcFocus}
                                    name="party"
                                    onChange={(e) => handleNbcChange(e, index)}
                                  />
                                </div>
                              ))}
                            </Col>
                            <Col sm={3} className="">
                              <p>Status</p>
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group  mt-2">
                                  <Fm.Control
                                    type="date"
                                    style={{ width: "30%", height: "10px" }}
                                    size="sm"
                                    value={singleNote.nbcFocus}
                                    name="transactionstatus"
                                    onChange={(e) => handleNbcChange(e, index)}
                                  />
                                  <button
                                    onClick={handleNbcRemove}
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
                        </Col>
                        <div className="d-flex justify-content-end ml-2">
                          <p className="">
                            <GrAdd onClick={handleNbcAdd} />
                          </p>
                        </div>
                      </Row>
                    </Container1>
                  </Tab>
                  {/* ninth tab  other cpis */}
                  <Tab
                    eventKey="ninth"
                    title="OTHER CONDITIONS PRECEDENT"
                    style={{ fontSize: "12px" }}
                  >

                    <Row className="py-1">
                    <Col sm={12}>
                          <Row>
                            <Col sm={2} className="mt-1 mb-1">
                              <p>Factors</p>
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Fm.Control
                                    type="text"
                                    size="sm"
                                    value={singleNote.nbcFocus}
                                    name="label"
                                    onChange={(e) => handleNbcChange(e, index)}
                                  />
                                  <br />
                                </div>
                              ))}
                            </Col>
                            <Col sm={2} className="mb-1">
                              <p>Yes/No</p>
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group mt-1 mb-1 ">
                                  <Select
                                    className="py-1 mt-1 "
                                    type="text"
                                    size="md"
                                    value={singleNote.nbcFocus}
                                    onChange={(e) => handleNbcChange(e, index)}
                                    name="appointed"
                                  >
                                    <option >Select</option>
                                    <option value={"Yes"}>Yes</option>
                                    <option value={"No"}>No</option>
                                  </Select>
                                </div>
                              ))}
                            </Col>
                            <Col sm={2} className="mb-1">
                              <p>Concern</p>
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group mt-1 mb-1 ">
                                  <Select
                                    className="py-1 mt-1 "
                                    type="text"
                                    size="md"
                                    value={singleNote.nbcFocus}
                                    onChange={(e) => handleNbcChange(e, index)}
                                    name="appointed"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Medium"}>Medium</option>
                                    <option value={"Low"}>Low</option>
                                  </Select>
                                </div>
                              ))}
                            </Col>
                            <Col sm={2} className=" mb-1">
                              <p>Expected Date</p>
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Fm.Control
                                    type="date"
                                    size="sm"
                                    value={singleNote.nbcFocus}
                                    name="party"
                                    onChange={(e) => handleNbcChange(e, index)}
                                  />
                                </div>
                              ))}
                            </Col>
                            <Col sm={2} className=" mb-1">
                              <p>Resp Party</p>
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Fm.Control
                                    type="text"
                                    size="sm"
                                    value={singleNote.nbcFocus}
                                    name="party"
                                    onChange={(e) => handleNbcChange(e, index)}
                                  />
                                </div>
                              ))}
                            </Col>
                            <Col sm={2} className="">
                              <p>Status</p>
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group  mt-2">
                                  <Fm.Control
                                    type="text"
                                    // style={{ width: "30%", height: "10px" }}
                                    size="sm"
                                    value={singleNote.nbcFocus}
                                    name="transactionstatus"
                                    onChange={(e) => handleNbcChange(e, index)}
                                  />
                                  <button
                                    onClick={handleNbcRemove}
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
                        </Col>
                        <div className="d-flex justify-content-end ml-2">
                          <p className="">
                            <GrAdd onClick={handleNbcAdd} />
                          </p>
                        </div>

                      
                        
                        
                        
                       
                        
                        
                         

                      
                    
                    </Row>
                  </Tab>

                  {/* 10th //////////////////////////////////// */}

                  <Tab
                    eventKey="tenth"
                    title="KEY PERFORMANCE INDICATOR"
                    style={{ fontSize: "12px" }}
                  >
                    <br />
                    <Row className="py-1">
                      <Col sm={12}>
                        <Row>
                          <Col>
                            <PWrapper>FACTORS</PWrapper>
                            <br />
                          </Col>
                          <Col>
                            <PWrapper>YES/NO</PWrapper>
                          </Col>
                          <Col>
                            <PWrapper>CONCERN</PWrapper>
                          </Col>
                          <Col>
                            <PWrapper>EXPECTED</PWrapper>
                          </Col>
                          <Col>
                            <PWrapper>RESPONSIBLE PARTY</PWrapper>
                          </Col>
                          <Col>
                            <PWrapper>STATUS</PWrapper>
                          </Col>
                        </Row>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Transaction Docs
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_1_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_1_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_1_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_1_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_1_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_1_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_1_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_1_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_1_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_1_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>

                        {/* <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Risk CP Sign-Off
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type = "text"
                                    value={deal.key_deal_fac_2_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_2_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type = "text"
                                    value={deal.key_deal_fac_2_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_2_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control 
                                    type="date"
                                    value={deal.key_deal_fac_2_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_2_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_2_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_2_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_2_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_2_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col> */}

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Reporting Acct Report
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_3_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_3_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_3_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_3_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_3_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_3_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_3_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_3_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_3_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_3_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Regulatory Approval
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_4_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_4_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_4_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_4_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_4_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_4_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_4_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_4_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_4_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_4_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Parties Appointed
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_5_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_5_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_5_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_5_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_5_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_5_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_5_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_5_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_5_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_5_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    New Equity Investment
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_6_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_6_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_6_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_6_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_6_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_6_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_6_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_6_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_6_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_6_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Legal Opinions
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_7_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_7_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_7_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_7_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_7_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_7_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_7_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_7_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_7_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_7_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Issue Ratings
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_8_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_8_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_8_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_8_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_8_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_8_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_8_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_8_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_8_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_8_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Guarantee Docs
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_9_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_9_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_9_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_9_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_9_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_9_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_9_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_9_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_9_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_9_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Filed with SEC
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_10_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_10_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_10_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_10_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_10_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_10_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_10_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_10_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_10_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_10_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Fees
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_11_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_11_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_11_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_11_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_11_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_11_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_11_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_11_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_11_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_11_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    CP Letter / Risk Sign-Off
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_12_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_12_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_12_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_12_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_12_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_12_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_12_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_12_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_12_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_12_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Consent of Legacy Lenders
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_13_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_13_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_13_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_13_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_13_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_13_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_13_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_13_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_13_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_13_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Board Resolutions
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_14_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_14_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_14_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_14_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_14_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_14_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_14_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_14_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_14_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_14_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    Asset Valuation
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_15_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_15_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_15_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_15_c"
                                  >
                                    <option>Concern</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Low"}>Low</option>
                                    <option value={"Medium"}>Medium</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_15_d}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_15_d"
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_15_e}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_15_e"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="text"
                                    value={deal.key_deal_fac_15_f}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_15_f"
                                    style={{ width: "100%", margin: "2px" }}
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    MROC pre-CC Approval
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_16_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_16_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>

                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_16_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_16_c"
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    MROC pre-CC Approval
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_17_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_17_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>
                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_17_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_17_c"
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    MROC pre-CC Minutes
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_18_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_18_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>

                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_18_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_18_c"
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    CC Approval
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_19_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_19_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>

                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_19_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_19_c"
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Fm.Group>
                              <Row>
                                <Col sm={2}>
                                  <Fm.Label style={{ paddingRight: "1rem" }}>
                                    CC Minutes
                                  </Fm.Label>
                                </Col>
                                <Col sm={2}>
                                  <Select
                                    type="text"
                                    value={deal.key_deal_fac_20_b}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_20_b"
                                  >
                                    <option>Yes/No</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                  </Select>{" "}
                                </Col>

                                <Col sm={2}>
                                  <Fm.Control
                                    type="date"
                                    value={deal.key_deal_fac_20_c}
                                    onChange={handleInputChange}
                                    name="key_deal_fac_20_c"
                                  />
                                </Col>
                              </Row>
                            </Fm.Group>
                          </Col>
                        </Col>
                      </Col>

                      <Col sm={12}>
                        <Col className="pb-2">
                          <Fm.Group>
                            <Row>
                              <Col sm={2}>
                                <Fm.Label style={{ paddingRight: "1rem" }}>
                                  CC Approval Terms
                                </Fm.Label>
                              </Col>
                              <Col sm={2}>
                                <Select
                                  type="text"
                                  value={deal.key_deal_fac_21_b}
                                  onChange={handleInputChange}
                                  name="key_deal_fac_21_b"
                                >
                                  <option>Yes/No</option>
                                  <option value={true}>Yes</option>
                                  <option value={false}>No</option>
                                </Select>{" "}
                              </Col>

                              <Col sm={2}>
                                <Fm.Control
                                  type="date"
                                  value={deal.key_deal_fac_21_c}
                                  onChange={handleInputChange}
                                  name="key_deal_fac_21_c"
                                />
                              </Col>
                            </Row>
                          </Fm.Group>
                        </Col>
                      </Col>

                      <Col sm={12}>
                        <Col className="pb-2">
                          <Fm.Group>
                            <Row>
                              <Col sm={2}>
                                <Fm.Label style={{ paddingRight: "1rem" }}>
                                  Updated Indicative Term Sheet
                                </Fm.Label>
                              </Col>
                              <Col sm={2}>
                                <Select
                                  type="text"
                                  value={deal.key_deal_fac_22_b}
                                  onChange={handleInputChange}
                                  name="key_deal_fac_22_b"
                                >
                                  <option>Yes/No</option>
                                  <option value={true}>Yes</option>
                                  <option value={false}>No</option>
                                </Select>{" "}
                              </Col>

                              <Col sm={2}>
                                <Fm.Control
                                  type="date"
                                  value={deal.key_deal_fac_22_c}
                                  onChange={handleInputChange}
                                  name="key_deal_fac_22_c"
                                />
                              </Col>
                            </Row>
                          </Fm.Group>
                        </Col>
                      </Col>

                      <Col sm={12}>
                        <Col className="pb-2">
                          <Fm.Group>
                            <Row>
                              <Col sm={2}>
                                <Fm.Label style={{ paddingRight: "1rem" }}>
                                  Fee Letter
                                </Fm.Label>
                              </Col>
                              <Col sm={2}>
                                <Select
                                  type="text"
                                  value={deal.key_deal_fac_23_b}
                                  onChange={handleInputChange}
                                  name="key_deal_fac_23_b"
                                >
                                  <option>Yes/No</option>
                                  <option value={true}>Yes</option>
                                  <option value={false}>No</option>
                                </Select>{" "}
                              </Col>

                              <Col sm={2}>
                                <Fm.Control
                                  type="date"
                                  value={deal.key_deal_fac_23_c}
                                  onChange={handleInputChange}
                                  name="key_deal_fac_23_c"
                                />
                              </Col>
                            </Row>
                          </Fm.Group>
                        </Col>
                      </Col>
                    </Row>
                    {/* <button
                      onClick={(e) => toPrevTab(e)}
                      style={{
                        display: "inlineblock",
                        fontSize: "13px",
                        padding: "2px 20px",
                        margin: "10px",
                        background: "green",
                        color: "white",
                        borderRadius: "3px",
                      }}
                    >
                      {" "}
                      Prev
                    </button> */}
                    {/* <button
                        onClick={(e) => toNextTab(e)}
                        style={{
                          display: "inlineblock",
                          fontSize: "13px",
                          padding: "2px 20px",
                          margin: "10px",
                          background: "green",
                          color: "white",
                          borderRadius: "3px",
                        }}
                      >
                        Next
                      </button> */}
                  </Tab>

                  {/* ............10............................................................................... */}
                </Tabs>
                <div
                  className="d-flex justify-content-end"
                  style={{ fontSize: "13px", color: "red" }}
                >
                  <p class="animate__animated animate__pulse pt-2">
                    {response}
                  </p>
                </div>

                <div className="d-flex justify-content-end">
                  <ButtonWrapper onClick={saveDeal} ref={form}>
                    Submit
                  </ButtonWrapper>

                  <ButtonWrapper
                    style={{ backgroundColor: "grey", color: "white" }}
                  >
                    Cancel
                  </ButtonWrapper>
                </div>
              </div>
            </Form>
          )}
        </Container>
      </FormWrapper>
    </React.Fragment>
  );
};
export default AddDeal;
