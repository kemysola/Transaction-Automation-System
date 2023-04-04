import { useReducer, useEffect } from "react";
import TitleContext from "./TitleContext";
import TitleReducer from "./TitleReducer";
// import {ADD_TITLE,ADD_FILTERED_YEAR, ADD_Guarantees, ADD_PIPELINE_REPORT,ADD_PROGRESS_HEADER,ADD_TABLE_HEADER}from './Types'
import {ADD_TITLE,
  ADD_FILTERED_YEAR,
  ADD_Guarantees, 
  ADD_PIPELINE_REPORT,
  ADD_PROGRESS_HEADER,
  ADD_TABLE_HEADER,
  ADD_KEY_STATS,
  ADD_GUARANTEE_TARGET,
  ADD_PROGRESS_BODY,
  ADD_GUA_PIPELINE_YEAR,
  ADD_REPORT_ACT_YEAR,
  ADD_NBC_Submissions,
  ADD_Structuring_Developments,
  ADD_CURRENT_FINANACIAL_YEAR,
  ADD_CURRENT_FINANACIAL_QUARTER,
}from './Types'
const getDate = new Date().getFullYear()
const TitleState = ({ children }) => {
    const initalState = {
      showTitle: true,
      cartTitle: JSON.parse(localStorage.getItem('title')) || "Current Guarantee Portfolio",
      guaranteeStore: JSON.parse(localStorage.getItem('titles')) || " Gross guarantee fee income is based on total guarantee guarantees issued since inception of 77 6 Billion through 31 December 2021 In FY 2021 a total of N 34 1 in guarantee transactions have reached  financial close The pipeline of active mandates comprises",
      reportStore:JSON.parse(localStorage.getItem('pipelineReport')) || "   The Origination & Structuring team is actively engaged in assessing new credit enhancement opportunities and diversifying the guarantee portfolio, which are at various stages of evaluation. As at 31 December 2021, InfraCredit’s pipeline of potential guarantee transactions totaled N311.5 Billion from 35 transactions, composed of N255.0 Billion of standard guarantees and N56.5 Billion of contingent refinancing guarantees. Of the 35 transactions, 34 are first-time clients with executed Mandate Letters and one (1) transaction involves follow-on debt instruments for LFZC.",
      progressHeaderStore:JSON.parse(localStorage.getItem("headerTitle")) || 'Progress on Guarantee Target through 31 December 2021 and Near-Term Forecast:',
      tableStore:JSON.parse(localStorage.getItem("header")) || 'Progress on Guarantee Target through 31 December 2021 and Near-Term Forecast:',
      filteredStore:JSON.parse(localStorage.getItem('fy')) ||`FY${getDate}` ,
      tableStore:JSON.parse(localStorage.getItem("header")) || 'Progress on Guarantee Target through 31 December 2021 and Near-Term Forecast:',
      keyTitleStore :JSON.parse(localStorage.getItem("keyStatsTitle")) ||'Key Statistics on O & S Activity - Inception till Date:',
      guaranteeTargetStore :JSON.parse(localStorage.getItem("growthTargetTitle")) ||'Guarantee Portfolio Growth Vs. Target',
      progressBodyStore:JSON.parse(localStorage.getItem("progressBody")) ||'Of seven (7) advanced transactions, up to five (5) totaling of N38.1Billion may reach financial close in Q1 2022 , including a minimum of N14.1 Billion',      
      guarPipelineYear:JSON.parse(localStorage.getItem("guarPYearTitle")) ||'FY2021-2022 Guarantee Pipeline',
      reportYearStore:JSON.parse(localStorage.getItem("reportYears")) ||'Origination Activity – Q4 2021',
      nbcSubmissionStore:JSON.parse(localStorage.getItem("nbcYear")) ||'NBC Submissions and Mandate Status – Q4 2021 Update',
      structuringDev:JSON.parse(localStorage.getItem("structuringYear")) ||'Structuring & Execution – Q4 2021 Developments',
      currentFyStore:JSON.parse(localStorage.getItem("currentFy")) ||'2021',
      currentQuarterStore:JSON.parse(localStorage.getItem("currentQuarter")) ||'Q4',
    };
    const [state, dispatch] = useReducer(TitleReducer, initalState);

/**
 * CREATE INDIVIDUAL DISPATCHES BASED ON TYPES  AND THE PAYLOAD BODY
 * 
 */
    const addTitle = (title) => {
      dispatch({ type: ADD_TITLE, payload: title });
    };
    const addFtYear = (year) => {
      dispatch({ type: ADD_FILTERED_YEAR, payload: year });
    };
    const addCurrentQuarter = (title) => {
      dispatch({ type: ADD_CURRENT_FINANACIAL_QUARTER, payload: title });
    };
    const addCurrentFy = (year) => {
      dispatch({ type:ADD_CURRENT_FINANACIAL_YEAR, payload: year });
    };
    const addStructuring = (year) => {
      dispatch({ type: ADD_Structuring_Developments, payload: year });
    };
    const addNbcYear = (year) => {
      dispatch({ type: ADD_NBC_Submissions, payload: year });
    };
    const addReportYear = (year) => {
      dispatch({ type: ADD_REPORT_ACT_YEAR, payload: year });
    };
    const addGPYear = (title) => {
      dispatch({ type: ADD_GUA_PIPELINE_YEAR, payload: title });
    };
    const addGuarantees = (guar) => {
      dispatch({ type: ADD_Guarantees, payload: guar});
    };

    const addPipelines = (guarReports) => {
      dispatch({type: ADD_PIPELINE_REPORT, payload:guarReports})
    };
    const addguaranteeTargets = (growthTargets) =>{
      dispatch({type:ADD_GUARANTEE_TARGET,payload:growthTargets})
    }
    const addProgressHeader = (progressHeader) => {
      dispatch({ type: ADD_PROGRESS_HEADER, payload: progressHeader });
    };
    const addHeader = (header) => {
      dispatch({ type: ADD_TABLE_HEADER, payload:header  });
    };
    const addkeyStats = (stat) => {
      dispatch({ type: ADD_KEY_STATS, payload:stat});
    };
    const addProgressBody = (body) => {
      dispatch({ type: ADD_PROGRESS_BODY, payload:body});
    };
 
    /**
     * 
     * SAVE STATE IN INDIVIDUAL USEEFFECT HOOKS IN THE LOCAL STORAGE..
     * 
     */
    useEffect(() => {
      localStorage.setItem("title", JSON.stringify(state.cartTitle));
    }, [state.cartTitle]);
    useEffect(() => {
      localStorage.setItem("currentQuarter", JSON.stringify(state.currentQuarterStore));
    }, [state.currentQuarterStore]);
    useEffect(() => {
      localStorage.setItem("currentFy", JSON.stringify(state.currentFyStore));
    }, [state.currentFyStore]);
    useEffect(() => {
      localStorage.setItem("structYear", JSON.stringify(state.structuringDev));
    }, [state.structuringDev]);
    useEffect(() => {
      localStorage.setItem("nbcSubYear", JSON.stringify(state.nbcSubmissionStore));
    }, [state.nbcSubmissionStore]);
    useEffect(() => {
      localStorage.setItem("reportYear", JSON.stringify(state.reportYearStore));
    }, [state.reportYearStore]);
    useEffect(() => {
      localStorage.setItem("keyStatsTitle", JSON.stringify(state.keyTitleStore));
    }, [state.keyTitleStore]);
    useEffect(() => {
      localStorage.setItem("growthTargetTitle", JSON.stringify(state.guaranteeTargetStore));
    }, [state.guaranteeTargetStore]);

    useEffect(() => {
      localStorage.setItem("guarPYearTitle", JSON.stringify(state.guarPipelineYear));
    }, [state.guarPipelineYear]);


    useEffect(() => {
    localStorage.setItem("progressBody", JSON.stringify(state.progressBodyStore));
  }, [state.progressBodyStore]);

    useEffect(() => {
      localStorage.setItem("titles", JSON.stringify(state.guaranteeStore));
    }, [state.guaranteeStore]);
    useEffect(() => {
      localStorage.setItem("pipelineReport", JSON.stringify(state.reportStore));
    }, [state.reportStore]);

    useEffect(() => {
      localStorage.setItem("headerTitle", JSON.stringify(state.progressHeaderStore));
    }, [state.progressHeaderStore]);

    useEffect(() => {
      localStorage.setItem("header", JSON.stringify(state.tableStore));
    }, [state.tableStore]);
    useEffect(async() => {
         await localStorage.setItem("fy",JSON.stringify(state.filteredStore));
        }, [state.filteredStore, addFtYear.year]);
      return (
      <TitleContext.Provider
        value={{
          progressHeaderStore:state.progressHeaderStore,
          progressBodyStore:state.progressBodyStore,
          guaranteeTargetStore:state.guaranteeTargetStore,
          guarPipelineYear:state.guarPipelineYear,
          structuringDev:state.structuringDev,
          tableStore:state.tableStore,
          nbcSubmissionStore:state.nbcSubmissionStore,
          reportYearStore:state.reportYearStore,
          showTitle: state.showTitle,
          cartTitle: state.cartTitle,
          guaranteeStore:state.guaranteeStore,
          reportStore:state.reportStore,
          filteredStore:state.filteredStore,
          keyTitleStore:state.keyTitleStore,
          currentFyStore:state.currentFyStore,
          currentQuarterStore:state.currentQuarterStore,
          addPipelines,
          addGuarantees,
          addTitle,
          addProgressHeader,
          addHeader,
          addFtYear,
          addkeyStats,
          addguaranteeTargets,
          addProgressBody,
          addGPYear,
          addStructuring,
          addNbcYear,
          addReportYear,
          addCurrentFy,
          addCurrentQuarter,
        }}
      >
        {children}
      </TitleContext.Provider>
    );
  };

export default TitleState