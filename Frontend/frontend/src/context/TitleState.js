import { useReducer, useEffect } from "react";
import TitleContext from "./TitleContext";
import TitleReducer from "./TitleReducer";
import {ADD_TITLE, ADD_Guarantees, ADD_PIPELINE_REPORT,ADD_PROGRESS_HEADER,ADD_TABLE_HEADER}from './Types'

const TitleState = ({ children }) => {
    const initalState = {
      showTitle: true,
      cartTitle: JSON.parse(localStorage.getItem('title')) || "Current Guarantee Portfolio",
      guaranteeStore: JSON.parse(localStorage.getItem('titles')) || " Gross guarantee fee income is based on total guarantee guarantees issued since inception of 77 6 Billion through 31 December 2021 In FY 2021 a total of N 34 1 in guarantee transactions have reached  financial close The pipeline of active mandates comprises",
      reportStore:JSON.parse(localStorage.getItem('pipelineReport')) || "   The Origination & Structuring team is actively engaged in assessing new credit enhancement opportunities and diversifying the guarantee portfolio, which are at various stages of evaluation. As at 31 December 2021, InfraCredit’s pipeline of potential guarantee transactions totaled N311.5 Billion from 35 transactions, composed of N255.0 Billion of standard guarantees and N56.5 Billion of contingent refinancing guarantees. Of the 35 transactions, 34 are first-time clients with executed Mandate Letters and one (1) transaction involves follow-on debt instruments for LFZC.",
      progressHeaderStore:JSON.parse(localStorage.getItem()) || 'Progress on Guarantee Target through 31 December 2021 and Near-Term Forecast:'
    };
  
    const [state, dispatch] = useReducer(TitleReducer, initalState);
  
    const addTitle = (title) => {
      dispatch({ type: ADD_TITLE, payload: title });
    };
    const addGuarantees = (guar) => {
      dispatch({ type: ADD_Guarantees, payload: guar});
    };

    const addPipelines = (guarReports) => {
      dispatch({type: ADD_PIPELINE_REPORT, payload:guarReports})
    };
    const addProgressHeader = (progressHeader) => {
      dispatch({ type: ADD_PROGRESS_HEADER, payload: progressHeader });
    };
    const addHeader = (header) => {
      dispatch({ type: ADD_TABLE_HEADER, payload:header  });
    };
 
    useEffect(() => {
      localStorage.setItem("title", JSON.stringify(state.cartTitle));
    }, [state.cartTitle]);
   
  
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
  
  
   
  
    return (
      <TitleContext.Provider
        value={{
          progressHeaderStore:state.progressHeaderStore,
          tableStore:state.tableStore,
          showTitle: state.showTitle,
          cartTitle: state.cartTitle,
          guaranteeStore:state.guaranteeStore,
          reportStore:state.reportStore,
          addPipelines,
          addGuarantees,
          addTitle,
          addProgressHeader,
          addHeader,
        }}
      >
        {children}
      </TitleContext.Provider>
    );
  };

export default TitleState