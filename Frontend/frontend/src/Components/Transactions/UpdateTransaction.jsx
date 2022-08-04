import React, { useRef, useState, useEffect } from "react";
import { Form, Container, Row, Col} from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import styled from "styled-components";
import Service from "../../Services/Service";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { GrAddCircle } from "react-icons/gr";
import { FiDelete, FiSave } from "react-icons/fi";
import NbcFocusMode from "./NbcFocusMode";
import TransactionPartiesMode from "./TransactionPartiesMode";
import PlisMode from "./PlisMode";
import OcpsMode from "./OcpsMode";
import KpisMode from "./KpisMode";

const ButtonWrapper = styled.button`
  color: white;
  background: green;
  margin-right: 14px;
  border: 1px solid white;
  padding: 10px 23px;
  margin-top: 8px;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 10px;
  border-radius: 5px;
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
  // color:#1E2F97;
  font-weight: bold;
  font-size: 11px;
  margin: 0;
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
  const region = useRef("");
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
  const ccSubmissionDate = useRef("");
  let id = window.location.search.split("?")[1];
  const history = useHistory();
  const [deal, setDeal] = useState([]);
  const [message, setMessage] = useState();
  const [status, setStatus] = useState(false);
  const [noteList, setNoteList] = useState([{ note: "" }]);
  const [activeTab, setActiveTab] = useState("first");
  const [industries, setIndustries] = useState([]);
  const [products, setProducts] = useState([]);
  const [regions, setRegions] = useState([]);
  const [frequency, setFrequency] = useState([]);
  const [style, setStyle] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [closed, setisClosed] = useState("");

  const [nbcChanged, setNbcChanged] = useState("");
  const [partiesChanged, setPartiesChanged] = useState("");
  const [plisChanged, setPlisChanged] = useState("");
  const [ocpsChanged, setOcpsChanged] = useState("");
  const [kpiChanged, setKpiChanged] = useState("");

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

  const [nbcFocus, setNbcFocus] = useState([
    {
      id: 0,
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

  //**********************************************************   Key Performance Indicators **************** */
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

  //******************************************************    Transaction Parties ************************** */

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

  //***************************                        Other Conditions Precedents            **************************************** */
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

  //****************************************************** Plis                      ***************************************************** */
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

  const handlePlisRemove = (index) => {
    const list = [...plis];
    list.splice(index, 1);
    setPlis(list);
  };

  const handlePartyRemove = (index) => {
    const list = [...parties];
    list.splice(index, 1);
    setParties(list);
  };

  //***********************************************************   Nbc Focus ********************************************************** */

  const handleNbcChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...nbcFocus];
    list[index][name] = value;
    setNbcFocus(list);
  };

  const handleInputChange = (event) => {
    // function to save user data to deal state
    const { name, value } = event.target;
    setNbcFocus({ ...nbcFocus, [name]: value });
  };

  const handleNbcAdd = () => {
    setNbcFocus([
      ...nbcFocus,
      {
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
    ]);
  };

  const handleNbcRemove = (index) => {
    const list = [...nbcFocus];
    list.splice(index, 1);
    setNbcFocus(list);
  };

  //************************************************************* Note Change ************************************************* */
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

  const concernGroup = ["High", "Medium", "Low"];

  const optionsGroup = [
    {
      text: "Yes",
      value: true,
    },
    {
      text: "No",
      value: false,
    },
  ];

  useEffect(() => {
    retrieveDeal();
  }, [nbcChanged, partiesChanged, plisChanged, ocpsChanged, kpiChanged]);

  useEffect(() => {
    retrieveStaffList();

    retrieveIndustry();

    retrieveProduct();

    retrieveRegion();

    retrieveRepaymentFreq();

    retrieveAmortizationStyle();
  }, []);

  const [allData, setAllData] = useState([]);

  const retrieveDeal = async () => {
    // function to get deal by id from the database
    const data = await axios
      .get(
         `https://trms01-server.azurewebsites.net/api/v1/transaction/item/${id}`,
        // `http://localhost:5001/api/v1/transaction/item/${id}`,
        {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
            "Content-type": "application/json; charset=utf-8",
          },
        }
      )
      .catch((e) => {
      });

    // set the deal and status stateA

    setAllData(data.data.dealInfo);
    setNoteList(data.data.dealInfo[0].notes);
    setDeal(data.data.dealInfo);
    setStatus(true);
    setGreenA(data.data.dealInfo[0].greena);
    setGreenB(data.data.dealInfo[0].greenb);
    setGreenC(data.data.dealInfo[0].greenc);
    setGreenD(data.data.dealInfo[0].greend);
    setGreenE(data.data.dealInfo[0].greene);
    setGreenF(data.data.dealInfo[0].greenf);
    setAmberA(data.data.dealInfo[0].ambera);
    setAmberB(data.data.dealInfo[0].amberb);
    setAmberC(data.data.dealInfo[0].amberc);
    setAmberD(data.data.dealInfo[0].amberd);
    setAmberE(data.data.dealInfo[0].ambere);
    setRedA(data.data.dealInfo[0].reda);
    setRedB(data.data.dealInfo[0].redb);
    setRedC(data.data.dealInfo[0].redc);
    setisClosed(data.data.dealInfo[0].closed);

  //********************************** End Block                   *******************
  };
  // ******************************************  Axios :  get staff  ****************************************

  const uniqueId = Array.from(new Set(allData.map((a) => a.nbcid))).map(
    (id) => {
      return allData.find((a) => a.nbcid === id);
    }
  );
  const partyId = Array.from(new Set(allData.map((a) => a.pid))).map((id) => {
    return allData.find((a) => a.pid === id);
  });
  const ocpId = Array.from(new Set(allData.map((a) => a.ocid))).map((id) => {
    return allData.find((a) => a.ocid === id);
  });
  const pliid = Array.from(new Set(allData.map((a) => a.plid))).map((id) => {
    return allData.find((a) => a.plid === id);
  });
  const uId = Array.from(new Set(allData.map((a) => a.kid))).map((id) => {
    return allData.find((a) => a.kid === id);
  });

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

  // *************************************** Edit NBC Focus Function ***************************** *************

  function editNBCFocus(
    id,
    transid,
    nbcFocusOriginal,
    nbcFocusOriginalYesNo,
    nbcFocusOriginalDate,
    nbcFocusOriginalMethod
  ) {
    let data = {
      id: id,
      nbc_focus_original: nbcFocusOriginal,
      nbc_focus_original_date: nbcFocusOriginalDate,
      nbc_focus_original_yes_no: nbcFocusOriginalYesNo,
      nbc_focus_original_methodology: nbcFocusOriginalMethod,
    };

    Service.updateNBCFocus(transid, data)
      .then((res) => {
        setNbcChanged("success");
      })
      .catch(() => {});
  }

  // ****************************************** Delete Nbc Focus From DB ***********************************

  const deleteNbcFocus = (id, transid) => {
    let data = {
      id: id,
      tableID: "nbcFocus",
    };

    Service.deleteFeatures(transid, data)
      .then((res) => {
        setNbcChanged("deleted");
      })
      .catch((res) => {
        console.log("an error occured");
      });
  };

  // **************************************** NBC Focus List ***************************************************

  const nbcFocusList = uniqueId.map((item) => (
    <NbcFocusMode
      transid={item.transid}
      id={item.nbcid}
      nbcFocusOriginal={item.nbc_focus_original}
      nbcFocusOriginalYesNo={item.nbc_focus_original_yes_no}
      nbcFocusOriginalDate={item.nbc_focus_original_date}
      nbcFocusOriginalMethod={item.nbc_focus_original_methodology}
      key={item.nbcid}
      editNBCFocus={editNBCFocus}
      deleteNbcFocus={deleteNbcFocus}
    />
  ));

  // ***************************************** Send New NBC Focus Values to DB ************************************

  const addNewNBCFocus = () => {
    let data = {
      id: 1000000000,
      nbc_focus_original: nbcFocus[0].nbc_focus_original,
      nbc_focus_original_date: nbcFocus[0].nbc_focus_original_date,
      nbc_focus_original_yes_no: nbcFocus[0].nbc_focus_original_yes_no,
      nbc_focus_original_methodology:
        nbcFocus[0].nbc_focus_original_methodology,
    };

    Service.updateNBCFocus(id, data)
      .then((res) => {
        setNbcChanged("success");
      })
      .catch(() => {
        console.log("an error occured");
      });
  };

  // *************************************** Edit Transaction Parties Function ***************************** *************

  function editParties(
    id,
    transid,
    partiesRole,
    partiesParty,
    partiesAppointed,
    partiesStatus
  ) {
    let data = {
      id: id,
      parties_role: partiesRole,
      parties_party: partiesParty,
      parties_appointed: partiesAppointed,
      parties_status: partiesStatus,
    };

    Service.updateParties(transid, data)
      .then((res) => {
        setPartiesChanged("success");
      })
      .catch(() => {
        console.log("an error occured");
      });
  }

  // ****************************************** Delete Parties From DB ***********************************

  const deleteParties = (id, transid) => {
    let data = {
      id: id,
      tableID: "parties",
    };

    Service.deleteFeatures(transid, data)
      .then((res) => {
        console.log(res.data.message);
        setPartiesChanged("deleted");
      })
      .catch((res) => {
        console.log("an error occured");
      });
  };

  // **************************************** Transaction Parties List ***************************************************

  const PartiesList = partyId.map((item) => (
    <TransactionPartiesMode
      transid={item.transid}
      id={item.pid}
      partiesRole={item.parties_role}
      partiesParty={item.parties_party}
      partiesAppointed={item.parties_appointed}
      partiesStatus={item.parties_status}
      key={item.pid}
      editParties={editParties}
      deleteParties={deleteParties}
    />
  ));

  // ***************************************** Send New Transaction Parties Values to DB ************************************

  const addNewParties = () => {
    let data = {
      id: 1000000000,
      parties_role: parties[0].parties_role,
      parties_party: parties[0].parties_party,
      parties_appointed: parties[0].parties_appointed,
      parties_status: parties[0].parties_status,
    };

    Service.updateParties(id, data)
      .then((res) => {
        setPartiesChanged("success");
      })
      .catch(() => {
        console.log("an error occured");
      });
  };

  // *************************************** Edit Plis Function ***************************** *************

  function editPlis(
    id,
    transid,
    plisParticulars,
    plisConcern,
    plisWeighting,
    plisExpected,
    plisStatus
  ) {
    let data = {
      id: id,
      plis_particulars: plisParticulars,
      plis_concern: plisConcern,
      plis_weighting: plisWeighting,
      plis_expected: plisExpected,
      plis_status: plisStatus,
    };

    Service.updatePlis(transid, data)
      .then((res) => {
        setPlisChanged("success");
      })
      .catch(() => {
        console.log("an error occured");
      });
  }

  // ****************************************** Delete Plis From DB ***********************************

  const deletePlis = (id, transid) => {
    let data = {
      id: id,
      tableID: "plis",
    };

    Service.deleteFeatures(transid, data)
      .then((res) => {
        setPlisChanged("deleted");
      })
      .catch(() => {
        console.log("an error occured");
      });
  };

  // **************************************** Plid List ***************************************************

  const PlisList = pliid.map((item) => (
    <PlisMode
      transid={item.transid}
      id={item.plid}
      plisParticulars={item.plis_particulars}
      plisConcern={item.plis_concern}
      plisWeighting={item.plis_weighting}
      plisExpected={item.plis_expected}
      plisStatus={item.plis_status}
      key={item.plid}
      editPlis={editPlis}
      deletePlis={deletePlis}
    />
  ));

  // ***************************************** Send Plis Values to DB ************************************

  const addNewPlis = () => {
    let data = {
      id: 1000000000,
      plis_particulars: plis[0].plis_particulars,
      plis_concern: plis[0].plis_concern,
      plis_weighting: plis[0].plis_weighting,
      plis_expected: plis[0].plis_expected,
      plis_status: plis[0].plis_status,
    };

    Service.updatePlis(id, data)
      .then((res) => {
        setPartiesChanged("success");
      })
      .catch(() => {
        console.log("an error occured");
      });
  };

  // *************************************** Edit Ocps Function ***************************** *************

  function editOcps(
    id,
    transid,
    ocpsFactors,
    ocpsYesNo,
    ocpsConcern,
    ocpsExpected,
    ocpsRespParty,
    ocpsStatus
  ) {
    let data = {
      id: id,
      ocps_factors: ocpsFactors,
      ocps_yes_no: ocpsYesNo,
      ocps_concern: ocpsConcern,
      ocps_expected: ocpsExpected,
      ocps_resp_party: ocpsRespParty,
      ocps_status: ocpsStatus,
    };

    Service.updateOcps(transid, data)
      .then((res) => {
        setOcpsChanged("success");
      })
      .catch(() => {
        console.log("an error occured");
      });
  }

  // ****************************************** Delete Ocps From DB ***********************************

  const deleteOcps = (id, transid) => {
    let data = {
      id: id,
      tableID: "ocps",
    };

    Service.deleteFeatures(transid, data)
      .then((res) => {
        setOcpsChanged("deleted");
      })
      .catch(() => {
        console.log("an error occured");
      });
  };

  // **************************************** Ocps List ***************************************************

  const OcpsList = ocpId.map((item) => (
    <OcpsMode
      transid={item.transid}
      id={item.ocid}
      ocpsFactors={item.ocps_factors}
      ocpsYesNo={item.ocps_yes_no}
      ocpsConcern={item.ocps_concern}
      ocpsExpected={item.ocps_expected}
      ocpsRespParty={item.ocps_resp_party}
      ocpsStatus={item.ocps_status}
      key={item.ocid}
      editOcps={editOcps}
      deleteOcps={deleteOcps}
    />
  ));

  // ***************************************** Send Ocps Values to DB ************************************

  const addNewOcps = () => {
    let data = {
      id: 1000000000,
      ocps_factors: ocps[0].ocps_factors,
      ocps_yes_no: ocps[0].ocps_yes_no,
      ocps_concern: ocps[0].ocps_concern,
      ocps_expected: ocps[0].ocps_expected,
      ocps_resp_party: ocps[0].ocps_resp_party,
      ocps_status: ocps[0].ocps_status,
    };

    Service.updateOcps(id, data)
      .then((res) => {
        setOcpsChanged("success");
      })
      .catch(() => {
        console.log("an error occured");
      });
  };

  // *************************************** Edit Kpi Function ***************************** *************

  function editKpis(
    id,
    transid,
    kpiFactors,
    kpiYesNo,
    kpiConcern,
    kpiExpected,
    kpiRespParty,
    kpiStatus
  ) {
    let data = {
      id: id,
      kpi_factors: kpiFactors,
      kpi_yes_no: kpiYesNo,
      kpi_concern: kpiConcern,
      kpi_expected: kpiExpected,
      kpi_resp_party: kpiRespParty,
      kpi_status: kpiStatus,
    };

    Service.updateKpis(transid, data)
      .then((res) => {
        setKpiChanged("success");
      })
      .catch(() => {
        console.log("an error occured");
      });
  }

  // ****************************************** Delete Kpi From DB ***********************************

  const deleteKpis = (id, transid) => {
    let data = {
      id: id,
      tableID: "kpi",
    };

    Service.deleteFeatures(transid, data)
      .then((res) => {
        setKpiChanged("deleted");
      })
      .catch(() => {
        console.log("an error occured");
      });
  };

  // **************************************** Kpi List ***************************************************

  const KpiList = uId.map((item) => (
    <KpisMode
      transid={item.transid}
      id={item.kid}
      kpiFactors={item.kpi_factors}
      kpiYesNo={item.kpi_yes_no}
      kpiConcern={item.kpi_concern}
      kpiExpected={item.kpi_expected}
      kpiRespParty={item.kpi_resp_party}
      kpiStatus={item.kpi_status}
      key={item.kid}
      editKpis={editKpis}
      deleteKpis={deleteKpis}
    />
  ));

  // ***************************************** Send Kpi Values to DB ************************************

  const addNewKpis = () => {
    let data = {
      id: 1000000000,
      kpi_factors: kpi[0].kpi_factors,
      kpi_yes_no: kpi[0].kpi_yes_no,
      kpi_concern: kpi[0].kpi_concern,
      kpi_expected: kpi[0].kpi_expected,
      kpi_resp_party: kpi[0].kpi_resp_party,
      kpi_status: kpi[0].kpi_status,
    };

    console.log("kpi", data);

    Service.updateKpis(id, data)
      .then((res) => {
        setKpiChanged("success");
      })
      .catch(() => {
        console.log("an error occured");
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

  function goToFirstPage() {
    setActiveTab("first");
  }

  function goToLastPage(e) {
    e.preventDefault();
    setActiveTab("ninth");
  }

  // ******************************************  EndFunction  ****************************************

  // ******************************************  Back function  ****************************************

  function handleBack() {
    history.push({
      pathname: "/transaction",
    });
  }

  function postData(e) {
    e.preventDefault();
    let allNotes = noteList.map(({ note }) => note);
    // let nbcNotes = nbcFocus.map()
    let note = allNotes.join("|");

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
      ccSubmissionDate: new Date(ccSubmissionDate.current.value),
      structuringFeeAmount: +amount.current.value,
      structuringFeeAdvance: +advance.current.value,
      structuringFeeFinal: +final.current.value,
      guaranteeFee: +guarantee.current.value,
      monitoringFee: +monitoring.current.value,
      reimbursible: +reimbursible.current.value,
      closed: JSON.parse(closed),
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
      // nbcFocus: nbcFocus,
      parties: parties,
      plis: plis,
      ocps: ocps,
      kpi: kpi,
    };

    // ******************************************  Axios :  put request  ****************************************

    Service.updateDeal(id, data)
      .then((response) => {
        alert(response.data.message);
        history.push({
          pathname: "/transaction",
        });
      })
      .catch((error) => {
        setMessage("Failed to update deal");
      });
  }

  return (
    <React.Fragment>
      {/* ---------------------- Update Transaction Forms ----------- */}
      <FormWrapper>
        <Container fluid style={{ marginTop: "0" }}>
          {status ? (
            <Form>
              <h5 className="text-secondary pb-3 mb-2">Update Transaction</h5>
              <br />
              <div>
                <Tabs
                  //activeKey={activeTab}
                  onSelect={(k) => handleTabChange}
                  style={{ fontSize: "12px" }}
                >
                  {/* ----------------------------------------- Client Data ------------------------------------ */}
                  <Tab eventKey="first" title="TRANSACTION">
                    <br />
                    <Container1>
                      <Container>
                        <Row className="mt-3 pt-3">
                          <Col sm={6}>
                            <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                              <Form.Label>Client Name</Form.Label>
                              <Form.Control
                                size="sm"
                                type="text"
                                defaultValue={deal[0].clientname}
                                id="client"
                                ref={clientName}
                                required
                                disabled
                              />
                            </Form.Group>
                          </Col>

                          <Col sm={6}>
                            <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                              <Form.Label>Originator</Form.Label>
                              <Form.Select
                                size="sm"
                                id="originator"
                                ref={originator}
                              >
                                {staffList.map((opt, i) => (
                                  <option
                                    key={staffList[i].email}
                                    value={staffList[i].stafflist}
                                    selected={
                                      staffList[i].stafflist ===
                                      deal[0].originator
                                    }
                                  >
                                    {staffList[i].stafflist}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>

                          <Col sm={6}>
                            <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                              <Form.Label>Transactor</Form.Label>
                              <Form.Select
                                size="sm"
                                id="transactor"
                                ref={transactor}
                              >
                                {staffList.map((opt, i) => (
                                  <option
                                    key={staffList[i].email}
                                    value={staffList[i].stafflist}
                                    selected={
                                      staffList[i].stafflist ===
                                      deal[0].transactor
                                    }
                                  >
                                    {staffList[i].stafflist}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>

                          <Col sm={6}>
                            <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                              <Form.Label>Transaction Legal Lead</Form.Label>
                              <Form.Select
                                size="sm"
                                id="transactionLegalLead"
                                ref={transactionLegalLead}
                              >
                                {staffList.map((opt, i) => (
                                  <option
                                    key={staffList[i].email}
                                    value={staffList[i].stafflist}
                                    selected={
                                      staffList[i].stafflist ===
                                      deal[0].transactionlegallead
                                    }
                                  >
                                    {staffList[i].stafflist}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>

                          <Col sm={12}>
                            <Form.Group className="mb-0 mt-1 pt-1 pb-1">
                              <Form.Label>Note</Form.Label>{" "}
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
                                onClick={handleNoteAdd}
                              >
                                +
                              </button>
                              {noteList.map((singleNote, index) => (
                                <div class="input-group">
                                  <Form.Control
                                    style={{ margin: "0.8em", width: "60%" }}
                                    size="sm"
                                    type="text"
                                    defaultValue={singleNote}
                                    value={singleNote.note}
                                    name="note"
                                    onChange={(e) => handleNoteChange(e, index)}
                                    required
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
                    <br />
                    <Container1>
                      <br />
                      <div className="mt-2">
                        <Row>
                          <Col sm={6} className="my-0 py-0">
                            <Form.Group className="">
                              <Form.Label>Industry</Form.Label>
                              <Form.Select
                                size="sm"
                                id="industry"
                                ref={industry}
                              >
                                {industries.map((opt, i) => (
                                  <option
                                    key={industries[i].industryid}
                                    value={industries[i].industry}
                                    selected={
                                      industries[i].industry ===
                                      deal[0].industry
                                    }
                                  >
                                    {industries[i].industry}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>

                          <Col sm={6}>
                            <Form.Group className="">
                              <Form.Label>Products</Form.Label>
                              <Form.Select
                                size="sm"
                                id="products"
                                ref={product}
                              >
                                {products.map((opt, i) => (
                                  <option
                                    key={products[i].productid}
                                    value={products[i].product}
                                    selected={
                                      products[i].product === deal[0].product
                                    }
                                  >
                                    {products[i].product}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>

                          <Col sm={6}>
                            <Form.Group className="">
                              <Form.Label>Region</Form.Label>
                              <Form.Select size="sm" id="region" ref={region}>
                                {regions.map((opt, i) => (
                                  <option
                                    key={regions[i].regionid}
                                    value={regions[i].region}
                                    selected={
                                      regions[i].region === deal[0].region
                                    }
                                  >
                                    {regions[i].region}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row className="mt-1">
                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>Deal Size (₦'BN)</Form.Label>
                              <Form.Control
                                size="sm"
                                type="text"
                                defaultValue={deal[0].dealsize}
                                id="dealSize"
                                ref={dealSize}
                                required
                              />
                            </Form.Group>
                          </Col>

                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>Coupon(%)</Form.Label>
                              <Form.Control
                                size="sm"
                                type="text"
                                defaultValue={deal[0].coupon}
                                id="coupon"
                                ref={coupon}
                              />
                            </Form.Group>
                          </Col>

                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>Tenor(yrs)</Form.Label>
                              <Form.Control
                                size="sm"
                                type="numeric"
                                defaultValue={deal[0].tenor}
                                id="tenor"
                                ref={tenor}
                              />
                            </Form.Group>
                          </Col>

                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>Moratorium(yrs)</Form.Label>
                              <Form.Control
                                size="sm"
                                type="text"
                                defaultValue={deal[0].moratorium}
                                id="moratorium"
                                ref={moratorium}
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row className="mt-1">
                          <Col sm={6}>
                            <Form.Group className="">
                              <Form.Label>Repayment Frequency</Form.Label>
                              <Form.Select
                                size="sm"
                                id="frequency"
                                ref={repaymentFreq}
                              >
                                {frequency.map((opt, i) => (
                                  <option
                                    key={frequency[i].id}
                                    value={frequency[i].frequency}
                                    selected={
                                      frequency[i].frequency ===
                                      deal[0].repaymentfrequency
                                    }
                                  >
                                    {frequency[i].frequency}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>

                          <Col sm={6}>
                            <Form.Group className="">
                              <Form.Label>Amortisation Style</Form.Label>
                              <Form.Select
                                size="sm"
                                id="amortizationStyle"
                                ref={amortizationStyle}
                              >
                                {style.map((opt, i) => (
                                  <option
                                    key={style[i].id}
                                    value={style[i].amortizationstyle}
                                    selected={
                                      style[i].amortizationstyle ===
                                      deal[0].amortizationstyle
                                    }
                                  >
                                    {style[i].amortizationstyle}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row className="mt-1 pt-3">
                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>Mandate Letter</Form.Label>
                              <Form.Control
                                size="sm"
                                type="date"
                                defaultValue={
                                  deal[0].mandateletter
                                    ? new Date(deal[0].mandateletter)
                                        .toISOString()
                                        .split("T")[0]
                                    : ""
                                }
                                id="mandateLetter"
                                ref={mandateLetter}
                                required
                              />
                            </Form.Group>
                          </Col>

                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>Credit Approval</Form.Label>
                              <Form.Control
                                size="sm"
                                type="date"
                                defaultValue={
                                  deal[0].creditapproval
                                    ? new Date(deal[0].creditapproval)
                                        .toISOString()
                                        .split("T")[0]
                                    : ""
                                }
                                id="creditApproval"
                                ref={creditApproval}
                              />
                            </Form.Group>
                          </Col>

                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>Fee Letter</Form.Label>
                              <Form.Control
                                size="sm"
                                type="date"
                                defaultValue={
                                  deal[0].feeletter
                                    ? new Date(deal[0].feeletter)
                                        .toISOString()
                                        .split("T")[0]
                                    : ""
                                }
                                id="feeLetter"
                                ref={feeLetter}
                              />
                            </Form.Group>
                          </Col>

                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>Expected Close</Form.Label>
                              <Form.Control
                                size="sm"
                                type="date"
                                defaultValue={
                                  deal[0].expectedclose
                                    ? new Date(deal[0].expectedclose)
                                        .toISOString()
                                        .split("T")[0]
                                    : ""
                                }
                                id="expectedClose"
                                ref={exceptedClose}
                              />
                            </Form.Group>
                          </Col>

                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>Actual Close</Form.Label>
                              <Form.Control
                                size="sm"
                                type="date"
                                defaultValue={
                                  deal[0].actualclose
                                    ? new Date(deal[0].actualclose)
                                        .toISOString()
                                        .split("T")[0]
                                    : ""
                                }
                                id="actualClose"
                                ref={actualClose}
                              />
                            </Form.Group>
                          </Col>

                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>NBC Approval</Form.Label>
                              <Form.Control
                                size="sm"
                                type="date"
                                defaultValue={
                                  deal[0].nbc_approval_date
                                    ? new Date(deal[0].nbc_approval_date)
                                        .toISOString()
                                        .split("T")[0]
                                    : ""
                                }
                                id="nbcApprovalDate"
                                ref={nbcApprovalDate}
                              />
                            </Form.Group>
                          </Col>

                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>NBC Submission</Form.Label>
                              <Form.Control
                                size="sm"
                                type="date"
                                defaultValue={
                                  deal[0].nbc_submitted_date
                                    ? new Date(deal[0].nbc_submitted_date)
                                        .toISOString()
                                        .split("T")[0]
                                    : ""
                                }
                                id="nbcSubmittedDate"
                                ref={nbcSubmittedDate}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={6}>
                            <Form.Group className="pt-1">
                              <Form.Label>CC Submission</Form.Label>
                              <Form.Control
                                size="sm"
                                type="date"
                                defaultValue={
                                  deal[0].ccsubmissiondate
                                    ? new Date(deal[0].ccsubmissiondate)
                                    .toJSON()
                                        .split("T")[0]
                                    : ""
                                }
                                id="ccSubmissionDate"
                                ref={ccSubmissionDate}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>
                      <br />
                    </Container1>
                  </Tab>
                  {/*---------------------------------------------- End Tab ----------------------------------- */}

                  {/*------------------------------------------------ Structuring Fees ------------------------- */}

                  <Tab eventKey="third" title="FEES">
                    <div className="mt-2">
                      <Container1>
                        <br />
                        <Row>
                          <Col sm={6} className="my-0 py-0">
                            <Form.Group>
                              <Form.Label>Amount(₦'MN)</Form.Label>
                              <Form.Control
                                size="sm"
                                type="text"
                                defaultValue={deal[0].structuringfeeamount}
                                id="amount"
                                ref={amount}
                              />
                            </Form.Group>
                          </Col>

                          <Col sm={6} className="my-0 py-0">
                            <Form.Group>
                              <Form.Label>Advance(%)</Form.Label>
                              <Form.Control
                                size="sm"
                                type="text"
                                defaultValue={deal[0].structuringfeeadvance}
                                id="advance"
                                ref={advance}
                              />
                            </Form.Group>
                          </Col>

                          <Col sm={6} className="my-0 py-0">
                            <Form.Group>
                              <Form.Label>Final(%)</Form.Label>
                              <Form.Control
                                size="sm"
                                type="text"
                                defaultValue={deal[0].structuringfeefinal}
                                id="final"
                                disabled
                                ref={final}
                              />
                            </Form.Group>
                          </Col>

                          <Col sm={6} className="my-0 py-0">
                            <Form.Group className="pt-1">
                              <Form.Label>Guarantee (%)</Form.Label>
                              <Form.Control
                                size="sm"
                                type="text"
                                defaultValue={deal[0].guaranteefee}
                                id="guarantee"
                                ref={guarantee}
                              />
                            </Form.Group>
                          </Col>

                          <Col sm={6} className="my-0 py-0">
                            <Form.Group className="pt-1">
                              <Form.Label>Monitoring(₦'MN)</Form.Label>
                              <Form.Control
                                size="sm"
                                type="text"
                                defaultValue={deal[0].monitoringfee}
                                id="monitoring"
                                ref={monitoring}
                              />
                            </Form.Group>
                          </Col>

                          <Col sm={6} className="my-0 pb-2">
                            <Form.Group className="pt-1">
                              <Form.Label>Reimbursible(₦'MN)</Form.Label>
                              <Form.Control
                                size="sm"
                                type="text"
                                defaultValue={deal[0].reimbursible}
                                id="reimbursible"
                                ref={reimbursible}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <br />
                        {/* <button onClick={e => toPrevTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}> Prev</button> */}
                        {/* <button onClick={e => toNextTab(e)} style={{ display: 'inlineblock', fontSize: '13px', padding: '2px 20px', margin: '10px', background: 'green', color: 'white', borderRadius: '3px' }}>Next</button> */}
                      </Container1>
                    </div>
                  </Tab>

                  {/*--------------------------------------------- End Tab --------------------------------- */}

                  {/*----------------------------------------------     ----------------------- --------------- */}

                  <Tab
                    eventKey="fourth"
                    title="DEAL CATEGORY"
                    style={{ fontSize: "12px" }}
                  >
                    {/* <br/>
          
        <Tabs defaultActiveKey="first1" className='text-secondary'>
        <Tab eventKey="first1" title="RED TRANSACTION CATEGORY" >
            <br/> */}
                    <Container1>
                      <div id="redCategory" className="pt-2 mt-1 mb-3 pb-3">
                        {/* <br/> */}
                        <PWrapper>
                          <h6
                            className="pt-1"
                            style={{ fontSize: "10px", color: "red" }}
                          >
                            Red Category
                          </h6>
                        </PWrapper>

                        <Col sm={12}>
                          <Form.Group>
                            <Row>
                              <Col>
                                <Form.Label style={{ paddingRight: "1rem" }}>
                                  Mandate Letter signed:
                                </Form.Label>
                              </Col>
                              <Col>
                                <Form.Check
                                  inline
                                  label="Yes"
                                  type="radio"
                                  value={true}
                                  defaultChecked={deal[0].reda === true}
                                  name="redA"
                                  onChange={(e) => setRedA(e.target.value)}
                                />
                                <Form.Check
                                  inline
                                  label="No"
                                  type="radio"
                                  value={false}
                                  defaultChecked={deal[0].reda === false}
                                  name="redA"
                                  onChange={(e) => setRedA(e.target.value)}
                                />
                              </Col>
                            </Row>
                          </Form.Group>
                        </Col>

                        <Col sm={12}>
                          <Form.Group>
                            <Row>
                              <Col>
                                <Form.Label style={{ paddingRight: "1rem" }}>
                                  Due diligence ongoing:
                                </Form.Label>
                              </Col>
                              <Col>
                                <Form.Check
                                  inline
                                  label="Yes"
                                  type="radio"
                                  value={true}
                                  defaultChecked={deal[0].redb === true}
                                  name="redB"
                                  onChange={(e) => setRedB(e.target.value)}
                                />
                                <Form.Check
                                  inline
                                  label="No"
                                  type="radio"
                                  value={false}
                                  defaultChecked={deal[0].redb === false}
                                  name="redB"
                                  onChange={(e) => setRedB(e.target.value)}
                                />
                              </Col>
                            </Row>
                          </Form.Group>
                        </Col>

                        <Col sm={12}>
                          <Form.Group>
                            <Row>
                              <Col>
                                <Form.Label style={{ paddingRight: "1rem" }}>
                                  Pending Credit Committee approval:
                                </Form.Label>
                              </Col>
                              <Col>
                                <Form.Check
                                  inline
                                  label="Yes"
                                  type="radio"
                                  value={true}
                                  defaultChecked={deal[0].redc === true}
                                  name="redC"
                                  onChange={(e) => setRedC(e.target.value)}
                                />
                                <Form.Check
                                  inline
                                  label="No"
                                  type="radio"
                                  value={false}
                                  defaultChecked={deal[0].redc === false}
                                  name="redC"
                                  onChange={(e) => setRedC(e.target.value)}
                                />
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
                      <div id="amberCategory" className="pt-2 mt-1 mb-3 pb-3">
                        <PWrapper>
                          <h6
                            className="pt-1"
                            style={{ fontSize: "10px", color: "#FFC200" }}
                          >
                            Amber Category
                          </h6>
                        </PWrapper>

                        <Col sm={12}>
                          <Form.Group>
                            <Row>
                              <Col>
                                <Form.Label style={{ paddingRight: "1rem" }}>
                                  Mandate Letter signed:
                                </Form.Label>
                              </Col>
                              <Col>
                                <Form.Check
                                  inline
                                  label="Yes"
                                  type="radio"
                                  value={true}
                                  defaultChecked={deal[0].ambera === true}
                                  name="amberA"
                                  onChange={(e) => setAmberA(e.target.value)}
                                />
                                <Form.Check
                                  inline
                                  label="No"
                                  type="radio"
                                  value={false}
                                  defaultChecked={deal[0].ambera === false}
                                  name="amberA"
                                  onChange={(e) => setAmberA(e.target.value)}
                                />
                              </Col>
                            </Row>
                          </Form.Group>
                        </Col>

                        <Col sm={12}>
                          <Form.Group>
                            <Row>
                              <Col>
                                <Form.Label style={{ paddingRight: "1rem" }}>
                                  Transaction has obtained Credit Committe
                                  approval:
                                </Form.Label>
                              </Col>
                              <Col>
                                <Form.Check
                                  inline
                                  label="Yes"
                                  type="radio"
                                  value={true}
                                  defaultChecked={deal[0].amberb === true}
                                  name="amberB"
                                  onChange={(e) => setAmberB(e.target.value)}
                                />
                                <Form.Check
                                  inline
                                  label="No"
                                  type="radio"
                                  value={false}
                                  defaultChecked={deal[0].amberb === false}
                                  name="amberB"
                                  onChange={(e) => setAmberB(e.target.value)}
                                />
                              </Col>
                            </Row>
                          </Form.Group>
                        </Col>

                        <Col sm={12}>
                          <Form.Group>
                            <Row>
                              <Col>
                                <Form.Label style={{ paddingRight: "1rem" }}>
                                  Professional Parties to the Bond issue
                                  appointed or selected:
                                </Form.Label>
                              </Col>
                              <Col>
                                <Form.Check
                                  inline
                                  label="Yes"
                                  type="radio"
                                  value={true}
                                  defaultChecked={deal[0].amberc === true}
                                  name="amberC"
                                  onChange={(e) => setAmberC(e.target.value)}
                                />
                                <Form.Check
                                  inline
                                  label="No"
                                  type="radio"
                                  value={false}
                                  defaultChecked={deal[0].amberc === false}
                                  name="amberC"
                                  onChange={(e) => setAmberC(e.target.value)}
                                />
                              </Col>
                            </Row>
                          </Form.Group>
                        </Col>

                        <Col sm={12}>
                          <Form.Group>
                            <Row>
                              <Col>
                                <Form.Label style={{ paddingRight: "1rem" }}>
                                  Fee Letter and/or Guarantee Documentation
                                  expected to be negotiated and/or signed within
                                  8 weeks:
                                </Form.Label>
                              </Col>
                              <Col>
                                <Form.Check
                                  inline
                                  label="Yes"
                                  type="radio"
                                  value={true}
                                  defaultChecked={deal[0].amberd === true}
                                  name="amberD"
                                  onChange={(e) => setAmberD(e.target.value)}
                                />
                                <Form.Check
                                  inline
                                  label="No"
                                  type="radio"
                                  value={false}
                                  defaultChecked={deal[0].amberd === false}
                                  name="amberD"
                                  onChange={(e) => setAmberD(e.target.value)}
                                />
                              </Col>
                            </Row>
                          </Form.Group>
                        </Col>

                        <Col sm={12}>
                          <Form.Group>
                            <Row>
                              <Col>
                                <Form.Label style={{ paddingRight: "1rem" }}>
                                  All Materials CPs with timelines for
                                  completion agreed with the client:
                                </Form.Label>
                              </Col>
                              <Col>
                                <Form.Check
                                  inline
                                  label="Yes"
                                  type="radio"
                                  value={true}
                                  defaultChecked={deal[0].ambere === true}
                                  name="amberE"
                                  onChange={(e) => setAmberE(e.target.value)}
                                />
                                <Form.Check
                                  inline
                                  label="No"
                                  type="radio"
                                  value={false}
                                  defaultChecked={deal[0].ambere === false}
                                  name="amberE"
                                  onChange={(e) => setAmberE(e.target.value)}
                                />
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
                      <div id="greenCategory" className="pt-2 mt-1 mb-2 pb-2">
                        <PWrapper>
                          <h6
                            className="pt-1"
                            style={{ fontSize: "10px", color: "green" }}
                          >
                            Green Category
                          </h6>
                        </PWrapper>

                        <Form.Group>
                          <Row>
                            <Col sm={12}>
                              <Form.Group>
                                <Row>
                                  <Col>
                                    <Form.Label
                                      style={{ paddingRight: "1rem" }}
                                    >
                                      Transaction has obtained Credit Committee
                                      approval:
                                    </Form.Label>
                                  </Col>
                                  <Col>
                                    <Form.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      value={true}
                                      defaultChecked={deal[0].greena === true}
                                      name="greenA"
                                      onChange={(e) =>
                                        setGreenA(e.target.value)
                                      }
                                    />
                                    <Form.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      value={false}
                                      defaultChecked={deal[0].greena === false}
                                      name="greenA"
                                      onChange={(e) =>
                                        setGreenA(e.target.value)
                                      }
                                    />
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>

                            {/*--------------------------------------------- -------------------------- --------------- */}
                            <Col sm={12}>
                              <Form.Group>
                                <Row>
                                  <Col>
                                    <Form.Label
                                      style={{ paddingRight: "1rem" }}
                                    >
                                      Guarantee Document in agreed form:
                                    </Form.Label>
                                  </Col>
                                  <Col>
                                    <Form.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      value={true}
                                      defaultChecked={deal[0].greenb === true}
                                      name="greenB"
                                      onChange={(e) =>
                                        setGreenB(e.target.value)
                                      }
                                    />
                                    <Form.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      value={false}
                                      defaultChecked={deal[0].greenb === false}
                                      name="greenB"
                                      onChange={(e) =>
                                        setGreenB(e.target.value)
                                      }
                                    />
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>

                            {/**---------------------------------------------------------------------------------------- */}
                            <Col sm={12}>
                              <Form.Group>
                                <Row>
                                  <Col>
                                    <Form.Label
                                      style={{ paddingRight: "1rem" }}
                                    >
                                      Professional Parties to the Bond Issue
                                      appointed or selected:
                                    </Form.Label>
                                  </Col>
                                  <Col>
                                    <Form.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      value={true}
                                      defaultChecked={deal[0].greenc === true}
                                      name="greenC"
                                      onChange={(e) =>
                                        setGreenC(e.target.value)
                                      }
                                    />
                                    <Form.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      value={false}
                                      defaultChecked={deal[0].greenc === false}
                                      name="greenC"
                                      onChange={(e) =>
                                        setGreenC(e.target.value)
                                      }
                                    />
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>

                            {/*--------------------------------------------------------------------------------------- */}
                            <Col sm={12}>
                              <Form.Group>
                                <Row>
                                  <Col>
                                    <Form.Label
                                      style={{ paddingRight: "1rem" }}
                                    >
                                      Already filed or expected filing with SEC
                                      (or equivalent Exchange) within 6 weeks:
                                    </Form.Label>
                                  </Col>
                                  <Col>
                                    <Form.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      value={true}
                                      defaultChecked={deal[0].greend === true}
                                      name="greenD"
                                      onChange={(e) =>
                                        setGreenD(e.target.value)
                                      }
                                    />
                                    <Form.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      value={false}
                                      defaultChecked={deal[0].greend === false}
                                      name="greenD"
                                      onChange={(e) =>
                                        setGreenD(e.target.value)
                                      }
                                    />
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                            {/*---------------------------------------------------------------------------------------- */}
                            <Col sm={12}>
                              <Form.Group>
                                <Row>
                                  <Col>
                                    <Form.Label
                                      style={{ paddingRight: "1rem" }}
                                    >
                                      All Materials CPs to Financial Close have
                                      been satisfactorily met or committed by
                                      the Client for completion on or before
                                      Financial Close:
                                    </Form.Label>
                                  </Col>
                                  <Col>
                                    <Form.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      value={true}
                                      defaultChecked={deal[0].greene === true}
                                      name="greenE"
                                      onChange={(e) =>
                                        setGreenE(e.target.value)
                                      }
                                    />
                                    <Form.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      value={false}
                                      defaultChecked={deal[0].greene === false}
                                      name="greenE"
                                      onChange={(e) =>
                                        setGreenE(e.target.value)
                                      }
                                    />
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                            {/*-------------------------------------------------------------------------------------- */}
                            <Col sm={12}>
                              <Form.Group>
                                <Row>
                                  <Col>
                                    <Form.Label
                                      style={{ paddingRight: "1rem" }}
                                    >
                                      Financial Close expected within 3-6
                                      months:
                                    </Form.Label>
                                  </Col>
                                  <Col>
                                    <Form.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      value={true}
                                      defaultChecked={deal[0].greenf === true}
                                      name="greenF"
                                      onChange={(e) =>
                                        setGreenF(e.target.value)
                                      }
                                    />
                                    <Form.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      value={false}
                                      defaultChecked={deal[0].greenf === false}
                                      name="greenF"
                                      onChange={(e) =>
                                        setGreenF(e.target.value)
                                      }
                                    />
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                            {/*-------------------------------------------------------------------------------------------- */}
                          </Row>
                        </Form.Group>
                      </div>
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
                        <Col sm={3} className="mt-1 mb-1">
                          <p>ORIGINAL</p>
                        </Col>

                        <Col sm={3} className="mt-1 mb-1">
                          <p>CONCERNS</p>
                        </Col>

                        <Col sm={3} className="mt-1 mb-1">
                          <p>DATE</p>
                        </Col>

                        <Col sm={3} className="mt-1 mb-1">
                          <p>METHODOLOGY</p>
                        </Col>

                        {nbcFocusList}
                      </Row>

                      <Row className="py-1">
                        <Col sm={12}>
                          <Row>
                            <Col sm={3} className="mt-1 mb-1">
                              {/* <p>ORIGINAL</p> */}
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group  mt-2">
                                  <Form.Control
                                    type="text"
                                    style={{
                                      width: "100%",
                                      height: "10px",
                                    }}
                                    size="sm"
                                    value={singleNote.nbcFocus}
                                    name="nbc_focus_original"
                                    onChange={(e) => handleNbcChange(e, index)}
                                  />
                                </div>
                              ))}
                            </Col>

                            <Col sm={2} className="mt-1 mb-1">
                              {/* <p>CONCERNS</p> */}
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Form.Select
                                    type="text"
                                    size="sm"
                                    value={singleNote.nbcFocus}
                                    name="nbc_focus_original_yes_no"
                                    onChange={(e) => handleNbcChange(e, index)}
                                  >
                                    <option value={null}></option>
                                    <option
                                      value={1}
                                      name="nbc_focus_original_yes_no"
                                    >
                                      Yes
                                    </option>
                                    <option
                                      value={0}
                                      name="nbc_focus_original_yes_no"
                                    >
                                      No
                                    </option>
                                  </Form.Select>
                                </div>
                              ))}
                            </Col>

                            <Col sm={3} className="mt-1 mb-1">
                              {/* <p>DATE</p> */}
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Form.Control
                                    type="date"
                                    size="sm"
                                    value={singleNote.nbcFocus}
                                    name="nbc_focus_original_date"
                                    onChange={(e) => handleNbcChange(e, index)}
                                  />
                                </div>
                              ))}
                            </Col>

                            <Col sm={4} className="mt-1 mb-1">
                              {/* <p>METHODOLOGY</p> */}
                              {nbcFocus.map((singleNote, index) => (
                                <div class="input-group  mt-2">
                                  <Form.Control
                                    type="text"
                                    style={{
                                      width: "50%",
                                      height: "10px",
                                      marginRight: "3px",
                                    }}
                                    size="sm"
                                    value={singleNote.nbcFocus}
                                    name="nbc_focus_original_methodology"
                                    onChange={(e) => handleNbcChange(e, index)}
                                  />
                                  <button
                                    onClick={handleNbcRemove}
                                    className="mt-1"
                                    style={{
                                      height: "25px",
                                      width: "20%",
                                      border: "none",
                                      marginRight: "3px",
                                    }}
                                  >
                                    <i className="">
                                      <FiDelete />
                                    </i>
                                  </button>
                                  <button
                                    onClick={addNewNBCFocus}
                                    className="mt-1"
                                    style={{
                                      height: "25px",
                                      width: "20%",
                                      border: "none",
                                    }}
                                  >
                                    <i className="">
                                      <FiSave />
                                    </i>
                                  </button>
                                </div>
                              ))}
                            </Col>
                          </Row>
                        </Col>
                        <div
                          className="d-flex justify-content-end ml-2"
                          style={{ cursor: "pointer", height: "1rem" }}
                        >
                          <GrAddCircle
                            onClick={handleNbcAdd}
                            style={{ width: "1rem", height: "1rem" }}
                          />
                        </div>

                        {/* -------- NBC Approval and File Upload Section --------- */}

                        <Col sm={12}>
                          <Col className="pb-2">
                            <Form.Group>
                              <Row>
                                <Col sm={3}>
                                  <Form.Label style={{ paddingRight: "1rem" }}>
                                    {/* Strength of Contracts: */}
                                  </Form.Label>
                                </Col>
                                <Col sm={3}></Col>
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
                                    // onChange={handleInputChange}
                                    name="nbc_focus_apprv_1_b"
                                    value={"Yes"}
                                  />
                                  <Form.Check
                                    inline
                                    label="No"
                                    type="radio"
                                    // onChange={handleInputChange}
                                    name="nbc_focus_apprv_1_b"
                                    value={"No"}
                                    defaultChecked
                                  />
                                </Col>
                                <Col sm={3}>
                                  <Form.Control
                                    size="sm"
                                    type="date"
                                    value={deal.nbc_focus_apprv_1_c}
                                    // onChange={handleInputChange}
                                    name="nbc_focus_apprv_1_c"
                                    style={{
                                      width: "80%",
                                      padding: "2px 1px",
                                      focus: "none",
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
                                    // onChange={handleInputChange}
                                    name="nbc_focus_apprv_2_b"
                                    value={true}
                                  />
                                  <Form.Check
                                    inline
                                    label="No"
                                    type="radio"
                                    // onChange={handleInputChange}
                                    name="nbc_focus_apprv_2_b"
                                    value={false}
                                    defaultChecked
                                  />
                                </Col>
                                <Col sm={3}>
                                  <Form.Control
                                    size="sm"
                                    type="date"
                                    value={deal.nbc_focus_apprv_2_c}
                                    // onChange={handleInputChange}
                                    name="nbc_focus_apprv_2_c"
                                    style={{
                                      width: "80%",
                                      padding: "2px 1px",
                                      focus: "none",
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
                                    // onChange={handleInputChange}
                                    name="nbc_focus_apprv_3_b"
                                    value={true}
                                  />
                                  <Form.Check
                                    inline
                                    label="No"
                                    type="radio"
                                    // onChange={handleInputChange}
                                    name="nbc_focus_apprv_3_b"
                                    value={false}
                                    defaultChecked
                                  />
                                </Col>
                                <Col sm={3}>
                                  <Form.Control
                                    size="sm"
                                    type="date"
                                    value={deal.nbc_focus_apprv_3_c}
                                    // onChange={handleInputChange}
                                    name="nbc_focus_apprv_3_c"
                                    style={{
                                      width: "80%",
                                      padding: "2px 1px",
                                      focus: "none",
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
                                    // onChange={handleInputChange}
                                    name="nbc_focus_apprv_4_b"
                                    value={true}
                                  />
                                  <Form.Check
                                    inline
                                    label="No"
                                    type="radio"
                                    // onChange={handleInputChange}
                                    name="nbc_focus_apprv_4_b"
                                    value={false}
                                    defaultChecked
                                  />
                                </Col>
                                <Col sm={3}>
                                  <Form.Control
                                    size="sm"
                                    type="date"
                                    value={deal.nbc_focus_apprv_4_c}
                                    // onChange={handleInputChange}
                                    name="nbc_focus_apprv_4_c"
                                    style={{
                                      width: "80%",
                                      padding: "2px 1px",
                                      focus: "none",
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
                                      Mandate Letter with Indicative Term Sheet
                                      On-Boarding Documents ( Link to Doc)
                                    </Form.Label>
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Check
                                      inline
                                      label="Yes"
                                      type="radio"
                                      // onChange={handleInputChange}
                                      name="nbc_focus_apprv_5_b"
                                      value={true}
                                    />
                                    <Form.Check
                                      inline
                                      label="No"
                                      type="radio"
                                      // onChange={handleInputChange}
                                      name="nbc_focus_apprv_5_b"
                                      value={false}
                                      defaultChecked
                                    />
                                  </Col>
                                  <Col sm={3}>
                                    <Form.Control
                                      size="sm"
                                      type="date"
                                      value={deal.nbc_focus_apprv_5_c}
                                      // onChange={handleInputChange}
                                      name="nbc_focus_apprv_5_c"
                                      style={{
                                        width: "80%",
                                        padding: "2px 1px",
                                        focus: "none",
                                      }}
                                    />
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                          </Col>
                          {/* </Col> */}
                        </Col>
                      </Row>
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
                        </Col>

                        <Col sm={3} className="mt-1 mb-1">
                          <p>Appointed</p>
                        </Col>

                        <Col sm={3} className="mt-1 mb-1">
                          <p>Party</p>
                        </Col>

                        <Col sm={3} className="mt-1 mb-1">
                          <p>Status</p>
                        </Col>

                        {PartiesList}
                      </Row>

                      <Row className="py-1">
                        <Col sm={12}>
                          <Row>
                            <Col sm={3} className="mt-1 mb-1">
                              {/* <p>Role</p> */}
                              {parties.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Form.Control
                                    style={{
                                      width: "100%",
                                      height: "10px",
                                    }}
                                    type="text"
                                    size="sm"
                                    // defaultValue={mst.parties_role}
                                    value={singleNote.parties}
                                    name="parties_role"
                                    onChange={(e) =>
                                      handlePartyChange(e, index)
                                    }
                                  />
                                  <br />
                                </div>
                              ))}
                            </Col>
                            <Col sm={2} className="mt-1 mb-1">
                              {/* <p>Appointed</p> */}
                              {parties.map((singleNote, index) => (
                                <div class="input-group mt-2 ">
                                  <Form.Select
                                    // className="py-1 mt-1 "
                                    type="text"
                                    style={{
                                      width: "70%",
                                      // height: "10px",
                                    }}
                                    size="sm"
                                    value={singleNote.parties}
                                    onChange={(e) =>
                                      handlePartyChange(e, index)
                                    }
                                    name="parties_appointed"
                                  >
                                    <option value={null}></option>
                                    <option value={1} name="parties_appointed">
                                      Yes
                                    </option>
                                    <option value={0} name="parties_appointed">
                                      No
                                    </option>
                                  </Form.Select>
                                </div>
                              ))}
                            </Col>
                            <Col sm={3} className="mt-1 mb-1">
                              {/* <p>Party</p> */}
                              {parties.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Form.Control
                                    style={{
                                      width: "100%",
                                      height: "10px",
                                    }}
                                    type="text"
                                    size="sm"
                                    // default={mst.parties_party}
                                    value={singleNote.parties}
                                    name="parties_party"
                                    onChange={(e) =>
                                      handlePartyChange(e, index)
                                    }
                                  />
                                </div>
                              ))}
                            </Col>
                            <Col sm={4} className="mt-1 mb-1">
                              {/* <p>Status</p> */}
                              {parties.map((singleNote, index) => (
                                <div class="input-group  mt-2">
                                  <Form.Control
                                    type="text"
                                    style={{
                                      width: "50%",
                                      // height: "10px",
                                      marginRight: "3px",
                                    }}
                                    size="sm"
                                    // defaultValue={mst.parties_status}
                                    value={singleNote.parties}
                                    name="parties_status"
                                    onChange={(e) =>
                                      handlePartyChange(e, index)
                                    }
                                  />
                                  <button
                                    onClick={handlePartyRemove}
                                    className="mt-1"
                                    style={{
                                      height: "25px",
                                      width: "20%",
                                      border: "none",
                                      marginRight: "3px",
                                    }}
                                  >
                                    <i className="">
                                      <FiDelete />
                                    </i>
                                  </button>
                                  <button
                                    onClick={addNewParties}
                                    className="mt-1"
                                    style={{
                                      height: "25px",
                                      width: "20%",
                                      border: "none",
                                    }}
                                  >
                                    <i className="">
                                      <FiSave />
                                    </i>
                                  </button>
                                </div>
                              ))}
                            </Col>
                          </Row>
                        </Col>
                        <div className="d-flex justify-content-end ml-2">
                          <p className="">
                            <GrAddCircle
                              onClick={handlePartyAdd}
                              style={{ width: "1rem", height: "1rem" }}
                            />
                          </p>
                        </div>
                      </Row>
                    </Container1>
                  </Tab>
                  <Tab
                    eventKey="eigth"
                    title="PERFORMANCE-LINKED INDICATORS"
                    style={{ fontSize: "12px" }}
                  >
                    <Container1>
                      <br />
                      <Row className="py-1 d-flex justify-content-space-evenly">
                        <Col className="mt-1 mb-1">
                          <p>Particulars</p>
                        </Col>

                        <Col className="mt-1 mb-1">
                          <p>Concern</p>
                        </Col>

                        <Col className="mt-1 mb-1">
                          <p>Weight (%)</p>
                        </Col>

                        <Col className="mt-1 mb-1">
                          <p>Expected</p>
                        </Col>

                        <Col className="mt-1 mb-1">
                          <p>Status</p>
                        </Col>

                        {PlisList}
                      </Row>

                      <Row className="py-1">
                        <Col sm={12}>
                          <Row>
                            <Col sm={2} className="mt-1 mb-1">
                              {plis.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    value={singleNote.plis}
                                    name="plis_particulars"
                                    onChange={(e) => handlePlisChange(e, index)}
                                  />
                                  <br />
                                </div>
                              ))}
                            </Col>
                            <Col sm={2} className="mt-1 mb-1">
                              {plis.map((singleNote, index) => (
                                <div class="input-group mt-2 mb-1 ">
                                  <Form.Select
                                    type="text"
                                    size="sm"
                                    value={singleNote.plis}
                                    onChange={(e) => handlePlisChange(e, index)}
                                    name="plis_concern"
                                  >
                                    <option value=""></option>
                                    <option value="High" name="plis_concern">
                                      High
                                    </option>
                                    <option value="Medium" name="plis_concern">
                                      Medium
                                    </option>
                                    <option value="Low" name="plis_concern">
                                      Low
                                    </option>
                                  </Form.Select>
                                </div>
                              ))}
                            </Col>
                            <Col sm={2} className="mt-1 mb-1">
                              {plis.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Form.Control
                                    type="number"
                                    size="sm"
                                    value={singleNote.plis}
                                    name="plis_weighting"
                                    onChange={(e) => handlePlisChange(e, index)}
                                  />
                                </div>
                              ))}
                            </Col>
                            <Col sm={2} className="mt-1 mb-1">
                              {plis.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Form.Control
                                    type="date"
                                    size="sm"
                                    value={singleNote.plis}
                                    name="plis_expected"
                                    onChange={(e) => handlePlisChange(e, index)}
                                  />
                                </div>
                              ))}
                            </Col>
                            <Col sm={3} className="mt-1 mb-1">
                              {plis.map((singleNote, index) => (
                                <div class="input-group  mt-2">
                                  <Form.Control
                                    type="text"
                                    style={{
                                      width: "50%",
                                      height: "10px",
                                      marginRight: "3px",
                                    }}
                                    size="sm"
                                    value={singleNote.plis}
                                    name="plis_status"
                                    onChange={(e) => handlePlisChange(e, index)}
                                  />
                                  <button
                                    onClick={handlePlisRemove}
                                    className="mt-1"
                                    style={{
                                      height: "25px",
                                      width: "20%",
                                      border: "none",
                                      marginRight: "2px",
                                    }}
                                  >
                                    <i className="">
                                      <FiDelete />
                                    </i>
                                  </button>
                                  <button
                                    onClick={addNewPlis}
                                    className="mt-1"
                                    style={{
                                      height: "25px",
                                      width: "20%",
                                      border: "none",
                                    }}
                                  >
                                    <i className="">
                                      <FiSave />
                                    </i>
                                  </button>
                                </div>
                              ))}
                            </Col>
                          </Row>
                        </Col>
                        <div className="d-flex justify-content-end ml-2">
                          <p className="">
                            <GrAddCircle onClick={handlePlisAdd} />
                          </p>
                        </div>
                      </Row>
                    </Container1>
                  </Tab>

                  <Tab
                    eventKey="ninth"
                    title="OTHER CONDITIONS PRECEDENT"
                    style={{ fontSize: "12px" }}
                  >
                    <Container1>
                      <br />
                      <Row className="py-1 d-flex justify-content-space-evenly">
                        <Col className="mt-1 mb-1">
                          <p>Factors</p>
                        </Col>

                        <Col className="mt-1 mb-1">
                          <p>Yes/No</p>
                        </Col>

                        <Col className="mt-1 mb-1">
                          <p>Concern</p>
                        </Col>

                        <Col className="mt-1 mb-1">
                          <p>Expected Date</p>
                        </Col>

                        <Col className="mt-1 mb-1">
                          <p>Resp. Party</p>
                        </Col>

                        <Col className="mt-1 mb-1">
                          <p>Status</p>
                        </Col>

                        {OcpsList}
                      </Row>

                      <Row className="py-1">
                        <Col sm={12}>
                          <Row className="d-flex justify-content-space-evenly">
                            <Col sm={2} className="mt-1 mb-1">
                              {ocps.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    value={singleNote.ocps}
                                    name="ocps_factors"
                                    onChange={(e) => handleOcpsChange(e, index)}
                                  />
                                  <br />
                                </div>
                              ))}
                            </Col>
                            <Col sm={2} className="mt-1 mb-1">
                              {ocps.map((singleNote, index) => (
                                <div class="input-group mt-1 mb-1 ">
                                  <Form.Select
                                    className="py-1 mt-1 "
                                    type="text"
                                    size="sm"
                                    value={singleNote.ocps}
                                    onChange={(e) => handleOcpsChange(e, index)}
                                    name="ocps_yes_no"
                                  >
                                    <option value={null}></option>
                                    <option value={1} name="ocps_yes_no">
                                      Yes
                                    </option>
                                    <option value={0} name="ocps_yes_no">
                                      No
                                    </option>
                                  </Form.Select>
                                </div>
                              ))}
                            </Col>
                            <Col sm={2} className="mt-1 mb-1">
                              {ocps.map((singleNote, index) => (
                                <div class="input-group mt-1 mb-1 ">
                                  <Form.Select
                                    className="py-1 mt-1 "
                                    type="text"
                                    size="sm"
                                    value={singleNote.ocps}
                                    onChange={(e) => handleOcpsChange(e, index)}
                                    name="ocps_concern"
                                  >
                                    <option value={null}></option>
                                    <option value="High" name="ocps_concern">
                                      High
                                    </option>
                                    <option value="Medium" name="ocps_concern">
                                      Medium
                                    </option>
                                    <option value="Low" name="ocps_concern">
                                      Low
                                    </option>
                                  </Form.Select>
                                </div>
                              ))}
                            </Col>
                            <Col sm={2} className="mt-1 mb-1">
                              {ocps.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Form.Control
                                    style={{
                                      width: "70%",
                                    }}
                                    type="date"
                                    size="sm"
                                    value={singleNote.ocps}
                                    name="ocps_expected"
                                    onChange={(e) => handleOcpsChange(e, index)}
                                  />
                                </div>
                              ))}
                            </Col>
                            <Col sm={2} className="mt-1 mb-1">
                              {ocps.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    value={singleNote.ocps}
                                    name="ocps_resp_party"
                                    onChange={(e) => handleOcpsChange(e, index)}
                                  />
                                </div>
                              ))}
                            </Col>
                            <Col sm={2} className="mt-1 mb-1">
                              {ocps.map((singleNote, index) => (
                                <div class="input-group  mt-2">
                                  <Form.Control
                                    type="text"
                                    style={{
                                      width: "50%",
                                      height: "10px",
                                      marginRight: "3px",
                                    }}
                                    size="sm"
                                    value={singleNote.ocps}
                                    name="ocps_status"
                                    onChange={(e) => handleOcpsChange(e, index)}
                                  />
                                  <button
                                    onClick={handleOcpsRemove}
                                    className="mt-1"
                                    style={{
                                      height: "25px",
                                      width: "20%",
                                      border: "none",
                                      marginRight: "2px",
                                    }}
                                  >
                                    <i className="">
                                      <FiDelete />
                                    </i>
                                  </button>
                                  <button
                                    onClick={addNewOcps}
                                    className="mt-1"
                                    style={{
                                      height: "25px",
                                      width: "20%",
                                      border: "none",
                                    }}
                                  >
                                    <i className="">
                                      <FiSave />
                                    </i>
                                  </button>
                                </div>
                              ))}
                            </Col>
                          </Row>
                        </Col>
                        <div className="d-flex justify-content-end ml-2">
                          <p className="">
                            <GrAddCircle onClick={handleOcpsAdd} />
                          </p>
                        </div>
                      </Row>
                    </Container1>
                  </Tab>
                  <Tab
                    eventKey="tenth"
                    title="KEY PERFORMANCE INDICATOR"
                    style={{ fontSize: "12px" }}
                  >
                    <Container1>
                      <br />
                      <Row className="py-1 d-flex justify-content-space-evenly">
                        <Col className="mt-1 mb-1">
                          <p>Factors</p>
                        </Col>

                        <Col className="mt-1 mb-1">
                          <p>Yes/No</p>
                        </Col>

                        <Col className="mt-1 mb-1">
                          <p>Concern</p>
                        </Col>

                        <Col className="mt-1 mb-1">
                          <p>Expected Date</p>
                        </Col>

                        <Col className="mt-1 mb-1">
                          <p>Resp. Party</p>
                        </Col>

                        <Col className="mt-1 mb-1">
                          <p>Status</p>
                        </Col>

                        {KpiList}
                      </Row>

                      <Row className="py-1">
                        <Col sm={12}>
                          <Row className="d-flex justify-content-space-evenly">
                            <Col className="mt-1 mb-1">
                              {kpi.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    value={singleNote.kpi}
                                    name="kpi_factors"
                                    onChange={(e) => handleKpiChange(e, index)}
                                  />
                                </div>
                              ))}
                            </Col>
                            <Col className="mt-1 mb-1">
                              {kpi.map((singleNote, index) => (
                                <div class="input-group mt-1 mb-1 ">
                                  <Form.Select
                                    className="py-1 mt-1 "
                                    type="text"
                                    size="sm"
                                    value={singleNote.kpi}
                                    onChange={(e) => handleKpiChange(e, index)}
                                    name="kpi_yes_no"
                                  >
                                    <option value={null}></option>
                                    <option value={1} name="kpi_yes_no">
                                      Yes
                                    </option>
                                    <option value={0} name="kpi_yes_no">
                                      No
                                    </option>
                                  </Form.Select>
                                </div>
                              ))}
                            </Col>

                            <Col className="mt-1 mb-1">
                              {kpi.map((singleNote, index) => (
                                <div class="input-group mt-1 mb-1 ">
                                  <Form.Select
                                    className="py-1 mt-1 "
                                    type="text"
                                    size="sm"
                                    value={singleNote.kpi}
                                    onChange={(e) => handleKpiChange(e, index)}
                                    name="kpi_concern"
                                  >
                                    <option value={null}></option>
                                    <option value="High" name="kpi_concern">
                                      High
                                    </option>
                                    <option value="Medium" name="kpi_concern">
                                      Medium
                                    </option>
                                    <option value="Low" name="kpi_concern">
                                      Low
                                    </option>
                                  </Form.Select>
                                </div>
                              ))}
                            </Col>

                            <Col sm={2} className="mt-1 mb-1">
                              {kpi.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Form.Control
                                    style={{
                                      width: "70%",
                                    }}
                                    type="date"
                                    size="sm"
                                    value={singleNote.kpi}
                                    name="kpi_expected"
                                    onChange={(e) => handleKpiChange(e, index)}
                                  />
                                </div>
                              ))}
                            </Col>
                            <Col className="mt-1 mb-1">
                              {kpi.map((singleNote, index) => (
                                <div class="input-group mt-2">
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    value={singleNote.kpi}
                                    name="kpi_resp_party"
                                    onChange={(e) => handleKpiChange(e, index)}
                                  />
                                </div>
                              ))}
                            </Col>
                            <Col sm={3} className="mt-1 mb-1">
                              {kpi.map((singleNote, index) => (
                                <div class="input-group  mt-2">
                                  <Form.Control
                                    type="text"
                                    style={{
                                      width: "50%",
                                      height: "10px",
                                      marginRight: "3px",
                                    }}
                                    size="sm"
                                    value={singleNote.kpi}
                                    name="kpi_status"
                                    onChange={(e) => handleKpiChange(e, index)}
                                  />

                                  <button
                                    onClick={handleKpiRemove}
                                    className="mt-1"
                                    style={{
                                      height: "25px",
                                      width: "20%",
                                      border: "none",
                                      marginRight: "2px",
                                    }}
                                  >
                                    <i className="">
                                      <FiDelete />
                                    </i>
                                  </button>
                                  <button
                                    onClick={addNewKpis}
                                    className="mt-1"
                                    style={{
                                      height: "25px",
                                      width: "20%",
                                      border: "none",
                                    }}
                                  >
                                    <i className="">
                                      <FiSave />
                                    </i>
                                  </button>
                                </div>
                              ))}
                            </Col>
                          </Row>
                        </Col>
                        <div className="d-flex justify-content-end ml-2">
                          <p className="">
                            <GrAddCircle onClick={handleKpiAdd} />
                          </p>
                        </div>
                      </Row>
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
                </Tabs>
              </div>

              <div className="d-flex justify-content-end">
                <ButtonWrapper
                  style={{ backgroundColor: "grey", color: "white" }}
                  onClick={handleBack}
                >
                  Back
                </ButtonWrapper>

                <p class="text-danger">{message}</p>

                <ButtonWrapper
                  type="submit"
                  className="d-flex justify-content-end"
                  onClick={postData}
                >
                  Update
                </ButtonWrapper>
              </div>
              <Row>
                {/* <Col sm={2}  className='mt-3 pt-2'> */}
                <Form.Label className="pt-1"> </Form.Label>
                {/* </Col> */}

                <Col
                  sm={12}
                  style={{ fontSize: "4em", alignContent: "centre" }}
                >
                  <Form.Check
                    style={
                      deal[0].closed === true
                        ? { visibility: "visible" }
                        : { visibility: "hidden" }
                    }
                    inline
                    label="Activate Deal"
                    type="radio"
                    value={false}
                    defaultChecked={deal[0].closed === false}
                    name="closed"
                    onChange={(e) => setisClosed(e.target.value)}
                  />
                  <Form.Check
                    inline
                    style={
                      deal[0].closed === false
                        ? { visibility: "visible" }
                        : { visibility: "hidden" }
                    }
                    label="Close Deal"
                    type="radio"
                    value={true}
                    defaultChecked={deal[0].closed === true}
                    name="closed"
                    onChange={(e) => setisClosed(e.target.value)}
                  />
                </Col>
              </Row>
            </Form>
          ) : (
            <div>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  color: "darkblue",
                  marginTop: "1rem",
                }}
              >
                Loading
              </p>
            </div>
          )}
          ;
        </Container>
      </FormWrapper>
    </React.Fragment>
  );
}
