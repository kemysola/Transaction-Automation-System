import React, { useRef, useState, useEffect } from 'react';
import { Form, Container, Row, Col, Alert,Dropdown } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import styled from 'styled-components';
import Service from "../../Services/Service"
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const ButtonWrapper = styled.button`
  color:white;
  background: green;
  margin-right:14px;
  border:1px solid  white;
  padding:10px 23px;
  margin-top: 8px;
  margin-bottom: 8px;
  font-weight:bold;
  font-size:10px;
  border-radius:5px;
`;

const FormWrapper = styled.div`
  margin:0;
  font-size:5px;
  padding:0;
`;

const Container1 = styled.div`
  font-size:12px;
  padding: 1px 1rem;
  border-radius: 15px;
`;

const PWrapper = styled.p`
  // color:#1E2F97;
  font-weight:bold;
  font-size:11px;
  margin:0;
  padding: 0;
`;

export default function UpdateTransactions() {
  // form ref values
  const clientName = useRef("");
  const originator = useRef("");
  const transactor = useRef("");
  const transactionLegalLead = useRef("");
  const industry = useRef("");
  const product = useRef("");
  const region = useRef("")
  const dealSize = useRef("");
  const coupon = useRef("");
  const tenor = useRef("");
  const moratorium = useRef("");
  const repaymentFreq = useRef("");
  const amortizationStyle = useRef("");
  const mandateLetter = useRef("");
  const creditApproval = useRef("");
  const feeLetter = useRef("");
  const exceptedClose = useRef("");
  const actualClose = useRef("");
  const amount = useRef("");
  const advance = useRef("");
  const final = useRef("");
  const guarantee = useRef("");
  const monitoring = useRef("");
  const reimbursible = useRef("");
  const nbcApprovalDate = useRef("");
  const nbcSubmittedDate = useRef("");

  // NBC Focus Data
  const  nbc_focus_original_1_c = useRef("");
  const  nbc_focus_original_1_d = useRef("");
  const  nbc_focus_original_2_c = useRef("");
  const  nbc_focus_original_2_d = useRef("");
  const  nbc_focus_original_3_c = useRef("");
  const  nbc_focus_original_3_d = useRef("");
  const  nbc_focus_original_4_c = useRef("");
  const  nbc_focus_original_4_d = useRef("");
  const  nbc_focus_original_5_c = useRef("");
  const  nbc_focus_original_5_d = useRef("");
  const  nbc_focus_apprv_1_b = useRef("");
  const  nbc_focus_apprv_1_c = useRef("");
  const  nbc_focus_apprv_2_b = useRef("");
  const  nbc_focus_apprv_2_c = useRef("");
  const  nbc_focus_apprv_3_b = useRef("");
  const  nbc_focus_apprv_3_c = useRef("");
  const  nbc_focus_apprv_4_b = useRef("");
  const  nbc_focus_apprv_4_c = useRef("");
  const  nbc_focus_apprv_5_b = useRef("");
  const  nbc_focus_apprv_5_c = useRef("");

  // Parties Columns
  const  parties_1_b = useRef("");
  const  parties_1_d = useRef("");
  const  parties_2_b = useRef("");
  const  parties_2_d = useRef("");
  const  parties_3_b = useRef("");
  const  parties_3_d = useRef("");
  const  parties_4_b = useRef("");
  const  parties_4_d = useRef("");
  const  parties_5_b = useRef("");
  const  parties_5_d = useRef("");
  const  parties_6_b = useRef("");
  const  parties_6_d = useRef("");
  const  parties_7_b = useRef("");
  const  parties_7_d = useRef("");
  const  parties_8_b = useRef("");
  const  parties_8_d = useRef("");
  const  parties_9_b = useRef("");
  const  parties_9_d = useRef("");
  const  parties_10_b = useRef("");
  const  parties_10_d = useRef("");
  const  parties_11_b = useRef("");
  const  parties_11_d = useRef("");

  // PLIS Columns
  const  plis_1_b = useRef("");
  const  plis_1_c = useRef("");
  const  plis_1_d = useRef("");
  const  plis_1_e = useRef("");
  const  plis_2_b = useRef("");
  const  plis_2_c = useRef("");
  const  plis_2_d = useRef("");
  const  plis_2_e = useRef("");
  const  plis_3_b = useRef("");
  const  plis_3_c = useRef("");
  const  plis_3_d = useRef("");
  const  plis_3_e = useRef("");
  const  plis_4_b = useRef("");
  const  plis_4_c = useRef("");
  const  plis_4_d = useRef("");
  const  plis_4_e = useRef("");
  const  plis_5_b = useRef("");
  const  plis_5_c = useRef("");
  const  plis_5_d = useRef("");
  const  plis_5_e = useRef("");
  const  plis_6_b = useRef("");
  const  plis_6_c = useRef("");
  const  plis_6_d = useRef("");
  const  plis_6_e = useRef("");

  // Other CPS Data
  const  ocps_fac_1_b = useRef("");
  const  ocps_fac_1_c = useRef("");
  const  ocps_fac_1_d = useRef("");
  const  ocps_fac_1_e = useRef("");
  const  ocps_fac_1_f = useRef("");
  const  ocps_fac_2_b = useRef("");
  const  ocps_fac_2_c = useRef("");
  const  ocps_fac_2_d = useRef("");
  const  ocps_fac_2_e = useRef("");
  const  ocps_fac_2_f = useRef("");
  const  ocps_fac_3_b = useRef("");
  const  ocps_fac_3_c = useRef("");
  const  ocps_fac_3_d = useRef("");
  const  ocps_fac_3_e = useRef("");
  const  ocps_fac_3_f = useRef("");
  const  ocps_fac_4_b = useRef("");
  const  ocps_fac_4_c = useRef("");
  const  ocps_fac_4_d = useRef("");
  const  ocps_fac_4_e = useRef("");
  const  ocps_fac_4_f = useRef("");
  const  ocps_fac_5_b = useRef("");
  const  ocps_fac_5_c = useRef("");
  const  ocps_fac_5_d = useRef("");
  const  ocps_fac_5_e = useRef("");
  const  ocps_fac_5_f = useRef("");
  const  ocps_fac_6_b = useRef("");
  const  ocps_fac_6_c = useRef("");
  const  ocps_fac_6_d = useRef("");
  const  ocps_fac_6_e = useRef("");
  const  ocps_fac_6_f = useRef("");
  const  ocps_fac_7_b = useRef("");
  const  ocps_fac_7_c = useRef("");
  const  ocps_fac_7_d = useRef("");
  const  ocps_fac_7_e = useRef("");
  const  ocps_fac_7_f = useRef("");
  const  ocps_fac_8_b = useRef("");
  const  ocps_fac_8_c = useRef("");
  const  ocps_fac_8_d = useRef("");
  const  ocps_fac_8_e = useRef("");
  const  ocps_fac_8_f = useRef("");
  const  ocps_fac_9_b = useRef("");
  const  ocps_fac_9_c = useRef("");
  const  ocps_fac_9_d = useRef("");
  const  ocps_fac_9_e = useRef("");
  const  ocps_fac_9_f = useRef("");
  
  const  ocps_fac_10_b = useRef("");
  const  ocps_fac_10_c = useRef("");
  const  ocps_fac_10_d = useRef("");
  const  ocps_fac_10_e = useRef("");
  const  ocps_fac_10_f = useRef("");
  const  ocps_fac_11_b = useRef("");
  const  ocps_fac_11_c = useRef("");
  const  ocps_fac_11_d = useRef("");
  const  ocps_fac_11_e = useRef("");
  const  ocps_fac_11_f = useRef("");
  const  ocps_fac_12_b = useRef("");
  const  ocps_fac_12_c = useRef("");
  const  ocps_fac_12_d = useRef("");
  const  ocps_fac_12_e = useRef("");
  const  ocps_fac_12_f = useRef("");
  const  ocps_fac_13_b = useRef("");
  const  ocps_fac_13_c = useRef("");
  const  ocps_fac_13_d = useRef("");
  const  ocps_fac_13_e = useRef("");
  const  ocps_fac_13_f = useRef("");
  const  ocps_fac_14_b = useRef("");
  const  ocps_fac_14_c = useRef("");
  const  ocps_fac_14_d = useRef("");
  const  ocps_fac_14_e = useRef("");
  const  ocps_fac_14_f = useRef("");
  const  ocps_fac_15_b = useRef("");
  const  ocps_fac_15_c = useRef("");
  const  ocps_fac_15_d = useRef("");
  const  ocps_fac_15_e = useRef("");
  const  ocps_fac_15_f = useRef("");
  const  ocps_fac_16_b = useRef("");
  const  ocps_fac_16_c = useRef("");
  const  ocps_fac_16_d = useRef("");
  const  ocps_fac_16_e = useRef("");
  const  ocps_fac_16_f = useRef("");
  const  ocps_fac_17_b = useRef("");
  const  ocps_fac_17_c = useRef("");
  const  ocps_fac_17_d = useRef("");
  const  ocps_fac_17_e = useRef("");
  const  ocps_fac_17_f = useRef("");
  const  ocps_fac_18_b = useRef("");
  const  ocps_fac_18_c = useRef("");
  const  ocps_fac_18_d = useRef("");
  const  ocps_fac_18_e = useRef("");
  const  ocps_fac_18_f = useRef("");
  const  ocps_fac_19_b = useRef("");
  const  ocps_fac_19_c = useRef("");
  const  ocps_fac_19_d = useRef("");
  const  ocps_fac_19_e = useRef("");
  const  ocps_fac_19_f = useRef("");
  const  ocps_fac_20_b = useRef("");
  const  ocps_fac_20_c = useRef("");
  const  ocps_fac_20_d = useRef("");
  const  ocps_fac_20_e = useRef("");
  const  ocps_fac_20_f = useRef("");

  //KEY PERFORMANCE INDICATOR
 const key_deal_fac_1_b = useRef("");
 const key_deal_fac_1_c = useRef("");
 const key_deal_fac_1_d = useRef("");
 const key_deal_fac_1_e = useRef("");
 const key_deal_fac_1_f = useRef("");	
 const key_deal_fac_2_b = useRef("");
 const key_deal_fac_2_c = useRef("");
 const key_deal_fac_2_d = useRef("");
 const key_deal_fac_2_e = useRef("");
 const key_deal_fac_2_f = useRef("");
 const key_deal_fac_3_b = useRef("");
 const key_deal_fac_3_c = useRef("");
 const key_deal_fac_3_d = useRef("");
 const key_deal_fac_3_e = useRef("");
 const key_deal_fac_3_f = useRef("");
 const key_deal_fac_4_b = useRef("");
 const key_deal_fac_4_c = useRef("");
 const key_deal_fac_4_d = useRef("");
 const key_deal_fac_4_e = useRef("");
 const key_deal_fac_4_f = useRef("");
 const key_deal_fac_5_b = useRef("");
 const key_deal_fac_5_c = useRef("");
 const key_deal_fac_5_d = useRef("");
 const key_deal_fac_5_e = useRef("");
 const key_deal_fac_5_f = useRef("");
 const key_deal_fac_6_b = useRef("");
 const key_deal_fac_6_c = useRef("");
 const key_deal_fac_6_d = useRef("");
 const key_deal_fac_6_e = useRef("");
 const key_deal_fac_6_f = useRef("");
 const key_deal_fac_7_b = useRef("");
 const key_deal_fac_7_c = useRef("");
 const key_deal_fac_7_d = useRef("");
 const key_deal_fac_7_e = useRef("");
 const key_deal_fac_7_f = useRef("");
 const key_deal_fac_8_b = useRef("");
 const key_deal_fac_8_c = useRef("");
 const key_deal_fac_8_d = useRef("");
 const key_deal_fac_8_e = useRef("");
 const key_deal_fac_8_f = useRef("");
 const key_deal_fac_9_b = useRef("");
 const key_deal_fac_9_c = useRef("");
 const key_deal_fac_9_d = useRef("");
 const key_deal_fac_9_e = useRef("");
 const key_deal_fac_9_f = useRef("");
 const key_deal_fac_10_b = useRef("");
 const key_deal_fac_10_c = useRef("");
 const key_deal_fac_10_d = useRef("");
 const key_deal_fac_10_e = useRef("");
 const key_deal_fac_10_f = useRef("");
 const key_deal_fac_11_b = useRef("");
 const key_deal_fac_11_c = useRef("");
 const key_deal_fac_11_d = useRef("");
 const key_deal_fac_11_e = useRef("");
 const key_deal_fac_11_f = useRef("");
 const key_deal_fac_12_b = useRef("");
 const key_deal_fac_12_c = useRef("");
 const key_deal_fac_12_d = useRef("");
 const key_deal_fac_12_e = useRef("");
 const key_deal_fac_12_f = useRef("");
 const key_deal_fac_13_b = useRef("");
 const key_deal_fac_13_c = useRef("");
 const key_deal_fac_13_d = useRef("");
 const key_deal_fac_13_e = useRef("");
 const key_deal_fac_13_f = useRef("");
 const key_deal_fac_14_b = useRef("");
 const key_deal_fac_14_c = useRef("");
 const key_deal_fac_14_d = useRef("");
 const key_deal_fac_14_e = useRef("");
 const key_deal_fac_14_f = useRef("");
 const key_deal_fac_15_b = useRef("");
 const key_deal_fac_15_c = useRef("");
 const key_deal_fac_15_d = useRef("");
 const key_deal_fac_15_e = useRef("");
 const key_deal_fac_15_f = useRef("");
 const key_deal_fac_16_b = useRef("");
 const key_deal_fac_16_c = useRef("");
 const key_deal_fac_17_b = useRef("");
 const key_deal_fac_17_c = useRef("");
 const key_deal_fac_18_b = useRef("");
 const key_deal_fac_18_c = useRef("");
 const key_deal_fac_19_b = useRef("");
 const key_deal_fac_19_c = useRef("");
 const key_deal_fac_20_b = useRef("");
 const key_deal_fac_20_c = useRef("");
 const key_deal_fac_21_b = useRef("");
 const key_deal_fac_21_c = useRef("");
 const key_deal_fac_22_b = useRef("");
 const key_deal_fac_22_c = useRef("");
 const key_deal_fac_23_b = useRef("");
 const key_deal_fac_23_c = useRef("");

  let id = window.location.search.split("?")[1]

  const history = useHistory();
  const [deal, setDeal] = useState([]);
  const [message, setMessage] = useState()
  const [status, setStatus] = useState(false);
  const [noteList, setNoteList] = useState([{ note: "" }])
  const [activeTab, setActiveTab] = useState('first');
  const [industries, setIndustries] = useState([]);
  const [products, setProducts] = useState([]);
  const [regions, setRegions] = useState([]);
  const [frequency, setFrequency] = useState([]);
  const [style, setStyle] = useState([]);
  const [staffList, setStaffList] = useState([]);

  // Radio Buttons Data
  const [greenA, setGreenA] = useState("");
  const [greenB, setGreenB] = useState("");
  const [greenC, setGreenC] = useState("");
  const [greenD, setGreenD] = useState("");
  const [greenE, setGreenE] = useState("");
  const [greenF, setGreenF] = useState("");
  const [amberA, setAmberA] = useState("");
  const [amberB, setAmberB] = useState("");
  const [amberC, setAmberC] = useState("");
  const [amberD, setAmberD] = useState("");
  const [amberE, setAmberE] = useState("");
  const [redA, setRedA] = useState("");
  const [redB, setRedB] = useState("");
  const [redC, setRedC] = useState("");

  // nbc radio buttons data
  const [nbcOrg1b, setNbcOrg1b] = useState("");
  const [nbcOrg2b, setNbcOrg2b] = useState("");
  const [nbcOrg3b, setNbcOrg3b] = useState("");
  const [nbcOrg4b, setNbcOrg4b] = useState("");
  const [nbcOrg5b, setNbcOrg5b] = useState("");

  // transaction parties data
  const [parties1C, setParties1C] = useState("");
  const [parties2C, setParties2C] = useState("");
  const [parties3C, setParties3C] = useState("");
  const [parties4C, setParties4C] = useState("");
  const [parties5C, setParties5C] = useState("");
  const [parties6C, setParties6C] = useState("");
  const [parties7C, setParties7C] = useState("");
  const [parties8C, setParties8C] = useState("");
  const [parties9C, setParties9C] = useState("");
  const [parties10C, setParties10C] = useState("");
  const [parties11C, setParties11C] = useState("");

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

  const concernGroup = [
    "High", "Medium", "Low"
  ]

  const optionsGroup = [
    {
      text: "Yes",
      value: true
    },
    {
      text: "No",
      value: false
    }
  ]

  useEffect(() => {
    retrieveDeal();

    retrieveStaffList();

    retrieveIndustry();

    retrieveProduct();

    retrieveRegion();

    retrieveRepaymentFreq();

    retrieveAmortizationStyle();
  }, []);

  const retrieveDeal = async () => {
    // function to get deal by id from the database
    const data = await axios.get(
    //  `https://trms01-server.azurewebsites.net/api/v1/transaction/item/${id}`,
     `http://localhost:5001/api/v1/transaction/item/${id}`,
      {headers: {
        token: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json; charset=utf-8',
      }}
    ).catch((e) => {
      console.log(e);
    });

    // set the deal and status state
    setNoteList(data.data.dealInfo[0].notes)
    setDeal(data.data.dealInfo);
    setStatus(true)
    setGreenA(data.data.dealInfo[0].greena)
    setGreenB(data.data.dealInfo[0].greenb)
    setGreenC(data.data.dealInfo[0].greenc)
    setGreenD(data.data.dealInfo[0].greend)
    setGreenE(data.data.dealInfo[0].greene)
    setGreenF(data.data.dealInfo[0].greenf)
    setAmberA(data.data.dealInfo[0].ambera)
    setAmberB(data.data.dealInfo[0].amberb)
    setAmberC(data.data.dealInfo[0].amberc)
    setAmberD(data.data.dealInfo[0].amberd)
    setAmberE(data.data.dealInfo[0].ambere)
    setRedA(data.data.dealInfo[0].reda)
    setRedB(data.data.dealInfo[0].redb)
    setRedC(data.data.dealInfo[0].redc)
    setNbcOrg1b(data.data.dealInfo[0].nbc_focus_original_1_b)
    setNbcOrg2b(data.data.dealInfo[0].nbc_focus_original_2_b)
    setNbcOrg3b(data.data.dealInfo[0].nbc_focus_original_3_b)
    setNbcOrg4b(data.data.dealInfo[0].nbc_focus_original_4_b)
    setNbcOrg5b(data.data.dealInfo[0].nbc_focus_original_5_b)
    setParties1C(data.data.dealInfo[0].parties_1_c)
    setParties2C(data.data.dealInfo[0].parties_2_c)
    setParties3C(data.data.dealInfo[0].parties_3_c)
    setParties4C(data.data.dealInfo[0].parties_4_c)
    setParties5C(data.data.dealInfo[0].parties_5_c)
    setParties6C(data.data.dealInfo[0].parties_6_c)
    setParties7C(data.data.dealInfo[0].parties_7_c)
    setParties8C(data.data.dealInfo[0].parties_8_c)
    setParties9C(data.data.dealInfo[0].parties_9_c)
    setParties10C(data.data.dealInfo[0].parties_10_c)
    setParties11C(data.data.dealInfo[0].parties_11_c)
  } ;

    // ******************************************  Axios :  get staff  ****************************************


  const retrieveStaffList = () => {
    Service.getStaffList()
    .then((response) => {
      setStaffList(response.data.staffList);
    })
    .catch((e) => {
      console.log(e);
    });
  };

      // ******************************************  Axios :  get industry ****************************************


  const retrieveIndustry = () => {
    Service.getIndustry()
    .then((response) => {
        setIndustries(response.data.industry);
      })
      .catch((e) => {
        console.log(e);
      });
  };

      // ******************************************  Axios :  get product ****************************************

  const retrieveProduct = () => {
    Service.getProduct()
    .then((response) => {
        setProducts(response.data.product);
      })
      .catch((e) => {
        console.log(e);
      });
  };

      // ******************************************  Axios :  get region  ****************************************

  const retrieveRegion = () => {
    Service.getRegion()
    .then((response) => {
        setRegions(response.data.region);
      })
      .catch((e) => {
        console.log(e);
      });
  };

    // ******************************************  Axios :  get repayment Frequency  ****************************

  const retrieveRepaymentFreq = () => {
    Service.getRepaymentFreq()
    .then((response) => {
        setFrequency(response.data.frequency);
      })
      .catch((e) => {
        console.log(e);
      });
  };

      // ******************************************  Axios :  get Amortization Style ****************************


  const retrieveAmortizationStyle = () => {
    Service.getAmortizationSty()
    .then((response) => {
        setStyle(response.data.amortization);
      })
      .catch((e) => {
        console.log(e);
      });
  };


      // ******************************************  Next and Previous Function  ****************************************


  function toNextTab(e) {
    e.preventDefault();
    handleTabChange();
}

function toPrevTab(e) {
    e.preventDefault();
    handlePrevChange();
}

function handleTabChange() {
    if (activeTab === 'first') {
        setActiveTab('second');
    }
    if (activeTab === 'second') {
        setActiveTab('third');
    }
    if (activeTab === 'third') {
        setActiveTab('fourth');
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
    if (activeTab === 'second') {
        setActiveTab('first');
    }
    if (activeTab === 'third') {
        setActiveTab('second');
    }
    if (activeTab === 'fourth') {
        setActiveTab('third');
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

function goToFirstPage() {
  setActiveTab('first')
}

function goToLastPage(e) {
  e.preventDefault();
  setActiveTab('ninth')
}


  // ******************************************  EndFunction  ****************************************

    // ******************************************  Back function  ****************************************

  function handleBack() {
    history.push({
      pathname: "/transaction",
    });
  }


  function postData(e) {
    e.preventDefault()
    let allNotes = noteList.map(({ note }) => note)
    let note = allNotes.join("|")


  // ******************************************  Request body payload to the db  ***********************************


    const data = {
      clientName: clientName.current.value,
      originator: originator.current.value,
      transactor: transactor.current.value,
      transactionLegalLead: transactionLegalLead.current.value,
      industry: industry.current.value, 
      product: product.current.value,
      region: region.current.value,
      dealSize: +dealSize.current.value,
      coupon: +coupon.current.value,
      tenor: +tenor.current.value,
      moratorium: +moratorium.current.value,
      repaymentFrequency: repaymentFreq.current.value,
      amortizationStyle: amortizationStyle.current.value,
      mandateLetter: new Date(mandateLetter.current.value),
      creditApproval: new Date(creditApproval.current.value),
      feeLetter: new Date(feeLetter.current.value),
      expectedClose: new Date(exceptedClose.current.value),
      actualClose: new Date(actualClose.current.value),
      NBC_approval_date: new Date(nbcApprovalDate.current.value),
      NBC_submitted_date: new Date(nbcSubmittedDate.current.value),
      structuringFeeAmount: +amount.current.value,
      structuringFeeAdvance: +advance.current.value,
      structuringFeeFinal: +final.current.value,
      guaranteeFee: +guarantee.current.value,
      monitoringFee: +monitoring.current.value,
      reimbursible: +reimbursible.current.value,
      greenA: JSON.parse(greenA),
      greenB: JSON.parse(greenB),
      greenC: JSON.parse(greenC),
      greenD: JSON.parse(greenD),
      greenE: JSON.parse(greenE),
      greenF: JSON.parse(greenF),
      amberA: JSON.parse(amberA),
      amberB: JSON.parse(amberB),
      amberC: JSON.parse(amberC),
      amberD: JSON.parse(amberD),
      amberE: JSON.parse(amberE),
      redA: JSON.parse(redA),
      redB: JSON.parse(redB),
      redC: JSON.parse(redC),
      notes: note,

      // NBC Focus Data
      nbc_focus_original_1_b: JSON.parse(nbcOrg1b),
      nbc_focus_original_1_c: new Date(nbc_focus_original_1_c.current.value),
      nbc_focus_original_1_d: nbc_focus_original_1_d.current.value,

      nbc_focus_original_2_b: JSON.parse(nbcOrg2b),
      nbc_focus_original_2_c: new Date(nbc_focus_original_2_c.current.value),
      nbc_focus_original_2_d: nbc_focus_original_2_d.current.value,

      nbc_focus_original_3_b: JSON.parse(nbcOrg3b),
      nbc_focus_original_3_c: new Date(nbc_focus_original_3_c.current.value),
      nbc_focus_original_3_d: nbc_focus_original_3_d.current.value,

      nbc_focus_original_4_b: JSON.parse(nbcOrg4b),
      nbc_focus_original_4_c: new Date(nbc_focus_original_4_c.current.value),
      nbc_focus_original_4_d: nbc_focus_original_4_d.current.value,

      nbc_focus_original_5_b: JSON.parse(nbcOrg5b),
      nbc_focus_original_5_c: new Date(nbc_focus_original_5_c.current.value),
      nbc_focus_original_5_d: nbc_focus_original_5_d.current.value,

      nbc_focus_apprv_1_b: nbc_focus_apprv_1_b.current.value,
      nbc_focus_apprv_1_c: new Date(nbc_focus_apprv_1_c.current.value),

      nbc_focus_apprv_2_b: nbc_focus_apprv_2_b.current.value,
      nbc_focus_apprv_2_c: new Date(nbc_focus_apprv_2_c.current.value),

      nbc_focus_apprv_3_b: nbc_focus_apprv_3_b.current.value,
      nbc_focus_apprv_3_c: new Date(nbc_focus_apprv_3_c.current.value),

      nbc_focus_apprv_4_b: nbc_focus_apprv_4_b.current.value,
      nbc_focus_apprv_4_c: new Date(nbc_focus_apprv_4_c.current.value),

      nbc_focus_apprv_5_b: nbc_focus_apprv_5_b.current.value,
      nbc_focus_apprv_5_c: new Date(nbc_focus_apprv_5_c.current.value),

      //Parties data
      parties_1_b: parties_1_b.current.value,
      parties_1_c: JSON.parse(parties1C),
      parties_1_d: parties_1_d.current.value,

      parties_2_b: parties_2_b.current.value,
      parties_2_c: JSON.parse(parties2C),
      parties_2_d: parties_2_d.current.value,

      parties_3_b: parties_3_b.current.value,
      parties_3_c: JSON.parse(parties3C),
      parties_3_d: parties_3_d.current.value,

      parties_4_b: parties_4_b.current.value,
      parties_4_c: JSON.parse(parties4C),
      parties_4_d: parties_4_d.current.value,

      parties_5_b: parties_5_b.current.value,
      parties_5_c: JSON.parse(parties5C),
      parties_5_d: parties_5_d.current.value,

      parties_6_b: parties_6_b.current.value,
      parties_6_c: JSON.parse(parties6C),
      parties_6_d: parties_6_d.current.value,

      parties_7_b: parties_7_b.current.value,
      parties_7_c: JSON.parse(parties7C),
      parties_7_d: parties_7_d.current.value,

      parties_8_b: parties_8_b.current.value,
      parties_8_c: JSON.parse(parties8C),
      parties_8_d: parties_8_d.current.value,

      parties_9_b: parties_9_b.current.value,
      parties_9_c: JSON.parse(parties9C),
      parties_9_d: parties_9_d.current.value,

      parties_10_b: parties_10_b.current.value,
      parties_10_c: JSON.parse(parties10C),
      parties_10_d: parties_10_d.current.value,

      parties_11_b: parties_11_b.current.value,
      parties_11_c: JSON.parse(parties11C),
      parties_11_d: parties_11_d.current.value,

      // PLIS data
      plis_1_b: plis_1_b.current.value,
      plis_1_c: plis_1_c.current.value,
      plis_1_d: new Date(plis_1_d.current.value),
      plis_1_e: plis_1_e.current.value,

      plis_2_b: plis_2_b.current.value,
      plis_2_c: plis_2_c.current.value,
      plis_2_d: new Date(plis_2_d.current.value),
      plis_2_e: plis_2_e.current.value,

      plis_3_b: plis_3_b.current.value,
      plis_3_c: plis_3_c.current.value,
      plis_3_d: new Date(plis_3_d.current.value),
      plis_3_e: plis_3_e.current.value,

      plis_4_b: plis_4_b.current.value,
      plis_4_c: plis_4_c.current.value,
      plis_4_d: new Date(plis_4_d.current.value),
      plis_4_e: plis_4_e.current.value,

      plis_5_b: plis_5_b.current.value,
      plis_5_c: plis_5_c.current.value,
      plis_5_d: new Date(plis_5_d.current.value),
      plis_5_e: plis_5_e.current.value,

      plis_6_b: plis_6_b.current.value,
      plis_6_c: plis_6_c.current.value,
      plis_6_d: new Date(plis_6_d.current.value),
      plis_6_e: plis_6_e.current.value,

      // other cps data
      ocps_fac_1_b: JSON.parse(ocps_fac_1_b.current.value),
      ocps_fac_1_c: ocps_fac_1_c.current.value,
      ocps_fac_1_d: new Date(ocps_fac_1_d.current.value),
      ocps_fac_1_e: ocps_fac_1_e.current.value,
      ocps_fac_1_f: ocps_fac_1_f.current.value,

      ocps_fac_2_b: JSON.parse(ocps_fac_2_b.current.value),
      ocps_fac_2_c: ocps_fac_2_c.current.value,
      ocps_fac_2_d: new Date(ocps_fac_2_d.current.value),
      ocps_fac_2_e: ocps_fac_2_e.current.value,
      ocps_fac_2_f: ocps_fac_2_f.current.value,

      ocps_fac_3_b: JSON.parse(ocps_fac_3_b.current.value),
      ocps_fac_3_c: ocps_fac_3_c.current.value,
      ocps_fac_3_d: new Date(ocps_fac_3_d.current.value),
      ocps_fac_3_e: ocps_fac_3_e.current.value,
      ocps_fac_3_f: ocps_fac_3_f.current.value,

      ocps_fac_4_b: JSON.parse(ocps_fac_4_b.current.value),
      ocps_fac_4_c: ocps_fac_4_c.current.value,
      ocps_fac_4_d: new Date(ocps_fac_4_d.current.value),
      ocps_fac_4_e: ocps_fac_4_e.current.value,
      ocps_fac_4_f: ocps_fac_4_f.current.value,

      ocps_fac_5_b: JSON.parse(ocps_fac_5_b.current.value),
      ocps_fac_5_c: ocps_fac_5_c.current.value,
      ocps_fac_5_d: new Date(ocps_fac_5_d.current.value),
      ocps_fac_5_e: ocps_fac_5_e.current.value,
      ocps_fac_5_f: ocps_fac_5_f.current.value,

      ocps_fac_6_b: JSON.parse(ocps_fac_6_b.current.value),
      ocps_fac_6_c: ocps_fac_6_c.current.value,
      ocps_fac_6_d: new Date(ocps_fac_6_d.current.value),
      ocps_fac_6_e: ocps_fac_6_e.current.value,
      ocps_fac_6_f: ocps_fac_6_f.current.value,

      ocps_fac_7_b: JSON.parse(ocps_fac_7_b.current.value),
      ocps_fac_7_c: ocps_fac_7_c.current.value,
      ocps_fac_7_d: new Date(ocps_fac_7_d.current.value),
      ocps_fac_7_e: ocps_fac_7_e.current.value,
      ocps_fac_7_f: ocps_fac_7_f.current.value,

      ocps_fac_8_b: JSON.parse(ocps_fac_8_b.current.value),
      ocps_fac_8_c: ocps_fac_8_c.current.value,
      ocps_fac_8_d: new Date(ocps_fac_8_d.current.value),
      ocps_fac_8_e: ocps_fac_8_e.current.value,
      ocps_fac_8_f: ocps_fac_8_f.current.value,

      ocps_fac_9_b: JSON.parse(ocps_fac_9_b.current.value),
      ocps_fac_9_c: ocps_fac_9_c.current.value,
      ocps_fac_9_d: new Date(ocps_fac_9_d.current.value),
      ocps_fac_9_e: ocps_fac_9_e.current.value,
      ocps_fac_9_f: ocps_fac_9_f.current.value,

      ocps_fac_10_b: JSON.parse(ocps_fac_10_b.current.value),
      ocps_fac_10_c: ocps_fac_10_c.current.value,
      ocps_fac_10_d: new Date(ocps_fac_10_d.current.value),
      ocps_fac_10_e: ocps_fac_10_e.current.value,
      ocps_fac_10_f: ocps_fac_10_f.current.value,

      ocps_fac_11_b: JSON.parse(ocps_fac_11_b.current.value),
      ocps_fac_11_c: ocps_fac_11_c.current.value,
      ocps_fac_11_d: new Date(ocps_fac_11_d.current.value),
      ocps_fac_11_e: ocps_fac_11_e.current.value,
      ocps_fac_11_f: ocps_fac_11_f.current.value,

      ocps_fac_12_b: JSON.parse(ocps_fac_12_b.current.value),
      ocps_fac_12_c: ocps_fac_12_c.current.value,
      ocps_fac_12_d: new Date(ocps_fac_12_d.current.value),
      ocps_fac_12_e: ocps_fac_12_e.current.value,
      ocps_fac_12_f: ocps_fac_12_f.current.value,

      ocps_fac_13_b: JSON.parse(ocps_fac_13_b.current.value),
      ocps_fac_13_c: ocps_fac_13_c.current.value,
      ocps_fac_13_d: new Date(ocps_fac_13_d.current.value),
      ocps_fac_13_e: ocps_fac_13_e.current.value,
      ocps_fac_13_f: ocps_fac_13_f.current.value,

      ocps_fac_14_b: JSON.parse(ocps_fac_14_b.current.value),
      ocps_fac_14_c: ocps_fac_14_c.current.value,
      ocps_fac_14_d: new Date(ocps_fac_14_d.current.value),
      ocps_fac_14_e: ocps_fac_14_e.current.value,
      ocps_fac_14_f: ocps_fac_14_f.current.value,

      ocps_fac_15_b: JSON.parse(ocps_fac_15_b.current.value),
      ocps_fac_15_c: ocps_fac_15_c.current.value,
      ocps_fac_15_d: new Date(ocps_fac_15_d.current.value),
      ocps_fac_15_e: ocps_fac_15_e.current.value,
      ocps_fac_15_f: ocps_fac_15_f.current.value,

      ocps_fac_16_b: JSON.parse(ocps_fac_16_b.current.value),
      ocps_fac_16_c: ocps_fac_16_c.current.value,
      ocps_fac_16_d: new Date(ocps_fac_16_d.current.value),
      ocps_fac_16_e: ocps_fac_16_e.current.value,
      ocps_fac_16_f: ocps_fac_16_f.current.value,

      ocps_fac_17_b: JSON.parse(ocps_fac_17_b.current.value),
      ocps_fac_17_c: ocps_fac_17_c.current.value,
      ocps_fac_17_d: new Date(ocps_fac_17_d.current.value),
      ocps_fac_17_e: ocps_fac_17_e.current.value,
      ocps_fac_17_f: ocps_fac_17_f.current.value,

      ocps_fac_18_b: JSON.parse(ocps_fac_18_b.current.value),
      ocps_fac_18_c: ocps_fac_18_c.current.value,
      ocps_fac_18_d: new Date(ocps_fac_18_d.current.value),
      ocps_fac_18_e: ocps_fac_18_e.current.value,
      ocps_fac_18_f: ocps_fac_18_f.current.value,

      ocps_fac_19_b: JSON.parse(ocps_fac_19_b.current.value),
      ocps_fac_19_c: ocps_fac_19_c.current.value,
      ocps_fac_19_d: new Date(ocps_fac_19_d.current.value),
      ocps_fac_19_e: ocps_fac_19_e.current.value,
      ocps_fac_19_f: ocps_fac_19_f.current.value,

      ocps_fac_20_b: JSON.parse(ocps_fac_20_b.current.value),
      ocps_fac_20_c: ocps_fac_20_c.current.value,
      ocps_fac_20_d: new Date(ocps_fac_20_d.current.value),
      ocps_fac_20_e: ocps_fac_20_e.current.value,
      ocps_fac_20_f: ocps_fac_20_f.current.value,

      // Key Performance Indicator
      key_deal_fac_1_b: JSON.parse(key_deal_fac_1_b.current.value),  //B//oolean,
      key_deal_fac_1_c: key_deal_fac_1_c.current.value,  //V//ARCHAR,
      key_deal_fac_1_d: new Date(key_deal_fac_1_d.current.value),  //D//ATE,
      key_deal_fac_1_e: key_deal_fac_1_e.current.value,  //V//ARCHAR,
      key_deal_fac_1_f: key_deal_fac_1_f.current.value,  //V//ARCHAR,	
      key_deal_fac_2_b: JSON.parse(key_deal_fac_2_b.current.value),  //B//oolean,
      key_deal_fac_2_c: key_deal_fac_2_c.current.value,  //V//ARCHAR,
      key_deal_fac_2_d: new Date(key_deal_fac_2_d.current.value),  //D//ATE,
      key_deal_fac_2_e: key_deal_fac_2_e.current.value,  //V//ARCHAR,
      key_deal_fac_2_f: key_deal_fac_2_f.current.value,  //V//ARCHAR,
      key_deal_fac_3_b: JSON.parse(key_deal_fac_3_b.current.value),  //B//oolean,
      key_deal_fac_3_c: key_deal_fac_3_c.current.value,  //V//ARCHAR,
      key_deal_fac_3_d: new Date(key_deal_fac_3_d.current.value),  //D//ATE,
      key_deal_fac_3_e: key_deal_fac_3_e.current.value,  //V//ARCHAR,
      key_deal_fac_3_f: key_deal_fac_3_f.current.value,  //V//ARCHAR,
      key_deal_fac_4_b: JSON.parse(key_deal_fac_4_b.current.value),  //B//oolean,
      key_deal_fac_4_c: key_deal_fac_4_c.current.value,  //V//ARCHAR,
      key_deal_fac_4_d: new Date(key_deal_fac_4_d.current.value),  //D//ATE,
      key_deal_fac_4_e: key_deal_fac_4_e.current.value,  //V//ARCHAR,
      key_deal_fac_4_f: key_deal_fac_4_f.current.value,  //V//ARCHAR,
      key_deal_fac_5_b: JSON.parse(key_deal_fac_5_b.current.value),  //B//oolean,
      key_deal_fac_5_c: key_deal_fac_5_c.current.value,  //V//ARCHAR,
      key_deal_fac_5_d: new Date(key_deal_fac_5_d.current.value),  //D//ATE,
      key_deal_fac_5_e: key_deal_fac_5_e.current.value,  //V//ARCHAR,
      key_deal_fac_5_f: key_deal_fac_5_f.current.value,  //V//ARCHAR,
      key_deal_fac_6_b: JSON.parse(key_deal_fac_6_b.current.value),  //B//oolean,
      key_deal_fac_6_c: key_deal_fac_6_c.current.value,  //V//ARCHAR,
      key_deal_fac_6_d: new Date(key_deal_fac_6_d.current.value),  //D//ATE,
      key_deal_fac_6_e: key_deal_fac_6_e.current.value,  //V//ARCHAR,
      key_deal_fac_6_f: key_deal_fac_6_f.current.value,  //V//ARCHAR,
      key_deal_fac_7_b: JSON.parse(key_deal_fac_7_b.current.value),  //B//oolean,
      key_deal_fac_7_c: key_deal_fac_7_c.current.value,  //V//ARCHAR,
      key_deal_fac_7_d: new Date(key_deal_fac_7_d.current.value),  //D//ATE,
      key_deal_fac_7_e: key_deal_fac_7_e.current.value,  //V//ARCHAR,
      key_deal_fac_7_f: key_deal_fac_7_f.current.value,  //V//ARCHAR,
      key_deal_fac_8_b: JSON.parse(key_deal_fac_8_b.current.value),  //B//oolean,
      key_deal_fac_8_c: key_deal_fac_8_c.current.value,  //V//ARCHAR,
      key_deal_fac_8_d: new Date(key_deal_fac_8_d.current.value),  //D//ATE,
      key_deal_fac_8_e: key_deal_fac_8_e.current.value,  //V//ARCHAR,
      key_deal_fac_8_f: key_deal_fac_8_f.current.value,  //V//ARCHAR,
      key_deal_fac_9_b: JSON.parse(key_deal_fac_9_b.current.value),  //B//oolean,
      key_deal_fac_9_c: key_deal_fac_9_c.current.value,  //V//ARCHAR,
      key_deal_fac_9_d: new Date(key_deal_fac_9_d.current.value),  //D//ATE,
      key_deal_fac_9_e: key_deal_fac_9_e.current.value,  //V//ARCHAR,
      key_deal_fac_9_f: key_deal_fac_9_f.current.value,  //V//ARCHAR,
      key_deal_fac_10_b: JSON.parse(key_deal_fac_10_b.current.value),	//Boolean,
      key_deal_fac_10_c: key_deal_fac_10_c.current.value,	//VARCHAR,
      key_deal_fac_10_d: new Date(key_deal_fac_10_d.current.value),	//DATE,
      key_deal_fac_10_e: key_deal_fac_10_e.current.value,	//VARCHAR,
      key_deal_fac_10_f: key_deal_fac_10_f.current.value,	//VARCHAR,
      key_deal_fac_11_b: JSON.parse(key_deal_fac_11_b.current.value),	//Boolean,
      key_deal_fac_11_c: key_deal_fac_11_c.current.value,	//VARCHAR,
      key_deal_fac_11_d: new Date(key_deal_fac_11_d.current.value),	//DATE,
      key_deal_fac_11_e: key_deal_fac_11_e.current.value,	//VARCHAR,
      key_deal_fac_11_f: key_deal_fac_11_f.current.value,	//VARCHAR,
      key_deal_fac_12_b: JSON.parse(key_deal_fac_12_b.current.value),	//Boolean,
      key_deal_fac_12_c: key_deal_fac_12_c.current.value,	//VARCHAR,
      key_deal_fac_12_d: new Date(key_deal_fac_12_d.current.value),	//DATE,
      key_deal_fac_12_e: key_deal_fac_12_e.current.value,	//VARCHAR,
      key_deal_fac_12_f: key_deal_fac_12_f.current.value,	//VARCHAR,
      key_deal_fac_13_b: JSON.parse(key_deal_fac_13_b.current.value),	//Boolean,
      key_deal_fac_13_c: key_deal_fac_13_c.current.value,	//VARCHAR,
      key_deal_fac_13_d: new Date(key_deal_fac_13_d.current.value),	//DATE,
      key_deal_fac_13_e: key_deal_fac_13_e.current.value,	//VARCHAR,
      key_deal_fac_13_f: key_deal_fac_13_f.current.value,	//VARCHAR,
      key_deal_fac_14_b: JSON.parse(key_deal_fac_14_b.current.value),	//Boolean,
      key_deal_fac_14_c: key_deal_fac_14_c.current.value,	//VARCHAR,
      key_deal_fac_14_d: new Date(key_deal_fac_14_d.current.value),	//DATE,
      key_deal_fac_14_e: key_deal_fac_14_e.current.value,	//VARCHAR,
      key_deal_fac_14_f: key_deal_fac_14_f.current.value,	//VARCHAR,
      key_deal_fac_15_b: JSON.parse(key_deal_fac_15_b.current.value),	//Boolean,
      key_deal_fac_15_c: key_deal_fac_15_c.current.value,	//VARCHAR,
      key_deal_fac_15_d: new Date(key_deal_fac_15_d.current.value),	//DATE,
      key_deal_fac_15_e: key_deal_fac_15_e.current.value,	//VARCHAR,
      key_deal_fac_15_f: key_deal_fac_15_f.current.value,	//VARCHAR,
      key_deal_fac_16_b: JSON.parse(key_deal_fac_16_b.current.value),	//Boolean,
      key_deal_fac_16_c: key_deal_fac_16_c.current.value,	//DATE,
      key_deal_fac_17_b: JSON.parse(key_deal_fac_17_b.current.value),	//Boolean,
      key_deal_fac_17_c: key_deal_fac_17_c.current.value,	//DATE,
      key_deal_fac_18_b: JSON.parse( key_deal_fac_18_b.current.value),	//Boolean,
      key_deal_fac_18_c: key_deal_fac_18_c.current.value,	//DATE,
      key_deal_fac_19_b: JSON.parse(key_deal_fac_19_b.current.value),	//Boolean,
      key_deal_fac_19_c: key_deal_fac_19_c.current.value,	//DATE,
      key_deal_fac_20_b: JSON.parse( key_deal_fac_20_b.current.value),	//Boolean,
      key_deal_fac_20_c: key_deal_fac_20_c.current.value,	//DATE,
      key_deal_fac_21_b: JSON.parse(key_deal_fac_21_b.current.value),	//Boolean,
      key_deal_fac_21_c: key_deal_fac_21_c.current.value,	//DATE,
      key_deal_fac_22_b: JSON.parse(key_deal_fac_22_b.current.value),	//Boolean,
      key_deal_fac_22_c: key_deal_fac_22_c.current.value,	//DATE,
      key_deal_fac_23_b: JSON.parse(key_deal_fac_23_b.current.value),	//Boolean,
      key_deal_fac_23_c: key_deal_fac_23_c.current.value,	//DATE
    }

        // ******************************************  Axios :  put request  ****************************************

      Service.updateDeal(id, data)
        .then((response) => {
          history.push({
            pathname: "/transaction",
          });
        })
        .catch(error => {
          setMessage('Failed to update deal')
        })      
    }

  return (
    <React.Fragment>
      {/* ---------------------- Update Transaction Forms ----------- */}
        <FormWrapper>
          <Container fluid style={{marginTop:'0'}}>
            {status ? (
            <Form> 
              <h5 className='text-secondary pb-3 mb-2'>Update Transaction</h5>
              <br/>
              <div> 

       
      <Tabs 
      //activeKey={activeTab} 
      onSelect={(k) => handleTabChange} style={{fontSize:'12px'}}>

{/* ----------------------------------------- Client Data ------------------------------------ */}
		<Tab eventKey="first" title="TRANSACTION">
        <br/>
        <Container1>
            <Container>
                <Row className='mt-3 pt-3'>
                  <Col sm={6}>
                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                      <Form.Label>Client Name</Form.Label>
                    <Form.Control size="sm" type="text" defaultValue={deal[0].clientname} id='client' ref={clientName} required disabled/>
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                      <Form.Label>Originator</Form.Label>
                      <Form.Select size="sm" id='originator' ref={originator}>
                        {staffList.map((opt, i) => (
                          <option key={staffList[i].email} value={staffList[i].stafflist} selected={staffList[i].stafflist === deal[0].originator}>
                            {staffList[i].stafflist}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                      <Form.Label>Transactor</Form.Label>
                      <Form.Select size="sm" id='transactor' ref={transactor}>
                        {staffList.map((opt, i) => (
                          <option key={staffList[i].email} value={staffList[i].stafflist} selected={staffList[i].stafflist === deal[0].transactor}>
                            {staffList[i].stafflist}
                          </option>
                        ))}
                      </Form.Select>                      
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                      <Form.Label>Transaction Legal Lead</Form.Label>
                      <Form.Select size="sm" id='transactionLegalLead' ref={transactionLegalLead}>
                        {staffList.map((opt, i) => (
                          <option key={staffList[i].email} value={staffList[i].stafflist} selected={staffList[i].stafflist === deal[0].transactionlegallead}>
                            {staffList[i].stafflist}
                          </option>
                        ))}
                      </Form.Select>  
                    </Form.Group>
                  </Col>
                                    
                  <Col sm={12}>
                    <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                      <Form.Label>Note</Form.Label> <button type = "button" style={{fontSize: '10px', padding: '2px 10px', margin: '8px', background: 'steelblue', color: 'white', borderRadius: '3px'}} onClick={handleNoteAdd}>+</button> 
                          {noteList.map((singleNote, index) => (
                                <div class="input-group">
                                <Form.Control style={{ margin: '0.8em', width: '60%' }} size="sm" type="text" defaultValue={singleNote} value={singleNote.note} name='note'  onChange={(e) => handleNoteChange(e, index)}
                                required /> 
                                <button type = "button" style={{fontSize: '10px', padding: '2px 10px', margin: '8px', background: 'steelblue', color: 'white', borderRadius: '3px'}} onClick={handleNoteRemove}>x</button> 
                              </div>
                          ))} 
                    </Form.Group>  

                                   
                  </Col>

                </Row>
                <br />
                {/* <button onClick={e => toNextTab(e)} style={{ display: 'inlineBlock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>Next </button> */}
                {/* <button onClick={e => goToLastPage(e)} style={{ display: 'inlineBlock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>{'>>'}</button> */}
                </Container>
                </Container1> 
		</Tab>
        
{/*------------------------------------------ End Tab -------------------------------------- */}

{/*--------------------------------------- Deal Profile Fees and Reimbursement -------------- */}
		<Tab eventKey="second" title="DEAL PROFILE ">
            <br/>
            <Container1>
                <br/>
                <div className='mt-2'>
                  
                    
                  <Row>
                    <Col sm={6} className='my-0 py-0'>
                      <Form.Group className="">
                        <Form.Label>Industry</Form.Label>
                        <Form.Select size="sm" id='industry' ref={industry}>
                          {industries.map((opt, i) => (
                            <option key={industries[i].industryid} value={industries[i].industry} selected={industries[i].industry === deal[0].industry}>
                              {industries[i].industry}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="">
                        <Form.Label>Products</Form.Label>
                        <Form.Select size="sm" id='products' ref={product}>
                          {products.map((opt, i) => (
                            <option key={products[i].productid} value={products[i].product} selected={products[i].product === deal[0].product}>
                              {products[i].product}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="">
                        <Form.Label>Region</Form.Label>
                        <Form.Select size="sm" id='region' ref={region}>
                          {regions.map((opt, i) => (
                            <option key={regions[i].regionid} value={regions[i].region} selected={regions[i].region === deal[0].region}>
                              {regions[i].region}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className='mt-1'>
                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Deal Size (₦'BN)</Form.Label>
                      <Form.Control size="sm" type="text" defaultValue={deal[0].dealsize} id='dealSize' ref={dealSize} required/>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Coupon(%)</Form.Label>
                        <Form.Control size="sm" type="text" defaultValue={deal[0].coupon}  id='coupon' ref={coupon}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Tenor(yrs)</Form.Label>
                      <Form.Control size="sm" type="numeric" defaultValue={deal[0].tenor} id='tenor' ref={tenor}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Moratorium(yrs)</Form.Label>
                        <Form.Control size="sm" type="text" defaultValue={deal[0].moratorium}  id='moratorium' ref={moratorium}/>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className='mt-1' >
                    <Col sm={6}>
                      <Form.Group className="">
                        <Form.Label>Repayment Frequency</Form.Label>
                        <Form.Select size="sm" id='frequency' ref={repaymentFreq}>
                          {frequency.map((opt, i) => (
                              <option key={frequency[i].id} value={frequency[i].frequency} selected={frequency[i].frequency === deal[0].repaymentfrequency}>
                                {frequency[i].frequency}
                              </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="">
                        <Form.Label>Amortisation Style</Form.Label>
                        <Form.Select size="sm" id='amortizationStyle' ref={amortizationStyle}>
                         {style.map((opt, i) => (
                            <option key={style[i].id} value={style[i].amortizationstyle} selected={style[i].amortizationstyle === deal[0].amortizationstyle}>
                              {style[i].amortizationstyle}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className='mt-1 pt-3' >
                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Mandate Letter</Form.Label>
                      <Form.Control size="sm" type="date" defaultValue={deal[0].mandateletter ? new Date(deal[0].mandateletter).toISOString().split('T')[0] : ""} id='mandateLetter' ref={mandateLetter} required/>
                      </Form.Group>
                    </Col>
                  
                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Credit Approval</Form.Label>
                        <Form.Control size="sm" type="date" defaultValue={deal[0].creditapproval ? new Date(deal[0].creditapproval).toISOString().split('T')[0] : ""} id='creditApproval' ref={creditApproval}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Fee Letter</Form.Label>
                        <Form.Control size="sm" type="date" defaultValue={deal[0].feeletter ? new Date(deal[0].feeletter).toISOString().split('T')[0] : ""} id='feeLetter' ref={feeLetter}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Expected Close</Form.Label>
                        <Form.Control size="sm" type="date" defaultValue={deal[0].expectedclose ? new Date(deal[0].expectedclose).toISOString().split('T')[0] : ""} id='expectedClose' ref={exceptedClose}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>Actual Close</Form.Label>
                        <Form.Control size="sm" type="date" defaultValue={deal[0].actualclose ? new Date(deal[0].actualclose).toISOString().split('T')[0] : ""} id='actualClose' ref={actualClose}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>NBC Approval</Form.Label>
                        <Form.Control size="sm" type="date" defaultValue={deal[0].nbc_approval_date ? new Date(deal[0].nbc_approval_date).toISOString().split('T')[0] : ""} id='nbcApprovalDate' ref={nbcApprovalDate}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="pt-1">
                        <Form.Label>NBC Submission</Form.Label>
                        <Form.Control size="sm" type="date" defaultValue={deal[0].nbc_submitted_date ? new Date(deal[0].nbc_submitted_date).toISOString().split('T')[0] : ""} id='nbcSubmittedDate' ref={nbcSubmittedDate}/>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <br/>
                {/* <button onClick={e => toPrevTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}> Prev</button> */}
                {/* <button onClick={e => toNextTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>Next</button> */}
                </Container1>
	
		</Tab>
{/*---------------------------------------------- End Tab ----------------------------------- */}

{/*------------------------------------------------ Structuring Fees ------------------------- */}

		<Tab eventKey="third" title="FEES">
        <div className='mt-2'>

                
                  <Container1>

                    <br/>
                  <Row>
                    <Col sm={6} className='my-0 py-0'>
                      <Form.Group>
                        <Form.Label>Amount(₦'MN)</Form.Label>
                      <Form.Control size="sm" type="text" defaultValue={deal[0].structuringfeeamount} id='amount' ref={amount}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6} className='my-0 py-0'>
                      <Form.Group>
                        <Form.Label>Advance(%)</Form.Label>
                      <Form.Control size="sm" type="text" defaultValue={deal[0].structuringfeeadvance} id='advance' ref={advance}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6} className='my-0 py-0'>
                      <Form.Group>
                        <Form.Label>Final(%)</Form.Label>
                      <Form.Control size="sm" type="text" defaultValue={deal[0].structuringfeefinal} id='final' disabled ref={final}/>
                      </Form.Group>
                    </Col>
                 
                    <Col sm={6} className='my-0 py-0'>
                      <Form.Group className="pt-1">
                        <Form.Label>Guarantee (%)</Form.Label>
                      <Form.Control size="sm" type="text" defaultValue={deal[0].guaranteefee} id='guarantee' ref={guarantee}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6} className='my-0 py-0'>
                      <Form.Group className="pt-1">
                        <Form.Label>Monitoring(₦'MN)</Form.Label>
                      <Form.Control size="sm" type="text" defaultValue={deal[0].monitoringfee} id='monitoring' ref={monitoring}/>
                      </Form.Group>
                    </Col>

                    <Col sm={6} className='my-0 pb-2'>
                      <Form.Group className="pt-1">
                        <Form.Label>Reimbursible(₦'MN)</Form.Label>
                      <Form.Control size="sm" type="text" defaultValue={deal[0].reimbursible} id='reimbursible' ref={reimbursible}/>
                      </Form.Group>
                    </Col>
                  </Row>
                  <br/>
                  {/* <button onClick={e => toPrevTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}> Prev</button> */}
                  {/* <button onClick={e => toNextTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>Next</button> */}
                  </Container1>
                </div>
		</Tab>

{/*--------------------------------------------- End Tab --------------------------------- */}
           
{/*----------------------------------------------     ----------------------- --------------- */}

        <Tab eventKey="fourth" title="DEAL CATEGORY"  style={{fontSize:'12px'}}>
            {/* <br/>
          
        <Tabs defaultActiveKey="first1" className='text-secondary'>
        <Tab eventKey="first1" title="RED TRANSACTION CATEGORY" >
            <br/> */}
        <Container1>
        <div id='redCategory' className='pt-2 mt-1 mb-3 pb-3'>
            {/* <br/> */}
                    <PWrapper>
                      <h6 className="pt-1" style={{fontSize: "10px", color: "red"}}>Red Category</h6>
                    </PWrapper>

                    <Col sm={12}>
                      <Form.Group>
                        <Row>
                          <Col>
                            <Form.Label style={{paddingRight: "1rem"}}>Mandate Letter signed:</Form.Label>
                          </Col>
                          <Col>
                            <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].reda === true} name="redA" onChange={e => setRedA(e.target.value)}/>
                            <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].reda === false} name="redA" onChange={e => setRedA(e.target.value)}/>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Col>

                    <Col sm={12}>
                      <Form.Group>
                        <Row>
                          <Col>
                            <Form.Label style={{paddingRight: "1rem"}}>Due diligence ongoing:</Form.Label>
                          </Col>
                          <Col>
                              <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].redb === true} name="redB" onChange={e => setRedB(e.target.value)}/>
                              <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].redb === false} name="redB" onChange={e => setRedB(e.target.value)}/>
                            </Col>
                        </Row>
                      </Form.Group>
                    </Col>

                    <Col sm={12}>
                      <Form.Group>
                        <Row>
                          <Col>
                            <Form.Label style={{paddingRight: "1rem"}}>Pending Credit Committee approval:</Form.Label>
                          </Col>
                          <Col>
                            <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].redc === true} name="redC" onChange={e => setRedC(e.target.value)} />
                            <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].redc === false} name="redC" onChange={e => setRedC(e.target.value)}/>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Col>

                  </div>
                  </Container1>
        {/* </Tab> */}

{/*------------------------------------- ------------------------- ------------------------- */}
        {/* <Tab  eventKey="second1" title="AMBER TRANSACTION CATEGORY"> */}
        <Container1>
        <div id='amberCategory' className='pt-2 mt-1 mb-3 pb-3'>
                    <PWrapper>
                      <h6 className="pt-1" style={{fontSize: "10px", color: "#FFC200"}}>Amber Category</h6>
                    </PWrapper>

                    <Col sm={12}>
                      <Form.Group>
                        <Row>
                          <Col>
                            <Form.Label style={{paddingRight: "1rem"}}>Mandate Letter signed:</Form.Label>
                          </Col>
                          <Col>
                            <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].ambera === true} name="amberA" onChange={e => setAmberA(e.target.value)}/>
                            <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].ambera === false} name="amberA" onChange={e => setAmberA(e.target.value)}/>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Col>

                    <Col sm={12}>
                      <Form.Group>
                        <Row>
                          <Col>
                            <Form.Label style={{paddingRight: "1rem"}}>Transaction has obtained Credit Committe approval:</Form.Label>
                          </Col>
                          <Col>
                            <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].amberb === true} name="amberB" onChange={e => setAmberB(e.target.value)}/>
                            <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].amberb === false} name="amberB" onChange={e => setAmberB(e.target.value)}/>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Col>

                    <Col sm={12}>
                      <Form.Group>
                        <Row>
                          <Col>
                            <Form.Label style={{paddingRight: "1rem"}}>Professional Parties to the Bond issue appointed or selected:</Form.Label>
                          </Col>
                          <Col>
                            <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].amberc === true} name="amberC" onChange={e => setAmberC(e.target.value)}/>
                            <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].amberc === false} name="amberC" onChange={e => setAmberC(e.target.value)}/>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Col>

                    <Col sm={12}>
                      <Form.Group>
                        <Row>
                          <Col>
                            <Form.Label style={{paddingRight: "1rem"}}>Fee Letter and/or Guarantee Documentation expected to be negotiated and/or signed within 8 weeks:</Form.Label>
                          </Col>
                          <Col>
                            <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].amberd === true} name="amberD" onChange={e => setAmberD(e.target.value)}/>
                            <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].amberd === false} name="amberD" onChange={e => setAmberD(e.target.value)}/>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Col>

                    <Col sm={12}>
                      <Form.Group>
                        <Row>
                          <Col>
                            <Form.Label style={{paddingRight: "1rem"}}>All Materials CPs with timelines for completion agreed with the client:</Form.Label>
                          </Col>
                          <Col>
                            <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].ambere === true} name="amberE" onChange={e => setAmberE(e.target.value)}/>
                            <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].ambere === false} name="amberE" onChange={e => setAmberE(e.target.value)}/>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Col>
                  </div>
                  </Container1>
        {/* </Tab> */}
{/*-------------------------------------- --------------------------------------------------- */}
        {/* <Tab eventKey="green" title="GREEN TRANSACTION CATEGORY"> */}
        <Container1>
          <div id='greenCategory' className='pt-2 mt-1 mb-2 pb-2'>
            <PWrapper>
              <h6 className="pt-1" style={{fontSize: "10px", color: "green"}}>Green Category</h6>
            </PWrapper>

            <Form.Group>
            <Row>
              <Col sm={12}>
              <Form.Group>
              <Row>
                <Col>
                  <Form.Label style={{paddingRight: "1rem"}}>Transaction has obtained Credit Committee approval:</Form.Label>
                </Col>  
                <Col>    
                  <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].greena === true} name="greenA" onChange={e => setGreenA(e.target.value)}/>
                  <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].greena === false} name="greenA" onChange={e => setGreenA(e.target.value)}/> 
                </Col>
                </Row>  
                </Form.Group>  
              </Col>

  {/*--------------------------------------------- -------------------------- --------------- */}
              <Col sm={12}>
              <Form.Group>
              <Row>
                <Col>
                <Form.Label style={{paddingRight: "1rem"}}>Guarantee Document in agreed form:</Form.Label>
                </Col>  
                <Col>    
                  <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].greenb === true} name="greenB" onChange={e => setGreenB(e.target.value)}/>
                  <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].greenb === false} name="greenB" onChange={e => setGreenB(e.target.value)} />         
                </Col>
                </Row>  
                      </Form.Group>
                    
              </Col>


  {/**---------------------------------------------------------------------------------------- */}
              <Col sm={12}>
              <Form.Group>
              <Row>
                <Col>
                <Form.Label style={{paddingRight: "1rem"}}>Professional Parties to the Bond Issue appointed or selected:</Form.Label>
                </Col>  
                <Col>    
                      <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].greenc === true} name="greenC" onChange={e => setGreenC(e.target.value)}/>
                        <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].greenc === false} name="greenC" onChange={e => setGreenC(e.target.value)}/>  
                </Col>
                </Row> 
                      </Form.Group>
                    
              </Col>

  {/*--------------------------------------------------------------------------------------- */}
              <Col sm={12}>
              <Form.Group>
              <Row>
                <Col>
                <Form.Label style={{paddingRight: "1rem"}}>Already filed or expected filing with SEC (or equivalent Exchange) within 6 weeks:</Form.Label>
                </Col>  
                <Col>    
                      <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].greend === true} name="greenD" onChange={e => setGreenD(e.target.value)}/>
                        <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].greend === false} name="greenD" onChange={e => setGreenD(e.target.value)}/>
                      
                </Col>
                </Row>    
                      </Form.Group>
                    
              </Col>
  {/*---------------------------------------------------------------------------------------- */}
              <Col sm={12}>
              <Form.Group>
              <Row>
                <Col>
                <Form.Label style={{paddingRight: "1rem"}}>All Materials CPs to Financial Close have been satisfactorily met or committed by the Client for completion on or before Financial Close:</Form.Label>
                </Col>  
                <Col>    
                      <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].greene === true} name="greenE" onChange={e => setGreenE(e.target.value)}/>
                        <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].greene === false} name="greenE" onChange={e => setGreenE(e.target.value)}/>  
                </Col>
                </Row>
                      </Form.Group>

                    
              </Col>
  {/*-------------------------------------------------------------------------------------- */}
              <Col sm={12}>
              <Form.Group>
              <Row>
                <Col>
            <Form.Label style={{paddingRight: "1rem"}}>Financial Close expected within 3-6 months:</Form.Label>            
                </Col>  
                <Col>    
                      <Form.Check inline label="Yes" type="radio" value={true} defaultChecked={deal[0].greenf === true} name="greenF" onChange={e => setGreenF(e.target.value)}/>
                      <Form.Check inline label="No" type="radio" value={false} defaultChecked={deal[0].greenf === false} name="greenF" onChange={e => setGreenF(e.target.value)}/>
                </Col>
                </Row>      
              </Form.Group>
                    
              </Col>
  {/*-------------------------------------------------------------------------------------------- */}   
            </Row>
            </Form.Group>
          </div>
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
        </Container1>
        {/* </Tab> */}
        {/* </Tabs> */}
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
                            <Col>
                              <PWrapper>ORIGINAL NBC DD FOCUS</PWrapper>
                              <br />
                            </Col>
                            <Col>
                              <PWrapper>YES/NO</PWrapper>
                            </Col>
                            <Col>
                              <PWrapper>DATE</PWrapper>
                            </Col>
                            <Col>
                              <PWrapper>METHODOLOGY</PWrapper>
                            </Col>
                          </Row>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={3}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                    Strength of Contracts:
                                  </Form.Label>
                                </Col>
                                <Col sm={3}>
                                  <Form.Check
                                    inline
                                    label="Yes"
                                    type="radio"
                                    name="nbcOrg1b"
                                    defaultChecked={deal[0].nbc_focus_original_1_b === true} 
                                    onChange={e => setNbcOrg1b(e.target.value)}
                                    value={true}
                                  />
                                  <Form.Check
                                    inline
                                    label="No"
                                    type="radio"
                                    name="nbcOrg1b"
                                    defaultChecked={deal[0].nbc_focus_original_1_b === false} 
                                    onChange={e => setNbcOrg1b(e.target.value)}
                                    value={false}
                                  />
                                </Col>
                                <Col sm={3}>
                                  <Form.Control
                                    size="sm"
                                    type="date"
                                    defaultValue={deal[0].nbc_focus_original_1_c ? new Date(deal[0].nbc_focus_original_1_c).toISOString().split('T')[0] : ""}
                                    ref={nbc_focus_original_1_c}
                                    style={{
                                      width: "80%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={3}>
                                  <Form.Control
                                    as="textarea"
                                    defaultValue={deal[0].nbc_focus_original_1_d}
                                    ref={nbc_focus_original_1_d}
                                    style={{ height: "30px", fontSize:"12px" }}
                                  ></Form.Control>
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={3}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                    Sponsor Equity:
                                  </Form.Label>
                                </Col>
                                <Col sm={3}>
                                  <Form.Check
                                    inline
                                    label="Yes"
                                    type="radio"
                                    name="nbcOrg2b"
                                    defaultChecked={deal[0].nbc_focus_original_2_b === true} 
                                    onChange={e => setNbcOrg2b(e.target.value)}
                                    value={true}
                                  />
                                  <Form.Check
                                    inline
                                    label="No"
                                    type="radio"
                                    name="nbcOrg2b"
                                    defaultChecked={deal[0].nbc_focus_original_2_b === false} 
                                    onChange={e => setNbcOrg2b(e.target.value)}
                                    value={false}
                                  />
                                </Col>
                                <Col sm={3}>
                                  <Form.Control
                                    size="sm"
                                    type="date"
                                    defaultValue={deal[0].nbc_focus_original_2_c ? new Date(deal[0].nbc_focus_original_2_c).toISOString().split('T')[0] : ""}
                                    ref={nbc_focus_original_2_c}
                                    style={{
                                      width: "80%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={3}>
                                  <Form.Control
                                    as="textarea"
                                    defaultValue={deal[0].nbc_focus_original_2_d}
                                    ref={nbc_focus_original_2_d}
                                    style={{ height: "30px", fontSize:"12px" }}
                                  ></Form.Control>
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                          <Col sm={12}>
                            <Col className="pb-2">
                              <Form.Group>
                                <Row>
                                  <Col sm={3}>
                                    <Form.Label style={{ paddingRight: "1rem" }}>
                                      Regulatory Approval:
                                    </Form.Label>
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      name="nbcOrg3b"
                                      defaultChecked={deal[0].nbc_focus_original_3_b === true} 
                                      onChange={e => setNbcOrg3b(e.target.value)}
                                      value={true}
                                    />
                                    <Form.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      name="nbcOrg3b"
                                      defaultChecked={deal[0].nbc_focus_original_3_b === false} 
                                      onChange={e => setNbcOrg3b(e.target.value)}
                                      value={false}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      size="sm"
                                      type="date"
                                      defaultValue={deal[0].nbc_focus_original_3_c ? new Date(deal[0].nbc_focus_original_3_c).toISOString().split('T')[0] : ""}
                                      ref={nbc_focus_original_3_c}
                                      style={{
                                        width: "80%",
                                        padding: "2px 1px",
                                        focus: "none",
                                        fontSize: "12px"
                                      }}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      as="textarea"
                                      defaultValue={deal[0].nbc_focus_original_3_d}
                                      ref={nbc_focus_original_3_d}
                                      style={{ height: "30px", fontSize:"12px" }}
                                    ></Form.Control>
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                          </Col>
                          <Col sm={12}>
                            <Col className="pb-2">
                              <Form.Group>
                                <Row>
                                  <Col sm={3}>
                                    <Form.Label style={{ paddingRight: "1rem" }}>
                                      Technical Validation:
                                    </Form.Label>
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      name="nbcOrg4b"
                                      defaultChecked={deal[0].nbc_focus_original_4_b === true} 
                                      onChange={e => setNbcOrg4b(e.target.value)}
                                      value={true}
                                    />
                                    <Form.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      name="nbcOrg4b"
                                      defaultChecked={deal[0].nbc_focus_original_4_b === false} 
                                      onChange={e => setNbcOrg4b(e.target.value)}
                                      value={false}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      size="sm"
                                      type="date"
                                      defaultValue={deal[0].nbc_focus_original_4_c ? new Date(deal[0].nbc_focus_original_4_c).toISOString().split('T')[0] : ""}
                                      ref={nbc_focus_original_4_c}
                                      style={{
                                        width: "80%",
                                        padding: "2px 1px",
                                        focus: "none",
                                        fontSize: "12px"
                                      }}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      as="textarea"
                                      defaultValue={deal[0].nbc_focus_original_4_d}
                                      ref={nbc_focus_original_4_d}
                                      style={{ height: "30px", fontSize:"12px" }}
                                    ></Form.Control>
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                          </Col>
                          <Col sm={12}>
                            <Col className="pb-2">
                              <Form.Group>
                                <Row>
                                  <Col sm={3}>
                                    <Form.Label style={{ paddingRight: "1rem" }}>
                                      Competitive Landscape:
                                    </Form.Label>
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      name="nbcOrg5b"
                                      defaultChecked={deal[0].nbc_focus_original_5_b === true} 
                                      onChange={e => setNbcOrg5b(e.target.value)}
                                      value={true}
                                    />
                                    <Form.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      name="nbcOrg5b"
                                      defaultChecked={deal[0].nbc_focus_original_5_b === false} 
                                      onChange={e => setNbcOrg5b(e.target.value)}
                                      value={false}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      size="sm"
                                      type="date"
                                      defaultValue={deal[0].nbc_focus_original_5_c ? new Date(deal[0].nbc_focus_original_5_c).toISOString().split('T')[0] : ""}
                                      ref={nbc_focus_original_5_c}
                                      style={{
                                        width: "80%",
                                        padding: "2px 1px",
                                        focus: "none",
                                        fontSize: "12px"
                                      }}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      as="textarea"
                                      defaultValue={deal[0].nbc_focus_original_5_d}
                                      ref={nbc_focus_original_5_d}
                                      style={{ height: "30px", fontSize:"12px" }}
                                    ></Form.Control>
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                          </Col>
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
                              <Form.Group>
                                <Row>
                                  <Col sm={5}>
                                    <Form.Label style={{ paddingRight: "1rem" }}>
                                      MROC Pre_NBC Approval ( Link to Doc)
                                    </Form.Label>
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      name="pre_nbc"
                                      defaultChecked={deal[0].nbc_focus_apprv_1_b === "true"}
                                      ref={nbc_focus_apprv_1_b}
                                      value={true}
                                    />
                                    <Form.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      name="pre_nbc"
                                      defaultChecked={deal[0].nbc_focus_apprv_1_b === "false"}
                                      ref={nbc_focus_apprv_1_b}
                                      value={false}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      size="sm"
                                      type="date"
                                      defaultValue={deal[0].nbc_focus_apprv_1_c ? new Date(deal[0].nbc_focus_apprv_1_c).toISOString().split('T')[0] : ""}
                                      ref={nbc_focus_apprv_1_c}
                                      style={{
                                        width: "80%",
                                        padding: "2px 1px",
                                        focus: "none",
                                        fontSize: "12px"
                                      }}
                                    />
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                          </Col>
                          <Col sm={12}>
                            <Col className="pb-2">
                              <Form.Group>
                                <Row>
                                  <Col sm={5}>
                                    <Form.Label style={{ paddingRight: "1rem" }}>
                                      MROC Pre_NBC Minutes. ( Link to Doc)
                                    </Form.Label>
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      name="minutes"
                                      defaultChecked={deal[0].nbc_focus_apprv_2_b === "true"}
                                      ref={nbc_focus_apprv_2_b}
                                      value={true}
                                    />
                                    <Form.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      name="minutes"
                                      value={false}
                                      defaultChecked={deal[0].nbc_focus_apprv_2_b === "false"}
                                      ref={nbc_focus_apprv_2_b}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      size="sm"
                                      type="date"
                                      defaultValue={deal[0].nbc_focus_apprv_2_c ? new Date(deal[0].nbc_focus_apprv_2_c).toISOString().split('T')[0] : ""}
                                      ref={nbc_focus_apprv_2_c}
                                      style={{
                                        width: "80%",
                                        padding: "2px 1px",
                                        focus: "none",
                                        fontSize: "12px"
                                      }}
                                    />
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                          </Col>
                          <Col sm={12}>
                            <Col className="pb-2">
                              <Form.Group>
                                <Row>
                                  <Col sm={5}>
                                    <Form.Label style={{ paddingRight: "1rem" }}>
                                      NBC Approval ( Link to Doc)
                                    </Form.Label>
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      name="nbc_app"
                                      value={true}
                                      defaultChecked={deal[0].nbc_focus_apprv_3_b === "true"}
                                      ref={nbc_focus_apprv_3_b}
                                    />
                                    <Form.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      name="nbc_app"
                                      value={false}
                                      defaultChecked={deal[0].nbc_focus_apprv_3_b === "false"}
                                      ref={nbc_focus_apprv_3_b}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      size="sm"
                                      type="date"
                                      defaultValue={deal[0].nbc_focus_apprv_3_c ? new Date(deal[0].nbc_focus_apprv_3_c).toISOString().split('T')[0] : ""}
                                      ref={nbc_focus_apprv_3_c}
                                      style={{
                                        width: "80%",
                                        padding: "2px 1px",
                                        focus: "none",
                                        fontSize: "12px"
                                      }}
                                    />
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                          </Col>
                          <Col sm={12}>
                            <Col className="pb-2">
                              <Form.Group>
                                <Row>
                                  <Col sm={5}>
                                    <Form.Label style={{ paddingRight: "1rem" }}>
                                      NBC Minutes ( Link to Doc)
                                    </Form.Label>
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      name="nbc_min"
                                      value={true}
                                      defaultChecked={deal[0].nbc_focus_apprv_4_b === "true"}
                                      ref={nbc_focus_apprv_4_b}
                                    />
                                    <Form.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      name="nbc_min"
                                      value={false}
                                      defaultChecked={deal[0].nbc_focus_apprv_4_b === "false"}
                                      ref={nbc_focus_apprv_4_b}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      size="sm"
                                      type="date"
                                      defaultValue={deal[0].nbc_focus_apprv_4_c ? new Date(deal[0].nbc_focus_apprv_4_c).toISOString().split('T')[0] : ""}
                                      ref={nbc_focus_apprv_4_c}
                                      style={{
                                        width: "80%",
                                        padding: "2px 1px",
                                        focus: "none",
                                        fontSize: "12px"
                                      }}
                                    />
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                            <Col sm={12}>
                              <Col className="pb-2">
                                <Form.Group>
                                  <Row>
                                    <Col sm={5}>
                                      <Form.Label
                                        style={{ paddingRight: "1rem" }}
                                      >
                                        Mandate Letter with Indicative Term
                                        Sheet On-Boarding Documents ( Link to
                                        Doc)
                                      </Form.Label>
                                    </Col>
                                    <Col sm={3}>
                                      <Form.Check
                                        inline
                                        label="Yes"
                                        type="radio"
                                        name="mandlet"
                                        value={true}
                                        defaultChecked={deal[0].nbc_focus_apprv_5_b === "true"}
                                        ref={nbc_focus_apprv_5_b}
                                      />
                                      <Form.Check
                                        inline
                                        label="No"
                                        type="radio"
                                        name="mandlet"
                                        value={false}
                                        defaultChecked={deal[0].nbc_focus_apprv_5_b === "false"}
                                        ref={nbc_focus_apprv_5_b}
                                      />
                                    </Col>
                                    <Col sm={3}>
                                      <Form.Control
                                        size="sm"
                                        type="date"
                                        defaultValue={deal[0].nbc_focus_apprv_5_c ? new Date(deal[0].nbc_focus_apprv_5_c).toISOString().split('T')[0] : ""}
                                        ref={nbc_focus_apprv_5_c}
                                        style={{
                                          width: "80%",
                                          padding: "2px 1px",
                                          focus: "none",
                                          fontSize: "12px"
                                        }}
                                      />
                                    </Col>
                                  </Row>
                                </Form.Group>
                              </Col>
                            </Col>
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
                      </button>
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
                        <Col sm={12}>
                          <Row>
                            <Col>
                              <PWrapper>ROLE</PWrapper>
                              <br />
                            </Col>
                            <Col>
                              <PWrapper>PARTY</PWrapper>
                            </Col>
                            <Col>
                              <PWrapper>APPOINTED</PWrapper>
                            </Col>
                            <Col>
                              <PWrapper>STATUS</PWrapper>
                            </Col>
                          </Row>
                          <Col sm={12}>
                            <Col className="pb-2">
                              <Form.Group>
                                <Row>
                                  <Col sm={3}>
                                    <Form.Label style={{ paddingRight: "1rem" }}>
                                      1. Reporting Accountant
                                    </Form.Label>
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      type="text"
                                      defaultValue={deal[0].parties_1_b}
                                      ref={parties_1_b}
                                      style={{ height: "30px", fontSize:"12px" }}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      name="parties1C"
                                      defaultChecked={deal[0].parties_1_c === true} 
                                      onChange={e => setParties1C(e.target.value)}
                                      value={true}
                                    />
                                    <Form.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      name="parties1C"
                                      defaultChecked={deal[0].parties_1_c === false} 
                                      onChange={e => setParties1C(e.target.value)}
                                      value={false}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      as="textarea"
                                      defaultValue={deal[0].parties_1_d}
                                      ref={parties_1_d}
                                      style={{ height: "30px", fontSize:"12px" }}
                                    ></Form.Control>
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                          </Col>

                          <Col sm={12}>
                            <Col className="pb-2">
                              <Form.Group>
                                <Row>
                                  <Col sm={3}>
                                    <Form.Label style={{ paddingRight: "1rem" }}>
                                      2. Solicitor to the Trustee
                                    </Form.Label>
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      type="text"
                                      defaultValue={deal[0].parties_2_b}
                                      ref={parties_2_b}
                                      style={{ height: "30px", fontSize:"12px" }}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      name="parties2C"
                                      defaultChecked={deal[0].parties_2_c === true} 
                                      onChange={e => setParties2C(e.target.value)}
                                      value={true}
                                    />
                                    <Form.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      name="parties2C"
                                      defaultChecked={deal[0].parties_2_c === false} 
                                      onChange={e => setParties2C(e.target.value)}
                                      value={false}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      as="textarea"
                                      defaultValue={deal[0].parties_2_d}
                                      ref={parties_2_d}
                                      style={{ height: "30px", fontSize:"12px" }}
                                    ></Form.Control>
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                          </Col>

                          <Col sm={12}>
                            <Col className="pb-2">
                              <Form.Group>
                                <Row>
                                  <Col sm={3}>
                                    <Form.Label style={{ paddingRight: "1rem" }}>
                                      3. Lead Issuing House
                                    </Form.Label>
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      type="text"
                                      defaultValue={deal[0].parties_3_b}
                                      ref={parties_3_b}
                                      style={{ height: "30px", fontSize:"12px" }}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      name="parties3C"
                                      defaultChecked={deal[0].parties_3_c === true} 
                                      onChange={e => setParties3C(e.target.value)}
                                      value={true}
                                    />
                                    <Form.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      name="parties3C"
                                      defaultChecked={deal[0].parties_3_c === false} 
                                      onChange={e => setParties3C(e.target.value)}
                                      value={false}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      as="textarea"
                                      defaultValue={deal[0].parties_3_d}
                                      ref={parties_3_d}
                                      style={{ height: "30px", fontSize:"12px" }}
                                    ></Form.Control>
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                          </Col>

                          <Col sm={12}>
                            <Col className="pb-2">
                              <Form.Group>
                                <Row>
                                  <Col sm={3}>
                                    <Form.Label style={{ paddingRight: "1rem" }}>
                                      4. Co-Issuing House
                                    </Form.Label>
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      type="text"
                                      defaultValue={deal[0].parties_4_b}
                                      ref={parties_4_b}
                                      style={{ height: "30px", fontSize:"12px" }}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      name="parties4C"
                                      defaultChecked={deal[0].parties_4_c === true} 
                                      onChange={e => setParties4C(e.target.value)}
                                      value={true}
                                    />
                                    <Form.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      name="parties4C"
                                      defaultChecked={deal[0].parties_4_c === false} 
                                      onChange={e => setParties4C(e.target.value)}
                                      value={false}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      as="textarea"
                                      defaultValue={deal[0].parties_4_d}
                                      ref={parties_4_d}
                                      style={{ height: "30px", fontSize:"12px" }}
                                    ></Form.Control>
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                          </Col>

                          <Col sm={12}>
                            <Col className="pb-2">
                              <Form.Group>
                                <Row>
                                  <Col sm={3}>
                                    <Form.Label style={{ paddingRight: "1rem" }}>
                                      5. Asset Valuer
                                    </Form.Label>
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      type="text"
                                      defaultValue={deal[0].parties_5_b}
                                      ref={parties_5_b}
                                      style={{ height: "30px", fontSize:"12px" }}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      name="parties5C"
                                      defaultChecked={deal[0].parties_5_c === true} 
                                      onChange={e => setParties5C(e.target.value)}
                                      value={true}
                                    />
                                    <Form.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      name="parties5C"
                                      defaultChecked={deal[0].parties_5_c === false} 
                                      onChange={e => setParties5C(e.target.value)}
                                      value={false}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      as="textarea"
                                      defaultValue={deal[0].parties_5_d}
                                      ref={parties_5_d}
                                      style={{ height: "30px", fontSize:"12px" }}
                                    ></Form.Control>
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                          </Col>

                          <Col sm={12}>
                            <Col className="pb-2">
                              <Form.Group>
                                <Row>
                                  <Col sm={3}>
                                    <Form.Label style={{ paddingRight: "1rem" }}>
                                      6. Bond Trustee
                                    </Form.Label>
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      type="text"
                                      defaultValue={deal[0].parties_6_b}
                                      ref={parties_6_b}
                                      style={{ height: "30px", fontSize:"12px" }}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      name="parties6C"
                                      defaultChecked={deal[0].parties_6_c === true} 
                                      onChange={e => setParties6C(e.target.value)}
                                      value={true}
                                    />
                                    <Form.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      name="parties6C"
                                      defaultChecked={deal[0].parties_6_c === false} 
                                      onChange={e => setParties6C(e.target.value)}
                                      value={false}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      as="textarea"
                                      defaultValue={deal[0].parties_6_d}
                                      ref={parties_6_d}
                                      style={{ height: "30px", fontSize:"12px" }}
                                    ></Form.Control>
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                          </Col>
                          <Col sm={12}>
                            <Col className="pb-2">
                              <Form.Group>
                                <Row>
                                  <Col sm={3}>
                                    <Form.Label style={{ paddingRight: "1rem" }}>
                                      7. Solicitor to the Issuer
                                    </Form.Label>
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      type="text"
                                      defaultValue={deal[0].parties_7_b}
                                      ref={parties_7_b}
                                      style={{ height: "30px", fontSize:"12px" }}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      name="parties7C"
                                      defaultChecked={deal[0].parties_7_c === true} 
                                      onChange={e => setParties7C(e.target.value)}
                                      value={true}
                                    />
                                    <Form.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      name="parties7C"
                                      defaultChecked={deal[0].parties_7_c === false} 
                                      onChange={e => setParties7C(e.target.value)}
                                      value={false}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      as="textarea"
                                      defaultValue={deal[0].parties_7_d}
                                      ref={parties_7_d}
                                      style={{ height: "30px", fontSize:"12px" }}
                                    ></Form.Control>
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                          </Col>
                          <Col sm={12}>
                            <Col className="pb-2">
                              <Form.Group>
                                <Row>
                                  <Col sm={3}>
                                    <Form.Label style={{ paddingRight: "1rem" }}>
                                      8. Solicitor to the Issue
                                    </Form.Label>
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      type="text"
                                      defaultValue={deal[0].parties_8_b}
                                      ref={parties_8_b}
                                      style={{ height: "30px", fontSize:"12px" }}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      name="parties8C"
                                      defaultChecked={deal[0].parties_8_c === true} 
                                      onChange={e => setParties8C(e.target.value)}
                                      value={true}
                                    />
                                    <Form.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      name="parties8C"
                                      defaultChecked={deal[0].parties_8_c === false} 
                                      onChange={e => setParties8C(e.target.value)}
                                      value={false}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      as="textarea"
                                      defaultValue={deal[0].parties_8_d}
                                      ref={parties_8_d}
                                      style={{ height: "30px", fontSize:"12px" }}
                                    ></Form.Control>
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                          </Col>
                          <Col sm={12}>
                            <Col className="pb-2">
                              <Form.Group>
                                <Row>
                                  <Col sm={3}>
                                    <Form.Label style={{ paddingRight: "1rem" }}>
                                      9. Registrar
                                    </Form.Label>
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      type="text"
                                      defaultValue={deal[0].parties_9_b}
                                      ref={parties_9_b}
                                      style={{ height: "30px", fontSize:"12px" }}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      name="parties9C"
                                      defaultChecked={deal[0].parties_9_c === true} 
                                      onChange={e => setParties9C(e.target.value)}
                                      value={true}
                                    />
                                    <Form.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      name="parties9C"
                                      defaultChecked={deal[0].parties_9_c === false} 
                                      onChange={e => setParties9C(e.target.value)}
                                      value={false}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      as="textarea"
                                      defaultValue={deal[0].parties_9_d}
                                      ref={parties_9_d}
                                      style={{ height: "30px", fontSize:"12px" }}
                                    ></Form.Control>
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                          </Col>

                          <Col sm={12}>
                            <Col className="pb-2">
                              <Form.Group>
                                <Row>
                                  <Col sm={3}>
                                    <Form.Label style={{ paddingRight: "1rem" }}>
                                      10. Stockbroker
                                    </Form.Label>
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      type="text"
                                      defaultValue={deal[0].parties_10_b}
                                      ref={parties_10_b}
                                      style={{ height: "30px", fontSize:"12px" }}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      name="parties10C"
                                      defaultChecked={deal[0].parties_10_c === true} 
                                      onChange={e => setParties10C(e.target.value)}
                                      value={true}
                                    />
                                    <Form.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      name="parties10C"
                                      defaultChecked={deal[0].parties_10_c === false} 
                                      onChange={e => setParties10C(e.target.value)}
                                      value={false}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      as="textarea"
                                      defaultValue={deal[0].parties_10_d}
                                      ref={parties_10_d}
                                      style={{ height: "30px", fontSize:"12px" }}
                                    ></Form.Control>
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                          </Col>

                          <Col sm={12}>
                            <Col className="pb-2">
                              <Form.Group>
                                <Row>
                                  <Col sm={3}>
                                    <Form.Label style={{ paddingRight: "1rem" }}>
                                      11. Auditor
                                    </Form.Label>
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      type="text"
                                      defaultValue={deal[0].parties_11_b}
                                      ref={parties_11_b}
                                      style={{ height: "30px", fontSize:"12px" }}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      name="parties11C"
                                      defaultChecked={deal[0].parties_11_c === true} 
                                      onChange={e => setParties11C(e.target.value)}
                                      value={true}
                                    />
                                    <Form.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      name="parties11C"
                                      defaultChecked={deal[0].parties_11_c === false} 
                                      onChange={e => setParties11C(e.target.value)}
                                      value={false}
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      as="textarea"
                                      defaultValue={deal[0].parties_11_d}
                                      ref={parties_11_d}
                                      style={{ height: "30px", fontSize:"12px" }}
                                    ></Form.Control>
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
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
                      </button>
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
                    </Container1>
                  </Tab>
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
                            <Col>
                              <PWrapper>Particulars</PWrapper>
                              <br />
                            </Col>
                            <Col>
                              <PWrapper>Concern</PWrapper>
                            </Col>
                            <Col>
                              <PWrapper>Weighting</PWrapper>
                            </Col>
                            <Col>
                              <PWrapper>Expected</PWrapper>
                            </Col>
                            <Col>
                              <PWrapper>Status</PWrapper>
                            </Col>
                          </Row>
                          <Col sm={12}>
                            <Col className="pb-2">
                              <Form.Group>
                                <Row>
                                  <Col sm={2}>
                                    <Form.Label style={{ paddingRight: "1rem" }}>
                                      1.Licenses in good standing with regulator
                                    </Form.Label>
                                  </Col>
                                  <Col sm={2}>
                                    <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={plis_1_b}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].plis_1_b}>{item}</option>
                                      ))}
                                    </Form.Select>
                                  </Col>
                                  <Col sm={2}>
                                    <Form.Control
                                      type="number"
                                      size="sm"
                                      defaultValue={deal[0].plis_1_c}
                                      ref={plis_1_c}
                                      style={{ width: "100%", fontSize:"12px" }}
                                    />
                                  </Col>
                                  <Col sm={2}>
                                    <Form.Control 
                                      type="date" 
                                      size="sm" 
                                      defaultValue={deal[0].plis_1_d ? new Date(deal[0].plis_1_d).toISOString().split('T')[0] : ""}
                                      ref={plis_1_d}
                                      style={{
                                        width: "100%",
                                        padding: "2px 1px",
                                        focus: "none",
                                        fontSize: "12px"
                                      }}
                                    />
                                  </Col>
                                  <Col sm={2}>
                                    <Form.Control
                                      type="text"
                                      size="sm"
                                      defaultValue={deal[0].plis_1_e}
                                      ref={plis_1_e}
                                      style={{ width: "100%", fontSize:"12px" }}
                                    />
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                          </Col>

                          <Col sm={12}>
                            <Col className="pb-2">
                              <Form.Group>
                                <Row>
                                  <Col sm={2}>
                                    <Form.Label style={{ paddingRight: "1rem" }}>
                                     2. Achievement of Sales growth targets
                                    </Form.Label>
                                  </Col>
                                  <Col sm={2}>
                                    <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={plis_2_b}
                                      style={{fontSize: "12px", width: "110%"}}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].plis_2_b}>{item}</option>
                                      ))}
                                    </Form.Select>
                                  </Col>
                                  <Col sm={2}>
                                    <Form.Control
                                      type="number"
                                      size = "sm"
                                      defaultValue={deal[0].plis_2_c}
                                      ref={plis_2_c}
                                      style={{ width: "100%", fontSize:"12px" }}
                                    />
                                  </Col>
                                  <Col sm={2}>
                                  <Form.Control 
                                      type="date" 
                                      size="sm" 
                                      defaultValue={deal[0].plis_2_d ? new Date(deal[0].plis_2_d).toISOString().split('T')[0] : ""}
                                      ref={plis_2_d}
                                      style={{
                                        width: "100%",
                                        padding: "2px 1px",
                                        focus: "none",
                                        fontSize: "12px"
                                      }}
                                    />
                                  </Col>
                                  <Col sm={2}>
                                    <Form.Control
                                      type="text"
                                      size = "sm"
                                      defaultValue={deal[0].plis_2_e}
                                      ref={plis_2_e}
                                      style={{ width: "100%", fontSize:"12px" }}
                                    />
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                          </Col>

                          <Col sm={12}>
                            <Col className="pb-2">
                              <Form.Group>
                                <Row>
                                  <Col sm={2}>
                                    <Form.Label style={{ paddingRight: "1rem" }}>
                                      3.Reduction in customer concentration risk
                                    </Form.Label>
                                  </Col>
                                  <Col sm={2}>
                                    <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={plis_3_b}
                                      style={{fontSize: "12px", width: "110%"}}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].plis_3_b}>{item}</option>
                                      ))}
                                    </Form.Select>
                                  </Col>
                                  <Col sm={2}>
                                    <Form.Control
                                      type="number"
                                      size = "sm"
                                      defaultValue={deal[0].plis_3_c}
                                      ref={plis_3_c}
                                      style={{ width: "100%", fontSize:"12px" }}
                                    />
                                  </Col>
                                  <Col sm={2}>
                                    <Form.Control 
                                      type="date" 
                                      size="sm" 
                                      defaultValue={deal[0].plis_3_d ? new Date(deal[0].plis_3_d).toISOString().split('T')[0] : ""}
                                      ref={plis_3_d}
                                      style={{
                                        width: "100%",
                                        padding: "2px 1px",
                                        focus: "none",
                                        fontSize: "12px"
                                      }}
                                    />
                                  </Col>
                                  <Col sm={2}>
                                    <Form.Control
                                      type="text"
                                      size = "sm"
                                      defaultValue={deal[0].plis_3_e}
                                      ref={plis_3_e}
                                      style={{ width: "100%", fontSize:"12px" }}
                                    />
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                          </Col>

                          <Col sm={12}>
                            <Col className="pb-2">
                              <Form.Group>
                                <Row>
                                  <Col sm={2}>
                                    <Form.Label style={{ paddingRight: "1rem" }}>
                                      4. Extension of Contracts with at least 2 or
                                      3 largest customers
                                    </Form.Label>
                                  </Col>
                                  <Col sm={2}>
                                    <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={plis_4_b}
                                      style={{fontSize: "12px", width: "110%"}}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].plis_4_b}>{item}</option>
                                      ))}
                                    </Form.Select>
                                  </Col>
                                  <Col sm={2}>
                                    <Form.Control
                                      type="number"
                                      size = "sm"
                                      defaultValue={deal[0].plis_4_c}
                                      ref={plis_4_c}
                                      style={{ width: "100%", fontSize:"12px" }}
                                    />
                                  </Col>
                                  <Col sm={2}>
                                  <Form.Control 
                                      type="date" 
                                      size="sm" 
                                      defaultValue={deal[0].plis_4_d ? new Date(deal[0].plis_4_d).toISOString().split('T')[0] : ""}
                                      ref={plis_4_d}
                                      style={{
                                        width: "100%",
                                        padding: "2px 1px",
                                        focus: "none",
                                        fontSize: "12px"
                                      }}
                                    />
                                  </Col>
                                  <Col sm={2}>
                                    <Form.Control
                                      type="text"
                                      size = "sm"
                                      defaultValue={deal[0].plis_4_e}
                                      ref={plis_4_e}
                                      style={{ width: "100%", fontSize:"12px" }}
                                    />
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                          </Col>

                          <Col sm={12}>
                            <Col className="pb-2">
                              <Form.Group>
                                <Row>
                                  <Col sm={2}>
                                    <Form.Label style={{ paddingRight: "1rem" }}>
                                      5. Implementation of corporate governance
                                      enhancement programme{" "}
                                    </Form.Label>
                                  </Col>
                                  <Col sm={2}>
                                    <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={plis_5_b}
                                      style={{fontSize: "12px", width:"110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].plis_5_b}>{item}</option>
                                      ))}
                                    </Form.Select>
                                  </Col>
                                  <Col sm={2}>
                                    <Form.Control
                                      type="number"
                                      size = "sm"
                                      defaultValue={deal[0].plis_5_c}
                                      ref={plis_5_c}
                                      style={{ width: "100%", fontSize:"12px" }}
                                    />
                                  </Col>
                                  <Col sm={2}>
                                  <Form.Control 
                                      type="date" 
                                      size="sm" 
                                      defaultValue={deal[0].plis_5_d ? new Date(deal[0].plis_5_d).toISOString().split('T')[0] : ""}
                                      ref={plis_5_d}
                                      style={{
                                        width: "100%",
                                        padding: "2px 1px",
                                        focus: "none",
                                        fontSize: "12px"
                                      }}
                                    />
                                  </Col>
                                  <Col sm={2}>
                                    <Form.Control
                                      type="text"
                                      size = "sm"
                                      defaultValue={deal[0].plis_5_e}
                                      ref={plis_5_e}
                                      style={{ width: "100%", fontSize:"12px" }}
                                    />
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                          </Col>
                          <Col sm={12}>
                            <Col className="pb-2">
                              <Form.Group>
                                <Row>
                                  <Col sm={2}>
                                    <Form.Label style={{ paddingRight: "1rem" }}>
                                      6.Compliance with environment and social
                                      action plan{" "}
                                    </Form.Label>
                                  </Col>
                                  <Col sm={2}>
                                    <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={plis_6_b}
                                      style={{fontSize: "12px", width:"110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].plis_6_b}>{item}</option>
                                      ))}
                                    </Form.Select>
                                  </Col>
                                  <Col sm={2}>
                                    <Form.Control
                                      type="number"
                                      size="sm"
                                      defaultValue={deal[0].plis_6_c}
                                      ref={plis_6_c}
                                      style={{ width: "100%", fontSize:"12px" }}
                                    />
                                  </Col>
                                  <Col sm={2}>
                                    <Form.Control 
                                      type="date" 
                                      size="sm" 
                                      defaultValue={deal[0].plis_6_d ? new Date(deal[0].plis_6_d).toISOString().split('T')[0] : ""}
                                      ref={plis_6_d}
                                      style={{
                                        width: "100%",
                                        padding: "2px 1px",
                                        focus: "none",
                                        fontSize: "12px"
                                      }}
                                    />
                                  </Col>
                                  <Col sm={2}>
                                    <Form.Control
                                      type="text"
                                      size="sm"
                                      defaultValue={deal[0].plis_6_e}
                                      ref={plis_6_e}
                                      style={{ width: "100%", fontSize:"12px" }}
                                    />
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
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
                          borderRadius: "3px", */}
                        {/* }}
                      >
                        {" "}
                        Prev
                      </button>
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
                    </Container1>
                  </Tab>
                  <Tab
                    eventKey="ninth"
                    title="OTHER CONDITIONS PRECEDENT"
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
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                    Open Transaction Accounts
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={ocps_fac_1_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].ocps_fac_1_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={ocps_fac_1_c}
                                    style={{ fontSize: "12px", width: "110%" }}
                                  >
                                    <option value=""> </option>
                                    {concernGroup.map((item, index) => (
                                      <option key={index} value={item} selected={item === deal[0].ocps_fac_1_c}>{item}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].ocps_fac_1_d ? new Date(deal[0].ocps_fac_1_d).toISOString().split('T')[0] : ""}
                                    ref={ocps_fac_1_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_1_e}
                                    ref={ocps_fac_1_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_1_f}
                                    ref={ocps_fac_1_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                    Certificate of Authenticity
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={ocps_fac_2_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].ocps_fac_2_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={ocps_fac_2_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].ocps_fac_2_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].ocps_fac_2_d ? new Date(deal[0].ocps_fac_2_d).toISOString().split('T')[0] : ""}
                                    ref={ocps_fac_2_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_2_e}
                                    ref={ocps_fac_2_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_2_f}
                                    ref={ocps_fac_2_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                    Co-Due Diligence
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={ocps_fac_3_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].ocps_fac_3_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={ocps_fac_3_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].ocps_fac_3_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].ocps_fac_3_d ? new Date(deal[0].ocps_fac_3_d).toISOString().split('T')[0] : ""}
                                    ref={ocps_fac_3_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_3_e}
                                    ref={ocps_fac_3_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_3_f}
                                    ref={ocps_fac_3_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  Complete Set of Original Financial Statements
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={ocps_fac_4_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].ocps_fac_4_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={ocps_fac_4_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].ocps_fac_4_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].ocps_fac_4_d ? new Date(deal[0].ocps_fac_4_d).toISOString().split('T')[0] : ""}
                                    ref={ocps_fac_4_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_4_e}
                                    ref={ocps_fac_4_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_4_f}
                                    ref={ocps_fac_4_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  Confirmation of Balances
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={ocps_fac_5_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].ocps_fac_5_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={ocps_fac_5_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].ocps_fac_5_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].ocps_fac_5_d ? new Date(deal[0].ocps_fac_5_d).toISOString().split('T')[0] : ""}
                                    ref={ocps_fac_5_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_5_e}
                                    ref={ocps_fac_5_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_5_f}
                                    ref={ocps_fac_5_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  Copy of Constitutional Documents
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={ocps_fac_6_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].ocps_fac_6_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={ocps_fac_6_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].ocps_fac_6_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].ocps_fac_6_d ? new Date(deal[0].ocps_fac_6_d).toISOString().split('T')[0] : ""}
                                    ref={ocps_fac_6_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_6_e}
                                    ref={ocps_fac_6_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_6_f}
                                    ref={ocps_fac_6_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  EPC Contracts
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={ocps_fac_7_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].ocps_fac_7_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={ocps_fac_7_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].ocps_fac_7_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].ocps_fac_7_d ? new Date(deal[0].ocps_fac_7_d).toISOString().split('T')[0] : ""}
                                    ref={ocps_fac_7_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_7_e}
                                    ref={ocps_fac_7_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_7_f}
                                    ref={ocps_fac_7_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  Evidence of Compliance with ESDD Report
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={ocps_fac_8_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].ocps_fac_8_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={ocps_fac_8_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].ocps_fac_8_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].ocps_fac_8_d ? new Date(deal[0].ocps_fac_8_d).toISOString().split('T')[0] : ""}
                                    ref={ocps_fac_8_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_8_e}
                                    ref={ocps_fac_8_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_8_f}
                                    ref={ocps_fac_8_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  Evidence of Compliance with LDD Report
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={ocps_fac_9_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].ocps_fac_9_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={ocps_fac_9_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].ocps_fac_9_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].ocps_fac_9_d ? new Date(deal[0].ocps_fac_9_d).toISOString().split('T')[0] : ""}
                                    ref={ocps_fac_9_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_9_e}
                                    ref={ocps_fac_9_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_9_f}
                                    ref={ocps_fac_9_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  Evidence of Compliance with ODD Report
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={ocps_fac_10_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].ocps_fac_10_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={ocps_fac_10_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].ocps_fac_10_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].ocps_fac_10_d ? new Date(deal[0].ocps_fac_10_d).toISOString().split('T')[0] : ""}
                                    ref={ocps_fac_10_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_10_e}
                                    ref={ocps_fac_10_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_10_f}
                                    ref={ocps_fac_10_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  Evidence of Receipt of Performance Bonds
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={ocps_fac_11_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].ocps_fac_11_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={ocps_fac_11_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].ocps_fac_11_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].ocps_fac_11_d ? new Date(deal[0].ocps_fac_11_d).toISOString().split('T')[0] : ""}
                                    ref={ocps_fac_11_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_11_e}
                                    ref={ocps_fac_11_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_11_f}
                                    ref={ocps_fac_11_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  Evidence that Annual Returns are Up-to-Date
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={ocps_fac_12_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].ocps_fac_12_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={ocps_fac_12_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].ocps_fac_12_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].ocps_fac_12_d ? new Date(deal[0].ocps_fac_12_d).toISOString().split('T')[0] : ""}
                                    ref={ocps_fac_12_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_12_e}
                                    ref={ocps_fac_12_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_12_f}
                                    ref={ocps_fac_12_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  Extension of Contracts
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={ocps_fac_13_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].ocps_fac_13_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={ocps_fac_13_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].ocps_fac_13_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].ocps_fac_13_d ? new Date(deal[0].ocps_fac_13_d).toISOString().split('T')[0] : ""}
                                    ref={ocps_fac_13_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_13_e}
                                    ref={ocps_fac_13_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_13_f}
                                    ref={ocps_fac_13_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  List of Bank Accounts
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={ocps_fac_14_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].ocps_fac_14_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={ocps_fac_14_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].ocps_fac_14_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].ocps_fac_14_d ? new Date(deal[0].ocps_fac_14_d).toISOString().split('T')[0] : ""}
                                    ref={ocps_fac_14_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_14_e}
                                    ref={ocps_fac_14_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_14_f}
                                    ref={ocps_fac_14_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  Off-Take Agreements
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={ocps_fac_15_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].ocps_fac_15_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={ocps_fac_15_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].ocps_fac_15_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].ocps_fac_15_d ? new Date(deal[0].ocps_fac_15_d).toISOString().split('T')[0] : ""}
                                    ref={ocps_fac_15_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_15_e}
                                    ref={ocps_fac_15_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_15_f}
                                    ref={ocps_fac_15_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  PENCOM Compliance
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={ocps_fac_16_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].ocps_fac_16_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={ocps_fac_16_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].ocps_fac_16_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].ocps_fac_16_d ? new Date(deal[0].ocps_fac_16_d).toISOString().split('T')[0] : ""}
                                    ref={ocps_fac_16_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_16_e}
                                    ref={ocps_fac_16_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_16_f}
                                    ref={ocps_fac_16_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  Pre-Signed Bank Transfer Instructions
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={ocps_fac_17_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].ocps_fac_17_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={ocps_fac_17_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].ocps_fac_17_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].ocps_fac_17_d ? new Date(deal[0].ocps_fac_17_d).toISOString().split('T')[0] : ""}
                                    ref={ocps_fac_17_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_17_e}
                                    ref={ocps_fac_17_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_17_f}
                                    ref={ocps_fac_17_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  Renewal of Insurance Policies
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={ocps_fac_18_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].ocps_fac_18_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={ocps_fac_18_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].ocps_fac_18_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].ocps_fac_18_d ? new Date(deal[0].ocps_fac_18_d).toISOString().split('T')[0] : ""}
                                    ref={ocps_fac_18_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_18_e}
                                    ref={ocps_fac_18_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_18_f}
                                    ref={ocps_fac_18_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  Specimen Signatures
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={ocps_fac_19_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].ocps_fac_19_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={ocps_fac_19_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].ocps_fac_19_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].ocps_fac_19_d ? new Date(deal[0].ocps_fac_19_d).toISOString().split('T')[0] : ""}
                                    ref={ocps_fac_19_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_19_e}
                                    ref={ocps_fac_19_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_19_f}
                                    ref={ocps_fac_19_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  Tax Compliance
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={ocps_fac_20_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].ocps_fac_20_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={ocps_fac_20_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].ocps_fac_20_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].ocps_fac_20_d ? new Date(deal[0].ocps_fac_20_d).toISOString().split('T')[0] : ""}
                                    ref={ocps_fac_20_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_20_e}
                                    ref={ocps_fac_20_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].ocps_fac_20_f}
                                    ref={ocps_fac_20_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>
                      </Col>

                      {/* <Row>
                        
                        
                      </Row> */}
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
                    </button>
                     */}
                  </Tab>

                  
























                  {/* 10th */}

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
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                    Transaction Docs
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={key_deal_fac_1_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].key_deal_fac_1_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={key_deal_fac_1_c}
                                    style={{ fontSize: "12px", width: "110%" }}
                                  >
                                    <option value=""> </option>
                                    {concernGroup.map((item, index) => (
                                      <option key={index} value={item} selected={item === deal[0].key_deal_fac_1_c}>{item}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].key_deal_fac_1_d ? new Date(deal[0].key_deal_fac_1_d).toISOString().split('T')[0] : ""}
                                    ref={key_deal_fac_1_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_1_e}
                                    ref={key_deal_fac_1_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_1_f}
                                    ref={key_deal_fac_1_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                    Risk CP Sign-Off
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={key_deal_fac_2_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].key_deal_fac_2_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={key_deal_fac_2_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].key_deal_fac_2_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].key_deal_fac_2_d ? new Date(deal[0].key_deal_fac_2_d).toISOString().split('T')[0] : ""}
                                    ref={key_deal_fac_2_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_2_e}
                                    ref={key_deal_fac_2_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_2_f}
                                    ref={key_deal_fac_2_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                    Reporting Acct Report
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={key_deal_fac_3_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].key_deal_fac_3_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={key_deal_fac_3_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].key_deal_fac_3_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].key_deal_fac_3_d ? new Date(deal[0].key_deal_fac_3_d).toISOString().split('T')[0] : ""}
                                    ref={key_deal_fac_3_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_3_e}
                                    ref={key_deal_fac_3_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_3_f}
                                    ref={key_deal_fac_3_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                    Regulatory Approval
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={key_deal_fac_4_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].key_deal_fac_4_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={key_deal_fac_4_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].key_deal_fac_4_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].key_deal_fac_4_d ? new Date(deal[0].key_deal_fac_4_d).toISOString().split('T')[0] : ""}
                                    ref={key_deal_fac_4_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_4_e}
                                    ref={key_deal_fac_4_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_4_f}
                                    ref={key_deal_fac_4_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  Parties Appointed
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={key_deal_fac_5_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].key_deal_fac_5_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={key_deal_fac_5_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].key_deal_fac_5_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].key_deal_fac_5_d ? new Date(deal[0].key_deal_fac_5_d).toISOString().split('T')[0] : ""}
                                    ref={key_deal_fac_5_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_5_e}
                                    ref={key_deal_fac_5_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_5_f}
                                    ref={key_deal_fac_5_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  New Equity Investment
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={key_deal_fac_6_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].key_deal_fac_6_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={key_deal_fac_6_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].key_deal_fac_6_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].key_deal_fac_6_d ? new Date(deal[0].key_deal_fac_6_d).toISOString().split('T')[0] : ""}
                                    ref={key_deal_fac_6_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_6_e}
                                    ref={key_deal_fac_6_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_6_f}
                                    ref={key_deal_fac_6_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  Legal Opinions
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={key_deal_fac_7_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].key_deal_fac_7_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={key_deal_fac_7_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].key_deal_fac_7_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].key_deal_fac_7_d ? new Date(deal[0].key_deal_fac_7_d).toISOString().split('T')[0] : ""}
                                    ref={key_deal_fac_7_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_7_e}
                                    ref={key_deal_fac_7_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_7_f}
                                    ref={key_deal_fac_7_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  Issue Ratings
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={key_deal_fac_8_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].key_deal_fac_8_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={key_deal_fac_8_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].key_deal_fac_8_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].key_deal_fac_8_d ? new Date(deal[0].key_deal_fac_8_d).toISOString().split('T')[0] : ""}
                                    ref={key_deal_fac_8_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_8_e}
                                    ref={key_deal_fac_8_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_8_f}
                                    ref={key_deal_fac_8_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  Guarantee Docs
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={key_deal_fac_9_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].key_deal_fac_9_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={key_deal_fac_9_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].key_deal_fac_9_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].key_deal_fac_9_d ? new Date(deal[0].key_deal_fac_9_d).toISOString().split('T')[0] : ""}
                                    ref={key_deal_fac_9_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_9_e}
                                    ref={key_deal_fac_9_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_9_f}
                                    ref={key_deal_fac_9_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  Filed with SEC
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={key_deal_fac_10_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].key_deal_fac_10_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={key_deal_fac_10_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].key_deal_fac_10_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].key_deal_fac_10_d ? new Date(deal[0].key_deal_fac_10_d).toISOString().split('T')[0] : ""}
                                    ref={key_deal_fac_10_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_10_e}
                                    ref={key_deal_fac_10_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_10_f}
                                    ref={key_deal_fac_10_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  Fees
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={key_deal_fac_11_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].key_deal_fac_11_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={key_deal_fac_11_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].key_deal_fac_11_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].key_deal_fac_11_d ? new Date(deal[0].key_deal_fac_11_d).toISOString().split('T')[0] : ""}
                                    ref={key_deal_fac_11_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_11_e}
                                    ref={key_deal_fac_11_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_11_f}
                                    ref={key_deal_fac_11_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  CP Letter / Risk Sign-Off
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={key_deal_fac_12_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].key_deal_fac_12_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={key_deal_fac_12_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].key_deal_fac_12_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].key_deal_fac_12_d ? new Date(deal[0].key_deal_fac_12_d).toISOString().split('T')[0] : ""}
                                    ref={key_deal_fac_12_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_12_e}
                                    ref={key_deal_fac_12_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_12_f}
                                    ref={key_deal_fac_12_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  Consent of Legacy Lenders 
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={key_deal_fac_13_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].key_deal_fac_13_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={key_deal_fac_13_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].key_deal_fac_13_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].key_deal_fac_13_d ? new Date(deal[0].key_deal_fac_13_d).toISOString().split('T')[0] : ""}
                                    ref={key_deal_fac_13_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_13_e}
                                    ref={key_deal_fac_13_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_13_f}
                                    ref={key_deal_fac_13_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  Board Resolutions
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={key_deal_fac_14_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].key_deal_fac_14_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={key_deal_fac_14_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].key_deal_fac_14_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].key_deal_fac_14_d ? new Date(deal[0].key_deal_fac_14_d).toISOString().split('T')[0] : ""}
                                    ref={key_deal_fac_14_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_14_e}
                                    ref={key_deal_fac_14_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_14_f}
                                    ref={key_deal_fac_14_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  Asset Valuation
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={key_deal_fac_15_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].key_deal_fac_15_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={key_deal_fac_15_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].key_deal_fac_15_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].key_deal_fac_15_d ? new Date(deal[0].key_deal_fac_15_d).toISOString().split('T')[0] : ""}
                                    ref={key_deal_fac_15_d}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_15_e}
                                    ref={key_deal_fac_15_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_15_f}
                                    ref={key_deal_fac_15_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  MROC pre-CC Approval 
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={key_deal_fac_16_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].key_deal_fac_16_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                {/* <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={key_deal_fac_16_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].key_deal_fac_16_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col> */}
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].key_deal_fac_16_c ? new Date(deal[0].key_deal_fac_16_c).toISOString().split('T')[0] : ""}
                                    ref={key_deal_fac_16_c}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                {/* <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_16_e}
                                    ref={key_deal_fac_16_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col> */}
                                {/* <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_16_f}
                                    ref={key_deal_fac_16_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col> */}
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  MROC pre-CC Approval
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={key_deal_fac_17_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].key_deal_fac_17_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                {/* <Col sm={2}>
                                <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={key_deal_fac_17_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].key_deal_fac_17_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col> */}
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].key_deal_fac_17_c ? new Date(deal[0].key_deal_fac_17_c).toISOString().split('T')[0] : ""}
                                    ref={key_deal_fac_17_c}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                {/* <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_17_e}
                                    ref={key_deal_fac_17_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_17_f}
                                    ref={key_deal_fac_17_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col> */}
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  MROC pre-CC Minutes
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={key_deal_fac_18_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].key_deal_fac_18_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                {/* <Col sm={2}>
                                <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={key_deal_fac_18_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].key_deal_fac_18_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col> */}
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].key_deal_fac_18_c ? new Date(deal[0].key_deal_fac_18_c).toISOString().split('T')[0] : ""}
                                    ref={key_deal_fac_18_c}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                {/* <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_18_e}
                                    ref={key_deal_fac_18_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col> */}
                                {/* <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_18_f}
                                    ref={key_deal_fac_18_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col> */}
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  CC Approval
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={key_deal_fac_19_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].key_deal_fac_19_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                {/* <Col sm={2}>
                                <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={key_deal_fac_19_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].key_deal_fac_19_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col> */}
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].key_deal_fac_19_c ? new Date(deal[0].key_deal_fac_19_c).toISOString().split('T')[0] : ""}
                                    ref={key_deal_fac_19_c}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                {/* <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_19_e}
                                    ref={key_deal_fac_19_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col> */}
                                {/* <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_19_f}
                                    ref={key_deal_fac_19_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col> */}
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  CC Minutes
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={key_deal_fac_20_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].key_deal_fac_20_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                {/* <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={key_deal_fac_20_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].key_deal_fac_20_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col> */}
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].key_deal_fac_20_c ? new Date(deal[0].key_deal_fac_20_c).toISOString().split('T')[0] : ""}
                                    ref={key_deal_fac_20_c}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                {/* <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_20_e}
                                    ref={key_deal_fac_20_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_20_f}
                                    ref={key_deal_fac_20_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col> */}
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>
                      </Col>
                      <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  CC Approval Terms
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={key_deal_fac_21_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].key_deal_fac_21_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                {/* <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={key_deal_fac_20_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].key_deal_fac_20_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col> */}
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].key_deal_fac_21_c ? new Date(deal[0].key_deal_fac_21_c).toISOString().split('T')[0] : ""}
                                    ref={key_deal_fac_21_c}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                {/* <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_20_e}
                                    ref={key_deal_fac_20_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_20_f}
                                    ref={key_deal_fac_20_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col> */}
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>
                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                  Updated Indicative Term Sheet
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={key_deal_fac_22_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].key_deal_fac_22_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                {/* <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={key_deal_fac_20_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].key_deal_fac_20_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col> */}
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].key_deal_fac_22_c ? new Date(deal[0].key_deal_fac_22_c).toISOString().split('T')[0] : ""}
                                    ref={key_deal_fac_22_c}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                {/* <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_20_e}
                                    ref={key_deal_fac_20_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_20_f}
                                    ref={key_deal_fac_20_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col> */}
                              </Row>
                            </Form.Group>
                          </Col>
                      </Col>
                      <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={2}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                   Fee Letter
                                  </Form.Label>
                                </Col>
                                <Col sm={2}>
                                  <Form.Select
                                    type = "text"
                                    size = "sm"
                                    ref={key_deal_fac_23_b}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {optionsGroup.map((item, index) => (
                                      <option key={index} value={item.value} selected={item.value === deal[0].key_deal_fac_23_b}>{item.text}</option>
                                    ))}
                                  </Form.Select>
                                </Col>
                                {/* <Col sm={2}>
                                  <Form.Select
                                      type = "text"
                                      size = "sm"
                                      ref={key_deal_fac_20_c}
                                      style={{ fontSize: "12px", width: "110%" }}
                                    >
                                      <option value=""> </option>
                                      {concernGroup.map((item, index) => (
                                        <option key={index} value={item} selected={item === deal[0].key_deal_fac_20_c}>{item}</option>
                                      ))}
                                    </Form.Select>
                                </Col> */}
                                <Col sm={2}>
                                  <Form.Control 
                                    type="date" 
                                    size="sm" 
                                    defaultValue={deal[0].key_deal_fac_23_c ? new Date(deal[0].key_deal_fac_23_c).toISOString().split('T')[0] : ""}
                                    ref={key_deal_fac_23_c}
                                    style={{
                                      width: "100%",
                                      padding: "2px 1px",
                                      focus: "none",
                                      fontSize: "12px"
                                    }}
                                  />
                                </Col>
                                {/* <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_20_e}
                                    ref={key_deal_fac_20_e}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    defaultValue={deal[0].key_deal_fac_20_f}
                                    ref={key_deal_fac_20_f}
                                    style={{ width: "100%", fontSize:"12px" }}
                                  />
                                </Col> */}
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>
                  
                      

                      {/* <Row>
                        
                        
                      </Row> */}
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
                    </button>
                     */}
                  </Tab>

	    </Tabs> 
	    </div>

      
    <div className='d-flex justify-content-end'>
      <ButtonWrapper style={{ backgroundColor: "grey", color:'white'}}  onClick={handleBack}>
          Back
      </ButtonWrapper>

      <p class='text-danger'>{message}</p>

      <ButtonWrapper type="submit" className='d-flex justify-content-end' onClick={postData}>
          Update
      </ButtonWrapper>

      </div>
            </Form>

            ) : (

            <div>
              <p style={{fontWeight:'bold',fontSize:'12px', color:'darkblue', marginTop:'1rem'}}>Loading</p>
            </div>
            )};
          </Container>
        </FormWrapper>
    </React.Fragment>
  )
}
